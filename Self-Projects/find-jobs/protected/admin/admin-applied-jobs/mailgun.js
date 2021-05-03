

// You can see a record of this email in your logs: https://app.mailgun.com/app/logs.

// You can send up to 300 emails/day from this sandbox server.
// Next, you should add your own domain so you can send 10000 emails/month for free.


// mg.messages().send(data, function (error, body) {
// 	if (error) {
// 		console.log(error);
// 	}
// 	console.log(body);
// })


// document.querySelector('.send-mail-form')
// 	.addEventListener("submit", async function (event) {
// 		event.preventDefault();
// 		const form = event.target;
// 		const formObject = {
// 			content: form.mailgun
// 		};
// 		formObject['sendMail'] = form.sendMail.value


// 		const res = await fetch(`/sendMailOut/${form.sendMail.value}`, {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json"
// 			}
// 			// body: JSON.stringify(formObject)
// 		});
// 		console.log('The mail is sent');
// 		const result = await res.json();
// 		console.log('this is result')
// 		console.log(formObject)
// 	})




	// if () {
	// 	data[to] = await client.query(`SELECT`)
	// }




