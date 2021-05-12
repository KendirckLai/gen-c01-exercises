
create table users(
  id SERIAL PRIMARY KEY,
  first_name varchar(255),
  last_name varchar(255),
  username varchar(255),
  password varchar(255),
  role varchar(255)
);

create table students(
  id SERIAL PRIMARY KEY,
  phone_number integer,
  looking_for_job boolean,
  personal_website text,
  date_of_birth Date,
  cohort integer,
  graduation_date Date, 
  CV text,
  user_id integer,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

create table jobs(
  id SERIAL PRIMARY KEY,
  position varchar(255),
  company varchar(255),
  location varchar(255),
  email varchar(255),
  tecky_partner boolean,
  created_at timestamp,
  details text
);

create table application(
  id SERIAL PRIMARY KEY,
  application_date timestamp,
  application_status varchar(255), -- email sent, waiting for review
  job_id integer,
  FOREIGN KEY (job_id) REFERENCES jobs(id),
  student_id integer,
  FOREIGN KEY (student_id) REFERENCES students(id)
);

create table notifications(
  id SERIAL PRIMARY KEY,
  content text,
  job_id integer,
  FOREIGN KEY (job_id) REFERENCES jobs(id),
  student_id integer,
  FOREIGN KEY (student_id) REFERENCES students(id),
  is_read boolean
);
