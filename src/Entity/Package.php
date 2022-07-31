<?php

Namespace App\Entity;

use App\Repository\PackageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\Index;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=PackageRepository::class)
 *
 * @Table(indexes={@Index(name="search_idx", columns={"enabled"})})
 *
 *
 * @UniqueEntity(
 *     fields={"stars"},
 *     errorPath="stars",
 *     message="Értéknek egyedinek kell lennie."
 * )
 */
class Package
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
     * @ORM\Column(type="string", length=50)
     *
     * @Assert\NotBlank (
     *     message="Megnevezés megadása kötelező.",
     *     groups={"admin_admin"}
     *     )
     * @Assert\Length (
     *     min=5,
     *     max=50,
     *     minMessage="A megnevezés hossza legalább 5 karakteres lehet.",
     *     maxMessage="A megnevezés hossza legfeljebb 50 karakteres lehet.",
     *     groups={"admin_admin"}
     *     )
     *
     * @Groups({"admin_self", "admin_profile", "user_profile", "public"})
     */
    private $label;

    /**
     * @ORM\Column(type="string", length=255)
     *
     * @Assert\NotBlank (
     *     message="Leírás megadása kötelező.",
     *     groups={"admin_admin"}
     *     )
     * @Assert\Length (
     *     min=5,
     *     max=150,
     *     minMessage="A leírás hossza legalább {{ limit }} karakteres lehet.",
     *     maxMessage="A leírás hossza legfeljebb {{ limit }} karakteres lehet.",
     *     groups={"admin_admin"}
     *     )
     *
     * @Groups({"admin_self", "admin_profile", "user_profile", "public"})
     */
    private $description;

    /**
     * @ORM\Column(type="integer")
     *
     * @Assert\NotBlank (
     *     message="Napok megadása kötelező.",
     *     groups={"admin_admin"}
     *     )
     *
     * @Assert\Type(
     *     type="integer",
     *     message="Napok csak pozitív egész szám lehet",
     *     groups={"admin_admin"}
     * )
     * @Assert\Positive (
     *     message="Napok csak pozitív egész szám lehet",
     *     groups={"admin_admin"}
     *     )
     *
     * @Assert\Range(
     *      min = 1,
     *      max = 9999,
     *      notInRangeMessage = "Csak {min} és {max} közötti érték lehetséges",
     *     groups={"admin_admin"}
     * )
     *
     * @Groups({"admin_self", "admin_profile", "user_profile", "public"})
     */
    private $days;

    /**
     * @ORM\Column(type="boolean")
     *
     * @Groups({"admin_self", "admin_profile"})
     */
    private $enabled;

    /**
     * @ORM\Column(type="smallint")
     *
     * @Assert\NotBlank (
     *     message="Díj megadása kötelező.",
     *     groups={"admin_admin"}
     *     )
     *
     * @Assert\PositiveOrZero (
     *     message="Díj csak nemnegatív egész szám lehet",
     *     groups={"admin_admin"}
     *     )
     *
     * @Assert\Range(
     *      min = 0,
     *      max = 999999,
     *      notInRangeMessage = "Csak {{ min }} és {{ max }} közötti érték lehetséges",
     *     groups={"admin_admin"}
     * )
     *
     * @Groups({"admin_self", "admin_profile", "user_profile", "public"})
     */
    private $price;

    /**
     * @ORM\Column(type="string", length=50, unique=true)
     *
     * @Groups({"admin_self", "admin_profile", "user_profile", "public"})
     */
    private $uuid;

    /**
     * @ORM\Column(type="smallint")
     *
     * @Assert\NotBlank (
     *     message="Csillagok megadása kötelező.",
     *     groups={"admin_admin"}
     *     )
     *
     * @Assert\Positive (
     *     message="Csillagok száma csak pozitív egész szám lehet",
     *     groups={"admin_admin"}
     *     )
     *
     * @Assert\Range(
     *      min = 0,
     *      max = 9,
     *      notInRangeMessage = "Csak {{ min }} és {{ max }} közötti érték lehetséges",
     *     groups={"admin_admin"}
     * )
     *
     * @Groups({"admin_self", "admin_profile", "user_profile", "public"})
     */
    private $stars;

    /**
     * @ORM\Column(type="datetime")
     *
     * @Groups({"admin_self"})
     */
    private $lastModified;

    /**
     * @ORM\Column(type="smallint")
     *
     * @Assert\NotBlank (
     *     message="Sorrend megadása kötelező.",
     *     groups={"admin_admin"}
     *     )
     *
     * @Assert\Type(
     *     type="integer",
     *     message="Sorrend csak pozitív egész szám lehet",
     *     groups={"admin_admin"}
     * )
     * @Assert\Positive (
     *     message="Sorrend csak pozitív egész szám lehet",
     *     groups={"admin_admin"}
     *     )
     *
     * @Assert\Range(
     *      min = 1,
     *      max = 1000,
     *      notInRangeMessage = "Csak {{ min }} és {{ max }} közötti érték lehetséges",
     *     groups={"admin_admin"}
     * )
     *
     * @Groups({"admin_self"})
     */
    private $weight;

    /**
     * @ORM\OneToMany(targetEntity=Profile::class, mappedBy="package")
     *
     * @Groups({"admin_self"})
     */
    private $profiles;

    /**
     * @ORM\Column(type="boolean")
     */
    private $public;

    public function __construct()
    {
        $this->profiles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): string
    {
        return $this->label;
    }

    public function setLabel(string $label): self
    {
        $this->label = $label;

        return $this;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getDays(): int
    {
        return $this->days;
    }

    public function setDays(int $days): self
    {
        $this->days = $days;

        return $this;
    }

    public function getEnabled(): bool
    {
        return $this->enabled;
    }

    public function setEnabled(bool $enabled): self
    {
        $this->enabled = $enabled;

        return $this;
    }

    public function getPrice(): int
    {
        return $this->price;
    }

    public function setPrice(int $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getUuid(): string
    {
        return $this->uuid;
    }

    public function setUuid(string $uuid): self
    {
        $this->uuid = $uuid;

        return $this;
    }

    public function getStars(): int
    {
        return $this->stars;
    }

    public function setStars(int $stars): self
    {
        $this->stars = $stars;

        return $this;
    }

    public function getLastModified(): \DateTimeInterface
    {
        return $this->lastModified;
    }

    public function setLastModified(\DateTimeInterface $lastModified): self
    {
        $this->lastModified = $lastModified;

        return $this;
    }

    public function getWeight(): int
    {
        return $this->weight;
    }

    public function setWeight(int $weight): self
    {
        $this->weight = $weight;

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
            $profile->setPackage($this);
        }

        return $this;
    }

    public function removeProfile(Profile $profile): self
    {
        if ($this->profiles->removeElement($profile)) {
            // set the owning side to null (unless already changed)
            if ($profile->getPackage() === $this) {
                $profile->setPackage(null);
            }
        }

        return $this;
    }

    public function getPublic(): bool
    {
        return $this->public;
    }

    public function setPublic(bool $public): self
    {
        $this->public = $public;

        return $this;
    }
}
