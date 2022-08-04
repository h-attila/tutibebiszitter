<?php


namespace App\Controller\Admin\Api;


use App\Entity\Profile;
use App\Form\Admin\AdminProfileFormType;
use App\Repository\ProfileRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use App\Controller\Common\ProfileController as CommonProfileController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;


/**
 * Class ProfileListController
 * @package App\Controller\Admin\Api
 *
 * @Route("/admin/api/profile", name="admin_api_profile_")
 */
class ProfileController extends CommonProfileController
{
    protected string $profileGroup = 'admin_profile';

    public function __construct(
        EntityManagerInterface $em,
        LoggerInterface        $logger,
        ProfileRepository      $profileRepository,
        SerializerInterface    $serializer
    )
    {
        $this->adminProfileFormType = AdminProfileFormType::class;

        parent::__construct($em, $logger, $profileRepository, $serializer);
    }


    /**
     * @param string $uuid
     * @param Request $request
     *
     * @return Response
     *
     * @Route("/delete/{uuid}", methods={"DELETE"}, name="delete_profile")
     */
    public function delete(string $uuid, Request $request): Response
    {
        try {
            $profile = $this->profileRepository->getByUuid($uuid);
        } catch (\Exception $e) {
            return new JsonResponse(null, Response::HTTP_BAD_REQUEST);
        }

        if (!$profile instanceof Profile) {
            return new JsonResponse(null, Response::HTTP_BAD_REQUEST);
        }

        // todo: nincsen tényleges törlés - dummy
//        $this->em->remove($profile);
//        $this->em->flush();

        return new JsonResponse(null, Response::HTTP_OK);
    }
}