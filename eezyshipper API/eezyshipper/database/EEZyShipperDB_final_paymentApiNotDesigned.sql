
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema eezyshipper
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema eezyshipper
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eezyshipper` DEFAULT CHARACTER SET utf8mb4 ;
USE `eezyshipper` ;

-- -----------------------------------------------------
-- Table `eezyshipper`.`countries`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`countries` (
  `countries_id` INT NOT NULL AUTO_INCREMENT,
  `countries_name` VARCHAR(45) NULL,
  `countries_iso_code_2_letters` VARCHAR(45) NULL,
  `countries_iso_code_3_letters` VARCHAR(45) NULL,
  UNIQUE INDEX `countries_name_UNIQUE` (`countries_name` ASC),
  UNIQUE INDEX `countries_iso_code_2_letter_UNIQUE` (`countries_iso_code_2_letters` ASC),
  UNIQUE INDEX `countries_iso_code_3_letters_UNIQUE` (`countries_iso_code_3_letters` ASC),
  PRIMARY KEY (`countries_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`states_cities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`states_cities` (
  `states_cities_id` INT NOT NULL AUTO_INCREMENT,
  `states_cities_name` VARCHAR(45) NULL,
  `countries_id` INT NOT NULL,
  PRIMARY KEY (`states_cities_id`, `countries_id`),
  INDEX `fk_states_or_cities_countries_idx` (`countries_id` ASC),
  CONSTRAINT `fk_states_or_cities_countries`
    FOREIGN KEY (`countries_id`)
    REFERENCES `eezyshipper`.`countries` (`countries_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`addresses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`addresses` (
  `addresses_id` INT NOT NULL,
  `addresses_zipcode` VARCHAR(6) NULL DEFAULT NULL,
  `addresses_ln1_street_house` VARCHAR(90) NOT NULL,
  `addresses_ln1_area_postcode` VARCHAR(80) NULL DEFAULT NULL,
  `addresses_ln3_extrainfo` VARCHAR(60) NULL DEFAULT NULL,
  `addresses_created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `addresses_updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `states_cities_id` INT NOT NULL,
  `countries_id` INT NOT NULL,
  PRIMARY KEY (`addresses_id`),
  INDEX `fk_addresses_states_cities1_idx` (`states_cities_id` ASC, `countries_id` ASC),
  CONSTRAINT `fk_addresses_states_cities1`
    FOREIGN KEY (`states_cities_id` , `countries_id`)
    REFERENCES `eezyshipper`.`states_cities` (`states_cities_id` , `countries_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`users` (
  `users_id` INT NOT NULL AUTO_INCREMENT,
  `users_first_name` VARCHAR(45) NOT NULL,
  `users_last_name` VARCHAR(45) NOT NULL,
  `users_email` VARCHAR(50) NOT NULL,
  `users_phone` VARCHAR(20) NULL DEFAULT NULL,
  `users_password` VARCHAR(255) NOT NULL,
  `users_gender` ENUM('0', '1', '2') NULL DEFAULT NULL COMMENT '0=Male\n1-Female\n2=Other',
  `users_date_of_birth` DATE NULL DEFAULT NULL,
  `users_status` ENUM('0', '1') NULL DEFAULT '1' COMMENT 'Active or deactive account\n0= disabled\n1=active',
  `users_is_admin` ENUM('0', '1') NULL DEFAULT '0' COMMENT 'By Default it is Customer\nIf from admin user got permitted then is_admin=1\n',
  `users_profile_status` ENUM('0', '1') NULL DEFAULT '0' COMMENT '0=profile incomplete\n1=profile setup complete',
  `users_email_verified_at` DATETIME NULL DEFAULT NULL,
  `users_created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `users_updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`users_id`),
  UNIQUE INDEX `users_email_UNIQUE` (`users_email` ASC),
  UNIQUE INDEX `users_phone_UNIQUE` (`users_phone` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`administrations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`administrations` (
  `administrations_id` INT NOT NULL AUTO_INCREMENT,
  `administrations_slug` VARCHAR(45) NOT NULL,
  `administrations_name` VARCHAR(45) NOT NULL,
  `desc` MEDIUMTEXT NOT NULL,
  `administrations_created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `administrations_updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`administrations_id`),
  UNIQUE INDEX `administrations_name_UNIQUE` (`administrations_name` ASC) ,
  UNIQUE INDEX `administrations_slug_UNIQUE` (`administrations_slug` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = cp1250;


-- -----------------------------------------------------
-- Table `eezyshipper`.`warehouses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`warehouses` (
  `warehouses_id` INT NOT NULL AUTO_INCREMENT,
  `warehouses_name` VARCHAR(45) NOT NULL,
  `warehouses_type` VARCHAR(45) NOT NULL,
  `warehouses_status` ENUM('0', '1') NULL DEFAULT '1' COMMENT '0=inactive\n1=active\n',
  `warehouses_created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `warehouses_updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`warehouses_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`suppliers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`suppliers` (
  `suppliers_id` INT(4) NOT NULL AUTO_INCREMENT,
  `suppliers_name` VARCHAR(30) NULL,
  `suppliers_type` VARCHAR(45) NOT NULL COMMENT 'Different types of supplier airlines, cargo, ship e.t.c',
  `suppliers_email` VARCHAR(45) NULL DEFAULT NULL,
  `suppliers_phone` VARCHAR(45) NULL DEFAULT NULL,
  `suppliers_status` ENUM('0', '1') NULL DEFAULT '1' COMMENT '0= Disabled\n1= Enabled',
  `suppliers_created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `suppliers_updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`suppliers_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`wh_location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`wh_location` (
  `warehouses_id` INT NOT NULL AUTO_INCREMENT,
  `addresses_id` INT NOT NULL,
  PRIMARY KEY (`warehouses_id`, `addresses_id`),
  INDEX `fk_wh_location_addresses1_idx` (`addresses_id` ASC),
  CONSTRAINT `fk_wh_location_warehouses1`
    FOREIGN KEY (`warehouses_id`)
    REFERENCES `eezyshipper`.`warehouses` (`warehouses_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_wh_location_addresses1`
    FOREIGN KEY (`addresses_id`)
    REFERENCES `eezyshipper`.`addresses` (`addresses_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`user_location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`user_location` (
  `users_users_id` INT NOT NULL AUTO_INCREMENT,
  `addresses_id` INT NOT NULL,
  PRIMARY KEY (`users_users_id`, `addresses_id`),
  INDEX `fk_usr_location_addresses1_idx` (`addresses_id` ASC) ,
  CONSTRAINT `fk_usr_location_users1`
    FOREIGN KEY (`users_users_id`)
    REFERENCES `eezyshipper`.`users` (`users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usr_location_addresses1`
    FOREIGN KEY (`addresses_id`)
    REFERENCES `eezyshipper`.`addresses` (`addresses_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`s_location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`s_location` (
  `suppliers_suppliers_id` INT(4) NOT NULL,
  `addresses_id` INT NOT NULL,
  PRIMARY KEY (`suppliers_suppliers_id`, `addresses_id`),
  INDEX `fk_s_location_addresses1_idx` (`addresses_id` ASC),
  CONSTRAINT `fk_s_location_suppliers1`
    FOREIGN KEY (`suppliers_suppliers_id`)
    REFERENCES `eezyshipper`.`suppliers` (`suppliers_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_s_location_addresses1`
    FOREIGN KEY (`addresses_id`)
    REFERENCES `eezyshipper`.`addresses` (`addresses_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`resourceses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`resourceses` (
  `resourceses_id` INT NOT NULL AUTO_INCREMENT,
  `resourceses_slug` VARCHAR(45) NOT NULL,
  `resourceses_name` VARCHAR(45) NOT NULL,
  `resourceses_desc` MEDIUMTEXT NOT NULL,
  `resourceses_created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `resourceses_updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`resourceses_id`),
  UNIQUE INDEX `administrations_name_UNIQUE` (`resourceses_name` ASC) ,
  UNIQUE INDEX `administrations_slug_UNIQUE` (`resourceses_slug` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = cp1250;


-- -----------------------------------------------------
-- Table `eezyshipper`.`admins_permission`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`admins_permission` (
  `admins_permission_id` INT NOT NULL AUTO_INCREMENT,
  `admins_permission_permission` ENUM('B', 'R', 'E', 'A', 'D') NOT NULL DEFAULT 'R',
  `admins_permission_status` ENUM('-1', '0', '1') NOT NULL DEFAULT '1' COMMENT 'Admins Permission Status\n\n-1= disabled\n0= Not Assigned\n1= Active\n',
  `admins_permission_created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `admins_permission_updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`admins_permission_id`, `users_id`),
  INDEX `fk_admins_permission_users1_idx` (`users_id` ASC) ,
  CONSTRAINT `fk_admins_permission_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `eezyshipper`.`users` (`users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`administrations_has_resourceses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`administrations_has_resourceses` (
  `administrations_administrations_id` INT NOT NULL,
  `resourceses_id` INT NOT NULL,
  `admins_permission_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`administrations_administrations_id`, `resourceses_id`, `admins_permission_id`, `users_id`),
  INDEX `fk_administrations_has_resourceses_resourceses1_idx` (`resourceses_id` ASC) ,
  INDEX `fk_administrations_has_resourceses_administrations1_idx` (`administrations_administrations_id` ASC) ,
  INDEX `fk_administrations_has_resourceses_admins_permission1_idx` (`admins_permission_id` ASC, `users_id` ASC) ,
  CONSTRAINT `fk_administrations_has_resourceses_administrations1`
    FOREIGN KEY (`administrations_administrations_id`)
    REFERENCES `eezyshipper`.`administrations` (`administrations_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_administrations_has_resourceses_resourceses1`
    FOREIGN KEY (`resourceses_id`)
    REFERENCES `eezyshipper`.`resourceses` (`resourceses_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_administrations_has_resourceses_admins_permission1`
    FOREIGN KEY (`admins_permission_id` , `users_id`)
    REFERENCES `eezyshipper`.`admins_permission` (`admins_permission_id` , `users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = cp1250;


-- -----------------------------------------------------
-- Table `eezyshipper`.`notifications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`notifications` (
  `notifications_id` INT NOT NULL AUTO_INCREMENT,
  `notifications_type` ENUM('0', '1', '2', '3', '4', '5') NOT NULL,
  `notifications_title` VARCHAR(80) NULL DEFAULT NULL,
  `notifications_msg` VARCHAR(255) NOT NULL,
  `notifications_status` ENUM('0', '1') NULL DEFAULT '0',
  `notifications_created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `notifications_updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`notifications_id`, `users_id`),
  INDEX `fk_notifications_users1_idx` (`users_id` ASC) ,
  CONSTRAINT `fk_notifications_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `eezyshipper`.`users` (`users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`identity_verifications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`identity_verifications` (
  `identity_verifications_id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `doc_type` VARCHAR(45) NULL DEFAULT NULL,
  `f_name` VARCHAR(45) NULL DEFAULT NULL,
  `l_name` VARCHAR(45) NULL DEFAULT NULL,
  `doc_imges` VARCHAR(255) NOT NULL COMMENT 'put multiple images with comma seperated',
  `identity_verifications_doc_no` VARCHAR(40) NULL DEFAULT NULL,
  `identity_verifications_valid_from` DATE NULL DEFAULT NULL,
  `identity_verifications_expire` DATE NULL DEFAULT NULL,
  `identity_verifications_varify_at` DATETIME NULL DEFAULT NULL,
  `users_varified_by` INT NULL DEFAULT NULL,
  `varification_status` ENUM('-1', '0', '1') NULL DEFAULT '0',
  `identity_verifications_created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `identity_verifications_update_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `identity_verifications_document_for` ENUM('0', '1') NULL DEFAULT '1' COMMENT '0=Buxiness\n1=Individual',
  PRIMARY KEY (`identity_verifications_id`, `users_id`),
  INDEX `fk_identity_verifications_users1_idx` (`users_id` ASC) ,
  INDEX `fk_identity_verifications_users2_idx` (`users_varified_by` ASC) ,
  CONSTRAINT `fk_identity_verifications_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `eezyshipper`.`users` (`users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_identity_verifications_users2`
    FOREIGN KEY (`users_varified_by`)
    REFERENCES `eezyshipper`.`users` (`users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`subscriptions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`subscriptions` (
  `subscriptions_id` INT NOT NULL AUTO_INCREMENT,
  `subscriptions_slug` VARCHAR(16) NOT NULL,
  `subscriptions_name` VARCHAR(20) NOT NULL,
  `subscriptions_monthly_fee` INT(2) NOT NULL,
  `subscriptions_yearly_fee` INT(4) NOT NULL,
  `subscriptions_created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `subscriptions_updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`subscriptions_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`payments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`payments` (
  `payments_id` INT NOT NULL AUTO_INCREMENT,
  `users_users_id` INT NOT NULL COMMENT 'The user who pay',
  `payments_card_id` VARCHAR(45) NULL DEFAULT NULL,
  `payments_amount` FLOAT NOT NULL,
  `payments_currency` VARCHAR(45) NOT NULL DEFAULT 'pound',
  `payments_final_status` ENUM('-1', '0', '1') NULL DEFAULT '0' COMMENT '-1= Payment Failed\n0= Request for Payment\n1= Payment Successfull',
  `payments_issue_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `payments_updated_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`payments_id`, `users_users_id`),
  INDEX `fk_payments_users1_idx` (`users_users_id` ASC) ,
  CONSTRAINT `fk_payments_users1`
    FOREIGN KEY (`users_users_id`)
    REFERENCES `eezyshipper`.`users` (`users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`users_subscription`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`users_subscription` (
  `user_subscription_id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `subscriptions_id` INT NOT NULL,
  `payments_id` INT NOT NULL,
  `users_subscription_status` ENUM('-1', '0', '1') NULL DEFAULT '0' COMMENT 'User Subscription Status\n-1= Expired\n0=Waiting for Payment\n1=Active',
  `users_subscription_activated_at` DATETIME NULL DEFAULT NULL,
  `users_subscription_expire_at` DATETIME NULL DEFAULT NULL,
  `users_subscription_created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `users_subscription_updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_subscription_id`, `users_id`, `subscriptions_id`, `payments_id`),
  INDEX `fk_users_subscription_subscriptions1_idx` (`subscriptions_id` ASC) ,
  INDEX `fk_users_subscription_payments1_idx` (`payments_id` ASC) ,
  INDEX `fk_users_subscription_users1_idx` (`users_id` ASC) ,
  CONSTRAINT `fk_users_subscription_subscriptions1`
    FOREIGN KEY (`subscriptions_id`)
    REFERENCES `eezyshipper`.`subscriptions` (`subscriptions_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_subscription_payments1`
    FOREIGN KEY (`payments_id`)
    REFERENCES `eezyshipper`.`payments` (`payments_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_subscription_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `eezyshipper`.`users` (`users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`pay_cards`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`pay_cards` (
  `pay_cards_id` INT NOT NULL AUTO_INCREMENT,
  `users_users_id` INT NOT NULL,
  `pay_cards_type` ENUM('0', '1') NOT NULL COMMENT '0=Credit card \n1=Debit card',
  `pay_cards_number` VARCHAR(16) NOT NULL,
  `pay_cards_expire_at` VARCHAR(5) NOT NULL,
  `pay_cards_cvc` VARCHAR(4) NOT NULL,
  `pay_cards_allow_auto_renual` ENUM('0', '1') NULL DEFAULT '0' COMMENT '0= Not Allowed\n1=Allow auto Renewal',
  `pay_cards_created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `pay_cards_updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pay_cards_id`, `users_users_id`),
  INDEX `fk_pay_cards_users1_idx` (`users_users_id` ASC) ,
  CONSTRAINT `fk_pay_cards_users1`
    FOREIGN KEY (`users_users_id`)
    REFERENCES `eezyshipper`.`users` (`users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`parcels`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`parcels` (
  `parcels_id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `parcels_bought_from` VARCHAR(45) NOT NULL COMMENT 'Per',
  `warehouses_id` INT NOT NULL,
  `parcels_status` ENUM('0', '1') NOT NULL DEFAULT '1' COMMENT 'Percel Status\n0= return to origin due to percel problem\n1= received bu warehouse & proceed for Transection',
  `parcels_weight` FLOAT NOT NULL,
  `parcels_d_x` FLOAT NOT NULL,
  `parcels_d_y` FLOAT NOT NULL,
  `parcels_d_z` FLOAT NOT NULL,
  `parcels_volumetric_weight` FLOAT NOT NULL,
  `parcels_created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `parcels_updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`parcels_id`, `users_id`, `warehouses_id`),
  INDEX `fk_percels_users1_idx` (`users_id` ASC) ,
  INDEX `fk_parcels_warehouses1_idx` (`warehouses_id` ASC) ,
  CONSTRAINT `fk_percels_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `eezyshipper`.`users` (`users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_parcels_warehouses1`
    FOREIGN KEY (`warehouses_id`)
    REFERENCES `eezyshipper`.`warehouses` (`warehouses_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`categories` (
  `categories_id` INT NOT NULL AUTO_INCREMENT,
  `categories_name` VARCHAR(45) NULL,
  `categories_slug` VARCHAR(45) NULL,
  PRIMARY KEY (`categories_id`),
  UNIQUE INDEX `categories_slug_UNIQUE` (`categories_slug` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`packages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`packages` (
  `packages_id` INT NOT NULL AUTO_INCREMENT,
  `categories_id` INT NOT NULL,
  `packages_product_desc` VARCHAR(45) NOT NULL,
  `packages_product_quantity` TINYINT(2) NOT NULL,
  `parcels_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`packages_id`, `categories_id`, `parcels_id`, `users_id`),
  INDEX `fk_packages_categories1_idx` (`categories_id` ASC) ,
  INDEX `fk_packages_parcels1_idx` (`parcels_id` ASC, `users_id` ASC) ,
  CONSTRAINT `fk_packages_categories1`
    FOREIGN KEY (`categories_id`)
    REFERENCES `eezyshipper`.`categories` (`categories_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_packages_parcels1`
    FOREIGN KEY (`parcels_id` , `users_id`)
    REFERENCES `eezyshipper`.`parcels` (`parcels_id` , `users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`payment_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`payment_status` (
  `payment_status_id` INT NOT NULL AUTO_INCREMENT,
  `payment_status_code` VARCHAR(45) NULL,
  `payment_status_msg` VARCHAR(45) NULL,
  `payments_id` INT NOT NULL,
  PRIMARY KEY (`payment_status_id`, `payments_id`),
  INDEX `fk_payment_status_payments1_idx` (`payments_id` ASC) ,
  CONSTRAINT `fk_payment_status_payments1`
    FOREIGN KEY (`payments_id`)
    REFERENCES `eezyshipper`.`payments` (`payments_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`consignments_props`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`consignments_props` (
  `props_id` INT NOT NULL AUTO_INCREMENT,
  `props_prefix` VARCHAR(12) NOT NULL,
  `props_current_id` TINYINT(4) NULL DEFAULT 1,
  `props_opening_day` ENUM('0', '1', '2', '3', '4', '5', '6') NULL,
  `props_time` VARCHAR(45) NULL,
  PRIMARY KEY (`props_id`),
  UNIQUE INDEX `props_prefix_UNIQUE` (`props_prefix` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`consignments_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`consignments_status` (
  `consignments_status_id` INT NOT NULL AUTO_INCREMENT,
  `consignments_status_name` VARCHAR(80) NOT NULL,
  `consignments_status_brief` MEDIUMTEXT NOT NULL,
  `consignments_status_type` ENUM('-1', '0', '1', '2') NOT NULL COMMENT '-1= Error\n0=process\n1=success\n2= Innitialized\n',
  `consignments_process_no` TINYINT(1) NULL COMMENT 'if consignment_status_type=0 then enter process no',
  PRIMARY KEY (`consignments_status_id`),
  UNIQUE INDEX `consignments_process_no_UNIQUE` (`consignments_process_no` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`consignments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`consignments` (
  `consignments_id` INT NOT NULL AUTO_INCREMENT,
  `consignments_col` VARCHAR(45) NULL,
  `consignments_props_id` INT NOT NULL,
  `consignments_number` INT(4) NOT NULL COMMENT 'From consignment_props get current_props_id and use it as consignment_number\nAlso at consignment_props table increment consignment_props_id',
  `consignments_status_id` INT NOT NULL,
  PRIMARY KEY (`consignments_id`, `consignments_props_id`),
  INDEX `fk_consignments_consignments_props1_idx` (`consignments_props_id` ASC) ,
  INDEX `fk_consignments_consignments_status1_idx` (`consignments_status_id` ASC) ,
  CONSTRAINT `fk_consignments_consignments_props1`
    FOREIGN KEY (`consignments_props_id`)
    REFERENCES `eezyshipper`.`consignments_props` (`props_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_consignments_consignments_status1`
    FOREIGN KEY (`consignments_status_id`)
    REFERENCES `eezyshipper`.`consignments_status` (`consignments_status_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`suppliers_route`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`suppliers_route` (
  `suppliers_route_id` INT NOT NULL AUTO_INCREMENT,
  `suppliers_id` INT(4) NOT NULL,
  `suppliers_route_fromt` VARCHAR(45) NULL,
  `suppliers_route_to` VARCHAR(45) NULL,
  PRIMARY KEY (`suppliers_route_id`, `suppliers_id`),
  INDEX `fk_suppliers_route_suppliers1_idx` (`suppliers_id` ASC) ,
  CONSTRAINT `fk_suppliers_route_suppliers1`
    FOREIGN KEY (`suppliers_id`)
    REFERENCES `eezyshipper`.`suppliers` (`suppliers_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`supplier_chargees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`supplier_chargees` (
  `supplier_chargees_id` INT NOT NULL AUTO_INCREMENT,
  `suppliers_route_id` INT NOT NULL,
  `suppliers_id` INT(4) NOT NULL,
  `supplier_chargees_weight_from` TINYINT(3) NOT NULL,
  `supplier_chargees_weight_to` VARCHAR(3) NOT NULL,
  `supplier_chargees_rate` FLOAT NOT NULL,
  `supplier_chargees_markup` FLOAT NOT NULL,
  `supplier_chargees_status` ENUM('0', '1') NULL DEFAULT '1',
  `supplier_chargees_created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `supplier_chargees_updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`supplier_chargees_id`, `suppliers_route_id`, `suppliers_id`),
  INDEX `fk_percel_chargees_suppliers_route1_idx` (`suppliers_route_id` ASC, `suppliers_id` ASC) ,
  CONSTRAINT `fk_percel_chargees_suppliers_route1`
    FOREIGN KEY (`suppliers_route_id` , `suppliers_id`)
    REFERENCES `eezyshipper`.`suppliers_route` (`suppliers_route_id` , `suppliers_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`transection_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`transection_status` (
  `transection_status_id` INT NOT NULL AUTO_INCREMENT,
  `transection_status_name` VARCHAR(80) NOT NULL,
  `transection_status_brief` MEDIUMTEXT NOT NULL,
  `transection_status_type` ENUM('-1', '0', '1', '2') NOT NULL COMMENT '-1= Error\n0=process\n1=success\n2= Innitialized\n\n',
  `transection_process_no` TINYINT(1) NULL COMMENT 'if transection_status_no = 0 then transection_process_no will show',
  PRIMARY KEY (`transection_status_id`),
  UNIQUE INDEX `transection_process_no_UNIQUE` (`transection_process_no` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`transections`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`transections` (
  `transections_id` INT(9) NOT NULL AUTO_INCREMENT,
  `parcels_parcels_id` INT NOT NULL,
  `parcels_users_users_id` INT NOT NULL,
  `parcels_warehouses_warehouses_id` INT NOT NULL,
  `payments_payments_id` INT NOT NULL,
  `consignments_id` INT(4) NULL DEFAULT NULL,
  `transection_status_id` INT NOT NULL,
  `transections_from` VARCHAR(45) NOT NULL,
  `transections_destination` VARCHAR(45) NOT NULL,
  `transections_eta` DATE NULL DEFAULT NULL,
  `supplierl_chargees_id` INT NOT NULL,
  `suppliers_route_id` INT NOT NULL,
  `suppliers_id` INT(4) NOT NULL,
  `transections_price` FLOAT NULL,
  `transections_created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `transections_updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`transections_id`, `parcels_parcels_id`, `parcels_users_users_id`, `parcels_warehouses_warehouses_id`, `transection_status_id`, `supplierl_chargees_id`, `suppliers_route_id`, `suppliers_id`),
  INDEX `fk_transections_parcels1_idx` (`parcels_parcels_id` ASC, `parcels_users_users_id` ASC, `parcels_warehouses_warehouses_id` ASC) ,
  INDEX `fk_transections_payments1_idx` (`payments_payments_id` ASC) ,
  INDEX `fk_transections_consignments1_idx` (`consignments_id` ASC) ,
  INDEX `fk_transections_percel_chargees1_idx` (`supplierl_chargees_id` ASC, `suppliers_route_id` ASC, `suppliers_id` ASC) ,
  INDEX `fk_transections_transection_status1_idx` (`transection_status_id` ASC),
  CONSTRAINT `fk_transections_parcels1`
    FOREIGN KEY (`parcels_parcels_id` , `parcels_users_users_id` , `parcels_warehouses_warehouses_id`)
    REFERENCES `eezyshipper`.`parcels` (`parcels_id` , `users_id` , `warehouses_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_transections_payments1`
    FOREIGN KEY (`payments_payments_id`)
    REFERENCES `eezyshipper`.`payments` (`payments_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_transections_consignments1`
    FOREIGN KEY (`consignments_id`)
    REFERENCES `eezyshipper`.`consignments` (`consignments_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_transections_percel_chargees1`
    FOREIGN KEY (`supplierl_chargees_id` , `suppliers_route_id` , `suppliers_id`)
    REFERENCES `eezyshipper`.`supplier_chargees` (`supplier_chargees_id` , `suppliers_route_id` , `suppliers_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_transections_transection_status1`
    FOREIGN KEY (`transection_status_id`)
    REFERENCES `eezyshipper`.`transection_status` (`transection_status_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eezyshipper`.`return_percel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eezyshipper`.`return_percel` (
  `return_percel_id` INT NOT NULL AUTO_INCREMENT,
  `parcels_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  `warehouses_id` INT NOT NULL,
  `return_percel_return_to` VARCHAR(45) NOT NULL,
  `return_percel_reseon` VARCHAR(80) NOT NULL,
  `return_percel_brief` MEDIUMTEXT NULL,
  `return_percel_status` ENUM('0', '1') NULL DEFAULT '0',
  `return_percel_created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `return_percel_updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`return_percel_id`, `parcels_id`, `users_id`, `warehouses_id`),
  INDEX `fk_return_percel_parcels1_idx` (`parcels_id` ASC, `users_id` ASC, `warehouses_id` ASC) ,
  CONSTRAINT `fk_return_percel_parcels1`
    FOREIGN KEY (`parcels_id` , `users_id` , `warehouses_id`)
    REFERENCES `eezyshipper`.`parcels` (`parcels_id` , `users_id` , `warehouses_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
