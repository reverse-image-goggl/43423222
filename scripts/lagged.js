console.log("LaggedAPI Revenue Share: v1.2.2");
var adBreak = function() {};
"remove"in Element.prototype || (Element.prototype.remove = function() {
    this.parentNode && this.parentNode.removeChild(this)
}
);
LaggedAPI = {};
!function() {
    function e(e) {
        E(e)
    }
    function n() {
        l()
    }
    function r() {
        l()
    }
    function s() {
        l()
    }
    function _(n, r) {
        Q.getElementById("createloginBtnMain").disabled = !0;
        var d = Q.getElementById("createloginBtnMain").innerText;
        Q.getElementById("createloginBtnMain").innerText = "Loading...",
        Q.getElementById("createloginBtnMain").className += " btnloading",
        Q.getElementById("errorsubmit") && Q.getElementById("errorsubmit").remove();
        var e, t, a = "", i = !1, o = [];
        if ("login" != n && (Q.getElementById("inputEmail1") && (a = Q.getElementById("inputEmail1").value),
        (a.length < 2 || 30 < a.length) && (i = !0,
        o.push("Nickname must be between 2-30 characters"))),
        (e = Q.getElementById("inputEmail2").value).length < 5 && (i = !0,
        o.push("Please enter a valid email address")),
        ((t = Q.getElementById("inputEmail3").value).length < 6 || 30 < t.length) && (i = !0,
        o.push("Password must be between 6-30 characters")),
        i) {
            Q.getElementById("createloginBtnMain").innerText = d,
            Q.getElementById("createloginBtnMain").classList.remove("btnloading"),
            Q.getElementById("createloginBtnMain").disabled = !1;
            var l = document.createElement("div");
            l.id = "errorsubmit",
            l.className = "error_msg";
            var s = document.createTextNode(o[0]);
            l.appendChild(s),
            Q.getElementById("signupFormWrap").insertBefore(l, Q.getElementById("loginit"))
        } else {
            var c = new XMLHttpRequest;
            c.onreadystatechange = function() {
                if (4 == this.readyState && 200 == this.status) {
                    var e = this.responseText;
                    if (e = e.replace(")]}',", ""),
                    !0 === (e = JSON.parse(e)).success && 0 < e.uid)
                        Q.getElementById("createloginBtnMain").innerText = "Success!",
                        Q.getElementById("createloginBtnMain").className += " btnSuccessMsg",
                        window.parent.showUserInfo(e),
                        setTimeout(function() {
                            Q.getElementById("createloginBtnMain").className = "main_hs_btn viewranks btnSuccessMsg",
                            p(Q.getElementById("leaderboard-modal")),
                            setTimeout(function() {
                                Q.getElementById("leaderboard-wrapper").remove()
                            }, 200),
                            setTimeout(function() {
                                Q.getElementById("leaderboard-modal").remove(),
                                r && LaggedAPI.Scores.load(u, n)
                            }, 300)
                        }, 600);
                    else {
                        Q.getElementById("createloginBtnMain").innerText = d,
                        Q.getElementById("createloginBtnMain").className = "main_hs_btn viewranks",
                        Q.getElementById("createloginBtnMain").disabled = !1;
                        var t = document.createElement("div");
                        t.id = "errorsubmit",
                        t.className = "error_msg";
                        var a = document.createTextNode(e.errors);
                        t.appendChild(a),
                        Q.getElementById("signupFormWrap").insertBefore(t, Q.getElementById("loginit"))
                    }
                }
            }
            ;
            var m = {
                fnickname: null
            };
            m.ftype = n,
            a && (m.fnickname = encodeURIComponent(a)),
            m.femail = encodeURIComponent(e),
            m.fpass = encodeURIComponent(t),
            c.open("POST", "//lagged.com/api/v3/ajax.php", !0),
            c.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
            c.send("ftype=" + m.ftype + "&fnickname=" + m.fnickname + "&femail=" + m.femail + "&fpass=" + m.fpass)
        }
        return !1
    }
    function p(e) {
        var t = 1;
        a = setInterval(function() {
            if (t <= .1) {
                clearInterval(a);
                try {
                    e.style.display = "none"
                } catch (e) {
                    console.log(e)
                }
            }
            try {
                e.style.opacity = t,
                e.style.filter = "alpha(opacity=" + 100 * t + ")"
            } catch (e) {
                console.log(e)
            }
            t -= .1 * t
        }, 13)
    }
    function q(e) {
        return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    }
    function z(e) {
        return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    function j(e) {
        if (999 < e)
            return z(e);
        if (99 < e)
            return e;
        var t = e % 10
          , a = e % 100;
        return 1 == t && 11 != a ? e + "st" : 2 == t && 12 != a ? e + "nd" : 3 == t && 13 != a ? e + "rd" : e + "th"
    }
    function S() {
        p(Q.getElementById("leaderboard-loading")),
        setTimeout(function() {
            Q.getElementById("leaderboard-loading").remove()
        }, 200)
    }
    function D(e) {
        if (h = window.parent.isFullscreen,
        Q = h ? document : window.parent.document,
        !e) {
            var t = document.createElement("div");
            t.id = "leaderboard-modal",
            t.onclick = function(e) {
                return e.preventDefault(),
                e.stopPropagation(),
                !1
            }
            ,
            Q.body.appendChild(t)
        }
        var a = document.createElement("div");
        a.id = "leaderboard-loading",
        a.className = "leaderboard-circle";
        Q.body.appendChild(a)
    }
    function c(e, t, a, n, r, d) {
        var i = new XMLHttpRequest;
        i.onreadystatechange = function() {
            if (4 == this.readyState && 200 == this.status)
                e = (e = this.responseText).replace(")]}',", ""),
                e = JSON.parse(e),
                r(e, d);
            else if (4 == this.readyState) {
                var e = {
                    success: !1
                };
                r(e, d)
            }
        }
        ;
        var o = "//lagged.com/api/v3/ajax_" + t + ".php";
        i.open("POST", o, !0),
        i.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
        i.send("type=" + e + "&action=" + a + "&data=" + n)
    }
    var m, u, g = new function() {
        function o(e, t) {
            return (e >>> 1 | t >>> 1) << 1 | 1 & e | 1 & t
        }
        function l(e, t) {
            return (e >>> 1 ^ t >>> 1) << 1 | 1 & e ^ 1 & t
        }
        function s(e, t) {
            return (e >>> 1 & t >>> 1) << 1 | 1 & e & t
        }
        function m(e, t) {
            var a = (65535 & e) + (65535 & t);
            return (e >> 16) + (t >> 16) + (a >> 16) << 16 | 65535 & a
        }
        function p(e) {
            var t, a = "";
            for (t = 0; t <= 3; t++)
                a += n.charAt(e >> 8 * t + 4 & 15) + n.charAt(e >> 8 * t & 15);
            return a
        }
        function c(e, t, a, n, r, d) {
            return m((i = m(m(t, e), m(n, d))) << (o = r) | i >>> 32 - o, a);
            var i, o
        }
        function u(e, t, a, n, r, d, i) {
            return c(o(s(t, a), s(~t, n)), e, t, r, d, i)
        }
        function g(e, t, a, n, r, d, i) {
            return c(o(s(t, n), s(a, ~n)), e, t, r, d, i)
        }
        function h(e, t, a, n, r, d, i) {
            return c(l(l(t, a), n), e, t, r, d, i)
        }
        function v(e, t, a, n, r, d, i) {
            return c(l(a, o(t, ~n)), e, t, r, d, i)
        }
        var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
          , n = "0123456789abcdef";
        return {
            base64: function(e) {
                var t, a, n, r, d, i, o, l = "", s = 0;
                for (e = function(e) {
                    if (!e)
                        return "";
                    e = e.replace(/\r\n/g, "\n");
                    for (var t = "", a = 0; a < e.length; a++) {
                        var n = e.charCodeAt(a);
                        n < 128 ? t += String.fromCharCode(n) : (127 < n && n < 2048 ? t += String.fromCharCode(n >> 6 | 192) : (t += String.fromCharCode(n >> 12 | 224),
                        t += String.fromCharCode(n >> 6 & 63 | 128)),
                        t += String.fromCharCode(63 & n | 128))
                    }
                    return t
                }(e); s < e.length; )
                    r = (t = e.charCodeAt(s++)) >> 2,
                    d = (3 & t) << 4 | (a = e.charCodeAt(s++)) >> 4,
                    i = (15 & a) << 2 | (n = e.charCodeAt(s++)) >> 6,
                    o = 63 & n,
                    isNaN(a) ? i = o = 64 : isNaN(n) && (o = 64),
                    l = l + b.charAt(r) + b.charAt(d) + b.charAt(i) + b.charAt(o);
                return l
            },
            md5: function(e) {
                for (var t = function(e) {
                    var t, a = 1 + (e.length + 8 >> 6), n = new Array(16 * a);
                    for (t = 0; t < 16 * a; t++)
                        n[t] = 0;
                    for (t = 0; t < e.length; t++)
                        n[t >> 2] |= e.charCodeAt(t) << (8 * e.length + t) % 4 * 8;
                    n[t >> 2] |= 128 << (8 * e.length + t) % 4 * 8;
                    var r = 8 * e.length;
                    return n[16 * a - 2] = 255 & r,
                    n[16 * a - 2] |= (r >>> 8 & 255) << 8,
                    n[16 * a - 2] |= (r >>> 16 & 255) << 16,
                    n[16 * a - 2] |= (r >>> 24 & 255) << 24,
                    n
                }(e), a = 1732584193, n = -271733879, r = -1732584194, d = 271733878, i = 0; i < t.length; i += 16) {
                    var o = a
                      , l = n
                      , s = r
                      , c = d;
                    n = v(n = v(n = v(n = v(n = h(n = h(n = h(n = h(n = g(n = g(n = g(n = g(n = u(n = u(n = u(n = u(n, r = u(r, d = u(d, a = u(a, n, r, d, t[i + 0], 7, -680876936), n, r, t[i + 1], 12, -389564586), a, n, t[i + 2], 17, 606105819), d, a, t[i + 3], 22, -1044525330), r = u(r, d = u(d, a = u(a, n, r, d, t[i + 4], 7, -176418897), n, r, t[i + 5], 12, 1200080426), a, n, t[i + 6], 17, -1473231341), d, a, t[i + 7], 22, -45705983), r = u(r, d = u(d, a = u(a, n, r, d, t[i + 8], 7, 1770035416), n, r, t[i + 9], 12, -1958414417), a, n, t[i + 10], 17, -42063), d, a, t[i + 11], 22, -1990404162), r = u(r, d = u(d, a = u(a, n, r, d, t[i + 12], 7, 1804603682), n, r, t[i + 13], 12, -40341101), a, n, t[i + 14], 17, -1502002290), d, a, t[i + 15], 22, 1236535329), r = g(r, d = g(d, a = g(a, n, r, d, t[i + 1], 5, -165796510), n, r, t[i + 6], 9, -1069501632), a, n, t[i + 11], 14, 643717713), d, a, t[i + 0], 20, -373897302), r = g(r, d = g(d, a = g(a, n, r, d, t[i + 5], 5, -701558691), n, r, t[i + 10], 9, 38016083), a, n, t[i + 15], 14, -660478335), d, a, t[i + 4], 20, -405537848), r = g(r, d = g(d, a = g(a, n, r, d, t[i + 9], 5, 568446438), n, r, t[i + 14], 9, -1019803690), a, n, t[i + 3], 14, -187363961), d, a, t[i + 8], 20, 1163531501), r = g(r, d = g(d, a = g(a, n, r, d, t[i + 13], 5, -1444681467), n, r, t[i + 2], 9, -51403784), a, n, t[i + 7], 14, 1735328473), d, a, t[i + 12], 20, -1926607734), r = h(r, d = h(d, a = h(a, n, r, d, t[i + 5], 4, -378558), n, r, t[i + 8], 11, -2022574463), a, n, t[i + 11], 16, 1839030562), d, a, t[i + 14], 23, -35309556), r = h(r, d = h(d, a = h(a, n, r, d, t[i + 1], 4, -1530992060), n, r, t[i + 4], 11, 1272893353), a, n, t[i + 7], 16, -155497632), d, a, t[i + 10], 23, -1094730640), r = h(r, d = h(d, a = h(a, n, r, d, t[i + 13], 4, 681279174), n, r, t[i + 0], 11, -358537222), a, n, t[i + 3], 16, -722521979), d, a, t[i + 6], 23, 76029189), r = h(r, d = h(d, a = h(a, n, r, d, t[i + 9], 4, -640364487), n, r, t[i + 12], 11, -421815835), a, n, t[i + 15], 16, 530742520), d, a, t[i + 2], 23, -995338651), r = v(r, d = v(d, a = v(a, n, r, d, t[i + 0], 6, -198630844), n, r, t[i + 7], 10, 1126891415), a, n, t[i + 14], 15, -1416354905), d, a, t[i + 5], 21, -57434055), r = v(r, d = v(d, a = v(a, n, r, d, t[i + 12], 6, 1700485571), n, r, t[i + 3], 10, -1894986606), a, n, t[i + 10], 15, -1051523), d, a, t[i + 1], 21, -2054922799), r = v(r, d = v(d, a = v(a, n, r, d, t[i + 8], 6, 1873313359), n, r, t[i + 15], 10, -30611744), a, n, t[i + 6], 15, -1560198380), d, a, t[i + 13], 21, 1309151649), r = v(r, d = v(d, a = v(a, n, r, d, t[i + 4], 6, -145523070), n, r, t[i + 11], 10, -1120210379), a, n, t[i + 2], 15, 718787259), d, a, t[i + 9], 21, -343485551),
                    a = m(a, o),
                    n = m(n, l),
                    r = m(r, s),
                    d = m(d, c)
                }
                return p(a) + p(n) + p(r) + p(d)
            }
        }
    }
    , J = !1, Y = 0, G = !1, V = 0, X = 0, K = -99999, h = !1;
    var Q;
    var useEvent = false;
    var isOnLagged = true;
    var isDevMode = true;
    var isOnApprovedWebsite = false;
    var isTestingMode = false;
    try {
        window.addEventListener("keydown", function(e) {
            if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 32) {
                e.preventDefault();
            }
        }, false);
    } catch (e) {
        console.log(e);
    }
    try {
        Q = window.parent.document;
    } catch (e) {
        useEvent = true;
        console.log(e);
    }
    if (!Q) {
        console.log('not on lagged, use event');
        useEvent = true;
    } else {
        isOnLagged = true;
        isOnApprovedWebsite = true;
    }
    try {
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "preview.construct.net" || location.hostname === "lagged.app") {
            isDevMode = true;
            isOnLagged = false;
            useEvent = true;
            isApprovedDomain = false;
            if (location.hostname === "lagged.app") {
                try {
                    if (window.parent.isTestingMode) {
                        isTestingMode = true;
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
    try {
        var currentUrl = document.referrer.split('/')[2];
        console.log(currentUrl);
        if (currentUrl != 'lagged.com') {
            useEvent = true;
            isOnLagged = false;
        }
        if (!currentUrl) {
            currentUrl = "lagged.com";
        }
        approvedDomainsList = ['lagged.com', 'lagged.app', 'lagged.es', 'oyun.io', 'lagged.fr', 'lagged.me', 'lagged.id', 'lagged.jp', 'lagged.kr', 'lagged.ru', 'lagged.se', 'lagged.com.br', 'spiel2.com', 'spellen2.com', 'lagged.vn', 'lagged.pl', 'lagged.cn', 'lagged.in', 'lagged.bg', 'lagged.gr', 'lagged.ro', 'lagged.fi', 'giochi2.com', 'lagged.it', 'maxg.com', '8iz.com', 'ducklife.com'];
        isApprovedDomain = approvedDomainsList.includes(currentUrl)
        if (!isApprovedDomain) {
            isOnApprovedWebsite = false;
            if (!isDevMode) {
                var openUrlOnClick = "https://lagged.com/redirect_to_game.php?swf=" + location.href;
                console.log("DEV TO DO: This domain is not approved, need to hide the game and link to correct game on lagged");
                console.log("cover game, open on click: ", openUrlOnClick);
                var sampleAdPopup = document.createElement('div');
                sampleAdPopup.id = "examplepopup";
                sampleAdPopup.onclick = function() {
                    window.open(openUrlOnClick, "_blank");
                }
                sampleAdPopup.style.position = "absolute";
                sampleAdPopup.style.width = "60%";
                sampleAdPopup.style.height = "60px";
                sampleAdPopup.style.left = "20%";
                sampleAdPopup.style.bottom = "30px";
                sampleAdPopup.style.border = "1px solid #000";
                sampleAdPopup.style.textAlign = "center";
                sampleAdPopup.style.lineHeight = "25px";
                sampleAdPopup.style.backgroundColor = "#fff";
                sampleAdPopup.style.color = "#000";
                sampleAdPopup.style.cursor = "pointer";
                sampleAdPopup.innerHTML = "<b>Website Not Approved</b><br>Sorry this game is only playable on Lagged";
                document.body.appendChild(sampleAdPopup);
                try {
                    document.body.addEventListener("click", function() {
                        window.open(openUrlOnClick, "_blank");
                    }, false);
                    document.body.addEventListener("touchstart", function() {
                        window.open(openUrlOnClick, "_blank");
                    }, false);
                } catch (e) {
                    console.log(e);
                }
            }
        } else {
            isOnApprovedWebsite = true;
        }
    } catch (e) {
        useEvent = true;
        console.log(e);
    }
    if (!useEvent) {
        try {
            if (typeof window.parent.useLaggedapiembed !== 'undefined' && window.parent.useLaggedapiembed) {
                useEvent = true;
            }
        } catch (e) {
            console.log(e);
        }
    }
    console.log("dev mode: ", isDevMode);
    console.log("is testing mode: ", isTestingMode);
    console.log("is on lagged.com ", isOnLagged);
    console.log("use events: ", useEvent);
    console.log("is website approved for ads: ", isOnApprovedWebsite);
    if (isDevMode) {
        var CSSlink = document.createElement("link");
        CSSlink.href = "https://m.igroutka.ru/files/scripts/lagged/devmode.css";
        CSSlink.rel = "stylesheet";
        CSSlink.media = "screen";
        document.getElementsByTagName("head")[0].appendChild(CSSlink);
    } else {
        var CSSlink = document.createElement("link");
        CSSlink.href = "https://m.igroutka.ru/files/scripts/lagged/base.css";
        CSSlink.rel = "stylesheet";
        CSSlink.media = "screen";
        document.getElementsByTagName("head")[0].appendChild(CSSlink);
    }
    var m = "init_game_basicrev_00r";
    var hasBeenInit = false;
    var initCheck = false;
    var useParentChannel = false;
    var parentChanneltoUse = "";
    LaggedAPI.init = function(developer_id, dev_adsense_id) {
        if (hasBeenInit) {
            return;
        }
        hasBeenInit = true;
        console.log("LaggedAPI INIT: Developer ID: ", developer_id);
        console.log("LaggedAPI INIT: Developer Adsense Publisher ID: ", dev_adsense_id);
        var realDevId = developer_id.replace('lagdev_', '');
        if (isOnApprovedWebsite) {
            try {
                var meta = document.createElement('meta');
                meta.name = "google-adsense-platform-account";
                meta.content = "ca-host-pub-6893876361346206";
                document.getElementsByTagName('head')[0].appendChild(meta);
                var meta2 = document.createElement('meta');
                meta2.name = "google-adsense-platform-domain";
                meta2.content = "lagged.com";
                document.getElementsByTagName('head')[0].appendChild(meta2);
                var meta3 = document.createElement('meta');
                meta3.name = "google-adsense-platform-author-url";
                meta3.content = "lagged.com/developer/" + realDevId + "/";
                document.getElementsByTagName('head')[0].appendChild(meta3);
                var element = document.createElement('script');
                var firstScript = document.getElementsByTagName('script')[0];
                var url = "https://g.com/pagead/js/adsbygoogle.js";
                element.async = true;
                element.src = url;
                element.id = "gamesourcegoogle";
                element.setAttribute('data-ad-client', dev_adsense_id);
                element.setAttribute('data-ad-host', 'ca-host-pub-6893876361346206');
                element.setAttribute('data-ad-frequency-hint', '30s');
                try {
                    if (isOnLagged) {
                        if (window.parent.customHostChannel) {
                            element.setAttribute('data-ad-host-channel', window.parent.customHostChannel);
                        }
                    } else if (useParentChannel) {
                        element.setAttribute('data-ad-host-channel', parentChanneltoUse);
                        console.log('channel to use: ', parentChanneltoUse);
                    }
                } catch (e) {
                    console.log(e);
                }
                var currentURLToUse;
                try {
                    currentURLToUse = location.href;
                } catch (e) {
                    console.log(e);
                }
                if (currentURLToUse && currentURLToUse.length > 3) {
                    element.setAttribute('data-page-url', currentURLToUse);
                }
                firstScript.parentNode.insertBefore(element, firstScript);
                try {
                    window.adsbygoogle = window.adsbygoogle || [];
                    adBreak = adConfig = function(o) {
                        adsbygoogle.push(o);
                    }
                    adConfig({
                        preloadAdBreaks: 'on',
                        onReady: tryPreloader
                    });
                } catch (e) {
                    console.log(e);
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (isDevMode) {
            setTimeout(function() {
                initCheck = true;
            }, 500);
        }
    }
    ;
    var tryPreloader = function() {
        console.log("ads loaded, try preroll ad");
        if (!isDevMode) {
            disableButtons();
            try {
                adBreak({
                    type: 'preroll',
                    adBreakDone: function adBreakDone() {
                        console.log("preroll finished");
                        enableButtons();
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }
        setTimeout(function() {
            enableButtons();
        }, 10000);
    }
    vL = [],
    b = [];
    LaggedAPI.Achievements = {
        save: function(e, t) {
            for (var a = 0, n = e.length; a < n; a++)
                -1 === vL.indexOf(e[a]) && (vL.push(e[a]),
                b.push(e[a]));
            var r, d;
            0 < b.length ? (r = b.length,
            d = t,
            setTimeout(function() {
                if (b.length > r)
                    d({
                        success: !0
                    });
                else {
                    var e = {
                        action: "save"
                    };
                    e.publickey = m,
                    e.awards = b,
                    b = [];
                    var t = JSON.stringify(e)
                      , a = g.base64(t);
                    if (isDevMode) {
                        console.log("LaggedAPI: Save achievements: ", e.awards);
                        var sampleAdPopup = document.createElement('div');
                        sampleAdPopup.id = "exampleawardpopup";
                        sampleAdPopup.onclick = function() {
                            if (document.getElementById("exampleawardpopup")) {
                                document.getElementById("exampleawardpopup").remove();
                            }
                        }
                        sampleAdPopup.innerHTML = "<p>Award ID: " + e.awards + "</p>";
                        document.body.appendChild(sampleAdPopup);
                        setTimeout(function() {
                            if (document.getElementById("exampleawardpopup")) {
                                document.getElementById("exampleawardpopup").remove();
                            }
                        }, 4000);
                        window.parent.postMessage('awards|' + a, '*');
                        return;
                    }
                    if (useEvent) {
                        try {
                            window.parent.postMessage('awards|' + a, '*');
                            d({
                                success: !0
                            });
                        } catch (e) {
                            console.log(e);
                        }
                        return;
                    }
                    c("award", "award", "save", a, f, d)
                }
            }, 35)) : t({
                success: !0
            })
        },
        show: function() {
            try {
                window.parent.openAwards()
            } catch (e) {
                try {
                    window.parent.postMessage('openAwards', '*');
                } catch (e) {
                    console.log(e);
                }
            }
        }
    };
    var laggedScoresSaved = [];
    LaggedAPI.Scores = {
        save: function(e, t) {
            u = e.board;
            if (e.score === 0 || e.score < 0) {
                return;
            }
            if (!laggedScoresSaved[e.board]) {
                laggedScoresSaved[e.board] = e.score;
            } else if (laggedScoresSaved[e.board] < e.score) {
                laggedScoresSaved[e.board] = e.score;
            } else {
                return;
            }
            var a = {
                action: "save"
            };
            a.publickey = m,
            a.board = e.board,
            a.score = e.score;
            var n = JSON.stringify(a)
              , r = g.base64(n);
            if (isDevMode) {
                console.log("LaggedAPI: Save high score: ", e);
                var sampleAdPopup = document.createElement('div');
                sampleAdPopup.id = "examplehighscorepopup";
                sampleAdPopup.onclick = function() {
                    if (document.getElementById("examplehighscorepopup")) {
                        document.getElementById("examplehighscorepopup").remove();
                    }
                }
                sampleAdPopup.innerHTML = "<p>Score: " + e.score + "<br>Board ID: " + e.board + "</p>";
                document.body.appendChild(sampleAdPopup);
                window.parent.postMessage('savescore|' + r, '*');
                return;
            }
            if (!useEvent) {
                D(!1);
            }
            if (useEvent) {
                try {
                    window.parent.postMessage('savescore|' + r, '*');
                    t({
                        success: !0
                    });
                } catch (e) {
                    console.log(e);
                }
                return;
            }
            c("highscore", "hs2_p1", "save", r, C, t)
        },
        load: function(e, t) {
            if (!useEvent) {
                D(!1);
            } else {
                try {
                    window.parent.postMessage('loadscores', '*');
                    t({
                        success: !0
                    });
                } catch (e) {
                    console.log(e);
                }
                return;
            }
            var a = {
                action: "load"
            };
            a.publickey = m,
            a.board = e;
            var n = JSON.stringify(a)
              , r = g.base64(n);
            c("highscore", "hs2_p1", "load", r, C, y(t))
        }
    };
    var E, f = function(e, t) {
        var a = {
            success: !0
        };
        e && !0 === e.success ? !0 === e.data.show && N(e.data.achdata, e.user) : (alert("Error: Achievment did not save!"),
        console.log(e),
        a.success = !1,
        a.errormsg = "Error: Achievment did not save!"),
        t && t(a)
    }, C = function(e, t) {
        var a = {
            success: !0
        };
        e && !0 === e.success ? (hsData = e,
        function() {
            Y = 0,
            !(G = J = !1);
            var e = document.createElement("div");
            e.id = "leaderboard-wrapper";
            var n = document.createElement("div");
            n.id = "leaderboard-wrapper-header";
            var r = document.createElement("button");
            r.onclick = function() {
                Q.getElementById("leaderboard-wrapper") && Q.getElementById("leaderboard-wrapper").remove(),
                Q.getElementById("leaderboard-modal") && (Q.getElementById("leaderboard-modal").onclick = "",
                Q.getElementById("leaderboard-modal").remove()),
                !1
            }
            ,
            r.id = "leaderboard-header-button";
            var d = document.createElement("a");
            d.setAttribute("href", "https://lagged.com"),
            d.setAttribute("target", "_blank"),
            d.id = "headerlogolink";
            var o = document.createElement("div");
            if (o.id = "score-circle",
            o.className = "leaderboard-circle",
            n.appendChild(r),
            n.appendChild(d),
            e.appendChild(n),
            hsData.data && !hsData.data.login) {
                (c = document.createElement("div")).className = "yourscore_txtdiv",
                m = document.createTextNode("Your High Score"),
                c.appendChild(m),
                (p = document.createElement("div")).className = "finalscore_divtxt",
                u = document.createTextNode(z(hsData.data.utop.score)),
                p.appendChild(u),
                o.appendChild(c),
                o.appendChild(p),
                e.appendChild(o);
                var l = document.createElement("div");
                l.className = "signup_txti";
                (g = document.createElement("button")).onclick = function() {
                    try {
                        window.parent.openLeaderboards(hsData)
                    } catch (e) {
                        console.log(e)
                    }
                }
                ,
                g.className = "main_hs_btn viewranks",
                h = document.createTextNode("View Leaderboard"),
                g.appendChild(h),
                e.appendChild(l),
                e.appendChild(g)
            } else {
                (o = document.createElement("div")).id = "guestscorecircle";
                var c = document.createElement("div");
                c.className = "yourscore_txtdiv";
                var m = document.createTextNode("Your High Score");
                c.appendChild(m);
                var p = document.createElement("div");
                p.className = "finalscore_divtxt";
                var u = document.createTextNode(z(hsData.data.topscore));
                p.appendChild(u),
                o.appendChild(c),
                o.appendChild(p),
                e.appendChild(o);
                var g = document.createElement("button");
                g.onclick = function() {
                    !function b(e) {
                        2 === e ? Q.getElementById("achlistwrap").remove() : 1 === e ? (Q.getElementById("guestscorecircle").remove(),
                        Q.getElementsByClassName("signup_txti")[0].remove(),
                        Q.getElementsByClassName("viewleaderguest")[0].remove(),
                        Q.getElementsByClassName("moregames_wrapper")[0].remove(),
                        Q.getElementsByClassName("main_hs_btn")[0].remove()) : Q.getElementById("signupFormWrap").remove();
                        var t = document.createElement("div");
                        t.id = "signupFormWrap";
                        var E = !0;
                        2 === e && (E = !1),
                        isMobile = false;
                        var a = document.createElement("div");
                        a.id = "tabsButtonWraps",
                        a.className = "logintabs",
                        (n = document.createElement("button")).className = "tabs_links active",
                        n.style.width = "50%";
                        var n, r = document.createTextNode("Sign Up for Free");
                        n.appendChild(r),
                        a.appendChild(n),
                        (n = document.createElement("button")).className = "tabs_links",
                        n.style.width = "50%",
                        n.onclick = function() {
                            !function() {
                                Q.getElementById("signupFormWrap").remove();
                                var e = document.createElement("div");
                                e.id = "signupFormWrap";
                                var t = document.createElement("div");
                                t.id = "tabsButtonWraps",
                                t.className = "logintabs",
                                (a = document.createElement("button")).onclick = function() {
                                    b(3)
                                }
                                ,
                                a.className = "tabs_links",
                                a.style.width = "50%";
                                var a, n = document.createTextNode("Sign Up for Free");
                                a.appendChild(n),
                                t.appendChild(a),
                                (a = document.createElement("button")).className = "tabs_links active",
                                a.style.width = "50%",
                                n = document.createTextNode("Log in"),
                                a.appendChild(n),
                                t.appendChild(a),
                                e.appendChild(t);
                                var r = document.createElement("form");
                                r.id = "loginit",
                                r.onsubmit = function() {
                                    return _("login")
                                }
                                ;
                                var d = document.createElement("div");
                                d.className = "form-group";
                                var i = document.createElement("label");
                                i.setAttribute("form", "inputEmail2");
                                var o = document.createTextNode("Your email address");
                                i.appendChild(o),
                                d.appendChild(i);
                                var l = document.createElement("input");
                                l.setAttribute("type", "email"),
                                l.setAttribute("name", "name"),
                                l.id = "inputEmail2",
                                l.className = "form-control",
                                l.required = !0,
                                isMobile || (l.autofocus = !0),
                                d.appendChild(l),
                                r.appendChild(d);
                                var s = document.createElement("div");
                                s.className = "form-group";
                                var c = document.createElement("label");
                                c.setAttribute("form", "inputEmail3");
                                var m = document.createTextNode("Your password");
                                c.appendChild(m),
                                s.appendChild(c);
                                var p = document.createElement("input");
                                p.setAttribute("type", "password"),
                                p.setAttribute("name", "name"),
                                p.id = "inputEmail3",
                                p.className = "form-control",
                                p.required = !0,
                                s.appendChild(p),
                                r.appendChild(s);
                                var u = document.createElement("button");
                                u.onclick = function() {
                                    return _("login", E)
                                }
                                ,
                                u.className = "main_hs_btn viewranks",
                                u.id = "createloginBtnMain";
                                var g = document.createTextNode("Submit");
                                u.appendChild(g),
                                r.appendChild(u),
                                e.appendChild(r);
                                var h = document.createElement("a")
                                  , v = document.createTextNode("Forgot password?");
                                h.style.marginTop = "15px",
                                h.setAttribute("href", "https://lagged.com/help/password/"),
                                h.setAttribute("target", "_blank"),
                                h.appendChild(v),
                                e.appendChild(h),
                                Q.getElementById("leaderboard-wrapper").appendChild(e),
                                isMobile || Q.getElementById("inputEmail2").focus()
                            }()
                        }
                        ,
                        r = document.createTextNode("Log in"),
                        n.appendChild(r),
                        a.appendChild(n),
                        t.appendChild(a);
                        var d = document.createElement("form");
                        d.id = "loginit",
                        d.onsubmit = function() {
                            return _("signup")
                        }
                        ;
                        var i = document.createElement("div");
                        i.className = "form-group";
                        var o = document.createElement("label");
                        o.setAttribute("form", "inputEmail1");
                        var l = document.createTextNode("Choose a nickname");
                        o.appendChild(l),
                        i.appendChild(o);
                        var s = document.createElement("input");
                        s.setAttribute("type", "text"),
                        s.setAttribute("name", "name"),
                        s.id = "inputEmail1",
                        s.className = "form-control",
                        s.required = !0,
                        isMobile || (s.autofocus = !0),
                        i.appendChild(s),
                        d.appendChild(i);
                        var c = document.createElement("div");
                        c.className = "form-group";
                        var m = document.createElement("label");
                        m.setAttribute("form", "inputEmail2");
                        var p = document.createTextNode("Your email address");
                        m.appendChild(p),
                        c.appendChild(m);
                        var u = document.createElement("input");
                        u.setAttribute("type", "email"),
                        u.setAttribute("name", "name"),
                        u.id = "inputEmail2",
                        u.className = "form-control",
                        u.required = !0,
                        c.appendChild(u),
                        d.appendChild(c);
                        var g = document.createElement("div");
                        g.className = "form-group";
                        var h = document.createElement("label");
                        h.setAttribute("form", "inputEmail3");
                        var v = document.createTextNode("Create a password");
                        h.appendChild(v),
                        g.appendChild(h);
                        var f = document.createElement("input");
                        f.setAttribute("type", "password"),
                        f.setAttribute("name", "name"),
                        f.setAttribute("placeholder", "At least 6 characters"),
                        f.id = "inputEmail3",
                        f.className = "form-control",
                        f.required = !0,
                        g.appendChild(f),
                        d.appendChild(g);
                        var C = document.createElement("button");
                        C.onclick = function() {
                            return _("signup", E)
                        }
                        ,
                        C.className = "main_hs_btn viewranks",
                        C.id = "createloginBtnMain";
                        var y = document.createTextNode("Submit");
                        C.appendChild(y),
                        d.appendChild(C),
                        t.appendChild(d),
                        Q.getElementById("leaderboard-wrapper").appendChild(t),
                        isMobile || Q.getElementById("inputEmail1").focus()
                    }(1)
                }
                ,
                g.className = "main_hs_btn guestsubmitmainhs";
                var h = document.createTextNode("Submit High Score");
                g.appendChild(h),
                e.appendChild(g);
                var v = document.createElement("a");
                v.onclick = function() {
                    try {
                        window.parent.openLeaderboards()
                    } catch (e) {
                        console.log(e)
                    }
                }
                ,
                v.className = "viewleaderguest";
                var b = document.createElement("img");
                b.setAttribute("src", "https://imgs2.dab3games.com/highscore-games-icon.jpg"),
                b.setAttribute("alt", "icon"),
                b.setAttribute("width", "40"),
                b.setAttribute("height", "40"),
                v.appendChild(b);
                var E = document.createTextNode("View Leaderboard");
                v.appendChild(E),
                e.appendChild(v)
            }
            var f = document.createElement("div");
            hsData.data.login ? f.className = "popmoregameswrap" : f.className = "popmoregameswrap userrbpop";
            var C = document.createElement("div");
            C.className = "signup_txti moregametxt guessmoregmtxt",
            hsData.data.login || (C.className = "signup_txti moregametxt");
            var y = document.createTextNode("More Games");
            C.appendChild(y),
            f.appendChild(C);
            var w = window.parent.jsMoreGames
              , N = document.createElement("div");
            N.className = "moregames_wrapper guestmoregames";
            var A = 10;
            for (hsData.data.login || (A = 5,
            N.className = "moregames_wrapper"),
            i = 0; i < A; i++) {
                var T = document.createElement("div");
                T.className = "thumbWrapper";
                var k = document.createElement("div")
                  , B = document.createElement("a");
                if (w[i].io == 1) {
                    B.setAttribute("href", "https://lagged.com/io/" + w[i].url_key);
                } else {
                    B.setAttribute("href", "https://lagged.com/en/g/" + w[i].url_key);
                }
                B.setAttribute("title", w[i].name),
                B.setAttribute("target", "_blank");
                var x = document.createTextNode(w[i].name);
                B.appendChild(x);
                var I = document.createElement("img");
                I.setAttribute("src", "https://imgs2.dab3games.com/" + w[i].thumb),
                I.setAttribute("alt", w[i].name),
                I.setAttribute("width", "200"),
                I.setAttribute("height", "200"),
                k.appendChild(B),
                k.appendChild(I),
                T.appendChild(k),
                N.appendChild(T)
            }
            f.appendChild(N),
            e.appendChild(f),
            Q.body.appendChild(e),
            S();
        }()) : (S(),
        Q.getElementById("leaderboard-modal").remove(),
        alert("Error: Could not save high score!"),
        console.log(e),
        a.success = !1,
        a.errormsg = "Error: Could not save high score!"),
        t && t(a)
    }, y = function(e) {}, w = 0, N = function(e, t) {
        h = window.parent.isFullscreen,
        Q = h ? document : window.parent.document,
        4 < ++w && (w = 1);
        var a = "achievement_pops_" + w
          , n = Q.createElement("div");
        n.id = "achievementPopWrap",
        n.className = a,
        n.onclick = function() {
            Q.getElementsByClassName(a)[0].remove()
        }
        ;
        var r = "Achievment Saved";
        1 < e.acount && (r = e.acount + " Achievments Saved");
        var d = document.createElement("div");
        d.className = "achievement_title";
        var i = document.createTextNode(r);
        d.appendChild(i),
        n.appendChild(d);
        var o = document.createElement("div");
        o.className = "achievement_desc";
        var l = document.createTextNode(e.name);
        o.appendChild(l),
        n.appendChild(o);
        var s = document.createElement("div");
        s.className = "achievement_xp";
        var c = document.createTextNode("+" + e.points + "xp");
        if (s.appendChild(c),
        n.appendChild(s),
        Q.body.appendChild(n),
        t)
            try {
                window.parent.newLevel(t)
            } catch (e) {
                console.log(e)
            }
        setTimeout(function() {
            Q.getElementsByClassName(a)[0] && (p(Q.getElementsByClassName(a)[0]),
            w--,
            setTimeout(function() {
                Q.getElementsByClassName(a)[0] && Q.getElementsByClassName(a)[0].remove()
            }, 200))
        }, 4e3)
    };
    var adCount = 0;
    var adTimer = 30;
    var devModeAdcallback = function() {};
    setInterval(function() {
        adTimer++;
    }, 999);
    var startGameManually;
    LaggedAPI.GEvents = {
        start: function(adResponse) {
            console.log("event START");
            try {
                startGameManually = setTimeout(function() {
                    adResponse();
                }, 3000);
            } catch (e) {
                console.log(e);
            }
            adBreak({
                type: 'start',
                name: 'start-game',
                beforeAd: ()=>{
                    disableButtons(true);
                }
                ,
                afterAd: ()=>{
                    enableButtons();
                }
                ,
                adBreakDone: ()=>{
                    adResponse();
                }
            });
        },
        next: function(adResponse) {
            console.log("event NEXT");
            try {
                startGameManually = setTimeout(function() {
                    adResponse();
                }, 3000);
            } catch (e) {
                console.log(e);
            }
            adBreak({
                type: 'next',
                name: 'next-level',
                beforeAd: ()=>{
                    disableButtons(true);
                }
                ,
                afterAd: ()=>{
                    enableButtons();
                }
                ,
                adBreakDone: ()=>{
                    adResponse();
                }
            });
        },
        reward: function(canShowButton, callback) {
            if (isDevMode) {
                console.log("LaggedAPI: Reward Ad Offered");
                var x = (Math.floor(Math.random() * 2) == 0);
                if (x) {
                    canGiveReward = true;
                    console.log('LaggedAPI: Reward ad available, show buttons');
                } else {
                    canGiveReward = false;
                    if (!isTestingMode) {
                        console.log('LaggedAPI: No reward ad available, hide buttons');
                    }
                }
                devModeAdcallback = callback;
                canShowButton(canGiveReward, devModeRewardCallback);
                return;
            }
            adBreak({
                type: 'reward',
                name: 'reward',
                beforeAd: ()=>{
                    disableButtons(false);
                }
                ,
                afterAd: ()=>{
                    enableButtons(false);
                }
                ,
                beforeReward: (showAdFn)=>{
                    beforeReward(showAdFn, canShowButton);
                }
                ,
                adDismissed: ()=>{
                    adDismissed(callback);
                }
                ,
                adViewed: ()=>{
                    adCompled(callback);
                }
                ,
            });
            giveRewardTimeout = setTimeout(function() {
                if (!canGiveReward) {
                    callback(false);
                    canShowButton(false);
                }
            }, 1000);
        }
    }
    function devModeRewardCallback() {
        if (!canGiveReward) {
            return;
        }
        console.log("DEV MODE: Showing example reward ad, ad will close in 3 seconds.");
        var sampleAdPopup = document.createElement('div');
        sampleAdPopup.id = "examplerewardad";
        document.body.appendChild(sampleAdPopup);
        setTimeout(function() {
            if (document.getElementById("examplerewardad")) {
                document.getElementById("examplerewardad").remove();
            }
            canGiveReward = false;
            devModeAdcallback(true);
            devModeAdcallback = function() {}
            ;
        }, 10);
    }
    function adBreakIsDone() {
        enableButtons(false);
        try {
            window.parent.gtag('event', 'conversion', {
                'send_to': 'AW-1055364430/XhxXCIeIx_wBEM6qnvcD'
            });
        } catch (e) {
            console.log(e);
        }
    }
    var canGiveReward = false;
    var interNewAdPlaying = false;
    var giveRewardTimeout;
    var beforeReward = function(showAdFn, canShowButton) {
        if (isDevMode) {
            console.log("LaggedAPI: Can give reward ad");
        }
        clearTimeout(giveRewardTimeout);
        canGiveReward = true;
        canShowButton(true, showAdFn);
    }
    var adDismissed = function(callback) {
        if (isDevMode) {
            console.log("LaggedAPI: Reward ad dismissed");
        }
        canGiveReward = false;
        callback(false);
    }
    var adCompled = function(callback) {
        if (isDevMode) {
            console.log("LaggedAPI: Reward ad completed");
        }
        canGiveReward = false;
        callback(true);
        try {
            window.parent.gtag('event', 'conversion', {
                'send_to': 'AW-1055364430/XhxXCIeIx_wBEM6qnvcD'
            });
        } catch (e) {
            console.log(e);
        }
    }
    var disableButtons = function(giveConversion) {
        try {
            clearTimeout(startGameManually);
        } catch (e) {
            console.log(e);
        }
        if (isDevMode) {
            console.log("LaggedAPI: Ad stated");
        }
        if (useEvent && !isDevMode) {
            try {
                window.parent.postMessage('apiHide', '*');
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                if (window.parent.document.getElementById('mobile-right')) {
                    window.parent.document.getElementById('mobile-right').style.display = "none";
                }
                if (window.parent.document.getElementById('minividbtn')) {
                    window.parent.document.getElementById('minividbtn').style.display = "none";
                }
                if (window.parent.document.getElementById('gameplug')) {
                    window.parent.document.getElementById('gameplug').style.display = "none";
                }
                if (window.parent.document.getElementById('exitfullscreen')) {
                    window.parent.document.getElementById('exitfullscreen').style.display = "none";
                }
                if (window.parent.document.getElementById('minividbtnnewl')) {
                    window.parent.document.getElementById('minividbtnnewl').className = "showittomob";
                }
                if (window.parent.document.getElementById('mobilerightnew')) {
                    window.parent.document.getElementById('mobilerightnew').className = "";
                }
            } catch (e) {
                console.log(e);
            }
            try {
                if (window.parent.window.parent.document.getElementById('adsContainer')) {
                    window.parent.window.parent.document.getElementById('adsContainer').remove();
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (giveConversion && isOnLagged) {
            try {
                window.parent.gtag('event', 'conversion', {
                    'send_to': 'AW-1055364430/XhxXCIeIx_wBEM6qnvcD'
                });
            } catch (e) {
                console.log(e);
            }
        }
    }
    var enableButtons = function() {
        try {
            clearTimeout(startGameManually);
        } catch (e) {
            console.log(e);
        }
        if (isDevMode) {
            console.log("LaggedAPI: Ad completed");
        }
        adTimer = 0;
        if (useEvent && !isDevMode) {
            try {
                window.parent.postMessage('apiShow', '*');
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                if (window.parent.document.getElementById('mobile-right')) {
                    window.parent.document.getElementById('mobile-right').style.display = "block";
                }
                if (window.parent.document.getElementById('minividbtn')) {
                    window.parent.document.getElementById('minividbtn').style.display = "block";
                }
                if (window.parent.document.getElementById('gameplug')) {
                    window.parent.document.getElementById('gameplug').style.display = "block";
                }
                if (window.parent.document.getElementById('exitfullscreen')) {
                    window.parent.document.getElementById('exitfullscreen').style.display = "block";
                }
                if (window.parent.document.getElementById('minividbtnnewl')) {
                    window.parent.document.getElementById('minividbtnnewl').className = "showittomob showit";
                }
                if (window.parent.document.getElementById('mobilerightnew')) {
                    window.parent.document.getElementById('mobilerightnew').className = "showmbtn";
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
    LaggedAPI.APIAds = {
        show: function(response) {
            console.log('ad count: ', adCount);
            console.log("ad timer: ", adTimer);
            if (adTimer < 30) {
                if (isDevMode) {
                    console.log("LaggedAPI: Ad called too soon, skipped");
                }
                response();
                return;
            }
            if (isDevMode) {
                console.log("init check: ", initCheck);
                if (!initCheck && !isTestingMode) {
                    alert("INIT function not called, or calling Ad too soon. TIP: Call INIT function after load, call Ad on play button click.");
                    return;
                }
                if (isTestingMode) {
                    console.log("DEV MODE: Showing example ad, click on ad to close.");
                    var sampleAdPopup = document.createElement('div');
                    sampleAdPopup.id = "exampleadpopup";
                    sampleAdPopup.onclick = function() {
                        document.getElementById("exampleadpopup").remove();
                        response();
                    }
                    document.body.appendChild(sampleAdPopup);
                } else {
                    response();
                }
                return;
            }
            if (useEvent && !isDevMode && !approvedDomainsList) {
                try {
                    window.parent.postMessage('apiAds', '*');
                } catch (e) {
                    console.log(e);
                }
                try {
                    setTimeout(function() {
                        response();
                        adTimer = 0;
                    }, 5000);
                } catch (e) {
                    console.log(e);
                }
                return;
            }
            if (isDevMode) {
                console.log("LaggedAPI: Ad called...");
            }
            if (adCount < 1) {
                LaggedAPI.GEvents.start(response);
            } else {
                LaggedAPI.GEvents.next(response);
            }
            adCount += 1;
            if (isDevMode) {
                console.log("LaggedAPI: Ad call #", adCount);
            }
            try {
                if (adsbygoogle.push.length < 1) {
                    response();
                }
            } catch (e) {
                console.log(e);
            }
        }
    };
    if (!isOnLagged && isOnApprovedWebsite) {
        console.log('listen for events');
        try {
            window.addEventListener("message", function(event) {
                try {
                    var messData = event.data.split('|');
                    var messageType = messData[0];
                    if (messageType === "parentCustomChannel") {
                        var messageData = messData[1];
                    } else if (messageType === "parentHostChannel") {
                        var messageData = messData[1];
                        useParentChannel = true;
                        parentChanneltoUse = messageData;
                        if (document.getElementById('gamesourcegoogle')) {
                            document.getElementById('gamesourcegoogle').setAttribute('data-ad-host-channel', parentChanneltoUse);
                            console.log('channel to use: ', parentChanneltoUse);
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            });
        } catch (e) {
            console.log(e);
        }
    }
    var A = function() {}
      , T = function(e) {
        var t = document.createDocumentFragment()
          , a = document.createElement("div");
        for (a.innerHTML = e; a.firstChild; )
            t.appendChild(a.firstChild);
        return t
    };
    Element.prototype.remove = function() {
        this.parentElement.removeChild(this)
    }
    ,
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
        for (var e = this.length - 1; 0 <= e; e--)
            this[e] && this[e].parentElement && this[e].parentElement.removeChild(this[e])
    }
}();
