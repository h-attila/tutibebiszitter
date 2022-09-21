<?php

namespace App\Controller\Api;

use App\Service\TestimonialsService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * Class TestimonialsController
 * @package App\Controller
 * @Route("/api/testimonials", name="api_testimonials_")
 */
class TestimonialsController extends AbstractController
{
    /**
     * @Route("/get-testimonials", methods={"GET"}, name="get")
     */
    public function getTestimonials(TestimonialsService $testimonialsService, SerializerInterface $serializer): Response
    {
        $testimonials = $testimonialsService->getList('active');

        $json = $serializer->serialize($testimonials, 'json', ['groups' => ['public']]);

        return JsonResponse::fromJsonString($json, Response::HTTP_OK);
    }
}
