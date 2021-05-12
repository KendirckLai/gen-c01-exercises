import express, { Request, Response } from 'express';
import { client } from './main';

export const applicationRoutes = express.Router();

applicationRoutes.get('/getAdmin-graduate-status', getAdminGraduateStatus);
applicationRoutes.get('/get-student-name', getStudentName);
// applicationRoutes.get('/student', getStudent); // /student?select=name
applicationRoutes.get('/getGraduate-applied-jobs', getGraduateAppliedJobs);
applicationRoutes.get('/getAdmin-applied-jobs', getAdminAppliedJobs);
applicationRoutes.get('/getGraduate-no-applied-jobs', getGraduateNoAppliedJobs);

// const applicationRoutes2 = express.Router();
// const applicationRoutes3 = express.Router();

// applicationRoutes2.use('/test2', applicationRoutes3);
// applicationRoutes.use('/test', applicationRoutes2);

/test/test2

// async function getStudent(req: Request, res: Response) {
//   const select = req.query.select as string; // select column
//   if (!select) {
//     // get Student
//   } else {
//     if (['name'].includes(select)) {
//       // get Student by column
//       await client.query(/*sql*/ `select * from users join students on students.user_id = users.id where users.${select} =`)
//     }
//   }
// }

async function getAdminGraduateStatus(req: Request, res: Response) {
  const result = await client.query(/*sql*/ `select students.id, cohort, graduation_date,count(student_id) as total_job_applied, Max(application_date) as latest_application_date
  from application 
  join students on application.student_id = students.id join users on students.user_id = users.id 
  group by students.id`);
  res.json(result.rows);
}

async function getStudentName(req: Request, res: Response) {
  const count = await client.query(/*sql*/ `select * from users join students on students.user_id = users.id `)
  res.json(count.rows);
}

async function getGraduateAppliedJobs(req: Request, res: Response) {
  const result = await client.query(/*sql*/ `select * from application join jobs on application.job_id = jobs.id  join students on application.student_id = students.id join users on students.user_id = users.id order by student_id asc`);
  res.json(result.rows);
}

async function getAdminAppliedJobs(req: Request, res: Response) {
  const result = await client.query(/*sql*/ `select application.id,jobs.tecky_partner,jobs.position,jobs.company,jobs.location,students.cv,application.application_date,application.application_status from application join jobs on application.job_id = jobs.id  join students on application.student_id = students.id join users on students.user_id = users.id order by student_id asc`);
  res.json(result.rows);
  console.log(result)
}

async function getGraduateNoAppliedJobs(req: Request, res: Response) {
  const result = await client.query(/*sql*/ `select students.id, cohort, graduation_date, application.student_id
  from students
  left outer join application on application.student_id = students.id 
  group by students.id,application.student_id
  order by students.id asc`);
  res.json(result.rows);
}
