
CREATE TABLE `Role` (
  `id` BIGINT PRIMARY KEY auto_increment ,
  `name` VARCHAR(255)
);

CREATE TABLE `User` (
  `id` BIGINT PRIMARY KEY auto_increment,
  `name` VARCHAR(255),
  `email` VARCHAR(255),
  `password` VARCHAR(255),
  `role_id` BIGINT,
  FOREIGN KEY (`role_id`) REFERENCES `Role` (`id`)
);

CREATE TABLE `Pond` (
  `id` BIGINT PRIMARY KEY auto_increment,
  `name` VARCHAR(255),
  `image` VARCHAR(255),
  `size` FLOAT,
  `depth` FLOAT,
  `volume` FLOAT,
  `num_of_drains` BIGINT,
  `pump_capacity` FLOAT,
  `user_id` BIGINT,
  FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
);

CREATE TABLE `Koi` (
  `id` BIGINT PRIMARY KEY auto_increment,
  `name` VARCHAR(255),
  `image` VARCHAR(255),
  `body_shape` VARCHAR(255),
  `age` BIGINT,
  `size` FLOAT,
  `weight` FLOAT,
  `gender` ENUM('male', 'female'),
  `breed` VARCHAR(255),
  `origin` VARCHAR(255),
  `pond_id` BIGINT,
  FOREIGN KEY (`pond_id`) REFERENCES `Pond` (`id`)
);

CREATE TABLE `Koi_growth_record` (
  `id` BIGINT PRIMARY KEY auto_increment,
  `growth_date` DATE,
  `age` BIGINT,
  `size` FLOAT,
  `weight` FLOAT,
  `koi_id` BIGINT,
  FOREIGN KEY (`koi_id`) REFERENCES `Koi` (`id`)
);

CREATE TABLE `Water_parameters` (
  `id` BIGINT PRIMARY KEY auto_increment,
  `measurement_time` DATETIME,
  `pond_id` BIGINT,
  FOREIGN KEY (`pond_id`) REFERENCES `Pond` (`id`)
);

CREATE TABLE `Water_parameter_value` (
  `id` BIGINT PRIMARY KEY auto_increment,
  `name` VARCHAR(255),
  `param_value` FLOAT,
  `water_parameters_id` BIGINT,
  FOREIGN KEY (`water_parameters_id`) REFERENCES `Water_parameters` (`id`)
);

CREATE TABLE `Product` (
  `id` BIGINT PRIMARY KEY auto_increment,
  `name` VARCHAR(255),
  `description` TEXT,
  `price` DECIMAL(10, 2),
  `quantity` BIGINT
);

CREATE TABLE `Order` (
  `id` BIGINT PRIMARY KEY auto_increment,
  `order_date` DATETIME,
  `total_amount` DECIMAL(10, 2),
  `user_id` BIGINT,
  `status` ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
);

CREATE TABLE `Order_Product` (
  `order_id` BIGINT,
  `product_id` BIGINT,
  `quantity` INT NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL, 
  PRIMARY KEY (`order_id`, `product_id`),
  FOREIGN KEY (`order_id`) REFERENCES `Order` (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`)
);

CREATE TABLE `News_blog` (
  `id` BIGINT PRIMARY KEY auto_increment,
  `image` VARCHAR(255),
  `title` VARCHAR(255),
  `content` TEXT,
  `date_published` DATETIME,
  `user_id` BIGINT, 
  FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
);

CREATE TABLE `Cart` (
    `id` BIGINT PRIMARY KEY auto_increment,
    `user_id` BIGINT,   
    FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) 
);

CREATE TABLE `Cart_item` (
    `cart_id` BIGINT ,
    `product_id` BIGINT ,
    `quantity` INT ,
    PRIMARY KEY (`cart_id`, `product_id`), 
    FOREIGN KEY (`cart_id`) REFERENCES `Cart` (`id`),
    FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`)
);

-- Role Values
INSERT INTO `Role` (`id`, `name`) VALUES
(1, 'Guest'),
(2, 'Member'),
(3, 'Shop'),
(4, 'Admin');

-- User Values
INSERT INTO `User` (`id`, `name`, `email`, `password`, `role_id`) VALUES
(1, 'TranThinh', 'tranthinh@example.com', '123', 2), -- Member
(2, 'DucQuang', 'ducquang@example.com', '999', 1), -- Guest
(3, 'PhuongNam', 'phuongnam@example.com', '111', 3), -- Shop
(4, 'KietNguyen', 'kietnguyen@example.com', '279', 4); -- Admin

-- Pond Values
INSERT INTO `Pond` (`id`, `name`, `image`, `size`, `depth`, `volume`, `num_of_drains`, `pump_capacity`, `user_id`) VALUES
(1, 'Big Pond', 'mainpond.jpg', 15.0, 2.5, 375.0, 2, 150.0, 1), -- TranThinh pond
(2, 'Small Pond', 'smallpond.jpg', 8.0, 1.8, 144.0, 1, 80.0, 2), -- DucQuang pond
(3, 'Tiny Pond', 'smallpond.jpg', 2.0, 0.7, 110.0, 1, 20.0, 3), -- PhuongNam pond
(4, 'Medium Pond', 'smallpond.jpg', 5.0, 1.2, 122.0, 2, 50.0, 4); -- KietNguyen pond

