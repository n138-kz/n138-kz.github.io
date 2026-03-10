function init_setFavicon(faviconUrl='https://www.google.com/s2/favicons?size=64&domain='+'https://n138-kz.github.io',faviconsAPI=false) {
	faviconUrl=faviconsAPI?'https://www.google.com/s2/favicons?size=64&domain='+faviconUrl:faviconUrl;
	['icon', 'apple-touch-icon', 'favicon'].forEach((e)=>{
		document.querySelectorAll('link[rel="'+e+'"]').forEach((e)=>e.remove());
		let favicon = document.createElement('link');
		favicon.rel = e;
		favicon.href = faviconUrl;
		document.head.prepend(favicon);
		console.debug(`init:Setting-tag:link::rel:${e}`,faviconUrl);
	});
}

const insertFavicon = init_setFavicon;

const isNumber = function(value) {
	return ((typeof value === 'number') && (isFinite(value)));
};

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

async function get_GETarray(q) {
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

async function textToBlob(contenttype='text/plain', contentdata='') {
	const blob=new Blob([contentdata], {type: contenttype});
	return [blob,window.URL.createObjectURL(blob)];
}

async function copyText(text=''){
	navigator.clipboard.writeText(text).then(()=>{
		console.debug('Clipboard Successfully set',text);
	},(e)=>{
		console.error('Failed the copy text.',text);
	});
}

async function getGithubRepos(repos=null) {
	let url='https://api.github.com/repos/';
	if (repos===null) { repos=''; }
	url += repos;

	const response = await fetch(url);
	const json = await response.json();
	return await json;
}

async function getGithubRatelimit() {
	let url='https://api.github.com/rate_limit';

	const response = await fetch(url);
	let json = await response.json();
	json.rate.reset_humanable=new Date(json.rate.reset*10**3);
	return await json;
}

async function getGithubDeployment(github={deployments_url:''}) {
	if (github.deployments_url==false) { return []; }
	let url=github.deployments_url;

	let response = await fetch(url);
	let json = await response.json();
	json = await json[0];

	url=await json.statuses_url;
	response = await fetch(url);
	json = await response.json();
	return await json;
}

async function getIPaddress() {
	let url='https://api.n138.jp/isJP/';

	const response = await fetch(url);
	const json = await response.json();
	return await json.result;
}

function dumpStorage(provider=sessionStorage) {
    let storage = {};
    for (let i = 0; i < provider.length; i++) {
        e = {}
        k = provider.key(i);
        v = provider.getItem(k);
        e[k] = v;
        Object.assign(storage, e)
    }
    return storage
}

function syncStorage(provider1=localStorage, provider2=sessionStorage) {
    let storage = dumpStorage(provider1);
    console.debug(dumpStorage(provider1))
    Object.keys(storage).map(key => {
        provider2.setItem(key,storage[key])
    });
}

function getcookie() {
	cookie=document.cookie.split(';');
	for(let i=0;i<cookie.length;i++){
		cookie[i]=cookie[i].trim()
		cookie[i]=cookie[i].split('=')
		cookie[cookie[i][0]]=cookie[i][1]
		delete cookie[i]
	}
	return cookie
}

window.addEventListener('DOMContentLoaded', (e)=>{
	list=[];
	list.push('https://code.jquery.com/jquery-3.7.1.min.js');
	list.push('https://accounts.google.com/gsi/client');
	list.push('https://www.google.com/recaptcha/api.js?render=6LfCHdcUAAAAAOwkHsW_7W7MfoOrvoIw9CXdLRBA');
	list.push('https://n138-kz.github.io/lib/grecaptcha.js');
	list.push('https://n138-kz.github.io/lib/random.js');
	list.push('https://cdnjs.cloudflare.com/ajax/libs/postscribe/2.0.8/postscribe.min.js');

	let item = null;
	list.forEach(e => {
		item = document.createElement('script');
		item.src = e;
		document.head.appendChild(item);
	});
});
window.addEventListener('load', ()=>{
	let list=[];
	list.push('//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3755829&pid=892200357'); /* 251023_Amazon.co.jp通販サイト(アマゾン)_728x90 */
	/* list.push('//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3755829&pid=892562209'); /* 260308_ソフトバンクオンラインショップ_728x90 */
	/* list.push('//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3755829&pid=892562211'); /* 260308_総合ネット通販 タンタンショップ_300x250 */
	/* list.push('//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3755829&pid=892562212'); /* 260308_障がい者就職支援受付窓口_300x250 */
	/* list.push('//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3755829&pid=892562213'); /* 260308_トリファ_300x250 */
	/* list.push('//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3755829&pid=892562214'); /* 260308_トリファ_300x250_1 */
	/* list.push('//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3755829&pid=892562215'); /* 260308_トリファ_300x250_2 */

	let url=list[getRandomIntInclusive(0,list.length-1)];
	const container = document.createElement('div');
	document.body.prepend(container);

	/* postscribeを使って、そのdivの中にスクリプトを書き込む */
	/* 第一引数：書き込み先の要素 */
	/* 第二引数：実行したいHTML（scriptタグ） */
	postscribe(container, `<script src="${url}"></script>`);
	console.debug(`Ad link has set: ${url}`);
});
window.addEventListener('load', ()=>{
	const social_icon = document.createElement('div');
	social_icon.id='social_icon';

	const grecaptchaBadge = document.querySelectorAll('.grecaptcha-badge');
	if (grecaptchaBadge.length==0) { return; } /* grecaptchaBadge 導入前だったらなにもしない */

	const grecaptchaBadge_rect = grecaptchaBadge[0].getBoundingClientRect();

	const viewport={
		height: window.innerHeight,
		width: window.innerWidth,
	};

	const distanceFrom={
		bottom: viewport.height - grecaptchaBadge_rect.bottom,
		right: viewport.width - grecaptchaBadge_rect.right,
	}

	let social_icon_children=[];
	social_icon_children.push(document.createElement('a'));
	social_icon_children[social_icon_children.length-1].href=`https://github.com/n138-kz`;
	social_icon_children[social_icon_children.length-1].target=`_blank`;
	social_icon_children.push(document.createElement('img'));
	social_icon_children[social_icon_children.length-1].src=`https://github.com/n138-kz.png`;
	social_icon_children[social_icon_children.length-1].style.width=`${grecaptchaBadge_rect.height}px`;
	social_icon_children[social_icon_children.length-1].style.height=`${grecaptchaBadge_rect.height}px`;
	social_icon_children[social_icon_children.length-1].style.borderRadius=`30%`;
	social_icon_children[social_icon_children.length-2].appendChild(social_icon_children[social_icon_children.length-1]); /* a>img */
	social_icon_children.pop();
	social_icon_children=social_icon_children[0]; /* a>img */
	
	social_icon.style.width=`${grecaptchaBadge_rect.height}px`;
	social_icon.style.height=`${grecaptchaBadge_rect.height}px`;
	social_icon.style.bottom=`${distanceFrom.bottom*2+grecaptchaBadge_rect.height}px`;
	social_icon.style.right=`0px`;
	social_icon.style.margin=`0px`;
	social_icon.style.padding=`0px`;
	social_icon.style.position='fixed';
	social_icon.style.backgroundColor='azure';
	social_icon.style.cursor='pointer';
	social_icon.appendChild(social_icon_children); /* div>a>img */

	document.body.appendChild(social_icon);
});
