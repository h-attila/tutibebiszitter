<?php

namespace App\Controller\Profile\Api;

use App\Entity\Service;
use App\Form\ServiceFormType;
use App\Service\ServiceService;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * Class ServiceController
 * @package App\Controller\Profile\Api
 *
 * @Route("/profilom/api/list-items/service", name="profile_api_list_items_service_")
 */
class ServiceController extends ListItemsController
{
    /**
     * @param EntityManagerInterface $entityManager
     * @param ServiceService $service
     * @param SerializerInterface $serializer
     */
    #[Pure] public function __construct(
      protected EntityManagerInterface $entityManager,
      ServiceService                   $service,
      SerializerInterface              $serializer
    )
    {
        $this->class = Service::class;
        $this->formType = ServiceFormType::class;
        $this->service = $service;
        $this->serializer = $serializer;

        parent::__construct($this->entityManager);
    }
}