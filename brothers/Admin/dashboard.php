<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    include('../init.php');

    if($_SERVER['REQUEST_METHOD']=='POST')
    {
        $getdata = json_decode(file_get_contents("php://input"));

        $getproductcount=find("first","product","count(product_id) as total_product","where 1",array());
        $getusercount=find("first","login","count(Id) as total_user","where 1",array());
        $getordercount=find("first","confirmed_order","count(confirmed_id) as total_order","where 1",array());

    }
    $result = array("status"=>'ok',
                    "getproductcount"=>$getproductcount["total_product"],
                    "getusercount"=>$getusercount["total_user"],
                    "getordercount"=>$getordercount["total_order"]
                );
    echo json_encode($result);
?>