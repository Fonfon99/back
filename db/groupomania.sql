CREATE TABLE `user` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
);

CREATE TABLE `post` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `url` varchar(50) NOT NULL,
  `user_id` int(int)
);

CREATE TABLE `comment` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `content` varchar(50),
  `user_id` int(11),
  `post_id` int(11)
);

CREATE TABLE `like` (
  `user_id` int(11),
  `post_id` int(11)
);

ALTER TABLE `post` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `comment` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `like` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `like` ADD FOREIGN KEY (`post_id`) REFERENCES `post` (`id`);

ALTER TABLE `comment` ADD FOREIGN KEY (`post_id`) REFERENCES `post` (`id`);