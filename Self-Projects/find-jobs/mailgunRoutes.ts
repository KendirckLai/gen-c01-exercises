
import express, { Request, Response } from 'express';
import mailgun from 'mailgun-js';
import { client } from './main';
export const mailgunRoutes = express.Router();
import path from 'path';



mailgunRoutes.post('/sendMailOut/:id', sendMail)


const API_KEY = '2b2ae93173ac6030dee4ae4431c7e153-e5e67e3e-6a2ae6a6';
const DOMAIN = 'sandbox32eca1bab07f48e1a1e720e9955c0f0f.mailgun.org';
const mailgun = require('mailgun-js')

async function sendMail(req: Request, res: Response) {
	const id = req.params.id
	const emailListResults = await client.query(/*sql*/ `
		select application.id,jobs.email,students.cv, jobs.position 
		from jobs join application on application.job_id = jobs.id 
		join students on application.student_id = students.id 
		where application.id = $1`, [id])
	// const applicationsResults = await client.query(/*sql*/ `select * from application`)

	const emailLists = emailListResults.rows
	const emailList = emailLists[0];
	console.log('this is emailList')
	console.log(emailList)
	const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

	const filepath = path.join(__dirname, `./protected/uploads/${emailList.cv}`);

	const data = {
		from: "Alex & Gordon <tony04701@gmail.com>",
		to: emailList.email,
		subject: `Potential Job Candidates from Tecky, for post of ${emailList.position}`,
		text: "Hi! This is a grant message from Tecky Academy. Here is the job candidate  with CV  you may get huge interest in. Our Micromaster students went through 15-weeks fully immersive coding training They both achieve a decent level in coding with full-stack skills. Please kindly consider if there is chance for both of you to work together. Cheers  ",
		attachment: filepath
	};
	await mg.messages().send(data, function (error, body) {
		if (error) {
			console.log(error.message);
		} else {
			console.log(body);
			console.log('The sendMail is sent');

		}
	});

	res.json({ success: true })
}
