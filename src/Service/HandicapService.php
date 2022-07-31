<?php


namespace App\Service;

use App\Entity\Handicap;
use App\Service\Abstract\ListItemsService;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\Pure;

class HandicapService extends ListItemsService
{
    #[Pure] public function __construct(EntityManagerInterface $entityManager)
    {
        $this->class = Handicap::class;

        parent::__construct($entityManager);
    }
}