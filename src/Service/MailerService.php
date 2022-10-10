<?php

namespace App\Service;

use App\Entity\ContactMessage;
use App\Entity\Profile;
use App\Entity\ProfileMessage;
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
     * @param ProfileMessage $message
     * @param Profile $profile
     * @return void
     * @throws TransportExceptionInterface
     */
    public function sendMessageToProfile(ProfileMessage $message, Profile $profile): void
    {
        // filter, hogy ne menjen ki csak ha akarjuk
        $to = $this->getTo($profile->getUsername());

        $email = (new TemplatedEmail())
            ->from('TUTI Bébiszitter Közvetítő <info@tutibebiszitter.hu>')
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
     * @param ContactMessage $message
     * @return void
     * @throws TransportExceptionInterface
     */
    public function sendMessageToBusiness(ContactMessage $message): void
    {
        $email = (new TemplatedEmail())
            ->from($message->getEmail())
            ->to($_ENV['CUSTOMER_SERVICE_EMAIL'])
            ->subject('Kapcsolat - üzeneted a érkezett')
            ->htmlTemplate('emails/messageToBusiness.html.twig')
            ->context([
                'sender' => $message->getName(),
                'email_address' => $message->getEmail(),
                'phone' => $message->getPhone(),
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
        if ($_ENV['APP_ENV'] === 'prod') {
            return $to;
        }

        if (preg_match('/^.*@tutimagantanar\.hu$/', $to) === 1) {
            return $to;
        }

        return 'email.atinak@gmail.com';
    }
}