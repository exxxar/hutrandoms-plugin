   var data = [];

   function getConsole(a) {
       switch (a) {
           default:
           case "1":
               return "PS4";
           case "2":
               return "XBOX";
       }
   }

   function getCardCodeByID(id) {
       $.post($("#server-path").attr("src") + "search.php", {
           option: "card",
           id: id

       }).then(function (a, b) {
           var tmp = JSON.parse(a);
           $("#card-bg" + id).empty();
           $("#card-bg" + id).html(tmp.value);
       });

   }

   $(document).ready(function () {
       $('select').formSelect();
       $('.tabs').tabs();
       $('.modal').modal();
       $('.dropdown-trigger').dropdown();


       $(".save-modified-card-data").click(function () {
           var price = $("#edited-price").val();
           var id = $("#edited-id").val();
           var places = $("#edited-places").val();
           var datetime = ($("#edited-end-date").val().trim() == "" ? "0000-00-00" : $("#edited-end-date").val()) + " " + $("#edited-end-time").val();
           var console = $("#edited-console option:selected").val();

           var ingame = $("#edited-in-game").is(":checked") ? 1 : 0;

           $.post($("#server-path").attr("src") + "search.php", {
               option: "update",
               id: id,
               price: price,
               places: places,
               datetime: datetime,
               console: console,
               ingame: ingame

           }).then(function (a, b) {});

       });
       $(document).on('click', '.card-info-btn', function () {
           $("#card-data").css({
               "display": "none"
           });
           $("#card-data-preloader").css({
               "display": "flex"
           });
           var id = $(this).attr("data-id");
           $.post($("#server-path").attr("src") + "search.php", {
               option: "get",
               id: id
           }).then(function (a, b) {
               var tmp = JSON.parse(a)[0];
               $("#edited-price").val(tmp.price);
               $("#edited-id").val(tmp.ID);
               $("#edited-places").val(tmp.places);
               $("#edited-occupied-place").val(tmp.occupied_places);
               $("#edited-end-time").val(tmp.end_date.split(' ')[1]);
               $("#edited-end-date").val(tmp.end_date.split(' ')[0]);
               $("#edited-console").val(tmp.console);
               $('#edited-console').formSelect();
               if (tmp.in_game == "1")
                   $("#edited-in-game").prop("checked", true);
               else
                   $("#edited-in-game").prop("checked", false);

               $("#card-data-preloader").css({
                   "display": "none"
               });
               $("#card-data").css({
                   "display": "block"
               });
           });
       });
       $(".remove-cards").click(function () {
           if (confirm("Данное действие удалит карточки с играми из базы данных! Продолжить?"))
               $("#my-card-list > .item .click-area.check").each(function (i, e) {
                   var id = $(e).attr("data-id");
                   $.post($("#server-path").attr("src") + "search.php", {
                       option: "remove",
                       id: id
                   }).then(function (a, b) {
                       $(".item[data-id='" + id + "']").remove();
                   });
               });
       });

       $(".finish-cards").click(function () {
           $("#my-card-list > .item .click-area.check").each(function (i, e) {
               var id = $(e).attr("data-id");
               $.post($("#server-path").attr("src") + "search.php", {
                   option: "finish",
                   id: id
               }).then(function (a, b) {
                   if ($("#lot-in-game").is(':checked'))
                       $(".item[data-id='" + id + "']").remove();
               });
           });
       });

       $(".beign-cards").click(function () {
           $("#my-card-list > .item .click-area.check").each(function (i, e) {
               var id = $(e).attr("data-id");
               $.post($("#server-path").attr("src") + "search.php", {
                   option: "begin",
                   id: id
               }).then(function (a, b) {
                   if (!$("#lot-in-game").is(':checked'))
                       $(".item[data-id='" + id + "']").remove();
               });
           });
       });


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

       $(document).on('click', '.slot', function () {
           if ($(this).attr("data-url") != "")
               window.location = $(this).attr("data-url");
       });

       $(document).on('click', '#my-card-list > .item .click-area', function () {
           if (!$(this).hasClass("check"))
               $(this).addClass("check");
           else
               $(this).removeClass("check");

           if ($(".check").length > 0)
               $("#card-selection-menu-btn").css({
                   "display": "block"
               });
           else
               $("#card-selection-menu-btn").css({
                   "display": "none"
               });
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
               $("#playing-field").empty();
               var tmp = JSON.parse(a);

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
           $("#card-selection-menu-btn").css({
               "display": "none"
           });
           $.post($("#server-path").attr("src") + "search.php", {
               option: "cardslist",
               page: $(this).attr("data-page-id"),
               lotsperpage: $("#lots-per-page").val(),
               ingame: $("#lot-in-game").is(':checked') ? 1 : 0,
               sort: $("#sort-filters option:selected").val()
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
                        <div class="item" data-id="${tmp.list[i].ID}">\
                            <div class="wrapper">\   
                                ${tmp.list[i].card_code}\
                            </div>\
                            <div class="controlls">\
                                <div class="console-type">
                                    <p>${getConsole(tmp.list[i].console)}</p>
                                </div>
                                <button class="btn game-places modal-trigger" href="#game-places" data-id="${tmp.list[i].ID}"><i class="material-icons">apps</i></button>
                                <button class="modal-trigger card-info-btn btn" data-target="card-edit" data-id="${tmp.list[i].ID}"><i class="material-icons">edit</i></button>\
                                <div class="loading">\
                                    <div class="progress-line" style="width:${curentProcent}%"></div>\
                                    <p class="progress-text">${Math.round(curentProcent)}%</p>\                                
                                </div>\
                            </div>\
                            <div class="click-area" data-id="${tmp.list[i].ID}">
                            </div>
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
           var top = ($(this).last().offset().top - 400);
           var left = ($(this).last().offset().left - 200);
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
           //$(this).click();
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
                   var multiline = `
                    <div class="item-mini">
                            <h4><a class="player-popup-hint" data-id="${data[k].id}">${data[k].Player}</a></h4>
                            <div class="ovr-salary">
                                <p name="ovr">${data[k].OVR}</p>
                                <p name="salary">${data[k].salary}</p>
                            </div>
                            <div class="card-league-team">
                                <p name="card">${data[k].Card}</p>
                                <p name="league">${data[k].League}</p>
                                <p name="team">${data[k].Team}</p>
                            </div>
                            <div class=" data-values">
                                <div class="row">
                                    <div class="input-field col s6">
                                        <input type="number" id="cost${data[k].id}" value="${data[k].salary}">
                                        <label for="cost${data[k].id}">Cost</label>
                                    </div>
                                    <div class="input-field col s6">
                                        <input type="number" id="places${data[k].id}" min="1" value="1">
                                        <label for="places${data[k].id}"">Places</label>
                                    </div>
                                </div>



                            </div>
                            <div class="consoles">
                                <div class="row">
                                    <div class="col s6">
                                        <label>
                                            <input class="with-gap" name="console${data[k].id}" type="radio" value="1" />
                                            <span>PS4</span>
                                        </label>
                                    </div>
                                    <div class="col s6">
                                        <label>
                                            <input class="with-gap" name="console${data[k].id}" type="radio" value="2" />
                                            <span>XBOX</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="controlls">
                                <button class="btn add-card" data-id="${data[k].id}" data-card="${data[k].Card}" data-league="${data[k].League}" data-player="${data[k].Player}" >Добавить</button>
                            </div>
                             
                        </div>
                    `;
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
                       var multiline = `
                    <div class="item-mini">
                            <h4><a class="player-popup-hint" data-id="${data[k].id}">${data[k].Player}</a></h4>
                            <div class="ovr-salary">
                                  <p name="ovr">${data[k].OVR}</p>
                                <p name="salary">${data[k].salary}</p>
                            </div>
                            <div class="card-league-team">
                                <p name="card">${data[k].Card}</p>
                                <p name="league">${data[k].League}</p>
                                <p name="team">${data[k].Team}</p>
                            </div>
                            <div class=" data-values">
                                <div class="row">
                                    <div class="input-field col s6">
                                        <input type="number" id="cost${data[k].id}" value="${data[k].salary}">
                                        <label for="cost${data[k].id}">Cost</label>
                                    </div>
                                    <div class="input-field col s6">
                                        <input type="number" id="places${data[k].id}" min="1" value="1">
                                        <label for="places${data[k].id}"">Places</label>
                                    </div>
                                </div>



                            </div>
                            <div class="consoles">
                                <div class="row">
                                    <div class="col s6">
                                        <label>
                                            <input class="with-gap" autofocus name="console${data[k].id}" type="radio" value="1" />
                                            <span>PS4</span>
                                        </label>
                                    </div>
                                    <div class="col s6">
                                        <label>
                                            <input class="with-gap" autofocus name="console${data[k].id}" type="radio" value="2" />
                                            <span>XBOX</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="controlls">
                                <button class="btn add-card" data-id="${data[k].id}" data-card="${data[k].Card}" data-league="${data[k].League}" data-player="${data[k].Player}" >Добавить</button>
                            </div>
                            
                        </div>
                    `;
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
