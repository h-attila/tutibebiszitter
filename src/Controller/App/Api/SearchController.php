<?php

namespace App\Controller\App\Api;

use App\Entity\Hit;
use App\Entity\Profile;
use App\Entity\SearchHistory;
use App\Repository\GroupRepository;
use App\Repository\HandicapRepository;
use App\Repository\LanguageRepository;
use App\Repository\PlaceRepository;
use App\Repository\ProfileRepository;
use App\Repository\ServiceRepository;
use App\Service\GroupService;
use App\Service\HandicapService;
use App\Service\LanguageService;
use App\Service\PlaceService;
use App\Service\ServiceService;
use Doctrine\ORM\EntityManagerInterface;
use Pagerfanta\Adapter\ArrayAdapter;
use Pagerfanta\Pagerfanta;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * Class SearchController
 * @package App\Controller\Api
 * @Route("/api/search", name="api_search_")
 */
class SearchController extends AbstractController
{
    const MAX_RESULTS_PER_PAGE = 3;

    /**
     * @param SerializerInterface $serializer
     * @param ProfileRepository $profileRepository
     * @param LoggerInterface $logger
     * @param ServiceService $serviceService
     * @param GroupService $groupService
     * @param PlaceService $placeService
     * @param LanguageService $languageService
     * @param HandicapService $handicapService
     * @param EntityManagerInterface $em
     * @param ServiceRepository $serviceRepository
     * @param PlaceRepository $placeRepository
     * @param GroupRepository $groupRepository
     * @param HandicapRepository $handicapRepository
     * @param LanguageRepository $languageRepository
     */
    public function __construct(
        protected SerializerInterface    $serializer,
        protected ProfileRepository      $profileRepository,
        protected LoggerInterface        $logger,
        protected ServiceService         $serviceService,
        protected GroupService           $groupService,
        protected PlaceService           $placeService,
        protected LanguageService        $languageService,
        protected HandicapService        $handicapService,
        protected EntityManagerInterface $em,
        protected ServiceRepository      $serviceRepository,
        protected PlaceRepository        $placeRepository,
        protected GroupRepository        $groupRepository,
        protected HandicapRepository     $handicapRepository,
        protected LanguageRepository     $languageRepository
    )
    {
    }

    /**
     * @Route("/search-init", methods={"GET"}, name="init")
     *
     * @return Response
     * @throws \ErrorException
     */
    public function init(): Response
    {
        // todo: alap cache helyett memcached
        // update: memcached telepítés nem sikerült, "Memcached > 3.1.5 is required." a hibaüzenet. Pont 3.1.5-ös verzió van a mam alá betéve... Várni kicsit, hátha frissül
        // itt van jó leírás a telepítéshez: https://crunchify.com/install-setup-memcached-mac-os-x/
//        try {
//            $client = MemcachedAdapter::createConnection(
//                'memcached://localhost:11211',
//                []
//            );
//
//            $res = $client->get('tutibebiszitter.search.init', function (ItemInterface $item) {
//                $item->expiresAfter(3600);
//
//                return [
//                    'service' => $this->serviceService->getList('active'),
//                    'group' => $this->groupService->getList('active'),
//                    'place' => $this->placeService->getPlaceOptions(),
//                    'language' => $this->languageService->getList('active'),
//                    'handicap' => $this->handicapService->getList('active'),
//                    'cache'=> 'ok'
//                ];
//            });
//        } catch (Exception $e) {
        $res = [
            'service' => $this->serviceService->getList('active'),
            'group' => $this->groupService->getList('active'),
            'place' => $this->placeService->getPlaceOptions(),
            'language' => $this->languageService->getList('active'),
            'handicap' => $this->handicapService->getList('active'),
        ];
//        }


        $json = $this->serializer->serialize($res, 'json', ['groups' => ['public_profile']]);

        return JsonResponse::fromJsonString($json, Response::HTTP_OK);
    }

