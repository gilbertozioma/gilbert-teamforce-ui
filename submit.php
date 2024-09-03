<?php




/*
| ------------------------------- ATTENTION ⚠ --------------------------------------- 
| 
| FORM HANDLING: Initially considered PHP, but its local server configuration 
| requirements could make the project difficult to run for others. 
| Opted for JavaScript's Emailjs for a simpler, more accessible setup.
|
| Any message submitted to the form will be sent to my email address.
| I will respond to the message via the email address provided in the form
| for confirmation purposes.
| ------------------------------------------------------------------------------------- 
*/




use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullName = htmlspecialchars(trim($_POST['full-name']));
    $email = filter_var(trim($_POST['nemail']), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($_POST['phone']));
    $message = htmlspecialchars(trim($_POST['message']));

    $mail = new PHPMailer(true);

    try {
        //Server settings
        // $mail->SMTPDebug = 2;
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'please-put-your-email-here';
        $mail->Password = 'please-put-your-password-here';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        //Recipients
        $mail->setFrom($email, $fullName);
        $mail->addAddress('plese-put-your-recipient-email-here');

        //Content
        $mail->isHTML(true);
        $mail->Subject = 'New Contact Form Submission';
        $mail->Body = "
            <html>
            <head>
                <title>New Contact Form Submission</title>
            </head>
            <body>
                <p>$message</p>
                <br>
                <p><strong>Contact Details:</strong></p>
                <p>$fullName</p>
                <p>$email</p>
                <p>$phone</p>
                <br>
            </body>
            </html>
        ";
        

        $mail->send();
        header("Location: thank-you.html");
        exit();
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        header("Location: message-not-sent.html");
    }
} else {
    echo "Invalid request method.";
}


