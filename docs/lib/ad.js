function initAd() {
	let list=[];
	list.push('//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3755829&pid=892200357'); /* 251023_Amazon.co.jp通販サイト(アマゾン)_728x90 */
	/* list.push('//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3755829&pid=892562209'); /* 260308_ソフトバンクオンラインショップ_728x90 */
	/* list.push('//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3755829&pid=892562211'); /* 260308_総合ネット通販 タンタンショップ_300x250 */
	/* list.push('//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3755829&pid=892562212'); /* 260308_障がい者就職支援受付窓口_300x250 */
	/* list.push('//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3755829&pid=892562213'); /* 260308_トリファ_300x250 */
	/* list.push('//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3755829&pid=892562214'); /* 260308_トリファ_300x250_1 */
	/* list.push('//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3755829&pid=892562215'); /* 260308_トリファ_300x250_2 */
	list.push('//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3755829&pid=892566288'); /* 260316_FRONTIERダイレクト_468x60 */
	list.push('//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3755829&pid=892566289'); /* 260316_NEC Direct(NECダイレクト)_728x90 */
	list.push('//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3755829&pid=892566290'); /* 260316_ソースネクスト_728x90 */
	list.push('//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3755829&pid=892566291'); /* 260316_Renta！_728x90 */
	list.push('//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3755829&pid=892566292'); /* 260316_Renta！_728x90_1 */
	/* list.push('//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3755829&pid=892566294'); /* 260316_オーディオブック配信 audiobook.jp_728x90 */
	/* list.push('//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3755829&pid=892566295'); /* 260316_オーディオブック配信 audiobook.jp_728x90_1 */
	/* list.push('//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3755829&pid=892566296'); /* 260316_オーディオブック配信 audiobook.jp_728x90_2 */
	list.push('//ad.jp.ap.valuecommerce.com/servlet/smartphonebanner?sid=3755829&pid=892566293&position=overlay'); /* 260316_オーディオブック配信 audiobook.jp_320x50 */

	let container;
	if (document.querySelectorAll('.ad-container').length>0) {
	} else {
		container = document.createElement('div');
		container.classList.add('ad-container');
		document.body.prepend(container);
	}

	let url=list[getRandomIntInclusive(0,list.length-1)];

	/* postscribeを使って、そのdivの中にスクリプトを書き込む */
	/* 第一引数：書き込み先の要素 */
	/* 第二引数：実行したいHTML（scriptタグ） */
	postscribe(container, `<script src="${url}"></script>`);
	console.debug(`Ad link has set: ${url}`);
}