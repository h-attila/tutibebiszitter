<?php


namespace App\Form;

use App\Entity\Service;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;


class ServiceFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('id', IntegerType::class, ['mapped' => false])
            ->add('enabled', CheckboxType::class)
            ->add('id', IntegerType::class)
            ->add('label', TextType::class)
            ->add('weight', IntegerType::class);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Service::class,
//            'validation_groups' => ['admin_admin'],       // admin szerkesztheti adminból
            'allow_extra_fields' => false,
            'csrf_protection' => false,

        ]);
    }
}