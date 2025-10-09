<?php
require '../../connection.php';
require '../../lib/types.php';

$isDataSet = false;
$userData = [];
$employeeData = [];
$app_features = [];
$isAuthDone = false;
$userRole = UserRole::NONE;
$msg = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST["inputs"])) {

    //req
    $inputsData = json_decode($_POST["inputs"], true);

    if ($inputsData !== null) {
        $isDataSet = true;
        $username = $inputsData["username"];
        $password = $inputsData["password"];

        $user_search_sql = "SELECT * , `user`.`id` AS `uid` FROM `user` WHERE `username` = '" . $username . "' AND `is_active` = '1' ";
        $user_search_executed = Database::executeQuery($user_search_sql);

        if ($user_search_executed["rowCount"] == 1) {

            $user_search_data = $user_search_executed["data"];

            if ($user_search_data["password"] === $password) {

                $userRole = Database::executeQuery("SELECT * FROM `user_role` WHERE `id` = '" . $user_search_data["user_role_id"] . "' ")["data"]['role'];
                $app_feature_category = Database::executeQuery("SELECT * FROM `app_feature_category`")["data"];
                $allowed_features = [];

                if (
                    $userRole == UserRole::ADMIN
                ) {
                    $employeeData_execute = Database::executeQuery("SELECT * FROM head_office_employee WHERE `user_key_id`='" . $user_search_data['user_key_id'] . "' AND `is_active` = 1 ");
                }

                if ($employeeData_execute['rowCount'] == 1) {
                    $employeeData = $employeeData_execute['data'];
                    $msg = "Login successfull";
                    $isAuthDone = true;

                    $userData = [
                        "userId" => $user_search_data["uid"],
                        "user_key_id" => $user_search_data["user_key_id"],
                        "username" => $user_search_data["username"],
                        "userRole" => $userRole,
                        "email" => $employeeData["email"]
                    ];
                } else {
                    $userData = [];
                    $msg = "Invalied user name or password!";
                }

                foreach ($app_feature_category as $cdata) {
                    $features = [];

                    $user_permission_data = Database::executeQuery("SELECT *  FROM `user_allowed_feature` WHERE `user_id` = '" . $user_search_data["uid"] . "'")["data"];
                    foreach ($user_permission_data as $fdata) {

                        $allowed_feature = Database::executeQuery("SELECT * , app_feature.id AS `fid` FROM `app_feature_category`
                                            INNER JOIN app_feature ON 
                                            app_feature.app_feature_category_id = app_feature_category.id
                                            WHERE app_feature_category.`id` = '" . $cdata["id"] . "' AND app_feature.`id` = '" . $fdata["app_feature_id"] . "' ");

                        if ($allowed_feature["rowCount"] == 1) {
                            $allowed_feature_data = $allowed_feature["data"];
                            $features[] = [
                                'label' => $allowed_feature_data['feature'],
                                'id' => $allowed_feature_data['fid'],
                                'is_locked' => $allowed_feature_data['is_locked'],
                                'navigation' => $allowed_feature_data['navigation'],
                                'icon' => $allowed_feature_data['icon'],
                                'is_show_navigation' => $allowed_feature_data['is_show_navigation']
                            ];
                        }

                    }

                    if (!empty($features)) {
                        $allowed_features[] = [
                            'category' => [
                                'name' => $cdata['name'],
                                'icon' => $cdata['icon']
                            ],
                            'features' => $features,
                        ];

                    }


                }

            } else {
                $msg = "Invalied user name or password!";
            }

        } else {
            $msg = "Invalied user name or password!";
        }
    } else {
        $msg = "Invalied user name or password!";
    }
} else {
    $msg = "Invalied user request!";
}


$data = [
    "isDataSet" => $isDataSet,
    "userData" => $userData,
    "userPermission" => $allowed_features,
    "isAuthDone" => $isAuthDone,
    "msg" => $msg
];

echo json_encode($data);


?>