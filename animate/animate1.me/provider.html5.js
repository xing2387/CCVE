webpackJsonpjwplayer([5], {
    8 : function(e, t, i) {
        var r, a;
        r = [i(1), i(11), i(2), i(13), i(12)],
        a = function(e, t, i, r, a) {
            function n(t) {
                if (this._currentTextTrackIndex = -1, t) {
                    if (this._textTracks ? (this._textTracks = e.reject(this._textTracks,
                    function(e) {
                        var t = e._id;
                        if (this.renderNatively && t && 0 === t.indexOf("nativecaptions")) return delete this._tracksById[t],
                        !0
                    },
                    this), delete this._tracksById.nativemetadata) : this._initTextTracks(), t.length) {
                        var r = 0,
                        n = t.length;
                        for (r; r < n; r++) {
                            var s = t[r];
                            if (!s._id) {
                                if ("captions" === s.kind || "metadata" === s.kind) {
                                    if (s._id = "native" + s.kind + r, !s.label && "captions" === s.kind) {
                                        var c = a.createLabel(s, this._unknownCount);
                                        s.name = c.label,
                                        this._unknownCount = c.unknownCount
                                    }
                                } else s._id = a.createId(s, this._textTracks.length);
                                if (this._tracksById[s._id]) continue;
                                s.inuse = !0
                            }
                            if (s.inuse && !this._tracksById[s._id]) if ("metadata" === s.kind) s.mode = "hidden",
                            s.oncuechange = L.bind(this),
                            this._tracksById[s._id] = s;
                            else if (E(s.kind)) {
                                var o, u = s.mode;
                                if (s.mode = "hidden", !s.cues.length && s.embedded) continue;
                                if (s.mode = u, this._cuesByTrackId[s._id] && !this._cuesByTrackId[s._id].loaded) {
                                    for (var d = this._cuesByTrackId[s._id].cues; o = d.shift();) b(this.renderNatively, s, o);
                                    s.mode = u,
                                    this._cuesByTrackId[s._id].loaded = !0
                                }
                                A.call(this, s)
                            }
                        }
                    }
                    this.renderNatively && (this.textTrackChangeHandler = this.textTrackChangeHandler || y.bind(this), this.addTracksListener(this.video.textTracks, "change", this.textTrackChangeHandler), (i.isEdge() || i.isFF() || i.isSafari()) && (this.addTrackHandler = this.addTrackHandler || _.bind(this), this.addTracksListener(this.video.textTracks, "addtrack", this.addTrackHandler))),
                    this._textTracks.length && this.trigger("subtitlesTracks", {
                        tracks: this._textTracks
                    })
                }
            }
            function s(e) {
                if (this.renderNatively) {
                    var t = e === this._itemTracks;
                    t || r.cancelXhr(this._itemTracks),
                    this._itemTracks = e,
                    e && (t || (this.disableTextTrack(), C.call(this), this.addTextTracks(e)))
                }
            }
            function c() {
                return this._currentTextTrackIndex
            }
            function o(t) {
                return this.renderNatively ? void(this._textTracks && (0 === t && e.each(this._textTracks,
                function(e) {
                    e.mode = e.embedded ? "hidden": "disabled"
                }), this._currentTextTrackIndex !== t - 1 && (this.disableTextTrack(), this._currentTextTrackIndex = t - 1, this._textTracks[this._currentTextTrackIndex] && (this._textTracks[this._currentTextTrackIndex].mode = "showing"), this.trigger("subtitlesTrackChanged", {
                    currentTrack: this._currentTextTrackIndex + 1,
                    tracks: this._textTracks
                })))) : void(this.setCurrentSubtitleTrack && this.setCurrentSubtitleTrack(t - 1))
            }
            function u(e) {
                if (e.text && e.begin && e.end) {
                    var t = e.trackid.toString(),
                    i = this._tracksById && this._tracksById[t];
                    i || (i = {
                        kind: "captions",
                        _id: t,
                        data: []
                    },
                    this.addTextTracks([i]), this.trigger("subtitlesTracks", {
                        tracks: this._textTracks
                    }));
                    var a;
                    e.useDTS && (i.source || (i.source = e.source || "mpegts")),
                    a = e.begin + "_" + e.text;
                    var n = this._metaCuesByTextTime[a];
                    if (!n) {
                        n = {
                            begin: e.begin,
                            end: e.end,
                            text: e.text
                        },
                        this._metaCuesByTextTime[a] = n;
                        var s = r.convertToVTTCues([n])[0];
                        i.data.push(s)
                    }
                }
            }
            function d(e) {
                this._tracksById || this._initTextTracks();
                var t = e.track ? e.track: "native" + e.type,
                i = this._tracksById[t],
                r = "captions" === e.type ? "Unknown CC": "ID3 Metadata",
                a = e.cue;
                if (!i) {
                    var n = {
                        kind: e.type,
                        _id: t,
                        label: r,
                        embedded: !0
                    };
                    i = I.call(this, n),
                    this.renderNatively || "metadata" === i.kind ? this.setTextTracks(this.video.textTracks) : m.call(this, [i])
                }
                R.call(this, i, a) && (this.renderNatively || "metadata" === i.kind ? b(this.renderNatively, i, a) : i.data.push(a))
            }
            function l(e) {
                var t = this._tracksById[e.name];
                if (t) {
                    t.source = e.source;
                    for (var i = e.captions || [], a = [], n = !1, s = 0; s < i.length; s++) {
                        var c = i[s],
                        o = e.name + "_" + c.begin + "_" + c.end;
                        this._metaCuesByTextTime[o] || (this._metaCuesByTextTime[o] = c, a.push(c), n = !0)
                    }
                    n && a.sort(function(e, t) {
                        return e.begin - t.begin
                    });
                    var u = r.convertToVTTCues(a);
                    Array.prototype.push.apply(t.data, u)
                }
            }
            function h(e, t, i) {
                e && (f(e, t, i), this.instreamMode || (e.addEventListener ? e.addEventListener(t, i) : e["on" + t] = i))
            }
            function f(e, t, i) {
                e && (e.removeEventListener ? e.removeEventListener(t, i) : e["on" + t] = null)
            }
            function T() {
                r.cancelXhr(this._itemTracks);
                var e = this._tracksById && this._tracksById.nativemetadata; (this.renderNatively || e) && (x(this.renderNatively, this.video.textTracks), e && (e.oncuechange = null)),
                this._itemTracks = null,
                this._textTracks = null,
                this._tracksById = null,
                this._cuesByTrackId = null,
                this._metaCuesByTextTime = null,
                this._unknownCount = 0,
                this._activeCuePosition = null,
                this.renderNatively && (this.removeTracksListener(this.video.textTracks, "change", this.textTrackChangeHandler), x(this.renderNatively, this.video.textTracks))
            }
            function k(e) {
                this._cachedVTTCues[e] && (this._cachedVTTCues[e] = {},
                this._tracksById[e].data = [])
            }
            function g() {
                if (this._textTracks) {
                    var e = this._textTracks[this._currentTextTrackIndex];
                    if (e) {
                        e.mode = "disabled";
                        var t = e._id;
                        t && 0 === t.indexOf("nativecaptions") && (e.mode = "hidden")
                    }
                }
            }
            function v() {
                if (this._textTracks) {
                    var e = this._textTracks[this._currentTextTrackIndex];
                    e && (e.mode = "showing")
                }
            }
            function y() {
                var t = this.video.textTracks,
                i = e.filter(t,
                function(e) {
                    return (e.inuse || !e._id) && E(e.kind)
                });
                if (!this._textTracks || S.call(this, i)) return void this.setTextTracks(t);
                for (var r = -1,
                a = 0; a < this._textTracks.length; a++) if ("showing" === this._textTracks[a].mode) {
                    r = a;
                    break
                }
                r !== this._currentTextTrackIndex && this.setSubtitlesTrack(r + 1)
            }
            function _() {
                this.setTextTracks(this.video.textTracks)
            }
            function m(e) {
                if (e) {
                    this._textTracks || this._initTextTracks();
                    for (var t = 0; t < e.length; t++) {
                        var i = e[t];
                        if (!i.kind || E(i.kind)) {
                            var a = I.call(this, i);
                            A.call(this, a),
                            i.file && (i.data = [], r.loadFile(i, this.addVTTCuesToTrack.bind(this, a), M))
                        }
                    }
                    this._textTracks && this._textTracks.length && this.trigger("subtitlesTracks", {
                        tracks: this._textTracks
                    })
                }
            }
            function p(e, t) {
                if (this.renderNatively) {
                    var i = this._tracksById[e._id];
                    if (!i) return this._cuesByTrackId || (this._cuesByTrackId = {}),
                    void(this._cuesByTrackId[e._id] = {
                        cues: t,
                        loaded: !1
                    });
                    if (!this._cuesByTrackId[e._id] || !this._cuesByTrackId[e._id].loaded) {
                        var r;
                        for (this._cuesByTrackId[e._id] = {
                            cues: t,
                            loaded: !0
                        }; r = t.shift();) b(this.renderNatively, i, r)
                    }
                }
            }
            function b(e, t, r) {
                if (!i.isIE() || !e || !window.TextTrackCue) return void t.addCue(r);
                var a = new window.TextTrackCue(r.startTime, r.endTime, r.text);
                t.addCue(a)
            }
            function x(t, r) {
                r && r.length && e.each(r,
                function(e) {
                    if (! (i.isIE() && t && /^(native|subtitle|cc)/.test(e._id))) {
                        e.mode = "disabled",
                        e.mode = "hidden";
                        for (var r = e.cues.length; r--;) e.removeCue(e.cues[r]);
                        e.embedded || (e.mode = "disabled"),
                        e.inuse = !1
                    }
                })
            }
            function E(e) {
                return "subtitles" === e || "captions" === e
            }
            function w() {
                this._textTracks = [],
                this._tracksById = {},
                this._metaCuesByTextTime = {},
                this._cuesByTrackId = {},
                this._cachedVTTCues = {},
                this._unknownCount = 0
            }
            function I(t) {
                var i, r = a.createLabel(t, this._unknownCount),
                n = r.label;
                if (this._unknownCount = r.unknownCount, this.renderNatively || "metadata" === t.kind) {
                    var s = this.video.textTracks;
                    i = e.findWhere(s, {
                        label: n
                    }),
                    i ? (i.kind = t.kind, i.language = t.language || "") : i = this.video.addTextTrack(t.kind, n, t.language || ""),
                    i["default"] = t["default"],
                    i.mode = "disabled",
                    i.inuse = !0
                } else i = t,
                i.data = i.data || [];
                return i._id || (i._id = a.createId(t, this._textTracks.length)),
                i
            }
            function A(e) {
                this._textTracks.push(e),
                this._tracksById[e._id] = e
            }
            function C() {
                if (this._textTracks) {
                    var t = e.filter(this._textTracks,
                    function(e) {
                        return e.embedded || "subs" === e.groupid
                    });
                    this._initTextTracks(),
                    e.each(t,
                    function(e) {
                        this._tracksById[e._id] = e
                    }),
                    this._textTracks = t
                }
            }
            function L(i) {
                var r = i.currentTarget.activeCues;
                if (r && r.length) {
                    var a = r[r.length - 1].startTime;
                    if (this._activeCuePosition !== a) {
                        var n = [];
                        if (e.each(r,
                        function(e) {
                            e.startTime < a || (e.data || e.value ? n.push(e) : e.text && this.trigger("meta", {
                                metadataTime: a,
                                metadata: JSON.parse(e.text)
                            }))
                        },
                        this), n.length) {
                            var s = t.parseID3(n);
                            this.trigger("meta", {
                                metadataTime: a,
                                metadata: s
                            })
                        }
                        this._activeCuePosition = a
                    }
                }
            }
            function R(e, t) {
                var i = e.kind;
                this._cachedVTTCues[e._id] || (this._cachedVTTCues[e._id] = {});
                var r, a = this._cachedVTTCues[e._id];
                switch (i) {
                case "captions":
                case "subtitles":
                    r = Math.floor(20 * t.startTime);
                    var n = "_" + t.line,
                    s = Math.floor(20 * t.endTime),
                    c = a[r + n] || a[r + 1 + n] || a[r - 1 + n];
                    return ! (c && Math.abs(c - s) <= 1) && (a[r + n] = s, !0);
                case "metadata":
                    var o = t.data ? new Uint8Array(t.data).join("") : t.text;
                    return r = t.startTime + o,
                    !a[r] && (a[r] = t.endTime, !0);
                default:
                    return ! 1
                }
            }
            function S(e) {
                if (e.length > this._textTracks.length) return ! 0;
                for (var t = 0; t < e.length; t++) {
                    var i = e[t];
                    if (!i._id || !this._tracksById[i._id]) return ! 0
                }
                return ! 1
            }
            function M(e) {
                i.log("CAPTIONS(" + e + ")")
            }
            var B = {
                _itemTracks: null,
                _textTracks: null,
                _tracksById: null,
                _cuesByTrackId: null,
                _cachedVTTCues: null,
                _metaCuesByTextTime: null,
                _currentTextTrackIndex: -1,
                _unknownCount: 0,
                _activeCuePosition: null,
                _initTextTracks: w,
                addTracksListener: h,
                clearTracks: T,
                clearCueData: k,
                disableTextTrack: g,
                enableTextTrack: v,
                getSubtitlesTrack: c,
                removeTracksListener: f,
                addTextTracks: m,
                setTextTracks: n,
                setupSideloadedTracks: s,
                setSubtitlesTrack: o,
                textTrackChangeHandler: null,
                addTrackHandler: null,
                addCuesToTrack: l,
                addCaptionsCue: u,
                addVTTCue: d,
                addVTTCuesToTrack: p,
                renderNatively: !1
            };
            return B
        }.apply(t, r),
        !(void 0 !== a && (e.exports = a))
    },
    9 : function(e, t) {
        "use strict";
        function i(e) {
            return {
                bitrate: e.bitrate,
                label: e.label,
                width: e.width,
                height: e.height
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.qualityLevel = i
    },
    24 : function(e, t, i) {
        var r, a;
        r = [],
        a = function() {
            function e(e) {
                return e && e.length ? e.end(e.length - 1) : 0
            }
            return {
                endOfRange: e
            }
        }.apply(t, r),
        !(void 0 !== a && (e.exports = a))
    },
    77 : function(e, t, i) {
        var r, a;
        r = [i(109), i(63), i(4), i(1)],
        a = function(e, t, i, r) {
            function a(e, a) {
                function l(i) {
                    var a = i.target,
                    c = i.initData;
                    if (a.webkitKeys || a.webkitSetMediaKeys(new window.WebKitMediaKeys("com.apple.fps.1_0")), !a.webkitKeys) throw new Error("Could not create MediaKeys");
                    var d = e.fairplay;
                    d.initData = c,
                    t.ajax(d.certificateUrl,
                    function(e) {
                        var t = new Uint8Array(e.response),
                        i = d.extractContentId(u(c));
                        r.isString(i) && (i = o(i));
                        var l = n(c, i, t),
                        h = a.webkitKeys.createSession("video/mp4", l);
                        if (!h) throw new Error("Could not create key session");
                        s(h, "webkitkeymessage", f),
                        s(h, "webkitkeyerror", v),
                        d.session = h
                    },
                    g, {
                        responseType: "arraybuffer"
                    })
                }
                function f(t) {
                    var i = e.fairplay,
                    a = t.target,
                    n = t.message,
                    s = new XMLHttpRequest;
                    s.responseType = i.licenseResponseType,
                    s.addEventListener("load", T, !1),
                    s.addEventListener("error", y, !1);
                    var c = "";
                    c = r.isFunction(i.processSpcUrl) ? i.processSpcUrl(u(i.initData)) : i.processSpcUrl,
                    s.open("POST", c, !0),
                    r.each(i.licenseRequestHeaders,
                    function(e) {
                        s.setRequestHeader(e.name, e.value)
                    });
                    var o = i.licenseRequestMessage(n, a);
                    s.send(o)
                }
                function T(t) {
                    var i = t.target,
                    a = e.fairplay.extractKey(i.response);
                    r.isFunction(a.then) ? a.then(k) : k(a)
                }
                function k(t) {
                    var i = e.fairplay.session,
                    a = t;
                    r.isString(a) && (a = d(a)),
                    i.update(a)
                }
                function g() {
                    e.trigger(i.JWPLAYER_MEDIA_ERROR, {
                        message: "Error loading media: Failed to retrieve the server certificate"
                    })
                }
                function v() {
                    e.trigger(i.JWPLAYER_MEDIA_ERROR, {
                        message: "Error loading media: Decryption key error was encountered"
                    })
                }
                function y() {
                    e.trigger(i.JWPLAYER_MEDIA_ERROR, {
                        message: "Error loading media: The license request failed"
                    })
                }
                var _ = a.sources[0];
                if (!e.fairplay || e.fairplay.source !== _) {
                    var m = _.drm;
                    m && m.fairplay ? (e.fairplay = r.extend({},
                    h, m.fairplay), e.fairplay.source = _, e.fairplay.destroy = function() {
                        c(e.video, "webkitneedkey", l);
                        var t = this.session;
                        t && (c(t, "webkitkeymessage", f), c(t, "webkitkeyerror", v)),
                        e.fairplay = null
                    },
                    s(e.video, "webkitneedkey", l)) : e.fairplay && e.fairplay.destroy()
                }
            }
            function n(e, t, i) {
                var r = 0,
                a = new ArrayBuffer(e.byteLength + 4 + t.byteLength + 4 + i.byteLength),
                n = new DataView(a),
                s = new Uint8Array(a, r, e.byteLength);
                s.set(e),
                r += e.byteLength,
                n.setUint32(r, t.byteLength, !0),
                r += 4;
                var c = new Uint16Array(a, r, t.length);
                c.set(t),
                r += c.byteLength,
                n.setUint32(r, i.byteLength, !0),
                r += 4;
                var o = new Uint8Array(a, r, i.byteLength);
                return o.set(i),
                new Uint8Array(a, 0, a.byteLength)
            }
            function s(e, t, i) {
                c(e, t, i),
                e.addEventListener(t, i, !1)
            }
            function c(e, t, i) {
                e && e.removeEventListener(t, i)
            }
            function o(e) {
                for (var t = new ArrayBuffer(2 * e.length), i = new Uint16Array(t), r = 0, a = e.length; r < a; r++) i[r] = e.charCodeAt(r);
                return i
            }
            function u(e) {
                var t = new Uint16Array(e.buffer);
                return String.fromCharCode.apply(null, t)
            }
            function d(e) {
                for (var t = window.atob(e), i = t.length, r = new Uint8Array(new ArrayBuffer(i)), a = 0; a < i; a++) r[a] = t.charCodeAt(a);
                return r
            }
            var l = function(t, i) {
                e.call(this, t, i);
                var r = this.init,
                n = this.load,
                s = this.destroy;
                this.init = function(e) {
                    a(this, e),
                    r.call(this, e)
                },
                this.load = function(e) {
                    a(this, e),
                    n.call(this, e)
                },
                this.destroy = function(e) {
                    this.fairplay && this.fairplay.destroy(),
                    s.call(this, e)
                }
            },
            h = {
                certificateUrl: "",
                processSpcUrl: "",
                licenseResponseType: "arraybuffer",
                licenseRequestHeaders: [],
                licenseRequestMessage: function(e) {
                    return e
                },
                extractContentId: function(e) {
                    return e.split("skd://")[1]
                },
                extractKey: function(e) {
                    return new Uint8Array(e)
                }
            };
            return l.getName = e.getName,
            l
        }.apply(t, r),
        !(void 0 !== a && (e.exports = a))
    },
    109 : function(e, t, i) {
        var r, a, n = i(9);
        r = [i(60), i(23), i(2), i(14), i(1), i(4), i(5), i(10), i(3), i(8), i(24)],
        a = function(e, t, i, r, a, s, c, o, u, d, l) {
            function h(e, t) {
                i.foreach(e,
                function(e, i) {
                    t.addEventListener(e, i, !1)
                })
            }
            function f(e, t) {
                i.foreach(e,
                function(e, i) {
                    t.removeEventListener(e, i, !1)
                })
            }
            function T(o, T) {
                function I(e) {
                    return !! (i.isIOS() || i.isSafari() || i.isEdge()) || e && i.isChrome()
                }
                function A(e, t) {
                    Qe.setAttribute(e, t || "")
                }
                function C() {
                    Te(Qe.audioTracks),
                    Ce.setTextTracks(Qe.textTracks),
                    A("jw-loaded", "data")
                }
                function L() {
                    A("jw-loaded", "started")
                }
                function R(e) {
                    Ce.trigger("click", e)
                }
                function S() {
                    Ne || (j(O()), N(oe(), we, Ee))
                }
                function M() {
                    N(oe(), we, Ee)
                }
                function B() {
                    k(Be),
                    Re = !0,
                    Ce.state === c.STALLED ? Ce.setState(c.PLAYING) : Ce.state === c.PLAYING && (Be = setTimeout(ce, g)),
                    Ne && Qe.duration === 1 / 0 && 0 === Qe.currentTime || (j(O()), F(Qe.currentTime), N(oe(), we, Ee), Ce.state === c.PLAYING && (Ce.trigger(s.JWPLAYER_MEDIA_TIME, {
                        position: we,
                        duration: Ee
                    }), P()))
                }
                function D() {
                    Ce.trigger("ratechange", {
                        playbackRate: Qe.playbackRate
                    })
                }
                function P() {
                    var e = Ue.level;
                    if (e.width !== Qe.videoWidth || e.height !== Qe.videoHeight) {
                        if (e.width = Qe.videoWidth, e.height = Qe.videoHeight, ye(), !e.width || !e.height || Pe === -1) return;
                        Ue.reason = Ue.reason || "auto",
                        Ue.mode = "hls" === Ae[Pe].type ? "auto": "manual",
                        Ue.bitrate = 0,
                        e.index = Pe,
                        e.label = Ae[Pe].label,
                        Ce.trigger("visualQuality", Ue),
                        Ue.reason = ""
                    }
                }
                function N(e, t, i) {
                    0 === i || e === De && i === Ee || (De = e, Ce.trigger(s.JWPLAYER_MEDIA_BUFFER, {
                        bufferPercent: 100 * e,
                        position: t,
                        duration: i
                    })),
                    _e()
                }
                function F(e) {
                    Ee < 0 && (e = -(ie() - e)),
                    we = e
                }
                function O() {
                    var e = Qe.duration,
                    t = ie();
                    if (e === 1 / 0 && t) {
                        var i = t - te();
                        i !== 1 / 0 && i > v && (e = -i)
                    }
                    return e
                }
                function j(e) {
                    Ee = e,
                    Se && Se !== -1 && e && e !== 1 / 0 && Ce.seek(Se)
                }
                function W() {
                    var e = O();
                    Ne && e === 1 / 0 && (e = 0),
                    Ce.trigger(s.JWPLAYER_MEDIA_META, {
                        duration: e,
                        height: Qe.videoHeight,
                        width: Qe.videoWidth
                    }),
                    j(e)
                }
                function H() {
                    Re = !0,
                    Ne || ye(),
                    _ && Ce.setTextTracks(Ce._textTracks),
                    Y()
                }
                function U() {
                    A("jw-loaded", "meta"),
                    W()
                }
                function Y() {
                    Ie || (Ie = !0, Ce.trigger(s.JWPLAYER_MEDIA_BUFFER_FULL))
                }
                function J() {
                    Ce.setState(c.PLAYING),
                    Qe.hasAttribute("jw-played") || A("jw-played", ""),
                    Qe.hasAttribute("jw-gesture-required") && Qe.removeAttribute("jw-gesture-required"),
                    Ce.trigger(s.JWPLAYER_PROVIDER_FIRST_FRAME, {})
                }
                function q() {
                    be(),
                    Ce.state !== c.COMPLETE && Qe.hasAttribute("jw-played") && Qe.currentTime !== Qe.duration && Ce.setState(c.PAUSED)
                }
                function V() {
                    if (! (Ne || Qe.paused || Qe.ended || Ce.state === c.LOADING || Ce.state === c.ERROR || Ce.seeking)) return i.isIOS() && Qe.duration - Qe.currentTime <= .1 ? void ue() : void(pe() && (Ke = !0, me()) || Ce.setState(c.STALLED))
                }
                function K() {
                    Ce.trigger(s.JWPLAYER_MEDIA_ERROR, {
                        message: "Error loading media: File could not be played"
                    })
                }
                function G(e) {
                    var t;
                    return "array" === i.typeOf(e) && e.length > 0 && (t = a.map(e,
                    function(e, t) {
                        return {
                            label: e.label || t
                        }
                    })),
                    t
                }
                function Q(e) {
                    Ae = e,
                    Pe = X(e);
                    var t = G(e);
                    t && Ce.trigger(s.JWPLAYER_MEDIA_LEVELS, {
                        levels: t,
                        currentQuality: Pe
                    })
                }
                function X(e) {
                    var t = Math.max(0, Pe),
                    i = T.qualityLabel;
                    if (e) for (var r = 0; r < e.length; r++) if (e[r]["default"] && (t = r), i && e[r].label === i) return r;
                    return Ue.reason = "initial choice",
                    Ue.level = {},
                    t
                }
                function z() {
                    var e = Qe.play();
                    e && e["catch"] ? e["catch"](function(e) {
                        Qe.paused && (Ce.trigger(s.JWPLAYER_MEDIA_TIME, {
                            position: we,
                            duration: Ee,
                            isDurationChange: !0
                        }), Ce.setState(c.PAUSED)),
                        "NotAllowedError" === e.name && (console.warn(e), Qe.hasAttribute("jw-gesture-required") && Ce.trigger("autoplayFailed"))
                    }) : Qe.hasAttribute("jw-gesture-required") && Ce.trigger("autoplayFailed")
                }
                function Z(e, t) {
                    Se = 0,
                    be();
                    var i = Qe.src,
                    r = document.createElement("source");
                    r.src = Ae[Pe].file;
                    var a = i !== r.src,
                    n = Qe.getAttribute("jw-loaded");
                    a || "none" === n || "started" === n ? (Ee = t, $(Ae[Pe]), Ce.setupSideloadedTracks(Ce._itemTracks), i && a && Qe.load()) : 0 === e && Qe.currentTime > 0 && (Se = -1, Ce.seek(e)),
                    we = Qe.currentTime,
                    e > 0 && Ce.seek(e),
                    z()
                }
                function $(t) {
                    We = null,
                    He = -1,
                    Ue.reason || (Ue.reason = "initial choice", Ue.level = {}),
                    Re = !1,
                    Ie = !1,
                    Ne = e(t),
                    Ne && (Ce.supportsPlaybackRate = !1),
                    t.preload && "none" !== t.preload && t.preload !== Qe.getAttribute("preload") && A("preload", t.preload);
                    var i = document.createElement("source");
                    i.src = t.file;
                    var r = Qe.src !== i.src;
                    r && (A("jw-loaded", "none"), Qe.src = t.file)
                }
                function ee() {
                    Qe && (Ce.disableTextTrack(), Qe.removeAttribute("preload"), Qe.removeAttribute("src"), Qe.removeAttribute("jw-loaded"), Qe.removeAttribute("jw-played"), Qe.pause(), r.emptyElement(Qe), t.style(Qe, {
                        objectFit: ""
                    }), Pe = -1)
                }
                function te() {
                    for (var e = Qe.seekable ? Qe.seekable.length: 0, t = 1 / 0; e--;) t = Math.min(t, Qe.seekable.start(e));
                    return t
                }
                function ie() {
                    for (var e = Qe.seekable ? Qe.seekable.length: 0, t = 0; e--;) t = Math.max(t, Qe.seekable.end(e));
                    return t
                }
                function re() {
                    Ce.setState(c.LOADING)
                }
                function ae() {
                    var e = null !== Me ? Me: Qe.currentTime;
                    Me = null,
                    Se = 0,
                    Ce.seeking = !0,
                    Ce.trigger(s.JWPLAYER_MEDIA_SEEK, {
                        position: we,
                        offset: e
                    })
                }
                function ne() {
                    Ce.seeking = !1,
                    Ce.trigger(s.JWPLAYER_MEDIA_SEEKED)
                }
                function se() {
                    Ce.trigger("volume", {
                        volume: Math.round(100 * Qe.volume)
                    }),
                    Ce.trigger("mute", {
                        mute: Qe.muted
                    })
                }
                function ce() {
                    Qe.currentTime === we ? V() : Ke = !1
                }
                function oe() {
                    var e = Qe.buffered,
                    t = Qe.duration;
                    return ! e || 0 === e.length || t <= 0 || t === 1 / 0 ? 0 : i.between(e.end(e.length - 1) / t, 0, 1)
                }
                function ue() {
                    Ce.state !== c.IDLE && Ce.state !== c.COMPLETE && (be(), Pe = -1, Ce.trigger(s.JWPLAYER_MEDIA_COMPLETE))
                }
                function de(e) {
                    Oe = !0,
                    fe(e),
                    i.isIOS() && (Qe.controls = !1)
                }
                function le() {
                    for (var e = -1,
                    t = 0; t < Qe.audioTracks.length; t++) if (Qe.audioTracks[t].enabled) {
                        e = t;
                        break
                    }
                    ke(e)
                }
                function he(e) {
                    Oe = !1,
                    fe(e),
                    i.isIOS() && (Qe.controls = !1)
                }
                function fe(e) {
                    Ce.trigger("fullscreenchange", {
                        target: e.target,
                        jwstate: Oe
                    })
                }
                function Te(e) {
                    if (We = null, e) {
                        if (e.length) {
                            for (var t = 0; t < e.length; t++) if (e[t].enabled) {
                                He = t;
                                break
                            }
                            He === -1 && (He = 0, e[He].enabled = !0),
                            We = a.map(e,
                            function(e) {
                                var t = {
                                    name: e.label || e.language,
                                    language: e.language
                                };
                                return t
                            })
                        }
                        Ce.addTracksListener(e, "change", le),
                        We && Ce.trigger("audioTracks", {
                            currentTrack: He,
                            tracks: We
                        })
                    }
                }
                function ke(e) {
                    Qe && Qe.audioTracks && We && e > -1 && e < Qe.audioTracks.length && e !== He && (Qe.audioTracks[He].enabled = !1, He = e, Qe.audioTracks[He].enabled = !0, Ce.trigger("audioTrackChanged", {
                        currentTrack: He,
                        tracks: We
                    }))
                }
                function ge() {
                    return We || []
                }
                function ve() {
                    return He
                }
                function ye() {
                    if ("hls" === Ae[0].type) {
                        var e = "video";
                        0 === Qe.videoHeight && (e = "audio"),
                        Ce.trigger("mediaType", {
                            mediaType: e
                        })
                    }
                }
                function _e() {
                    var e = l.endOfRange(Qe.buffered),
                    t = Qe.duration === 1 / 0;
                    t && qe === e ? Je || (Je = setTimeout(function() {
                        Ve = !0,
                        me()
                    },
                    Ye)) : (k(Je), Je = null, Ve = !1),
                    qe = e
                }
                function me() {
                    return ! (!Ve || !Ke) && (Ce.trigger(s.JWPLAYER_MEDIA_ERROR, {
                        message: "The live stream is either down or has ended"
                    }), !0)
                }
                function pe() {
                    if (Qe.duration !== 1 / 0) return ! 1;
                    var e = 2;
                    return l.endOfRange(Qe.buffered) - Qe.currentTime <= e
                }
                function be() {
                    k(Be),
                    k(Je),
                    Je = null
                }
                this.state = c.IDLE,
                this.seeking = !1,
                a.extend(this, u, d),
                this.renderNatively = I(T.renderCaptionsNatively);
                var xe, Ee, we, Ie, Ae, Ce = this,
                Le = {
                    click: R,
                    durationchange: S,
                    ended: ue,
                    error: K,
                    loadstart: L,
                    loadeddata: C,
                    loadedmetadata: U,
                    canplay: H,
                    play: re,
                    playing: J,
                    progress: M,
                    pause: q,
                    seeking: ae,
                    seeked: ne,
                    timeupdate: B,
                    ratechange: D,
                    volumechange: se,
                    webkitbeginfullscreen: de,
                    webkitendfullscreen: he
                },
                Re = !1,
                Se = 0,
                Me = null,
                Be = -1,
                De = -1,
                Pe = -1,
                Ne = null,
                Fe = !!T.sdkplatform,
                Oe = !1,
                je = i.noop,
                We = null,
                He = -1,
                Ue = {
                    level: {}
                },
                Ye = 3e4,
                Je = null,
                qe = null,
                Ve = !1,
                Ke = !1,
                Ge = document.getElementById(o),
                Qe = Ge ? Ge.querySelector("video, audio") : void 0;
                Qe || (Qe = document.createElement("video"), Qe.load(), m && A("jw-gesture-required")),
                Qe.className = "jw-video jw-reset",
                this.isSDK = Fe,
                this.video = Qe,
                this.supportsPlaybackRate = !0,
                h(Le, Qe),
                A("disableRemotePlayback", ""),
                A("webkit-playsinline"),
                A("playsinline"),
                this.stop = function() {
                    be(),
                    ee(),
                    this.clearTracks(),
                    i.isIE() && Qe.pause(),
                    this.setState(c.IDLE)
                },
                this.destroy = function() {
                    je = i.noop,
                    f(Le, Qe),
                    this.removeTracksListener(Qe.audioTracks, "change", le),
                    this.removeTracksListener(Qe.textTracks, "change", Ce.textTrackChangeHandler),
                    this.remove(),
                    this.off()
                },
                this.init = function(e) {
                    Ae = e.sources,
                    Pe = X(e.sources),
                    e.sources.length && "hls" !== e.sources[0].type && this.sendMediaType(e.sources),
                    we = e.starttime || 0,
                    Ee = e.duration || 0,
                    Ue.reason = "";
                    var t = Ae[Pe];
                    "none" !== t.preload && $(t),
                    this.setupSideloadedTracks(e.tracks)
                },
                this.load = function(e) {
                    Q(e.sources),
                    e.sources.length && "hls" !== e.sources[0].type && this.sendMediaType(e.sources),
                    m && !Qe.hasAttribute("jw-played") || re(),
                    Z(e.starttime || 0, e.duration || 0)
                },
                this.play = function() {
                    return Ce.seeking ? (re(), void Ce.once(s.JWPLAYER_MEDIA_SEEKED, Ce.play)) : (je(), void z())
                },
                this.pause = function() {
                    be(),
                    Qe.pause(),
                    je = function() {
                        var e = Qe.paused && Qe.currentTime;
                        if (e && Qe.duration === 1 / 0) {
                            var t = ie(),
                            i = t - te(),
                            r = i < v,
                            a = t - Qe.currentTime;
                            r && t && (a > 15 || a < 0) && (Me = Math.max(t - 10, t - i), F(Qe.currentTime), Qe.currentTime = Me)
                        }
                    },
                    this.setState(c.PAUSED)
                },
                this.seek = function(e) {
                    if (e < 0 && (e += te() + ie()), Re || (Re = !!ie()), Re) {
                        Se = 0;
                        try {
                            Ce.seeking = !0,
                            Me = e,
                            F(Qe.currentTime),
                            Qe.currentTime = e
                        } catch(t) {
                            Ce.seeking = !1,
                            Se = e
                        }
                    } else Se = e,
                    p && Qe.paused && z()
                },
                this.volume = function(e) {
                    e = i.between(e / 100, 0, 1),
                    Qe.volume = e
                },
                this.mute = function(e) {
                    Qe.muted = !!e
                },
                this.detachMedia = function() {
                    return be(),
                    f(Le, Qe),
                    this.removeTracksListener(Qe.textTracks, "change", this.textTrackChangeHandler),
                    this.disableTextTrack(),
                    Qe
                },
                this.attachMedia = function() {
                    h(Le, Qe),
                    Re = !1,
                    this.seeking = !1,
                    Qe.loop = !1,
                    this.enableTextTrack(),
                    this.renderNatively && this.setTextTracks(this.video.textTracks),
                    this.addTracksListener(Qe.textTracks, "change", this.textTrackChangeHandler)
                },
                this.setContainer = function(e) {
                    xe = e,
                    e.insertBefore(Qe, e.firstChild)
                },
                this.getContainer = function() {
                    return xe
                },
                this.remove = function() {
                    ee(),
                    be(),
                    xe === Qe.parentNode && xe.removeChild(Qe)
                },
                this.setVisibility = function(e) {
                    e = !!e,
                    e || b ? t.style(xe, {
                        visibility: "visible",
                        opacity: 1
                    }) : t.style(xe, {
                        visibility: "",
                        opacity: 0
                    })
                },
                this.resize = function(e, i, r) {
                    if (! (e && i && Qe.videoWidth && Qe.videoHeight)) return ! 1;
                    var a = {
                        objectFit: "",
                        width: "",
                        height: ""
                    };
                    if ("uniform" === r) {
                        var n = e / i,
                        s = Qe.videoWidth / Qe.videoHeight;
                        Math.abs(n - s) < .09 && (a.objectFit = "fill", r = "exactfit")
                    }
                    var c = y || x || E || b && !p;
                    if (c) {
                        var o = -Math.floor(Qe.videoWidth / 2 + 1),
                        u = -Math.floor(Qe.videoHeight / 2 + 1),
                        d = Math.ceil(100 * e / Qe.videoWidth) / 100,
                        l = Math.ceil(100 * i / Qe.videoHeight) / 100;
                        "none" === r ? d = l = 1 : "fill" === r ? d = l = Math.max(d, l) : "uniform" === r && (d = l = Math.min(d, l)),
                        a.width = Qe.videoWidth,
                        a.height = Qe.videoHeight,
                        a.top = a.left = "50%",
                        a.margin = 0,
                        t.transform(Qe, "translate(" + o + "px, " + u + "px) scale(" + d.toFixed(2) + ", " + l.toFixed(2) + ")")
                    }
                    return t.style(Qe, a),
                    !1
                },
                this.setFullscreen = function(e) {
                    if (e = !!e) {
                        var t = i.tryCatch(function() {
                            var e = Qe.webkitEnterFullscreen || Qe.webkitEnterFullScreen;
                            e && e.apply(Qe)
                        });
                        return ! (t instanceof i.Error) && Ce.getFullScreen()
                    }
                    var r = Qe.webkitExitFullscreen || Qe.webkitExitFullScreen;
                    return r && r.apply(Qe),
                    e
                },
                Ce.getFullScreen = function() {
                    return Oe || !!Qe.webkitDisplayingFullscreen
                },
                this.setCurrentQuality = function(e) {
                    if (Pe !== e && e >= 0 && Ae && Ae.length > e) {
                        Pe = e,
                        Ue.reason = "api",
                        Ue.level = {},
                        this.trigger(s.JWPLAYER_MEDIA_LEVEL_CHANGED, {
                            currentQuality: e,
                            levels: G(Ae)
                        }),
                        T.qualityLabel = Ae[e].label;
                        var t = Qe.currentTime || 0,
                        i = Qe.duration || 0;
                        i <= 0 && (i = Ee),
                        re(),
                        Z(t, i)
                    }
                },
                this.setPlaybackRate = function(e) {
                    Qe.playbackRate = Qe.defaultPlaybackRate = e
                },
                this.getPlaybackRate = function() {
                    return Qe.playbackRate
                },
                this.getCurrentQuality = function() {
                    return Pe
                },
                this.getQualityLevels = function() {
                    return a.map(Ae,
                    function(e) {
                        return (0, n.qualityLevel)(e)
                    })
                },
                this.getName = function() {
                    return {
                        name: w
                    }
                },
                this.setCurrentAudioTrack = ke,
                this.getAudioTracks = ge,
                this.getCurrentAudioTrack = ve
            }
            var k = window.clearTimeout,
            g = 256,
            v = 120,
            y = i.isIE(),
            _ = i.isIE(9),
            m = i.isMobile(),
            p = i.isFF(),
            b = i.isAndroidNative(),
            x = i.isIOS(7),
            E = i.isIOS(8),
            w = "html5",
            I = function() {};
            return I.prototype = o,
            T.prototype = new I,
            T.getName = function() {
                return {
                    name: "html5"
                }
            },
            T
        }.apply(t, r),
        !(void 0 !== a && (e.exports = a))
    }
});