<?php

namespace App\Entity;

use App\Repository\ProfileRepository;
use DateTime;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\Index;
use JetBrains\PhpStorm\Pure;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=ProfileRepository::class)
 *
 * @Table(indexes={@Index(name="search_idx", columns={"uuid", "reg_start", "reg_end", "enabled", "active", "new_member", "highlighted", "modified", "slug", "last_renewed", "username"})})
 *
 * @UniqueEntity(fields="name", message="Ez a név már foglalt, kérjük, módosítsd.")
 * @UniqueEntity(fields="username", message="Ez a felhasználónév már foglalt, kérjük, módosítsd.")
 * @UniqueEntity(fields="slug", message="Ez a keresőbarát név ('slug') már foglalt, kérjük, módosítsd.")
 */
class Profile implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     *
     * @Groups({"admin_profile", "user_profile", "public_search", "public"})
     */
    private $id;

//    /**
//     * @ORM\Column(type="string", length=180)
//     *
//     * @Assert\NotBlank (message="E-mail cím megadása kötelező.")
//     * @Assert\Email(message="A megadott E-mail cím '{{ value }}' érvénytelen.")
//     *
//     */
//    private $email;



    /**
     * @Assert\NotBlank  (message="Jelszó megadása kötelezőő.")
     * @Assert\Length (min=6, minMessage="A jelszónak legalább {{ limit }} karakter hosszúnak kell lennie.")
     * @Assert\Regex(
     *     pattern="/[a-z]/",
     *     match=true,
     *     message="A jelszónak legalább egy kisbetűt tartalmaznia kell."
     * )
     * @Assert\Regex (
     *     pattern="/[A-Z]/",
     *     match=true,
     *     message="A jelszónak legalább egy nagybetűt tartalmaznia kell."
     * )
     *
//     * @Groups({"admin_profile", "user_profile"})
     */
    private $plainPassword;

    /**
     * @Assert\NotBlank  (message="Jelszó megadása kötelezőőő.")
     * @Assert\Length (min=6, minMessage="A jelszónak legalább {{ limit }} karakter hosszúnak kell lennie.")
     * @Assert\Regex(
     *     pattern="/[a-z]/",
     *     match=true,
     *     message="A jelszónak legalább egy kisbetűt tartalmaznia kell."
     * )
     * @Assert\Regex (
     *     pattern="/[A-Z]/",
     *     match=true,
     *     message="A jelszónak legalább egy nagybetűt tartalmaznia kell."
     * )
     *
//     * @Groups({"admin_profile", "user_profile"})
     */
    private $rePlainPassword;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     *
     * @Assert\NotBlank (message="Név megadása kötelező.")
     * @Assert\Length (min=5, minMessage="A névnek legalább {{ limit }} karakter hosszúnak kell lennie.")
     *
     * @Groups({"admin_profile", "user_profile", "public_search", "public"})
     */
    private $name;

    /**
     * @ORM\Column(type="datetime")
     *
     * @Groups({"admin_profile", "user_profile"})
     */
    private $created;

    /**
     * @ORM\Column(type="datetime")
     *
     * @Groups({"admin_profile", "user_profile"})
     */
    private $lastUpdate;

    /**
     * @ORM\Column(type="uuid", length=50, unique=true)
     *
     * @Assert\Uuid(message="Érvénytelen felhasználó azonosító.")
     *
     * @Groups({"admin_profile", "user_profile", "public_search", "public"})
     */
    private $uuid;

    /**
     * @ORM\Column(type="string", length=150)
     *
     * @Assert\NotBlank (message="Postázási cím megadása kötelező.")
     *
     * @Assert\Length (
     *     min=5,
     *     max=150,
     *     minMessage="Postázási cím hossza legalább {{ limit }} karakteres lehet.",
     *     maxMessage="Postázási cím hossza legfeljebb {{ limit }} karakteres lehet."
     *     )
     *
     * @Groups({"admin_profile", "user_profile"})
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=150)
     *
     * @Assert\NotBlank (message="Publikus cím megadása kötelező.")
     *
     * @Assert\Length (
     *     min=5,
     *     max=150,
     *     minMessage="Publikus cím hossza legalább {{ limit }} karakteres lehet.",
     *     maxMessage="Publikus cím hossza legfeljebb {{ limit }} karakteres lehet.",
     *     groups={"admin_admin"}
     *     )
     *
     * @Groups({"admin_profile", "user_profile", "public_search", "public"})
     */
    private $pubAddress;

    /**
     * @ORM\Column(type="string", length=25)
     *
     * @Assert\NotBlank (message="Telefonszám megadása kötelező.")
     * @Assert\Regex(
     *     pattern="/^[0-9]*$/",
     *     match=true,
     *     message="A telefonszám csak számjegyeket tartalmazhat."
     * )
     * @Assert\Length (
     *     max=25,
     *     maxMessage="Telefonszám hossza legfeljebb {{ limit }} karakteres lehet."
     *     )
     *
     * @Groups({"admin_profile", "user_profile", "public_search", "public"})
     */
    private $phone;

    /**
     * @ORM\Column(type="string", length=150, nullable=true)
     *
     * @Assert\Length (
     *     max=150,
     *     maxMessage="Web cím hossza legfeljebb {{ limit }} karakteres lehet."
     *     )
     *
     * @Groups({"admin_profile", "user_profile", "public"})
     */
    private $web;

    /**
     * @ORM\Column(type="string", length=150, nullable=true)
     *
     * @Assert\Length (
     *     max=150,
     *     maxMessage="Facebook cím hossza legfeljebb {{ limit }} karakteres lehet."
     *     )
     *
     * @Groups({"admin_profile", "user_profile", "public"})
     */
    private $facebook;

    /**
     * @ORM\Column(type="string", length=150, nullable=true)
     *
     * @Assert\Length (
     *     max=150,
     *     maxMessage="Instagram cím hossza legfeljebb {{ limit }} karakteres lehet."
     *     )
     *
     * @Groups({"admin_profile", "user_profile", "public"})
     */
    private $instagram;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     *
     * @Assert\NotBlank (message="Adj meg egy rövid bemutatkozó szöveget.")

     *
     * @Assert\Length (
     *     max=255,
     *     maxMessage="Rövid bemutatkozás hossza legfeljebb {{ limit }} karakteres lehet."
     *     )
     *
     * @Groups({"admin_profile", "user_profile", "public_search", "public"})
     */
    private $shortIntroduction;

    /**
     * @ORM\Column(type="text", nullable=true)
     *
     * @Assert\NotBlank (message="Néhány mondatos bemutatkozó szöveg szükséges.")
     *
     * @Groups({"admin_profile", "user_profile", "public"})
     */
    private $introduction;

    /**
     * @ORM\Column(type="string", length=150)
     *
     * @Assert\Length (
     *     max=150,
     *     maxMessage="Számlázási név hossza legfeljebb {{ limit }} karakteres lehet."
     *     )
     *
     * @Groups({"admin_profile", "user_profile", "public"})
     */
    private $invoiceName;

    /**
     * @ORM\Column(type="string", length=155)
     *
     * @Assert\Length (
     *     max=150,
     *     maxMessage="Számlázási cím hossza legfeljebb {{ limit }} karakteres lehet."
     *     )
     *
     * @Groups({"admin_profile", "user_profile", "public"})
     */
    private $invoiceAddress;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Assert\Type("DateTime", message="Regisztráció kezdete dátum '{{value}}' érvénytelen.")
     *
     * @Groups({"admin_profile", "user_profile"})
     */
    private $regStart;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Assert\Type("DateTime", message="Regisztráció vége dátum '{{value}}' érvénytelen.")
     *
     * @Groups({"admin_profile", "user_profile"})
     */
    private $regEnd;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     *
     * @Groups({"admin_profile"})
     */
    private $enabled;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     *
     * @Groups({"admin_profile", "user_profile"})
     */
    private $active;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     *
     * @Groups({"admin_profile", "user_profile", "public_search", "public"})
     */
    private $newMember;

    /**
     * @ORM\Column(type="date", nullable=true)
     *
     * @Assert\Type("DateTime", message="Kiemelés vége dátum '{{value}}' érvénytelen.")
     *
     * @Groups({"admin_profile", "user_profile", "public_search", "public"})
     */
    private $highlighted;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     *
     * @Groups({"admin_profile", "user_profile"})
     */
    private $modified;

    /**
     * @ORM\ManyToMany(targetEntity=Service::class, inversedBy="profiles")
     *
     * @Groups({"admin_profile", "user_profile", "public_search", "public"})
     */
    private $services;

    /**
     * @ORM\ManyToMany(targetEntity=Place::class, inversedBy="profiles")
     *
     * @Groups({"admin_profile", "user_profile", "public_search", "public"})
     */
    private $places;

    /**
     * @ORM\ManyToMany(targetEntity=Language::class, inversedBy="profiles")
     *
     * @Groups({"admin_profile", "user_profile", "public_search", "public"})
     */
    private $languages;

    /**
     * @ORM\ManyToMany(targetEntity=Handicap::class, inversedBy="profiles")
     *
     * @Groups({"admin_profile", "user_profile", "public_search", "public"})
     */
    private $handicaps;

    /**
     * @ORM\ManyToMany(targetEntity=Group::class, inversedBy="profiles")
     *
     * @Groups({"admin_profile", "user_profile", "public_search", "public"})
     */
    private $groups;

    /**
     * @ORM\Column(type="date", nullable=true)
     *
     * @Assert\Type("DateTime", message="Újként nyilvántartva dátum '{{value}}' érvénytelen.")
     *
     * @Groups({"admin_profile", "user_profile", "public_search", "public"})
     */
    private $newMemberSign;

    /**
     * @ORM\ManyToMany(targetEntity=AdditionalService::class, inversedBy="profiles")
     *
     * @Groups({"admin_profile", "user_profile", "public"})
     */
    private $additionalServices;

    /**
     * @ORM\ManyToOne(targetEntity=PayMode::class, inversedBy="profiles")
     * @ORM\JoinColumn(nullable=false)
     *
     * @Groups({"admin_profile", "user_profile"})
     */
    private $payMode;

    /**
     * @ORM\ManyToOne(targetEntity=Package::class, inversedBy="profiles")
     * @ORM\JoinColumn(nullable=false)
     *
     * @Groups({"admin_profile", "user_profile"})
     */
    private $package;

    /**
     * @var Status
     *
     * @Groups({"admin_profile", "user_profile"})
     */
    private Status $status;

    /**
     * @ORM\Column(type="string", length=150)
     *
     * @Assert\Length (
     *     max=150,
     *     maxMessage="Keresőbarát név hossza legfeljebb {{ limit }} karakteres lehet."
     *     )
     * @Assert\Regex("/^[\w-]+$/",
     *     message="A keresőbarát név ('web adatlap url', vagy SEO név) csak ékezet nélküli betűt, számot, és '-' karaktert tartalmazhat.")
     *
     * @Groups({"admin_profile", "user_profile", "public_search", "public"})
     */
    private $slug;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     *
     * @Assert\Length (
     *     max=100,
     *     maxMessage="A 'title' hossza legfeljebb {{ limit }} karakteres lehet."
     *     )
     *
     * @Groups({"admin_profile", "user_profile", "public_search", "public"})
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=250, nullable=true)
     *
     * @Assert\Length (
     *     max=250,
     *     maxMessage="A meta leírás hossza legfeljebb {{ limit }} karakteres lehet."
     *     )
     *
     * @Groups({"admin_profile", "user_profile", "public_search", "public"})
     */
    private $meta;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @Groups({"admin_profile", "user_profile"})
     */
    private $lastRenewed;

    /**
     * @ORM\Column(type="integer", nullable=true)
     *
     * @Groups({"admin_profile", "user_profile"})
     */
    private $renewAvailable;

    /**
     * @ORM\Column(type="string", length=15, nullable=true)
     *
     * @Assert\Regex(
     *      pattern="/^[0-9]{8}-[0-9]{1}-[0-9]{2}$/",
     *      match=true,
     *      message="Adószám formátuma nem megfelelő. A helyes formátum: 00000000-0-00")
     *
     * @Groups({"admin_profile", "user_profile"})
     */
    private $taxnumber;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     *
     * @Assert\Length (
     *     max=50,
     *     maxMessage="Óradíj hossza legfeljebb {{ limit }} karakteres lehet."
     *     )
     *
     * @Groups({"admin_profile", "user_profile", "public"})
     */
    private $hourlyRate;

    /**
     * @ORM\Column(type="string", length=150, nullable=true)
     *
     * @Assert\Length (
     *     max=150,
     *     maxMessage="Forrás név hossza legfeljebb {{ limit }} karakteres lehet."
     *     )
     *
     * @Groups({"admin_profile", "user_profile"})
     */
    private $source;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     *
     * @Groups({"admin_profile", "user_profile"})
     */
    private $marketing;

    /**
     * @ORM\Column(type="json")
     *
     * @Groups({"admin_profile", "user_profile"})
     */
    private array $roles = [];

    /**
     * @ORM\Column(type="string", length=255)
     *
     * @Assert\Email() (message="A megadott e-mail cím {{ value }} érvénytelen.")
     * @Assert\NotBlank (message="E-mail cím megadása kötelező.")
     *
     * @Groups({"admin_admin", "admin_profile", "user_profile"})
     */
    private $username;

    #[Pure] public function __construct()
    {
        $this->services = new ArrayCollection();
        $this->places = new ArrayCollection();
        $this->languages = new ArrayCollection();
        $this->handicaps = new ArrayCollection();
        $this->groups = new ArrayCollection();
        $this->additionalServices = new ArrayCollection();
    }

