<?php

require_once("../../../wp-load.php");

global $wpdb;
function optionAddOrUpdate($option_name,$option_value){
    if ( get_option($option_name)!=false||strlen(trim(get_option($option_name)))==0 ) {
        update_option($option_name, $option_value);
      } else {
        add_option($option_name, $option_value);
     }
}
if (isset($_POST["option"])){
$result = "";
    switch($_POST["option"]) {
        case "options":
            $procent = $_POST["procent"];
            $title= $_POST["title"];
            $coins= $_POST["coins"];
            $rub= $_POST["rub"]; 
            $year = $_POST["year"]; 
            
            optionAddOrUpdate("hut_procent",$procent);
            optionAddOrUpdate("hut_title",$title);
            optionAddOrUpdate("hut_coins",$coins);
            optionAddOrUpdate("hut_rub",$rub);
            optionAddOrUpdate("hut_year",$year);
            $result =get_option("hut_procent")." ".get_option("hut_title")." ".get_option("hut_coins")." ".get_option("hut_rub")." ".get_option("hut_year");
            break;
        case "search":
            $tmp = "";
            $stype = "";
            $scard = "";
            $pos = "";
            $hgt="";
            $year = get_option("hut_year")!=false?get_option("hut_year"):19;
            $post = preg_split("/[&]+/", $_POST["data"]);
            foreach($post as $item){
                $i = preg_split("/[=]+/", $item);
                if (strlen($i[1])>0&&strtolower($i[1])!="any"){
                    switch($i[0]){
                        case "hgt":
                            $hgt .=$i[1].",";
                            break;
                        case "pos":
                            $pos .=$i[1].",";
                            break;
                        case "stype":
                            $stype .=$i[1].",";
                            break;
                        case "scard":
                            $scard .=$i[1].",";
                            break;
                        default:
                             $tmp .="&".$i[0]."=".$i[1];
                             break;
                    }
                   
                }   
            }
            $tmp .= "&year=".$year;       
            
            if (strlen($hgt)>0)
                $tmp .= "&hgt=".rtrim($hgt, ",");
             if (strlen($stype)>0)
                $tmp .= "&stype=".rtrim($stype, ",");
             if (strlen($scard)>0)
                $tmp .= "&scard=".rtrim($scard, ",");
             if (strlen($pos)>0)
                $tmp .= "&pos=".rtrim($pos, ",");            
           
            //echo $tmp;
            $content = file_get_contents("https://hutdb.net/ajax/stats.php?selected=OVR".$tmp);

            //$data = json_decode($content) ;
             
            $result = $content;
        break;
        case "card":
            $id = $_POST["id"];
            $content = file_get_contents("https://hutdb.net/ajax/id.php?size=0&id=".$id);
             $content = str_replace("/assets" , "https://hutdb.net/assets", json_decode($content)->value  );  
           $result = json_encode(["value"=>$content]);
        break;
        case "cardslist":
            
            $cards_on_page = 10;//количество выводимых карточек на странице
            switch($_POST["lotsperpage"]){
                default:
                case "1": $cards_on_page = 10; break;
                case "2": $cards_on_page = 20; break;
                case "3": $cards_on_page = 30; break;
                case "4": $cards_on_page = 50; break;
                case "5": $cards_on_page = 100; break;
                    
            }
            $page = $_POST["page"]*$cards_on_page;
            $page_count = round((($wpdb->get_results( "SELECT count(*) as length FROM `wp_cards`" ))[0]->length/$cards_on_page)+1);
            
            $result = json_encode(["list"=>$wpdb->get_results( "SELECT * FROM `wp_cards` LIMIT $cards_on_page OFFSET $page" ),"pages"=>$page_count,"current_page"=>$_POST["page"]]);    
        break;    
        case "addcard":
          $id = $_POST["id"];
          $card = $_POST["card"]; 
          $league = $_POST["league"]; 
          $player = $_POST["player"]; 
          $base_cost = $_POST["cost"]; //умножить на коэффициент
          $price =  $base_cost+($base_cost*(get_option("hut_procent")!=false?get_option("hut_procent"):0.05));
          $places = $_POST["places"];
          $console =  $_POST["console"];
          $date_start = date("Y-m-d H:i:s"); 
            
          
          $content = file_get_contents("https://hutdb.net/ajax/id.php?size=0&id=".$id);
          $content = str_replace("/assets" , "https://hutdb.net/assets", json_decode($content)->value  );  
          $content = str_replace("'" , "",$content);
        
           $wpdb->query( "INSERT INTO `wp_cards`(`card_id`, `player`, `card_type`, `league`, `card_code`, `base_cost`, `price`,`console`,`in_game`, `places`, `occupied_places`, `win_user_id`, `winplace`, `random`, `signature`, `start_date`, `end_date`) VALUES ('$id','$player','$card','$league','$content','$base_cost','$price','$console','1','$places','0','0','0','','','$date_start','0000-00-00 00:00:00')" );
            
          $result = $wpdb->last_error;
        break;
        case "places":
            $id = $_POST["id"];
            $content = $wpdb->get_results( "SELECT * FROM `wp_cards`  WHERE `ID`='$id'" );
        
            
            $max_places = $content[0]->places;
            $occupied_places = $content[0]->occupied_places;
            $win_user_id = $content[0]->win_user_id;
            $win_place = $content[0]->win_place;
            $start_date =$content[0]->start_date; 
            $end_date =$content[0]->end_date;
            $card_id = $content[0]->ID;
            
            $content = null;
            
            $result = [];
            if ($occupied_places>0){
                  $content = $wpdb->get_results( "SELECT `wp_game`.*,`wp_users`.`avatar`,`wp_users`.`user_url` FROM `wp_game` INNER JOIN `wp_users` ON `wp_users`.`ID`=`wp_game`.`user_id` WHERE `card_id`='$card_id'" );
                  $result["list"]=$content;
            }
            
            $result["card_id"]=$card_id;
            $result["max_places"]=$max_places;
            $result["occupied_places"]=$occupied_places;
            $result["win_user_id"]=$win_user_id;
            $result["win_place"]=$win_place;
            $result["start_date"]=$start_date;
            $result["end_date"]=$end_date;
            
            $result = json_encode($result);
        break;
    }
    echo $result;
}
