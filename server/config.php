<?php
require_once __DIR__ . '/vendor/autoload.php';
use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$env = $_ENV['APP_ENV'];

// Configuration settings for different environments
$config = [
    'localhost' => [
        'database' => [
            'host' => $_ENV['LOCAL_DB_HOST'],
            'username' => $_ENV['LOCAL_DB_USERNAME'],
            'password' => $_ENV['LOCAL_DB_PASSWORD'],
            'dbname' => $_ENV['LOCAL_DB_DBNAME'],
        ],
        'emailServerUserName' => $_ENV['LOCAL_EMAIL_SERVER_USERNAME'],
        'emailServerPassword' => $_ENV['LOCAL_EMAIL_SERVER_PASSWORD'],
        'emailServerPort' => $_ENV['LOCAL_EMAIL_SERVER_PORT'],
        'whatsapp' => 771617400,
        'appid' => $_ENV['APP_ID'],
        'webLink' => 'http://localhost:3000',
        'serverLink' => 'http://localhost/app/trdv-lms/server/',
        'imagepath' => 'http://localhost/app/trdv-lms/image',
        'taprodevauth' => 'http://localhost/app/trdv-lms/taprodev-auth',
        'operationsemail' => 'taprodev@gmail.com',
    ],
    'development' => [
        'database' => [
            'host' => $_ENV['DEV_DB_HOST'],
            'username' => $_ENV['DEV_DB_USERNAME'],
            'password' => $_ENV['DEV_DB_PASSWORD'],
            'dbname' => $_ENV['DEV_DB_DBNAME'],
        ],
        'emailServerUserName' => $_ENV['DEV_EMAIL_SERVER_USERNAME'],
        'emailServerPassword' => $_ENV['DEV_EMAIL_SERVER_PASSWORD'],
        'emailServerPort' => $_ENV['DEV_EMAIL_SERVER_PORT'],
        'whatsapp' => 771617401,
        'appid' => $_ENV['APP_ID'],
        'webLink' => 'https://qa.taprodevpos.com',
        'serverLink' => 'https://qa.taprodevpos.com/server',
        'imagepath' => 'https://qa.taprodevpos.com/image',
        'taprodevauth' => 'http://taprodevauth.taprodevpos.com',
        'operationsemail' => 'taprodev@gmail.com',
    ],
    'production' => [
        'database' => [
            'host' => $_ENV['PROD_DB_HOST'],
            'username' => $_ENV['PROD_DB_USERNAME'],
            'password' => $_ENV['PROD_DB_PASSWORD'],
            'dbname' => $_ENV['PROD_DB_DBNAME'],
        ],
        'emailServerUserName' => $_ENV['PROD_EMAIL_SERVER_USERNAME'],
        'emailServerPassword' => $_ENV['PROD_EMAIL_SERVER_PASSWORD'],
        'emailServerPort' => $_ENV['PROD_EMAIL_SERVER_PORT'],
        'whatsapp' => 771617402,
        'appid' => $_ENV['APP_ID'],
        'webLink' => 'hhttps://www.de.taprodevpos.com',
        'serverLink' => 'https://www.de.taprodevpos.com/server',
        'imagepath' => 'https://www.de.taprodevpos.com/image',
        'taprodevauth' => 'http://taprodevauth.taprodevpos.com',
        'operationsemail' => 'taprodev@gmail.com',
    ],
];

// Return the configuration for the current environment
return $config[$env];
?>