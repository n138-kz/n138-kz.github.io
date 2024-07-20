function insertTopMaker() {
	const html_top = document.createElement('a');
	html_top.name='_';
	document.head.prepend(html_top);
}
function insertFavicon() {
	['icon', 'apple-touch-icon', 'favicon'].forEach((e)=>{
		let favicon = document.createElement('link');
		favicon.rel = `${e}`;
		favicon.href = (location.origin) + '/lib/favicon.webp';
		favicon.type = 'image/webp';
		document.head.appendChild(favicon);
	});
}
const isNumber = function(value) {
	return ((typeof value === 'number') && (isFinite(value)));
};
function insertLastElement() {
	const domLastElement = document.createElement('div');
	domLastElement.id='lastElement';
	domLastElement.style.height="150px";
	Array.from( document.querySelectorAll( '#' + domLastElement.id ) ).map( (item)=>{
		console.debug(item);
		item.remove();
	} )
	document.body.appendChild(domLastElement);
}
async function http_get_json(url) {
	/*
	 * @inspire: {
	 - https://zenn.dev/kawaxumax/articles/0044a0e30536e2
	 }
	 * @usage: 
	 console.trace(await http_get_json('https://api.github.com/users/n138-kz/repos?sort=name&per_page=100'));
	*/
	const opt = {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	}
	const xml = await fetch(url);
	const res = await xml.json();
	/*
	console.warn(xml); // => Response
	console.warn(new Date().getTime(),res); // => json
	*/
	return await res;
}
