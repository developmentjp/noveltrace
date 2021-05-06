CREATE TABLE `user-management-sql`.`user` ( `id` INT NOT NULL AUTO_INCREMENT , `first_name` VARCHAR(100) NOT NULL , `last_name` VARCHAR(50) NOT NULL , `email` VARCHAR(100) NOT NULL , `phone` VARCHAR(45) NOT NULL , `comments` TEXT NOT NULL , `status` VARCHAR(10) NOT NULL DEFAULT 'active' , PRIMARY KEY (`id`)) ENGINE = InnoDB;


INSERT INTO `user-management-sql`.`user` (`first_name`, `last_name`, `email`, `phone`, `comments`, `status`) VALUES ('Drive', 'Well', 'dwell@mail.com', '123545123', 'Drive well please', 'active');
