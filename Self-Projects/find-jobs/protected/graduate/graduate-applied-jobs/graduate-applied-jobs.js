async function loadApplications(){
  const res = await fetch("/getGraduate-applied-jobs");
  const applications = await res.json();

 

  for (let application of applications) {
    const applicationDetails = document.querySelector(".tbl-content");
    console.log(application)
    applicationDetails.innerHTML += `
    <div class="tbl-content">
    <table cellpadding="0" cellspacing="0" border="0">
      <tbody>
        <tr>
          <td>${application.position}</td>
          <td>${application.company}</td>
          <td>${application.location}</td>
          <td>${application.tecky_partner}</td>
          <td> <a href="../../uploads/${application.cv}">${application.cv}</a></td>
          <td>${application.created_at.substring(0,10)}</td>
          <td>${application.application_status}</td>
        </tr>
      </tbody>
    </table>
    </div>
    </section>`;
  }
}


loadApplications();