<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220801184230 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE INDEX search_idx ON additional_service (enabled)');
        $this->addSql('ALTER TABLE article DROP -- phpMyAdmin SQL Dump');
        $this->addSql('CREATE INDEX search_idx ON article (title)');
        $this->addSql('CREATE INDEX search_idx ON `group` (enabled)');
        $this->addSql('CREATE INDEX search_idx ON handicap (enabled)');
        $this->addSql('CREATE INDEX search_idx ON language (enabled)');
        $this->addSql('CREATE INDEX search_idx ON package (enabled)');
        $this->addSql('CREATE INDEX search_idx ON pay_mode (enabled)');
        $this->addSql('CREATE INDEX search_idx ON place (state_code, city_code, enabled)');
        $this->addSql('CREATE INDEX search_idx ON profile (uuid, reg_start, reg_end, enabled, active, new_member, highlighted, modified, slug, last_renewed, username)');
        $this->addSql('CREATE INDEX search_idx ON service (enabled)');
        $this->addSql('CREATE INDEX search_idx ON testimonials (enabled)');
        $this->addSql('DROP INDEX UNIQ_8D93D649E7927C74 ON user');
        $this->addSql('DROP INDEX search_idx ON user');
        $this->addSql('ALTER TABLE user CHANGE email username VARCHAR(180) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649F85E0677 ON user (username)');
        $this->addSql('CREATE INDEX search_idx ON user (username)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX search_idx ON additional_service');
        $this->addSql('DROP INDEX search_idx ON article');
        $this->addSql('ALTER TABLE article ADD -- phpMyAdmin SQL Dump VARCHAR(128) DEFAULT NULL');
        $this->addSql('DROP INDEX search_idx ON `group`');
        $this->addSql('DROP INDEX search_idx ON handicap');
        $this->addSql('DROP INDEX search_idx ON language');
        $this->addSql('DROP INDEX search_idx ON package');
        $this->addSql('DROP INDEX search_idx ON pay_mode');
        $this->addSql('DROP INDEX search_idx ON place');
        $this->addSql('DROP INDEX search_idx ON profile');
        $this->addSql('DROP INDEX search_idx ON service');
        $this->addSql('DROP INDEX search_idx ON testimonials');
        $this->addSql('DROP INDEX UNIQ_8D93D649F85E0677 ON user');
        $this->addSql('DROP INDEX search_idx ON user');
        $this->addSql('ALTER TABLE user CHANGE username email VARCHAR(180) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON user (email)');
        $this->addSql('CREATE INDEX search_idx ON user (email)');
    }
}
