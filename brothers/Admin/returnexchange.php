<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    include('../init.php');

    if($_SERVER['REQUEST_METHOD']=='POST')
    {
        $getdata = json_decode(file_get_contents("php://input"));

        $getreturndata="return_details inner join confirmed_order on return_details.confirm_id=confirmed_order.confirmed_id inner join product on product.product_id=confirmed_order.product_id inner join sizetable on sizetable.size_id=confirmed_order.product_size";
        $getreturndetails=find("all",$getreturndata,"*","where 1",array());

        if($getdata->adminreturnstatus=="yes"){
            $stat = $getdata-> rdata;
            $cid = $getdata-> cid;
            $pid = $getdata-> pid;
            $psize = $getdata-> psize;
            $pquan = $getdata-> pquan;

            $set_value = "return_status=:return_status";
            $where_clause = " where confirm_id = $cid ";
            $execute= array(":return_status"=>$stat);
            $updatestat = update("return_details", $set_value, $where_clause, $execute); 
            
            if($updatestat){
                $findstat=find('first',"return_details","*",'where return_status="Y"',array());
                if($findstat){
                    $findquantity = find('first',"sizetable",'*','where product_size = "'.$psize.'"',array());
                    $newquantity = $findquantity['quantity'] + $pquan;

                    $qset_value = "quantity=:quantity ";
                    $qwhere_clause = 'where product_size = "'.$psize.'"';
                    $qexecute= array(":quantity"=>$newquantity);
                    $qupdatesubcat = update("sizetable", $qset_value, $qwhere_clause, $qexecute);
                }
            }
        }

        $getexchangedata="exchange_details inner join confirmed_order on exchange_details.confirm_id=confirmed_order.confirmed_id inner join product on product.product_id=confirmed_order.product_id inner join sizetable on sizetable.size_id=confirmed_order.product_size";
        $getexchangedetails=find("all",$getexchangedata,"*","where 1",array());

        if($getdata->adminexchangestatus=="yes"){
            $stat = $getdata-> rdata;
            $cid = $getdata-> cid;
            $pid = $getdata-> pid;
            $psize = $getdata-> psize;
            $pquan = $getdata-> pquan;
            $oldsize = $getdata-> oldsize;
            // print_r($psize);

            $set_value = "exchange_status=:exchange_status";
            $where_clause = " where confirm_id = $cid ";
            $execute= array(":exchange_status"=>$stat);
            $updatestat = update("exchange_details", $set_value, $where_clause, $execute); 
            
            if($updatestat){
                $findstat=find('first',"exchange_details","*",'where exchange_status="Y"',array());
                if($findstat){
                    $findnewquantity = find('first',"sizetable",'*','where product_size = "'.$psize.'"',array());
                    $newquantity = $findnewquantity['quantity'] - $pquan;
                    
                    $addset_value = "quantity=:quantity ";
                    $addwhere_clause = 'where product_size = "'.$psize.'"';
                    $addexecute= array(":quantity"=>$newquantity);
                    $addupdatesubcat = update("sizetable", $addset_value, $addwhere_clause, $addexecute);
                    
                    
                    $findoldquantity = find('first',"sizetable",'*','where product_size = "'.$oldsize.'"',array());
                    $oldquantity = $findoldquantity['quantity'] + $pquan;
                    
                    $removeset_value = "quantity=:quantity ";
                    $removewhere_clause = 'where product_size = "'.$oldsize.'"';
                    $removeexecute= array(":quantity"=>$oldquantity);
                    $removeupdatesubcat = update("sizetable", $removeset_value, $removewhere_clause, $removeexecute);
                }
            }
        }

    }
    $result = array("status"=>'ok',
                    "getreturndetails"=>$getreturndetails,
                    "getexchangedetails"=>$getexchangedetails
                );
    echo json_encode($result);
?>