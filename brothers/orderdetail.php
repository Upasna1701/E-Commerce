<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    include('init.php');

    if($_SERVER['REQUEST_METHOD']=='POST')
    {
        $getdata = json_decode(file_get_contents("php://input"));
        //save order detail

        if($getdata->addorderdetails == 'yes')
        {
            $userid = $getdata->userid;
            $useremail = $getdata->useremail;
            $fullname= $getdata->fullname;
            $mobnumber= $getdata->mobnumber;
            $pincode= $getdata->pincode;
            $city= $getdata->city;
            $state= $getdata->state;
            $address= $getdata->address;
            $area= $getdata->area;
            $landmark= $getdata->landmark;
            
            $fields= "user_id,user_email,fullname,mob_number,pincode,city,state,address,area,landmark";
            $values= ":user_id,:user_email,:fullname,:mob_number,:pincode,:city,:state,:address,:area,:landmark";
            $exe= array(":user_id"=>$userid,":user_email"=>$useremail,":fullname"=>$fullname,":mob_number"=>$mobnumber,":pincode"=>$pincode,":city"=>$city,":state"=>$state,":address"=>$address,":area"=>$area,":landmark"=>$landmark);
            $save= save('order_details', $fields, $values, $exe);
        }

        if($getdata->addaddress=='yes')
        {
            $userid = $getdata->userid;
            $findaddressdata=find('all','order_details','*','where user_id="'.$userid.'"',array());
            // $findlastaddress=find('first','confirmed_order','*','where user_id="'.$userid.'" order BY created_date desc',array());
            $findlastaddress=find('first','order_details','*','where user_id="'.$userid.'" and last_used_address = "1"',array());
        }

        if($getdata->editorderdetails=='yes'){

            $userid = $getdata->userid;
            $useremail = $getdata->useremail;
            $fullname= $getdata->fullname;
            $mobnumber= $getdata->mobnumber;
            $pincode= $getdata->pincode;
            $city= $getdata->city;
            $state= $getdata->state;
            $address= $getdata->address;
            $area= $getdata->area;
            $landmark= $getdata->landmark;
            $ordno= $getdata->ordno;
            
            $set_value= "user_id=:user_id,user_email=:user_email,fullname=:fullname,mob_number=:mob_number,pincode=:pincode,city=:city,state=:state,address=:address,area=:area,landmark=:landmark";
            $where_clause = " where order_id='$ordno' ";
            $execute= array(":user_id"=>$userid,":user_email"=>$useremail,":fullname"=>$fullname,":mob_number"=>$mobnumber,":pincode"=>$pincode,":city"=>$city,":state"=>$state,":address"=>$address,":area"=>$area,":landmark"=>$landmark);
            $updateaddress = update("order_details", $set_value, $where_clause, $execute);
        }

        if($getdata->updatecnfaddress=="yes"){
            $neworderaddress=$getdata->orderidadd;
            $prevaddoid = $getdata->prevaddoid;
            $set_value= "last_used_address=:last_used_address";

            $where_clause1 = "where order_id='".$prevaddoid."'";
            $execute1 = array(":last_used_address"=>"0");
            $updatecnfaddress1 = update("order_details", $set_value, $where_clause1, $execute1);
            if($updatecnfaddress1){
                $where_clause = " where order_id='".$neworderaddress."' AND last_used_address='0'";
                $execute= array(":last_used_address"=>"1");
                $updatecnfaddress = update("order_details", $set_value, $where_clause, $execute);
            }
        }

        if($getdata->deladdress=='yes'){
            $ordid = $getdata->orderiddel;

            $where_clause = " where order_id='$ordid'";
            $execute= array();
            $delete= delete("order_details", $where_clause, $execute);
        }
    }

    $result = array("status"=>'ok',
                    "findaddressdata"=>$findaddressdata,
                    "findlastaddress"=>$findlastaddress,
                );
    echo json_encode($result);

?>