<?php

require_once("../../../../wp-load.php");

if ( !is_user_logged_in() ) 
    die("error login");

global $wpdb;

if (isset($_POST["option"])){
    $result = "";
    switch($_POST["option"]) {
        case "userslist": 
       
            $users_per_page = 10;//количество выводимых карточек на странице
            switch($_POST["usersperpage"]){
                default:
                case "1": $users_per_page = 10; break;
                case "2": $users_per_page = 20; break;
                case "3": $users_per_page = 30; break;
                case "4": $users_per_page = 50; break;
                case "5": $users_per_page = 100; break;
                    
            }
            $page = $_POST["page"]*$users_per_page;
            $users_count = ($wpdb->get_results( "SELECT count(*) as length FROM `wp_users`" ))[0]->length;
            $page_count = 0;
                switch($users_count % $users_per_page) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        $page_count = round($users_count / $users_per_page)+1;
                    break;
                    case 0:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                         $page_count = round($users_count / $users_per_page);
                    break;
                }
            $sortby = "";
                switch($_POST["sort"]){
                    default:
                    case 0:
                         $sortby = "ORDER BY `ID` ASC"; break;
                    case 1:
                         $sortby = "ORDER BY `ID` DESC"; break;
                    case 2:
                         $sortby = "ORDER BY `user_nicename` ASC"; break;
                    case 3:
                         $sortby = "ORDER BY `user_nicename` DESC"; break;
                    case 8:
                         $sortby = "ORDER BY `user_email` ASC"; break;
                    case 9:
                         $sortby = "ORDER BY `user_email` DESC"; break;
                    case 4:
                         $sortby = "ORDER BY `coins` ASC"; break;
                    case 5:
                         $sortby = "ORDER BY `coins` DESC"; break;
                    case 6:
                         $sortby = "ORDER BY `discount` ASC"; break;
                    case 7:
                         $sortby = "ORDER BY `discount` DESC"; break;       
                    case 10:
                         $sortby = "ORDER BY `experience` ASC"; break;
                    case 11:
                         $sortby = "ORDER BY `experience` DESC"; break;  
                        
                }
            $result = json_encode(["list"=>$wpdb->get_results( "SELECT * FROM `wp_users` $sortby LIMIT $users_per_page OFFSET $page " ),"pages"=>$page_count,"current_page"=>$_POST["page"]]);    
           
         break;
        case "get":
           $id = $_POST["id"];
            $content = $wpdb->get_results( "SELECT * FROM `wp_users`  WHERE `ID`='$id'" );
        
            $result = json_encode($result);
         break;
        case "remove":
           $id = $_POST["id"];
            if ($id!=get_current_user_id()) 
                $wpdb->get_results( "DELETE FROM `wp_users` WHERE `ID`='$id'");
            else
                $result = -1;
         break;
        case "update":
           /* $id = $_POST["id"];
            $user_login = $_POST["user_login"];
            $user_pass = $_POST["user_pass"];
            $avatar = $_POST["avatar"];
            $domain = $_POST["domain"];
            $user_email = $_POST["user_email"];
            $user_url = $_POST["user_url"];
            $coins = $_POST["coins"];
            $discount = $_POST["discount"];           
            
          
            $wpdb->get_results( "UPDATE `wp_cards` SET `price`='$price',`places`='$places',`end_date`='$datetime',`console`='$console',`in_game`='$ingame' WHERE `ID`='$id'");
            $result = $wpdb->last_error;   */
            
         break;
         case "adduser":
            $user_login = $_POST["user_login"];
            $user_pass = $_POST["user_pass"];
            $user_nicename = $_POST["user_nicename"];
            $display_name = $_POST["display_name"];
            $avatar = $_POST["avatar"];
            $user_email = $_POST["user_email"];
            $is_admin = $_POST["is_admin"];
            
            $wpdb->get_results( "INSERT INTO `wp_users` (`user_login`, `user_pass`, `user_nicename`, `user_email`, `avatar`,`user_status`) VALUES ('$user_login', MD5('$user_pass'), '$user_nicename', '$user_email','$avatar', '0');");
            
            if ($is_admin==1){
                 $wpdb->get_results(" INSERT INTO `wp_usermeta` (`umeta_id`, `user_id`, `meta_key`, `meta_value`) VALUES (NULL, (Select max(id) FROM `wp_users`), 'wp_capabilities', 'a:1:{s:13:\"administrator\";s:1:\"1\";}');");
                 $wpdb->get_results(" INSERT INTO `wp_usermeta` (`umeta_id`, `user_id`, `meta_key`, `meta_value`) VALUES (NULL, (Select max(id) FROM `wp_users`), 'wp_user_level', '10');" );
            }
            $result = $wpdb->last_error; 
            
         break;
        case "addexperience":
         $id = $_POST["id"];
         $experience = $_POST["experience"];
         $wpdb->get_results( " UPDATE `wp_users` SET `experience`='$experience' WHERE `ID`='$id'");
         $result = $wpdb->last_error;  
         break;
        case "adddiscount":
         $id = $_POST["id"];
         $discount = $_POST["discount"];
         $wpdb->get_results( " UPDATE `wp_users` SET `discount`='$discount' WHERE `ID`='$id'");
         $result = $wpdb->last_error;  
         break;
        case "addcoins":
         $id = $_POST["id"];
         $coins = $_POST["coins"];
         $wpdb->get_results( " UPDATE `wp_users` SET `coins`='$coins' WHERE `ID`='$id'");
         $result = $wpdb->last_error;
        
         break;
            
    }
    echo $result;    
}


    