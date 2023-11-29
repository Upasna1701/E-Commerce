<?php
function setsessioncookie($id)
{
	if(isset($_SESSION["user_login_id"]))
	{
		$user_login_id= $_SESSION["user_login_id"];
		setcookie("user_login_id", $user_login_id, time() + (86400 * 30), "/");
	}
}

?>