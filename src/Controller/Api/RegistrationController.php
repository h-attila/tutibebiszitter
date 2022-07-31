<?php

namespace App\Controller\Api;

use App\Entity\AdditionalService;
use App\Entity\Group;
use App\Entity\Language;
use App\Entity\Package;
use App\Entity\PayMode;
use App\Entity\Place;
use App\Entity\Profile;
use App\Entity\Service;
use App\Form\ProfileFormType;
use App\Service\AdditionalServiceService;
use App\Service\GroupService;
use App\Service\LanguageService;
use App\Service\PackageService;
use App\Service\PayModeService;
use App\Service\PlaceService;
use App\Service\ServiceService;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\String\Slugger\SluggerInterface;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use SymfonyCasts\Bundle\VerifyEmail\VerifyEmailHelperInterface;

/**
 * Class RegistrationController
 * @package App\Controller\Api
 *
 * @Route("/api/registration", name="api_registration_")        // todo: api kulcsot cserélni ajax -ra mindenhol.
 */
class RegistrationController extends AbstractController
{
    public function __construct(protected EntityManagerInterface     $em,
                                protected ValidatorInterface         $validator,
                                protected SluggerInterface           $slugger,
                                protected SerializerInterface        $serializer,
                                protected VerifyEmailHelperInterface $emailHelper,
                                protected MailerInterface            $mailer
    )
    {}


