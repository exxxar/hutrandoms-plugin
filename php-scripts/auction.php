<?php

require_once("../../../../wp-load.php");

if ( !is_user_logged_in() ) 
    die("error login");

global $wpdb;

if (isset($_POST["option"])){
    $result = "";
    switch($_POST["option"]) {
        case "list": 
            $result = json_encode(["list"=>$wpdb->get_results( "SELECT * FROM `wp_levels`" )]);    
         break;
        case "get":
           $id = $_POST["id"];
            $content = $wpdb->get_results( "SELECT * FROM `wp_levels`  WHERE `id`='$id'" );
            $result = json_encode($result);
         break;
        case "remove":
           $id = $_POST["id"];
            if ($id!=get_current_user_id()) 
                $wpdb->get_results( "DELETE FROM `wp_levels` WHERE `id`='$id'");
            else
                $result = -1;
         break;
        case "update":
            $id = $_POST["id"];
            $title = $_POST["title"];
            $experience = $_POST["experience"];
            $level = $_POST["level"];
            $discount = $_POST["discount"];   
          
            $wpdb->get_results( "UPDATE `wp_levels` SET `title`='$title',`experience`='$experience',`level`='$level',`discount`='$discount' WHERE `id`='$id'");
            $result = $wpdb->last_error;   
            refreshDiscount();
         break;
         case "insert":
            $title = $_POST["title"];
            $experience = $_POST["experience"];
            $level = $_POST["level"];
            $discount = $_POST["discount"];  
            $wpdb->get_results( "INSERT INTO `wp_levels` (`title`, `experience`, `level`, `discount`) VALUES ('$title', '$experience', '$level', '$discount');");
            $result = $wpdb->last_error; 
            refreshDiscount();
         break;        
            
    }
    echo $result;    
}
