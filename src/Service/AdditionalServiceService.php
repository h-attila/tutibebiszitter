<?php


namespace App\Service;

use App\Entity\AdditionalService;
use App\Service\Abstract\ListItemsService;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\Pure;

class AdditionalServiceService extends ListItemsService
{
    #[Pure] public function __construct(EntityManagerInterface $entityManager)
    {
        $this->class = AdditionalService::class;

        parent::__construct($entityManager);
    }
}