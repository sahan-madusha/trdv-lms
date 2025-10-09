<?php

function generateUsetKeyId($role, $apId)
{
    $roleCode = strtoupper(preg_replace('/[^A-Z]/', '', $role));

    $roleMap = [
        'admin' => 'ADM',
        'none' => 'NON'
    ];

    $roleCode = $roleMap[$role] ?? strtoupper(substr($role, 0, 3));
    $uniqueDigits = str_pad(mt_rand(0, 9999), 4, '0', STR_PAD_LEFT);

    return "{$roleCode}{$apId}{$uniqueDigits}";
}

function validateRequiredFields($inputsData, $required_fields)
{
    $allFieldsPresent = true;
    $msg = '';

    foreach ($required_fields as $field) {
        if (!array_key_exists($field, $inputsData) || ($inputsData[$field] === null || $inputsData[$field] === '')) {
            $msg = "Missing required field" . $field;
            $allFieldsPresent = false;
            break;
        }
    }

    return [
        'msg' => $msg,
        'allFieldsPresent' => $allFieldsPresent
    ];
}


?>