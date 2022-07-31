<?php

namespace App\Controller\Admin\Api;

use App\Entity\Testimonials;
use App\Form\TestimonialsFormType;
use App\Service\TestimonialsService;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * Class ServiceController
 * @package App\Controller\Admin\Api
 *
 * @Route("/admin/api/list-items/testimonials", name="admin_api_list_items_testimonials_")
 */
class TestimonialsController extends ListItemsController
{
    /**
     * @param EntityManagerInterface $entityManager
     * @param TestimonialsService $service
     * @param SerializerInterface $serializer
     */
    #[Pure] public function __construct(
      protected EntityManagerInterface $entityManager,
      TestimonialsService              $service,
      SerializerInterface              $serializer
    )
    {
        $this->class = Testimonials::class;
        $this->formType = TestimonialsFormType::class;
        $this->service = $service;
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
     * @Route("/testimonials/add", methods={"PUT"}, name="add")
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
     * @Route("/delete", methods={"DELETE"}, name="delete")
     *
     * @param Request $request
     * @return Response
     */
    public function delete(Request $request): Response
    {
        return parent::delete($request);
    }
}