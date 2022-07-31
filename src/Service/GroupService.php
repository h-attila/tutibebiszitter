<?php


namespace App\Service;

use App\Entity\Group;
use App\Service\Abstract\ListItemsService;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\Pure;

class GroupService extends ListItemsService
{
    #[Pure] public function __construct(EntityManagerInterface $entityManager)
    {
        $this->class = Group::class;

        parent::__construct($entityManager);
    }
}