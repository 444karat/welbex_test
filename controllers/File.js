const fs = require('fs');
const File_model = require('../db/model/file_model');
const Blog_model = require('../db/model/blog_model');

class File {
	async create(request, idBloc) {
		if (request.files.length === 0) {
			return;
		}

		const blogById = (await Blog_model.findByPk(idBloc));
		console.log(await blogById.dataValues.id);

		for (let i = 0; i < request.files.length; i++) {
			console.log(request.files[i].filename);

			File_model.create({
				link: request.files[i].filename,
				blogId: await blogById.dataValues.id,
			}).then(() => {
				console.log('yspex');
			}).catch(error => console.log(error));
		}
	}

	async delete(idBloc) {
		const FilesById = await File_model.findAll(
			{where: {
				blogId: idBloc,
			}});

		for (let i = 0; i < await FilesById.length; i++) {
			// Console.log(await FilesById[i].dataValues)
			// console.log('/storage/' +await FilesById[i].dataValues.link)
			fs.unlinkSync('./storage/' + await FilesById[i].dataValues.link);

			File_model.destroy({
				where: {
					blogId: idBloc,
					link: await FilesById[i].dataValues.link,
				},
			});
		}

		//
	}
}

module.exports = new File();
