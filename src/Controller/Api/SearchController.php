<?php

namespace App\Controller\Api;

use App\Entity\Group;
use App\Entity\Handicap;
use App\Entity\Language;
use App\Entity\Place;
use App\Entity\Service;
use App\Repository\ProfileRepository;
use App\Service\GroupService;
use App\Service\HandicapService;
use App\Service\LanguageService;
use App\Service\PlaceService;
use App\Service\ServiceService;
use Doctrine\ORM\Configuration;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Pagerfanta\Adapter\NullAdapter;
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
    /**
     * @param SerializerInterface $serializer
     * @param ProfileRepository $profileRepository
     * @param LoggerInterface $logger
     */
    public function __construct(
        protected SerializerInterface $serializer,
        protected ProfileRepository   $profileRepository,
        protected LoggerInterface     $logger
    )
    {
    }

    /**
     * @Route("/search-init", methods={"GET"}, name="init")
     *
     * @return JsonResponse
     */
    public function init(
        ServiceService  $serviceService,
        GroupService    $groupService,
        PlaceService    $placeService,
        LanguageService $languageService,
        HandicapService $handicapService
    ): Response
    {
        $res = [
            'service' => $serviceService->getList('active'),
            'group' => $groupService->getList('active'),
            'place' => $placeService->getPlaceOptions(),
            'language' => $languageService->getList('active'),
            'handicap' => $handicapService->getList('active'),
        ];

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
        $newMembers = [
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

        return new JsonResponse($newMembers, Response::HTTP_OK);
    }
}
