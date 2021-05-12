let raceNumber = Math.floor(Math.random() * 1000);

// console.log(raceNumber);

const early = true;
const age = 18;

if(true && age > 18 ) {
  raceNumber += 1000;
};

if(early && age > 18 ){
  console.log(`race at 9:30am aaaa!! and ur race number is ${raceNumber}`)
} else if (!early && age > 18 ){
  console.log(`u r late race at 11:00am la and ur race number is ${raceNumber}`)
} else if ( age < 18 ) {
  console.log(`u boys race at 12:30pm and ur race number is ${raceNumber}`)
} else {
  console.log('go to registration desk')
};

