<?php

namespace App\Repository;

use App\Entity\AppLog;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method AppLog|null find($id, $lockMode = null, $lockVersion = null)
 * @method AppLog|null findOneBy(array $criteria, array $orderBy = null)
 * @method AppLog[]    findAll()
 * @method AppLog[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AppLogRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AppLog::class);
    }
}
