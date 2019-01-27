<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo plugin_dir_url( __FILE__ ).'assets/css/style.css';?>">
    <link rel="stylesheet" href="<?php echo plugin_dir_url( __FILE__ ).'assets/css/cardstyle.css';?>">
    <link rel="stylesheet" href="<?php echo plugin_dir_url( __FILE__ ).'assets/css/dropzone.css';?>">
    <title>Админка</title>
    <meta id="server-path" src="<?php echo plugin_dir_url( __FILE__ );?>">
</head>

<body>
    <div class="row">
        <div class="col s12">
            <ul class="tabs">
                <li class="tab col s3"><a class="active" href="#cards-admin">Карточки</a></li>
                <li class="tab col s3 load-users load-levels" data-page-id="1"><a href="#users-admin">Пользователи</a></li>
                <li class="tab col s3"><a href="#auction-admin">Аукцион</a></li>
                <li class="tab col s3"><a href="#mail-admin">Рассылка</a></li>
            </ul>
        </div>

        <!-- РАБОТА С КАРТОЧКАМИ -->
        <div id="cards-admin" class="col s12">
            <?php include('pages/cards-page.php');?>
        </div>
        <!-- РАБОТА С ПОЛЬЗОВАТЕЛЯМИ -->
        <div id="users-admin" class="col s12">
            <?php include('pages/users-page.php');?>
        </div>
        <!-- РАБОТА С АУКЦИОНОМ -->
        <div id="auction-admin" class="col s12">
            <?php include('pages/auction-page.php');?>
        </div>
        <!-- РАБОТА С ПОЧТОЙ -->
        <div id="mail-admin" class="col s12">
            <?php include('pages/mails-page.php');?>
        </div>
    </div>

    <!-- галлерея картинок -->
    <div id="image-gallery" class="modal">
        <div class="modal-content">
            <div class="row">
                <div class="col s2">
                    <button class="btn btn-gallery-remove">Удалить</button>
                </div>
                <div class="col s2">
                    <button class="btn btn-gallery-select">Выбрать</button>
                </div>
            </div>
            <div class="image-gallery-list" id="image-gallery-list">
                <ul>
                </ul>
            </div>
            <div class="row">
                <div class="col s12">
                    <h6>Изображение лота</h6>
                    <form action="<?php echo plugin_dir_url( __FILE__ ).'uploadimage.php';?>" id="custom-image" class="dropzone">
                        <div class="fallback">
                            <input name="file" type="file" multiple />
                        </div>
                    </form>
                </div>
            </div>
            <div class="progress" id="image-gallery-list-preloader">
                <div class="indeterminate"></div>
            </div>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Закрыть</a>
        </div>
    </div>

    <div id="huts-preloader">
        <div class="progress">
            <div class="indeterminate"></div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="<?php echo plugin_dir_url( __FILE__ ).'assets/js/libs/dropzone.js';?>"></script>
    <script src="<?php echo plugin_dir_url( __FILE__ ).'assets/js/libs/faker.min.js';?>"></script>
    <script src="<?php echo plugin_dir_url( __FILE__ ).'assets/js/main.js';?>"></script>
    <script src="<?php echo plugin_dir_url( __FILE__ ).'assets/js/mail.js';?>"></script>
    <script src="<?php echo plugin_dir_url( __FILE__ ).'assets/js/imagegallery.js';?>"></script>
    <script src="<?php echo plugin_dir_url( __FILE__ ).'assets/js/users.js';?>"></script>
    <script src="<?php echo plugin_dir_url( __FILE__ ).'assets/js/levels.js';?>"></script>
</body>

</html>
