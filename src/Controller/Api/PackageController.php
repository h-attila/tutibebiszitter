<?php

namespace App\Controller\Api;

use App\Entity\Package;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

/**
 * Class PackagesController
 * @package App\Controller\Api
 * @Route("/api/packages", name="api_packages_")
 */
class PackageController extends AbstractController
{
    /**
     * @Route("/packages-init", methods={"GET"}, name="init")
     */
    public function init(EntityManagerInterface $em): Response
    {
        $packages = $em
          ->getRepository(Package::class)
          ->findBy([
            'enabled' => true
          ], ['weight' => 'ASC']);

        if (!$packages) {
            return new JsonResponse([], Response::HTTP_NO_CONTENT);
        }

        $encoder = new JsonEncoder();
        $defaultContext = [
          AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
              return $object->getId();
          },
        ];
        $normalizer = new ObjectNormalizer(null, null, null, null, null, null, $defaultContext);
        $serializer = new Serializer([$normalizer], [$encoder]);

        $json = $serializer->serialize($packages, 'json', ['groups' => ['admin_profile']]);

        return JsonResponse::fromJsonString($json, Response::HTTP_OK);
    }
}
