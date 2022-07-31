<?php

namespace App\Controller\Admin\Api;


use App\Service\Abstract\ListItemsService;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Uid\Uuid;

/**
 * @package App\Controller\Admin\Api
 *
 * @Route("/admin/api/list-items", name="admin_api_list_items_")
 */
class ListItemsController extends AbstractController
{
    protected string $class;
    protected string $formType;
    protected ListItemsService $service;
    protected SerializerInterface $serializer;

    /**
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(
      protected EntityManagerInterface $entityManager,
    )
    {}

    /**
     * Lista elem szerkesztés
     *
     * @param string $id
     * @param Request $request
     * @return Response
     */
    public function edit(string $id, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        $entity = $this->entityManager->getRepository($this->class)->find($id);

        if (empty($entity)) {
            return new JsonResponse(['error' => 'A profil nem található.'], Response::HTTP_BAD_REQUEST);
        }

        $form = $this->createForm($this->formType, $entity);
        $form->submit($data);

        if ($form->isValid()) {

            $entity->setLastModified(new DateTime());

            $this->alterEdit($entity, $data);

            $this->entityManager->persist($entity);
            $this->entityManager->flush();

            $json = $this->serializer->serialize($entity, 'json', ['groups' => ['admin_self']]);

            return new JsonResponse($json, Response::HTTP_OK);
        }

        $errors = [];
        foreach ($form->getErrors(true) as $k => $e) {
            $errors[$k] = $e->getMessage();
        }

        return new JsonResponse($errors, Response::HTTP_BAD_REQUEST);
    }

    /**
     * Lista elem hozzáadás
     *
     * @param Request $request
     * @return Response
     */
    public function add(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $entity = new $this->class;

        $form = $this->createForm($this->formType, $entity);
        $form->submit($data);

        if ($form->isValid()) {
            $entity->setLabel($data['label']);
            $entity->setWeight($data['weight']);
            $entity->setEnabled(false);
            $entity->setLastModified(new DateTime());

            $this->alterAdd($entity, $data);

            $this->entityManager->persist($entity);
            $this->entityManager->flush();

            return new JsonResponse(null, Response::HTTP_OK);
        }

        $errors = [];
        foreach ($form->getErrors(true) as $k => $e) {
            $errors[$k] = $e->getMessage();
        }

        return new JsonResponse($errors, Response::HTTP_BAD_REQUEST);
    }

    /**
     * Lista lekérése
     *
     * @param string $status
     * @return Response
     */
    public function getList(string $status): Response
    {
        $list = $this->service->getList($status);

        $json = $this->serializer->serialize($list, 'json', ['groups' => ['admin_self']]);

        return JsonResponse::fromJsonString($json, Response::HTTP_OK);
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function setEnabled(Request $request): Response
    {
        $content = json_decode($request->getContent(), true);
        $entity = $this->entityManager->getRepository($this->class)->find($content['id']);

        // id és név ellenőrzés
        if (!empty($entity)) {

            $status = $content['enabled'] === true;

            $entity
              ->setEnabled($status)
              ->setLastModified(new DateTime());
            $this->entityManager->persist($entity);
            $this->entityManager->flush();

            $res = [
              'lastModified' => new DateTime(),
              'enabled' => $status
            ];

            return new JsonResponse($res, Response::HTTP_OK);
        }

        return new JsonResponse(null, Response::HTTP_BAD_REQUEST);
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function setPublic(Request $request): Response
    {
        $content = json_decode($request->getContent(), true);
        $entity = $this->entityManager->getRepository($this->class)->find($content['id']);

        // id és név ellenőrzés
        if (!empty($entity)) {

            $status = $content['public'] === true;

            $entity
              ->setPublic($status)
              ->setLastModified(new DateTime());
            $this->entityManager->persist($entity);
            $this->entityManager->flush();

            $res = [
              'lastModified' => new DateTime(),
              'public' => $status
            ];

            return new JsonResponse($res, Response::HTTP_OK);
        }

        return new JsonResponse(null, Response::HTTP_BAD_REQUEST);
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function preCheckDelete(Request $request): Response
    {
        $content = json_decode($request->getContent(), true);

        if (!isset($content['id'])) {
            return new JsonResponse(['content' => serialize($content)], Response::HTTP_BAD_REQUEST);
        }

        $data = $this->entityManager->getRepository($this->class)->find($content['id']);
        $count = count($data->getProfiles());

        // id ellenőrzés
        if ($count >= 0) {
            return new JsonResponse(['count' => $count], Response::HTTP_OK);
        }

        return new JsonResponse(null, Response::HTTP_BAD_REQUEST);
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function delete(Request $request): Response
    {
        $content = json_decode($request->getContent(), true);
        $data = $this->entityManager->getRepository($this->class)->find($content['id']);

        // id ellenőrzés
        if (!empty($data)) {
            $this->entityManager->remove($data);
            $this->entityManager->flush();

            return new JsonResponse(null, Response::HTTP_OK);
        }

        return new JsonResponse(null, Response::HTTP_BAD_REQUEST);
    }

    /**
     * @param $entity
     * @param array $data
     * @return void
     */
    protected function alterAdd(&$entity, array $data = []): void
    {
    }

    /**
     * @param $entity
     * @param array $data
     * @return void
     */
    protected function alterEdit(&$entity, array $data = []): void
    {
    }
}