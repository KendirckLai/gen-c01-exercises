let secretMessage = ['Learning', 'is', 'not', 'about', 'what', 'you', 'get', 'easily', 'the', 'first', 'time,', 'it', 'is', 'about', 'what', 'you', 'can', 'figure', 'out.', '-2015,', 'Chris', 'Pine,', 'Learn', 'JavaScript'];

let js = secretMessage.pop()
console.log(js);

console.log(secretMessage.length);

const tp = secretMessage.push('to', 'Program');
console.log(tp);

console.log(secretMessage.length);
// console.log(secretMessage);

secretMessage[7] = 'right';
// console.log(secretMessage);

secretMessage.shift();
// console.log(secretMessage);

secretMessage.unshift('Programming');
// console.log(secretMessage);

secretMessage.splice(6, 10, 'know');
console.log(secretMessage);

console.log(secretMessage.join(' '));