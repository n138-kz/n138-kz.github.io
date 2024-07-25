<?php
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, 'https://api.github.com/repos/n138-kz/n138-kz.github.io');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

echo curl_exec($curl) . PHP_EOL . PHP_EOL . PHP_EOL;
curl_close($curl);

$github = json_decode(file_get_contents('https://api.github.com/repos/n138-kz/n138-kz.github.io', false, $context), TRUE);
$manifest = json_decode(file_get_contents('../.././lib/manifest.json'), TRUE);
var_dump(json_encode(array_merge($manifest, ['updated_at'=>time()])));
