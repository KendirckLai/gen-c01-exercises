async function loadJobs() {
  const res = await fetch("/jobs");
  const jobs = await res.json();

  const jobContainer = document.querySelector(".job-container");
  jobContainer.innerHTML = "";

  for (let job of jobs) {
    jobContainer.innerHTML += `
    <div class="card1" style="width: 100%;">
    <div class="card-header j" data-id="${job.id}">
      <i class="fas fa-laptop"></i>
    </div>
    <ul class="list-group list-group-flush job j" data-id="${job.id}">
      <li class="list-group-item j db" data-id="${job.id}"> Position : ${job.position}</li>
      <li class="list-group-item j db" data-id="${job.id}">  Company : ${job.company}</li>
      <li class="list-group-item j db" data-id="${job.id}">  Location : ${job.location}</li>
      <li class="list-group-item j db" data-id="${job.id}"> Email : ${job.email}</li>
      <li class="list-group-item j db" data-id="${job.id}">   Date : ${job.created_at.substring(0, 10)}</li>
    </ul>
  </div>
        `;
  }

  jobContainer.onclick = async function (event) {
    if (event.target.matches(".j")) {
      const targetId = event.target.getAttribute("data-id");
      const res = await fetch(`/jobs`);
      const jobs = await res.json();
      const result = jobs.find(({ id }) => id === parseInt(targetId));
      console.log(targetId);
      console.log(jobs);
      console.log(result);
      const jobContainer = document.querySelector(".job-details-container");
      jobContainer.innerHTML = `
    <div class="edbutton">
      <div class="delete-job-container">
        <button class="delete-job btn btn-danger" data-id="${targetId}">Delete</button>
      </div>
      <div class="edit-job-container">
        <button class="edit-job btn btn-primary" data-id="${targetId}">Edit</button>
      </div>      
    </div>
    <div class="card2">
      <div class="card-header">
        <i class="fas fa-laptop"></i>
      </div>
      <ul class="list-group list-group-flush job jo" data-id="${targetId}">
        <li class="list-group-item jo bd" data-id="${targetId}"> Position : ${result.position}</li>
        <li class="list-group-item jo bd" data-id="${targetId}">  Company : ${result.company}</li>
        <li class="list-group-item jo bd" data-id="${targetId}">  Location : ${result.location}</li>
        <li class="list-group-item jo bd" data-id="${targetId}"> Email : ${result.email}</li>
        <li class="list-group-item jo bd" data-id="${targetId}">   Date : ${result.created_at.substring(0, 10)}</li>
        <li class="list-group-item jo bd" data-id="${targetId}"> Details : ${result.details}</li>
      </ul>
    </div>
    `;
      document.querySelector(".delete-job").onclick = async function (event) {
        const targetId = event.target.getAttribute("data-id");
        console.log(targetId);
        const res = await fetch(`/jobs/${targetId}`, {
          method: "DELETE",
        });
        const result = await res.json();
        loadJobs();
        window.alert('The post is successfully deleted.')
        const jobContainer = document.querySelector(".job-details-container");
        jobContainer.innerHTML = "";
      };

      document.querySelector(".edit-job").onclick = async function (event) {
        const targetId = event.target.getAttribute("data-id");
        window.location = `../admin-edit-jobs/admin-edit-jobs.html?id=${targetId}`;
      }
    }
  };
}

loadJobs();

const socket = io.connect();

socket.on("new-job", function (job) {
  const jobContainer = document.querySelector(".job-container");
  jobContainer.innerHTML += `
            <div class="job j" data-id="${job.id}">
                <div class="j" data-id="${job.id}"> Position : ${job.position}</div>
                <div class="j" data-id="${job.id}">  Company : ${job.company}</div>
                <div class="j" data-id="${job.id}"> Location : ${job.location}</div>
                <div class="j" data-id="${job.id}"> Date : ${job.created_at.substring(0, 10)}</div>
            </div>`;
  loadJobs();
});