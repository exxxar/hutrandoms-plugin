<?php

require_once("../../../wp-load.php");

if ( !is_user_logged_in() ) 
    die("error login");

global $wpdb;

if (isset($_POST["option"])){
$result = "";
    switch($_POST["option"]) {
        case "list":
            $dir = "uploads";
            $tmp = [];
            $files = scandir($dir);
            foreach($files as $file){
                if (strrpos(strtolower($file),".jpg")!=false||
                    strrpos(strtolower($file),".png")!=false||
                    strrpos(strtolower($file),".jpeg")!=false)
                    array_push($tmp,$file);
            }

            $result = json_encode($tmp); 
        break;
        case "delete":
            $file =$_POST["path"];
            
            if (file_exists("uploads/".$file))
                unlink("uploads/".$file);
            
           
        
    }
}

echo $result;