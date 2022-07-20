const authService = require('../servises/jwt.servic');
const Blog_model = require('../db/model/blog_model');
const User_model = require('../db/model/user_model');
const file_control = require('./File');

class Blog {
	async create(request, res, next) {
		const user = (await User_model.findOne({where: {login: request.user.username}}));
		let idBlog = '-1';
		try {
			const newBlog = Blog_model.create(
				{text: request.body.text,
					userId: await user.dataValues.id});
			idBlog = (await newBlog).get('id');
			res.status(201).json({success: true, blog: await newBlog});
		} catch (error) {
			console.log(error.message);
		}

		file_control.create(request, await idBlog);
	}

	async read(request, res, next) {}

	async update(request, res, next) {
		const user = (await User_model.findOne({where: {login: request.user.username}}));
		try {
			const updateBlog = Blog_model.update({text: request.body.text}, {
				where: {
					userId: await user.dataValues.id,
					id: request.body.id,
				},
			});
			res.status(202).json({success: true});
		} catch (error) {
			console.log(error.message);
		}
	}

	async delete(request, res, next) {
		const user = (await User_model.findOne({where: {login: request.user.username}}));
		const id = request.body.id;

		file_control.delete(id);

		const deleteBlog = Blog_model.destroy({
			where: {
				userId: await user.dataValues.id,
				id,
			},
		});

		res.status(202).json({success: true});
	}
}

module.exports = new Blog();
