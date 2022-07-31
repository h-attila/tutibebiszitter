<?php

namespace App\Form\Profile;

use App\Entity\Package;
use App\Entity\PayMode;
use App\Entity\Profile;
use App\Form\AdditionalServiceFormType;
use App\Form\GroupFormType;
use App\Form\LanguageFormType;
use App\Form\PackageFormType;
use App\Form\PayModeFormType;
use App\Form\PlaceFormType;
use App\Form\ServiceFormType;
use App\Repository\PackageRepository;
use App\Service\PackageService;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class AdminProfileFormType extends AbstractType
{
    protected PackageService $packageService;

    public function __construct(PackageService $packageService)
    {
        $this->packageService = $packageService;
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        // todo: trim fv kell a többi formhoz is?

        $builder
            ->add('name', TextType::class)
            ->add('address', TextType::class)
            ->add('pubAddress', TextType::class)
            ->add('phone', TextType::class)
            ->add('web', TextType::class)
            ->add('username', EmailType::class)
            ->add('facebook', TextType::class)
            ->add('plainPassword', TextType::class)
            ->add('rePlainPassword', TextType::class)
            ->add('instagram', TextType::class)
            ->add('invoiceName', TextType::class)
            ->add('invoiceAddress', TextType::class)
            ->add('taxnumber', TextType::class)
            ->add('shortIntroduction', TextareaType::class)
            ->add('introduction', TextareaType::class)
            ->add('hourlyRate', TextType::class)
            ->add('active', CheckboxType::class)
            ->add('marketing', CheckboxType::class)
            ->add('source', TextType::class);
//            ->add('additionalServices', CollectionType::class, [
//                'entry_type' => AdditionalServiceFormType::class,
//                'allow_add' => true,
//                'allow_delete' => true,
//            ])
//            ->add('groups', CollectionType::class, [
//                'entry_type' => GroupFormType::class,
//                'allow_add' => true,
//                'allow_delete' => true,
//            ])
//            ->add('languages', CollectionType::class, [
//                'entry_type' => LanguageFormType::class,
//                'allow_add' => true,
//                'allow_delete' => true,
//            ])
//            ->add('package', EntityType::class, [
//                'class' => Package::class,
//            ])
//            ->add('payMode', EntityType::class, [
//                'class' => PayMode::class
//            ])
//            ->add('places', CollectionType::class, [
//                'entry_type' => PlaceFormType::class,
//                'allow_add' => true,
//                'allow_delete' => true,
//            ])
//            ->add('services', CollectionType::class, [
//                'entry_type' => ServiceFormType::class,
//                'allow_add' => true,
//                'allow_delete' => true,
//            ]

    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Profile::class,
            'allow_extra_fields' => true,
            'csrf_protection' => false,
//          'validation_groups' => ['Default', 'admin_admin']
        ]);
    }
}