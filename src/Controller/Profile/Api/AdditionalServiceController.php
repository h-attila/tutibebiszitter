<?php

namespace App\Controller\Profile\Api;

use App\Entity\AdditionalService;
use App\Form\AdditionalServiceFormType;
use App\Service\AdditionalServiceService;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * Class AdditionalServiceController
 * @package App\Controller\Profile\Api
 *
 * @Route("/profilom/api/list-items/additional-service", name="profile_api_list_items_additional_service_")
 */
class AdditionalServiceController extends ListItemsController
{
    /**
     * @param EntityManagerInterface $entityManager
     * @param AdditionalServiceService $additionalService
     * @param SerializerInterface $serializer
     */
    #[Pure] public function __construct(
      protected EntityManagerInterface $entityManager,
      AdditionalServiceService         $additionalService,
      SerializerInterface              $serializer
    )
    {
        $this->class = AdditionalService::class;
        $this->formType = AdditionalServiceFormType::class;
        $this->service = $additionalService;
        $this->serializer = $serializer;

        parent::__construct($this->entityManager);
    }
}
