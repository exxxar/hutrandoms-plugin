   var progress_max = 100;
        var progress_current = 20;

        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        $(document).ready(function() {

            $(".users .action").click(function() {

                if ($(this).attr("selected") == false || $(this).attr("selected") == undefined) {
                    $(".users input[type='checkbox']").attr({
                        "checked": "true"
                    });
                    $(this).attr({
                        "selected": true
                    });
                    $(this).html("Снять выделение");

                } else {
                    $(".users input[type='checkbox']").removeAttr("checked");
                    $(this).attr({
                        "selected": false
                    });
                     $(this).html("Выбрать всё");

                }

            });


            $(".users #append_emails").click(function() {
                var emails = $(".users #emails").val().split(" ");
                for (var key in emails) {
                    if (validateEmail(emails[key].trim()) == false) {
                        $(".users p.message").prepend("Ошибка в email " + emails[key]);
                        $(".users p.message").removeClass("success").addClass("error");
                    }
                    if (emails[key].trim() != "" && validateEmail(emails[key].trim())) {
                        $(".users form ul").prepend("<li><input type='checkbox'  value='" + emails[key] + "' name='pay_mail[]' >" + emails[key] + "</li>");

                        $(".users #emails").val("");
                        $(".users p.message").html("Адреса успешно добавлены!");
                        $(".users p.message").removeClass("error").addClass("success");

                        $.post($("#server-path").attr("src") + "php-scripts/updatebd.php", {
                                "mail": emails[key]
                            },
                            function(a,b) {
                                console.log(a);
                            });
                    }
                }

                setTimeout(function() {
                    $(".users p.message").html("");
                    $(".users p.message").removeClass("success").removeClass("error");
                }, 5000);
            });



            $(".users form").on("submit", function(event) {

                event.preventDefault();

                $(".users p.message").html("");
                $(".users p.message").removeClass("success").removeClass("error");
                $(".users .progress").removeClass("hide");

                progress_max = 0;

                $("input[type='checkbox']").each(function(i, el) {
                    if ($(el).is(':checked'))
                        progress_max++;
                });


                progress_current = 0;
                $(".users .progress .line").css({
                    "width": progress_current + "%"
                });
                $(".users .progress p").html(progress_current + "\\" + progress_max);

                console.log($(this).serialize());
                $.post($("#server-path").attr("src") + "php-scripts/mail.php",
                    $(this).serialize(),
                    function(a, b) {

                        switch (a) {
                            case "success":
                                $(".users p.message").html("Успешно отправлено!");
                                $(".users p.message").removeClass("error").addClass("success");
                                break;

                            case "error":
                                $(".users p.message").html("Ошибка отправки:(");
                                $(".users p.message").removeClass("success").addClass("error");
                                break;
                            default:
                                $(".users p.message").html("Успешно отправлено!");
                                $(".users p.message").removeClass("error").addClass("success");
                                
                                progress_current=parseInt(a.charAt(a.length-1));
                                $(".users .progress .line").css({
                                    "width": Math.round((parseInt(a) / progress_max) * 100) + "%"
                                });
                                $(".users .progress p").html(progress_current + "\\" + progress_max);
                                break;


                        }

                        setTimeout(function() {
                            $(".users p.message").html("");
                            $(".users p.message").removeClass("success").removeClass("error");
                            $(".users .progress").addClass("hide");

                        }, 5000);

                        console.log(a);
                    });
            });
        });