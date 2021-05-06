import { Request, Response } from 'express';
import connectDB from '../../config/connectDB';
import QueryConnection from '../../db/QueryConnection';

/** View Novels */
export const view = async (req: Request, res: Response) => {
	try {
		const connection: any = await QueryConnection();
		connection.query(
			'SELECT * FROM novels WHERE status = "reading"',
			(_err: Error, rows) => {
				// When done with the connection, release it
				connection.release();
				res.render('home', { rows });
			}
		);
	} catch (error) {
		console.log(error);
	}
};

/** Search Novels */
export const find = async (req: Request, res: Response) => {
	let searchTerm = req.body.search;
	console.log(searchTerm);
	try {
		const connection: any = await QueryConnection();
		connection.query(
			'SELECT * FROM novels WHERE name LIKE ? OR author LIKE ? OR chapters LIKE ?',
			['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%'],
			(_err: Error, rows) => {
				connection.release();
				res.render('home', { rows });
			}
		);
	} catch (err) {
		console.log(err);
	}
};

/** Render Novel Page */
export const form = (req: Request, res: Response) => {
	res.render('add-novel');
};

/** Add Novel */
export const create = async (req: Request, res: Response) => {
	const { name, author, chapters, latest_chapter, comments } = req.body;

	try {
		const connection: any = await QueryConnection();
		connection.query(
			'INSERT INTO novels SET name = ?, author = ?, chapters = ?, latest_chapter = ?, comments = ?',
			[name, author, chapters, latest_chapter, comments],
			(_err: Error, rows) => {
				connection.release();
				res.render('add-novel', { alert: 'Novel added successfuly.' });
			}
		);
	} catch (err) {
		console.log(err);
	}
};

/** Edit Novel */
export const edit = async (req: Request, res: Response) => {
	try {
		const connection: any = await QueryConnection();
		connection.query(
			'SELECT * FROM novels WHERE id = ?',
			[req.params.id],
			(_err: Error, rows) => {
				connection.release();
				res.render('edit-novel', { rows });
			}
		);
	} catch (err) {
		console.log(err);
	}
};

/** Update Novel */
export const update = (req: Request, res: Response) => {
	const { name, author, chapters, latest_chapter, comments } = req.body;
	const pool = connectDB();
	pool.getConnection((err, connection) => {
		if (err) throw err;
		console.log('Connected as ID ' + connection.threadId);

		connection.query(
			'UPDATE novels SET name = ?, author = ?, chapters = ?, latest_chapter = ?, comments = ? WHERE id = ?',
			[name, author, chapters, latest_chapter, comments, req.params.id],
			(err, rows) => {
				connection.release();
				if (!err) {
					pool.getConnection((err, connection) => {
						if (err) throw err;
						console.log('Connected as ID ' + connection.threadId);
						connection.query(
							'SELECT * FROM novels WHERE id = ?',
							[req.params.id],
							(err, rows) => {
								connection.release();
								if (!err) {
									res.render('edit-novel', {
										rows,
										alert: `${name} has been updated.`,
									});
								} else {
									console.log(err);
								}
								console.log('The data from novel table: \n', rows);
							}
						);
					});
				} else {
					console.log(err);
				}
			}
		);
	});
};

// Delete Novel
export const deleteNovel = async (req: Request, res: Response) => {
	// const pool = connectDB();
	// Delete a record
	// pool.getConnection((err, connection) => {
	//   if(err) throw err; // not connected!
	//   console.log('Connected as ID ' + connection.threadId);

	//   // User the connection
	//   connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {
	//     // When done with the connection, release it
	//     connection.release();
	//     if(!err) {
	//       res.redirect('/');
	//     } else {
	//       console.log(err);
	//     }
	//     console.log('The data from user table: \n', rows);

	//   });
	// });

	try {
		const connection: any = await QueryConnection();
		connection.query(
			'UPDATE novels SET status = ? WHERE id = ?',
			['removed', req.params.id],
			(_err: Error, rows) => {
				connection.release();
				let removedNovel = encodeURIComponent('Novel successfuly removed.');
				res.redirect('/?removed=' + removedNovel);
			}
		);
	} catch (err) {
		console.log(err);
	}
};

// View Single Novel
export const viewall = async (req: Request, res: Response) => {
	try {
		const connection: any = await QueryConnection();
		connection.query(
			'SELECT * FROM novels WHERE id = ?',
			[req.params.id],
			(_err: Error, rows) => {
				connection.release();
				res.render('view-novel', { rows });
			}
		);
	} catch (err) {
		console.log(err);
	}
};
