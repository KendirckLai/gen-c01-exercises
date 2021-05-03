import express, { Request, Response } from 'express';
import { client, io } from './main';

export const jobRoutes = express.Router();

jobRoutes.get('/', getJob);
jobRoutes.post('/', addJob);

jobRoutes.delete('/:id', deleteJob);
jobRoutes.get('/:id', getEditJob);
jobRoutes.put('/:id', editJob);
jobRoutes.post('/:id', applyJob);

async function addJob(req: Request, res: Response) {
  try {
    const { position, company, location, email, tecky_partner, details } = req.body;
    await client.query(/*sql*/`INSERT INTO jobs(position,company,location,email,tecky_partner,created_at,details) VALUES ($1,$2,$3,$4,$5,NOW(),$6)`,
      [position, company, location, email, tecky_partner, details])
    io.emit('new-job', {
      position,
      company,
      location,
      email,
      tecky_partner,
      details
    })
    res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'internal server error, cannot write to database' });
  }
}

async function applyJob(req: Request, res: Response) {
  const { id } = req.params;
  await client.query(/*sql*/`INSERT INTO application(job_id,student_id,application_status,application_date) VALUES ((SELECT id from jobs where id = $1),(SELECT id from students where user_id = $2),$3,NOW())`, [id, req.session?.user.id, 'Applied'])
  res.json({ success: true });
}

async function deleteJob(req: Request, res: Response) {
  const jobId = parseInt(req.params.id);
  if (isNaN(jobId)) {
    res.status(400).json({ msg: "id is not a number!" });
    return;
  }
  await client.query(`DELETE FROM application where job_id = $1`, [jobId])
  await client.query(/*sql*/`DELETE FROM jobs where id = $1`, [jobId]);
  res.json({ success: true });
}

async function getEditJob(req: Request, res: Response) {
  const jobId = req.params.id;
  const result = await client.query(`SELECT * FROM jobs where jobs.id = $1`, [jobId]);
  res.json(result.rows);
}

async function editJob(req: Request, res: Response) {
  const { position, company, email, tecky_partner, details } = req.body;
  const jobId = req.params.id;
  await client.query(`UPDATE Jobs SET position = $1, company = $2, email = $3, tecky_partner = $4, details = $5 where id = $6`
    , [position, company, email, tecky_partner, details, jobId]);
  const jobs = (await client.query(`SELECT * FROM jobs WHERE id = $1`, [jobId])).rows;
  let job = jobs[0]
  if (req.session) {
    req.session.job = job
  }
  res.json({ success: true });
}

async function getJob(req: Request, res: Response) {
  const result = await client.query(/*sql*/`SELECT * FROM jobs order by created_at desc`);
  res.json(result.rows);
}