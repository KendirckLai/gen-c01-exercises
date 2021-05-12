



select users.last_name,users.first_name, application.cohort, application.graduation_date, application.id, application.application_date
from users, application,jobs,students
where application.job_id=jobs.id,application.student_id=students.id, students.user_id=users.id

//try 1 : select  column needs  + group by 
select users.last_name, users.first_name, students.cohort, students.graduation_date, application.id, application.application_date,
count(student_id) as total_job_applied
from application join jobs on application.job_id = jobs.id 
join students on application.student_id = students.id join users
on students.user_id = users.id
group by users.last_name, users.first_name

//try 2:
select users.last_name, users.first_name, students.cohort, students.graduation_date, application.id, application.application_date
from application join jobs on application.job_id = jobs.id 
join students on application.student_id = students.id join users
on students.user_id = users.id

try 3: 
select students.id, cohort, graduation_date,count(student_id) as total_job_applied, Max(application_date) as latest_application_date
    from application 
    join students on application.student_id = students.id
    group by students.id

select * from users join students on students.user_id = users.id


// original function: 
select * from application join jobs on 
application.job_id = jobs.id  join students 
on application.student_id = students.id join users on
 students.user_id = users.id order by application_date desc

// original function: 
 select student_id, count(student_id) as count
      from application
      GROUP BY student_id
      order by student_id asc 

select * from application join jobs on 
application.job_id = jobs.id  inner join students 
on application.student_id = students.id inner join users on
 students.user_id = users.id order by application_date desc


select id,phone_number, count(user_id) as count
    from students
    group by id



    select students.id, cohort, graduation_date,count(student_id) as total_job_applied, Max(application_date) as latest_application_date
  from application 
  join students on application.student_id = students.id
  group by students.id




select students.id, cohort, graduation_date, application.student_id
  from students
  left outer join application on application.student_id = students.id 
  group by students.id,application.student_id
--   having count(student_id) = 0 

select email from jobs



select students.id, cohort, graduation_date
  from students
  join users on students.user_id = users.id 
  group by students.id
 

 select application.id,jobs.tecky_partner,jobs.position,jobs.company,jobs.location,students.cv,application.application_date,application.application_status from application join jobs on application.job_id = jobs.id  join students on application.student_id = students.id join users on students.user_id = users.id order by student_id asc