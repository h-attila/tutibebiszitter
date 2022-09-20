<?php

namespace App\Service\Captcha;

interface CaptchaCheckerInterface
{
    /**
     * Checks captcha response
     *
     * @param string $captchaValue
     * @return bool
     */
    public function check(string $captchaValue): bool;
}