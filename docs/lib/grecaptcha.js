function grecaptcha_init(act = 'homepage'){
	/*
	* Admin console url is 'https://www.google.com/recaptcha/admin'
	*/

	client_id='6LfCHdcUAAAAAOwkHsW_7W7MfoOrvoIw9CXdLRBA';

	grecaptcha.ready(function() {
		try {
			grecaptcha.reset(client_id, {action: act});
		} catch (e) {}

		try {
			grecaptcha.execute(client_id, {action: act}).then(function(token) {
				expire_at = {
					issued_at: new Date().getTime(),
					expire_at: new Date(new Date().getTime()+(5*60*1000)).getTime(),
					/* expire_at: 5min */
				}
				console.debug(expire_at)
				
				localStorage.setItem( (btoa(location.href)).slice(0, 16) + '.reCAPTCHA', {
					issued_at: expire_at.issued_at,
					expire_at: expire_at.expire_at,
					token: token,
				} );
			}).catch((e) => {
				console.error('Error: Google reCAPTCHA Failed.');
				console.trace(e);
			});
		} catch (e) {
			console.error('Error: Google reCAPTCHA Failed.');
			console.trace(e);
		}

	});
}
function grecaptcha_pickup(){
	try {
		token = localStorage.getItem( (btoa(location.href)).slice(0, 16) + '.reCAPTCHA' );
		console.log(token);
		console.log(typeof token);
		
		if( typeof token === 'undefined' ){
			throw 'No token';
		}
		if( typeof token === 'object' && token === null ){
			throw 'No token';
		}
		if( token.length == 0 ){
			throw 'No token';
		}
		return token;
	} catch (e) {
		console.error('Error: Google reCAPTCHA Failed.');
		console.trace(e);
		return null;
	}
}
/* **********+**********+********** */
/**
class googleRecaptcha {
	constructor(sitekey) {
		this.client_id = sitekey;
	}
	init() {
		grecaptcha.execute(this.client_id, {action: 'user/register'}).then((token)=>{
			expire_at = {
				issued_at: new Date().getTime(),
				expire_at: new Date(new Date().getTime()+(5*60*1000)).getTime(),
				/* expire_at: 5min */ /**
			}
			console.debug(expire_at);
			localStorage.setItem( (btoa(location.href)).slice(0, 16) + '.reCAPTCHA', {
				issued_at: expire_at.issued_at,
				expire_at: expire_at.expire_at,
				token: token,
			} );
		});
	}
	getToken() {
		const token = localStorage.getItem( (btoa(location.href)).slice(0, 16) + '.reCAPTCHA' );
		if( typeof token === 'undefined' ){
			return null;
		}
		if( typeof token === 'object' && token === null ){
			return null;
		}
		if( token.length == 0 ){
			return null;
		}
		return token;
	}
}
googleRecaptcha = new googleRecaptcha('6LfCHdcUAAAAAOwkHsW_7W7MfoOrvoIw9CXdLRBA');
googleRecaptcha.init();
/* // **/
