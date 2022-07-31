<?php

namespace App\Controller\Profile\Api;

use App\Entity\PayMode;
use App\Form\PayModeFormType;
use App\Service\PayModeService;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * Class PayModeController
 * @package App\Controller\Profile\Api
 *
 * @Route("/profilom/api/list-items/paymode", name="profile_api_list_items_pay_mode_")
 */
class PayModeController extends ListItemsController
{
    /**
     * @param EntityManagerInterface $entityManager
     * @param PayModeService $payModeService
     * @param SerializerInterface $serializer
     */
    #[Pure] public function __construct(
      protected EntityManagerInterface $entityManager,
      PayModeService                   $payModeService,
      SerializerInterface              $serializer
    )
    {
        $this->class = PayMode::class;
        $this->formType = PayModeFormType::class;
        $this->service = $payModeService;
        $this->serializer = $serializer;

        parent::__construct($this->entityManager);
    }
}
