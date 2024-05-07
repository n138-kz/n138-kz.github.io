/*
* https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}
function getRandomInt(min=0, max=0) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function getRandomLowerString(strlen=16) {
	result = '';
	for (let i = 0; result.length < strlen; i++) {
		// ASCII 97  = a
		// ASCII 122 = z
		result += String.fromCharCode(getRandomInt(97, 122));
	}
	return result;
}
const getRandomString = getRandomLowerString;
