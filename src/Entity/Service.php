<?php

namespace App\Entity;

use App\Repository\ServiceRepository;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\Index;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=ServiceRepository::class)
 *
 * @Table(indexes={@Index(name="search_idx", columns={"enabled"})})
 */
class Service
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     *
     * @Groups({"admin_self", "admin_profile", "user_profile", "public_profile"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     *
     * @Assert\NotBlank (
     *     message="Megnevezés megadása kötelező.",
     *     groups={"admin_admin"}
     *     )
     *
     * @Assert\Length (
     *     min=5,
     *     max=50,
     *     minMessage="A megnevezés hossza legalább 5 karakteres lehet.",
     *     maxMessage="A megnevezés hossza legfeljebb 50 karakteres lehet.",
     *     groups={"admin_admin"}
     *     )
     *
     * @Groups({"admin_self", "admin_profile", "user_profile", "public_profile"})
     */
    private $label;

    /**
     * @ORM\Column(type="boolean")
     *
     * @Groups({"admin_self", "admin_profile", "user_profile"})
     */
    private $enabled;

    /**
     * @ORM\Column(type="datetime")
     *
     * @Groups({"admin_self"})
     */
    private $lastModified;

    /**
     * @ORM\ManyToMany(targetEntity=Profile::class, mappedBy="services")
     *
     * @Groups("admin_self")
     */
    private $profiles;

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

    #[Pure] public function __construct()
    {
        $this->profiles = new ArrayCollection();
    }

    /**
     * @param mixed $id
     * @return Service
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    public function getId(): int
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

    public function getEnabled()
    {
        return $this->enabled;
    }

    public function setEnabled($enabled): self
    {
        $this->enabled = $enabled;

        return $this;
    }

    public function getLastModified(): DateTime
    {
        return $this->lastModified;
    }

    public function setLastModified(DateTime $lastModified): self
    {
        $this->lastModified = $lastModified;

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
            $profile->addService($this);
        }

        return $this;
    }

    public function removeProfile(Profile $profile): self
    {
        if ($this->profiles->removeElement($profile)) {
            $profile->removeService($this);
        }

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
}
