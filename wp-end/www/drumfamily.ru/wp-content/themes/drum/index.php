<?
  $url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http");
  $url .= "://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];

  $parsed = parse_url($url);


  if ($parsed['path'] == '/thank/') {
    get_template_part( 'thank', 'thank' );
  } elseif($parsed['path'] == '/politics/') {
    get_template_part( 'politics', 'politics' );
  } else {
    get_template_part( 'main', 'main' );
  }
?>
