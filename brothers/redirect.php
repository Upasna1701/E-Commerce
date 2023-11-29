<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include('init.php');
if ($_SERVER['REQUEST_METHOD']=='POST'){
    $getdata = json_decode(file_get_contents("php://input"));

    if($getdata->navdata == 'yes')
    {
        $categoryid = $getdata->categoryid;
        $subcategoryid = $getdata->subcategoryid;

        $findnavdata=find('all','product','*','where product_for_id = "'.$categoryid.'" AND subcategory_id = "'.$subcategoryid.'" ',array());
    }
}
$result = array("findnavdata"=>$findnavdata);
echo json_encode($result);
?>