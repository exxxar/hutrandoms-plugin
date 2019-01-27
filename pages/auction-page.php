<div class="row">
    <div class="input-field col s2">
        <input id="bid-min-step" type="text" class="validate">
        <label for="bid-min-step">Минимальный шаг ставки</label>
    </div>
    <div class="col s3">

    </div>
</div>

<div class="row">
    <div class="input-field col s12 m3">
        <select id="lots-category">
            <option value="" disabled selected>Choose your option</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
        </select>
        <label for="lots-category">Выбор категории</label>
        <a href="" data-target="lots-category-modify" class="small-link modal-trigger">Работа с категориями</a>

    </div>
    <div class="input-field col s12 m3">
        <select id="lots-category">
            <option value="1">Удалить</option>
            <option value="2">Завершить</option>
            <option value="3">Сбросить</option>
        </select>
        <label for="lots-category">Действия</label>
    </div>
    <div class="input-field col s12 m3">
        <input type="text" id="lots-search">
        <label for="lots-search">Поиск лота</label>
    </div>
</div>
<div class="row">

    <div class="col s12">
        <table>
            <thead>
                <tr>
                    <th>Название лота</th>
                    <th>Категория</th>
                    <th>Минимальная цена</th>
                    <th>Цена выкупа</th>
                    <th>Дата добавления</th>
                    <th>Дата заверешния</th>
                    <th>Автообновление</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>
                        <label>
                            <input type="checkbox" />
                            <span>Название лота</span>
                        </label>
                    </td>
                    <td>Категория</td>
                    <td>$0.87</td>
                    <td>$0.87</td>
                    <td>12.05.2017 23:34</td>
                    <td>13.05.2017 23:34</td>
                    <td>
                        <label>
                            <input type="checkbox" disabled="disabled" />
                            <span></span>
                        </label>
                    </td>
                </tr>

                <tr>
                    <td>
                        <label>
                            <input type="checkbox" />
                            <span>Название лота</span>
                        </label>
                    </td>
                    <td>Категория</td>
                    <td>$0.87</td>
                    <td>$0.87</td>
                    <td>12.05.2017 23:34</td>
                    <td>13.05.2017 23:34</td>
                    <td>
                        <label>
                            <input type="checkbox" disabled="disabled" />
                            <span></span>
                        </label>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
<div class="row">
    <div class="col s12">
        <ul class="pagination">
            <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
            <li class="active"><a href="#!">1</a></li>
            <li class="waves-effect"><a href="#!">2</a></li>
            <li class="waves-effect"><a href="#!">3</a></li>
            <li class="waves-effect"><a href="#!">4</a></li>
            <li class="waves-effect"><a href="#!">5</a></li>
            <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
        </ul>
    </div>
</div>


<div id="add-custom-item" class="modal">
    <div class="modal-content">
        <h3>Добавление нового лота</h3>
        <div class="row">
            <div class="col s6">

                <div class="row">
                    <div class="input-field col s6">
                        <select id="hours-exp">
                            <option value="1">12 часов</option>
                            <option value="2" selected>24 часа</option>
                            <option value="3">48 часов</option>
                            <option value="4">96 часов</option>
                        </select>
                        <label for="hours-exp">Выставить на срок</label>
                    </div>

                    <div class="input-field col s6">
                        <label>
                            <input type="checkbox" id="auto-renew" />
                            <span>Автопродление</span>
                        </label>
                    </div>
                </div>



                <div class="row">
                    <div class="col input-field s6">
                        <input type="text" id="item-title">
                        <label for="item-title">Название лота</label>

                    </div>

                    <div class="col input-field  s6">
                        <input type="number" min="1" value="1" id="item_places">
                        <label for="item_places">Количество мест (лотерея)</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col input-field s12">
                        <textarea id="item-description" class="materialize-textarea"></textarea>
                        <label for="item-description">Описание лота</label>

                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s6"><input type="number" min="0" id="bid_price"><label for="bid_price">Минимальная цена</label></div>
                    <div class="input-field col s6"><input type="number" min="0" id="buy_price"><label for="buy_price">Цена выкупа</label></div>
                </div>


            </div>
            <div class="col s6">
                <div class="row">
                    <div class="col s12">
                        <button data-target="image-gallery" class="btn modal-trigger image-gallery-open">Галлерея</button>
                        <input type="hidden" id="selected-img">
                        <div class="selected-img">
                            <img src="" alt="">
                        </div>

                    </div>
                </div>


            </div>
        </div>



    </div>
    <div class="modal-footer">
        <label class="check">
            <input type="checkbox" id="islottery" checked />
            <span>Лотерея</span>
        </label>
        <label class="check">
            <input type="checkbox" id="isauction" />
            <span>Аукцион</span>
        </label>
        <a href="#!" class="modal-close waves-effect waves-green btn">Добавить</a>

    </div>
</div>

<!-- работа с категориями лотов -->
<div id="lots-category-modify" class="modal">
    <div class="modal-content">
        <div class="lots-category-content" id="lots-category-content">


        </div>
        <div class="progress" id="lots-category-preloader">
            <div class="indeterminate"></div>
        </div>
    </div>
    <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn">Сохранить измненеия</a>
    </div>
</div>
