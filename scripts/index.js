function createLocalDistantUrl(local, distant) {
    distant = distant || local;
    return function (url, isHttps) {
        var https = isHttps !== null ? ((isHttps ? 'https' : 'http') + '://') : "";
        return (isLocal) => https + (isLocal ? local : distant) + url;
    }
}

var bar = createTabHeader(document.getElementsByTagName("body")[0]);

function getIP(json) {
    bar.localhostCheckbox.checked = (json.ip === '78.204.134.16');
    setAddress();
    bar.start(true);
}

var setAddresses = null;

function setAddress() {
    setAddresses(bar);
    setAddresses = undefined;
}