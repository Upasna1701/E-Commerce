<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    include('../init.php');


    function skucode()
    {
        $rn = rand(100000,999999);
        $findrandomnumber = find('first','product','*','where skucode = "'.$rn.'" ',array());
        if($findrandomnumber)
        {
            skucode();
        }
        else
        {
            return $rn;
        }

    }


    if($_SERVER['REQUEST_METHOD']=='POST')
    {
        $getdata = json_decode(file_get_contents("php://input"));
        
        //add subcategory
        if($getdata->addsubcategory == 'yes')
        {       
            $catname = $getdata->catname;

            $fields = "category";
            $values = ":category";
            $exe = array(":category"=>$catname);
            $save = save('product_for', $fields, $values, $exe);
        }

        // save category
        if($getdata->addprsubcategory == 'yes')
        {
            $formdatadata = $getdata->formdatadata;
            foreach($formdatadata as $k=>$v)
            {
                $categoryid = $formdatadata[$k]->choosecategory;
                $name = $formdatadata[$k]->product_name;
                $imgname=$getdata->imagefile;

                $fields= "product_for_id,product_name";
                $values= ":product_for_id,:product_name";
                $exe= array(":product_for_id"=>$categoryid,":product_name"=>$name);
                $savesub= save('sub_category', $fields, $values, $exe);
            }
        }

        if($getdata->findprosubcat=="yes"){
            $catid=$getdata->categoryid;
            $findsubcat = find('all','sub_category','*','where product_for_id="'.$catid.'"',array());
        }

        // save product
        if($getdata->productadd == 'yes')
        {  
            $proProduct_id = $getdata->Category;
            $prosubProduct_id = $getdata->Subcategory;
            $proProduct_name = $getdata->Product_Name;
            $proProduct_qty = $getdata->Quantity;
            $user_id=$getdata->User_id;
            $checkrskucode = skucode();

            $fields1= "product_for_id,subcategory_id,pro_name,skucode";
            $values1= ":product_for_id,:subcategory_id,:pro_name,:skucode";
            $exe1= array(":product_for_id"=>$proProduct_id,":subcategory_id"=>$prosubProduct_id,":pro_name"=>$proProduct_name,":skucode"=>$checkrskucode);
            $save1 = save('product', $fields1, $values1, $exe1);
            
            $field2="product_id,meta_key,meta_value,user_id";
            $values2= ":product_id,:meta_key,:meta_value,:user_id";
            
            
            foreach($getdata as $key=>$val)
            {
                if($key != "imagefile" && $key != "Size")
                {
                    $exemeta = array(":product_id"=>$save1,":meta_key"=>$key,":meta_value"=>$val,":user_id"=>$user_id);
                    $savemeta=save('product_meta',$field2,$values2,$exemeta);
                    
                }
            } 

            $arrsize = explode(",",$getdata->Size);
            foreach($arrsize as $keyy=>$vaall)
            {
                $valarr = $vaall;
                $sizeaa = explode(":",$vaall);
                $size = $sizeaa[0];
                $quntity = $sizeaa[1];
                $proid = $save1;

                $filedssize = "product_id,product_size,quantity";
                $valuesize = ":product_id,:product_size,:quantity";
                $exesaize = array(
                    ":product_id"=>$proid,
                    ":product_size"=>$size,
                    ":quantity"=>$quntity,
                );
                $sizesave = save("sizetable",$filedssize,$valuesize,$exesaize);
            }

            $offerprice=$Price-(($Price*$Discount)/100);
            $exemeta = array(":product_id"=>$save1,":meta_key"=>'offerprice',":meta_value"=>$offerprice,":user_id"=>$user_id);
            $savemeta=save('product_meta',$field2,$values2,$exemeta);
        }

        if($_POST['uploadimagefile'] == 'yes')
        {
            $imgname = $_FILES['imagefile']['name'];
            $tmp_name = $_FILES['imagefile']['tmp_name'];
            $imageprid=$_POST["productid"];
            
            $upload_name = "../Uploads/product_image/".$_POST["productid"]."-".$imgname;
            
            $imageuploaded = move_uploaded_file($tmp_name,$upload_name);

            $ff = "product_id,image_name";
            $vva = ":product_id,:image_name";
            $exeaa = array(":product_id"=>$imageprid,":image_name"=>$imageprid."-".$imgname);
            $saveimgup = save('product_image',$ff,$vva,$exeaa);

        }


        if($getdata->productupdate=="yes"){
            $pid=$getdata->prid;
            $Category=$getdata->Category;
            $Subcategory=$getdata->Subcategory;
            $Product_Name=$getdata->Product_Name;
            $Product_desc=$getdata->Product_desc;
            $Price=$getdata->Price;
            $Discount=$getdata->Discount;
            $offerdate=$getdata->offerdate;
            $imagefile=$getdata->imagefile;
            
            if($_POST['uploadimagefile'] == 'yes')
            {
                $imgname = $_FILES['imagefile']['name'];
                $tmp_name = $_FILES['imagefile']['tmp_name'];
                $imageprid=$_POST["productid"];
                
                $upload_name = "../Uploads/product_image/".$_POST["productid"]."-".$imgname;
                
                $imageuploaded = move_uploaded_file($tmp_name,$upload_name);

                $ff = "product_id,image_name";
                $vva = ":product_id,:image_name";
                $exeaa = array(":product_id"=>$imageprid,":image_name"=>$imageprid."-".$imgname);
                $saveimgup = save('product_image',$ff,$vva,$exeaa);

            }

            $Size=$getdata->Size;
            $arrsize = explode(",",$getdata->Size);
            $findsizeagain=find('all','sizetable','*','where product_id = "'.$pid.'"',array());
            $findesizearray=array();
            foreach($findsizeagain as $k=>$v){
                $findesizearray[$v['product_size']]=$v['size_id'];
            }
            foreach($arrsize as $keyy=>$vaall)
            {
                $valarr = $vaall;
                $sizeaa = explode(":",$vaall);
                $size = $sizeaa[0];
                $quntity = $sizeaa[1];

                foreach($findsizeagain as $k=>$v){
                    if( in_array($size,array_keys($findesizearray))){
                        $setvalue = "quantity=:quantity";
                        $where_clause = " where size_id =$findesizearray[$size]";
                        $exearr = array(":quantity"=>$quntity);
                        $updatesubcat = update("sizetable", $setvalue, $where_clause, $exearr);
                        break;
                    }
                    else
                    {
                        $fields1= "product_id,product_size,quantity";
                        $values1= ":product_id,:product_size,:quantity";
                        $exe1= array(":product_id"=>$pid,":product_size"=>$size,":quantity"=>$quntity);
                        $save1 = save('sizetable', $fields1, $values1, $exe1);
                        break;
                    }
                }
            }


            $set_value = "product_for_id=:product_for_id ,subcategory_id=:subcategory_id,pro_name=:pro_name";
            $where_clause = " where product_id = '$pid' ";
            $execute= array(":product_for_id"=>$Category,":subcategory_id"=>$Subcategory,":pro_name"=>$Product_Name);
            $updatesubcat = update("product", $set_value, $where_clause, $execute);
            
            foreach($getdata as $keyupdate=>$valupdate)
            {
                if($keyupdate == "Category"){
                    $setvalue = "meta_value=:meta_value";
                    $where_clause = " where product_id = '$pid' and meta_key = '$keyupdate' ";
                    $exearr = array(":meta_value"=>$Category);
                    $updatesubcat = update("product_meta", $setvalue, $where_clause, $exearr);
                }
                if($keyupdate == "Subcategory"){
                    $setvalue = "meta_value=:meta_value";
                    $where_clause = " where product_id = '$pid' and meta_key = '$keyupdate' ";
                    $exearr = array(":meta_value"=>$Subcategory);
                    $updatesubcat = update("product_meta", $setvalue, $where_clause, $exearr);
                }
                if($keyupdate == "Product_Name"){
                    $setvalue = "meta_value=:meta_value";
                    $where_clause = " where product_id = '$pid' and meta_key = '$keyupdate' ";
                    $exearr = array(":meta_value"=>$Product_Name);
                    $updatepname = update("product_meta", $setvalue, $where_clause, $exearr);
                }
                if($keyupdate == "Price"){
                    $setvalue = "meta_value=:meta_value";
                    $where_clause = " where product_id = '$pid' and meta_key = '$keyupdate' ";
                    $exearr = array(":meta_value"=>$Price);
                    $updatesubcat = update("product_meta", $setvalue, $where_clause, $exearr);
                }
                if($keyupdate == "Discount"){
                    $setvalue = "meta_value=:meta_value";
                    $where_clause = " where product_id = '$pid' and meta_key = '$keyupdate' ";
                    $exearr = array(":meta_value"=>$Discount);
                    $updatesubcat = update("product_meta", $setvalue, $where_clause, $exearr);
                }
                if($keyupdate == "offerdate"){
                    $setvalue = "meta_value=:meta_value";
                    $where_clause = " where product_id = '$pid' and meta_key = '$keyupdate' ";
                    $exearr = array(":meta_value"=>$offerdate);
                    $updatesubcat = update("product_meta", $setvalue, $where_clause, $exearr);
                }
                if($keyupdate == "Product_desc"){
                    $setvalue = "meta_value=:meta_value";
                    $where_clause = " where product_id = '$pid' and meta_key = '$keyupdate' ";
                    $exearr = array(":meta_value"=>$Product_desc);
                    $updatesubcat = update("product_meta", $setvalue, $where_clause, $exearr);
                }
            }
        }































        //product product details

        $productname = find('all','product','*','where 1',array());   
        $productarr= array();

        foreach($productname  as $kkk=>$vvv)
        {           
            $pnm = $vvv["pro_name"];
            $pid= $vvv["product_id"];

            $prodetailsarr = find('all','product_meta','*',"where product_id=$pid",array());
            $sizearrdet = find('all','sizetable','*','where product_id= "'.$pid.'"',array());
            $productimage = find('all','product_image','image_name,image_id,product_id','where product_id= "'.$pid.'"',array());
                    foreach($productimage as $kk=>$valls){
                        $proimglink = "http://localhost/E-Commerce/brothers/Uploads/product_image/".$valls['image_name'];
                        $temparr = array("imagelink"=>$proimglink);
                        $productimage[$kk]=array_merge($temparr,$productimage[$kk]);
                    }
           
            $arr=array();
            foreach($prodetailsarr as $k=>$g)
            {
                $icecream= array($g["meta_key"]=>$g["meta_value"]);
                $arr= array_merge($arr,$icecream);
            }
            $prodetails = $arr;
            $pr= array("pid"=>$pid , "Product_Name"=>$pnm , "productdetails"=>$prodetails,"sizearrdet"=>$sizearrdet,"productimage"=>$productimage,);
            array_push($productarr,$pr );
        }
        $findcat = find('all','product_for','*','where 1',array());

        //find subcategory
        
        $findsubcategory=find('all','product_for as pr inner join sub_category as sub on pr.id=sub.product_for_id','*',"where 1",array());


        //delete product
        if($getdata->deletepr=="yes"){
            $productid = $getdata->productid;
            $productid= stripcleantohtml($productid);

            $where_clause = " where product_id='$productid'";
            $execute= array();
            $deleteproduct = delete("product", $where_clause, $execute);
        }

        //delete subcategory
        if($getdata->deletesubpr=="yes"){
            $subprname = $getdata->subproductid;
            $subprname= stripcleantohtml($subprname);

            $where_clause = "where subcategory_id='$subprname'";
            $execute= array();
            $delete= delete("sub_category", $where_clause, $execute);
        }

        //delete category
        if($getdata->deletecatpr=="yes"){
            $catproduct = $getdata->catproduct;
            $catproduct= stripcleantohtml($catproduct);

            $where_clause = "where category='$catproduct'";
            $execute= array();
            $delete= delete("product_for", $where_clause, $execute);
        }

        //update subcategory

        if($getdata->updatesubcategory=="yes")
        {
            $modalproductsub = $getdata->modalproductsub;
            $modalproductname = $getdata->modalproductname;
            $subproductid = $getdata->subproductid;

            $set_value = "product_for_id=:product_for_id ,product_name=:product_name";
            $where_clause = " where subcategory_id = '$subproductid' ";
            $execute= array(":product_for_id"=>$modalproductsub,":product_name"=>$modalproductname);
            $updatesubcat = update("sub_category", $set_value, $where_clause, $execute);
        }

        if($getdata->delimgg=="yes")
        {
            $imgid = $getdata->imgid;
            $prid = $getdata->prid;
            $imgid= stripcleantohtml($imgid);
            $where_clause = "where image_id='$imgid'";
            $execute= array();
            $delete= delete("product_image", $where_clause, $execute);
            
        }
        
        if($getdata->getactivity=="yes"){
            print_r("qwertyuiop");
            $userid = $getdata->userid;
            $pid = $getdata->pid;

            // $findactivity=find('all','recent_activity','*','where product_id !="'.$pid.'" AND user_id="'.$userid.'"',array());
            // if($findactivity){
                $fields = "product_id,user_id";
                $values = ":product_id,:user_id";
                $exe = array(":product_id"=>$pid,":	user_id"=>$userid);
                // $save = save('recent_activity', $fields, $values, $exe);
            // }
        }

    }
   
    $result = array("status"=>'ok',
                    "findcat"=>$findcat,
                    "findsubcat"=>$findsubcat,
                    "formdatadata"=>$formdatadata,
                    "productname"=>$productarr,
                    "findsubcategory"=>$findsubcategory,
                    "updatesubcat" => $updatesubcat,
                    "productid"=>$save1,
                    "deleteproduct"=>$deleteproduct,
                    "savesub"=>$savesub,
                    // "productimage"=>$productimage,
                );
    echo json_encode($result);
?>