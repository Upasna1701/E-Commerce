<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include('init.php');


if($_SERVER["REQUEST_METHOD"]== "POST")
{
    $getdata = json_decode(file_get_contents("php://input"));
    $name =$getdata ->name;
    $mobile =$getdata ->mobile;
    $email =$getdata ->email;
    $password =$getdata ->password;

    $fields= "name,mobile,email,password";
    $values= ":name,:mobile,:email,:password";
    $exe= array(":name"=>$name,":mobile"=>$mobile,":email"=>$email,":password"=>$password);
    $save= save('login', $fields, $values, $exe);
}
$res = $save;
echo json_encode($res);
?>