<?php

namespace App\Entity;

use Symfony\Component\Validator\Constraints as Assert;

class ContactMessage
{
    /**
     * @Assert\NotBlank (message="Név mgadása kötelező")
     *
     * @var string
     */
    private string $name;

    /**
     * @var string
     */
    private string $phone;

    /**
     * @Assert\NotBlank (message="Email cím mgadása kötelező.")
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
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     * @return $this
     */
    public function setName(string $name): ContactMessage
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
     * @return $this
     */
    public function setEmail(string $email): ContactMessage
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
    public function setMessage(string $message): ContactMessage
    {
        $this->message = $message;
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
     * @return $this
     */
    public function setToken(string $token): ContactMessage
    {
        $this->token = $token;
        return $this;
    }

    /**
     * @return string
     */
    public function getPhone(): string
    {
        return $this->phone;
    }

    /**
     * @param string $phone
     * @return ContactMessage
     */
    public function setPhone(string $phone): ContactMessage
    {
        $this->phone = $phone;
        return $this;
    }
}