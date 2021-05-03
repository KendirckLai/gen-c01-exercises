

async function loadApplicationJobs() {
  const res = await fetch(`/getAdmin-applied-jobs/`);
  const jobs = await res.json();

  const applicationContainer = document.querySelector(".tbl-content");


  for (let job of jobs) {
    console.log('this is job cv' )
    console.log(job.cv)
    applicationContainer.innerHTML += `
    <div class="tbl-content">
    <table cellpadding="0" cellspacing="0" border="0">
      <tbody>
        <tr>
          <td>${job.position}</td>
          <td>${job.company}</td>
          <td>${job.location}</td>
          <td>${job.tecky_partner}</td>
          <td><a href="../../uploads/${job.cv}">${job.cv}</td>
          <td>${job.application_date.substring(0, 10)}</td>
          <td>${job.application_status}</td>
          <td>
          <form action="/sendMailOut" method="POST" class="send-mail-form"  enctype="multipart/form-data">
          <input type='hidden' name="sendMail" value="${job.id}"/>
          <button class="btn btn-sm btn-primary application-send-button" id="${job.id}">Send </button>
          </form>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    </section>`;


    //original 
    document.querySelectorAll(`.send-mail-form`).forEach(item => {
      item.addEventListener("submit", async function (event) {
        event.preventDefault();
        const form = event.target;
        const formObject = {
          content: form.mailgun,
        };
        formObject['sendMail'] = form.sendMail.value;
          const res = await fetch(`/sendMailOut/${form.sendMail.value}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            }
            // body: JSON.stringify(formObject)
          });
          window.alert('the mail is sent')
          const result = await res.json();
 
      })
    })
  }
}

loadApplicationJobs();


      //original form (no cc)
      // document.querySelector('.send-mail-form')
      // .addEventListener("submit", async function (event) {
      //   event.preventDefault();
      //   const form = event.target;
      //   const formObject = {
      //     content: form.mailgun,
      //   };
      //   formObject['sendMail'] = form.sendMail.value


      //   const res = await fetch(`/sendMailOut/${form.sendMail.value}`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json"
      //     }
      //     // body: JSON.stringify(formObject)
      //   });
      //   console.log('The mail is sent');
      //   const result = await res.json();
      //   console.log('this is result')
      //   console.log(formObject)
      // })
      // }








      // document.querySelector = async function (event) {
      //   if (event.target.matches(".apply-job-details")) {
      //     const targetId = event.getAttribute("data-id");
      //     const res = await fetch('/sendMailOut');
      //     const emails = await json();
      //     const result = emails.find(({ id }) => id === parseInt(targetId));
      //     console.log('this is targetId')
      //     console.log(targetId);
      //     console.log('this is emails')
      //     console.log(emails)
        //   const applicationContainer = document.querySelector("#applications-container");
        //   applicationContainer.innerHTML = `
        //   <div class="row application-details">
        //   <div class="col apply-job-details" data-id="${target.id}>
        //     <div>${result.job_title} </div>
        //   </div>    
        //   <div class="col apply-job-details" data-id="${target.id}>
        //     <div>${result.company} </div>
        //   </div>  

        //   <div class="col apply-job-details" data-id="${target.id}>
        //     <div>${result.location}</div>
        //   </div>
        //   <div class="col apply-job-details" data-id="${target.id}>
        //     <div>${result.tecky_partner}</div>
        //   </div>
        //   <div class="col apply-job-details" data-id="${target.id}>
        //     <div><a href="../../uploads/${job.cv}">${result.cv}</a></div>
        //   </div>

        //   <div class="col apply-job-details" data-id="${target.id}>
        //     <div>${result.application_status}</div
        //   </div>
        //   <div class="col apply-job-details" data-id="${target.id}>
        //     <div>${result.latest_application_date}</div>
        //   </div>
        //   <div class="col apply-job-details" data-id="${target.id}>
        //     <div>${result.first_name} ${result.last_name}</div>
        // </div>

        //  <form action="/sendMailOut" method="POST" class="apply-job-details" data-id="${target.id}">
        //     <button class="btn btn-sm btn-primary application-send-button" ">Send </button>
        //  </form>

        //   </div>
        // </div>
        //   `;


        // document.querySelector('.application-send-button')
        // .addEventListener("click", async function (event) {
        //   event.preventDefault();
        //   const targetId = event.target.getAttribute('data-id');
        //   const res = await fetch(`/sendMailOut/${targetId}`, {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json"
        //     }
        //     // body: JSON.stringify(formObject)
        //   });
        //   window.alert('The mail is sent');
        //   const result = await res.json();
        //   console.log('this is result')
        //   console.log(result)
        // })

//       }

// }





