async function getApiRateOfGithub() {
	const json = await http_get_json('https://api.github.com/rate_limit');
	console.log(await json);
	const res = await json.rate;
	console.log(await res);
}
