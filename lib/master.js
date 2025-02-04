function init_setTopMaker() {
    window.addEventListener('DOMContentLoaded', (e)=>{
        const html_top = document.createElement('a');
        html_top.name='_';
        document.querySelector('body').prepend(html_top);
    }, false);
}
function init_setFavicon(faviconUrl='https://www.google.com/s2/favicons?size=64&domain='+'https://n138-kz.github.io') {
    window.addEventListener('DOMContentLoaded', (e)=>{
        let favicon;
        ['icon', 'apple-touch-icon', 'favicon'].forEach((e)=>{
            favicon = document.createElement('link');
            favicon.rel = e;
            favicon.href = faviconUrl;
            document.querySelectorAll('head').forEach((e)=>e.prepend(favicon));
        });
    }, false);
}
function init_setHeaderText(text={text:null,href:null}) {
    if (text===null || text.text===null || text.href===null) {
        text={text:document.title,href:location.origin};
    }
    window.addEventListener('DOMContentLoaded', (e)=>{
        let header1 = document.createElement('h1');
        let header1_link = document.createElement('a');
        header1_link.href = text.href;
        header1_link.setAttribute('onclick', 'sessionStorage.clear();localStorage.clear();')
        header1_link.title = text.text;
        let header1_text = document.createTextNode(text.text);
        header1_link.appendChild(header1_text);
        header1.appendChild(header1_link);
        document.querySelectorAll('body').forEach((e)=>e.prepend(header1));
    }, false);
}
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

const microtime = ()=>{
	return new Date().getTime()/10**3;
}

const time = ()=>{
	return Math.trunc(microtime());
}

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

async function http_get_json(url, fetch_mode=17, request_opt=null) {
	/*
	 * @inspire: {
	 - https://zenn.dev/kawaxumax/articles/0044a0e30536e2
	 }
	 * @args: {
	 - url: text
	 - fetch_mode: int
		0000 0000 0000 0000
		|||| |||| |||| ||||
		|||| |||| |||| |||+--> (    1) get
		|||| |||| |||| ||+---> (    2) post
		|||| |||| |||| |+----> (    4) head
		|||| |||| |||| +-----> (    8) connect
		|||| |||| ||||
		|||| |||| |||+-------> (   16) json
		|||| |||| ||+--------> (   32) text
		|||| |||| |+---------> (   64) blob
		|||| |||| +----------> (  128) application/stream
		|+++-++++------------> (     ) not in use
		+--------------------> (32768) ignore http response code
	 }
	 * @usage: 
	 console.trace(await http_get_json('https://api.github.com/users/n138-kz/repos?sort=name&per_page=100'));
	*/
	let opt = {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	}
	if ( (fetch_mode & 1)===1 ) { opt.method = 'GET'; }
	if ( (fetch_mode & 2)===2 ) { opt.method = 'POST'; }
	if ( (fetch_mode & 4)===4 ) { opt.method = 'HEAD'; }
	if ( (fetch_mode & 8)===8 ) { opt.method = 'CONNECT'; }
	if ( !!request_opt ) {
		opt = request_opt;
	}
	const xhr = await fetch(url);
	console.debug(Function.name, fetch_mode);
	if ( (fetch_mode & 32768)===32768) {} else {
		if ( ! await xhr.ok) { throw { title: `HTTP Error: ${url}`, url: url, ok: await xhr.ok, message: await xhr.statusText, code: await xhr.status, redirected: await xhr.redirected } }
	}
	const res = await xhr.json();
	/*
	console.warn(xhr); // => Response
	console.warn(new Date().getTime(),res); // => json
	*/
	return await res;
}

async function http_ping(url=location.href) {
	/*
	 * @inspire: {
	 - function http_get_json
	 }
	 * @args: {
	 - url: text
	 }
	 */
	const client_datetime_init = new Date().getTime()/10**3;
	 
	const opt = {
		method: 'HEAD',
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		credentials: 'include',
	}
	
	const xhr = fetch(url);
	const res = await xhr;
	if ( ! await res.ok ) { throw { title: `HTTP Error: ${url}`, url: url, ok: await res.ok, message: await res.statusText, code: await res.status, redirected: await res.redirected } }
	
	const client_datetime_done = new Date().getTime()/10**3;
	
	return {
		'Client-Date': {
			'process-init': client_datetime_init,
			'process-done': client_datetime_done,
			'process-rttms': Math.round( Math.abs( client_datetime_done - client_datetime_init ) * 10**3 ), 
			'process-rtt': Math.round( Math.abs( client_datetime_done - client_datetime_init ) * 10**3 ) / 10**3, 
		},
		url: url,
		ok: await res.ok,
		status: await res.status,
		'Content-Type': await res.headers.get('Content-Type'),
		'Server-Date': new Date(await res.headers.get('date')).getTime() / 10**3,
		headers: [...res.headers.entries()],
	};
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
function get_GETarray(q) {
	/*
	* @args q: (decodeURI(location.search)+'&').replace(/^\?/,'')
	*/
	q=q.split('&')
	let queries=[];
	for (let i=0; i<q.length; i++) {
		if(q[i].length>0){
			if(q[i].indexOf('=')>0){
				query=q[i].split('=');
				queries[query[0]]=query[1];
			} else {
				queries[q[i]]=null;
			}
		}
	}
	return queries;
}
function textToBlob(contenttype='text/plain', contentdata='') {
	const blob=new Blob([contentdata], {type: contenttype});
	return [blob,window.URL.createObjectURL(blob)];
}
function copyText(text=''){
	navigator.clipboard.writeText(text).then(()=>{
		console.debug('Clipboard Successfully set',text);
	},(e)=>{
		console.error('Failed the copy text.',text);
	});
}
