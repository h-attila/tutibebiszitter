<?php


namespace App\Service;

use App\Entity\Service;
use App\Service\Abstract\ListItemsService;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\Pure;

class ServiceService extends ListItemsService
{
    #[Pure] public function __construct(EntityManagerInterface $entityManager)
    {
        $this->class = Service::class;

        parent::__construct($entityManager);
    }
}