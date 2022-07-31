<?php


namespace App\Service;

use App\Entity\Package;
use App\Service\Abstract\ListItemsService;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\Pure;

class PackageService extends ListItemsService
{
    #[Pure] public function __construct(EntityManagerInterface $entityManager)
    {
        $this->class = Package::class;

        parent::__construct($entityManager);
    }

    /**
     * Díjcsomagok listája.
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

        if ($publicOnly) {
            $qb
              ->where('p.public LIKE :value')
              ->setParameter('value', true);
        }

        return $qb
          ->orderBy('p.weight', 'ASC')
          ->getQuery()
          ->getResult();
    }
}