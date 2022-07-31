<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220731153900 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE additional_service (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(50) NOT NULL, enabled TINYINT(1) NOT NULL, last_modified DATETIME NOT NULL, weight SMALLINT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE app_log (id INT AUTO_INCREMENT NOT NULL, created DATETIME NOT NULL, level VARCHAR(25) NOT NULL, message VARCHAR(255) NOT NULL, context LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE article (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(50) NOT NULL, article LONGTEXT NOT NULL, last_modified DATETIME NOT NULL, UNIQUE INDEX UNIQ_23A0E662B36786B (title), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `group` (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(50) NOT NULL, value INT NOT NULL, enabled TINYINT(1) NOT NULL, last_modified DATETIME NOT NULL, weight SMALLINT NOT NULL, UNIQUE INDEX UNIQ_6DC044C51D775834 (value), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE handicap (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(50) NOT NULL, enabled TINYINT(1) NOT NULL, last_modified DATETIME NOT NULL, weight SMALLINT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE language (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(50) NOT NULL, enabled TINYINT(1) NOT NULL, last_modified DATETIME NOT NULL, weight SMALLINT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE package (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(50) NOT NULL, description VARCHAR(255) NOT NULL, days INT NOT NULL, enabled TINYINT(1) NOT NULL, price SMALLINT NOT NULL, uuid VARCHAR(50) NOT NULL, stars SMALLINT NOT NULL, last_modified DATETIME NOT NULL, weight SMALLINT NOT NULL, public TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_DE686795D17F50A6 (uuid), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE pay_mode (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(50) NOT NULL, description VARCHAR(255) NOT NULL, enabled TINYINT(1) NOT NULL, last_modified DATETIME NOT NULL, weight SMALLINT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE place (id INT AUTO_INCREMENT NOT NULL, city_label VARCHAR(50) NOT NULL, city_code VARCHAR(25) NOT NULL, enabled TINYINT(1) NOT NULL, last_modified DATETIME NOT NULL, state_code VARCHAR(50) NOT NULL, state_label VARCHAR(50) NOT NULL, UNIQUE INDEX UNIQ_741D53CD4D2DF7BF (city_label), UNIQUE INDEX UNIQ_741D53CD945B0DF0 (city_code), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE profile (id INT AUTO_INCREMENT NOT NULL, pay_mode_id INT NOT NULL, package_id INT NOT NULL, password VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, created DATETIME NOT NULL, last_update DATETIME NOT NULL, uuid BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', address VARCHAR(150) NOT NULL, pub_address VARCHAR(150) NOT NULL, phone VARCHAR(25) NOT NULL, web VARCHAR(150) DEFAULT NULL, facebook VARCHAR(150) DEFAULT NULL, instagram VARCHAR(150) DEFAULT NULL, short_introduction VARCHAR(255) DEFAULT NULL, introduction LONGTEXT DEFAULT NULL, invoice_name VARCHAR(150) NOT NULL, invoice_address VARCHAR(155) NOT NULL, reg_start DATE DEFAULT NULL, reg_end DATE DEFAULT NULL, enabled TINYINT(1) DEFAULT NULL, active TINYINT(1) DEFAULT NULL, new_member TINYINT(1) DEFAULT NULL, highlighted DATE DEFAULT NULL, modified TINYINT(1) DEFAULT NULL, new_member_sign DATE DEFAULT NULL, slug VARCHAR(150) NOT NULL, title VARCHAR(100) DEFAULT NULL, meta VARCHAR(250) DEFAULT NULL, last_renewed DATETIME DEFAULT NULL, renew_available INT DEFAULT NULL, taxnumber VARCHAR(15) DEFAULT NULL, hourly_rate VARCHAR(50) DEFAULT NULL, source VARCHAR(150) DEFAULT NULL, marketing TINYINT(1) DEFAULT NULL, roles JSON NOT NULL, username VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8157AA0F5E237E06 (name), UNIQUE INDEX UNIQ_8157AA0FD17F50A6 (uuid), INDEX IDX_8157AA0F910F4281 (pay_mode_id), INDEX IDX_8157AA0FF44CABFF (package_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE profile_service (profile_id INT NOT NULL, service_id INT NOT NULL, INDEX IDX_3223444ECCFA12B8 (profile_id), INDEX IDX_3223444EED5CA9E6 (service_id), PRIMARY KEY(profile_id, service_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE profile_place (profile_id INT NOT NULL, place_id INT NOT NULL, INDEX IDX_83C9CC1FCCFA12B8 (profile_id), INDEX IDX_83C9CC1FDA6A219 (place_id), PRIMARY KEY(profile_id, place_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE profile_language (profile_id INT NOT NULL, language_id INT NOT NULL, INDEX IDX_2DB11004CCFA12B8 (profile_id), INDEX IDX_2DB1100482F1BAF4 (language_id), PRIMARY KEY(profile_id, language_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE profile_handicap (profile_id INT NOT NULL, handicap_id INT NOT NULL, INDEX IDX_CC971B0ACCFA12B8 (profile_id), INDEX IDX_CC971B0AB996CB29 (handicap_id), PRIMARY KEY(profile_id, handicap_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE profile_group (profile_id INT NOT NULL, group_id INT NOT NULL, INDEX IDX_9A14DB17CCFA12B8 (profile_id), INDEX IDX_9A14DB17FE54D947 (group_id), PRIMARY KEY(profile_id, group_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE profile_additional_service (profile_id INT NOT NULL, additional_service_id INT NOT NULL, INDEX IDX_7AF6FFBFCCFA12B8 (profile_id), INDEX IDX_7AF6FFBFF8E98E09 (additional_service_id), PRIMARY KEY(profile_id, additional_service_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE service (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(50) NOT NULL, enabled TINYINT(1) NOT NULL, last_modified DATETIME NOT NULL, weight SMALLINT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE testimonials (id INT AUTO_INCREMENT NOT NULL, description TEXT NOT NULL, avatar VARCHAR(50) NOT NULL, enabled TINYINT(1) NOT NULL, last_modified DATETIME NOT NULL, weight SMALLINT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_statistics (id INT AUTO_INCREMENT NOT NULL, last_updated DATE DEFAULT NULL, data VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE profile ADD CONSTRAINT FK_8157AA0F910F4281 FOREIGN KEY (pay_mode_id) REFERENCES pay_mode (id)');
        $this->addSql('ALTER TABLE profile ADD CONSTRAINT FK_8157AA0FF44CABFF FOREIGN KEY (package_id) REFERENCES package (id)');
        $this->addSql('ALTER TABLE profile_service ADD CONSTRAINT FK_3223444ECCFA12B8 FOREIGN KEY (profile_id) REFERENCES profile (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE profile_service ADD CONSTRAINT FK_3223444EED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE profile_place ADD CONSTRAINT FK_83C9CC1FCCFA12B8 FOREIGN KEY (profile_id) REFERENCES profile (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE profile_place ADD CONSTRAINT FK_83C9CC1FDA6A219 FOREIGN KEY (place_id) REFERENCES place (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE profile_language ADD CONSTRAINT FK_2DB11004CCFA12B8 FOREIGN KEY (profile_id) REFERENCES profile (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE profile_language ADD CONSTRAINT FK_2DB1100482F1BAF4 FOREIGN KEY (language_id) REFERENCES language (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE profile_handicap ADD CONSTRAINT FK_CC971B0ACCFA12B8 FOREIGN KEY (profile_id) REFERENCES profile (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE profile_handicap ADD CONSTRAINT FK_CC971B0AB996CB29 FOREIGN KEY (handicap_id) REFERENCES handicap (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE profile_group ADD CONSTRAINT FK_9A14DB17CCFA12B8 FOREIGN KEY (profile_id) REFERENCES profile (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE profile_group ADD CONSTRAINT FK_9A14DB17FE54D947 FOREIGN KEY (group_id) REFERENCES `group` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE profile_additional_service ADD CONSTRAINT FK_7AF6FFBFCCFA12B8 FOREIGN KEY (profile_id) REFERENCES profile (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE profile_additional_service ADD CONSTRAINT FK_7AF6FFBFF8E98E09 FOREIGN KEY (additional_service_id) REFERENCES additional_service (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE profile_additional_service DROP FOREIGN KEY FK_7AF6FFBFF8E98E09');
        $this->addSql('ALTER TABLE profile_group DROP FOREIGN KEY FK_9A14DB17FE54D947');
        $this->addSql('ALTER TABLE profile_handicap DROP FOREIGN KEY FK_CC971B0AB996CB29');
        $this->addSql('ALTER TABLE profile_language DROP FOREIGN KEY FK_2DB1100482F1BAF4');
        $this->addSql('ALTER TABLE profile DROP FOREIGN KEY FK_8157AA0FF44CABFF');
        $this->addSql('ALTER TABLE profile DROP FOREIGN KEY FK_8157AA0F910F4281');
        $this->addSql('ALTER TABLE profile_place DROP FOREIGN KEY FK_83C9CC1FDA6A219');
        $this->addSql('ALTER TABLE profile_service DROP FOREIGN KEY FK_3223444ECCFA12B8');
        $this->addSql('ALTER TABLE profile_place DROP FOREIGN KEY FK_83C9CC1FCCFA12B8');
        $this->addSql('ALTER TABLE profile_language DROP FOREIGN KEY FK_2DB11004CCFA12B8');
        $this->addSql('ALTER TABLE profile_handicap DROP FOREIGN KEY FK_CC971B0ACCFA12B8');
        $this->addSql('ALTER TABLE profile_group DROP FOREIGN KEY FK_9A14DB17CCFA12B8');
        $this->addSql('ALTER TABLE profile_additional_service DROP FOREIGN KEY FK_7AF6FFBFCCFA12B8');
        $this->addSql('ALTER TABLE profile_service DROP FOREIGN KEY FK_3223444EED5CA9E6');
        $this->addSql('DROP TABLE additional_service');
        $this->addSql('DROP TABLE app_log');
        $this->addSql('DROP TABLE article');
        $this->addSql('DROP TABLE `group`');
        $this->addSql('DROP TABLE handicap');
        $this->addSql('DROP TABLE language');
        $this->addSql('DROP TABLE package');
        $this->addSql('DROP TABLE pay_mode');
        $this->addSql('DROP TABLE place');
        $this->addSql('DROP TABLE profile');
        $this->addSql('DROP TABLE profile_service');
        $this->addSql('DROP TABLE profile_place');
        $this->addSql('DROP TABLE profile_language');
        $this->addSql('DROP TABLE profile_handicap');
        $this->addSql('DROP TABLE profile_group');
        $this->addSql('DROP TABLE profile_additional_service');
        $this->addSql('DROP TABLE service');
        $this->addSql('DROP TABLE testimonials');
        $this->addSql('DROP TABLE user_statistics');
    }
}
