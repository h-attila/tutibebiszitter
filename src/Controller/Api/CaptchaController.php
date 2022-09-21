<?php

namespace App\Controller\Api;

use App\Service\Captcha\CaptchaCheckerInterface;
use JetBrains\PhpStorm\NoReturn;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/captcha")
 */
class CaptchaController extends AbstractController
{
    /**
     * @Route("/check")
     *
     * @param Request $request
     * @param CaptchaCheckerInterface $captchaChecker
     * @return void
     */
    #[NoReturn] public function check(Request $request, CaptchaCheckerInterface $captchaChecker): void
    {
        $isCaptchaValid = $captchaChecker->check($request->request->get('captcha'));

        dump($isCaptchaValid);
        exit;
    }
}