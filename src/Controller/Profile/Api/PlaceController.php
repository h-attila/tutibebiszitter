<?php

namespace App\Controller\Profile\Api;

use App\Entity\Place;
use App\Form\PlaceFormType;
use App\Service\PlaceService;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * Class PlaceControllerC
 * @package App\Controller\Profile\Api
 *
 * @Route("/profilom/api/list-items/place", name="profile_api_list_items_place_")
 */
class PlaceController extends ListItemsController
{
    /**
     * @param EntityManagerInterface $entityManager
     * @param PlaceService $placeService
     * @param SerializerInterface $serializer
     */
    #[Pure] public function __construct(
      protected EntityManagerInterface $entityManager,
      PlaceService                     $placeService,
      SerializerInterface              $serializer
    )
    {
        $this->class = Place::class;
        $this->formType = PlaceFormType::class;
        $this->service = $placeService;
        $this->serializer = $serializer;

        parent::__construct($this->entityManager);
    }


    /**
     * Lista lekérése
     *
     * @Route("/get-list", methods={"GET"}, name="get_list")
     *
     * @return Response
     */
    public function getList(): Response
    {
        $list = $this->service->getPlaceOptions();

        $json = $this->serializer->serialize($list, 'json', ['groups' => ['user_admin']]);

        return JsonResponse::fromJsonString($json, Response::HTTP_OK);
    }
}
