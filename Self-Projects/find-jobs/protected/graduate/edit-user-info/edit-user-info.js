window.onload = function () {
  loadEditUser();
};

async function loadEditUser() {
  const res = await fetch(`/users`);
  const user = await res.json();

  const profileContainer = document.querySelector("#user-form");
  profileContainer.innerHTML = `
  <div>
    <img class="avatar" src="${user.profile_pic}" alt="" />
  </div>
  <div class="form-group">
    <label>First Name</label>
    <input type="text" class="form-control" id="first-name" name="firstName" value="${user.first_name}">
  </div>
  <div class="form-group">
    <label>Last Name</label>
    <input type="text" class="form-control" id="last-name" name="lastName" value="${user.last_name}">
  </div>
  <div class="form-group">
    <label>Email</label>
    <input type="email" class="form-control" id="username" name="username" aria-describedby="emailHelp" value="${user.username}">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
  `;
}

document
  .querySelector("#user-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // No need to reload the page
    const form = event.target;
    const formObject = {};
    formObject['firstName'] = form.firstName.value;
    formObject['lastName'] = form.lastName.value;
    formObject['username'] = form.username.value;
    const res = await fetch("/users", {
      method: "PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(formObject)
    });
    const result = await res.json();
    window.location = '/graduate/graduate-profile/graduate-profile.html'
  });
