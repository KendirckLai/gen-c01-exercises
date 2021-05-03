let ans1 = checkMarkSix([1, 3, 5, 7, 9, 11], [1, 3]); // returns: true
let ans2 = checkMarkSix([1, 3, 5, 7, 9, 11], [2, 3]); // returns: false
let ans3 = checkMarkSix([2, 4, 10, 15, 14, 19], [2, 19]); // returns: true

console.log(ans1);
console.log(ans2);
console.log(ans3);

function checkMarkSix(ans: number[], input: number[]): boolean {
    for (let i = 0; i < input.length; i++) {
        if (!ans.includes(input[i])) {
            return false;
        }
    }
    return true;
}

quickPicks([1, 3, 5, 7, 9, 11], 1); // returns: [{"bid": [1, 3], "win": true}]
quickPicks([1, 3, 5, 7, 9, 11], 3); // returns: [{"bid": [2, 4], "win": false}, {"bid": [2, 5], "win": false}, {"bid": [7, 9], "win": true}]


function quickPicks(ans: number[], numberOfInputs: number){
    const inputs = [];
    while(inputs.length < numberOfInputs){
        const input:number[] = [];
        while(input.length < 2){
            const randomNum = Math.floor(Math.random() * 10 );
            if(!input.includes(randomNum)){
                input.push(randomNum); 
            }
        }
        inputs.push(input);
    }
    const inputResults:any[] = []
    for(let input of inputs){
        const inputResult = {
            bid: input,
            win:checkMarkSix(ans, input)
        }
        inputResults.push(inputResult);
    }
    console.log("The mark six result: "+ ans);
    const intervalId = setInterval(()=>{
        if(inputResults.length > 0){
            const inputResult  =  inputResults.pop();
            console.log("Your quick pick: ["+inputResult.input+"]");
            console.log(inputResult.win ?  "WIN":"LOSE");
        }else{
            clearInterval(intervalId);
        }
    },1000);    
    
}
