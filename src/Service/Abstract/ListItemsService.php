<?php

namespace App\Service\Abstract;

use Doctrine\ORM\EntityManagerInterface;

class ListItemsService
{
    protected string $class;

    /**
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(protected EntityManagerInterface $entityManager)
    {}

    /**
     * Listaelemek lekérdezése
     *
     * @param string $status
     * @return array
     */
    function getList(string $status='active'): array
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
          ->orderBy('p.weight', 'ASC')
          ->getQuery()
          ->getResult();
    }
}