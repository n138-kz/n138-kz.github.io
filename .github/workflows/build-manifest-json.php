<?php
$options = [
    'http' => [
        'method' => 'GET',
        'header' => 'curl',
    ],
];
$context = stream_context_create($options);

$github = json_decode(file_get_contents('https://api.github.com/repos/n138-kz/n138-kz.github.io', false, $context), TRUE);
$manifest = json_decode(file_get_contents('../.././lib/manifest.json'), TRUE);
var_dump(json_encode(array_merge($manifest, ['updated_at'=>time()])));
