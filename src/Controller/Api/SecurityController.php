<?php

namespace App\Controller\Api;

use App\Entity\Profile;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Security\Core\Security;

/**
 * Class SecurityController
 * @package App\Controller\Admin\Api
 *
 * @Route("/admin/security", name="admin_security_")
 */
class SecurityController extends AbstractController
{
//    /**
//     * @param Profile|null $profile
//     * @return Response
//     *
//     * @Route("/login", methods={"POST"}, name="login")
//     */
//    public function login(#[CurrentUser] ?Profile $profile): Response
//    {
//        if (null === $profile) {
//            return $this->json([], Response::HTTP_UNAUTHORIZED);
//        }
//
//        $token = bin2hex(openssl_random_pseudo_bytes(64));
//
//        $isAdmin = in_array('ROLE_ADMIN', $profile->getRoles());
//
//        return $this->json([
//          'name' => $profile->getName(),
//          'username' => $profile->getUserIdentifier(),
//          'title' => $isAdmin ? 'bébiszitter' : 'adminisztrátor',
//          'avatar' => 'avatar.jpg',     // todo: képekhez majd
//          'isAdmin' => $isAdmin,
//          'token' => $token,
//          'error' => null
//        ], Response::HTTP_OK);
//    }

    ##
    ## Egyelőre nem használt, kivezetve, mert bugos. A security.yaml-ben két providert és firewallt kellene használni.
    ##
//    /**
//     * @param User|null $user
//     * @return Response
//     *
//     * @Route("/admin-login", methods={"POST"}, name="admin_login")
//     */
//    public function adminLogin(#[CurrentUser] ?User $user): Response
//    {
//        $user = $this->getUser();
//        if (null === $user) {
//            return $this->json(['admin_user' => serialize($user)], Response::HTTP_UNAUTHORIZED);
//        }
//
//        $token = bin2hex(openssl_random_pseudo_bytes(64));
//
//        return $this->json([
////          'name' => $user->getName(),
//          'username' => $user->getUserIdentifier(),
//          'avatar' => 'avatar.jpg',
//          'role' => 'adminisztrátor',
//          'token' => $token,
//          'error' => null
//        ], Response::HTTP_OK);
//    }
}
