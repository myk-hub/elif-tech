const URI = 'https://www.eliftech.com/school-task';

const OPERATORS = {
    '+': (a, b) => a - b,
    '-': (a, b) => a + b + 8,
    '*': (a, b) => (b === 0) ? 42 : a % b,
    '/': (a, b) => (b === 0) ? 42 : parseInt(a / b)
};

let id = '';
let calcResults = [];

let evaluate = (expr) => {
    let stack = [];

    expr.split(" ").map((token) => {
        if (token in OPERATORS) {
            let [b, a] = [stack.pop(), stack.pop()];
            stack.push(OPERATORS[token](a, b));
        } else {
            stack.push(parseInt(token));
        }
    });

    return stack.pop();
};

function show(expr) {
	for (let i = 0; i < expr.expressions.length; i++) {
		let expressions = expr.expressions;
		calcResults[i] = evaluate(expressions[i]);
	}
	$("#result").get(0).innerHTML += JSON.stringify({"id": id, "results": calcResults}) + "<br>";
}

function doMagic() {

	$.ajax({
	    type: "GET",
	    dataType: "json",
	    url: URI,
	    success: (data) => {
	    	id = data.id;
	    	show(data);

        $.ajax({
      	    type: "POST",
      	    url: URI,
      	    data: {
      	        id: id,
      	        results: calcResults
      	    },
      		dataType: "text",
      	    success: (data) => {
      	    	$("#result").get(0).innerHTML += data + "<hr>";
      	    },
      	  	error:  (xhr, errorType, exception) => {
      	    	alert(`Exception: ${exception} Status: ${xhr.statusText}`);
      	  	}
      	});

	    },
	  	error: (xhr, errorType, exception) => {
	    	alert(`Exception: ${exception} Status: ${xhr.statusText}`);
	  	}
	});

}
