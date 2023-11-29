<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    include('init.php');

    if($_SERVER['REQUEST_METHOD']=='POST')
    {
        $getdata = json_decode(file_get_contents("php://input"));

        //Add to wishlist

        if($getdata->addwishlist == 'yes')
        {       
            $productname = $getdata->productname;
            $productid = $getdata->productid;
            $userid = $getdata->userid;
            $useremail = $getdata->useremail;
            
            $fields= "product_id,user_id,user_email,Product";
            $values= ":product_id,:user_id,:user_email,:Product";
            $exe= array(":product_id"=>$productid,":user_id"=>$userid,":user_email"=>$useremail,":Product"=>$productname);
            $savewish= save('wishlist', $fields, $values, $exe);
        }

        //add to wishlist from cart
        if($getdata->addwishremovecart == 'yes')
        {       
            $productname = $getdata->productname;
            $productid = $getdata->productid;
            $userid = $getdata->userid;
            $useremail = $getdata->useremail;

            $wishitems=find('first','wishlist','*',"where product_id='$productid' AND user_id='$userid'",array());
            if($wishitems){
                $savewish="Item already in Wishlist";
            }
            else{
                $fields= "product_id,user_id,user_email,Product";
                $values= ":product_id,:user_id,:user_email,:Product";
                $exe= array(":product_id"=>$productid,":user_id"=>$userid,":user_email"=>$useremail,":Product"=>$productname);
                $save= save('wishlist', $fields, $values, $exe);
            }
        }

        //find wishlist
        if($getdata->fetchwishlist == 'yes')
        {
            $userid = $getdata->user_id;
            $producttable="wishlist inner join product on wishlist.product_id=product.product_id inner join product_for on product.product_for_id=product_for.id inner join sub_category on product.subcategory_id=sub_category.subcategory_id";
            $productwishlist = find('all',$producttable,'*','where wishlist.user_id = "'.$userid.'" ',array());
            $productwisharr= array();

            foreach($productwishlist  as $kk=>$vv)
            {
                $wpnm = $vv["Product"];
                $pid= $vv["product_id"];
                $wishlistid= $vv["wishlist_id"];
            
                $cat=$vv["category"];
                $subcat=$vv["product_name"];
                $prname= str_replace(" ","-",$vv["Product"]);
                $fullproname = $cat."-".$subcat."-".$prname;

                $prowishdetailsarr = find('all','product_meta','*',"where product_id=$pid",array());
                $productimage = find('first','product_image','image_name',"where product_id=$pid",array());
                $proimgwish = "http://localhost/E-Commerce/brothers/Uploads/product_image/".$productimage['image_name'];
                
                
                $wisharr=array();
                $sizewisharr = find('all','sizetable','*','where product_id= "'.$pid.'"',array());
                
                foreach($prowishdetailsarr as $k=>$g)
                {
                    $wishicecream= array($g["meta_key"]=>$g["meta_value"]);
                        $wisharr= array_merge($wisharr,$wishicecream);
                    }
                    $prowishdetails = $wisharr;
                    $wishpr = array("pid"=>$pid , "Product"=>$wpnm, "wishlist_id"=>$wishlistid ,"proimgwish"=>$proimgwish, "productwishdetails"=>$prowishdetails,"sizewisharr"=>$sizewisharr,"pathname"=>$fullproname);
                array_push($productwisharr,$wishpr );
            }
        }


        //Remove from wishlist
        if($getdata->removewishlist == 'yes')
        {       
            $wishlistid = $getdata->wishlistid;
            $userid = $getdata->userid;

            $wishlistid= stripcleantohtml($wishlistid);
            $userid= stripcleantohtml($userid);

            $where_clause = " where wishlist_id='$wishlistid' AND user_id = '$userid'";
            $execute= array();
            $delete= delete("wishlist", $where_clause, $execute);
        }

        //Remove from wishlist mensclothing iconclick
        if($getdata->removewishlistdata == 'yes')
        {       
                $prid = $getdata->productids;
                $userid = $getdata->userid;

                $prid= stripcleantohtml($prid);
                $userid= stripcleantohtml($userid);

                $where_clause = " where product_id='$prid' AND user_id = '$userid'";
                $execute= array();
                $delete= delete("wishlist", $where_clause, $execute);
        }

        //navbar wishlist icon

        if($getdata->checkwish == 'yes'){
            $userid = $getdata->userid;
            $wishmatchwishlist = find('first','wishlist','*','where user_id = "'.$userid.'"',array());
            if($wishmatchwishlist){
                $matcharr=array("wishlist"=>true);
            }
            else{
                $matcharr=array("wishlist"=>false);
            }
        }

    }


    $result = array("status"=>'ok',
                    "productwishname"=>$productwisharr,
                    "savewish"=>$savewish,
                    "wishmatchwishlist"=>$matcharr,
                );
    echo json_encode($result);
?>