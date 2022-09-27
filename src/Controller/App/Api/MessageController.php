<?php

namespace App\Controller\App\Api;

use App\Entity\ContactMessage;
use App\Entity\ProfileMessage;
use App\Form\ContactMessageFormType;
use App\Form\ProfileMessageFormType;
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
    {
    }

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
        $message = new ProfileMessage();

        $form = $this->createForm(ProfileMessageFormType::class, $message);
        $data = json_decode($request->getContent(), true);
        $form->submit($data);

        if ($form->isValid()) {

            $captchaIsValid = $this->messageService->validateCaptcha($message->getToken());

            if (!$captchaIsValid) {
                return new JsonResponse(null, 200);
            }

            try {
                $profile = $this->profileRepository->getByUuid($message->getUuid());

                $this->mailer->sendMessageToProfile($message, $profile);
            } catch (\Throwable $e) {
                $error = [
                    'error' => $e->getMessage() ?? null
                ];
                return new JsonResponse($error, 200);
            }

            return new JsonResponse(null, 201);
        }

        $msg = [];
        $errors = $this->validator->validate($message);
        /* @var ConstraintViolation $error */
        foreach ($errors as $error) {
            $msg[] = $error->getMessage();
        }

        $error = [
            'error' => $msg
        ];
        return new JsonResponse($error, 200);
    }

    /**
     * Üzenet küldése kapcoslat oldalról
     *
     * @Route("/send-contact-message", methods={"POST"}, name="send_contact_message")
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function contact(Request $request): JsonResponse
    {
        $message = new ContactMessage();

        $form = $this->createForm(ContactMessageFormType::class, $message);
        $data = json_decode($request->getContent(), true);
        $form->submit($data);

        if ($form->isValid()) {

            $captchaIsValid = $this->messageService->validateCaptcha($message->getToken());

            if (!$captchaIsValid) {
                return new JsonResponse(null, 200);
            }

            try {
                $this->mailer->sendMessageToBusiness($message);
            } catch (\Throwable $e) {
                $error = [
                    'error' => $e->getMessage() ?? null
                ];
                return new JsonResponse($error, 200);
            }

            return new JsonResponse(null, 201);
        }

        $msg = [];
        $errors = $this->validator->validate($message);
        /* @var ConstraintViolation $error */
        foreach ($errors as $error) {
            $msg[] = $error->getMessage();
        }

        $error = [
            'error' => $msg
        ];
        return new JsonResponse($error, 200);
    }
}