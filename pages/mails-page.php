<h3>Массовая рассылка сообщений</h3>

<div class="users">

    <form action="">
        <a class="action">Выбрать все</a>
        <ul>

            <?php
                    global $wpdb;

                        
                    $mail_list = $wpdb->get_results( "SELECT `ID`,`user_email` FROM `wp_users`" );
                    foreach ($mail_list as $data) {
                        $mail = $data->user_email;
                        $id = $data->ID;
                        
                        if (trim($mail)!="") {
                       
                        echo "<li><input type='checkbox'  value='$mail' name='pay_mail[]' >".$mail."</li>";
                        }
                    }

                ?>

        </ul>
        <hr>
        <h4>Электронная почта (Новые адреса)</h4>
        <p class="message"></p>
        <textarea id="emails" placeholder="Введите через запятую новые почтовые адреса или оставте поле пустым"></textarea>
        <button type="button" class="btn" id="append_emails">Добавить адреса</button>
        <hr>
        <h4>Содержимое письма</h4>
        <input type="text" name="subject" placeholder="Тема письма">
        <textarea name="message" placeholder="Текст сообщения"></textarea>
        <button type="submit" class="btn">Сделать рассылку</button>
        <button type="reset" class="btn">Очистить</button>
        <p class="message"></p>

        <div class="progress hide">
            <div class="line"></div>
            <p>10/50</p>
        </div>
    </form>
</div>
