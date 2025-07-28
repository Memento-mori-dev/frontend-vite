<?php

//В переменную $token нужно вставить токен, который нам прислал @botFather
$tokenTG = "7602607246:AAEo1o9Q5JeJicfR0VeUHujJTkx62sa8_eI";

//Сюда вставляем chat_id
$chat_id_TG = "-1002272530393";

// Получаем данные из формы
$name = $_POST['name'] ?? '';
$phone = $_POST['phone'] ?? '';

if (!$name || !$phone) {
    http_response_code(400);
    echo 'Не заполнены все поля';
    exit;
}

// --- НАСТРОЙКИ AMOCRM ---
$subdomain = 'drumfamily';
$access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJhNGFhMmIwZWQ3MGJkODdkYzk3NWU3YzI3NGNiNGNiY2UxOGJlMTM3NjE0NWI2YTY1NjUzNzBjOTMyZDZjMjVmNzk3ZTdmNzlkOTRmMThlIn0.eyJhdWQiOiJjOTRkZWM4NS01MDYwLTQ1ZDAtODMwZi1hZDhkNGUxNzk2MjIiLCJqdGkiOiJiYTRhYTJiMGVkNzBiZDg3ZGM5NzVlN2MyNzRjYjRjYmNlMThiZTEzNzYxNDViNmE2NTY1MzcwYzkzMmQ2YzI1Zjc5N2U3Zjc5ZDk0ZjE4ZSIsImlhdCI6MTc0Nzc1ODg3OSwibmJmIjoxNzQ3NzU4ODc5LCJleHAiOjE3NjE3ODI0MDAsInN1YiI6IjM2ODM2MzUiLCJncmFudF90eXBlIjoiIiwiYWNjb3VudF9pZCI6MzIzNzYwNzQsImJhc2VfZG9tYWluIjoiYW1vY3JtLnJ1IiwidmVyc2lvbiI6Miwic2NvcGVzIjpbImNybSIsImZpbGVzIiwiZmlsZXNfZGVsZXRlIiwibm90aWZpY2F0aW9ucyIsInB1c2hfbm90aWZpY2F0aW9ucyJdLCJoYXNoX3V1aWQiOiJlODM4MWVmYy0zYjlhLTQ0MDEtYTU3Ny1jZTVhZGQ5YThjNTYiLCJhcGlfZG9tYWluIjoiYXBpLWIuYW1vY3JtLnJ1In0.c0JnPGuVDw4pTugnUVZSbzCZMJwpepVUy2bFf43JSUYZ1HjhCUUcTon8m7wIgBzTdRayAbubEkTc9yZpqMQRKM3J6rmX4b9YWk24LynYgjf7xwSozQL5r-4jroP-551wmBMwSNmFJPibLIKdaIqRQmbk3jSzXzFNIiQKRwyolLXtcIrEs1lBP3vxDdbjPK_9BFeNpGP2QtFg_Ke06ZWg41ExIqP-qIIl4JDB_qrJS-0CK-Ca0Uq-2TiPNopolOQlUS2wkE7Hk_qCKktMpRnjzsthYdmBfCOcCdNGGTnU7gb1Vw7pUZqotBLh4IWT9wh6uy03Z-q72Nrbh7YAamZmnQ';

// --- СОЗДАНИЕ СДЕЛКИ С КОНТАКТОМ ---
$url = "https://$subdomain.amocrm.ru/api/v4/leads/complex";

$data = [
    [
        'name' => 'Заявка с сайта',
        'custom_fields_values' => [
            [
                'field_id' => 529885, // ID поля "Телефон" в сделке
                'values' => [
                    ['value' => $phone],
                ]
            ],
            [
                'field_id' => 529887, // ID поля "Имя" в сделке
                'values' => [
                    ['value' => $name]
                ]
            ]
        ],
        '_embedded' => [
            'contacts' => [
                [
                    'first_name' => $name,
                    'custom_fields_values' => [
                        [
                            'field_code' => 'PHONE',
                            'values' => [
                                [
                                    'value' => $phone,
                                    'enum_code' => 'WORK'
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]
];

$headers = [
    "Authorization: Bearer $access_token",
    'Content-Type: application/json'
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// tg
$arr = array(
    'Имя:' => $name,
    'Телефон:' => $phone
);

foreach($arr as $key => $value) {
    $txtTG .= "<b>".$key."</b> ".$value."%0A";
};

// $sendToTelegram = fopen("https://api.telegram.org/bot{$tokenTG}/sendMessage?chat_id={$chat_id_TG}&parse_mode=html&text={$txtTG}","r");

// Ответ and $sendToTelegram
if (($http_code === 200 || $http_code === 201) ) {
    echo 'OK';
} else {
    http_response_code(500);
    echo 'Ошибка при отправке в amoCRM: ' . $response;
} 