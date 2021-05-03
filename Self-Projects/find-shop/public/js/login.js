window.onload = () => {
	console.log("hello, world");
	document.getElementById("login-form").addEventListener("submit", async function(e) {
		e.preventDefault();
		const data = {};
		for (const input of this) {
			if (!['submit'].includes(input.type)) {
				data[input.name] = input.value;
			}
		}
		this.reset();
		const res = await fetch('/api/v1/users/login', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		  });
		console.log(res.status);
		if (res.status !== 200) {
			const msg = (await res.json()).message;
			alert(msg);
		} else {
			window.location.href = "/home.html";
		}
	});
}