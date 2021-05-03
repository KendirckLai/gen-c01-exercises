const getUserChoice = userInput => {
    userInput = userInput.toLowerCase();
    if(userInput === "rock" || userInput === "paper" || userInput === "scissors"){
      return userInput;
    } else if (userInput === "bomb"){
      return userInput;
    } else {"wtf?"}
  };
  
  // console.log(getUserChoice("rock"));
  // console.log("user test " + getUserChoice("bomb"));
  
  function getComputerChoice(){
    const randomNumber = Math.floor(Math.random() * 3);
    // console.log(randomNumber);
    if(randomNumber === 0){
      return "rock"
    } else if (randomNumber === 1){
      return "paper"
    } else if (randomNumber === 2){
      return "scissors"
    }
  }
  
  // console.log("computer test " + getComputerChoice());
  
  function determineWinner(userChoice, computerChoice){
    if(userChoice === computerChoice){
      return "tie!";
    };
    if(userChoice === "rock"){
      if(computerChoice === "paper"){
        return "computer won!!!";
      } else {
        return "You won!";
      }
    }
    if(userChoice === "paper"){
      if(computerChoice === "scissors"){
        return "computer won!";
      } else {
        return "you suck lmao";
      }
    }
    if(userChoice === "scissors"){
      if(computerChoice === "rock"){
        return "computer won a!"
      } else {
        return "yes u won!"
      }
    }
    if(userChoice === "bomb"){
      return "holy shit stop cheating!";
    }
  };
  
  // console.log("test win " + determineWinner("paper", "paper"));
  // console.log(determineWinner("rock", "scissors"));
  // console.log(determineWinner("scissors", "rock"));
  
  
  const playGame = () => {
    const userChoice = getUserChoice("bomb");
    const computerChoice = getComputerChoice();
    console.log('user ' + userChoice);
    console.log('computer ' + computerChoice);
    console.log(determineWinner(userChoice, computerChoice));
  }
  
  playGame();
  