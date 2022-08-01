<?php

namespace App\Entity;

use App\Repository\PlaceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\Index;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=PlaceRepository::class)
 *
 * @Table(indexes={@Index(name="search_idx", columns={"state_code", "city_code", "enabled"})})
 */
class Place
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     *
     * @Groups({"admin_self", "admin_profile", "user_profile", "public"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50, unique=true)
     *
     * @Groups({"admin_self", "admin_profile", "user_profile", "public"})
     */
    private $cityLabel;

    /**
     * @ORM\Column(type="string", length=25, unique=true)
     *
     * @Groups({"admin_self", "admin_profile", "user_profile", "public"})
     */
    private $cityCode;

    /**
     * @ORM\Column(type="boolean")
     *
     * @Groups({"admin_self", "admin_profile"})
     */
    private $enabled;

    /**
     * @ORM\Column(type="datetime")
     *
     * @Groups({"admin_self"})
     */
    private $lastModified;

    /**
     * @ORM\Column(type="string", length=50)
     *
     * @Groups({"admin_self", "admin_profile", "user_profile", "public"})
     */
    private $stateCode;

    /**
     * @ORM\Column(type="string", length=50)
     *
     * @Groups({"admin_self", "admin_profile", "user_profile", "public"})
     */
    private $stateLabel;

    /**
     * @ORM\ManyToMany(targetEntity=Profile::class, mappedBy="places")
     *
     * @Groups({"admin_self"})
     */
    private $profiles;

    public function __construct()
    {
        $this->profiles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCityLabel(): ?string
    {
        return $this->cityLabel;
    }

    public function setCityLabel(string $label): self
    {
        $this->cityLabel = $label;

        return $this;
    }

    public function getCityCode(): ?string
    {
        return $this->cityCode;
    }

    public function setCityCode(string $code): self
    {
        $this->cityCode = $code;

        return $this;
    }

    public function getEnabled(): ?bool
    {
        return $this->enabled;
    }

    public function setEnabled(bool $enabled): self
    {
        $this->enabled = $enabled;

        return $this;
    }

    public function getLastModified(): ?\DateTimeInterface
    {
        return $this->lastModified;
    }

    public function setLastModified(\DateTimeInterface $lastModified): self
    {
        $this->lastModified = $lastModified;

        return $this;
    }

    public function getStateCode(): ?string
    {
        return $this->stateCode;
    }

    public function setStateCode(string $stateCode): self
    {
        $this->stateCode = $stateCode;

        return $this;
    }

    public function getStateLabel(): ?string
    {
        return $this->stateLabel;
    }

    public function setStateLabel(string $stateLabel): self
    {
        $this->stateLabel = $stateLabel;

        return $this;
    }

    /**
     * @return Collection
     */
    public function getProfiles(): Collection
    {
        return $this->profiles;
    }

    public function addProfile(Profile $profile): self
    {
        if (!$this->profiles->contains($profile)) {
            $this->profiles[] = $profile;
            $profile->addPlace($this);
        }

        return $this;
    }

    public function removeProfile(Profile $profile): self
    {
        if ($this->profiles->removeElement($profile)) {
            $profile->removePlace($this);
        }

        return $this;
    }
}
