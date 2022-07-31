<?php

namespace App\Controller\Admin\Api;

use App\Entity\Package;
use App\Form\PackageFormType;
use App\Service\PackageService;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * Class PackageController
 * @package App\Controller\Admin\Api
 *
 * @Route("/admin/api/list-items/package", name="admin_api_list_items_package_")
 */
class PackageController extends ListItemsController
{
    /**
     * @param EntityManagerInterface $entityManager
     * @param PackageService $packageService
     * @param SerializerInterface $serializer
     */
    #[Pure] public function __construct(
      protected EntityManagerInterface $entityManager,
      PackageService                   $packageService,
      SerializerInterface              $serializer
    )
    {
        $this->class = Package::class;
        $this->formType = PackageFormType::class;
        $this->service = $packageService;
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
     * Díjcsomagok lista lekérése
     *
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
     * @Route("/set-public", methods={"PUT"}, name="set_public")
     *
     * @param Request $request
     * @return Response
     */
    public function setPublic(Request $request): Response
    {
        return parent::setPublic($request);
    }

    /**
     * @param $entity
     * @param array $data
     *
     * @return void
     */
    protected function alterAdd(&$entity, array $data = []): void
    {
        $entity->setPublic(false);

        if (isset($data['stars'])) {
            $entity->setStars($data['stars']);
        }

        if (isset($data['days'])) {
            $entity->setDays($data['days']);
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
        if (isset($data['stars'])) {
            $entity->setStars($data['stars']);
        }
    }
}
