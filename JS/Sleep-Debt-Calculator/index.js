// function getSleepHours(day){
//   if(getSleepHours("monday")){
//     return 8;
//   }
// };

function getSleepHours(day){
    if(day === "monday") {
      return 8;
    } else if ( day === "tuesday") {
      return 9;
    } else if ( day === "wednesday") {
      return 7;
    } else if ( day === "thursday") {
      return 6;
    } else if ( day === "friday") {
      return 8;
    } else if ( day === "saturday") {
      return 9;
    } else if ( day === "sunday") {
      return 12;
    } else {
      return "not a day so sad"
    };
  };
  
  // console.log(getSleepHours("m"));
  
  function getActualSleepHours(){
    return getSleepHours("monday") + getSleepHours("tuesday") + getSleepHours("wednesday") + getSleepHours("thursday") + getSleepHours("friday") + getSleepHours("saturday") + getSleepHours("sunday");
  };
  
  console.log(getActualSleepHours());
  
  function getIdealSleepHours(){
    const idealHours = 9;
    return idealHours * 7
  };
  
  console.log(getIdealSleepHours());
  
  function calculateSleepDebt (){
    const actualSleepHours = getActualSleepHours();
    const idealSleepHours = getIdealSleepHours();
    if(actualSleepHours === idealSleepHours){
      console.log("good job");
    } else if( actualSleepHours > idealSleepHours){
      console.log("u sleep too much " + (idealSleepHours - actualSleepHours));
    } else if( actualSleepHours < idealSleepHours){
      console.log("u gonna die " + (idealSleepHours - actualSleepHours));
    }
  }
  
  calculateSleepDebt();