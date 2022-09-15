<?php

namespace App\Entity;

use Symfony\Component\Validator\Constraints as Assert;

class Message
{
    /**
     * @Assert\NotBlank (message="Név mgadása kötelező")
     *
     * @var string
     */
    private string $name;

    /**
     * @Assert\NotBlank (message="Név mgadása kötelező.")
     * @Assert\Email(message="Email cím nem megfelelő")
     *
     * @var string
     */
    private string $email;

    /**
     * @Assert\NotBlank (message="Üzenet szövege nem lehet üres.")
     * @Assert\Length (
     *     min=5,
     *     max=250,
     *     minMessage="Az üzenet szövege túl rövid"
     *     maxMessage="Az üzenet szövege legfeljebb 250 karakter lehet"
     * )
     *
     * @var string
     */
    private string $message;

    /**
     * @Assert\NotBlank (message="Címzett azonosító értéke nem lehet üres")
     *
     * @var string
     */
    private string $uuid;

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     * @return Message
     */
    public function setName(string $name): Message
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @param string $email
     * @return Message
     */
    public function setEmail(string $email): Message
    {
        $this->email = $email;
        return $this;
    }

    /**
     * @return string
     */
    public function getMessage(): string
    {
        return $this->message;
    }

    /**
     * @param string $message
     * @return Message
     */
    public function setMessage(string $message): Message
    {
        $this->message = $message;
        return $this;
    }

    /**
     * @return string
     */
    public function getUuid(): string
    {
        return $this->uuid;
    }

    /**
     * @param string $uuid
     * @return Message
     */
    public function setUuid(string $uuid): Message
    {
        $this->uuid = $uuid;
        return $this;
    }

}