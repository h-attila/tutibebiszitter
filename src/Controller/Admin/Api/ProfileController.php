<?php


namespace App\Controller\Admin\Api;


use App\Entity\AdditionalService;
use App\Entity\Group;
use App\Entity\Language;
use App\Entity\Place;
use App\Entity\Profile;
use App\Entity\Service;
use App\Form\Admin\AdminProfileFormType;
use App\Repository\ProfileRepository;
use App\Repository\UserRepository;
use App\Service\StatusService;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Validator\Validator\ValidatorInterface;


/**
 * Class ProfileListController
 * @package App\Controller\Admin\Api
 *
 * @Route("/admin/api/profile", name="admin_api_profile_")
 */
class ProfileController extends AbstractController
{
    protected SerializerInterface $serializer;

    /**
     * @param EntityManagerInterface $em
     * @param LoggerInterface $logger
     * @param ProfileRepository $profileRepository
     * @param SerializerInterface $serializer
     */
    public function __construct(
      protected EntityManagerInterface $em,
      protected LoggerInterface        $logger,
      protected ProfileRepository      $profileRepository,
      SerializerInterface              $serializer
    )
    {
//        $encoder = new JsonEncoder();
//        $defaultContext = [
//          AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
//              return $object->getId();
//          },
//        ];
//        $normalizer = new ObjectNormalizer(null, null, null, null, null, null, $defaultContext);
//        $this->serializer = new Serializer([$normalizer], [$encoder]);
        $this->serializer = $serializer;
    }


    /**
     * Admin profil lekérdezés.
     *
     * @param string $uuid
     * @param StatusService $statusService
     * @return Response
     *
     * @Route("/get-profile/{uuid}", methods={"GET"}, name="get_profile")
     */
    public function getProfile(string $uuid, StatusService $statusService): Response
    {
        $p = $this->em->getRepository(Profile::class);

        /* @var $profile Profile */
        $profile = $p->findOneBy([
          'uuid' => $uuid
        ]);

        if (!$profile) {
            return new JsonResponse(null, Response::HTTP_NO_CONTENT);
        }

        // frissítjük a státusz adatokat
        $status = $statusService->set($profile);
        $profile->setStatus($status);

        $json = $this->serializer->serialize($profile, 'json', ['groups' => 'admin_profile']);

        return JsonResponse::fromJsonString($json);
    }


    /**
     * Admin profil megújítás.
     *
     * @param string $uuid
     * @param SerializerInterface $serializer
     * @param StatusService $statusService
     * @return Response
     *
     * @Route("/renew-now/{uuid}", methods={"PUT"}, name="renew_now")
     */
    public function renewNow(string $uuid, SerializerInterface $serializer, StatusService $statusService): Response
    {
        $p = $this->em->getRepository(Profile::class);

        /* @var $profile Profile */
        $profile = $p->findOneBy([
          'uuid' => $uuid
        ]);

        if (!$profile) {
            return new JsonResponse(['success' => false, 'error' => 'A profil nem található!'], Response::HTTP_OK);
        }

        // frissítjük a státusz adatokat
        if (!$profile->getRenewAvailable() > 0) {
            return new JsonResponse(['success' => false, 'error' => 'Nincsen felhasználható előre helyezés. Kérlek, vedd fel a kapcsoltot ügyfélszolgálatunkkal.'], Response::HTTP_OK);
        }

        $now = new DateTime();

        $profile
          ->setRenewAvailable($profile->getRenewAvailable() - 1)
          ->setLastRenewed($now)
          ->setLastUpdate($now);

        $this->em->persist($profile);
        $this->em->flush();

        $message = [
          'success' => true,
          'renewAvaiable' => $profile->getRenewAvailable(),
          'lastRenewed' => $now,
          'lastUpdate' => $now
        ];

        $json = $this->serializer->serialize($message, 'json');

        return JsonResponse::fromJsonString($json);
    }


