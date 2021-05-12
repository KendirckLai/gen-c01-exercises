const input = 'hello'
// console.log(input);

const vowels = ['a', 'e', 'i', 'o', 'u'];
// console.log(vowels);

let resultArray = [];
// console.log(resultArray);

for(i = 0; i < input.length; i++){
  // console.log("i is " + i);
  // console.log(input[i])
  for(j = 0; j < vowels.length; j++){
    if(input[i] === vowels[j]){
      if(input[i] === 'e'){
        resultArray.push('ee')
      } else if (input[i] === 'u') {
        resultArray.push('uu')
      } else {
        resultArray.push(input[i])
      }
    }
  }
}

console.log(resultArray.join("").toUpperCase());