   var data = [];

   $(document).ready(function () {
       $('select').formSelect();
       $('.tabs').tabs();
       $('.modal').modal();

       $("#save-options").click(function () {
           var procent = $("#procent").val();
           var title = $("#title").val();
           var coins = $("#coins").val();
           var rub = $("#rub").val();

           $.post($("#server-path").attr("src") + "search.php", {
               option: "options",
               procent: procent,
               title: title,
               coins: coins,
               rub: rub
           }).then(function (a, b) {

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

                   var curentProcent = (tmp.list[i].free_places / tmp.list[i].places) * 100;
                   $("#my-card-list").append(`\
                        <div class="item">\
                            <div class="wrapper">\   
                                ${tmp.list[i].card_code}\
                            </div>\
                            <div class="controlls">\
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
               salary: $("#salary" + $(this).attr("data-id")).val(),
               places: $("#places" + $(this).attr("data-id")).val()
           }).then(function (a, b) {
               btn.css({
                   "background-color": "#CDDC39"
               });
               $(".refresh-cards").click();
           });
       });

       $(document).on('click', '.player-popup-hint', function(){
           $(".player-popup-window").empty();
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
                                    <td><input type="number" id="salary${data[k].id}" value="${data[k].salary}"></td>\
                                    <td><input type="number" id="places${data[k].id}" min="1" value="1"></td>\
                                    <td><button class="btn add-card" data-id="${data[k].id}" data-card="${data[k].Card}" data-league="${data[k].League}" data-player="${data[k].Player}" >Добавить</button></td>\
                                </tr>`;
                   $('#cards-table').append(multiline);
               }
           }
       });


       $("#search").click(function (e) {
           e.preventDefault();
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
                                    <td><input type="number" id="salary${data[k].id}" value="${data[k].salary}"></td>\
                                    <td><input type="number" id="places${data[k].id}" min="1" value="1"></td>\
                                    <td><button class="btn add-card" data-id="${data[k].id}" data-card="${data[k].Card}" data-league="${data[k].League}" data-player="${data[k].Player}" >Добавить</button></td>\
                                </tr>`;
                       $('#cards-table').append(multiline);
                   }
               }



           });
       });
       $("#search").click();
       $("#refresh-cards").click();
   });