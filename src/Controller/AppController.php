<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    /**
     * @Route("/{reactRouting}", name="home", defaults={"reactRouting": null})
     *
     * @return Response
     */
    public function index(): Response
    {
        return $this->render('app/index.html.twig');
    }

    /**
     * @Route("/bebiszitter/{reactRouting}", name="bebiszitter", defaults={"reactRouting": null})
     *
     * @return Response
     */
    public function bebiszitter(): Response
    {
        return $this->render('app/index.html.twig');
    }
}
