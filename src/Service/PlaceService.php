<?php


namespace App\Service;

use App\Entity\Place;
use App\Service\Abstract\ListItemsService;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\Pure;

class PlaceService extends ListItemsService
{
    #[Pure] public function __construct(EntityManagerInterface $entityManager)
    {
        $this->class = Place::class;

        parent::__construct($entityManager);
    }

    /**
     * Települések listája.
     *
     * @param string $status
     * @param bool $publicOnly
     * @return array
     */
    function getList(string $status='active', bool $publicOnly = false): array
    {
        $qb = $this->entityManager->getRepository(Place::class)->createQueryBuilder('p');
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
          ->orderBy('p.id', 'ASC')
//          ->orderBy('p.stateLabel', 'ASC')
//          ->orderBy('p.cityLabel', 'ASC')
          ->getQuery()
          ->getResult();
    }

    /**
     * Települések listája form selecthez.
     *
     * @return array
     */
    public function getPlaceOptions(): array
    {
        $places = $this->entityManager->getRepository(Place::class)->getPlaces();

        $res = [];
        $states = [];
        $options = [];
        /* @var $place Place */
        foreach ($places as $place) {
            $options[$place->getStateCode()][] = [
              'id' => $place->getId(),
              'label' => $place->getCityLabel(),
              'value' => $place->getCityCode(),
            ];
            if (!isset($states[$place->getStateCode()])) {
                $states[$place->getStateCode()] = $place->getStateLabel();
            };
        }

        foreach ($states as $stateCode => $stateLabel) {
            $res[] = [
              'label' => $stateCode,
              'options' => $options[$stateCode]
            ];
        }

        return $res;
    }
}