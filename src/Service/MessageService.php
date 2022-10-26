<?php

namespace App\Service;

class MessageService
{
    const GOOGLE_CAPTCHA_VERIFY = 'https://www.google.com/recaptcha/api/siteverify';

    /**
     * @param string|null $token
     * @return bool
     */
    public function validateCaptcha(?string $token): bool
    {
        if (empty($token)) {
            return false;
        }

        $secret = $_ENV['GOOGLE_RECAPTCHA_SECRET'];

        try {
            $url = self::GOOGLE_CAPTCHA_VERIFY;
            $data = [
                'secret'   => $secret,
                'response' => $token,
                'remoteip' => $_SERVER['REMOTE_ADDR']
            ];

            $options = [
                'http' => [
                    'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                    'method'  => 'POST',
                    'content' => http_build_query($data)
                ]
            ];

            $context  = stream_context_create($options);
            $result = file_get_contents($url, false, $context);

            return json_decode($result)->success;

        } catch (\Throwable $e) {
            return false;
        }
    }
}