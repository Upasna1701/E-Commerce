<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    include('../init.php');

    if($_SERVER['REQUEST_METHOD']=='POST')
    {
        $getdata = json_decode(file_get_contents("php://input"));
        if($getdata->getuserorderdetails=="yes"){

            $table="confirmed_order inner join product on confirmed_order.product_id=product.product_id inner join order_details on confirmed_order.order_id=order_details.order_id";
            $findorderdata=find('all',$table,"*,confirmed_order.created_date as ddmmyyyy","where 1",array());

            foreach($findorderdata as $k=>$v){
                $ddmmyyyy = date("d-m-Y",strtotime($v['ddmmyyyy']));
                $temparr = array('ddmmyyyy'=>$ddmmyyyy);
                $findorderdata[$k] = array_merge($findorderdata[$k],$temparr);
            }
        }
    }
    $result = array("status"=>'ok',
                    "findorderdata"=>$findorderdata,
                );
    echo json_encode($result);
?>