    /**
     * @param string $uuid
     * @param Request $request
     * @param ValidatorInterface $validator
     * @param UserRepository $userRepository
     * @param LoggerInterface $logger
     * @param StatusService $statusService
     * @param UserPasswordHasherInterface $userPasswordHasher
     * @return Response
     *
     * @Route("/save/{uuid}", methods={"PUT"}, name="save_profile")
     */
    public function save(string $uuid, Request $request, ValidatorInterface $validator, UserRepository $userRepository, LoggerInterface $logger, StatusService $statusService, UserPasswordHasherInterface $userPasswordHasher): Response
    {
        $p = $this->em->getRepository(Profile::class);
        $now = new DateTime();
        $errors = [];

        $profile = $p->findOneBy([
          'uuid' => $uuid
        ]);

        if (empty($profile)) {
            return new JsonResponse(['error' => 'A profil nem található.'], Response::HTTP_BAD_REQUEST);
        }

        $data = json_decode($request->getContent(), true);

        // jelszavak - azaz adott meg jelszót
        if (isset($data['plainPassword']) && isset($data['rePlainPassword']) && $data['plainPassword'] !== '' && $data['rePlainPassword'] !== '') {

            if ($data['plainPassword'] === $data['rePlainPassword']) {
                $hashedPassword = $userPasswordHasher->hashPassword(
                  $profile,
                  $data['plainPassword']
                );
                $profile->setPassword($hashedPassword);          // todo: titkosítani
            } else {
                $errors['plainPassword'] = 'Jelszó nem lehet üres, vagy a két jelszó nem egyezik.';
                $errors['rePlainPassword'] = 'Jelszó ellenőrzés nem lehet üres, vagy a két jelszó nem egyezik.';
            }
        } else {
            // itt nincs jelszó módosítás, beállítunk valamit, hogy átmenjen a validátáron, de nem mentjük
            $data['plainPassword'] = 'Aa12345';
            $data['rePlainPassword'] = 'Aa12345';
        }

        $form = $this->createForm(AdminProfileFormType::class, $profile);
        $form->submit($data);

//        var_dump(empty($data));
//
//        exit();

        if ($form->isValid()) {

            // services
            $data['services'] = $data['services'] ?? [];
            foreach ($data['services'] as $i => $v) {
                if (!$v['enabled']) {
                    unset($data['services'][$i]);
                }
            }
            if (!empty($data['services'])) {
                $allowedServices = $this->em->getRepository(Service::class)->findBy(['enabled' => '1']);
                foreach ($allowedServices as $allowedService) {
                    $found = false;
                    foreach ($data['services'] as $service) {
                        if ($allowedService->getId() === $service['id']) {
                            $profile->addService($allowedService);
                            $found = true;
                            break;
                        }
                    }
                    if (!$found) {
                        $profile->removeService($allowedService);
                    }
                }
            } else {
                $errors['service'] = 'Legalább egy szolgáltatás kiválasztása kötelező.';    // todo: kiváltani entity validátorokkal.
            }

            // additional services
            $data['additionalServices'] = $data['additionalServices'] ?? [];
            foreach ($data['additionalServices'] as $i => $v) {
                if (!$v['enabled']) {
                    unset($data['additionalServices'][$i]);
                }
            }
            $data['additionalServices'] = $data['additionalServices'] ?? [];
            $allowedAdditionalServices = $this->em->getRepository(AdditionalService::class)->findBy(['enabled' => '1']);
            foreach ($allowedAdditionalServices as $allowedAdditionalService) {
                $found = false;
                foreach ($data['additionalServices'] as $additionalService) {
                    if ($allowedAdditionalService->getId() === $additionalService['id']) {
                        $profile->addAdditionalService($allowedAdditionalService);
                        $found = true;
                        break;
                    }
                }
                if (!$found) {
                    $profile->removeAdditionalService($allowedAdditionalService);
                }
            }

            // languages
            $data['languages'] = $data['languages'] ?? [];
            foreach ($data['languages'] as $i => $v) {
                if (!$v['enabled']) {
                    unset($data['languages'][$i]);
                }
            }
            if (!empty($data['languages'])) {
                $allowedLanguages = $this->em->getRepository(Language::class)->findBy(['enabled' => '1']);
                foreach ($allowedLanguages as $allowedLanguage) {
                    $found = false;
                    foreach ($data['languages'] as $language) {
                        if ($allowedLanguage->getId() === $language['id']) {
                            $profile->addLanguage($allowedLanguage);
                            $found = true;
                            break;
                        }
                    }
                    if (!$found) {
                        $profile->removeLanguage($allowedLanguage);
                    }
                }
            } else {
                $errors['languages'] = 'Legalább egy nyelv kiválasztása kötelező.';
            }

            // groups
            $data['groups'] = $data['groups'] ?? [];
            foreach ($data['groups'] as $i => $v) {
                if (!$v['enabled']) {
                    unset($data['groups'][$i]);
                }
            }
            if (!empty($data['groups'])) {
                $allowedGroups = $this->em->getRepository(Group::class)->findBy(['enabled' => '1']);
                foreach ($allowedGroups as $allowedGroup) {
                    $found = false;
                    foreach ($data['groups'] as $group) {
                        if ($allowedGroup->getId() === $group['id']) {
                            $profile->addGroup($allowedGroup);
                            $found = true;
                            break;
                        }
                    }
                    if (!$found) {
                        $profile->removeGroup($allowedGroup);
                    }
                }
            } else {
                $errors['groups'] = 'Legalább egy csoportlétszám kiválasztása kötelező.';
            }

            // places
            if (!empty($data['places'])) {
                $allowedPlaces = $this->em->getRepository(Place::class)->findBy(['enabled' => '1']);
                foreach ($allowedPlaces as $allowedPlace) {
                    $found = false;
                    foreach ($data['places'] as $place) {
                        if ($allowedPlace->getId() === $place['id']) {
                            $profile->addPlace($allowedPlace);
                            $found = true;
                            break;
                        }
                    }
                    if (!$found) {
                        $profile->removePlace($allowedPlace);
                    }
                }
            } else {
                $errors['place'] = 'Legalább egy helyszín kiválasztása kötelező.';
            }

            if (!empty($errors)) {
                return new JsonResponse(['success' => false, 'errors' => $errors, 'data' => $data], Response::HTTP_BAD_REQUEST);
            }

            // history beállítások
            // engedélyezés változott
            // todo: később
//            $msg = [];
//            if ($profile->getEnabled() !== $profilePrev->getEnabled()) {
//                if ($profile->getEnabled()) {
//                    $msg[] = 'tagság engedélyezés';
//                } else {
//                    $msg[] = 'tagság szüneteltetés';
//                }
//            }
//            if ($profile->getActive() !== $profilePrev->getActive()) {
//                if ($profile->getA()) {
//                    $msg[] = 'tagság aktiválás';
//                } else {
//                    $msg[] = 'tagság inaktiválás';
//                }
//            }
//            if ($profile->getPackage() !== $profilePrev->getPackage()) {
//                $msg[] = 'díjcsomag módosítás: ' . $profile->getPackage()->getLabel() . ' (előző volt: ' . $profilePrev->getPackage()->getLabel() . ')';
//            }
//            if ($profile->getRenewAvailable() !== $profilePrev->getRenewAvailable()) {
//                $msg[] = 'megújítások számának módosítása: ' . $profile->getRenewAvailable() . ' (előző volt: ' . $profilePrev->getRenewAvailable() . ')';
//            }
//            if (empty($msg)) {
//                $msg = ['adatmódosítás'];
//            }

//            $administrator = $userRepository->getAdministrator();
//            $history = new History();
//            $history
//              ->setMessage(implode(',', $msg))
//              ->setCreated(new DateTime())
//              ->setUser($administrator)
//              ->setEnabled(true);
//
//            $profile->setHistory($history);

            // új státusz beállítás
            $status = $statusService->set($profile);
            $profile->setStatus($status);       // todo: status-t kivenni a db-ből!

            $profile->setLastUpdate($now);

            $this->em->persist($profile);
            $this->em->flush();

            // todo: ezt nem lehetne egyszerűbben, mint a ProfileListControllerben?
            $json = $this->serializer->serialize($profile, 'json', ['groups' => ['admin_profile']]);

            return JsonResponse::fromJsonString($json, Response::HTTP_OK);
        }

        $msg = [];
        $errors = $validator->validate($profile);
        /* @var ConstraintViolation $error */
        foreach ($errors as $error) {
            $msg[$error->getPropertyPath()] = $error->getMessage();
        }

        $response = [
          'errors' => $msg
        ];

        return new JsonResponse($response, Response::HTTP_BAD_REQUEST);
    }


    /**
     * @param string $uuid
     * @param Request $request
     *
     * @return Response
     *
     * @Route("/delete/{uuid}", methods={"DELETE"}, name="delete_profile")
     */
    public function delete(string $uuid, Request $request): Response
    {
        try {
            $profile = $this->profileRepository->getByUuid($uuid);
        } catch (\Exception $e) {
            return new JsonResponse(null, Response::HTTP_BAD_REQUEST);
        }

        if (!$profile instanceof Profile) {
            return new JsonResponse(null, Response::HTTP_BAD_REQUEST);
        }

//        $this->em->remove($profile);
//        $this->em->flush();

        return new JsonResponse(null, Response::HTTP_OK);
    }
}