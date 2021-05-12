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
      method: "POST",
      body: formData,
    });
    const result = await res.json();
    window.location = '/graduate/graduate-profile/graduate-profile.html'
  });