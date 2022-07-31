<?php

namespace App\Entity;

use DateTime;
use Symfony\Component\Serializer\Annotation\Groups;

// ORM nélküli entitás
class Status
{
    /**
     * @var string
     *
     * @Groups({"admin_profile", "user_profile"})
     */
    private string $text;

    /**
     * @var string
     *
     * @Groups({"admin_profile", "user_profile"})
     */
    private string $color;

    /**
     * @var string
     *
     * @Groups({"admin_profile", "user_profile"})
     */
    private string $code;

    /**
     * @var bool
     *
     * @Groups({"admin_profile", "user_profile"})
     */
    private bool $enabled;

    /**
     * @var bool
     *
     * @Groups({"admin_profile", "user_profile"})
     */
    private DateTime $created;

    /**
     * @var string
     *
     * @Groups({"admin_profile", "user_profile"})
     */
    private string $icon;

    /**
     * @return string
     */
    public function getText(): string
    {
        return $this->text;
    }

    /**
     * @param string $text
     * @return Status
     */
    public function setText(string $text): Status
    {
        $this->text = $text;
        return $this;
    }

    /**
     * @return string
     */
    public function getColor(): string
    {
        return $this->color;
    }

    /**
     * @param string $color
     * @return Status
     */
    public function setColor(string $color): Status
    {
        $this->color = $color;
        return $this;
    }

    /**
     * @return string
     */
    public function getCode(): string
    {
        return $this->code;
    }

    /**
     * @param string $code
     * @return Status
     */
    public function setCode(string $code): Status
    {
        $this->code = $code;
        return $this;
    }

    /**
     * @return bool
     */
    public function isEnabled(): bool
    {
        return $this->enabled;
    }

    /**
     * @param bool $enabled
     * @return Status
     */
    public function setEnabled(bool $enabled): Status
    {
        $this->enabled = $enabled;
        return $this;
    }

    /**
     * @return DateTime
     */
    public function getCreated(): DateTime
    {
        return $this->created;
    }

    /**
     * @param DateTime $created
     * @return Status
     */
    public function setCreated(DateTime $created): Status
    {
        $this->created = $created;
        return $this;
    }

    /**
     * @return string
     */
    public function getIcon(): string
    {
        return $this->icon;
    }

    /**
     * @param string $icon
     * @return Status
     */
    public function setIcon(string $icon): Status
    {
        $this->icon = $icon;
        return $this;
    }


}
