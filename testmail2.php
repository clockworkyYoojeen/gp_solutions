<?php
ini_set( 'display_errors', 1 );
error_reporting( E_ALL );

// sleep(2);

$error = '';
$userEmail = filter_var($_POST['userEmail'], FILTER_SANITIZE_EMAIL);
if ($userEmail == false) { echo 'Wrong user email';
    exit;
}

$userMessage = filter_var(
    $_POST['userMessage'],
    FILTER_SANITIZE_STRING,
    FILTER_FLAG_STRIP_LOW|FILTER_FLAG_ENCODE_HIGH
);
if($userMessage == false){ echo 'Wrong user message';
    exit;
}

$userName = filter_var(
    $_POST['userName'],
    FILTER_SANITIZE_STRING,
    FILTER_FLAG_STRIP_LOW|FILTER_FLAG_ENCODE_HIGH
);
if($userName == false){ echo 'Wrong user name';
    exit;
}



$from = "jynbox@landings.sendtoeugeen.hosty.com";
$to = $userEmail;
$subject = "Message from website";
$message = 'Your message has been received. We will get in touch with you soon'; 
$headers = "From:" . $from;
if(mail($to,$subject,$message, $headers)) {
    echo "Thanks! Our manager will contact you";
} else {
    echo "Mail error";
}
exit();