//    /**
//     * @return mixed
//     */
//    public function getEmail()
//    {
//        return $this->email;
//    }

//    /**
//     * @ORM\ManyToOne(targetEntity=History::class, inversedBy="creator")
//     *
//     * @Groups({"admin_admin", "admin_profile"})
//     */
//    private $history;

//    /**
//     * @param mixed $email
//     * @return Profile
//     */
//    public function setEmail($email)
//    {
//        $this->email = $email;
//
//        return $this;
//    }

    /**
     * @return mixed
     */
    public function getRePlainPassword()
    {
        return $this->rePlainPassword;
    }

    /**
     * @param mixed $rePlainPassword
     * @return Profile
     */
    public function setRePlainPassword($rePlainPassword)
    {
        $this->rePlainPassword = $rePlainPassword;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string|null $name
     * @return $this
     */
    public function setName($name)
    {
        $this->name = $name;
        
        return $this;
    }

    /**
     * @return Collection
     */
    public function getAdditionalServices(): Collection
    {
        return $this->additionalServices;
    }

//    /**
//     * @ORM\OneToOne(targetEntity=User::class, mappedBy="profile", cascade={"persist", "remove"})
//     */
//    private $user;

    /**
     * @param Collection $additionalServices
     * @return Profile
     */
    public function setAdditionalServices(Collection $additionalServices): Profile
    {
        $this->additionalServices = $additionalServices;
        return $this;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getCreated()
    {
        return $this->created;
    }

//    /**
//     * @return mixed
//     */
//    public function getName()
//    {
//        return $this->name;
//    }
//
//    /**
//     * @param $name
//     * @return $this
//     */
//    public function setName($name): self
//    {
//        $this->name = $name;
//
//        return $this;
//    }

    /**
     * @param DateTime|null $created
     * @return $this
     */
    public function setCreated($created): self
    {
        $this->created = $created;

        return $this;
    }

    /**
     * @return DateTime
     */
    public function getLastUpdate(): DateTime
    {
        return $this->lastUpdate;
    }

    /**
     * @param DateTime $lastUpdate
     * @return $this
     */
    public function setLastUpdate(DateTime $lastUpdate): self
    {
        $this->lastUpdate = $lastUpdate;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getUuid()
    {
        return $this->uuid;
    }

    /**
     * @param $uuid
     * @return $this
     */
    public function setUuid($uuid): self
    {
        $this->uuid = $uuid;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    /**
     * @param $address
     * @return $this
     */
    public function setAddress($address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getPubAddress(): ?string
    {
        return $this->pubAddress;
    }

    /**
     * @param string $pubAddress
     * @return $this
     */
    public function setPubAddress($pubAddress): self
    {
        $this->pubAddress = $pubAddress;

        return $this;
    }

    public function getPhone(): string
    {
        return $this->phone;
    }

    /**
     * @param $phone
     * @return $this
     */
    public function setPhone($phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getWeb(): ?string
    {
        return $this->web;
    }

    /**
     * @param string|null $web
     * @return $this
     */
    public function setWeb($web): self
    {
        $this->web = $web;

        return $this;
    }

    public function getFacebook(): ?string
    {
        return $this->facebook;
    }

    /**
     * @param string|null $facebook
     * @return $this
     */
    public function setFacebook($facebook): self
    {
        $this->facebook = $facebook;

        return $this;
    }

    public function getInstagram(): ?string
    {
        return $this->instagram;
    }

    /**
     * @param string|null $instagram
     * @return $this
     */
    public function setInstagram($instagram): self
    {
        $this->instagram = $instagram;

        return $this;
    }

    public function getInvoiceName(): ?string
    {
        return $this->invoiceName;
    }

    /**
     * @param string $invoiceName
     * @return $this
     */
    public function setInvoiceName($invoiceName): self
    {
        $this->invoiceName = $invoiceName;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getInvoiceAddress(): ?string
    {
        return $this->invoiceAddress;
    }

    /**
     * @param ?string $invoiceAddress
     * @return $this
     */
    public function setInvoiceAddress(?string $invoiceAddress): self
    {
        $this->invoiceAddress = $invoiceAddress;

        return $this;
    }

    public function getRegStart(): ?DateTimeInterface
    {
        return $this->regStart;
    }

    /**
     * @param DateTimeInterface|null $regStart
     * @return $this
     */
    public function setRegStart(?DateTimeInterface $regStart): self
    {
        $this->regStart = $regStart;

        return $this;
    }

    public function getRegEnd(): ?DateTimeInterface
    {
        return $this->regEnd;
    }

    /**
     * @param DateTimeInterface|null $regEnd
     * @return $this
     */
    public function setRegEnd(?DateTimeInterface $regEnd): self
    {
        $this->regEnd = $regEnd;

        return $this;
    }

    public function getEnabled(): ?bool
    {
        return $this->enabled;
    }

    /**
     * @param bool|null $enabled
     * @return $this
     */
    public function setEnabled(?bool $enabled): self
    {
        $this->enabled = $enabled;

        return $this;
    }

    public function getActive(): ?bool
    {
        return $this->active;
    }

    /**
     * @param bool|null $active
     * @return $this
     */
    public function setActive(?bool $active): self
    {
        $this->active = $active;

        return $this;
    }

    public function getNewMember(): ?bool
    {
        return $this->newMember;
    }

    /**
     * @param bool|null $newMember
     * @return $this
     */
    public function setNewMember(?bool $newMember): self
    {
        $this->newMember = $newMember;

        return $this;
    }

    public function getHighlighted(): ?DateTimeInterface
    {
        return $this->highlighted;
    }

    /**
     * @param DateTimeInterface|null $highlighted
     * @return $this
     */
    public function setHighlighted(?DateTimeInterface $highlighted): self
    {
        $this->highlighted = $highlighted;

        return $this;
    }

    public function getModified(): ?bool
    {
        return $this->modified;
    }

    /**
     * @param bool|null $modified
     * @return $this
     */
    public function setModified(?bool $modified): self
    {
        $this->modified = $modified;

        return $this;
    }

    public function getShortIntroduction(): ?string
    {
        return $this->shortIntroduction;
    }

    /**
     * @param string|null $shortIntroduction
     * @return $this
     */
    public function setShortIntroduction($shortIntroduction): self
    {
        $this->shortIntroduction = $shortIntroduction;

        return $this;
    }

    public function getIntroduction(): ?string
    {
        return $this->introduction;
    }

    /**
     * @param string|null $introduction
     * @return $this
     */
    public function setIntroduction($introduction): self
    {
        $this->introduction = $introduction;

        return $this;
    }

    /**
     * @return array
     */
    public function getServices(): array
    {
        return $this->services->getValues();
    }

    public function addService(Service $service): self
    {
        if (!$this->services->contains($service)) {
            $this->services[] = $service;
        }

        return $this;
    }

    public function removeService(Service $service): self
    {
        $this->services->removeElement($service);

        return $this;
    }

    /**
     * @return array
     */
    public function getPlaces(): array
    {
        return $this->places->getValues();
    }

    public function addPlace(Place $place): self
    {
        if (!$this->places->contains($place)) {
            $this->places[] = $place;
        }

        return $this;
    }

    public function removePlace(Place $place): self
    {
        $this->places->removeElement($place);

        return $this;
    }

    /**
     * @return array
     */
    public function getLanguages(): array
    {
        return $this->languages->getValues();
    }

    public function addLanguage(Language $language): self
    {
        if (!$this->languages->contains($language)) {
            $this->languages[] = $language;
        }

        return $this;
    }

    public function removeLanguage(Language $language): self
    {
        $this->languages->removeElement($language);

        return $this;
    }

    /**
     * @return array
     */
    public function getHandicaps(): array
    {
        return $this->handicaps->getValues();
    }

    public function addHandicap(Handicap $handicap): self
    {
        if (!$this->handicaps->contains($handicap)) {
            $this->handicaps[] = $handicap;
        }

        return $this;
    }

    public function removeHandicap(Handicap $handicap): self
    {
        $this->handicaps->removeElement($handicap);

        return $this;
    }

    /**
     * @return array
     */
    public function getGroups(): array
    {
        return $this->groups->getValues();
    }

    public function addGroup(Group $group): self
    {
        if (!$this->groups->contains($group)) {
            $this->groups[] = $group;
        }

        return $this;
    }

    public function removeGroup(Group $group): self
    {
        $this->groups->removeElement($group);

        return $this;
    }

    public function getNewMemberSign(): ?DateTimeInterface
    {
        return $this->newMemberSign;
    }

    public function setNewMemberSign(?DateTimeInterface $newMemberSign): self
    {
        $this->newMemberSign = $newMemberSign;

        return $this;
    }

    public function addAdditionalService(AdditionalService $additionalService): self
    {
        if (!$this->additionalServices->contains($additionalService)) {
            $this->additionalServices[] = $additionalService;
        }

        return $this;
    }

    public function removeAdditionalService(AdditionalService $additionalService): self
    {
        $this->additionalServices->removeElement($additionalService);

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword($plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    public function getPayMode(): ?PayMode
    {
        return $this->payMode;
    }

    public function setPayMode(?PayMode $payMode): self
    {
        $this->payMode = $payMode;

        return $this;
    }

    public function getPackage(): ?Package
    {
        return $this->package;
    }

    public function setPackage(?Package $package): self
    {
        $this->package = $package;

        return $this;
    }

    public function getStatus(): ?Status
    {
        return $this->status;
    }

    public function setStatus(?Status $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug($slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getLastRenewed(): ?\DateTimeInterface
    {
        return $this->lastRenewed;
    }

    public function setLastRenewed(?\DateTimeInterface $lastRenewed): self
    {
        $this->lastRenewed = $lastRenewed;

        return $this;
    }

    public function getRenewAvailable(): ?int
    {
        return $this->renewAvailable;
    }

    public function setRenewAvailable(?int $renewAvailable): self
    {
        $this->renewAvailable = $renewAvailable;

        return $this;
    }

    public function getTaxnumber(): ?string
    {
        return $this->taxnumber;
    }

//    public function getHistory(): ?History
//    {
//        return $this->history;
//    }
//
//    public function setHistory(?History $history): self
//    {
//        $this->history = $history;
//
//        return $this;
//    }

    public function setTaxnumber($taxnumber): self
    {
        $this->taxnumber = $taxnumber;

        return $this;
    }

    public function getHourlyRate(): ?string
    {
        return $this->hourlyRate;
    }

    public function setHourlyRate($hourlyRate): self
    {
        $this->hourlyRate = $hourlyRate;

        return $this;
    }

    public function getSource(): ?string
    {
        return $this->source;
    }

    public function setSource($source): self
    {
        $this->source = $source;

        return $this;
    }

    public function getMarketing(): ?bool
    {
        return $this->marketing;
    }

    public function setMarketing(?bool $marketing): self
    {
        $this->marketing = $marketing;

        return $this;
    }

    /**
     * string the hashed password for this user
     *
     * @return string
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    /**
     * @param $password
     * @return $this
     */
    public function setPassword($password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
//        $roles[] = 'ROLE_USER';       // kivezetve, mert admin és user ne keveredjen. Úgy lenne szép, ha a profile és user külön entity lenne.

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;     // todo: kell...?
    }

    public function getUserIdentifier(): string
    {
        return (string)$this->username;
    }



//    public function getUser(): ?User
//    {
//        return $this->user;
//    }
//
//    public function setUser(?User $user): self
//    {
//        // unset the owning side of the relation if necessary
//        if ($user === null && $this->user !== null) {
//            $this->user->setProfile(null);
//        }
//
//        // set the owning side of the relation if necessary
//        if ($user !== null && $user->getProfile() !== $this) {
//            $user->setProfile($this);
//        }
//
//        $this->user = $user;
//
//        return $this;
//    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername($username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getTitle(): ?string
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     * @return Profile
     */
    public function setTitle(string $title): self
    {
        $this->title = $title;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getMeta(): ?string
    {
        return $this->meta;
    }

    /**
     * @param mixed $meta
     * @return Profile
     */
    public function setMeta(string $meta): self
    {
        $this->meta = $meta;

        return $this;
    }


}
