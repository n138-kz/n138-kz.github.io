<?php
Require_once('GetRandStr.php');
$genRandomStr = new n138\genRandomStr();
$genRandomStr->setLength(24); // change the length. default is 8 len.
$genRandomStr->setCharType(12); // change the character. default is 15(all) char.
/*
  all: 1111 = 15
  num: 1000 =  8
  sym: 0100 =  4
  low: 0010 =  2
  upp: 0001 =  1
*/
echo $genRandomStr->getResult();
