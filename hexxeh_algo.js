var hexCharsArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
var resultsArray = [];

function main (inputArray) {
	inputArray = inputArray.split('\n');

	inputArray.forEach(function (elem, index) {
		// to skip first element as per HackerEarth test input
		if (index === 0) {
			return;
		}

		var hexInputSplit = elem.split('');

		var pointerBuffer = assignHexInputSplitPointers(hexInputSplit);
		var lowerPointer = pointerBuffer[0];
		var upperPointer = pointerBuffer[1];
		// console.log('lower is', lowerPointer, hexInputSplit[lowerPointer]);
		// console.log('upper is', upperPointer, hexInputSplit[upperPointer]);

		if (isHexxehChecker(elem) === true) {
			// console.log('input is already hexxeh');
			hexInputSplit = assignNextHexxehValue(hexInputSplit, lowerPointer, upperPointer);

			// console.log('next hexxeh found', hexInputSplit);
			console.log(hexInputSplit.join(''));
			resultsArray.push(hexInputSplit.join(''));
		} else {
			// console.log('input is not hexxeh');

			var wasUpperEverLarger = false;
			var didLowerLargeFirst = false;

			while (lowerPointer >= 0) {
				// console.log('non hexxeh iteration start. lower is', lowerPointer, hexInputSplit[lowerPointer], 'upper is', upperPointer, hexInputSplit[upperPointer]);

				if (hexInputSplit[lowerPointer] !== hexInputSplit[upperPointer]) {
					var assignNonHexxehResult = assignNonHexxeh(hexInputSplit, lowerPointer, upperPointer);
					hexInputSplit = assignNonHexxehResult[0];
					var isUpperLarger = assignNonHexxehResult[1];
				}

				if (wasUpperEverLarger === false && isUpperLarger === false) {
					// console.log('lower larged first');
					didLowerLargeFirst = true;
				}

				if (isUpperLarger === true) {
					// console.log('wasUpperEverLarger triggered');
					wasUpperEverLarger = true;
				}

				lowerPointer--;
				upperPointer++;
			// console.log('non hexxeh iteration end');
			}

			if (didLowerLargeFirst === false && wasUpperEverLarger === true) {
				// console.log('upper was larger condition met, adjusting middle values');
				var upperLargerPointersArray = assignHexInputSplitPointers(hexInputSplit);
				var upperLargerLowerPointer = upperLargerPointersArray[0];
				var upperLargerUpperPointer = upperLargerPointersArray[1];

				// console.log('hexInputSplit is', hexInputSplit);
				// console.log('upperLargerLowerPointer is', upperLargerLowerPointer, 'upper is', upperLargerUpperPointer);
				hexInputSplit = assignNextHexxehValue(hexInputSplit, upperLargerLowerPointer, upperLargerUpperPointer);
			}

			// console.log('non hexxeh to hexxeh complete', hexInputSplit);
			console.log(hexInputSplit.join(''));
			resultsArray.push(hexInputSplit.join(''));
		}
	});
	// console.log('final result is', resultsArray);
}

function assignHexInputSplitPointers (inputArray) {
	// console.log('assignHexInputSplitPointers ran');
	var inputLength = inputArray.length;
	var lowerPointer;
	var upperPointer;

	if (inputLength % 2 === 0) {
		lowerPointer = (inputLength / 2) - 1;
		upperPointer = inputLength / 2;
	} else {
		lowerPointer = upperPointer = Math.floor(inputLength / 2);
	}

	// console.log('input array is', inputArray, ', length is', inputLength, '. lower is', lowerPointer, inputArray[lowerPointer], 'upper is', upperPointer, inputArray[upperPointer]);

	return [lowerPointer, upperPointer];
}

