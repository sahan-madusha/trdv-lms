<?php

function handleEmailQueue($isSendEmail, $emailId = null, $emailContent = "", $templateName = "", $user_id = 0)
{

    if ($emailId == null) {
        $emailContentJson = json_encode($emailContent, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        $sql = "INSERT INTO `triggerd_email` (
            `datetime`,
            `email_content`,
            `template_name`,
            `user_id`,
            `update_date`,
            `is_Send`
        ) VALUES (
            NOW(),
            '$emailContentJson',
            '$templateName',
            '$user_id',
            NOW(),
            '$isSendEmail'
        );";
    } else {
        $sql = "UPDATE `triggerd_email`
                SET
                    `update_date` = NOW(),
                    `is_Send` = $isSendEmail
                WHERE `id` = '$emailId';";
    }

    return Database::executeIUD($sql);

}

?>