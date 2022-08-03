<?php

namespace App\Controller\Api;

use App\Repository\ProfileRepository;
use App\Service\GroupService;
use App\Service\HandicapService;
use App\Service\LanguageService;
use App\Service\PlaceService;
use App\Service\ServiceService;
use Lcobucci\JWT\Exception;
use Pagerfanta\Pagerfanta;
use Psr\Cache\InvalidArgumentException;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Cache\Adapter\MemcachedAdapter;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Contracts\Cache\ItemInterface;

/**
 * Class SearchController
 * @package App\Controller\Api
 * @Route("/api/search", name="api_search_")
 */
class SearchController extends AbstractController
{
    /**
     * @param SerializerInterface $serializer
     * @param ProfileRepository $profileRepository
     * @param LoggerInterface $logger
     * @param ServiceService $serviceService
     * @param GroupService $groupService
     * @param PlaceService $placeService
     * @param LanguageService $languageService
     * @param HandicapService $handicapService
     */
    public function __construct(
        protected SerializerInterface $serializer,
        protected ProfileRepository   $profileRepository,
        protected LoggerInterface     $logger,
        protected ServiceService      $serviceService,
        protected GroupService        $groupService,
        protected PlaceService        $placeService,
        protected LanguageService     $languageService,
        protected HandicapService     $handicapService,
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


        $json = $this->serializer->serialize($res, 'json', ['groups' => ['public']]);

        return JsonResponse::fromJsonString($json, Response::HTTP_OK);
    }

    /**
     * @Route("/search-members", methods={"POST"}, name="searchMembers")
     *
     * @param Request $request
     * @return Response
     */
    public function searchMembers(Request $request): Response
    {
        $content = json_decode($request->getContent(), true);
        $currentPage = $content['pagination'] ?? 0;
        $currentPage++;

        $results = $this->profileRepository->search(
            $content['searchParams']['service']['id'] ?? null,
            $content['searchParams']['place']['id'] ?? null,
            $content['searchParams']['group']['id'] ?? null,
            $content['searchParams']['handicap']['id'] ?? null,
            $content['searchParams']['language']['id'] ?? null,
            $currentPage,
        );

        $json = $this->serializer->serialize($results, 'json', ['groups' => 'admin_profile']);

        return JsonResponse::fromJsonString($json, Response::HTTP_OK);
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
