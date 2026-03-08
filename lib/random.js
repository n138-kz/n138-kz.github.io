/*
* https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
const getRandomArbitrary = (min, max)=>{
	return Math.random() * (max - min) + min;
}
const getRandomInt = (min=0, max=0)=>{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
const getRandomLowerString = (strlen=16)=>{
	result = '';
	for (let i = 0; result.length < strlen; i++) {
		// ASCII 97  = a
		// ASCII 122 = z
		result += String.fromCharCode(getRandomInt(97, 122));
	}
	return result;
}
const getRandomUpperString = (strlen=16)=>{
	result = '';
	for (let i = 0; result.length < strlen; i++) {
		// ASCII 65 = A
		// ASCII 90 = Z
		result += String.fromCharCode(getRandomInt(65, 90));
	}
	return result;
}
const getRandomString = getRandomLowerString;
const getRandomIntInclusive = (min=0, max=1)=>{
	/*
		https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/random#%E5%8C%85%E6%8B%AC%E7%9A%84%E3%81%AB_2_%E3%81%A4%E3%81%AE%E5%80%A4%E3%81%AE%E9%96%93%E3%81%AE%E3%83%A9%E3%83%B3%E3%83%80%E3%83%A0%E3%81%AA%E6%95%B4%E6%95%B0%E3%82%92%E5%BE%97%E3%82%8B
	*/
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // 上限を含み、下限も含む
}