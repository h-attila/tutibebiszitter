<?php

namespace App\Repository;

use App\Entity\Handicap;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Handicap|null find($id, $lockMode = null, $lockVersion = null)
 * @method Handicap|null findOneBy(array $criteria, array $orderBy = null)
 * @method Handicap[]    findAll()
 * @method Handicap[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class HandicapRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Handicap::class);
    }
}
