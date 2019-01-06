<?php
/*
Plugin Name: NHL КАРТОЧКИ
Plugin URI: 
Description: система управления карточка из HUTDB
Version: 1.0
Author: Алексей Гукай
Author URI: http://vk.com/exxxar

Copyright 2018  Алексей Гукай  (email: exxxar@gmail.com)

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

register_activation_hook( __FILE__, 'hutrandoms_install' ); 
register_deactivation_hook( __FILE__, 'hutrandoms_deactivation' );


add_action( 'admin_menu', 'register_hut_randoms_page_menu_page' );


function register_hut_randoms_page_menu_page(){
	add_menu_page( 
		'HUT RANDOMS MENU', 'HUTRandoms', 'manage_options', 'hutrandoms/index.php', '', '
        dashicons-admin-users', 4 
	);
}



function hutrandoms_install(){

}



function hutrandoms_deactivation() {
			
}

