<?php

namespace App\Entity;

use Symfony\Component\Validator\Constraints as Assert;

class ProfileMessage
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

    private string $token;

    /**
     * @Assert\NotBlank (message="Üzenet szövege nem lehet üres.")
     * @Assert\Length (
     *     min=5,
     *     max=250,
     *     minMessage="Az üzenet szövege túl rövid",
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
     * @return ProfileMessage
     */
    public function setName(string $name): ProfileMessage
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
     * @return ProfileMessage
     */
    public function setEmail(string $email): ProfileMessage
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
     * @return $this
     */
    public function setMessage(string $message): ProfileMessage
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
     * @return ProfileMessage
     */
    public function setUuid(string $uuid): ProfileMessage
    {
        $this->uuid = $uuid;
        return $this;
    }

    /**
     * @return string
     */
    public function getToken(): string
    {
        return $this->token;
    }

    /**
     * @param string $token
     * @return ProfileMessage
     */
    public function setToken(string $token): ProfileMessage
    {
        $this->token = $token;
        return $this;
    }
}