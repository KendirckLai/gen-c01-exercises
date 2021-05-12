function updateStudentList(students) {
    let htmlStr = ``;
    for (const student of students) {
        htmlStr += `
					<li class="list-group-item">${student.name}</li>
				`;
    }
    document.querySelector('.result-area .list-group').innerHTML = htmlStr;
}

async function initPage() {
    const res = await fetch('/api/v1/students');
    const data = await res.json();
    updateStudentList(data.students);
}

window.onload = () => {
    initPage();
    document
        .getElementById('button-addon2')
        .addEventListener('click', async function (e) {
            console.log('clicked');
            const keyword = document.getElementById('search-value').value;
            let query = `/api/v1/students?`;
            if (keyword) {
                query += `keyword=${keyword}`;
            }
            const res = await fetch(query);
            const data = await res.json();
            updateStudentList(data.students);
        });
};
