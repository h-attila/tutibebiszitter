<?php


namespace App\Service;

use App\Entity\Testimonials;
use App\Service\Abstract\ListItemsService;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\Pure;
use DoctrineExtensions\Query\Mysql\Rand;

class TestimonialsService extends ListItemsService
{
    #[Pure] public function __construct(EntityManagerInterface $entityManager)
    {
        $this->class = Testimonials::class;

        parent::__construct($entityManager);
    }

    /**
     * Listaelemek lekérdezése
     *
     * @param string $status
     * @param int $limit
     * @return array
     */
    function getList(string $status='active', int $limit = 3): array
    {
        $qb = $this->entityManager->getRepository($this->class)->createQueryBuilder('p');
        $qb
            ->select('p');

        switch ($status) {
            case 'active':
                $qb
                    ->where('p.enabled LIKE :value')
                    ->setParameter('value', true);
                break;

            case 'inactive':
                $qb
                    ->where('p.enabled LIKE :value')
                    ->setParameter('value', false);
                break;
        }

        return $qb
//            ->orderBy('RAND()')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }
}