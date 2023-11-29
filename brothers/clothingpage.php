<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    include('init.php');

    if($_SERVER['REQUEST_METHOD']=='POST')
    {
        $getdata = json_decode(file_get_contents("php://input"));

        if($getdata->matchclothlist == 'yes')
        { 
            $userid = $getdata->userid;
            $subcatid = $getdata->subcatid;
            $catid = $getdata->catid;

            $producttable="product inner join product_for on product.product_for_id=product_for.id inner join sub_category on product.subcategory_id=sub_category.subcategory_id";            
            $productname = find('all',$producttable,'*',"where product.product_for_id=$catid",array());             
            $productarr= array();
            $productcount = find('first','product','count(product_id) as total_product',"where product_for_id=$catid",array());             
            $subprfor="sub_category inner join product_for on product_for.id=sub_category.product_for_id";
            $prcatarrabc=find('all',$subprfor,'*',"where sub_category.product_for_id = $catid",array());
            
            foreach($productname  as $kkk=>$vvv)
            {               
                $pnm = $vvv["pro_name"];
                $pid= $vvv["product_id"];
                $cat=$vvv["category"];
                $subcat=$vvv["product_name"];
                $prname= str_replace(" ","-",$vvv["pro_name"]); 
                $fullproname = $cat."-".$subcat."-".$prname;

                $findsizearr=find('all','sizetable','*',"where product_id=$pid",array());
                $producttitlearr = find('first','product_for','*',"where id=$catid",array());
                $prodetailsarr = find('all','product_meta','*',"where product_id=$pid",array());
                $productmensclothingimage = find('first','product_image','image_name',"where product_id=$pid",array());
                $proimglink = "http://localhost/E-Commerce/brothers/Uploads/product_image/".$productmensclothingimage['image_name'];
                $findavg=find('first','product_review','AVG(product_star) as rating_average',"where product_id=$pid",array());

                $arr=array();
                foreach($prodetailsarr as $k=>$g)
                {
                    $icecream= array($g["meta_key"]=>$g["meta_value"]);                  
                    $arr= array_merge($arr,$icecream);                
                    if($g['meta_key'] == 'offerdate'){
                        $dateval = $g["meta_value"];
                        $currentdate=date('Y-m-d');
                        if(strtotime($currentdate) > strtotime($dateval)){              
                            $findoffer = find('all',"product_meta","*","where product_id = '".$g['product_id']."' ",array());
                            foreach($findoffer as $vvaall){
                                if($vvaall['meta_key'] == "Discount"){
                                    $updatesubcat = update("product_meta","meta_value=:meta_value","where product_meta_id = '".$vvaall['product_meta_id']."' ",array(":meta_value"=>"0"));
                                }
                                if($vvaall['meta_key'] == "offerprice"){
                                    $updatesubcat = update("product_meta","meta_value=:meta_value","where product_meta_id = '".$vvaall['product_meta_id']."' ",array(":meta_value"=>"0"));
                                }
                            }
                            $set_value = "meta_value=:meta_value";
                            $where_clause = " where product_meta_id = '".$g['product_meta_id']."' ";
                            $execute= array(":meta_value"=>"0");
                        }
                    }
                }
                $prodetails = $arr;              
                $pr= array("pid"=>$pid , "Product_Name"=>$pnm , "productdetails"=>$prodetails, "findsizearr"=>$findsizearr,"proimglink"=>$proimglink,"pathname"=>$fullproname,"findavg"=>$findavg['rating_average']);
                array_push($productarr,$pr );
            }
            foreach($productarr as $k=>$v){
                $pid= $v["pid"];
                $matchwishlist = find('first','wishlist','*','where user_id = "'.$userid.'" AND product_id ="'.$pid.'" ',array());
                if($matchwishlist){
                    $matcharr=array("wishlist"=>true);
                    $productarr[$k]=array_merge($productarr[$k],$matcharr);
                }
                else{
                    $matcharr=array("wishlist"=>false);
                    $productarr[$k]=array_merge($productarr[$k],$matcharr);
                }
            }
        }


        if($getdata->findsize=="yes"){
            $size=$getdata->smsize;
            $catid=$getdata->catid;
            $productarr = array();

            $subprfor="sub_category inner join product_for on product_for.id=sub_category.product_for_id";
            $prcatarrabc=find('all',$subprfor,'*',"where sub_category.product_for_id = $catid",array());
            $productcount = find('first','product','count(product_id) as total_product',"where product_for_id=$catid",array());
            $sizeprd='product inner join sizetable on product.product_id=sizetable.product_id INNER JOIN product_for on product_for.id = product.product_for_id INNER JOIN sub_category ON sub_category.subcategory_id = product.subcategory_id';
            $findsize=find('all',$sizeprd,'*',"where sizetable.product_size='".$size."' and product_for.id = '".$catid."'",array());

            foreach($findsize as $key=>$vvvs){
                $pnm = $vvvs["pro_name"];
                $pid= $vvvs["product_id"];
                $cat=$vvvs["category"];
                $subcat=$vvvs["product_name"];
                $prname= str_replace(" ","-",$vvvs["pro_name"]); 
                $fullproname = $cat."-".$subcat."-".$prname;
                $producttitlearr = find('first','product_for','*',"where id=$catid",array());
                $prodetailsarr = find('all','product_meta','*',"where product_id=$pid",array());
                $productmensclothingimage = find('first','product_image','image_name',"where product_id=$pid",array());
                $proimglink = "http://localhost/E-Commerce/brothers/Uploads/product_image/".$productmensclothingimage['image_name'];
                $arr=array();
                $findsizearr=find('all','sizetable','*',"where product_id=$pid",array());
                foreach($prodetailsarr as $k=>$g)
                {
                    $icecream= array($g["meta_key"]=>$g["meta_value"]);                  
                    $arr= array_merge($arr,$icecream);                
                    if($g['meta_key'] == 'offerdate'){
                        $dateval = $g["meta_value"];
                        $currentdate=date('Y-m-d');
                        if(strtotime($currentdate) > strtotime($dateval)){              
                            $findoffer = find('all',"product_meta","*","where product_id = '".$g['product_id']."' ",array());
                            foreach($findoffer as $vvaall){
                                if($vvaall['meta_key'] == "Discount"){
                                    $updatesubcat = update("product_meta","meta_value=:meta_value","where product_meta_id = '".$vvaall['product_meta_id']."' ",array(":meta_value"=>"0"));
                                }
                                if($vvaall['meta_key'] == "offerprice"){
                                    $updatesubcat = update("product_meta","meta_value=:meta_value","where product_meta_id = '".$vvaall['product_meta_id']."' ",array(":meta_value"=>"0"));
                                }
                            }
                            $set_value = "meta_value=:meta_value";
                            $where_clause = " where product_meta_id = '".$g['product_meta_id']."' ";
                            $execute= array(":meta_value"=>"0");
                        }
                    }
                }
                $prodetails = $arr;              
                $pr= array("pid"=>$pid , "Product_Name"=>$pnm , "productdetails"=>$prodetails, "findsizearr"=>$findsizearr,"proimglink"=>$proimglink,"pathname"=>$fullproname);
                array_push($productarr,$pr );
            }
            foreach($productarr as $k=>$v){
                $pid= $v["pid"];
                $matchwishlist = find('first','wishlist','*','where user_id = "'.$userid.'" AND product_id ="'.$pid.'" ',array());
                if($matchwishlist){
                    $matcharr=array("wishlist"=>true);
                    $productarr[$k]=array_merge($productarr[$k],$matcharr);
                }
                else{
                    $matcharr=array("wishlist"=>false);
                    $productarr[$k]=array_merge($productarr[$k],$matcharr);
                }
            }
        }
        
        if($getdata->finddisc=="yes"){
            $discv=$getdata->dis;
            $catid=$getdata->catid;
            $productarr = array();           
            $producttable="product inner join product_meta on product.product_id=product_meta.product_id INNER JOIN product_for on product_for.id = product.product_for_id INNER JOIN sub_category ON sub_category.subcategory_id = product.subcategory_id";            
            $productnamedis = find('all',$producttable,'*',"where product_for.id=$catid AND product_meta.meta_key = 'Discount'",array()); 
            $productcount = find('first','product','count(product_id) as total_product',"where product_for_id=$catid",array());
            
            foreach($productnamedis  as $kkk=>$vvvd)
            {
                if($vvvd['meta_value'] >= $discv){
                    $pnm = $vvvd["pro_name"];
                    $pid= $vvvd["product_id"];
                    $cat=$vvvd["category"];
                    $subcat=$vvvd["product_name"];
                    $prname= str_replace(" ","-",$vvvd["pro_name"]); 
                    $fullproname = $cat."-".$subcat."-".$prname;
                    
                    $findsizearr=find('all','sizetable','*',"where product_id=$pid",array());
                    $producttitlearr = find('first','product_for','*',"where id=$catid",array());
                    $productmensclothingimage = find('first','product_image','image_name',"where product_id=$pid",array());
                    $proimglink = "http://localhost/E-Commerce/brothers/Uploads/product_image/".$productmensclothingimage['image_name'];
                    $prodetailsarr = find('all','product_meta','*',"where product_id=$pid",array());
                    $arr=array();
                    foreach($prodetailsarr as $k=>$g)
                    { 
                        $icecream= array($g["meta_key"]=>$g["meta_value"]);                  
                        $arr= array_merge($arr,$icecream);                
                        if($g['meta_key'] == 'offerdate'){
                            $dateval = $g["meta_value"];
                            $currentdate=date('Y-m-d');
                            if(strtotime($currentdate) > strtotime($dateval)){              
                                $findoffer = find('all',"product_meta","*","where product_id = '".$g['product_id']."' ",array());
                                foreach($findoffer as $vvaall){
                                    if($vvaall['meta_key'] == "Discount"){
                                        $updatesubcat = update("product_meta","meta_value=:meta_value","where product_meta_id = '".$vvaall['product_meta_id']."' ",array(":meta_value"=>"0"));
                                    }
                                    if($vvaall['meta_key'] == "offerprice"){
                                        $updatesubcat = update("product_meta","meta_value=:meta_value","where product_meta_id = '".$vvaall['product_meta_id']."' ",array(":meta_value"=>"0"));
                                    }
                                }
                                $set_value = "meta_value=:meta_value";
                                $where_clause = " where product_meta_id = '".$g['product_meta_id']."' ";
                                $execute= array(":meta_value"=>"0");
                            }
                        }
                    }
                    $prodetails = $arr;              
                    $pr= array("pid"=>$pid , "Product_Name"=>$pnm , "productdetails"=>$prodetails, "findsizearr"=>$findsizearr,"proimglink"=>$proimglink,"pathname"=>$fullproname);
                    array_push($productarr,$pr );
                }         
            }
            foreach($productarr as $k=>$v){
                $pid= $v["pid"];
                $matchwishlist = find('first','wishlist','*','where user_id = "'.$userid.'" AND product_id ="'.$pid.'" ',array());
                if($matchwishlist){
                    $matcharr=array("wishlist"=>true);
                    $productarr[$k]=array_merge($productarr[$k],$matcharr);
                }
                else{
                    $matcharr=array("wishlist"=>false);
                    $productarr[$k]=array_merge($productarr[$k],$matcharr);
                }
            }
        }

        if($getdata->findsort=="yes"){
            $catid=$getdata->catid;
            $price=$getdata->price;
            $productarr = array();  
            if($price=='desc'){
                $producttable="product inner join product_meta on product.product_id=product_meta.product_id INNER JOIN product_for on product_for.id = product.product_for_id INNER JOIN sub_category ON sub_category.subcategory_id = product.subcategory_id";            
                $productnamesort = find('all',$producttable,'*',"where product_for.id=$catid AND product_meta.meta_key = 'Price' ORDER by meta_value desc",array());
                $productcount = find('first','product','count(product_id) as total_product',"where product_for_id=$catid",array());
                
                foreach($productnamesort  as $kkk=>$vvvd)
                {
                    $pnm = $vvvd["pro_name"];
                    $pid= $vvvd["product_id"];
                    $cat=$vvvd["category"];
                    $subcat=$vvvd["product_name"];
                    $prname= str_replace(" ","-",$vvvd["pro_name"]); 
                    $fullproname = $cat."-".$subcat."-".$prname;
                    
                    $findsizearr=find('all','sizetable','*',"where product_id=$pid",array());
                    $producttitlearr = find('first','product_for','*',"where id=$catid",array());
                    $productmensclothingimage = find('first','product_image','image_name',"where product_id=$pid",array());
                    $proimglink = "http://localhost/E-Commerce/brothers/Uploads/product_image/".$productmensclothingimage['image_name'];
                    $prodetailsarr = find('all','product_meta','*',"where product_id=$pid",array());
                    $arr=array();
                    foreach($prodetailsarr as $k=>$g)
                    { 
                        $icecream= array($g["meta_key"]=>$g["meta_value"]);                  
                        $arr= array_merge($arr,$icecream);                
                        if($g['meta_key'] == 'offerdate'){
                            $dateval = $g["meta_value"];
                            $currentdate=date('Y-m-d');
                            if(strtotime($currentdate) > strtotime($dateval)){              
                                $findoffer = find('all',"product_meta","*","where product_id = '".$g['product_id']."' ",array());
                                foreach($findoffer as $vvaall){
                                    if($vvaall['meta_key'] == "Discount"){
                                        $updatesubcat = update("product_meta","meta_value=:meta_value","where product_meta_id = '".$vvaall['product_meta_id']."' ",array(":meta_value"=>"0"));
                                    }
                                    if($vvaall['meta_key'] == "offerprice"){
                                        $updatesubcat = update("product_meta","meta_value=:meta_value","where product_meta_id = '".$vvaall['product_meta_id']."' ",array(":meta_value"=>"0"));
                                    }
                                }
                                $set_value = "meta_value=:meta_value";
                                $where_clause = " where product_meta_id = '".$g['product_meta_id']."' ";
                                $execute= array(":meta_value"=>"0");
                            }
                        }
                    }
                    $prodetails = $arr;              
                    $pr= array("pid"=>$pid , "Product_Name"=>$pnm , "productdetails"=>$prodetails, "findsizearr"=>$findsizearr,"proimglink"=>$proimglink,"pathname"=>$fullproname);
                    array_push($productarr,$pr );       
                }
                foreach($productarr as $k=>$v){
                    $pid= $v["pid"];
                    $matchwishlist = find('first','wishlist','*','where user_id = "'.$userid.'" AND product_id ="'.$pid.'" ',array());
                    if($matchwishlist){
                        $matcharr=array("wishlist"=>true);
                        $productarr[$k]=array_merge($productarr[$k],$matcharr);
                    }
                    else{
                        $matcharr=array("wishlist"=>false);
                        $productarr[$k]=array_merge($productarr[$k],$matcharr);
                    }
                }
            }   
            if($price=='asc'){
                $producttable="product inner join product_meta on product.product_id=product_meta.product_id INNER JOIN product_for on product_for.id = product.product_for_id INNER JOIN sub_category ON sub_category.subcategory_id = product.subcategory_id";            
                $productnamesort = find('all',$producttable,'*',"where product_for.id=$catid AND product_meta.meta_key = 'Price' ORDER by meta_value asc",array());
                $productcount = find('first','product','count(product_id) as total_product',"where product_for_id=$catid",array());
                
                foreach($productnamesort  as $kkk=>$vvvd)
                {
                    $pnm = $vvvd["pro_name"];
                    $pid= $vvvd["product_id"];
                    $cat=$vvvd["category"];
                    $subcat=$vvvd["product_name"];
                    $prname= str_replace(" ","-",$vvvd["pro_name"]); 
                    $fullproname = $cat."-".$subcat."-".$prname;
                    
                    $findsizearr=find('all','sizetable','*',"where product_id=$pid",array());
                    $producttitlearr = find('first','product_for','*',"where id=$catid",array());
                    $productmensclothingimage = find('first','product_image','image_name',"where product_id=$pid",array());
                    $proimglink = "http://localhost/E-Commerce/brothers/Uploads/product_image/".$productmensclothingimage['image_name'];
                    $prodetailsarr = find('all','product_meta','*',"where product_id=$pid",array());
                    $arr=array();
                    foreach($prodetailsarr as $k=>$g)
                    { 
                        $icecream= array($g["meta_key"]=>$g["meta_value"]);                  
                        $arr= array_merge($arr,$icecream);                
                        if($g['meta_key'] == 'offerdate'){
                            $dateval = $g["meta_value"];
                            $currentdate=date('Y-m-d');
                            if(strtotime($currentdate) > strtotime($dateval)){              
                                $findoffer = find('all',"product_meta","*","where product_id = '".$g['product_id']."' ",array());
                                foreach($findoffer as $vvaall){
                                    if($vvaall['meta_key'] == "Discount"){
                                        $updatesubcat = update("product_meta","meta_value=:meta_value","where product_meta_id = '".$vvaall['product_meta_id']."' ",array(":meta_value"=>"0"));
                                    }
                                    if($vvaall['meta_key'] == "offerprice"){
                                        $updatesubcat = update("product_meta","meta_value=:meta_value","where product_meta_id = '".$vvaall['product_meta_id']."' ",array(":meta_value"=>"0"));
                                    }
                                }
                                $set_value = "meta_value=:meta_value";
                                $where_clause = " where product_meta_id = '".$g['product_meta_id']."' ";
                                $execute= array(":meta_value"=>"0");
                            }
                        }
                    }
                    $prodetails = $arr;              
                    $pr= array("pid"=>$pid , "Product_Name"=>$pnm , "productdetails"=>$prodetails, "findsizearr"=>$findsizearr,"proimglink"=>$proimglink,"pathname"=>$fullproname);
                    array_push($productarr,$pr );       
                }
                foreach($productarr as $k=>$v){
                    $pid= $v["pid"];
                    $matchwishlist = find('first','wishlist','*','where user_id = "'.$userid.'" AND product_id ="'.$pid.'" ',array());
                    if($matchwishlist){
                        $matcharr=array("wishlist"=>true);
                        $productarr[$k]=array_merge($productarr[$k],$matcharr);
                    }
                    else{
                        $matcharr=array("wishlist"=>false);
                        $productarr[$k]=array_merge($productarr[$k],$matcharr);
                    }
                }
            }             
        }

        if($getdata->findrate=="yes"){
            
            $rating=$getdata->rate;
            $catid=$getdata->catid;


            $productarr = array();           
            $producttable="product inner join product_review on product.product_id=product_review.product_id INNER JOIN product_for on product_for.id = product.product_for_id INNER JOIN sub_category ON sub_category.subcategory_id = product.subcategory_id";            
            $productrate = find('all',$producttable,'*',"where product_for.id=$catid AND product_review.product_star>=$rating",array());
            // $productrate = find('all',$producttable,'*',"where product_for.id=$catid ",array());
            $productcount = find('first','product','count(product_id) as total_product',"where product_for_id=$catid",array());
            
            
            foreach($productrate  as $kkk=>$vvvd)
            {
                $pnm = $vvvd["pro_name"];
                $pid= $vvvd["product_id"];
                $cat=$vvvd["category"];
                $subcat=$vvvd["product_name"];
                $prname= str_replace(" ","-",$vvvd["pro_name"]); 
                $fullproname = $cat."-".$subcat."-".$prname;
                
                $findsizearr=find('all','sizetable','*',"where product_id=$pid",array());
                $producttitlearr = find('first','product_for','*',"where id=$catid",array());
                $productmensclothingimage = find('first','product_image','image_name',"where product_id=$pid",array());
                $proimglink = "http://localhost/E-Commerce/brothers/Uploads/product_image/".$productmensclothingimage['image_name'];
                $prodetailsarr = find('all','product_meta','*',"where product_id=$pid",array());
                $findavg=find('all','product_review','AVG(product_star) as rating_average','where product_id="'.$pid.'"',array());
                // print_r($findavg);
                $arr=array();
                foreach($prodetailsarr as $k=>$g)
                { 
                    if($findavg >= $rating){
                        $icecream= array($g["meta_key"]=>$g["meta_value"]);                  
                        $arr= array_merge($arr,$icecream);                
                        if($g['meta_key'] == 'offerdate'){
                            $dateval = $g["meta_value"];
                            $currentdate=date('Y-m-d');
                            if(strtotime($currentdate) > strtotime($dateval)){              
                                $findoffer = find('all',"product_meta","*","where product_id = '".$g['product_id']."' ",array());
                                foreach($findoffer as $vvaall){
                                    if($vvaall['meta_key'] == "Discount"){
                                        $updatesubcat = update("product_meta","meta_value=:meta_value","where product_meta_id = '".$vvaall['product_meta_id']."' ",array(":meta_value"=>"0"));
                                    }
                                    if($vvaall['meta_key'] == "offerprice"){
                                        $updatesubcat = update("product_meta","meta_value=:meta_value","where product_meta_id = '".$vvaall['product_meta_id']."' ",array(":meta_value"=>"0"));
                                    }
                                }
                                $set_value = "meta_value=:meta_value";
                                $where_clause = " where product_meta_id = '".$g['product_meta_id']."' ";
                                $execute= array(":meta_value"=>"0");
                            }
                        }
                    }
                }
                $prodetails = $arr;              
                $pr= array("pid"=>$pid , "Product_Name"=>$pnm , "productdetails"=>$prodetails, "findsizearr"=>$findsizearr,"proimglink"=>$proimglink,"pathname"=>$fullproname);
                array_push($productarr,$pr ); 
                foreach($productarr as $k=>$v){
                    $pid= $v["pid"];
                    $matchwishlist = find('first','wishlist','*','where user_id = "'.$userid.'" AND product_id ="'.$pid.'" ',array());
                    if($matchwishlist){
                        $matcharr=array("wishlist"=>true);
                        $productarr[$k]=array_merge($productarr[$k],$matcharr);
                    }
                    else{
                        $matcharr=array("wishlist"=>false);
                        $productarr[$k]=array_merge($productarr[$k],$matcharr);
                    }
                }
            } 
        }
    }
    
    $result = array("status"=>'ok',
                    "productname"=>$productarr,
                    "productcategory"=>$prcatarrabc,
                    "findsize"=>$findsize,
                    "producttitlearr"=>$producttitlearr['category'],
                    "productcount"=>$productcount["total_product"],
                );
    echo json_encode($result);
?>