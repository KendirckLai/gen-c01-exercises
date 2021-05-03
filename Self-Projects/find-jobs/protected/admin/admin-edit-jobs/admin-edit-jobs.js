window.onload = function () {
  let searchParams = new URLSearchParams(window.location.search);
  const id = parseInt(searchParams.get('id'));
  loadEditJob(id);
};

async function loadEditJob(id) {
  const res = await fetch(`/jobs/${id}`);
  const jobs = await res.json();
  const job = jobs[0]
  console.log(job)
  const profileContainer = document.querySelector("#job-form");

  if(job.tecky_partner === true){
    profileContainer.innerHTML = `
  <div class="form-group">
    <label>Position</label>
    <input type="text" class="form-control" id="position" name="position" value="${job.position}">
  </div>
  <div class="form-group">
    <label>Company</label>
    <input type="text" class="form-control" id="company" name="company" value="${job.company}">
  </div>
  <div class="form-group">
    <label>Email</label>
    <input type="text" class="form-control" id="email" name="email" value="${job.email}">
  </div>
  <div class="row">
    <legend class="col-form-label col-sm-2 pt-0">Tecky Partner</legend>
    <div class="col-sm-10">
      <div class="form-check">
        <input class="form-check-input" type="radio" name="tecky_partner" value="true" id="yes-tecky-partner" checked>
        <label class="form-check-label" for="gridRadios1">
          Yes
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="tecky_partner" value="false" id="no-tecky-partner">
        <label class="form-check-label" for="gridRadios2">
          No
        </label>
      </div>
    </div>
  </div>
  <div class="form-group">
    <label>Job Details ( Optional )</label>
    <textarea class="form-control" name="details" id="details" placeholder="Please type here">${job.details}</textarea>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
  `;
  }else{
    profileContainer.innerHTML = `
    <div class="form-group">
      <label>Position</label>
      <input type="text" class="form-control" id="position" name="position" value="${job.position}">
    </div>
    <div class="form-group">
      <label>Company</label>
      <input type="text" class="form-control" id="company" name="company" value="${job.company}">
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="text" class="form-control" id="email" name="email" value="${job.email}">
    </div>
    <div class="row">
      <legend class="col-form-label col-sm-2 pt-0">Tecky Partner</legend>
      <div class="col-sm-10">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="tecky_partner" value="true" id="yes-tecky-partner">
          <label class="form-check-label" for="gridRadios1">
            Yes
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="tecky_partner" value="false" id="no-tecky-partner" checked>
          <label class="form-check-label" for="gridRadios2">
            No
          </label>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label>Job Details ( Optional )</label>
      <textarea class="form-control" name="details" id="details" placeholder="Please type here">${job.details}</textarea>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    `;

  }
  document
    .querySelector("#job-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.target;
      const formObject = {};
      formObject['position'] = form.position.value;
      formObject['company'] = form.company.value;
      formObject['email'] = form.email.value;
      formObject['details'] = form.details.value;
      formObject['tecky_partner'] = form.tecky_partner.value;
      const res = await fetch(`/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formObject)
      });
      const result = await res.json();
      // window.location = '/admin/admin-read-jobs/admin-read-jobs.html'
    });
}
