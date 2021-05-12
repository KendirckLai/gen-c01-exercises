const userName = "Ken";

//check have mm have user name
userName ? console.log(true) : console.log(false);

//ask question ? 
const userQuestion = "What the fuck magice eight ball?";
console.log(`${userName} asked: ${userQuestion}`);

//make a rando number
const randomNumber = Math.floor(Math.random() * 8);
console.log(randomNumber);

// make variable call eightball
let eightBall = "";

// switch (randomNumber) {
//   case 0:
//   eightBall = "It is certain";
//   break;
//   case 1:
//   eightBall = "It is decidedly so";
//   break;
//   case 2:
//   eightBall = "Reply hazy try again";
//   break;
//   case 3:
//   eightBall = "Connot predict now";
//   break;
//   case 4:
//   eightBall = "Do not count on it";
//   break;
//   case 5:
//   eightBall = "My sources say no";
//   break;
//   case 6:
//   eightBall = "Outlook not so good";
//   break;
//   case 7:
//   eightBall = "Signs point to yes";
//   break;
// }

// console.log(`The eightball answered : ${eightBall}`);

//if statement
if (randomNumber === 0){
  eightBall = "It is certain";
} else if(randomNumber === 1) {
  eightBall = "It is decidedly so";
}