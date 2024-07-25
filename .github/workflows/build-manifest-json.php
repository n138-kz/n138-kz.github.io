<?php
$manifest = json_decode(file_get_contents('./lib/manifest.json'), TRUE);
var_dump(json_encode(array_merge($manifest, time())));
