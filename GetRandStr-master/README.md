# GetRandStr (Class)
![URI](http://img.shields.io/badge/state-active-blue.svg?style=flat)

## Before use
1. Nothing to do. Only the download.

## How to use
1. Download the [GetRandStr.php](GetRandStr.php).
1. Import(support is `Require()`) and call class.
   Note. this file is use the namespace.
         When calling a class, prefix the class name with `n138`.

## Sample
```php:sample.php
<?php
Require_once('GetRandStr.php');
$genRandomStr = new n138\genRandomStr();
$genRandomStr->setLength(24); // change the length. default is 8 len.
$genRandomStr->setCharType(12); // change the character. default is 15(all) char.
echo $genRandomStr->getResult();
```

### $genRandomStr->setCharType(?)
| Type | Mask | Value |
| ---- | ---- | ----- |
| all | 1111 | 15 |
| num | 1000 | 8 |
| sym | 0100  | 4 |
| low | 0010 | 2 |
| up | 0001 | 1 |

```bash:sample.php
$ php sample.php ; echo '';
0<#,^(5[@\:)&#>!{*5~<$5)
$
```

## Operation check
![URI](http://img.shields.io/badge/php-5.4.16-yellow.svg?style=flat)
![URI](http://img.shields.io/badge/httpd-Apache/2.4.6-yellow.svg?style=flat)
![URI](http://img.shields.io/badge/Kernel-3.10.0-yellow.svg?style=flat)
![URI](http://img.shields.io/badge/CentOS-Linux%20release%207.8.2003-yellow.svg?style=flat)
```bash
$ php -v
PHP 5.4.16 (cli) (built: Apr  1 2020 04:07:17)
Copyright (c) 1997-2013 The PHP Group
Zend Engine v2.4.0, Copyright (c) 1998-2013 Zend Technologies
```
```bash
$ httpd -v
Server version: Apache/2.4.6 (CentOS)
Server built:   Apr  2 2020 13:13:23
```
```bash
$ uname -r
3.10.0-1127.19.1.el7.x86_64
```
```bash
$ cat /etc/redhat-release
CentOS Linux release 7.8.2003 (Core)
```

---
# GetRandStr (API)
![URI](http://img.shields.io/badge/state-active-blue.svg?style=flat)

## Before use
1. Install the webserver and php.

## How to use
### Normal access
1. Download the this repos data to document root on your server.
1. Access the http://yourserver/GetRandStr/

### API access
1. Download the this repos data to document root on your server.
1. Request to http://yourserver/GetRandStr/, method is **GET**
1. (Optional) Customize the uri, how to use is below.

### Option
#### Change the include character
The character type that is output can be changed by putting the character specified in the `chr` argument.  
i.e. ![URI](http://img.shields.io/badge/Method-GET-yellow.svg?style=flat) `http://yourserver/GetRandStr?chr=11`  

Please look the [#genrandomstr-setchartype](#genrandomstr-setchartype)

#### Change the length
You can change the number of characters by putting a number in the `len` argument.  
i.e. ![URI](http://img.shields.io/badge/Method-GET-yellow.svg?style=flat) `http://yourserver/GetRandStr?len=12`  

#### Note
> Options `chr` and `len` can be used in combination

---
#### Default
| argument | value |
|:---- |:----------- |
| chr | 15 |
| len | 8 |
