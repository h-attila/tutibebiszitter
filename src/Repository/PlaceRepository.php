<?php

namespace App\Repository;

use App\Entity\Place;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Place|null find($id, $lockMode = null, $lockVersion = null)
 * @method Place|null findOneBy(array $criteria, array $orderBy = null)
 * @method Place[]    findAll()
 * @method Place[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PlaceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Place::class);
    }

    /**
     * @return array
     */
    public function getPlaces(): array
    {
        return $this->createQueryBuilder('p')
          ->andWhere('p.enabled = :enabled')
          ->setParameter('enabled', '1')
          ->orderBy('p.id', 'ASC')
//          ->orderBy('p.stateLabel', 'ASC')
//          ->orderBy('p.cityLabel', 'ASC')
          ->getQuery()
          ->enableResultCache(3600)     // 3600sec = 1 óra      // todo: doctrine cache
          ->getResult();
    }
}
