window.onload = function () {
  loadEditProfile();
};

async function loadEditProfile() {
  const res = await fetch(`/students`);
  const students = await res.json();
  const student = students[0];

  const profileContainer = document.querySelector("#student-form");
  profileContainer.innerHTML = `
  <div class="form-group">
    <label for="cohort">Cohort</label>
    <select type="integer" class="form-control" id="cohort" name="cohort" value="${student.cohort}">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
      <option>7</option>
      <option>8</option>
      <option>9</option>
      <option>10</option>
      <option>11</option>
      <option>12</option>
    </select>
  </div>
  <div class="form-group">
    <label>Personal Website</label>
    <input type="text" class="form-control" id="personal-website" name="personal_website" value="${student.personal_website}">
  </div>
  <div class="form-group">
    <label>Phone number</label>
    <input type="integer" class="form-control" id="phone-number" name="phone_number" value="${student.phone_number}">
  </div>
  <div class="form-group">
    <label>Date of Birth</label>
    <input type="date" class="form-control" id="date-of-birth" name="date_of_birth" value="${student.date_of_birth}" required>
  </div>
  <fieldset class="form-group">
    <div class="row">
      <legend class="col-form-label col-sm-2 pt-0">Looking for Job</legend>
      <div class="col-sm-10">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="looking_for_job" id="yes-looking-for-job" value="Yes"
            checked>
          <label class="form-check-label" for="gridRadios1">
            Yes
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="looking_for_job" id="no-looking-for-job" value="No">
          <label class="form-check-label" for="gridRadios2">
            No
          </label>
        </div>
      </div>
    </div>
  </fieldset>
  <div class="form-group">
    <label>My CV</label>
    <div>
      <input type='file' name="cv" value="../../uploads/${student.cv}" />  
    </div>
  </div>      
  <div class="form-group">
    <button type="submit" class="btn btn-primary">Submit</button>
  </div>
  `;
}

document
  .querySelector("#student-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // No need to reload the page
    const form = event.target;
    const formData = new FormData();
    formData.append("personal_website", form.personal_website.value);
    formData.append("phone_number", form.phone_number.value);
    formData.append("date_of_birth", form.date_of_birth.value);
    formData.append("looking_for_job", form.looking_for_job.value);
    formData.append("cohort", form.cohort.value);
    formData.append("cv", form.cv.files[0]);
    const res = await fetch("/students", {
      method: "PUT",
      body: formData,
    });
    const result = await res.json();
    window.location = '/graduate/graduate-profile/graduate-profile.html'
  });
