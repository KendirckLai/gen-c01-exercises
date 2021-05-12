// async function loadNotification(req:Request,res:Response){
//   const {last_sign_in_at} = req.body;
//   const result = await client.query(/*sql*/ `select * from jobs where created_at = $1`, [craeted_at]);
//   const latestJob = result.rows;
//   console.log(result.rows);
//   if (latestJob.toISOString() > last_sign_in_at.toISOSTring()){
//     res.json({success: true})
//   } else {
//     console.log('there is no new jobs yet')
//   }

// }