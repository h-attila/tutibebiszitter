<?php

namespace App\Service\Abstract;

use Doctrine\ORM\EntityManagerInterface;

abstract class ListItemsService
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
     * @param bool $publicOnly
     * @return array
     */
    function getList(string $status='active', bool $publicOnly = false): array
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