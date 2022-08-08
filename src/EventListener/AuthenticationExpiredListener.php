<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTExpiredEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationFailureResponse;

class AuthenticationExpiredListener
{
    /**
     * @param JWTExpiredEvent $event
     */
    public function onJWTExpired(JWTExpiredEvent $event): void
    {
        /** @var $response JWTAuthenticationFailureResponse */
        $response = $event->getResponse();

        $response->setMessage('A munkamenet lejárt, kérlek, jelentkezz be újra.');
    }
}