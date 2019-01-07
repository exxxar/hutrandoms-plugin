   var data = [];

   function getConsole(a) {
       switch (a) {
           default:
           case "1":
               return "XBOX";
           case "2":
               return "PS4";
       }
   }
   $(document).ready(function () {
       $('select').formSelect();
       $('.tabs').tabs();
       $('.modal').modal();

       $("#save-options").click(function () {
           $("#card-preloader").css({
               "display": "flex"
           });
           var procent = $("#procent").val();
           var title = $("#title").val();
           var coins = $("#coins").val();
           var rub = $("#rub").val();
           var year = $("#year option:selected").val();

           $.post($("#server-path").attr("src") + "search.php", {
               option: "options",
               procent: procent,
               title: title,
               coins: coins,
               rub: rub,
               year: year
           }).then(function (a, b) {
               $("#card-preloader").css({
                   "display": "none"
               });
               location.reload();
           });

       });

       $(document).on('click','.slot',function(){
           console.log($(this).attr("data-url"));
           if ($(this).attr("data-url")!="")
                window.location = $(this).attr("data-url");
       });
       
       $(document).on('click', '.game-places', function () {
           $("#playing-field").empty();
           $("#game-preloader").css({
               "display": "block"
           });
           var id = $(this).attr("data-id");
           $.post($("#server-path").attr("src") + "search.php", {
               option: "places",
               id: id

           }).then(function (a, b) {
               var tmp = JSON.parse(a);
               /*
                               <div class="slot free"><p>1</p><a href=""><img src="<?php echo plugin_dir_url( __FILE__ ).'img/small-logo.jpg';?>" alt=""></a></div>
                               <div class="slot occupied"><p>2</p><a href=""><img src="https://pp.userapi.com/c845122/v845122201/15d50f/CZVL2ANyDjQ.jpg" alt=""></a></div>
                */


               for (var i = 0; i < tmp.max_places; i++) {
                   var user = (function (list, place) {
                       for (var u in list) {
                           if (list[u].place == place)
                               return list[u];
                       }
                       return null;
                   })(tmp.list, i);

                   $("#playing-field").append(`\
                             <div class="slot ${user==null?"free":"occupied"}" data-url="${user==null?"":user.user_url}"><p>${i+1}</p><a href=""><img src="${user==null?$("#server-path").attr("src")+"img/small-logo.jpg":user.avatar}" alt=""></a></div>\
                        `);

               }
               $("#game-preloader").css({
                   "display": "none"
               });
           });
       });

       $(document).on('click', '.refresh-cards', function () {
           $.post($("#server-path").attr("src") + "search.php", {
               option: "cardslist",
               page: $(this).attr("data-page-id"),
               lotsperpage: $("#lots-per-page").val()
           }).then(function (a, b) {
               var tmp = JSON.parse(a);
               $("#my-card-list").empty();
               $("#card-pagination").empty();

               for (var i = 0; i < tmp.pages; i++) {
                   if (i != tmp.current_page)
                       $("#card-pagination").append(`\
                              <li class="waves-effect"><a data-page-id="${i}" class="refresh-cards">${i+1}</a></li>\
                        `);
                   else
                       $("#card-pagination").append(`\
                              <li class="active"><a data-page-id="${i}" class="refresh-cards">${i+1}</a></li>\
                        `);

               }

               /*
               if (tmp.current_page != 0)
                   $("#card-pagination").prepend(`<li class="waves-effect"><a href="#!"><i class="material-icons">chevron_left</i></a></li>`);
               else
                   $("#card-pagination").prepend(`<li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>`);

               if (tmp.current_page < tmp.pages)
                   $("#card-pagination").append(`<li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>`);
               else
                   $("#card-pagination").append(`<li class="disabled"><a href="#!"><i class="material-icons">chevron_right</i></a></li>`);
               */


               for (var i in tmp.list) {

                   var curentProcent = (tmp.list[i].occupied_places / tmp.list[i].places) * 100;
                   $("#my-card-list").append(`\
                        <div class="item">\
                            <div class="wrapper">\   
                                ${tmp.list[i].card_code}\
                            </div>\
                            <div class="controlls">\
                                <div class="console-type">
                                    <p>${getConsole(tmp.list[i].console)}</p>
                                </div>
                                <button class="btn game-places modal-trigger" href="#game-places" data-id="${tmp.list[i].ID}"><i class="material-icons">apps</i></button>
                                <button class="modal-trigger card-info-btn btn" data-target="card-edit"><i class="material-icons">edit</i></button>\
                                <div class="loading">\
                                    <div class="progress-line" style="width:${curentProcent}%"></div>\
                                    <p class="progress-text">${Math.round(curentProcent)}%</p>\                                
                                </div>\
                            </div>\
                        </div>\
                   `);

               }

           });
       });


       $(document).on('click', '.ncard', function (e) {
           $(".player-popup-window").css({
               "display": "none"
           });
           $(".player-popup-window").empty();
       });

       $(document).on('mouseleave', '.player-popup-hint', function (e) {
           $(".player-popup-window").css({
               "display": "none"
           });
           $(".player-popup-window").empty();
       });

       $(document).on('click', '.add-card', function () {
           var btn = $(this);
           btn.css({
               "background-color": "#989898"
           });

           $.post($("#server-path").attr("src") + "search.php", {
               option: "addcard",
               id: $(this).attr("data-id"),
               card: $(this).attr("data-card"),
               league: $(this).attr("data-league"),
               player: $(this).attr("data-player"),
               cost: $("#cost" + $(this).attr("data-id")).val(),
               places: $("#places" + $(this).attr("data-id")).val(),
               console: $("[name='console" + $(this).attr("data-id") + "']:checked").val()
           }).then(function (a, b) {
               btn.css({
                   "background-color": "#CDDC39"
               });
               $("#refresh-cards").click();
           });
       });

       $(document).on('click', '.player-popup-hint', function () {
           $(".player-popup-window").empty();
           $("#card-preloader").css({
               "display": "flex"
           });
           var top = ($(this).last().offset().top - 200);
           var left = ($(this).last().offset().left - 100);
           $.post($("#server-path").attr("src") + "search.php", {
               option: "card",
               id: $(this).attr("data-id")

           }).then(function (a, b) {
               var tmp = JSON.parse(a);
               $(".player-popup-window").empty();
               var cardbody = tmp.value;
               console.log(cardbody);
               $(".player-popup-window").append(cardbody);
               $(".player-popup-window").css({
                   "display": "block",
                   "top": top + "px",
                   "left": left + "px"
               });
               $("#card-preloader").css({
                   "display": "none"
               });
           });
       });

       $(document).on('mouseover', '.player-popup-hint', function () {
           $(this).click();
       });

       $("a[data-value]").click(function () {
           $(".player-popup-window").css({
               "display": "none"
           });
           var order = $(this).attr("data-order") == undefined ||
               $(this).attr("data-order") == "ASC" ? 0 : 1;

           if (order == 0)
               $(this).attr({
                   "data-order": "DESC"
               });
           else
               $(this).attr({
                   "data-order": "ASC"
               });

           var value = $(this).attr("data-value");

           switch (value) {
               case "card":
                   data.sort(function (a, b) {
                       return order == 0 ?
                           a.Card.charCodeAt(0) - b.Card.charCodeAt(0) :
                           b.Card.charCodeAt(0) - a.Card.charCodeAt(0);
                   });
                   break;
               case "league":
                   data.sort(function (a, b) {
                       return order == 0 ?
                           a.League.charCodeAt(0) - b.League.charCodeAt(0) :
                           b.League.charCodeAt(0) - a.League.charCodeAt(0);
                   });
                   break;
               case "team":
                   data.sort(function (a, b) {
                       return order == 0 ?
                           a.Team.charCodeAt(0) - b.Team.charCodeAt(0) :
                           b.Team.charCodeAt(0) - a.Team.charCodeAt(0);
                   });
                   break;
               case "name":
                   data.sort(function (a, b) {
                       return order == 0 ?
                           a.Player.charCodeAt(0) - b.Player.charCodeAt(0) :
                           b.Player.charCodeAt(0) - a.Player.charCodeAt(0);
                   });
                   break;
               case "salary":
                   data.sort(function (a, b) {
                       return order == 0 ?
                           a.salary - b.salary :
                           b.salary - a.salary;
                   });
                   break;
               case "ovr":
                   data.sort(function (a, b) {
                       return order == 0 ?
                           a.OVR - b.OVR :
                           b.OVR - a.OVR;
                   });
                   break;
           }
           $('#cards-table').empty();
           for (var k in data) {
               if (k > 0) {
                   var multiline = `<tr>\
                                    <td>${data[k].Card}</td>\
                                    <td>${data[k].League}</td>\
                                    <td>${data[k].Team}</td>\
                                    <td><a class="player-popup-hint" data-id="${data[k].id}">${data[k].Player}</a></td>\
                                    <td>${data[k].salary}</td>\
                                    <td>${data[k].OVR}</td>\
                                    <td><input type="number" id="cost${data[k].id}" value="${data[k].salary}"></td>\
                                    <td><input type="number" id="places${data[k].id}" min="1" value="1"></td>\
                                    <td>\
                                        <div class="row">\
                                            <div class="col s6">\
                                                <label>\
                                                    <input class="with-gap" name="console${data[k].id}" type="radio" value="2" />\
                                                    <span>PS4</span>\
                                                  </label>\
                                            </div>\
                                            <div class="col s6">\
                                                <label>\
                                                    <input class="with-gap" name="console${data[k].id}" type="radio" value="1" />\
                                                    <span>XBOX</span>\
                                                  </label>\
                                            </div>\
                                        </div>\
                                    </td>\
                                    <td><button class="btn add-card" data-id="${data[k].id}" data-card="${data[k].Card}" data-league="${data[k].League}" data-player="${data[k].Player}" ><i class="material-icons">add</i></button></td>\
                                </tr>`;
                   $('#cards-table').append(multiline);

               }
           }
       });


       $("#search").click(function (e) {
           e.preventDefault();
           $("#card-preloader").css({
               "display": "flex"
           });
           $('#cards-table').empty();
           $(".player-popup-window").css({
               "display": "none"
           });
           var form = $("#basic-player-search").serialize();
           console.log(form);
           $.post($("#server-path").attr("src") + "search.php", {
               option: "search",
               data: form

           }).then(function (a, b) {
               while (data.length > 0) {
                   data.pop();
               }

               var tmp = JSON.parse(a);
               for (var item in tmp)
                   if (item > 0)
                       data.push(tmp[item]);

               for (var k in data) {
                   if (k > 0) {
                       var multiline = `<tr>\
                                    <td>${data[k].Card}</td>\
                                    <td>${data[k].League}</td>\
                                    <td>${data[k].Team}</td>\
                                    <td><a class="player-popup-hint" data-id="${data[k].id}">${data[k].Player}</a></td>\
                                    <td>${data[k].salary}</td>\
                                    <td>${data[k].OVR}</td>\
                                    <td><input type="number" id="cost{data[k].id}" value="${data[k].salary}"></td>\
                                    <td><input type="number" id="places${data[k].id}" min="1" value="1"></td>\
                                   <td>\
                                        <div class="row">\
                                            <div class="col s6">\
                                                <label>\
                                                    <input class="with-gap" name="console${data[k].id}" type="radio" value="2" />\
                                                    <span>PS4</span>\
                                                  </label>\
                                            </div>\
                                            <div class="col s6">\
                                                <label>\
                                                    <input class="with-gap" name="console${data[k].id}" type="radio" value="1" />\
                                                    <span>XBOX</span>\
                                                  </label>\
                                            </div>\
                                        </div>\
                                    </td>\
                                    <td><button class="btn add-card" data-id="${data[k].id}" data-card="${data[k].Card}" data-league="${data[k].League}" data-player="${data[k].Player}" ><i class="material-icons">add</i></button></td>\
                                </tr>`;
                       $('#cards-table').append(multiline);

                   }
               }


               $("#card-preloader").css({
                   "display": "none"
               });
           });
       });
       $("#search").click();
       $("#refresh-cards").click();
   });
