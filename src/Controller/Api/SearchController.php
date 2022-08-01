<?php

namespace App\Controller\Api;

use App\Repository\ProfileRepository;
use App\Service\GroupService;
use App\Service\HandicapService;
use App\Service\LanguageService;
use App\Service\PlaceService;
use App\Service\ServiceService;
use Pagerfanta\Pagerfanta;
use Psr\Cache\InvalidArgumentException;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Contracts\Cache\CacheInterface;
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
     * @param CacheInterface $cache
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
        protected CacheInterface      $cache
    )
    {
    }

    /**
     * @Route("/search-init", methods={"GET"}, name="init")
     *
     * @return Response
     * @throws InvalidArgumentException
     */
    public function init(): Response
    {
        // todo: alap cache helyett memcached
        $res = $this->cache->get('tutibebiszitter_search_init', function (ItemInterface $item) {
            $item->expiresAfter(3600);

            return [
                'service' => $this->serviceService->getList('active'),
                'group' => $this->groupService->getList('active'),
                'place' => $this->placeService->getPlaceOptions(),
                'language' => $this->languageService->getList('active'),
                'handicap' => $this->handicapService->getList('active'),
            ];
        });

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
        $newMembers = $this->cache->get('tutibebiszitter_get_new_members', function (ItemInterface $item) {
            $item->expiresAfter(3600);

            return [
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
        });

        return new JsonResponse($newMembers, Response::HTTP_OK);
    }
}
