<?php include("init.php"); ?>
<html>
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>
<?php 
$table= "users";
$email = "";
$pass= "";
$user_id="";
$nameofbutton= "Register";
   if(isset($_POST["Register"]))
   {
        $email = stripcleantohtml($_POST["email"]); //stripcleantohtml($s)
        $pass= stripcleantohtml($_POST["password"]);
        $satus= "Y";
        $fields= "email,password,status";
        $values= ":email,:password,:status";
        $exe= array(":email"=>$email,":password"=>$pass,":status"=>$satus);
        $save= save($table, $fields, $values, $exe);
   }
  if(isset($_POST["edit"]))
   {
       $user_id= stripcleantohtml($_POST["user_id"]);
       $finduser=find("first", $table, '*', " where user_id='$user_id'", array());
       $email = $finduser["email"];
       $pass= $finduser["password"];
       $nameofbutton= "Update";
   }

   if(isset($_POST["Update"]))
   {
        $email = stripcleantohtml($_POST["email"]);
        $pass= stripcleantohtml($_POST["password"]);
        $user_id= $_POST["user_id"];
        $set_value = "email=:email ,password=:password";
        $where_clause = " where user_id='$user_id'";
        $execute= array(":email"=>$email,":password"=>$pass);
        $update= update($table, $set_value, $where_clause, $execute);
   }
   if(isset($_POST["del"]))
   {
    $user_id= stripcleantohtml($_POST["user_id"]);
    $where_clause = " where user_id='$user_id'";
    $execute= array();
    $delete= delete($table, $where_clause, $execute); //delete($table, $where_clause, $execute)
   }
   $findusertable=find("all", $table, '*', " where 1 ", array()); //find($type, $table, $value='*', $where_clause, $execute);

?>
<body>
<div class="col-md-12">
<div class="col-md-4">
<div class="card" style="padding:5px;">
    <form action="" Method="POST">
    <input type="text" value="<?php echo $user_id; ?>" name="user_id" style="display:none;">
        <input type="email" name="email"  class=" form-control" required style="margin-top:5px;" value="<?php echo $email; ?>"/>
        <input type="text" name="password" class="form-control " required style="margin-top:5px;" value="<?php echo $pass; ?>">
        <input type="submit" name="<?php echo $nameofbutton;  ?>" value="<?php echo $nameofbutton;  ?>" class="btn btn-success" style="margin-top:5px;">
    </form>
</div>
</div>
<!-- <div class="col-md-8">
   <table class="table">
   <tr> <th>Email</th><th>Password</th><th>action</th></tr>

<?php foreach($findusertable as $key=>$val) { ?>
   <tr>
    <td><?php echo $val["email"]; ?></td>
    <td><?php echo $val["password"]; ?></td>
    <td>
        <form action="" method="POST">
            <input type="text" name="user_id" value="<?php echo $val["user_id"]; ?>" style="display:none;">
            <input type="submit" name="edit" value="edit" class="btn btn-info">
        </form>
        <form action="" method="POST">
            <input type="text" name="user_id" value="<?php echo $val["user_id"]; ?>" style="display:none;">
            <input type="submit" name="del" value="delete" class="btn btn-danger">
        </form>

    </td>
   </tr>
<?php } ?>
   </table>
</div> -->
</div>

<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>
</html>