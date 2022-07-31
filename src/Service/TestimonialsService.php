<?php


namespace App\Service;

use App\Entity\Testimonials;
use App\Service\Abstract\ListItemsService;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\Pure;

class TestimonialsService extends ListItemsService
{
    #[Pure] public function __construct(EntityManagerInterface $entityManager)
    {
        $this->class = Testimonials::class;

        parent::__construct($entityManager);
    }
}