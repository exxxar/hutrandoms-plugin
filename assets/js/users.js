$(document).ready(function () {


    $(document).on("change", "#users-list-body input[name='experience']", function () {
        var el = $(this);
        $.post($("#server-path").attr("src") + "php-scripts/users.php", {
            option: "addexperience",
            id: $(this).attr("data-id"),
            experience: $(this).val()
        }).then(function (a, b) {
            $(el).addClass("bottom-green-line");
            setTimeout(function () {
                $(el).removeClass("bottom-green-line");
            }, 3000);
        });

    });

    $(document).on("change", "#users-list-body input[name='coins']", function () {
        var el = $(this);
        $.post($("#server-path").attr("src") + "php-scripts/users.php", {
            option: "addcoins",
            id: $(this).attr("data-id"),
            coins: $(this).val()
        }).then(function (a, b) {
            $(el).addClass("bottom-green-line");
            setTimeout(function () {
                $(el).removeClass("bottom-green-line");
            }, 3000);
        });

    });


    $(document).on("change", "#users-list-body input[name='discount']", function () {
        var el = $(this);
        $.post($("#server-path").attr("src") + "php-scripts/users.php", {
            option: "adddiscount",
            id: $(this).attr("data-id"),
            discount: $(this).val()
        }).then(function (a, b) {
            $(el).addClass("bottom-green-line");
            setTimeout(function () {
                $(el).removeClass("bottom-green-line");
            }, 3000);
        });

    });

    $(document).on("click", ".load-users", function () {
        $("#card - preloader").css({
            "display": "flex"
        });
        $.post($("#server-path").attr("src") + "php-scripts/users.php", {
            option: "userslist",
            page: parseInt($(this).attr("data-page-id")) - 1 <= 0 ? 0 : parseInt($(this).attr("data-page-id")) - 1,
            usersperpage: $("#users-per-page").val(),
            sort: $("#users-sort").val()


        }).then(function (a, b) {
            var tmp = JSON.parse(a);
            $("#users-list-body").empty();
            $("#users-pagination").empty();
            for (var k in tmp.list) {
                var multiline = `\
                            <tr >
                                <td>${tmp.list[k].user_nicename}</td>
                                <td>${tmp.list[k].user_email}</td>
                                <td><input type="number" min="0" data-id="${tmp.list[k].ID}" name="coins" value="${tmp.list[k].coins}"></td>
                                <td><input type="number" min="0" data-id="${tmp.list[k].ID}" name="discount" value="${tmp.list[k].discount}"></td>
                                <td><input type="number" min="0" data-id="${tmp.list[k].ID}" name="experience" value="${tmp.list[k].experience}"></td>
                                <td><a href="#" data-id="${tmp.list[k].ID}" class="remove-user" title="Удаление пользователя"> <i class="small  material-icons">delete</i></a></td>
                                <!--<td><a href="#" data-id="${tmp.list[k].ID}" class="get-user" title="Просмотр информации о пользователе"> <i class="small  material-icons">wallpaper</i></a></td>-->
                            </tr>
                        `;
                $("#users-list-body").append(multiline);
            }



            for (var i = 0; i < tmp.pages; i++) {
                if (i != tmp.current_page)
                    $("#users-pagination").append(`\
                              <li class="waves-effect"><a data-page-id="${i}" class="load-users">${i+1}</a></li>\
                        `);
                else
                    $("#users-pagination").append(`\
                              <li class="active"><a data-page-id="${i}" class="load-users">${i+1}</a></li>\
                        `);

            }


            $("#huts-preloader").css({
                "display": "none"
            });
        });

    });

    $(".get-user").click(function () {
        $.post($("#server-path").attr("src") + "php-scripts/users.php", {
            option: "get",
            id: $(this).attr("data-id")

        }).then(function (a, b) {});

    });

    $(document).on("click", ".remove-user", function () {
        var el = $(this);

        if (confirm("Удаление пользователя", "Вы действительно хотите удалить пользователя?")) {
            $.post($("#server-path").attr("src") + "php-scripts/users.php", {
                option: "remove",
                id: $(this).attr("data-id")

            }).then(function (a, b) {
                if (a != -1)
                    $(el).parent().parent().remove();
                else
                    alert("Вы пытаетесь удалить свой аккаунт!");
            });
        }
    });



    $(".open-add-user-modal").click(function () {
        $("#add-new-user-form").trigger("reset");
    });


    $(".generate-new-user").click(function () {
        $("#add-new-user-form [name='user_login']").val(faker.internet.userName()).focus();
        $("#add-new-user-form [name='user_pass']").val(faker.internet.password()).focus();
        $("#add-new-user-form [name='user_nicename']").val(faker.internet.userName()).focus();
        $("#add-new-user-form [name='display_name']").val(faker.name.findName()).focus();
        $("#add-new-user-form [name='avatar']").val(faker.internet.avatar());
        $("#add-new-user-form [name='user_email']").val(faker.internet.email());
    });

    $(".btn.add-new-user").click(function (e) {

        if ($("#add-new-user-form [name='user_login']").val().trim() == "" ||
            $("#add-new-user-form [name='user_pass']").val().trim() == "" ||
            $("#add-new-user-form [name='user_nicename']").val().trim() == "" ||
            $("#add-new-user-form [name='display_name']").val().trim() == "") {
            alert("Заполните все поля!");
            e.preventDefault();
            return;
        }


        if ($("#add-new-user-form [name='avatar']").val().trim() == "")
            $("#add-new-user-form [name='avatar']").val(faker.internet.avatar());

        if ($("#add-new-user-form [name='user_email']").val().trim() == "")
            $("#add-new-user-form [name='user_email']").val(faker.internet.avatar());

        $.post($("#server-path").attr("src") + "users.php", {
            option: "adduser",
            user_login: $("#add-new-user-form [name='user_login']").val(),
            user_pass: $("#add-new-user-form [name='user_pass']").val(),
            user_nicename: $("#add-new-user-form [name='user_nicename']").val(),
            display_name: $("#add-new-user-form [name='display_name']").val(),
            avatar: $("#add-new-user-form [name='avatar']").val(),
            user_email: $("#add-new-user-form [name='user_email']").val(),
            is_admin: $("#add-new-user-form [name='is_admin']").is(':checked') ? 1 : 0
        }).then(function (a, b) {
            $("#add-new-user-form").trigger("reset");
            $(".load-users").click();
        });
    });

    $("#users-sort").change(function () {
        $(".load-users").click();
    });
    $(".load-users").click();
});