-- Koi Values
INSERT INTO `Koi` (`id`, `name`, `image`, `body_shape`, `age`, `size`, `weight`, `gender`, `breed`, `origin`, `pond_id`) VALUES
(1, 'Koi A', 'koia.jpg', 'round', 2, 30.0, 1.5, 'male', 'Kohaku', 'Japan', 1), 
(2, 'Koi B', 'koib.jpg', 'oval', 3, 40.0, 2.0, 'female', 'Kudoshinichi', 'Japan', 2),
(3, 'Koi C', 'koic.jpg', 'slim', 1, 20.0, 1.0, 'female', 'Kakhi', 'Japan', 3),
(4, 'Koi D', 'koid.jpg', 'triangle', 5, 80.0, 7.0, 'male', 'Kaito', 'Japan', 4);


-- Koi Update Values
INSERT INTO `Koi_growth_record` (`id`, `growth_date`,`age`. `size`, `weight`, `koi_id`) VALUES
(1, '2024-09-17',2, 31.0, 1.6, 1),
(2, '2024-09-17',3,41.0, 2.1, 2),
(3, '2024-09-17',1,21.0, 1.1, 3),
(4, '2024-09-17',5,81.0, 8.1, 4),
(5, '2024-09-18',2,31.5, 1.7, 1),
(6, '2024-09-18',3,41.5, 2.2, 2),
(7, '2024-09-18',1,31.5, 1.2, 3),
(8, '2024-09-18',5,82.5, 8.3, 4);

-- Water Parameters Update 
INSERT INTO `Water_parameters` (`id`, `measurement_time`, `pond_id`) VALUES
(1, '2024-09-17 08:00:00', 1), -- For Big Pond
(2, '2024-09-17 10:00:00', 2), -- For Small Pond
(3, '2024-09-17 11:00:00', 3), -- For Tiny Pond
(4, '2024-09-17 11:32:00', 4); -- For Medium Pond

-- Water Parameters Values Update 
INSERT INTO `Water_parameter_value` (`id`, `name`, `param_value`, `water_parameters_id`) VALUES
(1, 'pH', 7.5, 1),
(2, 'O2', 6.8, 1),
(3, 'NO2', 0.02, 1),
(4, 'PO4', 7.2, 1),
(5, 'salinity', 1.0, 1),
(6, 'temperature', 27.00, 1),
(7, 'pH', 6.5, 2),
(8, 'O2', 4.8, 2),
(9, 'NO2', 0.05, 2),
(10, 'PO4', 4.2, 2),
(11, 'salinity', 1.0, 2),
(12, 'temperature', 28.00, 2),
(13, 'pH', 3.5, 3),
(14, 'O2', 3.8, 3),
(15, 'NO2', 0.02, 3),
(16, 'PO4', 2.2, 3),
(17, 'salinity', 0.06, 3),
(18, 'temperature', 27.00, 3),
(19, 'pH', 5.5, 4),
(20, 'O2', 5.8, 4),
(21, 'NO2', 0.04, 4),
(22, 'PO4', 5.2, 4),
(23, 'salinity', 1.0, 4),
(24, 'temperature', 27.00, 4);

-- Product Values 
INSERT INTO `Product` (`id`, `name`, `description`, `price`, `quantity`) VALUES
(1, 'Koi Food', 'Premium koi food for all stages of growth.', 25.000, 93),
(2, 'Water Treatment', 'Improves water quality and balances pH.', 60.000, 48),
(3, 'Thermometer', 'to check the temperature of the water.', 20.000, 47),
(4, 'Salt', 'Improves water salinity.', 10.000, 49);

-- Order Values
INSERT INTO `Order` (`id`, `order_date`, `total_amount`, `user_id`, `status`) VALUES
(1, '2024-09-17 12:00:00', 50.000, 1, 'pending'), -- TranThinh order
(2, '2024-09-17 13:00:00', 150.000, 2, 'processing'), -- DucQuang order
(3, '2024-09-17 14:00:00', 60.000, 3, 'cancelled'), -- PhuongNam order
(4, '2024-09-17 15:00:00', 90.000, 4,'shipped'); -- KietNguyen order

-- Order_Product Values
INSERT INTO `Order_Product` (`order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 1, 2, 100.000), -- 2 units of Koi Food in TranThinh order
(2, 3, 2, 48.000), -- 2 units of Thermometer in DucQuang order
(3, 1, 1, 50.000), -- 1 units of Koi Food in PhuongNam order
(4, 4, 2, 70.000); -- 2 units of Salt in KietNguyen order

-- Article Values
INSERT INTO `News_blog` (`id`, `image`, `title`, `content`, `date_published`) VALUES
(1, 2, 'Koi Pond Maintenance Tips', 'Here are some tips to maintain your koi pond...', '2024-09-17 09:00:00');


