<?php

namespace App\Controller\Admin\Api;

use App\Entity\Group;
use App\Form\AdditionalServiceFormType;
use App\Service\GroupService;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * Class GroupController
 * @package App\Controller\Admin\Api
 *
 * @Route("/admin/api/list-items/group", name="admin_api_list_items_group_")
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

    /**
     * @Route("/edit/{id}", methods={"PUT"}, name="edit", requirements={"id"="\d+"})
     */
    public function edit(string $id, Request $request): Response
    {
        return parent::edit($id, $request);
    }

    /**
     * @Route("/add", methods={"PUT"}, name="add")
     */
    public function add(Request $request): Response
    {
        return parent::add($request);
    }

    /**
     * @Route("/get-list/{status}", methods={"GET"}, name="get_list")
     *
     * @param string $status
     * @return Response
     */
    public function getList(string $status): Response
    {
        return parent::getList($status);
    }

    /**
     * @Route("/set-enabled", methods={"PUT"}, name="set_enabled")
     *
     * @param Request $request
     * @return Response
     */
    public function setEnabled(Request $request): Response
    {
        return parent::setEnabled($request);
    }

    /**
     * @Route("/pre-check-delete", methods={"POST"}, name="pre_check_delete")
     *
     * @param Request $request
     * @return Response
     */
    public function preCheckDelete(Request $request): Response
    {
        return parent::preCheckDelete($request);
    }

    /**
     * @Route("/delete", methods={"DELETE"}, name="delete")
     *
     * @param Request $request
     * @return Response
     */
    public function delete(Request $request): Response
    {
        return parent::delete($request);
    }

    /**
     * @param $entity
     * @param array $data
     *
     * @return void
     */
    protected function alterAdd(&$entity, array $data = []): void
    {
        if (isset($data['value'])) {
            $entity->setValue($data['value']);
        }
    }

    /**
     * @param $entity
     * @param array $data
     *
     * @return void
     */
    protected function alterEdit(&$entity, array $data = []): void
    {
        if (isset($data['value'])) {
            $entity->setValue($data['value']);
        }
    }
}
