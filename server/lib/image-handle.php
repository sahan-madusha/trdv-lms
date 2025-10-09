<?php
function uploadImages($fileInputName, $userId,$imagepath)
{
    $uploadedImages = array();

    if (!empty($fileInputName)) {
        $totalImages = count($fileInputName['name']);

        for ($i = 0; $i < $totalImages; $i++) {
            $tempFilePath = $fileInputName['tmp_name'][$i];
            $originalFileName = $fileInputName['name'][$i];
            $fileExtension = pathinfo($originalFileName, PATHINFO_EXTENSION);

            // Generate a unique filename for each image
            $newFileName = sprintf('uploaded_image_%05d_%s.%s', mt_rand(10000, 99999), $userId, $fileExtension);
            $targetFilePath = $imagepath."/upload/" . $newFileName;

            if (move_uploaded_file($tempFilePath, $targetFilePath)) {
                $uploadedImages[] = $newFileName;
            }
        }
    }

    return $uploadedImages;
}

?>