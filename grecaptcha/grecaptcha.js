function grecaptcha_init(act = 'homepage')
{
  /*
  * Admin console url is 'https://www.google.com/recaptcha/admin'
  */

  grecaptcha.ready(function() {

    try {
      grecaptcha.reset('6LfCHdcUAAAAAOwkHsW_7W7MfoOrvoIw9CXdLRBA', {action: act});
    } catch (e) {}

    try {
      grecaptcha.execute('6LfCHdcUAAAAAOwkHsW_7W7MfoOrvoIw9CXdLRBA', {action: act}).then(function(token) {
        console.debug('Date of Issue:  ' + new Date().toString());
        console.debug('Date of Expire: ' + new Date(new Date().getTime()+(5*60*1000)).toString());

        sessionStorage.setItem( (btoa(location.href)).slice(0, 16) + '.reCAPTCHA', token );
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
function grecaptcha_pickup()
{
  try {
    token = sessionStorage.getItem( (btoa(location.href)).slice(0, 16) + '.reCAPTCHA' );
    if( token.length == 0 ) {
      throw 'Fatal error';
    }
    return token;
  } catch (e) {
    console.error('Error: Google reCAPTCHA Failed.');
    console.trace(e);
  }
}
