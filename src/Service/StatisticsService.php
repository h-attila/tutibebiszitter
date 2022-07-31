<?php


namespace App\Service;


use App\Entity\Profile;
use App\Entity\UserStatistics;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;

class StatisticsService
{
    public function __construct(
      private EntityManagerInterface $entityManager
    )
    {
    }

    /**
     * @param DateTime $limit
     * @return array
     */
    function getProfilesByUserStatus(DateTime $limit): array
    {
        $result = [];
        $now = new DateTime();

        $qb = $this->entityManager->getRepository(Profile::class)->createQueryBuilder('p');
        $result['new'] = $qb
          ->select('count(p.id)')
          ->where('p.newMember LIKE :newMember')
          ->andWhere('p.roles LIKE :role')
          ->setParameter('newMember', true)
          ->setParameter('role', '%ROLE_USER%')
          ->getQuery()
          ->getResult()[0][1];

        $qb = $this->entityManager->getRepository(Profile::class)->createQueryBuilder('p');
        $result['active'] = $qb
          ->select('count(p.id)')
          ->where('p.enabled = :enabled')
          ->andwhere('p.active = :active')
          ->andwhere($qb->expr()->between(':now', 'p.regStart', 'p.regEnd'))
          ->andWhere('p.roles LIKE :role')
          ->setParameter('enabled', true)
          ->setParameter('active', true)
          ->setParameter('now', $now)
          ->setParameter('role', '%ROLE_USER%')
          ->getQuery()
          ->getResult()[0][1];

        $qb = $this->entityManager->getRepository(Profile::class)->createQueryBuilder('p');
        $result['inactive'] = $qb
          ->select('count(p.id)')
          ->where('p.enabled = :enabled')
          ->andwhere($qb->expr()->between(':now', 'p.regStart', 'p.regEnd'))
          ->andWhere('p.roles LIKE :role')
          ->setParameter('enabled', false)
          ->setParameter('now', $now)
          ->setParameter('role', '%ROLE_USER%')
          ->getQuery()
          ->getResult()[0][1];

        $qb = $this->entityManager->getRepository(Profile::class)->createQueryBuilder('p');
        $result['nearExpire'] = $qb
          ->select('count(p.id)')
          ->where('p.enabled = :enabled')
          ->andwhere($qb->expr()->between(':now', 'p.regStart', 'p.regEnd'))
          ->andwhere('p.regEnd < :limit')
          ->andWhere('p.roles LIKE :role')
          ->setParameter('enabled', true)
          ->setParameter('now', $now)
          ->setParameter('limit', $limit)
          ->setParameter('role', '%ROLE_USER%')
          ->getQuery()
          ->getResult()[0][1];

        $qb = $this->entityManager->getRepository(Profile::class)->createQueryBuilder('p');
        $result['expired'] = $qb
          ->select('count(p.id)')
          ->andwhere('p.regEnd < :now')
          ->andWhere('p.roles LIKE :role')
          ->setParameter('now', $now)
          ->setParameter('role', '%ROLE_USER%')
          ->getQuery()
          ->getResult()[0][1];

        $qb = $this->entityManager->getRepository(Profile::class)->createQueryBuilder('p');
        $result['modified'] = $qb
          ->select('count(p.id)')
          ->where('p.modified = :modified')
          ->andWhere('p.roles LIKE :role')
          ->setParameter('modified', true)
          ->setParameter('role', '%ROLE_USER%')
          ->getQuery()
          ->getResult()[0][1];

        return $result;
    }

    /**
     * Legutolsó 12 havi statisztika az aktív tagokról.
     *
     * @return array
     */
    function getProfilesByUserHistory(): array
    {
        $now = new \DateTime();
        $lastUpdateMonth = null;
        $data = [];

        /* @var UserStatistics $userStatistics */
        $userStatistics = $this->entityManager->getRepository(UserStatistics::class)->find(1);      // fixen az 1 id-re rákötve

        if (!empty($userStatistics)) {
            $lastUpdateMonth = $userStatistics->getLastUpdated()->format('m');
            /* @var array $usersByHistory */
            $data = unserialize($userStatistics->getData());
        } else {
            $userStatistics = new UserStatistics();
        }

        $currentMonth = (int)$now->format('m');
        $currentYear = (int)$now->format('Y');
        $updateNeeded = $currentMonth !== (int)$lastUpdateMonth;

        $qb = $this->entityManager->getRepository(Profile::class)->createQueryBuilder('p');
        $activeUsers = $qb
          ->select('count(p.id)')
          ->where('p.enabled = :enabled')
          ->andwhere($qb->expr()->between(':now', 'p.regStart', 'p.regEnd'))
          ->andWhere('p.roles LIKE :role')
          ->setParameter('enabled', true)
          ->setParameter('now', $now)
          ->setParameter('role', '%ROLE_USER%')
          ->getQuery()
          ->getResult()[0][1];

        $offset = 0;
        if ($updateNeeded) {
            $offset = 1;        //update needed
        }

        $result = [];
        $result[$currentYear . '-' . $currentMonth] = (int)$activeUsers;

        for ($i = $currentMonth - 1; $i > $currentMonth - 12; $i--) {
            $j = $i;
            $year = $currentYear;
            if ($i <= 0) {
                $j = $i + 12;
                $year = $currentYear - 1;
            }
            $result[$year . '-' . $j] = $data[$i + $offset] ?? 0;
        }

        if ($updateNeeded) {

            $userStatistics->setLastUpdated($now);
            $userStatistics->setData(serialize($data));

            $this->entityManager->persist($userStatistics);
            $this->entityManager->flush();
        }

        return $result;
    }
}