<?php


namespace App\Service;

use App\Entity\Language;
use App\Service\Abstract\ListItemsService;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\Pure;

class LanguageService extends ListItemsService
{
    #[Pure] public function __construct(EntityManagerInterface $entityManager)
    {
        $this->class = Language::class;

        parent::__construct($entityManager);
    }
}