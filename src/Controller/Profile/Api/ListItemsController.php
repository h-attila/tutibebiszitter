<?php

namespace App\Controller\Profile\Api;


use App\Service\Abstract\ListItemsService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @package App\Controller\Profile\Api
 *
 * @Route("/profilom/api/list-items", name="profile_api_list_items_")
 */
class ListItemsController extends AbstractController
{
    protected string $class;
    protected string $formType;
    protected ListItemsService $service;
    protected SerializerInterface $serializer;

    /**
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(
      protected EntityManagerInterface $entityManager,
    )
    {}

    /**
     * Lista lekérése
     *
     * @Route("/get-list", methods={"GET"}, name="get_list")
     *
     * @return Response
     */
    public function getList(): Response
    {
        $list = $this->service->getList('active');

        $json = $this->serializer->serialize($list, 'json', ['groups' => ['user_profile']]);

        return JsonResponse::fromJsonString($json, Response::HTTP_OK);
    }
}