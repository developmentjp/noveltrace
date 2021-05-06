import connectDB from '../config/connectDB';

export default async function QueryConnection() {
	return new Promise((resolve, reject) => {
		const pool = connectDB();
		pool.getConnection((err: Error, connection) => {
			if (err) throw err; // not connected!
			console.log('Connected as ID ' + connection.threadId);

			if (connection) {
				resolve(connection);
			} else {
				reject(err);
			}
		});
	});
}