function assignNextHexxehValue (inputArray, lowerPointer, upperPointer) {
	// console.log('assignNextHexxehValue ran');
	var isNextHexxehAssigned = false;

	while (isNextHexxehAssigned === false) {
		var nextHexxehCharResults = assignNextHexxehChar(inputArray, lowerPointer, upperPointer);

		inputArray = nextHexxehCharResults[0];
		isNextHexxehAssigned = nextHexxehCharResults[1];
		var didArrayGetSpliced = nextHexxehCharResults[2];

		if (didArrayGetSpliced === true) {
			lowerPointer = 0;
			upperPointer = inputArray.length - 1;
		// console.log('array was spliced, pointers are adjusted to', lowerPointer, upperPointer);
		} else {
			lowerPointer--;
			upperPointer++;
		}
	}
	return inputArray;
}

function assignNextHexxehChar (inputArray, lowerPointer, upperPointer) {
	// console.log('assignNextHexxehChar ran);
	var isAssignmentComplete = true;
	var didArrayGetSpliced = false;

	if (lowerPointer === upperPointer) {
		// console.log('both pointers are at middle');
		var middleCharIndexOf = hexCharToHexIndexOf(inputArray[lowerPointer]);
		middleCharIndexOf++;

		// console.log(inputArray);
		inputArray[lowerPointer] = hexCharsArray[middleCharIndexOf];
		// console.log(inputArray);

		if (inputArray[lowerPointer] === undefined && lowerPointer === 0) {
			// console.log('full FF hexxeh detected');
			inputArray[lowerPointer] = 0;
			inputArray[upperPointer] = 0;
			isAssignmentComplete = false;
			inputArray.splice(inputArray.length, 0, 0);
			didArrayGetSpliced = true;
		}

		if (inputArray[lowerPointer] === undefined) {
			inputArray[lowerPointer] = 0;
			isAssignmentComplete = false;
		}
	} else {
		var lowerCharIndexOf = hexCharToHexIndexOf(inputArray[lowerPointer]);
		lowerCharIndexOf++;
		// console.log(inputArray);
		inputArray[lowerPointer] = hexCharsArray[lowerCharIndexOf];
		// console.log(inputArray);

		var upperCharIndexOf = hexCharToHexIndexOf(inputArray[upperPointer]);
		upperCharIndexOf++;
		// console.log(inputArray);
		inputArray[upperPointer] = hexCharsArray[upperCharIndexOf];
		// console.log(inputArray);

		if (inputArray[lowerPointer] === undefined && lowerPointer === 0) {
			// console.log('full FF hexxeh detected');
			inputArray[lowerPointer] = 0;
			inputArray[upperPointer] = 0;
			isAssignmentComplete = false;
			inputArray.splice(inputArray.length, 0, 0);
			didArrayGetSpliced = true;
		}

		// if char is already F, hence incremented to undefined, reset back to 0
		if (inputArray[lowerPointer] === undefined) {
			inputArray[lowerPointer] = 0;
			isAssignmentComplete = false;
		}
		if (inputArray[upperPointer] === undefined) {
			inputArray[upperPointer] = 0;
			isAssignmentComplete = false;
		}
	}

	return [inputArray, isAssignmentComplete, didArrayGetSpliced];
}

function assignNonHexxeh (inputArray, lowerPointer, upperPointer) {
	// console.log('non hexxeh assign starts, input is', inputArray, lowerPointer, upperPointer);
	var isUpperLarger = false;

	var lowerCharIndexOf = hexCharToHexIndexOf(inputArray[lowerPointer]);
	var upperCharIndexOf = hexCharToHexIndexOf(inputArray[upperPointer]);

	if (lowerCharIndexOf > upperCharIndexOf) {
		// console.log('lower is larger');
		// console.log(inputArray);
		inputArray[upperPointer] = hexCharsArray[lowerCharIndexOf];
	// console.log(inputArray);
	} else if (lowerCharIndexOf < upperCharIndexOf) {
		// console.log('upper is larger');
		// console.log(inputArray);
		inputArray[upperPointer] = inputArray[lowerPointer];
		isUpperLarger = true;
	// console.log(inputArray);
	}

	return [inputArray, isUpperLarger];
}

function hexCharToHexIndexOf (input) {
	if (typeof input !== 'string') {
		input = input.toString();
	}
	input = input.toLowerCase();
	return hexCharsArray.indexOf(input);
}

function isHexxehChecker (input) {
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
