<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    include('init.php');

    function checknumber()
    {
        $rn = rand(100000,999999);
        $findrandomnumber = find('first','confirmed_order','*','where order_number = "'.$rn.'" ',array());
        if($findrandomnumber)
        {
            checknumber();
        }
        else
        {
            return $rn;
        }

    }

    if($_SERVER['REQUEST_METHOD']=='POST')
    {
        $getdata = json_decode(file_get_contents("php://input"));

        if($getdata->fetchorderlist == 'yes')
        {
            $userid = $getdata->user_id;
            $producttable="cart inner join product on cart.product_id=product.product_id inner join product_for on product.product_for_id=product_for.id inner join sub_category on product.subcategory_id=sub_category.subcategory_id";
            $productcartlist = find('all',$producttable,'*','where cart.user_id = "'.$userid.'" ',array());
            $productcartlist = find('all','cart','*','where user_id = "'.$userid.'" ',array());           
            $pids = array();
            $sizes = array();
            $prcartid = array();
            $proidnsize = array();

            $productcartarr= array();
            $pricetotal=0;
            $offerpricetotal=0;
            $discountprice=0;
            
            foreach($productcartlist  as $kk=>$vv)
            {
                $wpnm = $vv["Product"];
                $pid= $vv["product_id"];
                array_push($pids,$pid);
                $cartprosize = $vv['product_size'];
                array_push($sizes,$cartprosize);
                $cartid= $vv["cart_id"];
                array_push($prcartid,$cartid);
                $cat=$vv["category"];
                $subcat=$vv["product_name"];
                $prname= str_replace(" ","-",$vv["Product"]);
                $fullproname = $cat."-".$subcat."-".$prname;

                $product_quantity= $vv["product_quantity"];
                $findusername = find('first','login','*','where Id = "'.$userid.'"',array());
                $findaddress=find("first","order_details","*",'where user_id = "'.$userid.'"  AND last_used_address="1" ',array());
                $productcartid = find('first','cart','*','where user_id = "'.$userid.'" ',array());
                $procartdetailsarr = find('all','product_meta','*',"where product_id=$pid",array());
                $productimage = find('first','product_image','image_name',"where product_id=$pid",array());
                $sizearrcart = find('all','sizetable','*','where product_id= "'.$pid.'"',array());
                $sizename = find('first','sizetable','*','where size_id = "'.$cartprosize.'"',array());
                
                $proimgcart = "http://localhost/E-Commerce/brothers/Uploads/product_image/".$productimage['image_name'];
                $cartarr=array();
                $discounnts = 0;
                $proprice = 0;
                $calculateoffer = 0;
                foreach($procartdetailsarr as $k=>$g)
                {
                    $wishicecream= array($g["meta_key"]=>$g["meta_value"]);
                    if($g['meta_key'] == 'Size'){
                        $sizearr = explode(",",$g["meta_value"]);
                        $sa = array("sizea"=>$sizearr);
                        $wishicecream = array_merge($wishicecream,$sa);
                    }
                    $cartarr= array_merge($cartarr,$wishicecream);

                    if($g['meta_key'] == 'Price'){
                        $proprice = $g["meta_value"] * $product_quantity;
                        $pricetotal = $pricetotal + $proprice;
                    }
                    if($g['meta_key'] == 'Discount'){
                        $discounnts = $g["meta_value"];
                        $calculateoffer = $proprice * ( $discounnts / 100 );
                        $offerpricetotal = $offerpricetotal + $calculateoffer;
                    }
                    $tempofferarr = array("totalprice"=>$proprice,"offerprice"=>$calculateoffer,"pathname"=>$fullproname);
                    $cartarr= array_merge($cartarr,$tempofferarr);
                    
                }
                $procartdetails = $cartarr;
                $cartpr= array(
                            "pid"=>$pid , 
                            "Product"=>$wpnm, 
                            "cart_id"=>$cartid ,
                            "productcartdetails"=>$procartdetails,
                            "proimgcart"=>$proimgcart,
                            "sizearrcart"=>$sizearrcart,
                            "cartprosize"=>$cartprosize,
                            "sizename"=>$sizename['product_size'],
                            "product_quantity"=>$product_quantity,
                        );
                array_push($productcartarr,$cartpr );
            }
        }

        if($getdata->confirmuserorder == 'yes')
        {
            $userid = $getdata->user_id;
            $order_id = $getdata->order_id;
            $pid = $getdata->pid;
            $sizes = $getdata->sizes;
            $paymethod = $getdata->paymethod;
            $prcartid = $getdata->prcartid;
            $prquan = $getdata->product_quantity;

            $checkrandnumber = checknumber();


            $fields= "order_number,order_id,user_id,product_id,Paymentmethod,product_size,product_price,product_discount,product_quantity";
            $values= ":order_number,:order_id,:user_id,:product_id,:Paymentmethod,:product_size,:product_price,:product_discount,:product_quantity";
            foreach($pid as $k=>$v){
                $findprice=find('all','product_meta',"*","where product_id=$v",array());
                $proprice=0;
                $discounnts=0;
                $calculateoffer=0;
                $offerpricetotal=0;
                foreach($findprice as $key=>$val){
                    if($val['meta_key'] == 'Price'){
                        $proprice = $val["meta_value"];
                    }

                    if($val['meta_key'] == 'Discount'){
                        $discounnts = $val["meta_value"];
                        $calculateoffer = $proprice * ( $discounnts / 100 );
                        $offerpricetotal = $offerpricetotal + $calculateoffer;
                    }
                }
                $exe= array(":order_number"=>$checkrandnumber,":order_id"=>$order_id,":user_id"=>$userid,":product_id"=>$v,":Paymentmethod"=>$paymethod,":product_size"=>$sizes[$k],":product_price"=>$proprice,":product_discount"=>$offerpricetotal,":product_quantity"=>$prquan);
                $save= save('confirmed_order', $fields, $values, $exe);

                
                if($save > 0){
                    $where_clause = " where cart_id='$prcartid[$k]'";
                    $execute= array();
                    $delete= delete("cart", $where_clause, $execute);
                    
                    
                    //update size quantity
                    $findnewquantity = find('first',"sizetable",'*',"where size_id = '".$sizes[$k]."'",array());
                    $newquantity = $findnewquantity['quantity'] - $prquan;


                    $set_value = "quantity=:quantity ";
                    $where_clause = " where size_id = '".$sizes[$k]."' ";
                    $execute= array(":quantity"=>$newquantity);
                    $updatesubcat = update("sizetable", $set_value, $where_clause, $execute); 
                }
            }
        }

        if($getdata->fetchuserorder == 'yes')
        {
            $userid = $getdata->user_id;
            $table = "confirmed_order inner join product on product.product_id=confirmed_order.product_id inner join product_for on product.product_for_id=product_for.id inner join sub_category on product.subcategory_id=sub_category.subcategory_id inner join product_image on product_image.product_id=product.product_id inner join sizetable on confirmed_order.product_size=sizetable.size_id ";
            $finduserorder = find('all', $table ,'*,confirmed_order.created_date as ddmmyyyy','where confirmed_order.user_id = "'.$userid.'" GROUP BY product_image.product_id',array());
            $findpickupaddress=find("all","order_details","*",'where user_id = "'.$userid.'"',array());
            
            foreach($finduserorder as $kk=>$vv){             
                $imgurl = "http://localhost/E-Commerce/brothers/Uploads/product_image/".$vv['image_name'];
                $ddmmyyyy = date("d-m-Y",strtotime($vv['ddmmyyyy']));
                $delivery = date("d-m-Y",strtotime("+7 day",strtotime($vv['ddmmyyyy'])));
                $pnm = $vv["pro_name"];
                $pid= $vv["product_id"];
                $cat=$vv["category"];
                $subcat=$vv["product_name"];
                $prname= str_replace(" ","-",$vv["pro_name"]);
                $fullproname = $cat."-".$subcat."-".$prname;
                $temparr = array("imgurl"=>$imgurl,'ddmmyyyy'=>$ddmmyyyy,"delivery"=>$delivery,"pathname"=>$fullproname);
                $finduserorder[$kk] = array_merge($finduserorder[$kk],$temparr);
                
                $sizewisharr = find('all','sizetable','*','where product_id= "'.$pid.'"',array());
                $temparr1 = array("sizeforexchange"=>$sizewisharr);
                $finduserorder[$kk] = array_merge($finduserorder[$kk],$temparr1);
                
            }
        }
        
        if($getdata->findconfirm=="yes"){
            $cid = $getdata->confirmid;
            $userid = $getdata->user_id;
            
            $table1 = "confirmed_order inner join product on product.product_id=confirmed_order.product_id inner join product_for on product.product_for_id=product_for.id inner join sub_category on product.subcategory_id=sub_category.subcategory_id inner join sizetable on confirmed_order.product_size=sizetable.size_id inner join product_image on product_image.product_id=product.product_id";
            $findorderdata=find("first",$table1,"*,confirmed_order.created_date as ddmmyyyy,confirmed_order.product_id as conproid","where confirmed_order.confirmed_id=$cid GROUP BY product_image.product_id",array());
            $findaddress=find("first","order_details","*",'where user_id = "'.$userid.'"',array());
            $findconusername = find('first','login','*','where Id = "'.$userid.'"',array());
            $findconmeta=find('all','product_meta','*','where product_id= "'.$findorderdata["conproid"].'"',array());
            
            
            $ddmmyyyy = date("d-m-Y",strtotime($findorderdata['ddmmyyyy']));
            $delivery = date("d-m-Y",strtotime("+7 day",strtotime($findorderdata['ddmmyyyy'])));
            $imgurl = "http://localhost/E-Commerce/brothers/Uploads/product_image/".$findorderdata['image_name'];

            $pnm = $findorderdata["pro_name"];
            $pid= $findorderdata["product_id"];
            
            $cat=$findorderdata["category"];
            $subcat=$findorderdata["product_name"];
            $prname= str_replace(" ","-",$findorderdata["pro_name"]);
            $fullproname = $cat."-".$subcat."-".$prname;
           
            $temparr = array('ddmmyyyy'=>$ddmmyyyy,"delivery"=>$delivery,"imgurl"=>$imgurl,"findconmeta"=>$findconmeta,"pathname"=>$fullproname);

            $findorderdata = array_merge($findorderdata,$temparr);
        }


        if($getdata->cancelorderbtn=="yes"){
            $cid = $getdata->confid;
            $creason = $getdata->creason;

            $set_value = "product_status=:product_status,cancel_reason=:cancel_reason";
            $where_clause = " where confirmed_id = $cid ";
            $execute= array(":product_status"=>"C",":cancel_reason"=>$creason);
            $updatesubcat = update("confirmed_order", $set_value, $where_clause, $execute); 
        }

        if($getdata->returnorderbtn=="yes"){
            $cid = $getdata->confid;
            $retreason = $getdata->retreason;
            $userid = $getdata->userid;
            $oid = $getdata->orderid;
            $pid = $getdata->productid;

            $fields= "user_id,order_id,confirm_id,product_id";
            $values= ":user_id,:order_id,:confirm_id,:product_id";
            $exe= array(":user_id"=>$userid,":order_id"=>$oid,":confirm_id"=>$cid,":product_id"=>$pid);
            $save = save('return_details', $fields, $values, $exe);

            
            if($save){
                $findreturn=find('first','return_details','*','where order_id = "'.$oid.'"',array());
                $rid = $findreturn["return_id"];

                $set_value = "product_status=:product_status,return_reason=:return_reason,return_id=:return_id";
                $where_clause = " where confirmed_id = $cid ";
                $execute= array(":product_status"=>"R",":return_reason"=>$retreason,":return_id"=>$rid);
                $updatesubcat = update("confirmed_order", $set_value, $where_clause, $execute); 
            }
        }


        if($getdata->addneworderdetails == 'yes')
        {   
            $oid = $getdata->oid;
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
            $cid= $getdata->cid;
            
            $fields= "user_id,user_email,fullname,mob_number,pincode,city,state,address,area,landmark";
            $values= ":user_id,:user_email,:fullname,:mob_number,:pincode,:city,:state,:address,:area,:landmark";
            $exe= array(":user_id"=>$userid,":user_email"=>$useremail,":fullname"=>$fullname,":mob_number"=>$mobnumber,":pincode"=>$pincode,":city"=>$city,":state"=>$state,":address"=>$address,":area"=>$area,":landmark"=>$landmark);
            $saveodrid = save('order_details', $fields, $values, $exe);

            

            if($saveodrid){
                $set_value = "order_id=:order_id";
                $where_clause = " where confirmed_id = $cid ";
                $execute= array(":order_id"=>$saveodrid);
                $updatesubcat = update("confirmed_order", $set_value, $where_clause, $execute);
                if($updatesubcat){
                    $returntable="return_details inner join order_details on return_details.order_id=order_details.order_id inner join confirmed_order on confirmed_order.return_id = return_details.return_id";
                    $findreturnaddress=find("all","order_details","*",'where user_id = "'.$userid.'"',array());
                }
            }
        }

        if($getdata->addnewsize=="yes"){
            $userid = $getdata->userid;
            $pid= $getdata->productid;
            $newsize= $getdata->prsize;
            $cid= $getdata->cid;
            $oid = $getdata->oid;
            $oldsize = $getdata->oldsize;

            $findnewsizeid=find('first',"sizetable",'*','where size_id = "'.$newsize.'" AND product_id = "'.$pid.'"',array());
            $ns=$findnewsizeid["product_size"];

            $fields= "user_id,confirm_id,product_id,newproductsize_id,order_id,oldproductsize";
            $values= ":user_id,:confirm_id,:product_id,:newproductsize_id,:order_id,:oldproductsize";
            $exe= array(":user_id"=>$userid,":confirm_id"=>$cid,":product_id"=>$pid,":newproductsize_id"=>$ns,":order_id"=>$oid,":oldproductsize"=>$oldsize);
            $save = save('exchange_details', $fields, $values, $exe);


            if($save){
                $set_value = "product_status=:product_status";
                $where_clause = " where confirmed_id = $cid ";
                $execute= array(":product_status"=>"E");
                $updatesubcat = update("confirmed_order", $set_value, $where_clause, $execute); 
            }
        }
    }
    $result = array("status"=>'ok',
                    "productcartarr"=>$productcartarr,
                    "productcartid"=>$productcartid,
                    "pricetotal"=> $pricetotal,
                    "offerpricetotal"=> $offerpricetotal,
                    "findaddress"=>$findaddress,
                    "findconfirmusername"=>explode(" ",$findconusername['name'])[0]." ".explode(" ",$findconusername['name'])[2],
                    "findusername"=>$findusername['name'],
                    "pids"=>$pids,
                    "sizes"=>$sizes,
                    "prcartid"=>$prcartid,
                    "productuserorderarr"=>$finduserorder,
                    "findconorder"=>$findorderdata,
                    "findpickupaddress"=>$findpickupaddress,
                    "findreturnaddress"=>$findreturnaddress,
                    "sizewisharr"=>$sizewisharr
                );
    echo json_encode($result);
?>