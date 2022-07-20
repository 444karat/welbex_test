const User = require('../db/model/user_model');
const authService = require('../servises/jwt.servic');
const {hashPassword, checkPassword} = require('../servises/password.servic');

class authController {
	async auth(request, res, next) {
		const {login, password} = request.body;
		const check = await User.findOne({where: {login}});
		const jwt = authService().issue(login);

		if (check === null) {
			const newUser = User.create({
				login,
				password: await hashPassword(password)});

			res.status(201).json({success: true, user: await newUser, Authorization: jwt});
			return;
		}

		if (await checkPassword(password, check.dataValues.password)) {
			res.status(200).json({success: true, user: await check.dataValues, Authorization: jwt});
		}
	}
}

module.exports = new authController();
