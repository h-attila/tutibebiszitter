<?php


namespace App\Form;


use App\Entity\Profile;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ProfileFormType extends AbstractType
{
    // todo: minden mezőt belevenni.
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
          ->add('username', TextType::class)
          ->add('plainPassword', PasswordType::class)
          ->add('rePlainPassword', PasswordType::class)
          ->add('name', TextType::class)
          ->add('address', TextType::class)
          ->add('pubAddress', TextType::class)
          ->add('phone', TextType::class)
          ->add('web', TextType::class)
          ->add('facebook', TextType::class)
          ->add('instagram', TextType::class)
          ->add('shortIntroduction', TextType::class)
          ->add('introduction', TextareaType::class)
          ->add('invoiceName', TextType::class)
          ->add('invoiceAddress', TextType::class)
          ->add('taxNumber', TextType::class)
          ->add('hourlyRate', TextType::class)
          ->add('source', TextType::class)
          ->add('marketing', CheckboxType::class);

//            ->add('language', CollectionType::class, [
//                'entry_type' => LanguageType::class,
//                'by_reference' => true,
//                'allow_add' => true,
//            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
          'class_type' => Profile::class,
          'allow_extra_fields' => true,
            'csrf_protection' => false,
        ]);
    }
}