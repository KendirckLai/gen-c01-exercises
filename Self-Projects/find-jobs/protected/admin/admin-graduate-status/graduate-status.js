
async function loadApplications() {
  const res = await fetch("/getAdmin-graduate-status");
  const applications = await res.json();

  const applicationContainer = document.querySelector("#applications-container");


  for (let application of applications) {
    applicationContainer.innerHTML += `<div class="row application-details">
      <div class="col">
        <div>${application.id} </div>
      </div>    
      <div class="col student-name${application.id}">
     
      </div>  
      <div class="col">
        <div>${application.cohort}</div>
      </div>
      <div class="col total-job-applied">${application.total_job_applied}
      </div>
      <div class="col">
        <div>${application.latest_application_date.substring(0,10)}</div>
      </div>
    </div>`;

    async function getStudentName() {
      const res = await fetch("/get-student-name")
      const students = await res.json();



      // loadStudentNames.innerHTML = `<div class="row application-bar">
      //   <div class="col">
      //   <div>Student Name</div>
      //   </div>`
      
      for (let student of students) {
        console.log(student)
        const loadStudentNames = document.querySelector(`.student-name${application.id}`);
          if (application.id == student.id){
            loadStudentNames.innerHTML = `
            <div class="student-name">
            <div>${student.first_name} ${student.last_name}</div>
            </div>
            `
          }
        }
    }
    getStudentName();
  }
}

loadApplications();


async function studentsWithNoApplication(){
  const res = await fetch("/getGraduate-no-applied-jobs");
  const noApplications = await res.json();

  const noApplicationContainer = document.querySelector("#applications-container-2");


  for (let noApplication of noApplications) {
    if (noApplication.student_id == null){
      noApplicationContainer.innerHTML += `<div class="row application-details">
      <div class="col">
        <div>${noApplication.id} </div>
      </div>    
      <div class="col student-name${noApplication.id}">
     
      </div>  
      <div class="col">
        <div>${noApplication.cohort}</div>
      </div>
      <div class="col total-job-applied"> 0 
      </div>
      <div class="col">
        <div> N/A </div>
      </div>
    </div>`;

    async function getStudentName() {
      const res = await fetch("/get-student-name")
      const students = await res.json();
      console.log('this is student names')
      console.log(students)
      console.log(noApplications)



      // loadStudentNames.innerHTML = `<div class="row application-bar">
      //   <div class="col">
      //   <div>Student Name</div>
      //   </div>`
      
      for (let student of students) {
        console.log(student)
        const loadStudentNames = document.querySelector(`.student-name${noApplication.id}`);
          if (noApplication.id == student.id){
            loadStudentNames.innerHTML = `
            <div class="col student-name">
            <div>${student.first_name} ${student.last_name}</div>
            </div>
            `
          }
        }
    }
    getStudentName();
  }
    }
    
}

studentsWithNoApplication();






  // async function loadTotalJobs(){
  //   const res = await fetch ("/countTotalJobs")
  //   const totalJobs = await res.json();


  //   const loadTotalJobs = document.querySelector(`.total-job-applied${application.id}`);
  //   // loadTotalJobs.innerHTML = `<div class="row application-bar">
  //   // <div class="col">
  //   // <div>Total Job Applied</div>
  //   // </div>`

  //   // for (let totalJob of totalJobs){
  //       loadTotalJobs.innerHTML = `
  //       <div>${totalJobs[0].count}</div>
  //       `
  //   // }




 
  
// async function loadApplications() {
//   const res = await fetch("/getAdmin-graduate-status");
//   const applications = await res.json();



//   for (let application of applications) {
//     applicationContainer.innerHTML += `<div class="row application-details">
//       <div class="col">
//         <div>${application.id} </div>
//       </div>    
//       <div class="col student-name${application.id}">
     
//       </div>  

//       <div class="col">
//         <div>${application.cohort}</div>
//       </div>
//       <div class="col">
//         <div>${application.graduation_date}</div>
//       </div>
//       <div class="col total-job-applied">${application.total_job_applied}
//       </div>
//       <div class="col">
//         <div>${application.latest_application_date}</div>
//       </div>
//       <div class="col">
//         <div></div>
//       </div>
//     </div>`;

//     getStudentName();
//   }
// }

// loadApplications();



// async function getStudentName() {
//   const res = await fetch("/get-student-name")
//   const students = await res.json();
//   console.log('this is student names')
//   console.log(students)


//   const applicationContainer = document.querySelector("#applications-container");


  // loadStudentNames.innerHTML = `<div class="row application-bar">
  //   <div class="col">
  //   <div>Student Name</div>
  //   </div>`
  

//   try 1:

//   for (let student of students) {
//     console.log(student)
//     const loadStudentNames = document.querySelector(`.student-name${students.id}`);
//     loadStudentNames.innerHTML = `
//       <div class="col student-name">
//       <div>${student.first_name} ${student.last_name}</div>
//       </div>
//       `;

//     async function loadApplications() {
//       const res = await fetch("/getAdmin-graduate-status");
//       const applications = await res.json();



//       for (let application of applications) {
//         applicationContainer.innerHTML += `<div class="row application-details">
//             <div class="col">
//               <div>${application.id} </div>
//             </div>    
//             <div class="col student-name${students.id}">
           
//             </div>  
      
//             <div class="col">
//               <div>${application.cohort}</div>
//             </div>
//             <div class="col">
//               <div>${application.graduation_date}</div>
//             </div>
//             <div class="col total-job-applied">${application.total_job_applied}
//             </div>
//             <div class="col">
//               <div>${application.latest_application_date}</div>
//             </div>
//             <div class="col">
//               <div></div>
//             </div>
//           </div>`;

//         loadApplications();
//       }
//     }

//   }
// }

//     getStudentName()