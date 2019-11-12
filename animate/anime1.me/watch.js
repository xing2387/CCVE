jwplayer.key = "23eYu0Xfw/pnv69CbffvpmSVhhw49nWlZljZr/awNj0=";
var p = jwplayer("player"),
x = new XMLHttpRequest();
x.open('POST', '/apiv2');
x.withCredentials = !0;
x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
x.onload = function() {
    if (x.status === 200) {
        var a = JSON.parse(x.responseText);
        p.setup({
            id: "player",
            sources: a.sources,
            controls: true,
            title: "一拳超人 第二季 [07]",
            displaytitle: true,
            width: "100%",
            height: "100%",
            aspectratio: "16:9",
            fullscreen: "true",
            image: "https://static.anime1.me/playerImg/9.jpg",
            autostart: false,
            preload: "none",
            playbackRateControls: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2],
            aboutlink: "https://anime1.me",
            abouttext: "Anime1.me 動畫線上看 PLV",
            skin: {
                name: "glow",
            },
            ga: {
                label: "title"
            },
            cast: {
                customAppId: "74E6F5DE"
            },
            tracks: [{
                file: "https://pt.anime1.me/zQdND/thumbnails.vtt",
                kind: "thumbnails"
            }]
        });
    }
};
x.send('d=%7B%22c%22%3A%22510%22%2C%22e%22%3A%227%22%2C%22t%22%3A1573446511%2C%22m%22%3A1%2C%22s%22%3A%220ff1b6477b4c455cea269150d33ee98f%22%7D');
window.addEventListener('message',
function(event) {
    if (event.origin != 'https://anime1.me') return;
    console.log(event);
}); (function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] ||
    function() { (i[r].q = i[r].q || []).push(arguments)
    },
    i[r].l = 1 * new Date();
    a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-43689509-6', {
    'sampleRate': 10
});
ga('send', 'pageview');