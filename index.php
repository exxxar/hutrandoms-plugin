<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo plugin_dir_url( __FILE__ ).'style.css';?>">
    <link rel="stylesheet" href="<?php echo plugin_dir_url( __FILE__ ).'cardstyle.css';?>">
    <title>Админка</title>
    <meta id="server-path" src="<?php echo plugin_dir_url( __FILE__ );?>">
</head>

<body>
    <div class="row">
        <div class="col s12">
            <ul class="tabs">
                <li class="tab col s3"><a class="active" href="#cards-admin">Карточки</a></li>
                <li class="tab col s3"><a href="#users-admin">Пользователи</a></li>
                <li class="tab col s3 disabled"><a href="#auction-admin">Аукцион</a></li>
                <li class="tab col s3"><a href="#mail-admin">Рассылка</a></li>
            </ul>
        </div>
        <div id="cards-admin" class="col s12">
            <h4>Мои параметры</h4>
            <div class="row">
                <div class="input-field col s3 m3 l2">
                    <label for="procent">Мой процент, %</label>
                    <input type="number" id="procent" value="<?php echo get_option("hut_procent")!=false?get_option("hut_procent"):"0";?>">
                </div>
                <div class="input-field col s3 m3 l2">
                    <label for="title">Название валюты</label>
                    <input type="text" id="title" value="<?php echo get_option("hut_title")!=false?get_option("hut_title"):"pucks";?>">
                </div>
                <div class="input-field col s3 m3 l2">
                    <label for="coins">Курс обмена, монеты</label>
                    <input type="number" id="coins" value="<?php echo get_option("hut_coins")!=false?get_option("hut_coins"):"0";?>">
                </div>
                <div class="input-field col s3 m3 l2">
                    <label for="rub">Курс обмена, рубли</label>
                    <input type="number" id="rub" value="<?php echo get_option("hut_rub")!=false?get_option("hut_rub"):"0";?>">
                </div>               
            </div>
            <div class="row">
                <div class="col s12"><button class="btn" id="save-options">Сохранить</button></div>
            </div>
            
            <hr>
            <h4>Поиск карточек</h4>
            <form id="basic-player-search" method="post" action="">
                <div class="stats-left">
                    <div class="row">
                        <div class="col s2"><label>Sort</label></div>
                        <div class="input-field col s9">
                            <select id="sort" name="sort">
                                <option value="DESC" selected>По убыванию</option>
                                <option value="ASC">По возрастанию</option>
                            </select>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col s2"><label>Player</label></div>
                        <div class="input-field col s9">
                            <input type="text" id="player" name="player" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s2"><label>League</label></div>
                        <div class="col s9">
                            <div class="input-field">
                                <select id="league" name="league">
                                    <option>Any</option>
                                    <option>NHL</option>
                                    <option>SHL</option>
                                    <option>Liiga</option>
                                    <option>AHL</option>
                                    <option>NL</option>
                                    <option>OHL</option>
                                    <option>DEL</option>
                                    <option>ELH</option>
                                    <option>EBEL</option>
                                    <option>CHL</option>
                                    <option>ECHL</option>
                                    <option>Allsvenska</option>
                                    <option>WHL</option>
                                    <option>QMJHL</option>
                                    <option>National</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s2"><label>Position</label></div>
                        <div class="col s9">
                            <div class="input-field">
                                <select name="pos" multiple="multiple" id="pos" placeholder="Select Position">
                                    <option value="LW">Left Wing</option>
                                    <option value="C">Center</option>
                                    <option value="RW">Right Wing</option>
                                    <option value="LD">Left Defensemen</option>
                                    <option value="RD">Right Defensemen</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s2"><label>Shoots</label></div>
                        <div class="col s9">
                            <div class="input-field">
                                <select id="shoots" name="shoots">
                                    <option>Any</option>
                                    <option>Left</option>
                                    <option>Right</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s2 "><label>Height</label></div>
                        <div class="col s9">
                            <div class="input-field">
                                <select name="hgt" multiple="multiple" id="hgt" placeholder="Select Height">
                                    <option>Any</option>
                                    <?php
                           
                             for($i=9;$i>=0;$i--){
                                echo " 
                                    <option value=\"6'$i\">6'$i</option>
                                ";
                            }
                             for($i=11;$i>=5;$i--){                               
                                echo " 
                                    <option value=\"5'$i\">5'$i</option>
                                ";
                            }
                            ?>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s2"><label>Synergy</label></div>
                        <div class="col s9">
                            <div class="input-field">
                                <select type="text" id="synergy" name="synergy" multiple="multiple" value="" placeholder="Select Synergy">
                                    <?php
                            $content = file_get_contents("https://hutdb.net//ajax/synergies.php?year=19");

                            $data = json_decode($content) ;
                             foreach ($data->synergies as $option){
                                 echo "<option value='".$option->abr."'>".$option->abr." - ".$option->name.""."</option>";
                             }
                            
                            ?>

                                </select>
                            </div>
                        </div>
                    </div>
                </div><!-- END .stats-left -->
                <div class="stats-right">
                    <div class="row">
                        <div class="col s2"><label>Year</label></div>
                        <div class="input-field col s9">
                            <select id="year" name="year">
                                <option value="19" selected>2019</option>
                                <option value="18">2018</option>
                            </select>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col s2"><label>Overall</label></div>
                        <div class="col s4"><input type="text" cid="ovrmin" placeholder="MIN"></div>
                        <div class="col s4 offset-1"><input type="text" id="ovrmax" placeholder="MAX"></div>
                    </div>
                    <div class="row">
                        <div class="col s2"><label>Team</label></div>
                        <div class="col s9">
                            <div class="input-field">
                                <select id="team" name="team">
                                    <option>Any</option>

                                    <?php
                            $content = file_get_contents("https://hutdb.net/ajax/get_teams.php?year=19&league=any");

                            $data = json_decode($content) ;
                             foreach ($data as $option){
                                 echo "<option value='".$option->FTN."'>".$option->FTN.""."</option>";
                             }
                            
                            ?>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s2"><label>Type</label></div>
                        <div class="col s9">
                            <div class="input-field">
                                <select name="stype" multiple="multiple" id="stype" placeholder="Select Type">
                                    <option value="PLY">Playmaker</option>
                                    <option value="PWF">Power Forward</option>
                                    <option value="TWF">Two-Way Forward</option>
                                    <option value="TWD">Two-Way Defensemen</option>
                                    <option value="OFD">Offenive Defensemen</option>
                                    <option value="SNP">Sniper</option>
                                    <option value="DFD">Defensive Defesemen</option>
                                    <option value="GRN">Grinder</option>
                                    <option value="ENF">Enforcer</option>
                                </select>

                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s2"><label>Card</label></div>
                        <div class="col s9">
                            <div class="input-field">
                                <select name="scard" multiple="multiple" id="scard" placeholder="Select Card">

                                    <option value="sGold">Rare Gold</option>
                                    <option value="Gold">Gold</option>
                                    <option value="sSilver">Rare SIlver</option>
                                    <option value="Silver">Silver</option>
                                    <option value="sBronze">Rare Bronze</option>
                                    <option value="Bronze">Bronze</option>
                                    <option value="TOTW">Team of the Week (Gold)</option>
                                    <option value="STOTW">Team of the Week (Silver)</option>
                                    <option value="BTOTW">Team of the Week (Bronze)</option>
                                    <option value="LGD">Legends</option>
                                    <option value="ROOK">Rookies</option>
                                    <option value="COVER">Cover</option>
                                    <option value="ALM">Alumni</option>
                                    <option value="CS">Competitive Seasons</option>
                                    <option value="HC">Hut Champion</option>
                                    <option value="DC">Draft Champions</option>
                                    <option value="GAT">Gatorade</option>
                                    <option value="EVO">Evolution</option>
                                    <option value="PT">Prime Time</option>
                                    <option value="MS">Milestone</option>
                                    <option value="HWN">Halloween</option>
                                    <option value="MSP">Master Set Player</option>
                                    <option value="GSCGE">Global Series Germany</option>
                                    <option value="GSCFI">Global Series Finland</option>
                                    <option value="GSCSE">Global Series Sweden</option>
                                    <option value="GSCSI">Global Series Switzerland</option>
                                    <option value="TG">Thanksgiving</option>
                                    <option value="DIAM">DIamond</option>
                                    <option value="XMAS">Christmas</option>
                                    <option value="IPOTG">International Player of the Game</option>
                                    <option value="WC">Winter Classic</option>
                                    <option value="EVO2">Evolution 2</option>

                                </select>

                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s2"><label>Weight</label></div>
                        <div class="col s4"><input type="text" id="wgtmin" name="wgtmin" placeholder="MIN"></div>
                        <div class="col s4 offset-1"><input type="text" id="wgtmax" name="wgtmax" placeholder="MAX"></div>
                    </div>
                    <div class="row">
                        <div class="col s2"><label>Nationality</label></div>
                        <div class="col s9">
                            <div class="input-field">
                                <select id="nationality" name="nationality">
                                    <option>Any</option>
                                    <option>Australia</option>
                                    <option>Austria</option>
                                    <option>Belarus</option>
                                    <option>Belgium</option>
                                    <option>Canada</option>
                                    <option>Cezech Republic</option>
                                    <option>Croatia</option>
                                    <option>Czech Republic</option>
                                    <option>Denmark</option>
                                    <option>England</option>
                                    <option>Estonia</option>
                                    <option>Finland</option>
                                    <option>France</option>
                                    <option>Germany</option>
                                    <option>Hungary</option>
                                    <option>Italy</option>
                                    <option>Latvia</option>
                                    <option>Liberia</option>
                                    <option>Lithuania</option>
                                    <option>Netherlands</option>
                                    <option>Norway</option>
                                    <option>Poland</option>
                                    <option>Romania</option>
                                    <option>Russia</option>
                                    <option>Slovakia</option>
                                    <option>Slovenia</option>
                                    <option>Sweden</option>
                                    <option>Switzerland</option>
                                    <option>Ukraine</option>
                                    <option>USA</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div><!-- END .stats-right -->
                <div class="footer">
                    <div class="row">
                        <div class="col  s6 m6 l3"> <button id="search" type="button" class="waves-effect waves-light btn">Найти карточки</button></div>
                        <div class="input-field col  s6 m6 l3">
                            <label for="page">Страница</label>
                            <input type="number" min="0" step="1" id="page" name="page" value="0">
                        </div>
                    </div>
                </div>

            </form>

            <div class="table">
                <div class="row">
                    <div class="col s12">
                        <table>
                            <thead>
                                <th><a data-value="card">Card</a></th>
                                <th><a data-value="league">League</a></th>
                                <th><a data-value="team">Team</a></th>
                                <th><a data-value="name">Name</a></th>
                                <th><a data-value="salary">Salary</a></th>
                                <th><a data-value="ovr">OVR</a></th>
                                <th>Цена карточки</th>
                                <th>Кол-во мест</th>
                                <th>Действия</th>
                            </thead>
                        </table>


                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                        <div class="results">
                            <table id="cards-table">
                                <tbody>


                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col s12">
                    <h3>Мои лоты <a id="refresh-cards" class="refresh-cards" data-page-id="0"><i class="small material-icons">autorenew</i></a></h3>
                    <div class="row">
                        <div class="input-field col s12">                          
                            <select id="lots-per-page">
                                <option value="1" selected>10</option>
                                <option value="2">20</option>
                                <option value="3">30</option>
                                <option value="4">50</option>
                                <option value="5">100</option>
                            </select>
                              <label for="lots-per-page">Количество лотов на страницу</label>
                        </div>
                    </div>

                    <div class="table" id="my-card-list">


                    </div>
                    <ul id="card-pagination" class="pagination">

                    </ul>
                </div>
            </div>


        </div>
        <div id="users-admin" class="col s12">Test 2</div>
        <div id="auction-admin" class="col s12">Test 3</div>
        <div id="mail-admin" class="col s12">Test 4</div>
    </div>

    <!-- Модалка для карточек -->
    <div class="player-popup-window">

    </div>


    <!-- Модалка для редактирования информации по карточкам -->
    <div id="card-edit" class="modal">
        <div class="modal-content">
            <h4>Карточка</h4>
            <p>A bunch of text</p>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="<?php echo plugin_dir_url( __FILE__ ).'main.js';?>"></script>

</body>

</html>