$(document).ready(function () {
    $(".load-levels").click(function () {
        $("#card-preloader").css({
            "display": "flex"
        });
        $.post($("#server-path").attr("src") + "levels.php", {
            option: "list"
        }).then(function (a, b) {
            $("#levels-list").empty();
            var tmp = JSON.parse(a);
            for (var k in tmp.list) {
                var multiline = `\
                    <tr>          
                        <td><input type="number" min="0" data-id="${tmp.list[k].id}" name="level" value="${tmp.list[k].level}"></td>
                        <td><input type="text"  data-id="${tmp.list[k].id}" name="title" value="${tmp.list[k].title}"></td>
                        <td><input type="number" min="0" data-id="${tmp.list[k].id}" name="experience" value="${tmp.list[k].experience}"></td>
                        <td><input type="number" min="0" data-id="${tmp.list[k].id}" name="discount" value="${tmp.list[k].discount}"></td>
                        <td><a href="#" data-id="${tmp.list[k].id}" class="remove-level" title="Удаление пользователя"> <i class="small  material-icons">delete</i></a></td>
                    </tr>
                `;
                $("#levels-list").append(multiline);
            }

            $("#card-preloader").css({
                "display": "none"
            });
        });

    });

    $(".btn-add-level").click(function () {
        
        $.post($("#server-path").attr("src") + "levels.php", {
            option: "insert",
            level: $("#add-new-level_level").val(),
            title: $("#add-new-level_title").val(),
            experience: $("#add-new-level_experience").val(),
            discount: $("#add-new-level_discount").val()
        }).then(function (a, b) {
            $("#add-new-level_level").val("");
            $("#add-new-level_title").val("");
            $("#add-new-level_experience").val("");
            $("#add-new-level_discount").val("");
            $(".load-levels").click();
            $(".load-users").click();
        });
    });

    $(document).on("change", "#levels-list input[name='level']", function () {
        var el = $(this);
        $.post($("#server-path").attr("src") + "levels.php", {
            option: "u_level",
            id: $(this).attr("data-id"),
            level: $(this).val()
        }).then(function (a, b) {
            $(el).addClass("bottom-green-line");
            
            setTimeout(function () {
                $(el).removeClass("bottom-green-line");
            }, 3000);
        });

    });

    $(document).on("change", "#levels-list input[name='experience']", function () {
        var el = $(this);
        $.post($("#server-path").attr("src") + "levels.php", {
            option: "u_experience",
            id: $(this).attr("data-id"),
            experience: $(this).val()
        }).then(function (a, b) {
              $(".load-users").click();
            $(el).addClass("bottom-green-line");
            setTimeout(function () {
                $(el).removeClass("bottom-green-line");
            }, 3000);
        });

    });

    $(document).on("change", "#levels-list input[name='discount']", function () {
        var el = $(this);
        $.post($("#server-path").attr("src") + "levels.php", {
            option: "u_discount",
            id: $(this).attr("data-id"),
            discount: $(this).val()
        }).then(function (a, b) {
              $(".load-users").click();
            $(el).addClass("bottom-green-line");
            setTimeout(function () {
                $(el).removeClass("bottom-green-line");
            }, 3000);
        });

    });


    $(document).on("change", "#levels-list input[name='title']", function () {
        var el = $(this);
        $.post($("#server-path").attr("src") + "levels.php", {
            option: "u_title",
            id: $(this).attr("data-id"),
            title: $(this).val()
        }).then(function (a, b) {
            $(el).addClass("bottom-green-line");
            setTimeout(function () {
                $(el).removeClass("bottom-green-line");
            }, 3000);
        });

    });

    $(document).on("click", ".remove-level", function () {
        var el = $(this);
        $.post($("#server-path").attr("src") + "levels.php", {
            option: "remove",
            id: $(this).attr("data-id")
        }).then(function (a, b) {
            $(el).parent().parent().remove();
        });
    });

    $(".load-levels").click();

});
