<?php

namespace App\EventListener;

use App\Entity\Profile;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthenticationSuccessListener
{
    /**
     * JWT token tartalmazza a ROLE infót is
     *
     * https://github.com/lexik/LexikJWTAuthenticationBundle/blob/2.x/Resources/doc/2-data-customization.md
     *
     * @param AuthenticationSuccessEvent $event
     */
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event): void
    {
        $data = $event->getData();
        /* @var Profile $profile */
        $profile = $event->getUser();

        if ($profile instanceof UserInterface) {

            $isAdmin = in_array('ROLE_ADMIN', $profile->getRoles());

            $data['profile'] = [
              'isAdmin' => $isAdmin,
              'name' => $profile->getName(),
              'title' => $isAdmin ? 'bébiszitter' : 'adminisztrátor',
              'path' => $isAdmin ? '/admin/dashboard' : '/profilom/'.$profile->getUuid(),
              'avatar' => 'avatar.jpg',     // todo: képekhez majd
            ];

        } else {

            $data['profile'] = [
              'isAdmin' => false,
              'name' => '',
              'title' => 'hiba',
              'path' => '/bejelentkezes',
              'avatar' => '',
            ];
        }

        $event->setData($data);
    }
}