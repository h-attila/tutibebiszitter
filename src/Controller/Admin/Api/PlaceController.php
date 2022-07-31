<?php

namespace App\Controller\Admin\Api;

use App\Entity\Place;
use App\Form\PlaceFormType;
use App\Service\PlaceService;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * Class PlaceControllerC
 * @package App\Controller\Admin\Api
 *
 * @Route("/admin/api/list-items/place", name="admin_api_list_items_place_")
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
     * Kiegészítő szolgáltatás lista lekérése
     *
     * @Route("/get-list/{status}", methods={"GET"}, name="get_list")
     *
     * @param string $status
     * @return Response
     */
    public function getList(string $status): Response
    {
        $list = $this->service->getPlaceOptions();

        $json = $this->serializer->serialize($list, 'json', ['groups' => ['admin_admin']]);

        return JsonResponse::fromJsonString($json, Response::HTTP_OK);
    }

    /**
     * @Route("/set-enabled", methods={"PUT"}, name="set_enabled")
     *
     * @param Request $request
     * @return Response
     */
    public function setEnabled(Request $request): Response
    {
        return parent::setEnabled($request);
    }
}
