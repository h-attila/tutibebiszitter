<?php


namespace App\Controller\Admin\Api;


use App\Entity\Profile;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


/**
 * Class ProfileListController
 * @package App\Controller\Admin\Api
 *
 * @Route("/admin/api/profile-list", name="admin_api_profile_list_")
 */
class ProfileListController extends AbstractController
{
    /**
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(
      private EntityManagerInterface $entityManager,
    )
    {
    }

    /**
     * Profil lista nézethez adatok lekérdezése.
     *
     * @Route("/get-profile-list", methods={"POST"}, name="get_profile_list")
     *
     * @param Request $request
     * @return Response
     */
    public function getProfileList(Request $request): Response
    {
        $content = json_decode($request->getContent(), true);
        $status = $content['status'] ?? 'all';
        $limit = $content['limit'] ?? 50;
        $from = $content['from'] ?? 0;

        $profile = $this->entityManager->getRepository(Profile::class);

        $res = match ($status) {
            'new' => $profile->getNewProfiles($from, $limit),
            'active' => $profile->getActiveProfiles($from, $limit),
            'inactive' => $profile->getInactiveProfiles($from, $limit),
            'highlighted' => $profile->getHighlightedProfiles($from, $limit),
            'nearexpire' => $profile->getNearExpireProfiles($from, $limit),
            'edited' => $profile->getEditedProfiles($from, $limit),
            'all' => $profile->getAllProfiles($from, $limit),
            default => []
        };

        return new JsonResponse($res, Response::HTTP_OK);
    }
}