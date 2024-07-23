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
		item.remove();
	} )
	document.body.appendChild(domLastElement);
}

function UserException(message) {
	this.iat = new Date().getTime()/1000;
	this.message = message;
	/*
	/* throw new UserException('test'); * /
	console.error(e);
	object = document.createElement('p');
	object.innerText  = ''
	object.innerText += JSON.stringify(e);
	object.style.color = '#fff';
	object.style.backgroundColor = '#f00';
	object.style.marginTop = '0';
	object.style.marginBottom = '0';
	document.body.appendChild(object);
	*/
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

async function hash_encode(text='', encode='SHA-256') {
	/**
	 * @docs
		https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
	 * @args encode::text
		- SHA-1
		- *SHA-256
		- SHA-384
		- SHA-512
	 * @args text::text
	 * @usage: 
	 console.trace(await hash_encode('text'));
	 console.trace(await hash_encode('text', 'SHA-1'));
	*/
	const uint8  = new TextEncoder().encode(text)
	const digest = await crypto.subtle.digest(encode, uint8)
	return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('')
}
