<?php

namespace App\Controller\Profile;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class AdminController
 * @package App\Controller\Profile
 * @Route("/profilom", name="profile_")
 */
class ProfileController extends AbstractController
{
    /**
     * @Route("/{uuid}", name="my_profile")
     */
    public function myProfile(string $uuid, Request $request): Response
    {
        return $this->render('profile/index.html.twig', [
            'controller_name' => 'ProfileController',
        ]);
    }
}
