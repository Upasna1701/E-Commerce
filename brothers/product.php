<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    include('init.php');

    if($_SERVER['REQUEST_METHOD']=='POST')
    {
        $getdata = json_decode(file_get_contents("php://input"));
        //recent activity

        if($getdata->recact=='yes'){
            $userid = $getdata->userid;

            $findrecactivity=find('all','recent_activity','*','where user_id ="'.$userid.'"',array());
            $recarr=array();
            foreach($findrecactivity as $k=>$v){
                $pid=$v['product_id'];
                $productmensclothingimage = find('first','product_image','image_name',"where product_id='".$pid."'",array());
                $proimglink = "http://localhost/E-Commerce/brothers/Uploads/product_image/".$productmensclothingimage['image_name'];
                
                $procartdetailsarr = find('all','product_meta','*',"where product_id='".$pid."'",array());

                foreach($procartdetailsarr as $k=>$g)
                {              
                    if($g['meta_key'] == 'Price'){
                        $prprice = $g["meta_value"];
                    }
                }

                $pathtable="recent_activity inner join product on recent_activity.product_id=product.product_id inner join product_for on product.product_for_id=product_for.id inner join sub_category on product.subcategory_id=sub_category.subcategory_id";
                $findpath=find('all',$pathtable,'*','where product.product_id="'.$pid.'"',array());
                
                foreach($findpath  as $kkk=>$vvv){
                    $cat=$vvv["category"];
                    $subcat=$vvv["product_name"];
                    $prname= str_replace(" ","-",$vvv["pro_name"]);
                    $fullproname = $cat."-".$subcat."-".$prname; 
                }
                $prd= array("pid"=>$pid,"proimglink"=>$proimglink,"proprice"=>$prprice,"pathname"=>$fullproname);
                array_push($recarr,$prd);
            }
            
        }

        //item details
        if($getdata->itemdetail == 'yes')
        {
            $productid = $getdata->productid;
            $catid = $getdata->catid;
            $subcat = $getdata->subcat;
            $findprdetail = find('first','product','*','where product_id = "'.$productid.'" ',array());
            $findprcatsub=find('first','product inner join product_for on product.product_for_id=product_for.id inner join sub_category on product.subcategory_id=sub_category.subcategory_id','*','where product_id = "'.$productid.'" ',array());
                  
            if($findprdetail){
                    $sizearr = find('all','sizetable','*','where product_id= "'.$productid.'"',array());
                    $quansizetotal = find('first','sizetable','SUM(quantity) as total_sizequan','where product_id= "'.$productid.'"',array());
                    $productimage = find('all','product_image','image_name',"where product_id=$productid",array());
                    $productmodalimage = find('first','product_image','image_name',"where product_id=$productid",array());
                    $promodalimglink = "http://localhost/E-Commerce/brothers/Uploads/product_image/".$productmodalimage['image_name'];
                    
                    foreach($productimage as $kk=>$valls){
                        $proimglink = "http://localhost/E-Commerce/brothers/Uploads/product_image/".$valls['image_name'];
                        $temparr = array("imagelink"=>$proimglink);
                        $productimage[$kk]=array_merge($temparr,$productimage[$kk]);
                    }

                    $productarrpr= array();
                    $pnm = $findprdetail["pro_name"];
                    $pid= $findprdetail["product_id"];
    
                    $prodetailsarr = find('all','product_meta','*',"where product_id=$pid",array());
                    $arr=array();
                    

                    foreach($prodetailsarr as $k=>$g)
                    {
                        $icecream= array($g["meta_key"]=>$g["meta_value"]);
                        if($g['meta_key'] == 'Size'){

                        }
                        $arr = array_merge($arr,$icecream);
                    }
                    $prodetails = $arr;   
                    $productarrpr = array("pid"=>$pid , "Product_Name"=>$pnm , "productdetails"=>$prodetails,"promodalimglink"=>$promodalimglink);
                
            }
        }

        //find subcategory and category

        if($getdata->showallcat == 'yes')
        {
            $userid = $getdata->userid;

            $findsubman = find('all','sub_category inner join product_for on product_for.id=sub_category.product_for_id','*','where sub_category.product_for_id = "1" ',array());
            $findsubwomen = find('all','sub_category inner join product_for on product_for.id=sub_category.product_for_id','*','where product_for_id = "2" ',array());
            $findsubkids = find('all','sub_category inner join product_for on product_for.id=sub_category.product_for_id','*','where product_for_id = "3" ',array());
            $findusername = find('first','login','*','where Id = "'.$userid.'"',array());
        }
        
        if($getdata->findprosubcat=="yes"){
            $catid=$getdata->categoryid;
            $findsubcat = find('all','sub_category','*','where product_for_id="'.$catid.'"',array());
        }

        $findcat = find('all','product_for','*','where 1',array());

        //product product details
        if($getdata->matchproductlist == 'yes')
        { 
            $userid = $getdata->userid;
            $subcatid = $getdata->subcatid;
            $catid = $getdata->catid;
        
            $producttable="product inner join product_for on product.product_for_id=product_for.id inner join sub_category on product.subcategory_id=sub_category.subcategory_id";
            $productname = find('all',$producttable,'*',"where product.subcategory_id=$subcatid AND product.product_for_id=$catid",array());             
            $productarr= array();
            $productsubtitle = find('first','sub_category','*',"where subcategory_id = '".$subcatid."' ",array());
            $productcount = find('first','product','count(product_id) as total_product',"where subcategory_id=$subcatid AND product_for_id=$catid",array());             
          
            $producttitlearr = find('first','product_for','*',"where id=$catid",array());
            foreach($productname  as $kkk=>$vvv)
            {

                $pnm = $vvv["pro_name"];
                $pid= $vvv["product_id"];

                $cat=$vvv["category"];
                $subcat=$vvv["product_name"];
                $prname= str_replace(" ","-",$vvv["pro_name"]);
                $fullproname = $cat."-".$subcat."-".$prname;       
                $prodetailsarr = find('all','product_meta','*',"where product_id=$pid",array());
                $quansizetotal = find('first','sizetable','SUM(quantity) as total_sizequan','where product_id= "'.$pid.'"',array());

                $productmensclothingimage = find('first','product_image','image_name',"where product_id=$pid",array());
                $proimglink = "http://localhost/E-Commerce/brothers/Uploads/product_image/".$productmensclothingimage['image_name'];
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
                $pr= array("pid"=>$pid , "Product_Name"=>$pnm , "productdetails"=>$prodetails,"proimglink"=>$proimglink,"pathname"=>$fullproname,"quansizetotal"=>$quansizetotal["total_sizequan"],);
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

        

        //itemdetails wishlist icon

        if($getdata->checkitemwish == 'yes'){
            $userid = $getdata->userid;
            $productid = $getdata->productid;
            $itemmatchwishlist = find('first','wishlist','*','where user_id = "'.$userid.'" AND product_id="'.$productid.'"',array());
            if($itemmatchwishlist){
                $matchitemarr=array("wishlist"=>true);
            }
            else{
                $matchitemarr=array("wishlist"=>false);
            }
        }

        if($getdata->getactivity=="yes"){
            $userid = $getdata->userid;
            $pid = $getdata->pid;

            $findactivity=find('all','recent_activity','*','where product_id ="'.$pid.'" AND user_id ="'.$userid.'"',array());
            if(!$findactivity){
                $recfields = "product_id,user_id";
                $recvalues = ":product_id,:user_id";
                $recexe = array(":product_id"=>$pid,":user_id"=>$userid);
                $recsave= save('recent_activity', $recfields, $recvalues, $recexe);
            }
        }

        if($getdata->findmensize=="yes"){

            $size=$getdata->smsize;
            $catid=$getdata->catid;
            $subcatid=$getdata->subid;
            
            $productarr= array();
            $productsubtitle = find('first','sub_category','*',"where subcategory_id = '".$subcatid."' ",array());
            $productcount = find('first','product','count(product_id) as total_product',"where product_for_id=$catid",array());
            $sizeprd='product inner join sizetable on product.product_id=sizetable.product_id INNER JOIN product_for on product_for.id = product.product_for_id INNER JOIN sub_category ON sub_category.subcategory_id = product.subcategory_id';
            $findsize=find('all',$sizeprd,'*',"where sizetable.product_size='".$size."' and product_for.id = '".$catid."' and product.subcategory_id=$subcatid",array());
            
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
                $pr= array("pid"=>$pid , "Product_Name"=>$pnm , "productdetails"=>$prodetails,"proimglink"=>$proimglink,"pathname"=>$fullproname,"quansizetotal"=>$quansizetotal["total_sizequan"],);
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
        
        if($getdata->findmendisc=="yes"){
            $discv=$getdata->dis;
            $catid=$getdata->catid;
            $subcatid=$getdata->subid;
            $productarr = array();           
            $producttable="product inner join product_meta on product.product_id=product_meta.product_id INNER JOIN product_for on product_for.id = product.product_for_id INNER JOIN sub_category ON sub_category.subcategory_id = product.subcategory_id";            
            $productnamedis = find('all',$producttable,'*',"where product_for.id=$catid AND product_meta.meta_key = 'Discount' and product.subcategory_id=$subcatid",array()); 
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
                    $pr= array("pid"=>$pid , "Product_Name"=>$pnm , "productdetails"=>$prodetails,"proimglink"=>$proimglink,"pathname"=>$fullproname,"quansizetotal"=>$quansizetotal["total_sizequan"],);
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
        
        if($getdata->findmensort=="yes"){
            $catid=$getdata->catid;
            $subcatid=$getdata->subid;
            $price=$getdata->price;
            $productarr = array();  
            if($price=='desc'){
                $producttable="product inner join product_meta on product.product_id=product_meta.product_id INNER JOIN product_for on product_for.id = product.product_for_id INNER JOIN sub_category ON sub_category.subcategory_id = product.subcategory_id";            
                $productnamesort = find('all',$producttable,'*',"where product_for.id=$catid AND product.subcategory_id=$subcatid and product_meta.meta_key = 'Price' ORDER by meta_value desc",array());
                $productcount = find('first','product','count(product_id) as total_product',"where product_for_id=$catid",array());
                
                foreach($productnamesort  as $kkk=>$vvvd)
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
                        $pr= array("pid"=>$pid , "Product_Name"=>$pnm , "productdetails"=>$prodetails,"proimglink"=>$proimglink,"pathname"=>$fullproname,"quansizetotal"=>$quansizetotal["total_sizequan"],);
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
            if($price=='asc'){
                $producttable="product inner join product_meta on product.product_id=product_meta.product_id INNER JOIN product_for on product_for.id = product.product_for_id INNER JOIN sub_category ON sub_category.subcategory_id = product.subcategory_id";            
                $productnamesort = find('all',$producttable,'*',"where product_for.id=$catid AND product.subcategory_id=$subcatid and product_meta.meta_key = 'Price' ORDER by meta_value asc",array());
                $productcount = find('first','product','count(product_id) as total_product',"where product_for_id=$catid",array());
                
                foreach($productnamesort  as $kkk=>$vvvd)
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
                        $pr= array("pid"=>$pid , "Product_Name"=>$pnm , "productdetails"=>$prodetails,"proimglink"=>$proimglink,"pathname"=>$fullproname,"quansizetotal"=>$quansizetotal["total_sizequan"],);
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
        }


        if($getdata->findmenrate=="yes"){
            $rating=$getdata->rate;
            $catid=$getdata->catid;
            $subcatid=$getdata->subid;

            $productarr = array();           
            $producttable="product inner join product_review on product.product_id=product_review.product_id INNER JOIN product_for on product_for.id = product.product_for_id INNER JOIN sub_category ON sub_category.subcategory_id = product.subcategory_id";            
            $productrate = find('all',$producttable,'*',"where product_for.id=$catid AND product_review.product_star>=$rating AND product.subcategory_id=$subcatid",array());
            $findavg=find('first',$producttable,'AVG(product_star) as rating_average','where product_for.id="'.$catid.'" AND product.subcategory_id="'.$subcatid.'"',array());

            foreach($productrate  as $kkk=>$vvvd)
            {
                if($findavg['rating_average'] >= $rating){
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
                    $pr= array("pid"=>$pid , "Product_Name"=>$pnm , "productdetails"=>$prodetails,"proimglink"=>$proimglink,"pathname"=>$fullproname,"quansizetotal"=>$quansizetotal["total_sizequan"],);
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
    }
    
    $result = array("status"=>'ok',
    "findsubman"=>$findsubman,
    "findsubwomen"=>$findsubwomen,
    "findsubkids"=>$findsubkids,
    "findusername"=>explode(" ",$findusername['name'])[0],
    "prodetails"=>$prodetails,
    "productname"=>$productarr,
    "findprdetail"=>$productarrpr,
    "sizearr"=>$sizearr,
    "quansizetotal"=>$quansizetotal["total_sizequan"],
    "productimage"=>$productimage,
    "itemmatchwishlist"=>$matchitemarr,
    "proimgwish"=>$proimgwish,
    "productproductname"=>$productarr['Product_Name'],
    "producttitlearr"=>$producttitlearr,
    "productsubtitle"=>$productsubtitle['product_name'],
    "productcount"=>$productcount["total_product"],
    "findprcatsub"=>$findprcatsub,
    "findrecactivity"=>$recarr,
    "findsize"=>$findsize,

);
    echo json_encode($result);
?>