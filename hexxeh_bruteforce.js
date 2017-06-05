function main (inputArray) {
	var resultsArray = [];
	inputArray = inputArray.split('\n');

	inputArray.forEach(function (elem, index) {
		// to skip first element as per HackerEarth test input
		if (index === 0) {
			return;
		}

		var base10Input = parseInt(elem, 16);
		var hexxehSearchBase10 = base10Input;

		var isHexxehFound = false;
		while (isHexxehFound === false) {
			hexxehSearchBase10++;
			isHexxehFound = hexxehSearcher(hexxehSearchBase10);
		// console.log('searcher returned', isHexxehFound, 'input is', hexxehSearchBase10);
		}

		console.log(hexxehSearchBase10.toString(16));

	// commented to comply with HackerEarth output rules
	// resultsArray.push(hexxehSearchBase10.toString(16));
	// console.log('final result is', resultsArray);
	});
}

function hexxehSearcher (input) {
	var hexxehSearchResult = false;

	var hexString = input.toString(16);
	var hexArray = hexString.split('');

	var startPointer = 0;
	var endPointer = hexArray.length - 1;

	while (startPointer <= endPointer) {
		if (hexArray[startPointer] !== hexArray[endPointer]) {
			// console.log('input not hexxeh, breaking');
			break;
		}

		// search exit conditions
		if (startPointer === endPointer) {
			hexxehSearchResult = true;
		} else if (startPointer + 1 === endPointer) {
			hexxehSearchResult = true;
		}

		startPointer++;
		endPointer--;
	}
	return hexxehSearchResult;
}

// HackerEarth original problem set
// var testInput = '4\n11\n1c0\n1c3\nd25a';

// test suite
// min max values from 1 to 4 characters, also single middle and paired middle
// variations of lower or upper got larger first, mixed lower upper sequence
// high max value
// random values
var testInput = '4\n1\nf\n22\nff\n303\nfff\n4004\nffff\n777f555\n555f777\nabcffabc\ncbaffcba\n1357a6622\n1357a8440\n1357a6422\nffffffffff\n197f02d41ab\nf001de732';
main(testInput);
