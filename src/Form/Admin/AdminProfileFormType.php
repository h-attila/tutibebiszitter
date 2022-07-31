<?php

namespace App\Form\Admin;

use App\Entity\Profile;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class AdminProfileFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        // todo: trim fv kell a többi formhoz is?
        $builder
          ->add('slug', TextType::class)
          ->add('meta', TextType::class)
          ->add('title', TextType::class)
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
          ->add('regStart', DateType::class, [
            'widget' => 'single_text',
            'html5' => false
          ])
          ->add('regEnd', DateType::class, [
            'widget' => 'single_text',
            'html5' => false
          ])
          ->add('enabled', CheckboxType::class)
          ->add('active', CheckboxType::class)
          ->add('marketing', CheckboxType::class)
          ->add('newMemberSign', DateType::class, [
            'widget' => 'single_text',
            'html5' => false
          ])
//          ->add('lastRenewed', DateTimeType::class)
          ->add('renewAvailable', TextType::class)
          ->add('highlighted', DateType::class, [
            'widget' => 'single_text',
            'html5' => false
          ])
          ->add('source', TextType::class);
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