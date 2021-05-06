import { Request, Response } from 'express';

export const landing = (req: Request, res: Response) => {
	res.render('home', {
		layout: 'landing.hbs',
	});
};
