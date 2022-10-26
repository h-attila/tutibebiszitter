<?php

namespace App\Entity;

use App\Repository\SearchHistoryRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=SearchHistoryRepository::class)
 */
class SearchHistory
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $created;

    /**
     * @ORM\ManyToOne(targetEntity=Service::class, inversedBy="searchHistories")
     */
    private $service;

    /**
     * @ORM\ManyToOne(targetEntity=Place::class, inversedBy="searchHistories")
     */
    private $place;

    /**
     * @ORM\ManyToOne(targetEntity=Group::class, inversedBy="searchHistories")
     */
    private $groups;

    /**
     * @ORM\ManyToOne(targetEntity=Handicap::class, inversedBy="searchHistories")
     */
    private $handicap;

    /**
     * @ORM\ManyToOne(targetEntity=Language::class, inversedBy="searchHistories")
     */
    private $language;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $found;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreated(): ?\DateTimeInterface
    {
        return $this->created;
    }

    public function setCreated(\DateTimeInterface $created): self
    {
        $this->created = $created;

        return $this;
    }

    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(?Service $service): self
    {
        $this->service = $service;

        return $this;
    }

    public function getPlace(): ?Place
    {
        return $this->place;
    }

    public function setPlace(?Place $place): self
    {
        $this->place = $place;

        return $this;
    }

    public function getGroups(): ?Group
    {
        return $this->groups;
    }

    public function setGroups(?Group $groups): self
    {
        $this->groups = $groups;

        return $this;
    }

    public function getHandicap(): ?Handicap
    {
        return $this->handicap;
    }

    public function setHandicap(?Handicap $handicap): self
    {
        $this->handicap = $handicap;

        return $this;
    }

    public function getLanguage(): ?Language
    {
        return $this->language;
    }

    public function setLanguage(?Language $language): self
    {
        $this->language = $language;

        return $this;
    }

    public function getFound(): ?int
    {
        return $this->found;
    }

    public function setFound(?int $found): self
    {
        $this->found = $found;

        return $this;
    }
}
