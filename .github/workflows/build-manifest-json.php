<?php
$url = 'https://api.github.com/repos/n138-kz/n138-kz.github.io';
$options = [
    'http' => [
        'method' => 'GET',
        'header' => 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    ],
];
$context = stream_context_create($options);
$html = file_get_contents($url, false, $context);
$github = json_decode($html, TRUE);
$manifestFile = __DIR__ . '/../../lib/manifest.json';
$manifest = json_decode(file_get_contents( realpath($manifestFile) ), TRUE);

$manifest = array_merge($manifest, ['updated_at'=>time()]);
$manifest = array_merge($manifest, ['name'=>$github['full_name']]);
$manifest = array_merge($manifest, ['short_name'=>$github['name']]);
$manifest = array_merge($manifest, ['description'=>$github['description']]);

file_put_contents($manifestFile, json_encode($manifest, JSON_PRETTY_PRINT));
