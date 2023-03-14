<?php
@session_start();
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

$company_email = 'hello@rbkavin.studio';
$company_bcc = 'varshachauhan717@gmail.com';
$company_name = 'RBKavin Studio';
$mail_body = "";
$ip1=$_SERVER['REMOTE_ADDR'];
$ipdat1 = @json_decode(file_get_contents("http://www.geoplugin.net/json.gp?ip=" . $ip1));
if (isset($_POST)) {
    $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //Server settings
    $mail->SMTPDebug = 2;                                 // Enable verbose debug output
    $mail->setFrom('hello@rbkavin.studio','RB-Kavin Studio');
    $mail->addAddress($company_email);               // Name is optional
    $mail->addBCC($company_bcc);
    $mail->AddReplyTo($_POST['email'], $_POST['name']);
    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Work Enquiry - RB Kavin Website';
    $mail_body .= "<br><b>Name:</b> ". $_POST['name']."<br><br><b>Email:</b> ".$_POST['email']."<br><br><b>Phone No:</b> ".$_POST['mobile']."<br><br><b>Comapny Name:</b> ".$_POST['company']."<br><br><b>Designation:</b> ".$_POST['designation']."<br><br><b>Country:</b> ".$_POST['country']."<br><br><b>City:</b> ".$_POST['city']."<br><br><b>Interestedin:</b> 
                ".$_POST['interestedin']."<br><br><b>Approxbudget:</b> ".$_POST['approxbudget']."<br><br><b>Message:</b>
                <br>".nl2br($_POST['message'])."<p>---------------------</p><br><p><b>IP Address:</b> $ip1<br><b>City:</b> $ipdat1->geoplugin_city<br><b>State:</b> $ipdat1->geoplugin_region<br> <b>Country:</b>$ipdat1->geoplugin_countryName</p></p>";
    $mail->Body  =  $mail_body;
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    $mail->send();
    $mail->clearAllRecipients();
    echo 'Email Sent Successfully';



} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}
}
else{
    header("Location:index.php");
}
 ?>