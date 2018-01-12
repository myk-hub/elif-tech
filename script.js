const URL = 'https://www.eliftech.com/school-task';
const operators = {
    '+': (a, b) => a - b,
    '-': (a, b) => a + b + 8,
    '*': (a, b) => (b === 0) ? 42 : a % b,
    '/': (a, b) => (b === 0) ? 42 : parseInt(a / b)
};

let expressions;
let id = "";
let results = [];
let resultData;

let evaluate = (expr) => {
    let stack = [];

    expr.split(" ").forEach((token) => {
        if (token in operators) {
            let [b, a] = [stack.pop(), stack.pop()];
            stack.push(operators[token](a, b));
        } else {
            stack.push(parseInt(token));
        }
    });

    return stack.pop();
};

function culc(exp) {
  for (let i = 0; i < exp.length; i++) {
    results[i] = evaluate(exp[i]);
  }
  resultData = JSON.stringify({"id": id, "results": results});
  document.getElementById("result").innerHTML += `${resultData} <br>`;
}

function doMagic() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', URL, true);
  xhr.send();
  xhr.onreadystatechange = () => {
    if (xhr.readyState != 4) return;
    if (xhr.status != 200) {
      console.log(`Status: ${xhr.status} StatusText:  ${xhr.statusText}`);
    } else {
      id = JSON.parse(xhr.responseText).id;
      expressions = JSON.parse(xhr.responseText).expressions;
      culc(expressions);
    }
  }
  setTimeout(post,3000);
}

function post() {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', URL, true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.send(resultData);
  xhr.onreadystatechange = () => {
    if (xhr.readyState != 4) return;
    if( xhr.status == 200) {
        document.getElementById("result").innerHTML += `${xhr.responseText} <hr>`;
    } else {
        console.log(`Status: ${xhr.status} StatusText:  ${xhr.statusText}`);
    }
  }
}
