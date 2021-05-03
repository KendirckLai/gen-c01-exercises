document
  .querySelector("#job-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;
    const formObject = {};
    formObject['position'] = form.position.value;
    formObject['company'] = form.company.value;
    formObject['location'] = form.location.value;
    formObject['email'] = form.email.value;
    formObject['tecky_partner'] = form.tecky_partner.value;
    formObject['details'] = form.details.value;
    const res = await fetch("/jobs", {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(formObject)
    });
    const result = await res.json();
    window.location = '/admin/admin-read-jobs/admin-read-jobs.html'
  });