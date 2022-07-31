<?php
//
//namespace App\Entity;
//
//use App\Repository\HistoryRepository;
//use Doctrine\Common\Collections\ArrayCollection;
//use Doctrine\Common\Collections\Collection;
//use Doctrine\ORM\Mapping as ORM;
//
///**
// * @ORM\Entity(repositoryClass=HistoryRepository::class)
// */
//class History
//{
//    /**
//     * @ORM\Id
//     * @ORM\GeneratedValue
//     * @ORM\Column(type="integer")
//     */
//    private $id;
//
//    /**
//     * @ORM\Column(type="datetime")
//     */
//    private $created;
//
//    /**
//     * @ORM\Column(type="boolean")
//     */
//    private $enabled;
//
//    /**
//     * @ORM\Column(type="string", length=50)
//     */
//    private $icon;
//
//    /**
//     * @ORM\Column(type="string", length=150)
//     */
//    private $message;
//
//    /**
//     * @ORM\OneToMany(targetEntity=Profile::class, mappedBy="history")
//     *
//     * @Groups({"admin_self"})
//     */
//    private $creator;
//
//    /**
//     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="histories")
//     * @ORM\JoinColumn(nullable=false)
//     */
//    private $User;
//
//    public function __construct()
//    {
//        $this->creator = new ArrayCollection();
//    }
//
//    public function getId(): ?int
//    {
//        return $this->id;
//    }
//
//    public function getCreated(): ?\DateTimeInterface
//    {
//        return $this->created;
//    }
//
//    public function setCreated(\DateTimeInterface $created): self
//    {
//        $this->created = $created;
//
//        return $this;
//    }
//
//    public function getEnabled(): ?bool
//    {
//        return $this->enabled;
//    }
//
//    public function setEnabled(bool $enabled): self
//    {
//        $this->enabled = $enabled;
//
//        return $this;
//    }
//
//    public function getIcon(): ?string
//    {
//        return $this->icon;
//    }
//
//    public function setIcon(string $icon): self
//    {
//        $this->icon = $icon;
//
//        return $this;
//    }
//
//    public function getMessage(): ?string
//    {
//        return $this->message;
//    }
//
//    public function setMessage(string $message): self
//    {
//        $this->message = $message;
//
//        return $this;
//    }
//
//    /**
//     * @return Collection
//     */
//    public function getCreator(): Collection
//    {
//        return $this->creator;
//    }
//
//    public function addCreator(Profile $creator): self
//    {
//        if (!$this->creator->contains($creator)) {
//            $this->creator[] = $creator;
//            $creator->setHistory($this);
//        }
//
//        return $this;
//    }
//
//    public function removeCreator(Profile $creator): self
//    {
//        if ($this->creator->removeElement($creator)) {
//            // set the owning side to null (unless already changed)
//            if ($creator->getHistory() === $this) {
//                $creator->setHistory(null);
//            }
//        }
//
//        return $this;
//    }
//
//    public function getUser(): ?User
//    {
//        return $this->User;
//    }
//
//    public function setUser(?User $User): self
//    {
//        $this->User = $User;
//
//        return $this;
//    }
//}
