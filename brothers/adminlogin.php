<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include('init.php');
if ($_SERVER['REQUEST_METHOD']=='POST'){
    $checkdata = json_decode(file_get_contents("php://input"));
    $email =$checkdata ->email;
    $password =$checkdata ->password;

    $findemail = find('first','adminlogin', '*', 'where email= "'.$email.'" AND password= "'.$password.'"', array());
        if($findemail){
            $res ='success';
            $adminid = $findemail['Id'];
        }
        else{
            $res ='Invalid email or password';
        }
    }
    $result = array("status"=>$res,"adminid"=>$adminid);
echo json_encode($result);
?>