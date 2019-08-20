function createLocalDistantUrl(local, distant) {
    distant = distant || local;
    return function (url, isHttps) {
        var https = isHttps !== null ? ((isHttps ? 'https' : 'http') + '://') : "";
        return (isLocal) => https + (isLocal ? local : distant) + url;
    }
}
const _55 = createLocalDistantUrl('192.168.1.55', 'box.faustvx.fr');
const box = createLocalDistantUrl('box.faustvx.fr');

var bar = createTabHeader(document.getElementsByTagName("body")[0]);
bar.insertTab('domoticz', _55(':90/#/Login', false), 'Domoticz');
bar.insertTab('transmission', _55(':9091/transmission/web/', false), 'Transmission');
bar.insertTab('plex', _55(':32400/web/index.html#', false), 'Plex');
bar.insertTab('freebox', box(':6688/login.php', true), 'FreeBox');

function getIP(json) {
    bar.localhostCheckbox.checked = (json.ip === '78.204.134.16');
    bar.start(true);
}