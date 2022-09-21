<?php

namespace App\Logger;

use App\Entity\AppLog;
use Doctrine\ORM\EntityManagerInterface;
use Monolog\Handler\AbstractProcessingHandler;

// https://stackoverflow.com/questions/55048874/store-monolog-in-database
class DoctrineHandler extends AbstractProcessingHandler
{
    private bool $initialized;
    private EntityManagerInterface $em;
    private string $channel = 'doctrine_channel';

    public function __construct(EntityManagerInterface $em)
    {
        parent::__construct();

        $this->em = $em;
    }

    protected function write(array $record): void
    {
        if (!$this->initialized) {
            $this->initialize();
        }

        if ($this->channel != $record['channel']) {
            return;
        }

        $appLog = new AppLog();
        $appLog
            ->setLevel($record['level'] ?? null)
            ->setMessage($record['level'] ?? null)
            ->setContext($record['context'] ?? null);

        $this->em->persist($appLog);
        $this->em->flush();
    }

    private function initialize()
    {
        $this->initialized = true;
    }
}