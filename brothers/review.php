<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    include('init.php');

    if($_SERVER['REQUEST_METHOD']=='POST')
    {
        $getdata = json_decode(file_get_contents("php://input"));
        //Add to cart

        if($getdata->fetchreviewdata == 'yes')
        {
            $prid=$getdata->prstarid;
            $userid=$getdata->userid;
            
            
            $findreview=find('all','login inner join product_review on login.Id=product_review.user_id','*,product_review.created_date as ddmmyyyy','where user_id="'.$userid.'" AND product_id="'.$prid.'" order by product_review.product_star desc',array());
            foreach($findreview as $k=>$v){
                $ddmmyyyy = date("d-m-Y",strtotime($v['ddmmyyyy']));
                $temparr = array("formateddate"=>$ddmmyyyy);
                $findreview[$k] = array_merge($findreview[$k],$temparr);
            }
            
            $findratingcount=find('first','product_review','count(product_id) as total_rating','where product_id="'.$prid.'"',array());
            $findreviewcount=find('first','product_review','count(product_id) as total_review','where product_id="'.$prid.'" AND product_review !=""',array());
            $findavg=find('first','product_review','AVG(product_star) as rating_average','where product_id="'.$prid.'"',array());
            $findfivestar=find('first','product_review','count(product_star) as five_review','where product_id="'.$prid.'" AND product_star="5"',array());
            
            $findfourstar=find('first','product_review','count(product_star) as four_review','where product_id="'.$prid.'" AND product_star="4"',array());
            $findthreestar=find('first','product_review','count(product_star) as three_review','where product_id="'.$prid.'" AND product_star="3"',array());
            $findstartwo=find('first','product_review','count(product_star) as two_review','where product_id="'.$prid.'" AND product_star="2"',array());
            $findonestar=find('first','product_review','count(product_star) as one_review','where product_id="'.$prid.'" AND product_star="1"',array());  

        }
        if($getdata->reviewdata == 'yes')
        {  
            $prstar=$getdata->prstar;
            $prid=$getdata->prstarid;
            $userid=$getdata->userid;
            $review=$getdata->review;
            
            $fields= "user_id,product_id,product_star,product_review";
            $values= ":user_id,:product_id,:product_star,:product_review";
            $exe= array(":user_id"=>$userid,":product_id"=>$prid,":product_star"=>$prstar,":product_review"=>$review);
            $save= save('product_review', $fields, $values, $exe);   
        }

    }
    $result = array("status"=>'ok',
                    "findreview"=>$findreview,
                    "ratingcount"=>$findratingcount["total_rating"],
                    "reviewcount"=>$findreviewcount["total_review"],
                    "averagerating"=>$findavg["rating_average"],
                    "fivereview"=>$findfivestar["five_review"],
                    "fourreview"=>$findfourstar["four_review"],
                    "threereview"=>$findthreestar["three_review"],
                    "tworeview"=>$findstartwo["two_review"],
                    "onereview"=>$findonestar["one_review"],
                );
    echo json_encode($result);
?> 