<?php

namespace App\Repository;

use App\Entity\Profile;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Pagerfanta\Doctrine\ORM\QueryAdapter;
use Pagerfanta\Pagerfanta;

/**
 * @method Profile|null find($id, $lockMode = null, $lockVersion = null)
 * @method Profile|null findOneBy(array $criteria, array $orderBy = null)
 * @method Profile[]    findAll()
 * @method Profile[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProfileRepository extends ServiceEntityRepository
{
    /**
     * @param ManagerRegistry $registry
     * @param PlaceRepository $placeRepository
     */
    public function __construct(ManagerRegistry $registry, protected PlaceRepository $placeRepository)
    {
        parent::__construct($registry, Profile::class);
    }

    /**
     * Tagok keresése.
     *
     * @param int|null $service
     * @param int|null $place
     * @param int|null $group
     * @param int|null $handicap
     * @param int|null $language
     * @return array
     */
    public function search(?int $service, ?int $place, ?int $group, ?int $handicap, ?int $language): array
    {
        $now = new \DateTime();

        $qb = $this->createQueryBuilder('profile');
        $qb
            ->where('profile.enabled = :enabled')
            ->andWhere('profile.active = :active')
            ->setParameter('enabled', true)
            ->setParameter('active', true);
        $qb
            ->andWhere('profile.regStart <= :now')
            ->andWhere('profile.regEnd >= :now')
            ->setParameter('now', $now->format('Y-m-d'));
        if ($service) {
            $qb
                ->leftJoin('profile.services', 's')
                ->andWhere('s.id = :service')
                ->setParameter('service', $service);
        }
        if ($place) {
            // budapest összes kerülete esetén budapestre szűrünk
            if ($place == 1) {
                $qb
                    ->leftJoin('profile.places', 'p')
                    ->andWhere(
                        $qb->expr()->like('p.cityCode', ':budapest')
                    )
                    ->setParameter(':budapest', '%budapest%');
            } else {
                $qb
                    ->leftJoin('profile.places', 'p')
                    ->andWhere('p.id = :place')
                    ->setParameter('place', $place);
            }
        }
        if ($group) {
            $qb
                ->leftJoin('profile.groups', 'g')
                ->andWhere('g.id = :group')
                ->setParameter('group', $group);
        }
        if ($handicap) {
            $qb
                ->leftJoin('profile.handicaps', 'h')
                ->andWhere('h.id = :handicap')
                ->setParameter('handicap', $handicap);
        }
        if ($language) {
            $qb
                ->leftJoin('profile.languages', 'l')
                ->andWhere('l.id = :language')
                ->setParameter('language', $language);
        }

        return $qb
            ->orderBy('profile.lastRenewed', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Profilok szűrése - mindenki
     *
     * @param int $from
     * @param int $limit
     * @return array
     */
    public function getAllProfiles(int $from = 0, int $limit = 50): array
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.roles LIKE :role')
            ->setParameter('role', '%ROLE_USER%')
            ->orderBy('p.lastRenewed', 'ASC')
            ->setFirstResult($from)
            ->setMaxResults($limit)
            ->getQuery()
            ->getArrayResult();
    }

    /**
     * Profilok szűrése - újak
     *
     * @param int $from
     * @param int $limit
     * @return array
     */
    public function getNewProfiles(int $from = 0, int $limit = 50): array
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.newMember = :val')
            ->andWhere('p.roles LIKE :role')
            ->setParameter('val', '1')
            ->setParameter('role', '%ROLE_USER%')
            ->orderBy('p.id', 'ASC')
            ->setFirstResult($from)
            ->setMaxResults($limit)
            ->getQuery()
            ->getArrayResult();
    }

    /**
     * Profilok szűrése - aktívak
     *
     * @param int $from
     * @param int $limit
     * @return array
     */
    public function getActiveProfiles(int $from = 0, int $limit = 50): array
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.active = :act')
            ->andWhere('p.roles LIKE :role')
            ->setParameter('act', '1')
            ->setParameter('role', '%ROLE_USER%')
            ->orderBy('p.lastRenewed', 'ASC')
            ->setFirstResult($from)
            ->setMaxResults($limit)
            ->getQuery()
            ->getArrayResult();
    }

    /**
     * Profilok szűrése - inaktívak
     *
     * @param int $from
     * @param int $limit
     * @return array
     */
    // todo: itt pontosítani a feltételeket, hogy miért is lehet valaki inaktív (kikapcsola a tagságot, lejárt, nincs engedélyezve, stb.)
    public function getInactiveProfiles(int $from = 0, int $limit = 50): array
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.active = :act')
            ->andWhere('p.roles LIKE :role')
            ->setParameter('act', '0')
            ->setParameter('role', '%ROLE_USER%')
            ->orderBy('p.lastRenewed', 'ASC')
            ->setFirstResult($from)
            ->setMaxResults($limit)
            ->getQuery()
            ->getArrayResult();
    }

    /**
     * Profilok szűrése - kiemeltek
     *
     * @param int $from
     * @param int $limit
     * @return array
     */
    public function getHighlightedProfiles(int $from = 0, int $limit = 50): array
    {
        $now = new \DateTime();
        return $this->createQueryBuilder('p')
            ->andWhere('p.active = :act')
            ->andWhere('p.highlighted > :hig')
            ->andWhere('p.roles LIKE :role')
            ->setParameter('act', '1')
            ->setParameter('hig', $now->format('Y.m.d'))
            ->setParameter('role', '%ROLE_USER%')
            ->orderBy('p.lastRenewed', 'ASC')
            ->setFirstResult($from)
            ->setMaxResults($limit)
            ->getQuery()
            ->getArrayResult();
    }

    /**
     * Profilok szűrése - lejárók
     *
     * @param int $from
     * @param int $limit
     * @return array
     */
    public function getNearExpireProfiles(int $from = 0, int $limit = 250): array
    {
        $dt = new \DateTime();
        $dt->modify('-14 days');

        return $this->createQueryBuilder('p')
            ->andWhere('p.enabled = :ena')
            ->andWhere('p.regEnd > :reg')
            ->andWhere('p.roles LIKE :role')
            ->setParameter('ena', '1')
            ->setParameter('reg', $dt->format('Y.m.d'))
            ->setParameter('role', '%ROLE_USER%')
            ->orderBy('p.regEnd', 'ASC')
            ->setFirstResult($from)
            ->setMaxResults($limit)
            ->getQuery()
            ->getArrayResult();
    }

    /**
     * Profilok szűrése - szerkesztettek
     *
     * @param int $from
     * @param int $limit
     * @return array
     */
    public function getEditedProfiles(int $from = 0, int $limit = 50): array
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.modified = :mod')
            ->andWhere('p.roles LIKE :role')
            ->setParameter('mod', '1')
            ->setParameter('role', '%ROLE_USER%')
            ->orderBy('p.lastRenewed', 'ASC')
            ->setFirstResult($from)
            ->setMaxResults($limit)
            ->getQuery()
            ->getArrayResult();
    }

    /**
     * @param string $uuid
     * @return Profile|null
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function getByUuid(string $uuid): ?Profile
    {
        $binary = \hex2bin(\str_replace('-', '', $uuid));

        return $this->createQueryBuilder('p')
            ->where('p.uuid = :uuid')
            ->andWhere('p.roles LIKE :role')
            ->setParameter('uuid', $binary)
            ->setParameter('role', '%ROLE_USER%')
            ->getQuery()
            ->getOneOrNullResult();
    }
}
