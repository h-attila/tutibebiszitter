<?php

namespace App\Entity;

use App\Repository\HandicapRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\Index;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=HandicapRepository::class)
 *
 * @Table(indexes={@Index(name="search_idx", columns={"enabled"})})

 */
class Handicap
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     *
     * @Groups({"admin_self", "admin_profile", "user_profile", "public_profile", "public"})
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
     * @Groups({"admin_self", "admin_profile", "user_profile", "public_profile", "public"})
     */
    private $label;

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
     * @ORM\ManyToMany(targetEntity=Profile::class, mappedBy="handicaps")
     *
     * @Groups({"admin_self"})
     */
    private $profiles;

    /**
     * @ORM\OneToMany(targetEntity=SearchHistory::class, mappedBy="handicap")
     */
    private $searchHistories;

    public function __construct()
    {
        $this->profiles = new ArrayCollection();
        $this->searchHistories = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): self
    {
        $this->label = $label;

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
            $profile->addHandicap($this);
        }

        return $this;
    }

    public function removeProfile(Profile $profile): self
    {
        if ($this->profiles->removeElement($profile)) {
            $profile->removeHandicap($this);
        }

        return $this;
    }

    /**
     * @return mixed
     */
    public function getWeight()
    {
        return $this->weight;
    }

    /**
     * @param mixed $weight
     * @return Handicap
     */
    public function setWeight($weight)
    {
        $this->weight = $weight;
        return $this;
    }

    /**
     * @return Collection<int, SearchHistory>
     */
    public function getSearchHistories(): Collection
    {
        return $this->searchHistories;
    }

    public function addSearchHistory(SearchHistory $searchHistory): self
    {
        if (!$this->searchHistories->contains($searchHistory)) {
            $this->searchHistories[] = $searchHistory;
            $searchHistory->setHandicap($this);
        }

        return $this;
    }

    public function removeSearchHistory(SearchHistory $searchHistory): self
    {
        if ($this->searchHistories->removeElement($searchHistory)) {
            // set the owning side to null (unless already changed)
            if ($searchHistory->getHandicap() === $this) {
                $searchHistory->setHandicap(null);
            }
        }

        return $this;
    }
}
