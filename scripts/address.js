const _55 = createLocalDistantUrl('192.168.1.55', 'box.faustvx.fr');
const box = createLocalDistantUrl('box.faustvx.fr');

bar.insertTab('domoticz', _55(':90/#/Login', false), 'Domoticz');
bar.insertTab('transmission', _55(':9091/transmission/web/', false), 'Transmission');
bar.insertTab('plex', _55(':32400/web/index.html#', false), 'Plex');
bar.insertTab('freebox', box(':6688/login.php', true), 'FreeBox');
