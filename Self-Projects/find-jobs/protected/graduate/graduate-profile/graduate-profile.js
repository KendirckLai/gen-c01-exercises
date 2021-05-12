window.onload = function(){
  loadUser();
  loadStudent();
}

async function loadUser() {
  const res = await fetch(`/users`);
  const user = await res.json();

  console.log(user);// Delete it at the end
  const userName = document.querySelector("#username");
  userName.innerHTML = `${user.first_name} ${user.last_name}`;

  const userEmail = document.querySelector("#user-email");
  userEmail.innerHTML = `${user.username}`;
}

async function loadStudent() {
  const res = await fetch('/students');
  const students = await res.json();
  const student = students[0];
  console.log('this is students')
  console.log(students);// Delete it

  const cohort = document.querySelector("#cohort");
  cohort.innerHTML = `${student.cohort}`;

  const dateOfBirth = document.querySelector("#date-of-birth");
  dateOfBirth.innerHTML = `${student.date_of_birth.substring(0,10)}`;

  const personalWebsite = document.querySelector("#personal-website");
  personalWebsite.innerHTML = `${student.personal_website}`;

  const phoneNumber = document.querySelector("#phone-number");
  phoneNumber.innerHTML = `${student.phone_number}`;

  const lookingForJob = document.querySelector("#looking-for-job");
  lookingForJob.innerHTML = `${student.looking_for_job}`;

  const cv = document.querySelector("#cv");
  cv.innerHTML = `<a href="../../uploads/${student.cv}">My CV</a>`;
}
