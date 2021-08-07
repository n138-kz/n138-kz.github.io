<?php
// タイムゾーン設定
date_default_timezone_set('Asia/Tokyo');

// キャッシュ無効化
header('Content-Type: Application/json');
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
header('Pragma: no-cache');

// レスポンス用変数(array)準備
$response_data['result']=FALSE;
$response_data['detail']='INIT';
$response_data['remote']=$_SERVER['REMOTE_ADDR'];

// メソッドチェック、HTTP/GET以外はすべて拒否
if (strtolower($_SERVER['REQUEST_METHOD']) != 'get') {
  $response_data['detail']='Invalid request.';
  http_response_code(405) ;
  echo json_encode($response_data);exit();
}

// クエリパラメータチェック
if (!isset($_GET)) {
  $response_data['detail']='Invalid request.';
  http_response_code(400) ;
  echo json_encode($response_data);exit();
}

// 文字数パラメータチェック
$response_data['change_len']=isset($_GET['len']) && is_numeric($_GET['len']) && $_GET['len'] > 0;

// 文字型パラメータチェック
$response_data['change_chr']=isset($_GET['chr']) && is_numeric($_GET['chr']) && $_GET['chr'] >= 0 && $_GET['chr'] <= 15;

// クエリパラメータの中身をレスポンス用変数にマージする
$response_data = array_merge($response_data, $_GET);

// ライブラリ読み込み
Require_once('../GetRandStr.php');
$genRandomStr = new n138\genRandomStr();

// 文字数パラメータチェック、valid=okなら設定
if ($response_data['change_len']) {
  $genRandomStr->setLength((int)$_GET['len']); // change the length. default is 8 len.
}
// 文字型パラメータチェック、valid=okなら設定
if ($response_data['change_chr']) {
  $genRandomStr->setCharType((int)$_GET['chr']); // change the length. default is 8 len.
}

// 結果をレスポンス用変数に代入して終了
$response_data['result']=TRUE;
$response_data['detail']=$genRandomStr->getResult();
echo json_encode($response_data);exit();
