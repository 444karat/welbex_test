const jwt = require('jsonwebtoken');

// Const secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret';
const secret = 'secret';
const authService = () => {
	const issue = payload => jwt.sign({username: payload}, secret, {expiresIn: '1800s'});

	// Const verify = (token, cb) => jwt.verify(token, secret, {}, cb);

	const authenticateToken = (request, res, next) => {
		const token = request.header('x-auth-token');

		if (token == null) {
			return res.sendStatus(401);
		}

		const decoded = jwt.verify(token, secret, {}, (error, user) => {
			if (error) {
				console.log(error.message);
				res.status(400).send('Invalid token');
				return;
			}

			return user;
		});
		request.user = decoded;
		next();
	};

	return {
		issue,
		//	Verify,
		authenticateToken,
	};
};

module.exports = authService;
