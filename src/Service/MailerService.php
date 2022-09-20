<?php

namespace App\Service;

use App\Entity\Message;
use App\Entity\Profile;
use Psr\Log\LoggerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;

class MailerService
{
    public function __construct(protected MailerInterface $mailer, protected LoggerInterface $logger)
    {
    }

    /**
     * @param Message $message
     * @param Profile $profile
     * @return void
     * @throws TransportExceptionInterface
     */
    public function sendMessageToProfile(Message $message, Profile $profile): void
    {
        // filter, hogy ne menjen ki csak ha akarjuk
        $to = $this->getTo($profile->getUsername());

        $email = (new TemplatedEmail())
            ->to($to)
            ->subject('üzeneted érkezett')
            ->htmlTemplate('emails/messageToProfile.html.twig')
            ->context([
                'name' => $profile->getName(),
                'sender' => $message->getName(),
                'email_address' => $message->getEmail(),
                'message' => $message->getMessage(),
            ]);

        $this->mailer->send($email);
    }

    /**
     * @param string $to
     * @return string
     */
    protected function getTo(string $to): string
    {
        return 'email.atinak@gmail.com';
    }
}