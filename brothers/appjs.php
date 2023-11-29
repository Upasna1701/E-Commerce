<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    include('init.php');

    if($_SERVER['REQUEST_METHOD']=='POST')
    {
        $getdata = json_decode(file_get_contents("php://input"));

        if($getdata->fetchcatsub == 'yes')
        {
            $findsubman = find('all','sub_category inner join product_for on product_for.id=sub_category.product_for_id','*','where 1 ',array());
            $findcategoryforapp = find('all','product_for','*','where 1 ',array());
            $findurl=find('all','product inner join product_for on product.product_for_id=product_for.id inner join sub_category on product.subcategory_id=sub_category.subcategory_id','*','where 1',array());
            foreach($findurl as $k=>$v){
                $cat=$v["category"];
                $subcat=$v["product_name"];
                $prname= str_replace(" ","-",$v["pro_name"]);
                $fullproname = $cat."-".$subcat."-".$prname;
                $ffarr=array("pathname"=>$fullproname);
                $findurl[$k]=array_merge($findurl[$k],$ffarr);
                
            }
            // print_r($findurl);
        }
    }
    
    $sd = $getdata->sd;
    $tbl = "sub_category inner join product_for on sub_category.product_for_id=product_for.id";
    $searchresult=find('all',$tbl,'*',"WHERE product_name LIKE '$sd%' OR product_name LIKE '%$sd' OR product_name LIKE '%$sd%';",array());

    $result = array(
                        "status"=>'ok',
                        "findsubman"=>$findsubman,
                        "findcategoryforapp"=>$findcategoryforapp,
                        "searchresult"=>$searchresult,
                        "findurl"=>$findurl
                    );
    echo json_encode($result);
?>