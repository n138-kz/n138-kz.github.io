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
