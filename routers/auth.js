const express = require('express');

const router = express.Router();

router
	.route('/auth')
	.get((request, res) => {
		html = '<div class="registration-cssave">\n'
			+ '    <form>\n'
			+ '        <h3 class="text-center">Форма входа/регистрации</h3>\n'
			+ '        <div class="form-group">\n'
			+ '            <input class="form-control item" type="text" name="login" id="login" placeholder="Логин" required>\n'
			+ '        </div>\n'
			+ '        <div class="form-group">\n'
			+ '            <input class="form-control item" type="password" name="Пароль"  id="password" placeholder="Пароль" required>\n'
			+ '        </div>\n'
			+ '        \n'
			+ '            <button class="btn btn-primary btn-block create-account" type="submit">Вход в аккаунт</button>\n'
			+ '        </div>\n'
			+ '    </form>\n'
			+ '</div>';

		res.send(html);
	})
	.post(require('../controllers/Auth').auth);

module.exports = router;
