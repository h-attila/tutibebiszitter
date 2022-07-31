<?php

namespace App\Controller\Profile\Api;

use App\Entity\Language;
use App\Form\LanguageFormType;
use App\Service\LanguageService;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * Class AdditionalServiceController
 * @package App\Controller\Profile\Api
 *
 * @Route("/profilom/api/list-items/language", name="profile_api_list_items_language_")
 */
class LanguageController extends ListItemsController
{
    /**
     * @param EntityManagerInterface $entityManager
     * @param LanguageService $languageService
     * @param SerializerInterface $serializer
     */
    #[Pure] public function __construct(
      protected EntityManagerInterface $entityManager,
      LanguageService                  $languageService,
      SerializerInterface              $serializer
    )
    {
        $this->class = Language::class;
        $this->formType = LanguageFormType::class;
        $this->service = $languageService;
        $this->serializer = $serializer;

        parent::__construct($this->entityManager);
    }
}
