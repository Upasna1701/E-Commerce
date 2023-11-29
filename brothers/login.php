<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include('init.php');
if ($_SERVER['REQUEST_METHOD']=='POST'){
    $checkdata = json_decode(file_get_contents("php://input"));
    $email =$checkdata ->email;
    $password =$checkdata ->password;

    $findemail = find('first','login', '*', 'where email= "'.$email.'" AND password= "'.$password.'"', array());
        if($findemail){
            $res ='success';
            $userid = $findemail['Id'];
            $useremail = $findemail['email'];
        }
        else{
            $res ='Invalid email or password';
        }
    }
    //find user
    $findlogin=find('all','login','*','where 1',array());

    //delete user

    //delete subcategory
    if($checkdata->deleteuserd=="yes"){
        $userid = $checkdata->userid;
        $userid= stripcleantohtml($userid);

        $where_clause = "where Id='$userid'";
        $execute= array();
        $delete= delete("login", $where_clause, $execute);
    }
// echo json_encode($res);
$result = array("status"=>$res,
"userid"=>$userid,
"useremail"=>$useremail,
"findlogin"=>$findlogin);
echo json_encode($result);
?>