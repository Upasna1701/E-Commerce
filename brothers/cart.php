<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    include('init.php');

    if($_SERVER['REQUEST_METHOD']=='POST')
    {
        $getdata = json_decode(file_get_contents("php://input"));
        //Add to cart

        if($getdata->addprtocart == 'yes')
        {       
            //add to cart

            $productname = $getdata->productname;
            $productid = $getdata->productid;
            $userid = $getdata->userid;
            $useremail = $getdata->useremail;
            $usersize = $getdata->prsize;

            $cartitems=find('first','cart','*',"where product_id='$productid' AND user_id='$userid' AND product_size='$usersize'",array());
            if($cartitems){
                $savecart="Item already Added";
            }
            else{
                $fields= "product_id,user_id,user_email,Product,product_size";
                $values= ":product_id,:user_id,:user_email,:Product,:product_size";
                $exe= array(":product_id"=>$productid,":user_id"=>$userid,":user_email"=>$useremail,":Product"=>$productname,":product_size"=>$usersize);
                $savecart= save('cart', $fields, $values, $exe);
            }

            //remove from wishlist

            $productid= stripcleantohtml($productid);
            $userid= stripcleantohtml($userid);

            $where_clause = " where product_id='$productid' AND user_id = '$userid'";
            $execute= array();
            $delete= delete("wishlist", $where_clause, $execute);
        }

        //find cart details
        if($getdata->fetchcartlist == 'yes')
        {
            $userid = $getdata->user_id;

            $producttable="cart inner join product on cart.product_id=product.product_id inner join product_for on product.product_for_id=product_for.id inner join sub_category on product.subcategory_id=sub_category.subcategory_id";
            $productcartlist = find('all',$producttable,'*','where cart.user_id = "'.$userid.'" ',array());
            
            
            $productcartarr= array();
            $pricetotal=0;
            $offerpricetotal=0;
            $discountprice=0;
            
            foreach($productcartlist  as $kk=>$vv)
            {
                $wpnm = $vv["Product"];
                $pid= $vv["product_id"];
                $cartid= $vv["cart_id"];
                $product_quantity= $vv["product_quantity"];
                $cartprosize = $vv['product_size'];
                $cat=$vv["category"];
                $subcat=$vv["product_name"];
                $prname= str_replace(" ","-",$vv["Product"]);
                $fullproname = $cat."-".$subcat."-".$prname;
                
                $findaddress=find("all","order_details","*",'where user_id = "'.$userid.'" ',array());
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
                            "cartprosize"=>$cartprosize,
                            "sizename"=>$sizename['product_size'],
                            "sizequantity"=>$sizename['quantity'],
                            "product_quantity"=>$product_quantity,
                        );
                array_push($productcartarr,$cartpr );
            }
        }

        //Remove from cart
        if($getdata->removefromcart == 'yes')
        {       
            $cartid = $getdata->cartid;
            $userid = $getdata->userid;

            $cartid= stripcleantohtml($cartid);
            $userid= stripcleantohtml($userid);

            $where_clause = " where cart_id='$cartid' AND user_id = '$userid'";
            $execute= array();
            $delete= delete("cart", $where_clause, $execute);
        }

        //edit cart quantity
        if($getdata->editquantity=='yes')
        {
            $cartid = $getdata->cartid;
            $quantity=$getdata->newquantity;
            $userid = $getdata->user_id;

            $quantity = stripcleantohtml($quantity);

            $set_value = "product_quantity=:product_quantity";
            $where_clause = " where cart_id = '$cartid' ";
            $execute= array(":product_quantity"=>$quantity);
            $updatecartquantity = update("cart", $set_value, $where_clause, $execute);
        }
        //itemcount cart
        if($getdata->checkcartdata=="yes"){
            $userid = $getdata->userid;

            $getcartcount=find("first","cart","count(product_quantity) as total_quantity",'where user_id = "'.$userid.'"',array());
        }

        //find address details


    }
    $result = array("status"=>'ok',
                    "productcartarr"=>$productcartarr,
                    "pricetotal"=> $pricetotal,
                    "offerpricetotal"=> $offerpricetotal,
                    "savecart"=>$savecart,
                    "updatecartquantity"=>$updatecartquantity,
                    "getcartcount"=>$getcartcount["total_quantity"],
                    "findaddress"=>$findaddress,
                    // "sizequantity"=>$sizequan['quantity'],
                );
    echo json_encode($result);
?>