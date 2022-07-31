<?php


namespace App\Service;

use App\Entity\PayMode;
use App\Service\Abstract\ListItemsService;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\Pure;

class PayModeService extends ListItemsService
{
    #[Pure] public function __construct(EntityManagerInterface $entityManager)
    {
        $this->class = PayMode::class;

        parent::__construct($entityManager);
    }
}