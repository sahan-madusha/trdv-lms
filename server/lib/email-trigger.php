<?php
require_once dirname(__DIR__) . '/vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once dirname(__DIR__) . '/lib/email-queue-handle.php';
function sentEmail($emailContent, $templateName, $emailSecret, $user_id = 0, $emailId = null)
{
    $isSendEmail = false;

    try {
        $path = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'email-templates';
        $loader = new FilesystemLoader($path);
        $twig = new Environment($loader);

        $emailBody = $twig->render($templateName . '.html.twig', $emailContent);

        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $emailSecret['emailServerUserName'];
        $mail->Password = $emailSecret['emailServerPassword'];
        $mail->SMTPSecure = 'ssl';
        $mail->Port = (int) $emailSecret['emailServerPort'];
        $mail->isHTML(true);
        $mail->Subject = $emailContent['Subject'];

        $mail->setFrom($emailContent["agency_email"], $emailContent['Subject']);
        $mail->Body = $emailBody;

        foreach ($emailContent['toEmails'] as $email) {
            $mail->addAddress($email);
        }

        foreach ($emailContent['ccEmails'] as $cc) {
            $mail->addCC($cc);
        }

        if (!$mail->send()) {
            $isSendEmail = false;
            return false;
        } else {
            $isSendEmail = true;
            return true;
        }

    } catch (Exception $e) {
        $isSendEmail = false;
        return false;
    } finally {
        if ($emailId == null) {
            handleEmailQueue(
                isSendEmail: $isSendEmail ? 1 : 0,
                emailContent: $emailContent,
                templateName: $templateName,
                user_id: $user_id
            );
        } else {
            handleEmailQueue(
                isSendEmail: $isSendEmail ? 1 : 0,
                emailId: $emailId
            );
        }
    }
}
?>