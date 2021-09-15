CREATE TABLE `SL_USER` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `pass` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO SL_USER (id, name, age, pass) VALUES
(1, 'Miguel Ferrer', 19, '1234'),
(2, 'Hadley Weber', 20, '1234'),
(3, 'Lee Hunter', 22, '1234'),
(4, 'Claire Waters', 23, '1234'),
(5, 'Jael Coffey', 55, '1234'),
(6, 'Quynn Marshall', 74, '1234'),
(7, 'Nichole Briggs', 23, '1234'),
(8, 'Francesca Matthews', 34, '1234'),
(9, 'Colette Morton', 53, '1234'),
(10, 'Sydnee Becker', 23, '1234'),
(11, 'Dakota Cobb', 82, '1234'),
(12, 'Penelope Browning', 50, '1234');