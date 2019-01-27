$(document).ready(function () {

    
    $(".dropzone").on("drop",function(){
        $(".image-gallery-open").click();
        
    });
    $(".btn-gallery-remove").click(function () {

        $("#image-gallery-list ul li.check img").each(function (num, el) {
            if ($(".selected-img img").attr("src") == $(el).attr("src")) {
                $(".selected-img img").attr({
                    "src": ""
                });
                $("#selected-img").val("");
            }

            $.post($("#server-path").attr("src") + "php-scripts/imagegallery.php", {
                option: "delete",
                path: $(el).attr("alt")
            }).then(function (a, b) {


            });
            $(el).parent().remove();
        });


    });

    $(".btn-gallery-select").click(function () {
        if ($("#image-gallery-list ul li.check img").length>1){
             alert("Выберите только одну картинку!");
            return;
        }
           
        $("#selected-img").val($("#image-gallery-list ul li.check img").attr("src"));
        $(".selected-img img").attr({
            "src": $("#image-gallery-list ul li.check img").attr("src")
        });

        $('#image-gallery').modal('close');
    });


    $(document).on("click", "#image-gallery-list ul li", function () {
        if (!$(this).hasClass("check")) {
            $(this).addClass("check");

        } else
            $(this).removeClass("check");
    });

    $(".image-gallery-open").click(function () {
        $("#image-gallery-list ul").empty();
        $(".dropzone").empty();
        $("#image-gallery-list-preloader").css({
            "display": "block"
        });
        $.post($("#server-path").attr("src") + "php-scripts/imagegallery.php", {
            option: "list"

        }).then(function (a, b) {
            var tmp = JSON.parse(a);
            $("#image-gallery-list ul").empty();
            for (var f in tmp) {
                $("#image-gallery-list ul").append(`\
                     <li><img alt="${tmp[f]}" src="${$("#server-path").attr("src")}uploads/${tmp[f]}" alt=""></li>
                `);

            }
            $("#image-gallery-list-preloader").css({
                "display": "none"
            });

        });
    });

    $(document).on('click', '.dz-image-preview', function () {
        if (!$(this).hasClass("check")) {
            $(".dz-image-preview").each(function (num, el) {
                $(el).removeClass("check");
            });
            $(this).addClass("check");

            $("#selected-img").val($("#server-path").attr("src") + "uploads/" + $(this).children(".dz-image").children("img").attr("alt"));
            $(".selected-img img").attr({
                "src": $("#server-path").attr("src") + "uploads/" + $(this).children(".dz-image").children("img").attr("alt")
            });


        } else
            $(this).removeClass("check");
    });

});
