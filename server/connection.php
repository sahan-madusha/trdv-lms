<?php

// Load configuration
$config = require('config.php');

$d = new DateTime();
$tz = new DateTimeZone("Asia/Colombo");
$d->setTimezone($tz);

$dateTime = $d->format("Y-m-d H:i:s");
$currentDate = $d->format("Y-m-d");
$currentMonth = date('F');
$currentYear = date("Y");
$currentMonthNumber = date('m');
$currentTime = date("H:i");

// Use configuration settings
$whatsapp = $config['whatsapp'];
$webLink = $config['webLink'];
$serverLink = $config['serverLink'];
$imagepath = $config['imagepath'];
$taprodevauth = $config['taprodevauth'];
$operationsemail = $config['operationsemail'];
$appid = $config['appid'];
$emailSecret = [
    'emailServerUserName' => $config['emailServerUserName'],
    'emailServerPassword' => $config['emailServerPassword'],
    'emailServerPort' => $config['emailServerPort']
];

// Set headers
header("Access-Control-Allow-Origin: $webLink");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

error_reporting(0);

class Database
{
    public static $connection;

    public static function setUpConnection()
    {
        if (!isset(Database::$connection)) {
            global $config;
            $dbConfig = $config['database'];
            Database::$connection = new mysqli($dbConfig['host'], $dbConfig['username'], $dbConfig['password'], $dbConfig['dbname']);
        }
    }

    public static function executeIUD($sql)
    {
        $response = [
            'success' => false,
            'insert_id' => null,
        ];

        Database::setUpConnection();
        $result = Database::$connection->query($sql);

        $response = [
            'success' => $result ? true : false,
            'insert_id' => Database::$connection->insert_id > 0 ? Database::$connection->insert_id : null,
        ];

        return $response;
    }

    public static function executeQuery($sql, $returnAsArray = false)
    /**
     * @param string $sql The SQL query to execute.
     * @param bool $returnAsArray Determines how to return the query result:
     *                             - If true, returns the result as an associative array.
     *                             - If false (default), returns the result as an object where each row can be accessed with properties (e.g., $row->name).
     * @return array The query result, with 'rowCount' indicating the number of rows returned, and 'data' containing the query result.
     */
    {
        Database::setUpConnection();
        $result = Database::$connection->query($sql);

        $response = [
            'rowCount' => 0,
            'data' => []
        ];

        $rows = [];

        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
        }

        $data = (count($rows) === 1)
            ? ($returnAsArray ? [$rows[0]] : $rows[0])
            : $rows;

        $response = [
            'rowCount' => count($rows),
            'data' => $data
        ];


        return $response;
    }

    public static function beginTransaction()
    {
        Database::setUpConnection();
        Database::$connection->begin_transaction();
    }

    public static function commit()
    {
        Database::setUpConnection();
        Database::$connection->commit();
    }

    public static function rollback()
    {
        Database::setUpConnection();
        Database::$connection->rollback();
    }


}
?>