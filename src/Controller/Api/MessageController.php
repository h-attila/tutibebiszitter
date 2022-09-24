<?php

namespace App\Controller\Api;

use App\Entity\Message;
use App\Form\MessageFormType;
use App\Repository\ProfileRepository;
use App\Service\MailerService;
use App\Service\MessageService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * Class MessageController
 * @package App\Controller\Api
 * @Route("/api/message", name="api_message_")
 */
class MessageController extends AbstractController
{
    public function __construct(protected MailerService $mailer, protected ProfileRepository $profileRepository, protected ValidatorInterface $validator, protected MessageService $messageService)
    {}

    /**
     * Üzenet küldése profil oldalról
     *
     * @Route("/send-profile-message", methods={"POST"}, name="send_profile_message")
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function profile(Request $request): JsonResponse
    {
        $message = new Message();

        $form = $this->createForm(MessageFormType::class, $message);
        $data = json_decode($request->getContent(), true);
        $form->submit($data);

        if ($form->isValid()) {

            $captchaIsValid = $this->messageService->validateCaptcha($message->getToken());

            if (!$captchaIsValid) {
                return new JsonResponse(null, 400);
            }

            try {
                $profile = $this->profileRepository->getByUuid($message->getUuid());

                $this->mailer->sendMessageToProfile($message, $profile);
            } catch (\Throwable $e) {
                $error = [
                    'errors'=>$e->getMessage() ?? null
                ];
                return new JsonResponse($error, 400);
            }

            return new JsonResponse(null, 200);
        }

        $msg = [];
        $errors = $this->validator->validate($message);
        /* @var ConstraintViolation $error */
        foreach ($errors as $error) {
            $msg[] = $error->getMessage();
        }

        $error = [
            'errors'=>$msg
        ];
        return new JsonResponse($error, 400);
    }
}