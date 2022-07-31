<?php


namespace App\Form;

use App\Entity\Package;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;


class PackageFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
          ->add('label', TextType::class)
          ->add('description', TextType::class, ['empty_data' => ''])
          ->add('days', IntegerType::class, ['empty_data' => '0'])
          ->add('price', IntegerType::class, ['empty_data' => '0'])
          ->add('stars', IntegerType::class, ['empty_data' => '0'])
          ->add('weight', IntegerType::class, ['empty_data' => '0']);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
          'data_class' => Package::class,
//          'validation_groups' => ['admin_admin'],       // admin szerkesztheti adminból
          'csrf_protection' => false,               // todo: kivenni!
          'allow_extra_fields' => false,
        ]);
    }
}