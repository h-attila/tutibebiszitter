<?php

namespace App\Service\Captcha;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class GoogleReCaptchaChecker implements CaptchaCheckerInterface
{
    protected string $secret;

    /**
     * @param string $secret
     */
    public function __construct(string $secret)
    {
        $this->secret = $secret;
    }

    /**
     * {@inheritDoc}
     * @throws GuzzleException
     */
    public function check(string $captchaValue): bool
    {
        $data = $this->getCaptchaResponse($captchaValue);

        // Better checks could be done here
        if ($data && isset($data['success']) && true === $data['success']) {
            return true;
        }

        return false;
    }

    /**
     * @throws GuzzleException
     */
    private function getCaptchaResponse($captchaValue): array
    {
        $response = $this->getClient()->request(
            'POST',
            'recaptcha/api/siteverify',
            [
                'form_params' => [
                    'secret'   => $this->secret,
                    'response' => $captchaValue,
                ],
            ]
        );

        return json_decode($response->getBody(), true);
    }

    private function getClient(): Client
    {
        return new Client([
            'base_uri' => 'https://www.google.com',
        ]);
    }
}