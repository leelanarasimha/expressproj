const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = (callBack) => {
	MongoClient.connect(
		`mongodb+srv://leela:narasimha24@cluster0-i01az.mongodb.net/test?retryWrites=true&w=majority`
	)
		.then((client) => {
			_db = client.db();
			callBack();
		})
		.catch((err) => {
			console.log('Unable to establish connection');
			console.log(err);
		});
};

const getDb = () => {
	if (_db) {
		return _db;
	}

	throw 'No Database Found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
