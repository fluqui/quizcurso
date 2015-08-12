var path = require('path');

//Cargar Modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null, {dialect: "sqlite", storage:"quiz.sqlite"});

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

//Importar la definicion de la tabla Comment
var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz; //exportar la definicion de la tabla Quiz
exports.Comment = Comment;

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().success(function() {
	// success(...) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function (count){
		if (count === 0) {
			Quiz.create({ pregunta: 'Capital de Italia', respuesta: 'Roma', tematica: 'Otro'});
			Quiz.create({ pregunta: 'Capital de Portugal', respuesta: 'Lisboa', tematica: 'Otro'}).then(function(){console.log('Base de datos inicializada')});
		};
	});
});
