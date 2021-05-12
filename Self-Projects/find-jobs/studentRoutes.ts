import express, { Request, Response } from "express";
import { client, upload } from "./main";

export const studentRoutes = express.Router();

studentRoutes.post("/students", upload.single("cv"), uploadStudent);
studentRoutes.get("/students", getStudent);
studentRoutes.put("/students", upload.single("cv"), editStudent);

async function uploadStudent(req: Request, res: Response) {
  const { phone_number, looking_for_job, personal_website, date_of_birth, cohort } = req.body;
  const userId = req.session?.user.id;
  await client.query(/*sql*/`INSERT into students (phone_number,looking_for_job,cv,personal_website,date_of_birth,cohort,user_id) values ($1,$2,$3,$4,$5,$6,$7)`,
    [phone_number, looking_for_job, req.file.filename, personal_website, date_of_birth, cohort, userId]);
  res.json({ success: true });
}

async function editStudent(req: Request, res: Response) {
  const { personal_website, phone_number, date_of_birth, cohort, looking_for_job } = req.body;
  const userId = req.session?.user.id;
  await client.query(`UPDATE students SET phone_number = $1, looking_for_job = $2, cv = $3, personal_website = $4, date_of_birth = $5, cohort = $6 where user_id = $7`,
    [phone_number, looking_for_job, req.file.filename, personal_website, date_of_birth, cohort, userId]);
  const users = (await client.query(`SELECT * FROM users WHERE id = $1`, [userId])).rows;
  let user = users[0]
  if (req.session) {
    req.session.user = user
  }
  res.json({ success: true });
}

async function getStudent(req: Request, res: Response) {
  try {
    const userId = req.session?.user.id;
    const result = await client.query(`SELECT * from students JOIN users on users.id = students.user_id where users.id = $1`, [userId]);
    res.json(result.rows);
  } catch (e) {
    console.log(e)
    res.json({ msg: e.message })
  }
}