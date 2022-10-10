<?php


namespace App\Form;

use App\Entity\Testimonials;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;


class TestimonialsFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
          ->add('enabled', CheckboxType::class)
          ->add('id', IntegerType::class)
          ->add('label', TextType::class, ['empty_data' => ''])
          ->add('avatar', TextType::class, ['empty_data' => ''])
          ->add('description', TextType::class, ['empty_data' => ''])
          ->add('weight', IntegerType::class, ['empty_data' => '0']);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
          'data_class' => Testimonials::class,
          'validation_groups' => ['admin_admin'],           // admin szerkesztheti adminból
          'csrf_protection' => false,
          'allow_extra_fields' => true,                     // lastModified miatt
        ]);
    }
}