    /**
     * @Route("/search-profiles", methods={"POST"}, name="searchProfiles")
     *
     * @param Request $request
     * @return Response
     */
    public function searchProfiles(Request $request): Response
    {
        $content = json_decode($request->getContent(), true);
        $currentPage = $content['pagination'] ?? 0;
        $currentPage++;

        $serviceId = $content['searchParams']['service']['id'] ?? null;
        $placeId = $content['searchParams']['place']['id'] ?? null;
        $groupId = $content['searchParams']['group']['id'] ?? null;
        $handicapId = $content['searchParams']['handicap']['id'] ?? null;
        $languageId = $content['searchParams']['language']['id'] ?? null;

        $profiles = $this->profileRepository->search(
            $serviceId,
            $placeId,
            $groupId,
            $handicapId,
            $languageId,
        );

        $service = is_null($serviceId) ? null : $this->serviceRepository->find($serviceId);
        $place = is_null($placeId) ? null : $this->placeRepository->find($placeId);
        $group = is_null($groupId) ? null : $this->groupRepository->find($groupId);
        $handicap = is_null($handicapId) ? null : $this->handicapRepository->find($handicapId);
        $language = is_null($languageId) ? null : $this->languageRepository->find($languageId);

        // mentjük a keresést
        $searchHistory = new SearchHistory();
        $searchHistory
            ->setService($service)
            ->setPlace($place)
            ->setGroups($group)
            ->setHandicap($handicap)
            ->setLanguage($language)
            ->setFound(count($profiles))
            ->setCreated(new \DateTime());

        $this->em->persist($searchHistory);
        $this->em->flush();

        $now = new \DateTime();
        $highlighted = [];
        $normal = [];

        /* @var Profile $profile */
        foreach ($profiles as $profile) {
            if (!is_null($profile->getHighlighted()) && $profile->getHighlighted() > $now) {
                $highlighted[] = $profile;
            } else {
                // ha lejárt a kiemelés, töröljük, így könnyebb a fronton, ha van érték, akkor kiemelt
                if (!is_null($profile->getHighlighted())) {
                    $profile->setHighlighted(null);
                }
                $normal[] = $profile;
            }
        }

        $orderedProfiles = array_merge($highlighted, $normal);

        $adapter = new ArrayAdapter($orderedProfiles);
        $pagerfanta = new Pagerfanta($adapter);
        $pagerfanta
            ->setMaxPerPage(self::MAX_RESULTS_PER_PAGE)
            ->setCurrentPage($currentPage);

        $results = [
            'result' => $adapter->getSlice(($currentPage - 1) * self::MAX_RESULTS_PER_PAGE, self::MAX_RESULTS_PER_PAGE),
            'pagination' => [
                'nbResults' => $pagerfanta->getNbResults(),
                'nbPages' => $pagerfanta->getNbPages(),
                'haveToPaginate' => $pagerfanta->haveToPaginate(),
                'hasPreviousPage' => $pagerfanta->hasPreviousPage(),
                'hasNextPage' => $pagerfanta->hasNextPage()
            ]
        ];

        $json = $this->serializer->serialize($results, 'json', ['groups' => 'admin_profile']);

        return JsonResponse::fromJsonString($json, Response::HTTP_OK);
    }

    /**
     * Admin profil lekérdezés.
     *
     * @param string $slug
     * @return Response
     *
     * @Route("/get-profile/{slug}", methods={"GET"}, name="get_profile")
     */
    public function getProfile(string $slug): Response
    {
        $p = $this->em->getRepository(Profile::class);

        /* @var $profile Profile */
        $profile = $p->findOneBy([
            'slug' => $slug
        ]);

        $now = new \DateTime();
        if (!$profile || !$profile->getActive() || !$profile->getEnabled() || $profile->getRegStart()?->format('Y-m-d') > $now->format('Y-m-d') || $profile->getRegEnd()?->format('Y-m-d') < $now->format('Y-m-d')) {
            return new JsonResponse(null, Response::HTTP_NO_CONTENT);
        }

        // kiemelések
        $badges = [];
        if ($profile->getNewMemberSign()?->format('Y-m-d') >= (new \DateTime())->format('Y-m-d')) {
            $badges[] = "Új tag";
        }
        if ($profile->getHighlighted()?->format('Y-m-d') >= (new \DateTime())->format('Y-m-d')) {
            $badges[] = "Kiemelt";
        }

        $data = [
            'profile' => $profile,
            'badges' => $badges
        ];

        // mentjük a keresési eseményt
        $hit = new Hit();
        $hit
            ->setCreated(new \DateTime());
        $profile
            ->addHit($hit);

        $this->em->persist($hit);
        $this->em->persist($profile);
        $this->em->flush();

        $json = $this->serializer->serialize($data, 'json', ['groups' => ['public_profile']]);

        return JsonResponse::fromJsonString($json);
    }

    /**
     * @Route("/new-members", methods={"GET"}, name="new_members")
     */
    public function getNewMembers(): Response
    {
        // todo: alap cache helyett memcached

        $res = [
            [
                'id' => 1,
                'name' => 'Ben Johnson 1',
                'description' => 'Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est, et interdum justo suscipit id. Etiam dictum feugiat tellus, a semper massa.',
                'place' => 'Budapest - Kelenföld és környéke, Százhalombatta',
                'image' => 'horvath_annamaria.jpg',
                'url' => '#'
            ],
            [
                'id' => 2,
                'name' => 'Ben Johnson 2',
                'description' => 'Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est, et interdum justo suscipit id. Etiam dictum feugiat tellus, a semper massa.',
                'place' => 'Budapest - Kelenföld és környéke, Százhalombatta',
                'image' => 'kecskemeti_zsuzsi.jpeg',
                'url' => '#'
            ],
            [
                'id' => 3,
                'name' => 'Ben Johnson 3',
                'description' => 'Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est, et interdum justo suscipit id. Etiam dictum feugiat tellus, a semper massa.',
                'place' => 'Budapest - Kelenföld és környéke, Százhalombatta',
                'image' => 'viz_panna.jpg',
                'url' => '#'
            ]
        ];

        return new JsonResponse($res, Response::HTTP_OK);
    }
}
