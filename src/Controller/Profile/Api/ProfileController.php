<?php


namespace App\Controller\Profile\Api;


use App\Form\Profile\AdminProfileFormType;
use App\Repository\ProfileRepository;
use Doctrine\ORM\EntityManagerInterface;
//use Psr\Log\LoggerInterface;
use App\Controller\Common\ProfileController as CommonProfileController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;


/**
 * Class ProfileListController
 * @package App\Controller\Profile\Api
 *
 * @Route("/profilom/api", name="profile_api_")
 */
class ProfileController extends CommonProfileController
{
    protected string $profileGroup = 'user_profile';

    public function __construct(
        EntityManagerInterface $em,
        ProfileRepository      $profileRepository,
        SerializerInterface    $serializer
    )
    {
        $this->adminProfileFormType = AdminProfileFormType::class;

        parent::__construct($em, $profileRepository, $serializer);
    }
}