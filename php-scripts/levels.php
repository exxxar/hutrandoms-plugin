<?php

require_once("../../../../wp-load.php");

if ( !is_user_logged_in() ) 
    die("error login");

global $wpdb;

function refreshDiscount(){
    global $wpdb;
    $levels = $wpdb->get_results( "SELECT * FROM `wp_levels` ORDER BY `experience` ASC" );
    $count = count($levels);
    if ($count==0)
        return;
    
    if ($count>1) {        
        for($i=0;$i<$count-1;$i++){        
            $one = $levels[$i]->experience;
            $two = $levels[$i+1]->experience;
            $users =  $wpdb->get_results( "SELECT * FROM `wp_users` WHERE `experience` BETWEEN '$one' AND '$two' ORDER BY `experience` ASC" );
            if (count($users)>0)
                for($j=0;$j<count($users);$j++){
                     $discount = $levels[$i]->discount;
                     $id = $users[$j]->ID;
                     $wpdb->get_results( " UPDATE `wp_users` SET `discount`='$discount' WHERE `ID`='$id'");
                }
        }
        
        $experience = $levels[$count-1]->experience;
        $users =  $wpdb->get_results( "SELECT * FROM `wp_users` WHERE `experience`>='$experience' ORDER BY `experience` ASC" );

        if (count($users)>0)
            for($j=0;$j<count($users);$j++){
                 $discount = $levels[$count-1]->discount;
                 $id = $users[$j]->ID;

                 $wpdb->get_results( " UPDATE `wp_users` SET `discount`='$discount' WHERE `ID`='$id'");

            }

        
    }
    else {
            $experience = $levels[0]->experience;
            $users =  $wpdb->get_results( "SELECT * FROM `wp_users` WHERE `experience`>='$experience' ORDER BY `experience` ASC" );
           
            if (count($users)>0)
                for($j=0;$j<count($users);$j++){
                     $discount = $levels[0]->discount;
                     $id = $users[$j]->ID;
        
                     $wpdb->get_results( " UPDATE `wp_users` SET `discount`='$discount' WHERE `ID`='$id'");
   
                }
    }
}

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
        case "u_experience":
         $id = $_POST["id"];
         $experience = $_POST["experience"];
         $wpdb->get_results( " UPDATE `wp_levels` SET `experience`='$experience' WHERE `id`='$id'");
         $result = $wpdb->last_error;  
         refreshDiscount();
         break;
        case "u_discount":
         $id = $_POST["id"];
         $discount = $_POST["discount"];
         $wpdb->get_results( " UPDATE `wp_levels` SET `discount`='$discount' WHERE `id`='$id'");
         $result = $wpdb->last_error;  
         refreshDiscount();
         break;
        case "u_title":
         $id = $_POST["id"];
         $title = $_POST["title"];
         $wpdb->get_results( " UPDATE `wp_levels` SET `title`='$title' WHERE `id`='$id'");
         $result = $wpdb->last_error;
        
         break;
         case "u_level":
         $id = $_POST["id"];
         $level = $_POST["level"];
         $wpdb->get_results( " UPDATE `wp_levels` SET `level`='$level' WHERE `id`='$id'");
         $result = $wpdb->last_error;
         break;
         
            
    }
    echo $result;    
}