    /**
     * @Rest\Post("/register", methods={"POST"}, name="register")
     *
     * @param Request $request
     * @param UserPasswordHasherInterface $passwordHasher
     * @return Response
     */
    public function register(Request $request, UserPasswordHasherInterface $passwordHasher): Response
    {
        $profile = new Profile();

        $form = $this->createForm(ProfileFormType::class, $profile);
        $data = json_decode($request->getContent(), true);
        $form->submit($data);

        if ($form->isValid()) {
            $errors = [];

            if ($data['plainPassword'] !== $data['rePlainPassword']) {
                $errors['plainPassword'] = 'A megadott jelszavak nem egyeznek.';
            }

            // services
            $allowedServices = $this->em->getRepository(Service::class)->findBy(['enabled' => '1']);
            $services = [];
            foreach ($data['service'] as $k => $v) {
                if ($v) {
                    $services[] = $k;
                }
            }
            if (!empty($allowedServices) && !empty($services)) {
                $found = false;
                /* @var Service $service */
                foreach ($allowedServices as $service) {
                    if (array_key_exists($service->getId(), $data['service'])) {
                        $found = true;
                        $profile->addService($service);
                    }
                }
                if (!$found) {
                    $errors['service'] = 'Hiba történt a szolgáltatás kiválasztásakor.';
                }
            } else {
                $errors['service'] = 'Legalább egy szolgáltatás kiválasztása kötelező.';        // todo: kiváltani entity validátorokkal.
            }

            // additional services
            $allowedAdditionalServices = $this->em->getRepository(AdditionalService::class)->findBy(['enabled' => '1']);
            $additionalServices = [];
            foreach ($data['additionalService'] as $k => $v) {
                if ($v) {
                    $additionalServices[] = $k;
                }
            }
            if (!empty($allowedAdditionalServices) && !empty($additionalServices)) {
                /* @var AdditionalService $additionalService */
                foreach ($allowedAdditionalServices as $additionalService) {
                    if (array_key_exists($additionalService->getId(), $data['additionalService'])) {
                        $profile->addAdditionalService($additionalService);
                    }
                }
            }

            // languages
            $allowedLanguages = $this->em->getRepository(Language::class)->findBy(['enabled' => '1']);
            $languages = [];
            foreach ($data['language'] as $k => $v) {
                if ($v) {
                    $languages[] = $k;
                }
            }
            if (!empty($allowedLanguages) && !empty($languages)) {
                /* @var Language $language */
                foreach ($allowedLanguages as $language) {
                    if (array_key_exists($language->getId(), $data['language'])) {
                        $profile->addLanguage($language);
                    }
                }
            } else {
                $errors['language'] = 'Legalább egy nyelv kiválasztása kötelező.';
            }

            // groups
            $allowedGroups = $this->em->getRepository(Group::class)->findBy(['enabled' => '1']);
            $group = [];
            foreach ($data['groups'] as $k => $v) {
                if ($v) {
                    $group[] = $k;
                }
            }
            if (!empty($allowedGroups) && !empty($group)) {
                $found = false;
                /* @var Group $group */
                foreach ($allowedGroups as $allowedGroup) {
                    if (array_key_exists($allowedGroup->getId(), $data['groups'])) {
                        $found = true;
                        $profile->addGroup($allowedGroup);
                    }
                }
                if (!$found) {
                    $errors['groups'] = 'Hiba történt a csoport kiválasztásakor.';
                }
            } else {
                $errors['groups'] = 'Legalább egy csoport kiválasztása kötelező.';
            }

            // places
            $allowedPlaces = $this->em->getRepository(Place::class)->findBy(['enabled' => '1']);
            $places = [];
            foreach ($data['place'] as $p) {
                $places[] = $p['value'];
            }

            // budapest összes kerületét kivesszük, és egyesével rakjuk bele
            if (($key = array_search('1', $places)) !== false) {
                unset($places[$key]);
                $places = array_merge($places, ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']);
            }

            if (!empty($allowedPlaces) && !empty($places)) {
                $found = false;

                /* @var Place $place */
                foreach ($allowedPlaces as $place) {
                    if (in_array($place->getCityCode(), $places)) {
                        $profile->addPlace($place);
                        $found = true;
                    }
                }
                if (!$found) {
                    $errors['place'] = 'Hiba történt a helyszín kiválasztásakor.';
                }
            } else {
                $errors['place'] = 'Legalább egy helyszín kiválasztása kötelező.';
            }

            // payMode
            $allowedPayModes = $this->em->getRepository(PayMode::class)->findBy(['enabled' => '1']);
            if (!empty($allowedPayModes) && !empty($data['payMode'])) {
                $found = false;
                /* @var PayMode $payMode */
                foreach ($allowedPayModes as $payMode) {
                    if ($payMode->getId() == $data['payMode']) {
                        $profile->setPayMode($payMode);
                        $found = true;
                        break;
                    }
                }
                if (!$found) {
                    $errors['payMode'] = 'Hiba történt a fizetési mód kiválasztásakor.';
                }
            } else {
                $errors['payMode'] = 'Fizetési mód kiválasztása kötelező.';
            }

            // package
            $allowedPackages = $this->em->getRepository(Package::class)->findBy(['enabled' => '1']);
            if (!empty($allowedPackages) && !empty($data['package'])) {
                $found = false;
                /* @var Package $package */
                foreach ($allowedPackages as $package) {
                    if ($package->getId() == $data['package']) {
                        $profile->setPackage($package);
                        $found = true;
                        break;
                    }
                }
                if (!$found) {
                    $errors['package'] = 'Hiba történt a díjcsomag kiválasztásakor.';
                }
            } else {
                $errors['package'] = 'Díjcsomag kiválasztása kötelező.';
            }

            // aszf
            if ($data['aszf'] !== true) {
                $errors['package'] = 'Kérlek, fogadd el az adatkezelési tájékoztatót, és az Áltaános Szerződési Feltételeket.';
            }

            if (!empty($errors)) {
                $response = [
                  'errors' => $errors
                ];

                return new JsonResponse($response, Response::HTTP_BAD_REQUEST);
            }

            // innentől jók vagyunk, mentünk.
            $uuid = Uuid::v4();
            $now = new \DateTime();
//            $pwd = $passwordEncoder->encodePassword($profile, $data['password']);
            $slug = $this->slugger->slug($data['name'], '-', 'de');

            $profile
              ->setUuid($uuid)
              ->setEnabled(false)
              ->setActive(false)
              ->setNewMember(true)
              ->setSlug($slug)
              ->setCreated($now)
              ->setLastUpdate($now)
              ->setRoles(['ROLE_USER']);

//            $user = new User();
//            $user->setEmail($data['email'])
//              ->setRoles(['ROLE_USER'])
//              ->setUuid($uuid)
//              ->setProfile($profile);

            $hashedPassword = $passwordHasher->hashPassword(
              $profile,
              $data['plainPassword']
            );

            $profile->setPassword($hashedPassword);

            $this->em->persist($profile);
            $this->em->flush();

            // email küldés
//            $signatureComponents = $this->emailHelper->generateSignature(
//              'registration_confirmation_route',
//              $user->getId(),
//              $user->getEmail()
//            );

//            $email = (new TemplatedEmail())
//              ->from($_ENV['CUSTOMER_SERVICE_EMAIL_ADDRESS'])
//              ->to($user->getEmail())
//              ->addBcc($_ENV['CUSTOMER_SERVICE_EMAIL'])
//              ->subject('CUSTOMER_SERVICE_EMAIL_SUBJECT')
//              ->htmlTemplate('emails/registration.html.twig')       // todo: létrehozni
//              ->context([
//                'signedUrl' => $signatureComponents->getSignedUrl()
//              ]);
//
//            try {
//                $this->mailer->send($email);
//            } catch (TransportExceptionInterface $e) {
//                $response = [
//                  'errors' => 'Email küldés sikertelen.'
//                ];
//
//                return new JsonResponse($response, Response::HTTP_BAD_REQUEST);
//            }

            return new JsonResponse(null, Response::HTTP_CREATED);
        }

        $msg = [];
        $errors = $this->validator->validate($profile);
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
     * @Route("/packages-init", methods={"GET"}, name="packagesInit")
     *
     * @return JsonResponse
     */
    public function packagesInit(PackageService $packageService): Response
    {
        $list = $packageService->getList('active');

        $json = $this->serializer->serialize($list, 'json', ['groups' => ['public']]);

        return JsonResponse::fromJsonString($json, Response::HTTP_OK);
    }

    /**
     * @Route("/additional-services-init", methods={"GET"}, name="additionalServicesInit")
     *
     * @return JsonResponse
     */
    public function additionalServiceInit(AdditionalServiceService $additionalServiceService): Response
    {
        $list = $additionalServiceService->getList('active');

        $json = $this->serializer->serialize($list, 'json', ['groups' => ['public']]);

        return JsonResponse::fromJsonString($json, Response::HTTP_OK);
    }

    /**
     * @Route("/services-init", methods={"GET"}, name="servicesInit")
     *
     * @return JsonResponse
     */
    public function serviceInit(ServiceService $serviceService): Response
    {
        $list = $serviceService->getList('active');

        $json = $this->serializer->serialize($list, 'json', ['groups' => ['public']]);

        return JsonResponse::fromJsonString($json, Response::HTTP_OK);
    }

    /**
     * @Route("/languages-init", methods={"GET"}, name="languagesInit")
     *
     * @return JsonResponse
     */
    public function languagesInit(LanguageService $languageService): Response
    {
        $list = $languageService->getList('active');

        $json = $this->serializer->serialize($list, 'json', ['groups' => ['public']]);

        return JsonResponse::fromJsonString($json, Response::HTTP_OK);
    }

    /**
     * @Route("/places-init", methods={"GET"}, name="placesInit")
     *
     * @return JsonResponse
     */
    public function placesInit(PlaceService $placeService): Response
    {
        $list = $placeService->getPlaceOptions();

        $json = $this->serializer->serialize($list, 'json', ['groups' => ['public']]);      // todo: Groups nem működik, a listában ott van minden adat a reg felületen.

        return JsonResponse::fromJsonString($json, Response::HTTP_OK);
    }

    /**
     * @Route("/groups-init", methods={"GET"}, name="groupsInit")
     *
     * @return JsonResponse
     */
    public function groupsInit(GroupService $groupService): Response
    {
        $list = $groupService->getList('active');

        $json = $this->serializer->serialize($list, 'json', ['groups' => ['public']]);

        return JsonResponse::fromJsonString($json, Response::HTTP_OK);
    }

    /**
     * @Route("/paymodes-init", methods={"GET"}, name="paymodesInit")
     */
    public function paymodesInit(PayModeService $payModeService): Response
    {
        $list = $payModeService->getList('active');

        $json = $this->serializer->serialize($list, 'json', ['groups' => ['public']]);

        return JsonResponse::fromJsonString($json, Response::HTTP_OK);
    }
}
