<?php

namespace App\Controller\Profile\Api;

use App\Entity\Package;
use App\Form\PackageFormType;
use App\Service\PackageService;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * Class PackageController
 * @package App\Controller\Profile\Api
 *
 * @Route("/profilom/api/list-items/package", name="profile_api_list_items_package_")
 */
class PackageController extends ListItemsController
{
    /**
     * @param EntityManagerInterface $entityManager
     * @param PackageService $packageService
     * @param SerializerInterface $serializer
     */
    #[Pure] public function __construct(
      protected EntityManagerInterface $entityManager,
      PackageService                   $packageService,
      SerializerInterface              $serializer
    )
    {
        $this->class = Package::class;
        $this->formType = PackageFormType::class;
        $this->service = $packageService;
        $this->serializer = $serializer;

        parent::__construct($this->entityManager);
    }
}
