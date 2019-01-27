<div class="row">
    <div class="input-field col m3 s12">
        <select id="users-sort">
            <option value="0">По порядку</option>
            <option value="1">В обратном порядке</option>
            <option value="2">По имени (+)</option>
            <option value="3">По имени (-)</option>
            <option value="8">По почте (+)</option>
            <option value="9">По почте (-)</option>
            <option value="4">По монетам (+)</option>
            <option value="5">По монетам (-)</option>
            <option value="6">По скидке (+)</option>
            <option value="7">По скидке (-)</option>
            <option value="10">По опыту (+)</option>
            <option value="11">По опыту (-)</option>

        </select>
    </div>
    <div class="input-field col m3 s12">
        <select id="users-per-page">
            <option value="0">10</option>
            <option value="1">20</option>
            <option value="2">30</option>
            <option value="3">50</option>
            <option value="4">100</option>
        </select>
    </div>
    <div class="input-field col m3 s12">
        <a class="waves-effect waves-light btn open-add-user-modal modal-trigger" href="#add-new-user-modal">Добавить пользователя</a>
    </div>
</div>
<div class="row">
    <div class="col s12">

        <table>
            <thead>
                <tr>
                    <th>Никнейм</th>
                    <th>Почта</th>
                    <th>Монеты</th>
                    <th>Скидки</th>
                    <th>Опыт</th>
                </tr>
            </thead>

            <tbody id="users-list-body">

            </tbody>
        </table>



    </div>
</div>

<div class="row">
    <div class="col s12">
        <ul class="pagination" id="users-pagination">

        </ul>
    </div>
</div>


<div class="row">
    <div class="col s12">
        <h4>Таблица опыта</h4>
        <a class="btn-floating btn-large waves-effect waves-light red modal-trigger" href="#add-new-level"><i class="material-icons">add</i></a>

        <table>
            <thead>
                <th>Уровень</th>
                <th>Название</th>
                <th>Бонусные баллы</th>
                <th>Скидка</th>
                <th>Действия</th>
            </thead>
            <tbody id="levels-list">

            </tbody>

        </table>

    </div>
</div>



<!-- Добавление нового пользователя -->
<div id="add-new-user-modal" class="modal">
    <div class="modal-content">
        <h4>Добавление нового пользователя</h4>
        <div class="row">
            <div class="col s6 m6"><a href="#" class="btn generate-new-user">Случайный пользователь</a></div>
        </div>
        <div class="row">
            <div class="col s12">
                <form id="add-new-user-form">
                    <input type="hidden" name="avatar" value="">
                    <input type="hidden" name="user_email" value="">
                    <div class="row">
                        <div class="col input-field s6">
                            <input type="text" name="user_login" id="add-new-user_user-login">
                            <label for="add-new-user_user-login">User login</label>
                        </div>
                        <div class="col input-field s6">
                            <input type="text" name="user_pass" id="add-new-user_user-pass">
                            <label for="add-new-user_user-pass">User pass</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col input-field s6">
                            <input type="text" name="user_nicename" id="add-new-user_user-nicename">
                            <label for="add-new-user_user-nicename">User nicename</label>
                        </div>
                        <div class="col input-field s6">
                            <input type="text" name="display_name" id="add-new-user_display-name">
                            <label for="add-new-user_display-name">Display name</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col input-field s6">
                            <label>
                                <input type="checkbox" name="is_admin" />
                                <span>Администратор</span>
                            </label>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn add-new-user">Добавить</a>
    </div>
</div>

<!-- Добавление уровней -->
<div id="add-new-level" class="modal">
    <div class="modal-content">
        <h4>Добавление уровня</h4>
        <table>
            <thead>
                <th>Уровень</th>
                <th>Название</th>
                <th>Бонусные баллы</th>
                <th>Скидка</th>
            </thead>
            <tbody>
            <tbody>
                <tr>
                    <td>
                        <div class="input-field"><input id="add-new-level_level" type="number" min="0" value="0" name="level"><label for="level">Введите уровень</label></div>
                    </td>
                    <td>
                        <div class="input-field"><input id="add-new-level_title" type="text" value="Новый уровень" name="title"><label for="title">Введите название уровня</label></div>
                    </td>
                    <td>
                        <div class="input-field"><input id="add-new-level_experience" type="number" min="0" value="0" name="experience"><label for="experience">Введите бонусные баллы</label></div>
                    </td>
                    <td>
                        <div class="input-field"><input id="add-new-level_discount" type="number" min="0" value="0" name="discount"><label for="discount">Введите скидку,%</label></div>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
    <div class="modal-footer">
        <a href="#!" class="modal-close btn waves-effect waves-light btn-add-level">Добавить</a>
    </div>
</div>
