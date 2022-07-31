<?php

namespace App\Controller\Profile\Api;

use App\Entity\Group;
use App\Form\AdditionalServiceFormType;
use App\Service\GroupService;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * Class GroupController
 * @package App\Controller\Profile\Api
 *
 * @Route("/profilom/api/list-items/group", name="profile_api_list_items_group_")
 */
class GroupController extends ListItemsController
{
    /**
     * @param EntityManagerInterface $entityManager
     * @param GroupService $groupService
     * @param SerializerInterface $serializer
     */
    #[Pure] public function __construct(
      protected EntityManagerInterface $entityManager,
      GroupService                     $groupService,
      SerializerInterface              $serializer
    )
    {
        $this->class = Group::class;
        $this->formType = AdditionalServiceFormType::class;
        $this->service = $groupService;
        $this->serializer = $serializer;

        parent::__construct($this->entityManager);
    }
}
