webpackJsonpjwplayer([2], {
    8 : function(e, t, r) {
        var i, a;
        i = [r(1), r(11), r(2), r(13), r(12)],
        a = function(e, t, r, i, a) {
            function n(t) {
                if (this._currentTextTrackIndex = -1, t) {
                    if (this._textTracks ? (this._textTracks = e.reject(this._textTracks,
                    function(e) {
                        var t = e._id;
                        if (this.renderNatively && t && 0 === t.indexOf("nativecaptions")) return delete this._tracksById[t],
                        !0
                    },
                    this), delete this._tracksById.nativemetadata) : this._initTextTracks(), t.length) {
                        var i = 0,
                        n = t.length;
                        for (i; i < n; i++) {
                            var s = t[i];
                            if (!s._id) {
                                if ("captions" === s.kind || "metadata" === s.kind) {
                                    if (s._id = "native" + s.kind + i, !s.label && "captions" === s.kind) {
                                        var o = a.createLabel(s, this._unknownCount);
                                        s.name = o.label,
                                        this._unknownCount = o.unknownCount
                                    }
                                } else s._id = a.createId(s, this._textTracks.length);
                                if (this._tracksById[s._id]) continue;
                                s.inuse = !0
                            }
                            if (s.inuse && !this._tracksById[s._id]) if ("metadata" === s.kind) s.mode = "hidden",
                            s.oncuechange = D.bind(this),
                            this._tracksById[s._id] = s;
                            else if (R(s.kind)) {
                                var l, u = s.mode;
                                if (s.mode = "hidden", !s.cues.length && s.embedded) continue;
                                if (s.mode = u, this._cuesByTrackId[s._id] && !this._cuesByTrackId[s._id].loaded) {
                                    for (var d = this._cuesByTrackId[s._id].cues; l = d.shift();) b(this.renderNatively, s, l);
                                    s.mode = u,
                                    this._cuesByTrackId[s._id].loaded = !0
                                }
                                L.call(this, s)
                            }
                        }
                    }
                    this.renderNatively && (this.textTrackChangeHandler = this.textTrackChangeHandler || m.bind(this), this.addTracksListener(this.video.textTracks, "change", this.textTrackChangeHandler), (r.isEdge() || r.isFF() || r.isSafari()) && (this.addTrackHandler = this.addTrackHandler || T.bind(this), this.addTracksListener(this.video.textTracks, "addtrack", this.addTrackHandler))),
                    this._textTracks.length && this.trigger("subtitlesTracks", {
                        tracks: this._textTracks
                    })
                }
            }
            function s(e) {
                if (this.renderNatively) {
                    var t = e === this._itemTracks;
                    t || i.cancelXhr(this._itemTracks),
                    this._itemTracks = e,
                    e && (t || (this.disableTextTrack(), w.call(this), this.addTextTracks(e)))
                }
            }
            function o() {
                return this._currentTextTrackIndex
            }
            function l(t) {
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
                    r = this._tracksById && this._tracksById[t];
                    r || (r = {
                        kind: "captions",
                        _id: t,
                        data: []
                    },
                    this.addTextTracks([r]), this.trigger("subtitlesTracks", {
                        tracks: this._textTracks
                    }));
                    var a;
                    e.useDTS && (r.source || (r.source = e.source || "mpegts")),
                    a = e.begin + "_" + e.text;
                    var n = this._metaCuesByTextTime[a];
                    if (!n) {
                        n = {
                            begin: e.begin,
                            end: e.end,
                            text: e.text
                        },
                        this._metaCuesByTextTime[a] = n;
                        var s = i.convertToVTTCues([n])[0];
                        r.data.push(s)
                    }
                }
            }
            function d(e) {
                this._tracksById || this._initTextTracks();
                var t = e.track ? e.track: "native" + e.type,
                r = this._tracksById[t],
                i = "captions" === e.type ? "Unknown CC": "ID3 Metadata",
                a = e.cue;
                if (!r) {
                    var n = {
                        kind: e.type,
                        _id: t,
                        label: i,
                        embedded: !0
                    };
                    r = S.call(this, n),
                    this.renderNatively || "metadata" === r.kind ? this.setTextTracks(this.video.textTracks) : E.call(this, [r])
                }
                O.call(this, r, a) && (this.renderNatively || "metadata" === r.kind ? b(this.renderNatively, r, a) : r.data.push(a))
            }
            function c(e) {
                var t = this._tracksById[e.name];
                if (t) {
                    t.source = e.source;
                    for (var r = e.captions || [], a = [], n = !1, s = 0; s < r.length; s++) {
                        var o = r[s],
                        l = e.name + "_" + o.begin + "_" + o.end;
                        this._metaCuesByTextTime[l] || (this._metaCuesByTextTime[l] = o, a.push(o), n = !0)
                    }
                    n && a.sort(function(e, t) {
                        return e.begin - t.begin
                    });
                    var u = i.convertToVTTCues(a);
                    Array.prototype.push.apply(t.data, u)
                }
            }
            function f(e, t, r) {
                e && (h(e, t, r), this.instreamMode || (e.addEventListener ? e.addEventListener(t, r) : e["on" + t] = r))
            }
            function h(e, t, r) {
                e && (e.removeEventListener ? e.removeEventListener(t, r) : e["on" + t] = null)
            }
            function v() {
                i.cancelXhr(this._itemTracks);
                var e = this._tracksById && this._tracksById.nativemetadata; (this.renderNatively || e) && (_(this.renderNatively, this.video.textTracks), e && (e.oncuechange = null)),
                this._itemTracks = null,
                this._textTracks = null,
                this._tracksById = null,
                this._cuesByTrackId = null,
                this._metaCuesByTextTime = null,
                this._unknownCount = 0,
                this._activeCuePosition = null,
                this.renderNatively && (this.removeTracksListener(this.video.textTracks, "change", this.textTrackChangeHandler), _(this.renderNatively, this.video.textTracks))
            }
            function g(e) {
                this._cachedVTTCues[e] && (this._cachedVTTCues[e] = {},
                this._tracksById[e].data = [])
            }
            function p() {
                if (this._textTracks) {
                    var e = this._textTracks[this._currentTextTrackIndex];
                    if (e) {
                        e.mode = "disabled";
                        var t = e._id;
                        t && 0 === t.indexOf("nativecaptions") && (e.mode = "hidden")
                    }
                }
            }
            function y() {
                if (this._textTracks) {
                    var e = this._textTracks[this._currentTextTrackIndex];
                    e && (e.mode = "showing")
                }
            }
            function m() {
                var t = this.video.textTracks,
                r = e.filter(t,
                function(e) {
                    return (e.inuse || !e._id) && R(e.kind)
                });
                if (!this._textTracks || I.call(this, r)) return void this.setTextTracks(t);
                for (var i = -1,
                a = 0; a < this._textTracks.length; a++) if ("showing" === this._textTracks[a].mode) {
                    i = a;
                    break
                }
                i !== this._currentTextTrackIndex && this.setSubtitlesTrack(i + 1)
            }
            function T() {
                this.setTextTracks(this.video.textTracks)
            }
            function E(e) {
                if (e) {
                    this._textTracks || this._initTextTracks();
                    for (var t = 0; t < e.length; t++) {
                        var r = e[t];
                        if (!r.kind || R(r.kind)) {
                            var a = S.call(this, r);
                            L.call(this, a),
                            r.file && (r.data = [], i.loadFile(r, this.addVTTCuesToTrack.bind(this, a), C))
                        }
                    }
                    this._textTracks && this._textTracks.length && this.trigger("subtitlesTracks", {
                        tracks: this._textTracks
                    })
                }
            }
            function k(e, t) {
                if (this.renderNatively) {
                    var r = this._tracksById[e._id];
                    if (!r) return this._cuesByTrackId || (this._cuesByTrackId = {}),
                    void(this._cuesByTrackId[e._id] = {
                        cues: t,
                        loaded: !1
                    });
                    if (!this._cuesByTrackId[e._id] || !this._cuesByTrackId[e._id].loaded) {
                        var i;
                        for (this._cuesByTrackId[e._id] = {
                            cues: t,
                            loaded: !0
                        }; i = t.shift();) b(this.renderNatively, r, i)
                    }
                }
            }
            function b(e, t, i) {
                if (!r.isIE() || !e || !window.TextTrackCue) return void t.addCue(i);
                var a = new window.TextTrackCue(i.startTime, i.endTime, i.text);
                t.addCue(a)
            }
            function _(t, i) {
                i && i.length && e.each(i,
                function(e) {
                    if (! (r.isIE() && t && /^(native|subtitle|cc)/.test(e._id))) {
                        e.mode = "disabled",
                        e.mode = "hidden";
                        for (var i = e.cues.length; i--;) e.removeCue(e.cues[i]);
                        e.embedded || (e.mode = "disabled"),
                        e.inuse = !1
                    }
                })
            }
            function R(e) {
                return "subtitles" === e || "captions" === e
            }
            function A() {
                this._textTracks = [],
                this._tracksById = {},
                this._metaCuesByTextTime = {},
                this._cuesByTrackId = {},
                this._cachedVTTCues = {},
                this._unknownCount = 0
            }
            function S(t) {
                var r, i = a.createLabel(t, this._unknownCount),
                n = i.label;
                if (this._unknownCount = i.unknownCount, this.renderNatively || "metadata" === t.kind) {
                    var s = this.video.textTracks;
                    r = e.findWhere(s, {
                        label: n
                    }),
                    r ? (r.kind = t.kind, r.language = t.language || "") : r = this.video.addTextTrack(t.kind, n, t.language || ""),
                    r["default"] = t["default"],
                    r.mode = "disabled",
                    r.inuse = !0
                } else r = t,
                r.data = r.data || [];
                return r._id || (r._id = a.createId(t, this._textTracks.length)),
                r
            }
            function L(e) {
                this._textTracks.push(e),
                this._tracksById[e._id] = e
            }
            function w() {
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
            function D(r) {
                var i = r.currentTarget.activeCues;
                if (i && i.length) {
                    var a = i[i.length - 1].startTime;
                    if (this._activeCuePosition !== a) {
                        var n = [];
                        if (e.each(i,
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
            function O(e, t) {
                var r = e.kind;
                this._cachedVTTCues[e._id] || (this._cachedVTTCues[e._id] = {});
                var i, a = this._cachedVTTCues[e._id];
                switch (r) {
                case "captions":
                case "subtitles":
                    i = Math.floor(20 * t.startTime);
                    var n = "_" + t.line,
                    s = Math.floor(20 * t.endTime),
                    o = a[i + n] || a[i + 1 + n] || a[i - 1 + n];
                    return ! (o && Math.abs(o - s) <= 1) && (a[i + n] = s, !0);
                case "metadata":
                    var l = t.data ? new Uint8Array(t.data).join("") : t.text;
                    return i = t.startTime + l,
                    !a[i] && (a[i] = t.endTime, !0);
                default:
                    return ! 1
                }
            }
            function I(e) {
                if (e.length > this._textTracks.length) return ! 0;
                for (var t = 0; t < e.length; t++) {
                    var r = e[t];
                    if (!r._id || !this._tracksById[r._id]) return ! 0
                }
                return ! 1
            }
            function C(e) {
                r.log("CAPTIONS(" + e + ")")
            }
            var P = {
                _itemTracks: null,
                _textTracks: null,
                _tracksById: null,
                _cuesByTrackId: null,
                _cachedVTTCues: null,
                _metaCuesByTextTime: null,
                _currentTextTrackIndex: -1,
                _unknownCount: 0,
                _activeCuePosition: null,
                _initTextTracks: A,
                addTracksListener: f,
                clearTracks: v,
                clearCueData: g,
                disableTextTrack: p,
                enableTextTrack: y,
                getSubtitlesTrack: o,
                removeTracksListener: h,
                addTextTracks: E,
                setTextTracks: n,
                setupSideloadedTracks: s,
                setSubtitlesTrack: l,
                textTrackChangeHandler: null,
                addTrackHandler: null,
                addCuesToTrack: c,
                addCaptionsCue: u,
                addVTTCue: d,
                addVTTCuesToTrack: k,
                renderNatively: !1
            };
            return P
        }.apply(t, i),
        !(void 0 !== a && (e.exports = a))
    },
    9 : function(e, t) {
        "use strict";
        function r(e) {
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
        t.qualityLevel = r
    },
    17 : function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.PLAYER = 1,
        t.SETUP = 2,
        t.MEDIA = 3,
        t.NETWORK = 4,
        t.AD = 5
    },
    18 : function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.BAD_HTTP_STATUS = 4001,
        t.CROSSDOMAIN_ERROR = 4002,
        t.BLOCKED_MIXED_CONTENT = 4003
    },
    19 : function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.RECOVERABLE = 1,
        t.FATAL = 2
    },
    24 : function(e, t, r) {
        var i, a;
        i = [],
        a = function() {
            function e(e) {
                return e && e.length ? e.end(e.length - 1) : 0
            }
            return {
                endOfRange: e
            }
        }.apply(t, i),
        !(void 0 !== a && (e.exports = a))
    },
    30 : function(e, t, r) {
        "use strict";
        function i(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t["default"] = e,
            t
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.Severity = t.Code = t.Category = t.NetworkError = void 0;
        var a = r(32);
        Object.defineProperty(t, "NetworkError", {
            enumerable: !0,
            get: function() {
                return a.NetworkError
            }
        });
        var n = r(17),
        s = i(n),
        o = r(18),
        l = i(o),
        u = r(19),
        d = i(u);
        t.Category = s,
        t.Code = l,
        t.Severity = d
    },
    31 : function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.JWError = function(e, t, r, i) {
            return {
                category: e,
                code: t,
                severity: r,
                message: i
            }
        }
    },
    32 : function(e, t, r) {
        "use strict";
        function i(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t["default"] = e,
            t
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.badStatusMessage = t.networkErrorMessage = t.networkErrorCode = t.NetworkError = void 0;
        var a = r(17),
        n = i(a),
        s = r(18),
        o = i(s),
        l = r(19),
        u = i(l),
        d = r(31),
        c = (t.NetworkError = function(e, t) {
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
            i = c(e, t);
            return (0, d.JWError)(n.NETWORK, i, u.FATAL, f(i, e, r))
        },
        t.networkErrorCode = function(e, t) {
            var r = void 0;
            return r = e > 0 ? o.BAD_HTTP_STATUS: t && "http:" === t.substring(0, 5) && "https:" === document.location.protocol ? o.BLOCKED_MIXED_CONTENT: o.CROSSDOMAIN_ERROR
        }),
        f = t.networkErrorMessage = function(e, t, r) {
            var i = "";
            switch (e) {
            case o.BAD_HTTP_STATUS:
                i = h(t, r);
                break;
            case o.CROSSDOMAIN_ERROR:
                i = "Crossdomain access denied";
                break;
            case o.BLOCKED_MIXED_CONTENT:
                i = "Unable to fetch HTTP resource over HTTPS";
                break;
            default:
                i = "Unknown Network Error"
            }
            return i
        },
        h = t.badStatusMessage = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            r = "";
            switch (e) {
            case 403:
                r = "You do not have permission to access this content";
                break;
            case 404:
                r = "404 Not Found";
                break;
            default:
                r = e + " " + t
            }
            return r
        }
    },
    46 : function(e, t, r) {
        var i, a;
        i = [r(2)],
        a = function(e) {
            return {
                container: null,
                volume: function(t) {
                    t = e.between(t / 100, 0, 1),
                    this.video.volume = t
                },
                mute: function(e) {
                    this.video.muted = !!e,
                    this.video.muted || this.video.removeAttribute("muted")
                },
                resize: function(t, r, i) {
                    if (! (t && r && this.video.videoWidth && this.video.videoHeight)) return ! 1;
                    if ("uniform" === i) {
                        var a = t / r,
                        n = this.video.videoWidth / this.video.videoHeight,
                        s = null;
                        Math.abs(a - n) < .09 && (s = "fill"),
                        e.style(this.video, {
                            objectFit: s
                        })
                    }
                    return ! 1
                },
                getContainer: function() {
                    return this.container
                },
                setContainer: function(e) {
                    this.container = e,
                    e.insertBefore(this.video, e.firstChild)
                },
                remove: function() {
                    this.stop(),
                    this.destroy(),
                    this.container === this.video.parentNode && this.container.removeChild(this.video)
                },
                getVideo: function(t, r) {
                    var i = r || document.getElementById(t),
                    a = i ? i.querySelector("video") : null;
                    return a || (a = document.createElement("video"), e.isMobile() && a.setAttribute("jw-gesture-required", "")),
                    a.className = "jw-video jw-reset",
                    this.video = a,
                    a
                }
            }
        }.apply(t, i),
        !(void 0 !== a && (e.exports = a))
    },
    47 : function(e, t, r) {
        var i, a;
        i = [r(3), r(10), r(5), r(1), r(24)],
        a = function(e, t, r, i, a) {
            var n = 256;
            return {
                stallCheckTimeout_: -1,
                lastStalledTime_: NaN,
                trigger: function(t, r) {
                    return e.trigger.call(this, t, r)
                },
                setState: function(e) {
                    return t.setState.call(this, e)
                },
                attachMedia: function() {
                    this.eventsOn_()
                },
                detachMedia: function() {
                    return this.stopStallCheck(),
                    this.eventsOff_(),
                    this.video
                },
                stopStallCheck: function() {
                    clearTimeout(this.stallCheckTimeout_)
                },
                startStallCheck: function() {
                    this.stopStallCheck(),
                    this.stallCheckTimeout_ = setTimeout(this.stalledHandler.bind(this, this.video.currentTime), n)
                },
                stalledHandler: function(e) {
                    e === this.video.currentTime && (this.video.paused || this.video.ended || this.state !== r.LOADING && this.state !== r.ERROR && (this.seeking || (this.atEdgeOfLiveStream() && this.setPlaybackRate(1), this.setState(r.STALLED))))
                },
                atEdgeOfLiveStream: function() {
                    if (!this.isLive()) return ! 1;
                    var e = 2;
                    return a.endOfRange(this.video.buffered) - this.video.currentTime <= e
                },
                setAutoplayAttributes: function() {
                    this.video.setAttribute("autoplay", ""),
                    this.video.setAttribute("muted", "")
                },
                removeAutoplayAttributes: function() {
                    this.video.removeAttribute("autoplay"),
                    this.video.removeAttribute("muted")
                }
            }
        }.apply(t, i),
        !(void 0 !== a && (e.exports = a))
    },
    48 : function(e, t, r) {
        var i, a;
        i = [r(2), r(5)],
        a = function(e, t) {
            return {
                seeking: !1,
                loadedmetadata: function() {
                    var e = {
                        duration: this.getDuration(),
                        height: this.video.videoHeight,
                        width: this.video.videoWidth
                    },
                    t = this.drmUsed;
                    t && (e.drm = t),
                    this.trigger("meta", e)
                },
                timeupdate: function() {
                    this.stopStallCheck();
                    var e = this.video.videoHeight;
                    e !== this._helperLastVideoHeight && this.adaptation && this.adaptation({
                        size: {
                            width: this.video.videoWidth,
                            height: e
                        }
                    }),
                    this._helperLastVideoHeight = e,
                    this.state !== t.STALLED && this.state !== t.LOADING || this.setState(t.PLAYING),
                    this.startStallCheck();
                    var r = this.getCurrentTime(),
                    i = {
                        position: r,
                        duration: this.getDuration()
                    };
                    if (this.getPtsOffset) {
                        var a = this.getPtsOffset();
                        a >= 0 && (i.metadata = {
                            mpegts: a + r
                        })
                    } (this.state === t.PLAYING || this.seeking) && this.trigger("time", i)
                },
                click: function(e) {
                    this.trigger("click", e)
                },
                volumechange: function() {
                    var e = this.video;
                    this.trigger("volume", {
                        volume: Math.round(100 * e.volume)
                    }),
                    this.trigger("mute", {
                        mute: e.muted
                    })
                },
                seeked: function() {
                    this.seeking && (this.seeking = !1, this.trigger("seeked"))
                },
                playing: function() {
                    this.setState(t.PLAYING),
                    this.video.hasAttribute("jw-gesture-required") && this.video.removeAttribute("jw-gesture-required"),
                    this.trigger("providerFirstFrame")
                },
                pause: function() {
                    this.state !== t.COMPLETE && (this.video.ended || this.video.currentTime !== this.video.duration && this.setState(t.PAUSED))
                },
                progress: function() {
                    var t = this.getDuration();
                    if (! (t <= 0 || t === 1 / 0)) {
                        var r = this.video.buffered;
                        if (r && 0 !== r.length) {
                            var i = e.between(r.end(r.length - 1) / t, 0, 1);
                            this.trigger("bufferChange", {
                                bufferPercent: 100 * i,
                                position: this.getCurrentTime(),
                                duration: t
                            })
                        }
                    }
                },
                ratechange: function() {
                    this.trigger("ratechange", {
                        playbackRate: this.video.playbackRate
                    })
                },
                ended: function() {
                    this.stopStallCheck(),
                    this._helperLastVideoHeight = 0,
                    this.state !== t.IDLE && this.state !== t.COMPLETE && this.trigger("complete")
                },
                loadeddata: function() {
                    this.renderNatively && this.setTextTracks(this.video.textTracks),
                    this.video.setAttribute("jw-loaded", "data")
                },
                error: function() {
                    var e = this.video.error && this.video.error.code || -1,
                    t = {
                        1 : "Unknown operation aborted",
                        2 : "Unknown network error",
                        3 : "Unknown decode error",
                        4 : "Source not supported"
                    } [e] || "Unknown";
                    this.trigger("mediaError", {
                        code: e,
                        message: "Error playing file: " + t
                    })
                }
            }
        }.apply(t, i),
        !(void 0 !== a && (e.exports = a))
    },
    76 : function(e, t, r) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e: {
                "default": e
            }
        }
        function a(e, t) {
            if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        function s(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var i = t[r];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value" in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, r, i) {
                return r && e(t.prototype, r),
                i && e(t, i),
                t
            }
        } (),
        l = r(182),
        u = i(l),
        d = r(167),
        c = i(d),
        f = r(165),
        h = i(f),
        v = r(168),
        g = r(163),
        p = i(g),
        y = r(164),
        m = i(y),
        T = r(170),
        E = i(T),
        k = r(9),
        b = r(166),
        _ = r(1),
        R = r(48),
        A = r(5),
        S = r(4),
        L = r(2),
        w = r(16),
        D = window.VTTCue || window.TextTrackCue,
        O = function(e) {
            function t(e, r) {
                a(this, t);
                var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                return i.bufferFull = !1,
                i.bufferStallTimeout = 1e3,
                i.currentHlsjsLevel = null,
                i.currentJwItem = null,
                i.edgeOfLiveStream = !1,
                i.staleManifestDurationMultiplier = 3e3,
                i.staleManifestTimeout = null,
                i.eventHandler = null,
                i.gestureRequired = M(),
                i.hlsjs = null,
                i.hlsjsConfig = null,
                i.jwConfig = r,
                i.jwLevels = null,
                i.lastRecoveryTime = null,
                i.lastEndSn = null,
                i.lastPosition = 0,
                i.levelDuration = 0,
                i.live = !1,
                i.maxRetries = 3,
                i.playerId = e,
                i.preloaded = !1,
                i.preloadMetaOnly = !1,
                i.recoveryInterval = 5e3,
                i.recoveringMediaError = !1,
                i.recoveringNetworkError = !1,
                i.renderNatively = x(r.renderCaptionsNatively),
                i.retryCount = 0,
                i.stale = !1,
                i.stallTimeout = null,
                i.state = A.IDLE,
                i.streamType = "VOD",
                i.supports = t.supports,
                i.video = i.getVideo(e),
                i.withCredentials = !1,
                i.supportsPlaybackRate = !0,
                i
            }
            return s(t, e),
            o(t, [{
                key: "initHlsjs",
                value: function(e) {
                    var t = !!(void 0 !== this.jwConfig.withCredentials ? this.jwConfig.withCredentials: e.withCredentials);
                    if (!this.hlsjs || this.withCredentials !== t) {
                        this.video = this.getVideo(this.playerId, this.container),
                        this.restoreVideoProperties(),
                        this.setContainer(this.container),
                        this.withCredentials = t,
                        this.stopStallTimeout(),
                        this.stale = !1;
                        var r = !e.stereomode;
                        this.hlsjsConfig = (0, p["default"])(this.withCredentials, this.jwConfig.aestoken, this.renderNatively, r),
                        this.hlsjs = new u["default"](this.hlsjsConfig),
                        this.eventHandler = new h["default"](this.video, this.createVideoListeners(), this.hlsjs, this.createHlsjsListeners())
                    }
                }
            },
            {
                key: "init",
                value: function(e) {
                    if (this.video && this.video.textTracks.length && (this.saveVideoProperties(), this.remove()), this.initHlsjs(e), "none" !== e.preload && this.preload(e), this.video.textTracks.length) {
                        var t = this.video.textTracks[0];
                        t && t.textTrack1 && (this.video.textTracks[0].inuse = !0)
                    }
                    e.tracks && e.tracks.length && this.setupSideloadedTracks(e.tracks)
                }
            },
            {
                key: "load",
                value: function(e, t) {
                    if (this.initHlsjs(e), t || this.setState(A.LOADING), this.gestureRequired && this.triggerBufferFull(), this.preloaded) return this.preloadMetaOnly && (C("startLoad"), this.hlsjs.startLoad()),
                    void this.resetPreload();
                    C("load", e),
                    this.currentJwItem = e,
                    this.eventsOn_(),
                    this.hlsjs.attachMedia(this.video),
                    this.hlsjs.nextLevel = -1;
                    var r = e.starttime || -1;
                    r < -1 && (r = this.lastPosition),
                    this.hlsjs.config.startPosition = r,
                    this.hlsjs.loadSource(e.sources[0].file)
                }
            },
            {
                key: "preload",
                value: function(e) {
                    this.preloaded || (C("preload", e), this.preloadMetaOnly = "auto" !== e.preload, this.load(e, !0), this.preloaded = !0)
                }
            },
            {
                key: "play",
                value: function() {
                    var e = this,
                    t = this.video.play();
                    t && t["catch"] && t.then(function() {
                        e.gestureRequired = !1
                    })["catch"](function(t) {
                        P(t),
                        e.gestureRequired && t && "NotAllowedError" === t.name && e.pause()
                    })
                }
            },
            {
                key: "pause",
                value: function() {
                    this.video.pause(),
                    this.setState(A.PAUSED)
                }
            },
            {
                key: "stop",
                value: function() {
                    this.video.pause(),
                    this.clearTracks(),
                    this.hlsjs && (this.eventsOff_(), this.hlsjs.stopLoad())
                }
            },
            {
                key: "seek",
                value: function(e) {
                    var t = this.video.duration;
                    if (t === 1 / 0) return void P("Returned early from seek", "Duration", t);
                    this.stopStallTimeout();
                    var r = e >= 0 ? e: e + t;
                    this.trigger(S.JWPLAYER_MEDIA_SEEK, {
                        position: this.getCurrentTime(),
                        offset: r
                    });
                    var i = this.getDuration();
                    0 !== i && i !== 1 / 0 && (this.seeking = !0, this.video.currentTime = r, this.trigger("time", {
                        duration: i,
                        position: this.getCurrentTime()
                    }))
                }
            },
            {
                key: "getCurrentQuality",
                value: function() {
                    var e = 0;
                    return this.hlsjs && !this.hlsjs.autoLevelEnabled && (e = (0, v.toJwLevel)(this.hlsjs.manualLevel, this.jwLevels)),
                    e
                }
            },
            {
                key: "getQualityLevels",
                value: function() {
                    return _.map(this.jwLevels,
                    function(e) {
                        return (0, k.qualityLevel)(e)
                    })
                }
            },
            {
                key: "getCurrentAudioTrack",
                value: function() {
                    return _.isNumber(this.currentAudioTrackIndex) ? this.currentAudioTrackIndex: -1
                }
            },
            {
                key: "getAudioTracks",
                value: function() {
                    return this.audioTracks || []
                }
            },
            {
                key: "getCurrentTime",
                value: function() {
                    var e = this.video.currentTime;
                    return this.live && "DVR" === this.streamType && (e -= this.video.duration),
                    e
                }
            },
            {
                key: "getDuration",
                value: function() {
                    var e = this.currentJwItem.minDvrWindow,
                    t = this.levelDuration,
                    r = this.video.duration;
                    return this.live ? L.isDvr(t, e) ? (r = -t, this.streamType = "DVR") : (r = 1 / 0, this.streamType = "LIVE") : this.streamType = "VOD",
                    r
                }
            },
            {
                key: "getCurrentHlsjsLevel",
                value: function() {
                    var e = 0;
                    if (this.hlsjs) {
                        var t = this.hlsjs,
                        r = t.firstLevel,
                        i = t.currentLevel;
                        e = i > 0 ? i: r
                    }
                    return e
                }
            },
            {
                key: "getName",
                value: function() {
                    return I()
                }
            },
            {
                key: "setCurrentQuality",
                value: function(e) {
                    if (! (e < 0)) {
                        var t = this.hlsjs.levels,
                        r = (0, v.toHlsjsLevel)(e, this.jwLevels);
                        this.hlsjs.nextLevel = r,
                        this.trigger(S.JWPLAYER_MEDIA_LEVEL_CHANGED, {
                            levels: this.jwLevels,
                            currentQuality: e
                        }),
                        this.jwConfig.qualityLabel = this.jwLevels[e].label,
                        C("Setting level to ", r, t[Math.max(r, 0)], this.jwLevels[e])
                    }
                }
            },
            {
                key: "setCurrentAudioTrack",
                value: function(e) {
                    var t = this.getCurrentHlsjsLevel(),
                    r = (0, v.toJwLevel)(t, this.jwLevels);
                    if (this.jwLevels[r]) {
                        var i = this.jwLevels[r].audioGroupId;
                        _.size(this.audioTracksMap) && (this.audioTracks = this.audioTracksMap[i], _.isNumber(e) && _.size(this.audioTracks) && this.audioTracks[e] && this.currentAudioTrackIndex !== e && (this.trigger(S.JWPLAYER_AUDIO_TRACKS, {
                            tracks: this.audioTracks,
                            currentTrack: e
                        }), null !== this.currentAudioTrackIndex && this.audioTracks[e].hlsjsIndex !== this.hlsjs.audioTrack && this.trigger(S.JWPLAYER_AUDIO_TRACK_CHANGED, {
                            tracks: this.audioTracks,
                            currentTrack: e
                        }), this.currentAudioTrackIndex = e, this.hlsjs.audioTrack = this.audioTracks[e].hlsjsIndex, C("Setting audio track to", this.audioTracks[e])))
                    }
                }
            },
            {
                key: "updateAudioTrack",
                value: function(e) {
                    if (this.hlsjs.audioTracks.length) {
                        var t = this.currentAudioTrackIndex;
                        _.isNumber(t) ? this.audioTracks[t].hlsjsIndex !== this.hlsjs.audioTrack && (this.currentAudioTrackIndex = null) : t = (0, v.getDefaultJwTrackIndex)(this.audioTracksMap[e.attrs.AUDIO]),
                        this.setCurrentAudioTrack(t)
                    }
                }
            },
            {
                key: "setCurrentSubtitleTrack",
                value: function(e) {
                    this.hlsjs.subtitleTrack = e
                }
            },
            {
                key: "setPlaybackRate",
                value: function(e) {
                    this.video.playbackRate = this.video.defaultPlaybackRate = e
                }
            },
            {
                key: "getPlaybackRate",
                value: function() {
                    return this.video.playbackRate
                }
            },
            {
                key: "isLive",
                value: function() {
                    return this.live
                }
            },
            {
                key: "onAdaptation",
                value: function(e) {
                    var t = this.hlsjs,
                    r = t.levels,
                    i = t.autoLevelEnabled,
                    a = r[e],
                    n = (a ? a.width: 0) || this.video.videoWidth,
                    s = (a ? a.height: 0) || this.video.videoHeight,
                    o = a ? a.bitrate: 0,
                    l = (0, v.toJwLevel)(e, this.jwLevels);
                    this.trigger("visualQuality", {
                        reason: i ? "auto": "api",
                        mode: i ? "auto": "manual",
                        type: "visualQuality",
                        level: {
                            bitrate: o,
                            index: l,
                            height: s,
                            label: i ? "auto": this.jwLevels[l].label,
                            width: n
                        }
                    }),
                    this.triggerMediaType(n, s)
                }
            },
            {
                key: "triggerMediaType",
                value: function(e, t) {
                    var r = "video";
                    e && t || (r = "audio"),
                    C("Media Type", r),
                    this.trigger(S.JWPLAYER_MEDIA_TYPE, {
                        mediaType: r
                    })
                }
            },
            {
                key: "createVideoListeners",
                value: function() {
                    var e = this,
                    t = {};
                    return _.each(R,
                    function(r, i) {
                        "function" == typeof r && (t[i] = r.bind(e))
                    }),
                    t
                }
            },
            {
                key: "createHlsjsListeners",
                value: function() {
                    var e = this,
                    t = {};
                    return t[u["default"].Events.MEDIA_ATTACHED] = function() {
                        C("Media attached"),
                        e.recoveringMediaError && (e.hlsjs.startLoad(), e.recoveringMediaError = !1, e.resetRecovery(), e.stopStallTimeout())
                    },
                    t[u["default"].Events.MEDIA_DETACHED] = function() {
                        C("Media detached"),
                        e.renderNatively || (e.clearCueData("textTrack1"), e.clearCueData("textTrack2"))
                    },
                    t[u["default"].Events.MANIFEST_LOADED] = function(e, t) {
                        C("Manifest loaded", t)
                    },
                    t[u["default"].Events.MANIFEST_PARSED] = function(t, r) {
                        C("Manifest parsed", r);
                        var i = r.levels,
                        a = r.firstLevel,
                        n = a,
                        s = 0;
                        e.currentHlsjsLevel = null,
                        e.jwLevels = (0, v.formatLevels)(i, e.jwConfig.qualityLabels);
                        var o = _.find(e.jwLevels,
                        function(t) {
                            return t.label === e.jwConfig.qualityLabel
                        });
                        o && o.hlsjsIndex > -1 && (n = o.hlsjsIndex, s = (0, v.toJwLevel)(n, e.jwLevels), e.hlsjs.nextLevel = n),
                        e.hlsjs.startLevel = n,
                        e.preloadMetaOnly || e.hlsjs.startLoad(e.hlsjs.config.startPosition),
                        e.trigger(S.JWPLAYER_MEDIA_LEVELS, {
                            levels: e.jwLevels,
                            currentQuality: s
                        })
                    },
                    t[u["default"].Events.LEVEL_SWITCH] = function(t, r) {
                        C("Level switch requested", r, e.hlsjs.levels, "ABR:", e.hlsjs.autoLevelEnabled)
                    },
                    t[u["default"].Events.LEVEL_LOADED] = function(t, r) {
                        C("Level loaded", r);
                        var i = r.details,
                        a = i.endSN,
                        n = i.live,
                        s = i.targetduration;
                        e.checkStaleManifest(a, n, s)
                    },
                    t[u["default"].Events.LEVEL_UPDATED] = function(t, r) {
                        C("Level updated", r);
                        var i = r.details,
                        a = i.live,
                        n = i.totalduration;
                        e.live = a,
                        e.levelDuration = n
                    },
                    t[u["default"].Events.LEVEL_PTS_UPDATED] = function(t, r) {
                        C("Level PTS updated", r),
                        e.levelDuration = r.details.totalduration
                    },
                    t[u["default"].Events.LEVEL_REMOVED] = function() {
                        e.jwLevels = (0, v.formatLevels)(e.hlsjs.levels, e.jwConfig.qualityLabels),
                        e.trigger(S.JWPLAYER_MEDIA_LEVELS, {
                            levels: e.jwLevels,
                            currentQuality: 0
                        })
                    },
                    t[u["default"].Events.FRAG_CHANGED] = function(t, r) {
                        C("Frag changed", r);
                        var i = r.frag,
                        a = i.level,
                        n = i.tagList,
                        s = void 0 === n ? [] : n,
                        o = e.hlsjs.levels,
                        l = o[a];
                        a !== e.currentHlsjsLevel ? (C("Level switch complete", a, l), e.currentHlsjsLevel = a, e.onAdaptation(a), e.updateAudioTrack(o[a])) : e.video.videoHeight !== e._helperLastVideoHeight && e.onAdaptation(a);
                        var u = (0, b.findTagInList)(s, "PROGRAM-DATE-TIME");
                        u && e.trigger("meta", {
                            programDateTime: u[1]
                        })
                    },
                    t[u["default"].Events.FRAG_PARSING_METADATA] = function(t, r) {
                        C("Frag metadata parsed", r);
                        var i = e.hlsjs.levels;
                        _.each(r.samples,
                        function(t) {
                            var a = t.unit,
                            n = t.data,
                            s = t.pts,
                            o = (0, c["default"])(a || n).cues;
                            if (!o) return void P("No cues found in ID3 byte array");
                            var l = L.parseID3(o);
                            if (!l) return void P("No metadata found in the ID3 cues");
                            var u = i[r.frag.level],
                            d = u && u.details;
                            if (!d) {
                                if (l.PRIV && "com.apple.streaming.transportStreamTimestamp" in l.PRIV) return;
                                return void P("No matching level found for ID3 metadata")
                            }
                            var f = _.find(u.details.fragments,
                            function(e) {
                                return e.sn === r.frag.sn
                            });
                            if (!f) return void P("No matching fragment found for ID3 level");
                            if (!f.endPTS) return void P("No endPTS found for matching ID3 fragment");
                            var h = Math.max(s, 0),
                            v = f.endPTS;
                            if (h < v) {
                                var g = new D(h, v, JSON.stringify(l));
                                e.addVTTCue({
                                    type: "metadata",
                                    cue: g
                                })
                            }
                        })
                    },
                    t[u["default"].Events.BUFFER_APPENDING] = function(e, t) {
                        C("Buffer appending", t)
                    },
                    t[u["default"].Events.BUFFER_APPENDED] = function(t, r) {
                        var i = e.video.buffered.length;
                        C("Buffer appended", r, e.state, i, i && e.video.buffered.end(i - 1)),
                        e.stopStallTimeout(),
                        e.recoveringNetworkError && (e.resetRecovery(), e.recoveringNetworkError = !1)
                    },
                    t[u["default"].Events.FRAG_BUFFERED] = function(t, r) {
                        C("Frag buffered", r),
                        e.triggerBufferFull()
                    },
                    t[u["default"].Events.KEY_LOADING] = function(t, r) {
                        C("Key loading", r),
                        e.supports("drm") || e.shutdown("AES decryption not supported with this license")
                    },
                    t[u["default"].Events.SUBTITLE_TRACKS_UPDATED] = function(e, t) {
                        C("Subtitle tracks updated", t)
                    },
                    this.renderNatively || (t[u["default"].Events.NON_NATIVE_TEXT_TRACKS_FOUND] = function(t, r) {
                        C("Externally managed text track found", r),
                        e.addTextTracks(r.tracks)
                    },
                    t[u["default"].Events.CUES_PARSED] = function(t, r) {
                        C("Externally managed VTTCues found", r),
                        r.cues.forEach(function(t) {
                            e.addVTTCue({
                                type: r.type,
                                cue: t,
                                track: r.track
                            })
                        })
                    }),
                    t[u["default"].Events.AUDIO_TRACKS_UPDATED] = function(t, r) {
                        C("Audio tracks updated");
                        var i = r.audioTracks,
                        a = e.hlsjs.levels,
                        n = e.getCurrentHlsjsLevel();
                        i && i.length && (e.currentAudioTrackIndex = null, e.audioTracksMap = (0, v.formatAudioTracks)(i), e.updateAudioTrack(a[n]))
                    },
                    t[u["default"].Events.ERROR] = function(t, r) {
                        var i = (0, m["default"])(r),
                        a = r.fatal,
                        n = r.type,
                        s = i.stalling,
                        o = i.recoverable,
                        l = i.message,
                        u = i.doCodecSwap;
                        if (P(i), s && (e.seeking ? e.setState(A.LOADING) : e.stallTimeout || e.startStallTimeout()), a) {
                            var d = Date.now();
                            o && e.retryCount < e.maxRetries ? d >= e.lastRecoveryTime + e.recoveryInterval ? (P("Attempting to recover, retry count:", e.retryCount), "networkError" === n ? (e.recoveringNetworkError = !0, e.hlsjs.startLoad()) : "mediaError" === n && (e.recoveringMediaError = !0, u && e.hlsjs.swapAudioCodec(), e.hlsjs.recoverMediaError()), e.retryCount += 1, e.lastRecoveryTime = d) : P("Recovery not attempted - too little time between attempts", d - e.lastRecoveryTime) : e.shutdown(l, r)
                        }
                    },
                    t
                }
            },
            {
                key: "eventsOn_",
                value: function() {
                    C("eventsOn_"),
                    this.eventHandler.on()
                }
            },
            {
                key: "eventsOff_",
                value: function() {
                    C("eventsOff_"),
                    this.disableTextTrack(),
                    this.lastPosition = this.video.currentTime,
                    this.hlsjs.detachMedia(),
                    this.eventHandler.off(),
                    this.resetLifecycleVariables()
                }
            },
            {
                key: "shutdown",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "Fatal Error",
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    console.error("Hlsjs shutdown", e, t),
                    this.destroy(),
                    this.trigger(S.JWPLAYER_MEDIA_ERROR, {
                        message: e
                    })
                }
            },
            {
                key: "destroy",
                value: function() {
                    this.hlsjs && (this.eventsOff_(), this.hlsjs.destroy(), this.hlsjs = null, C("Hlsjs destroyed"))
                }
            },
            {
                key: "startStallTimeout",
                value: function() {
                    var e = this;
                    this.stallTimeout || (this.stallTimeout = setTimeout(function() {
                        var t = e.atEdgeOfLiveStream(),
                        r = e.video.ended || t;
                        r ? (e.edgeOfLiveStream = !0, e.checkStreamEnded()) : (e.setState(A.STALLED), t && e.setPlaybackRate(1))
                    },
                    this.bufferStallTimeout))
                }
            },
            {
                key: "stopStallTimeout",
                value: function() {
                    clearTimeout(this.stallTimeout),
                    clearTimeout(this.staleManifestTimeout),
                    this.stallTimeout = null,
                    this.staleManifestTimeout = null,
                    this.edgeOfLiveStream = !1
                }
            },
            {
                key: "saveVideoProperties",
                value: function() {
                    this.jwConfig.volume = 100 * this.video.volume,
                    this.jwConfig.mute = this.video.muted
                }
            },
            {
                key: "restoreVideoProperties",
                value: function() {
                    this.volume(this.jwConfig.volume),
                    this.mute(this.jwConfig.mute)
                }
            },
            {
                key: "resetRecovery",
                value: function() {
                    this.retryCount = 0
                }
            },
            {
                key: "checkStaleManifest",
                value: function(e, t, r) {
                    var i = this;
                    t && this.lastEndSn === e ? this.staleManifestTimeout || (this.staleManifestTimeout = setTimeout(function() {
                        i.stale = !0,
                        i.checkStreamEnded()
                    },
                    this.staleManifestDurationMultiplier * r)) : (clearTimeout(this.staleManifestTimeout), this.staleManifestTimeout = null, this.stale = !1),
                    this.lastEndSn = e,
                    this.live = t
                }
            },
            {
                key: "checkStreamEnded",
                value: function() {
                    this.stale && this.edgeOfLiveStream && this.shutdown("The live stream is either down or has ended")
                }
            },
            {
                key: "resetPreload",
                value: function() {
                    this.preloaded = !1,
                    this.preloadMetaOnly = !1
                }
            },
            {
                key: "resetLifecycleVariables",
                value: function() {
                    this.resetPreload(),
                    this.resetRecovery(),
                    this.stopStallTimeout(),
                    this.setState(A.IDLE),
                    this.bufferFull = !1,
                    this.currentHlsjsLevel = null,
                    this.currentJwItem = null,
                    this.gestureRequired = M(),
                    this.jwLevels = null,
                    this.lastRecoveryTime = null,
                    this.lastEndSn = null,
                    this.levelDuration = 0,
                    this.live = !1,
                    this.recoveringMediaError = !1,
                    this.recoveringNetworkError = !1,
                    this.stale = !1,
                    this.staleManifestTimeout = null,
                    this.streamType = "VOD"
                }
            },
            {
                key: "triggerBufferFull",
                value: function() {
                    this.bufferFull || (this.bufferFull = !0, this.trigger(S.JWPLAYER_MEDIA_BUFFER_FULL))
                }
            }], [{
                key: "getName",
                value: function() {
                    return I()
                }
            },
            {
                key: "setEdition",
                value: function(e) {
                    t.supports = w(e)
                }
            }]),
            t
        } (E["default"]);
        t["default"] = O;
        var I = function() {
            return {
                name: "hlsjs"
            }
        },
        C = function() {
            if (window.jwplayer.debug) {
                var e; (e = console).info.apply(e, arguments)
            }
        },
        P = function() {
            if (window.jwplayer.debug) {
                var e; (e = console).warn.apply(e, arguments)
            }
        },
        x = function(e) {
            return ! (!L.isIOS() && !L.isSafari()) || L.isChrome() && e
        },
        M = function() {
            return L.isAndroid()
        };
        delete R.error
    },
    163 : function(e, t, r) {
        "use strict";
        function i(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t["default"] = e,
            t
        }
        function a(e, t, r, i) {
            var a = {
                liveSyncDuration: 25,
                autoStartLoad: !1,
                maxBufferSize: 2e7,
                maxMaxBufferLength: 90,
                capLevelToPlayerSize: i,
                renderNatively: r,
                debug: o
            };
            return (e || t) && (a = l.extend({},
            a, n(e, t))),
            a
        }
        function n(e, t) {
            return {
                xhrSetup: function(r, i) {
                    if (e && (r.withCredentials = !0), t) {
                        var a = i.indexOf("?") > 0 ? "&token=": "?token=";
                        r.open("GET", i + a + t, !0)
                    }
                },
                fetchSetup: function(e, t) {
                    return t.credentials = "include",
                    new Request(e.url, t)
                }
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t["default"] = a;
        var s = r(169),
        o = i(s),
        l = r(1)
    },
    164 : function(e, t, r) {
        "use strict";
        function i(e) {
            var t = e.details,
            r = n.indexOf(s, t) < 0,
            i = n.indexOf(o, t) >= 0,
            a = n.indexOf(l, t) >= 0,
            c = u(e);
            switch (e.type) {
            case "networkError":
                c = "Cannot load M3U8: " + c;
                break;
            case "mediaError":
                c = "Media Error: " + c;
                break;
            case "otherError":
                c = "Error: " + c + ";"
            }
            return d(c, r, i, a, e)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t["default"] = i;
        var a = r(30),
        n = r(1),
        s = ["manifestLoadError", "manifestParsingError", "manifestIncompatibleCodecsError", "levelLoadError"],
        o = ["bufferStalledError", "bufferSeekOverHole"],
        l = ["fragLoopLoadingError"],
        u = function(e) {
            var t = "";
            return e && (t = e.response ? (0, a.NetworkError)(e.response.code, e.url, e.response.text).message: e.reason ? "" + e.reason: "" + e.details),
            t
        },
        d = function(e, t, r, i, a) {
            return {
                message: e,
                recoverable: t,
                stalling: r,
                doCodecSwap: i,
                hlsjsErrorParams: a
            }
        }
    },
    165 : function(e, t, r) {
        "use strict";
        function i(e, t) {
            if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var i = t[r];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value" in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, r, i) {
                return r && e(t.prototype, r),
                i && e(t, i),
                t
            }
        } (),
        n = r(1),
        s = function() {
            function e(t, r, a, n) {
                i(this, e),
                this.video = t,
                this.hlsjs = a,
                this.videoListeners = r,
                this.hlsjsListeners = n
            }
            return a(e, [{
                key: "on",
                value: function() {
                    var e = this;
                    this.off(),
                    n.each(this.videoListeners,
                    function(t, r) {
                        e.video.addEventListener(r, t, !1)
                    }),
                    n.each(this.hlsjsListeners,
                    function(t, r) {
                        e.hlsjs.on(r, t)
                    })
                }
            },
            {
                key: "off",
                value: function() {
                    var e = this;
                    n.each(this.videoListeners,
                    function(t, r) {
                        e.video.removeEventListener(r, t)
                    }),
                    n.each(this.hlsjsListeners,
                    function(t, r) {
                        e.hlsjs.off(r, t)
                    })
                }
            }]),
            e
        } ();
        t["default"] = s
    },
    166 : function(e, t) {
        "use strict";
        function r(e, t) {
            if (e) {
                for (var r = null,
                i = e.length - 1; i >= 0; i--) {
                    var a = e[i];
                    if (a[0] === t) {
                        r = a;
                        break
                    }
                }
                return r
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.findTagInList = r
    },
    167 : function(e, t, r) {
        "use strict";
        function i(e) {
            for (var t = 0,
            r = 0,
            i = 10,
            o = []; t + s < e.length;) {
                var l = n.utf8ArrayToStr(e.subarray(t, t += 3));
                if ("ID3" === l) {
                    var u = e.subarray(t, t += 2),
                    d = e.subarray(t, t += 1)[0];
                    if (0 !== (128 & d) || u[0] < 3) break;
                    var c = n.syncSafeInt(e.subarray(t, t += 4));
                    0 !== (64 & d) && (i += n.syncSafeInt(e.subarray(t, t += 4))),
                    o = o.concat(a(e, r + i, c)),
                    t += c
                } else {
                    if ("3DI" !== l) {
                        t -= 3;
                        break
                    }
                    t += 7
                }
                r = t
            }
            return {
                position: t,
                cues: o
            }
        }
        function a(e, t, r) {
            for (var i = e.length,
            a = t,
            s = []; a < t + r;) {
                if (i - a < 8) return s;
                var o = a;
                a += 4;
                var l = n.syncSafeInt(e.subarray(a, a += 4));
                if (i - a < l + 2) return s;
                var u = e.subarray(a, a += 1)[0];
                if (u > 0) return s;
                var d = e[a];
                3 !== d && 0 !== d || (l -= 1, a += 1);
                var c = e.buffer.slice(o - 10, a + l + 1);
                s.push({
                    data: c
                }),
                a += l + 1
            }
            return s
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t["default"] = i;
        var n = r(11),
        s = 9
    },
    168 : function(e, t, r) {
        "use strict";
        function i(e, t) {
            var r = u.hasRedundantLevels(e),
            i = l.map(e,
            function(e, i) {
                return {
                    label: u.generateLabel(e, t, r),
                    level_id: e.id,
                    hlsjsIndex: i,
                    bitrate: e.bitrate,
                    height: e.height,
                    width: e.width,
                    audioGroupId: e.attrs ? e.attrs.AUDIO: void 0
                }
            });
            return i = d(i),
            i.length > 1 && i.unshift({
                label: "Auto",
                level_id: "auto",
                hlsjsIndex: -1
            }),
            i
        }
        function a(e, t) {
            return Math.max(0, l.indexOf(t, l.find(t,
            function(t) {
                return t.hlsjsIndex === e
            })))
        }
        function n(e, t) {
            var r = -1;
            return e > -1 && t[e] && (r = t[e].hlsjsIndex),
            r
        }
        function s(e) {
            var t = l.reduce(e,
            function(e, t, r) {
                var i = t.groupId;
                return e[i] = e[i] || [],
                e[i].push({
                    autoselect: t.autoselect,
                    defaulttrack: t["default"],
                    groupid: i,
                    language: t.lang,
                    name: t.name,
                    hlsjsIndex: r
                }),
                e
            },
            {});
            return t
        }
        function o() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            return Math.max(l.indexOf(e, l.find(e,
            function(e) {
                return e.defaulttrack
            })), 0)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.formatLevels = i,
        t.toJwLevel = a,
        t.toHlsjsLevel = n,
        t.formatAudioTracks = s,
        t.getDefaultJwTrackIndex = o;
        var l = r(1),
        u = r(67),
        d = function(e) {
            return e.sort(function(e, t) {
                var r = void 0;
                return r = e.height && t.height ? e.height === t.height ? t.bitrate - e.bitrate: t.height - e.height: t.bitrate - e.bitrate
            })
        }
    },
    169 : function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function(e, t, r) {
            window.jwplayer.debug && e.call(console, "[Hls.js " + t + "] -> " + r)
        };
        t.debug = function(e) {
            r(console.debug, "debug", e)
        },
        t.log = function(e) {
            r(console.log, "log", e)
        },
        t.info = function(e) {
            r(console.info, "info", e)
        },
        t.warn = function(e) {
            r(console.warn, "warn", e)
        },
        t.error = function(e) {
            r(console.error, "error", e)
        }
    },
    170 : function(e, t, r) {
        "use strict";
        function i(e, t) {
            if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = r(1),
        n = r(46),
        s = r(47),
        o = r(8),
        l = r(3),
        u = function d() {
            i(this, d)
        };
        t["default"] = u,
        u.prototype = a.extend({},
        l, n, s, o)
    },
    182 : function(e, t) { !
        function(r) {
            if ("object" == typeof t && "undefined" != typeof e) e.exports = r();
            else if ("function" == typeof define && define.amd) define([], r);
            else {
                var i;
                i = "undefined" != typeof window ? window: "undefined" != typeof global ? global: "undefined" != typeof self ? self: this,
                i.Hls = r()
            }
        } (function() {
            var e;
            return function t(e, r, i) {
                function a(s, o) {
                    if (!r[s]) {
                        if (!e[s]) {
                            var l = "function" == typeof require && require;
                            if (!o && l) return l(s, !0);
                            if (n) return n(s, !0);
                            var u = new Error("Cannot find module '" + s + "'");
                            throw u.code = "MODULE_NOT_FOUND",
                            u
                        }
                        var d = r[s] = {
                            exports: {}
                        };
                        e[s][0].call(d.exports,
                        function(t) {
                            var r = e[s][1][t];
                            return a(r ? r: t)
                        },
                        d, d.exports, t, e, r, i)
                    }
                    return r[s].exports
                }
                for (var n = "function" == typeof require && require,
                s = 0; s < i.length; s++) a(i[s]);
                return a
            } ({
                1 : [function(e, t, r) {
                    function i() {
                        this._events = this._events || {},
                        this._maxListeners = this._maxListeners || void 0
                    }
                    function a(e) {
                        return "function" == typeof e
                    }
                    function n(e) {
                        return "number" == typeof e
                    }
                    function s(e) {
                        return "object" == typeof e && null !== e
                    }
                    function o(e) {
                        return void 0 === e
                    }
                    t.exports = i,
                    i.EventEmitter = i,
                    i.prototype._events = void 0,
                    i.prototype._maxListeners = void 0,
                    i.defaultMaxListeners = 10,
                    i.prototype.setMaxListeners = function(e) {
                        if (!n(e) || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
                        return this._maxListeners = e,
                        this
                    },
                    i.prototype.emit = function(e) {
                        var t, r, i, n, l, u;
                        if (this._events || (this._events = {}), "error" === e && (!this._events.error || s(this._events.error) && !this._events.error.length)) {
                            if (t = arguments[1], t instanceof Error) throw t;
                            var d = new Error('Uncaught, unspecified "error" event. (' + t + ")");
                            throw d.context = t,
                            d
                        }
                        if (r = this._events[e], o(r)) return ! 1;
                        if (a(r)) switch (arguments.length) {
                        case 1:
                            r.call(this);
                            break;
                        case 2:
                            r.call(this, arguments[1]);
                            break;
                        case 3:
                            r.call(this, arguments[1], arguments[2]);
                            break;
                        default:
                            n = Array.prototype.slice.call(arguments, 1),
                            r.apply(this, n)
                        } else if (s(r)) for (n = Array.prototype.slice.call(arguments, 1), u = r.slice(), i = u.length, l = 0; l < i; l++) u[l].apply(this, n);
                        return ! 0
                    },
                    i.prototype.addListener = function(e, t) {
                        var r;
                        if (!a(t)) throw TypeError("listener must be a function");
                        return this._events || (this._events = {}),
                        this._events.newListener && this.emit("newListener", e, a(t.listener) ? t.listener: t),
                        this._events[e] ? s(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t,
                        s(this._events[e]) && !this._events[e].warned && (r = o(this._maxListeners) ? i.defaultMaxListeners: this._maxListeners, r && r > 0 && this._events[e].length > r && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace())),
                        this
                    },
                    i.prototype.on = i.prototype.addListener,
                    i.prototype.once = function(e, t) {
                        function r() {
                            this.removeListener(e, r),
                            i || (i = !0, t.apply(this, arguments))
                        }
                        if (!a(t)) throw TypeError("listener must be a function");
                        var i = !1;
                        return r.listener = t,
                        this.on(e, r),
                        this
                    },
                    i.prototype.removeListener = function(e, t) {
                        var r, i, n, o;
                        if (!a(t)) throw TypeError("listener must be a function");
                        if (!this._events || !this._events[e]) return this;
                        if (r = this._events[e], n = r.length, i = -1, r === t || a(r.listener) && r.listener === t) delete this._events[e],
                        this._events.removeListener && this.emit("removeListener", e, t);
                        else if (s(r)) {
                            for (o = n; o-->0;) if (r[o] === t || r[o].listener && r[o].listener === t) {
                                i = o;
                                break
                            }
                            if (i < 0) return this;
                            1 === r.length ? (r.length = 0, delete this._events[e]) : r.splice(i, 1),
                            this._events.removeListener && this.emit("removeListener", e, t)
                        }
                        return this
                    },
                    i.prototype.removeAllListeners = function(e) {
                        var t, r;
                        if (!this._events) return this;
                        if (!this._events.removeListener) return 0 === arguments.length ? this._events = {}: this._events[e] && delete this._events[e],
                        this;
                        if (0 === arguments.length) {
                            for (t in this._events)"removeListener" !== t && this.removeAllListeners(t);
                            return this.removeAllListeners("removeListener"),
                            this._events = {},
                            this
                        }
                        if (r = this._events[e], a(r)) this.removeListener(e, r);
                        else if (r) for (; r.length;) this.removeListener(e, r[r.length - 1]);
                        return delete this._events[e],
                        this
                    },
                    i.prototype.listeners = function(e) {
                        var t;
                        return t = this._events && this._events[e] ? a(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
                    },
                    i.prototype.listenerCount = function(e) {
                        if (this._events) {
                            var t = this._events[e];
                            if (a(t)) return 1;
                            if (t) return t.length
                        }
                        return 0
                    },
                    i.listenerCount = function(e, t) {
                        return e.listenerCount(t)
                    }
                },
                {}],
                2 : [function(t, r, i) { !
                    function(t) {
                        var a = /^((?:[^\/;?#]+:)?)(\/\/[^\/\;?#]*)?(.*?)??(;.*?)?(\?.*?)?(#.*?)?$/,
                        n = /^([^\/;?#]*)(.*)$/,
                        s = /(?:\/|^)\.(?=\/)/g,
                        o = /(?:\/|^)\.\.\/(?!\.\.\/).*?(?=\/)/g,
                        l = {
                            buildAbsoluteURL: function(e, t, r) {
                                if (r = r || {},
                                e = e.trim(), t = t.trim(), !t) {
                                    if (!r.alwaysNormalize) return e;
                                    var i = this.parseURL(e);
                                    if (!s) throw new Error("Error trying to parse base URL.");
                                    return i.path = l.normalizePath(i.path),
                                    l.buildURLFromParts(i)
                                }
                                var a = this.parseURL(t);
                                if (!a) throw new Error("Error trying to parse relative URL.");
                                if (a.scheme) return r.alwaysNormalize ? (a.path = l.normalizePath(a.path), l.buildURLFromParts(a)) : t;
                                var s = this.parseURL(e);
                                if (!s) throw new Error("Error trying to parse base URL.");
                                if (!s.netLoc && s.path && "/" !== s.path[0]) {
                                    var o = n.exec(s.path);
                                    s.netLoc = o[1],
                                    s.path = o[2]
                                }
                                s.netLoc && !s.path && (s.path = "/");
                                var u = {
                                    scheme: s.scheme,
                                    netLoc: a.netLoc,
                                    path: null,
                                    params: a.params,
                                    query: a.query,
                                    fragment: a.fragment
                                };
                                if (!a.netLoc && (u.netLoc = s.netLoc, "/" !== a.path[0])) if (a.path) {
                                    var d = s.path,
                                    c = d.substring(0, d.lastIndexOf("/") + 1) + a.path;
                                    u.path = l.normalizePath(c)
                                } else u.path = s.path,
                                a.params || (u.params = s.params, a.query || (u.query = s.query));
                                return null === u.path && (u.path = r.alwaysNormalize ? l.normalizePath(a.path) : a.path),
                                l.buildURLFromParts(u)
                            },
                            parseURL: function(e) {
                                var t = a.exec(e);
                                return t ? {
                                    scheme: t[1] || "",
                                    netLoc: t[2] || "",
                                    path: t[3] || "",
                                    params: t[4] || "",
                                    query: t[5] || "",
                                    fragment: t[6] || ""
                                }: null
                            },
                            normalizePath: function(e) {
                                for (e = e.split("").reverse().join("").replace(s, ""); e.length !== (e = e.replace(o, "")).length;);
                                return e.split("").reverse().join("")
                            },
                            buildURLFromParts: function(e) {
                                return e.scheme + e.netLoc + e.path + e.params + e.query + e.fragment
                            }
                        };
                        "object" == typeof i && "object" == typeof r ? r.exports = l: "function" == typeof e && e.amd ? e([],
                        function() {
                            return l
                        }) : "object" == typeof i ? i.URLToolkit = l: t.URLToolkit = l
                    } (this)
                },
                {}],
                3 : [function(e, t, r) {
                    var i = arguments[3],
                    a = arguments[4],
                    n = arguments[5],
                    s = JSON.stringify;
                    t.exports = function(e, t) {
                        function r(e) {
                            p[e] = !0;
                            for (var t in a[e][1]) {
                                var i = a[e][1][t];
                                p[i] || r(i)
                            }
                        }
                        for (var o, l = Object.keys(n), u = 0, d = l.length; u < d; u++) {
                            var c = l[u],
                            f = n[c].exports;
                            if (f === e || f && f["default"] === e) {
                                o = c;
                                break
                            }
                        }
                        if (!o) {
                            o = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
                            for (var h = {},
                            u = 0,
                            d = l.length; u < d; u++) {
                                var c = l[u];
                                h[c] = c
                            }
                            a[o] = [Function(["require", "module", "exports"], "(" + e + ")(self)"), h]
                        }
                        var v = Math.floor(Math.pow(16, 8) * Math.random()).toString(16),
                        g = {};
                        g[o] = o,
                        a[v] = [Function(["require"], "var f = require(" + s(o) + ");(f.default ? f.default : f)(self);"), g];
                        var p = {};
                        r(v);
                        var y = "(" + i + ")({" + Object.keys(p).map(function(e) {
                            return s(e) + ":[" + a[e][0] + "," + s(a[e][1]) + "]"
                        }).join(",") + "},{},[" + s(v) + "])",
                        m = window.URL || window.webkitURL || window.mozURL || window.msURL,
                        T = new Blob([y], {
                            type: "text/javascript"
                        });
                        if (t && t.bare) return T;
                        var E = m.createObjectURL(T),
                        k = new Worker(E);
                        return k.objectURL = E,
                        k
                    }
                },
                {}],
                4 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    }),
                    r.hlsDefaultConfig = void 0;
                    var a = e(5),
                    n = i(a),
                    s = e(8),
                    o = i(s),
                    l = e(9),
                    u = i(l),
                    d = e(10),
                    c = i(d),
                    f = e(56),
                    h = i(f),
                    v = e(7),
                    g = i(v),
                    p = e(6),
                    y = i(p),
                    m = e(47),
                    T = i(m),
                    E = e(15),
                    k = i(E),
                    b = e(14),
                    _ = i(b),
                    R = e(13),
                    A = i(R);
                    r.hlsDefaultConfig = {
                        autoStartLoad: !0,
                        startPosition: -1,
                        defaultAudioCodec: void 0,
                        debug: !1,
                        capLevelOnFPSDrop: !1,
                        capLevelToPlayerSize: !1,
                        initialLiveManifestSize: 1,
                        maxBufferLength: 30,
                        maxBufferSize: 6e7,
                        maxBufferHole: .5,
                        maxSeekHole: 2,
                        lowBufferWatchdogPeriod: .5,
                        highBufferWatchdogPeriod: 3,
                        nudgeOffset: .1,
                        nudgeMaxRetry: 3,
                        maxFragLookUpTolerance: .2,
                        liveSyncDurationCount: 3,
                        liveMaxLatencyDurationCount: 1 / 0,
                        liveSyncDuration: void 0,
                        liveMaxLatencyDuration: void 0,
                        maxMaxBufferLength: 600,
                        enableWorker: !0,
                        enableSoftwareAES: !0,
                        manifestLoadingTimeOut: 1e4,
                        manifestLoadingMaxRetry: 1,
                        manifestLoadingRetryDelay: 1e3,
                        manifestLoadingMaxRetryTimeout: 64e3,
                        startLevel: void 0,
                        levelLoadingTimeOut: 1e4,
                        levelLoadingMaxRetry: 4,
                        levelLoadingRetryDelay: 1e3,
                        levelLoadingMaxRetryTimeout: 64e3,
                        fragLoadingTimeOut: 2e4,
                        fragLoadingMaxRetry: 6,
                        fragLoadingRetryDelay: 1e3,
                        fragLoadingMaxRetryTimeout: 64e3,
                        fragLoadingLoopThreshold: 3,
                        startFragPrefetch: !1,
                        fpsDroppedMonitoringPeriod: 5e3,
                        fpsDroppedMonitoringThreshold: .2,
                        appendErrorMaxRetry: 3,
                        loader: h["default"],
                        fLoader: void 0,
                        pLoader: void 0,
                        xhrSetup: void 0,
                        fetchSetup: void 0,
                        abrController: n["default"],
                        bufferController: o["default"],
                        capLevelController: u["default"],
                        fpsController: c["default"],
                        audioStreamController: y["default"],
                        audioTrackController: g["default"],
                        subtitleStreamController: A["default"],
                        subtitleTrackController: _["default"],
                        timelineController: k["default"],
                        cueHandler: T["default"],
                        enableCEA708Captions: !0,
                        enableWebVTT: !0,
                        captionsTextTrack1Label: "English",
                        captionsTextTrack1LanguageCode: "en",
                        captionsTextTrack2Label: "Spanish",
                        captionsTextTrack2LanguageCode: "es",
                        stretchShortVideoTrack: !1,
                        forceKeyFrameOnDiscontinuity: !0,
                        abrEwmaFastLive: 3,
                        abrEwmaSlowLive: 9,
                        abrEwmaFastVoD: 3,
                        abrEwmaSlowVoD: 9,
                        abrEwmaDefaultEstimate: 5e5,
                        abrBandWidthFactor: .95,
                        abrBandWidthUpFactor: .7,
                        abrMaxWithRealBitrate: !1,
                        maxStarvationDelay: 4,
                        maxLoadingDelay: 4,
                        minAutoBitrate: 0
                    }
                },
                {
                    10 : 10,
                    13 : 13,
                    14 : 14,
                    15 : 15,
                    47 : 47,
                    5 : 5,
                    56 : 56,
                    6 : 6,
                    7 : 7,
                    8 : 8,
                    9 : 9
                }],
                5 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    function n(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return ! t || "object" != typeof t && "function" != typeof t ? e: t
                    }
                    function s(e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var o = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    l = e(32),
                    u = i(l),
                    d = e(31),
                    c = i(d),
                    f = e(34),
                    h = i(f),
                    v = e(30),
                    g = e(51),
                    p = e(49),
                    y = i(p),
                    m = function(e) {
                        function t(e) {
                            a(this, t);
                            var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u["default"].FRAG_LOADING, u["default"].FRAG_LOADED, u["default"].FRAG_BUFFERED, u["default"].ERROR));
                            return r.lastLoadedFragLevel = 0,
                            r._nextAutoLevel = -1,
                            r.hls = e,
                            r.onCheck = r._abandonRulesCheck.bind(r),
                            r
                        }
                        return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function() {
                                this.clearTimer(),
                                c["default"].prototype.destroy.call(this)
                            }
                        },
                        {
                            key: "onFragLoading",
                            value: function(e) {
                                var t = e.frag;
                                if ("main" === t.type) {
                                    if (this.timer || (this.timer = setInterval(this.onCheck, 100)), !this._bwEstimator) {
                                        var r = this.hls,
                                        i = e.frag.level,
                                        a = r.levels[i].details.live,
                                        n = r.config,
                                        s = void 0,
                                        o = void 0;
                                        a ? (s = n.abrEwmaFastLive, o = n.abrEwmaSlowLive) : (s = n.abrEwmaFastVoD, o = n.abrEwmaSlowVoD),
                                        this._bwEstimator = new y["default"](r, o, s, n.abrEwmaDefaultEstimate)
                                    }
                                    this.fragCurrent = t
                                }
                            }
                        },
                        {
                            key: "_abandonRulesCheck",
                            value: function() {
                                var e = this.hls,
                                t = e.media,
                                r = this.fragCurrent,
                                i = r.loader,
                                a = e.minAutoLevel;
                                if (!i || i.stats && i.stats.aborted) return g.logger.warn("frag loader destroy or aborted, disarm abandonRules"),
                                void this.clearTimer();
                                var n = i.stats;
                                if (t && (!t.paused && 0 !== t.playbackRate || !t.readyState) && r.autoLevel && r.level) {
                                    var s = performance.now() - n.trequest,
                                    o = Math.abs(t.playbackRate);
                                    if (s > 500 * r.duration / o) {
                                        var l = e.levels,
                                        d = Math.max(1, n.bw ? n.bw / 8 : 1e3 * n.loaded / s),
                                        c = l[r.level],
                                        f = c.realBitrate ? Math.max(c.realBitrate, c.bitrate) : c.bitrate,
                                        v = n.total ? n.total: Math.max(n.loaded, Math.round(r.duration * f / 8)),
                                        p = t.currentTime,
                                        y = (v - n.loaded) / d,
                                        m = (h["default"].bufferInfo(t, p, e.config.maxBufferHole).end - p) / o;
                                        if (m < 2 * r.duration / o && y > m) {
                                            var T = void 0,
                                            E = void 0;
                                            for (E = r.level - 1; E > a; E--) {
                                                var k = l[E].realBitrate ? Math.max(l[E].realBitrate, l[E].bitrate) : l[E].bitrate;
                                                if (T = r.duration * k / (6.4 * d), T < m) break
                                            }
                                            T < y && (g.logger.warn("loading too slow, abort fragment loading and switch to level " + E + ":fragLoadedDelay[" + E + "]<fragLoadedDelay[" + (r.level - 1) + "];bufferStarvationDelay:" + T.toFixed(1) + "<" + y.toFixed(1) + ":" + m.toFixed(1)), e.nextLoadLevel = E, this._bwEstimator.sample(s, n.loaded), i.abort(), this.clearTimer(), e.trigger(u["default"].FRAG_LOAD_EMERGENCY_ABORTED, {
                                                frag: r,
                                                stats: n
                                            }))
                                        }
                                    }
                                }
                            }
                        },
                        {
                            key: "onFragLoaded",
                            value: function(e) {
                                var t = e.frag;
                                if ("main" === t.type && !isNaN(t.sn)) {
                                    if (this.clearTimer(), this.lastLoadedFragLevel = t.level, this._nextAutoLevel = -1, this.hls.config.abrMaxWithRealBitrate) {
                                        var r = this.hls.levels[t.level],
                                        i = (r.loaded ? r.loaded.bytes: 0) + e.stats.loaded,
                                        a = (r.loaded ? r.loaded.duration: 0) + e.frag.duration;
                                        r.loaded = {
                                            bytes: i,
                                            duration: a
                                        },
                                        r.realBitrate = Math.round(8 * i / a)
                                    }
                                    if (e.frag.bitrateTest) {
                                        var n = e.stats;
                                        n.tparsed = n.tbuffered = n.tload,
                                        this.onFragBuffered(e)
                                    }
                                }
                            }
                        },
                        {
                            key: "onFragBuffered",
                            value: function(e) {
                                var t = e.stats,
                                r = e.frag;
                                if (! (t.aborted === !0 || 1 !== r.loadCounter || "main" !== r.type || isNaN(r.sn) || r.bitrateTest && t.tload !== t.tbuffered)) {
                                    var i = t.tparsed - t.trequest;
                                    g.logger.log("latency/loading/parsing/append/kbps:" + Math.round(t.tfirst - t.trequest) + "/" + Math.round(t.tload - t.tfirst) + "/" + Math.round(t.tparsed - t.tload) + "/" + Math.round(t.tbuffered - t.tparsed) + "/" + Math.round(8 * t.loaded / (t.tbuffered - t.trequest))),
                                    this._bwEstimator.sample(i, t.loaded),
                                    r.bitrateTest ? this.bitrateTestDelay = i / 1e3: this.bitrateTestDelay = 0
                                }
                            }
                        },
                        {
                            key: "onError",
                            value: function(e) {
                                switch (e.details) {
                                case v.ErrorDetails.FRAG_LOAD_ERROR:
                                case v.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                    this.clearTimer()
                                }
                            }
                        },
                        {
                            key: "clearTimer",
                            value: function() {
                                this.timer && (clearInterval(this.timer), this.timer = null)
                            }
                        },
                        {
                            key: "_findBestLevel",
                            value: function(e, t, r, i, a, n, s, o, l) {
                                for (var u = a; u >= i; u--) {
                                    var d = l[u],
                                    c = d.details,
                                    f = c ? c.totalduration / c.fragments.length: t,
                                    h = !!c && c.live,
                                    v = void 0;
                                    v = u <= e ? s * r: o * r;
                                    var p = l[u].realBitrate ? Math.max(l[u].realBitrate, l[u].bitrate) : l[u].bitrate,
                                    y = p * f / v;
                                    if (g.logger.trace("level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: " + u + "/" + Math.round(v) + "/" + p + "/" + f + "/" + n + "/" + y), v > p && (!y || h || y < n)) return u
                                }
                                return - 1
                            }
                        },
                        {
                            key: "nextAutoLevel",
                            get: function() {
                                var e = this._nextAutoLevel,
                                t = this._bwEstimator;
                                if (! (e === -1 || t && t.canEstimate())) return e;
                                var r = this._nextABRAutoLevel;
                                return e !== -1 && (r = Math.min(e, r)),
                                r
                            },
                            set: function(e) {
                                this._nextAutoLevel = e
                            }
                        },
                        {
                            key: "_nextABRAutoLevel",
                            get: function() {
                                var e = this.hls,
                                t = e.maxAutoLevel,
                                r = e.levels,
                                i = e.config,
                                a = e.minAutoLevel,
                                n = e.media,
                                s = this.lastLoadedFragLevel,
                                o = this.fragCurrent ? this.fragCurrent.duration: 0,
                                l = n ? n.currentTime: 0,
                                u = n && 0 !== n.playbackRate ? Math.abs(n.playbackRate) : 1,
                                d = this._bwEstimator ? this._bwEstimator.getEstimate() : i.abrEwmaDefaultEstimate,
                                c = (h["default"].bufferInfo(n, l, i.maxBufferHole).end - l) / u,
                                f = this._findBestLevel(s, o, d, a, t, c, i.abrBandWidthFactor, i.abrBandWidthUpFactor, r);
                                if (f >= 0) return f;
                                g.logger.trace("rebuffering expected to happen, lets try to find a quality level minimizing the rebuffering");
                                var v = o ? Math.min(o, i.maxStarvationDelay) : i.maxStarvationDelay,
                                p = i.abrBandWidthFactor,
                                y = i.abrBandWidthUpFactor;
                                if (0 === c) {
                                    var m = this.bitrateTestDelay;
                                    if (m) {
                                        var T = o ? Math.min(o, i.maxLoadingDelay) : i.maxLoadingDelay;
                                        v = T - m,
                                        g.logger.trace("bitrate test took " + Math.round(1e3 * m) + "ms, set first fragment max fetchDuration to " + Math.round(1e3 * v) + " ms"),
                                        p = y = 1
                                    }
                                }
                                return f = this._findBestLevel(s, o, d, a, t, c + v, p, y, r),
                                Math.max(f, 0)
                            }
                        }]),
                        t
                    } (c["default"]);
                    r["default"] = m
                },
                {
                    30 : 30,
                    31 : 31,
                    32 : 32,
                    34 : 34,
                    49 : 49,
                    51 : 51
                }],
                6 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    function n(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return ! t || "object" != typeof t && "function" != typeof t ? e: t
                    }
                    function s(e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var o = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    l = e(45),
                    u = i(l),
                    d = e(34),
                    c = i(d),
                    f = e(24),
                    h = i(f),
                    v = e(32),
                    g = i(v),
                    p = e(31),
                    y = i(p),
                    m = e(35),
                    T = i(m),
                    E = e(52),
                    k = i(E),
                    b = e(30),
                    _ = e(51),
                    R = e(48),
                    A = {
                        STOPPED: "STOPPED",
                        STARTING: "STARTING",
                        IDLE: "IDLE",
                        PAUSED: "PAUSED",
                        KEY_LOADING: "KEY_LOADING",
                        FRAG_LOADING: "FRAG_LOADING",
                        FRAG_LOADING_WAITING_RETRY: "FRAG_LOADING_WAITING_RETRY",
                        WAITING_TRACK: "WAITING_TRACK",
                        PARSING: "PARSING",
                        PARSED: "PARSED",
                        BUFFER_FLUSHING: "BUFFER_FLUSHING",
                        ENDED: "ENDED",
                        ERROR: "ERROR",
                        WAITING_INIT_PTS: "WAITING_INIT_PTS"
                    },
                    S = function(e) {
                        function t(e) {
                            a(this, t);
                            var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, g["default"].MEDIA_ATTACHED, g["default"].MEDIA_DETACHING, g["default"].AUDIO_TRACKS_UPDATED, g["default"].AUDIO_TRACK_SWITCHING, g["default"].AUDIO_TRACK_LOADED, g["default"].KEY_LOADED, g["default"].FRAG_LOADED, g["default"].FRAG_PARSING_INIT_SEGMENT, g["default"].FRAG_PARSING_DATA, g["default"].FRAG_PARSED, g["default"].ERROR, g["default"].BUFFER_CREATED, g["default"].BUFFER_APPENDED, g["default"].BUFFER_FLUSHED, g["default"].INIT_PTS_FOUND));
                            return r.config = e.config,
                            r.audioCodecSwap = !1,
                            r.ticks = 0,
                            r._state = A.STOPPED,
                            r.ontick = r.tick.bind(r),
                            r.initPTS = [],
                            r.waitingFragment = null,
                            r.videoTrackCC = null,
                            r
                        }
                        return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function() {
                                this.stopLoad(),
                                this.timer && (clearInterval(this.timer), this.timer = null),
                                y["default"].prototype.destroy.call(this),
                                this.state = A.STOPPED
                            }
                        },
                        {
                            key: "onInitPtsFound",
                            value: function(e) {
                                var t = e.id,
                                r = e.frag.cc,
                                i = e.initPTS;
                                "main" === t && (this.initPTS[r] = i, this.videoTrackCC = r, _.logger.log("InitPTS for cc:" + r + " found from video track:" + i), this.state === A.WAITING_INIT_PTS && (_.logger.log("sending pending audio frag to demuxer"), this.state = A.FRAG_LOADING, this.onFragLoaded(this.waitingFragment), this.waitingFragment = null))
                            }
                        },
                        {
                            key: "startLoad",
                            value: function(e) {
                                if (this.tracks) {
                                    var t = this.lastCurrentTime;
                                    this.stopLoad(),
                                    this.timer || (this.timer = setInterval(this.ontick, 100)),
                                    this.fragLoadError = 0,
                                    t > 0 && e === -1 ? (_.logger.log("audio:override startPosition with lastCurrentTime @" + t.toFixed(3)), this.state = A.IDLE) : (this.lastCurrentTime = this.startPosition ? this.startPosition: e, this.state = A.STARTING),
                                    this.nextLoadPosition = this.startPosition = this.lastCurrentTime,
                                    this.tick()
                                } else this.startPosition = e,
                                this.state = A.STOPPED
                            }
                        },
                        {
                            key: "stopLoad",
                            value: function() {
                                var e = this.fragCurrent;
                                e && (e.loader && e.loader.abort(), this.fragCurrent = null),
                                this.fragPrevious = null,
                                this.demuxer && (this.demuxer.destroy(), this.demuxer = null),
                                this.state = A.STOPPED
                            }
                        },
                        {
                            key: "tick",
                            value: function() {
                                this.ticks++,
                                1 === this.ticks && (this.doTick(), this.ticks > 1 && setTimeout(this.tick, 1), this.ticks = 0)
                            }
                        },
                        {
                            key: "doTick",
                            value: function() {
                                var e, t, r, i = this.hls,
                                a = i.config;
                                switch (this.state) {
                                case A.ERROR:
                                case A.PAUSED:
                                case A.BUFFER_FLUSHING:
                                    break;
                                case A.STARTING:
                                    this.state = A.WAITING_TRACK,
                                    this.loadedmetadata = !1;
                                    break;
                                case A.IDLE:
                                    var n = this.tracks;
                                    if (!n) break;
                                    if (!this.media && (this.startFragRequested || !a.startFragPrefetch)) break;
                                    e = this.loadedmetadata ? this.media.currentTime: this.nextLoadPosition ? this.nextLoadPosition: 0;
                                    var s = this.mediaBuffer ? this.mediaBuffer: this.media,
                                    o = c["default"].bufferInfo(s, e, a.maxBufferHole),
                                    l = o.len,
                                    d = o.end,
                                    f = this.fragPrevious,
                                    h = a.maxMaxBufferLength,
                                    v = this.audioSwitch,
                                    p = this.trackId;
                                    if ((l < h || v) && p < n.length) {
                                        if (r = n[p].details, "undefined" == typeof r) {
                                            this.state = A.WAITING_TRACK;
                                            break
                                        }
                                        if (!v && !r.live && f && f.sn === r.endSN && (!this.media.seeking || this.media.duration - d < f.duration / 2)) {
                                            this.hls.trigger(g["default"].BUFFER_EOS, {
                                                type: "audio"
                                            }),
                                            this.state = A.ENDED;
                                            break
                                        }
                                        var y = r.fragments,
                                        m = y.length,
                                        T = y[0].start,
                                        E = y[m - 1].start + y[m - 1].duration,
                                        k = void 0;
                                        if (v) if (r.live && !r.PTSKnown) _.logger.log("switching audiotrack, live stream, unknown PTS,load first fragment"),
                                        d = 0;
                                        else if (d = e, r.PTSKnown && e < T) {
                                            if (! (o.end > T || o.nextStart)) return;
                                            _.logger.log("alt audio track ahead of main track, seek to start of alt audio track"),
                                            this.media.currentTime = T + .05
                                        }
                                        if (r.initSegment && !r.initSegment.data) k = r.initSegment;
                                        else if (d <= T) {
                                            if (k = y[0], null !== this.videoTrackCC && k.cc !== this.videoTrackCC && (k = (0, R.findFragWithCC)(y, this.videoTrackCC)), r.live && k.loadIdx && k.loadIdx === this.fragLoadIdx) {
                                                var S = o.nextStart ? o.nextStart: T;
                                                return _.logger.log("no alt audio available @currentTime:" + this.media.currentTime + ", seeking @" + (S + .05)),
                                                void(this.media.currentTime = S + .05)
                                            }
                                        } else {
                                            var L = void 0,
                                            w = a.maxFragLookUpTolerance,
                                            D = f ? y[f.sn - y[0].sn + 1] : void 0,
                                            O = function(e) {
                                                var t = Math.min(w, e.duration);
                                                return e.start + e.duration - t <= d ? 1 : e.start - t > d && e.start ? -1 : 0
                                            };
                                            d < E ? (d > E - w && (w = 0), L = D && !O(D) ? D: u["default"].search(y, O)) : L = y[m - 1],
                                            L && (k = L, T = L.start, f && k.level === f.level && k.sn === f.sn && (k.sn < r.endSN ? (k = y[k.sn + 1 - r.startSN], _.logger.log("SN just loaded, load next one: " + k.sn)) : k = null))
                                        }
                                        if (k) if (k.decryptdata && null != k.decryptdata.uri && null == k.decryptdata.key) _.logger.log("Loading key for " + k.sn + " of [" + r.startSN + " ," + r.endSN + "],track " + p),
                                        this.state = A.KEY_LOADING,
                                        i.trigger(g["default"].KEY_LOADING, {
                                            frag: k
                                        });
                                        else {
                                            if (_.logger.log("Loading " + k.sn + ", cc: " + k.cc + " of [" + r.startSN + " ," + r.endSN + "],track " + p + ", currentTime:" + e + ",bufferEnd:" + d.toFixed(3)), void 0 !== this.fragLoadIdx ? this.fragLoadIdx++:this.fragLoadIdx = 0, k.loadCounter) {
                                                k.loadCounter++;
                                                var I = a.fragLoadingLoopThreshold;
                                                if (k.loadCounter > I && Math.abs(this.fragLoadIdx - k.loadIdx) < I) return void i.trigger(g["default"].ERROR, {
                                                    type: b.ErrorTypes.MEDIA_ERROR,
                                                    details: b.ErrorDetails.FRAG_LOOP_LOADING_ERROR,
                                                    fatal: !1,
                                                    frag: k
                                                })
                                            } else k.loadCounter = 1;
                                            k.loadIdx = this.fragLoadIdx,
                                            this.fragCurrent = k,
                                            this.startFragRequested = !0,
                                            isNaN(k.sn) || (this.nextLoadPosition = k.start + k.duration),
                                            i.trigger(g["default"].FRAG_LOADING, {
                                                frag: k
                                            }),
                                            this.state = A.FRAG_LOADING
                                        }
                                    }
                                    break;
                                case A.WAITING_TRACK:
                                    t = this.tracks[this.trackId],
                                    t && t.details && (this.state = A.IDLE);
                                    break;
                                case A.FRAG_LOADING_WAITING_RETRY:
                                    var C = performance.now(),
                                    P = this.retryDate;
                                    s = this.media;
                                    var x = s && s.seeking; (!P || C >= P || x) && (_.logger.log("audioStreamController: retryDate reached, switch back to IDLE state"), this.state = A.IDLE);
                                    break;
                                case A.WAITING_INIT_PTS:
                                    if (void 0 === this.initPTS[this.videoTrackCC]) break;
                                    var M = this.waitingFragment;
                                    if (M) {
                                        var N = M.frag.cc;
                                        this.videoTrackCC !== N ? (_.logger.warn("Waiting fragment CC (" + N + ") does not match video track CC (" + this.videoTrackCC + ")"), this.waitingFragment = null, this.state = A.IDLE) : (this.onFragLoaded(this.waitingFragment), this.state = A.FRAG_LOADING, this.waitingFragment = null)
                                    } else this.state = A.IDLE;
                                    break;
                                case A.STOPPED:
                                case A.FRAG_LOADING:
                                case A.PARSING:
                                case A.PARSED:
                                case A.ENDED:
                                }
                            }
                        },
                        {
                            key: "onMediaAttached",
                            value: function(e) {
                                var t = this.media = this.mediaBuffer = e.media;
                                this.onvseeking = this.onMediaSeeking.bind(this),
                                this.onvended = this.onMediaEnded.bind(this),
                                t.addEventListener("seeking", this.onvseeking),
                                t.addEventListener("ended", this.onvended);
                                var r = this.config;
                                this.tracks && r.autoStartLoad && this.startLoad(r.startPosition)
                            }
                        },
                        {
                            key: "onMediaDetaching",
                            value: function() {
                                var e = this.media;
                                e && e.ended && (_.logger.log("MSE detaching and video ended, reset startPosition"), this.startPosition = this.lastCurrentTime = 0);
                                var t = this.tracks;
                                t && t.forEach(function(e) {
                                    e.details && e.details.fragments.forEach(function(e) {
                                        e.loadCounter = void 0
                                    })
                                }),
                                e && (e.removeEventListener("seeking", this.onvseeking), e.removeEventListener("ended", this.onvended), this.onvseeking = this.onvseeked = this.onvended = null),
                                this.media = this.mediaBuffer = null,
                                this.loadedmetadata = !1,
                                this.stopLoad()
                            }
                        },
                        {
                            key: "onMediaSeeking",
                            value: function() {
                                this.state === A.ENDED && (this.state = A.IDLE),
                                this.media && (this.lastCurrentTime = this.media.currentTime),
                                void 0 !== this.fragLoadIdx && (this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold),
                                this.tick()
                            }
                        },
                        {
                            key: "onMediaEnded",
                            value: function() {
                                this.startPosition = this.lastCurrentTime = 0
                            }
                        },
                        {
                            key: "onAudioTracksUpdated",
                            value: function(e) {
                                _.logger.log("audio tracks updated"),
                                this.tracks = e.audioTracks
                            }
                        },
                        {
                            key: "onAudioTrackSwitching",
                            value: function(e) {
                                var t = !!e.url;
                                this.trackId = e.id,
                                this.state = A.IDLE,
                                this.fragCurrent = null,
                                this.state = A.PAUSED,
                                this.waitingFragment = null,
                                t ? this.timer || (this.timer = setInterval(this.ontick, 100)) : this.demuxer && (this.demuxer.destroy(), this.demuxer = null),
                                t && (this.audioSwitch = !0, this.state = A.IDLE, void 0 !== this.fragLoadIdx && (this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold)),
                                this.tick()
                            }
                        },
                        {
                            key: "onAudioTrackLoaded",
                            value: function(e) {
                                var t = e.details,
                                r = e.id,
                                i = this.tracks[r],
                                a = t.totalduration,
                                n = 0;
                                if (_.logger.log("track " + r + " loaded [" + t.startSN + "," + t.endSN + "],duration:" + a), t.live) {
                                    var s = i.details;
                                    s && t.fragments.length > 0 ? (T["default"].mergeDetails(s, t), n = t.fragments[0].start, t.PTSKnown ? _.logger.log("live audio playlist sliding:" + n.toFixed(3)) : _.logger.log("live audio playlist - outdated PTS, unknown sliding")) : (t.PTSKnown = !1, _.logger.log("live audio playlist - first load, unknown sliding"))
                                } else t.PTSKnown = !1;
                                if (i.details = t, !this.startFragRequested) {
                                    if (this.startPosition === -1) {
                                        var o = t.startTimeOffset;
                                        isNaN(o) ? this.startPosition = 0 : (_.logger.log("start time offset found in playlist, adjust startPosition to " + o), this.startPosition = o)
                                    }
                                    this.nextLoadPosition = this.startPosition
                                }
                                this.state === A.WAITING_TRACK && (this.state = A.IDLE),
                                this.tick()
                            }
                        },
                        {
                            key: "onKeyLoaded",
                            value: function() {
                                this.state === A.KEY_LOADING && (this.state = A.IDLE, this.tick())
                            }
                        },
                        {
                            key: "onFragLoaded",
                            value: function(e) {
                                var t = this.fragCurrent,
                                r = e.frag;
                                if (this.state === A.FRAG_LOADING && t && "audio" === r.type && r.level === t.level && r.sn === t.sn) {
                                    var i = this.tracks[this.trackId],
                                    a = i.details,
                                    n = a.totalduration,
                                    s = t.level,
                                    o = t.sn,
                                    l = t.cc,
                                    u = this.config.defaultAudioCodec || i.audioCodec || "mp4a.40.2",
                                    d = this.stats = e.stats;
                                    if ("initSegment" === o) this.state = A.IDLE,
                                    d.tparsed = d.tbuffered = performance.now(),
                                    a.initSegment.data = e.payload,
                                    this.hls.trigger(g["default"].FRAG_BUFFERED, {
                                        stats: d,
                                        frag: t,
                                        id: "audio"
                                    }),
                                    this.tick();
                                    else {
                                        this.state = A.PARSING,
                                        this.appended = !1,
                                        this.demuxer || (this.demuxer = new h["default"](this.hls, "audio"));
                                        var c = this.initPTS[l],
                                        f = a.initSegment ? a.initSegment.data: [];
                                        if (a.initSegment || void 0 !== c) {
                                            this.pendingBuffering = !0,
                                            _.logger.log("Demuxing " + o + " of [" + a.startSN + " ," + a.endSN + "],track " + s);
                                            var v = !1;
                                            this.demuxer.push(e.payload, f, u, null, t, n, v, c)
                                        } else _.logger.log("unknown video PTS for continuity counter " + l + ", waiting for video PTS before demuxing audio frag " + o + " of [" + a.startSN + " ," + a.endSN + "],track " + s),
                                        this.waitingFragment = e,
                                        this.state = A.WAITING_INIT_PTS
                                    }
                                }
                                this.fragLoadError = 0
                            }
                        },
                        {
                            key: "onFragParsingInitSegment",
                            value: function(e) {
                                var t = this.fragCurrent,
                                r = e.frag;
                                if (t && "audio" === e.id && r.sn === t.sn && r.level === t.level && this.state === A.PARSING) {
                                    var i = e.tracks,
                                    a = void 0;
                                    if (i.video && delete i.video, a = i.audio) {
                                        a.levelCodec = "mp4a.40.2",
                                        a.id = e.id,
                                        this.hls.trigger(g["default"].BUFFER_CODECS, i),
                                        _.logger.log("audio track:audio,container:" + a.container + ",codecs[level/parsed]=[" + a.levelCodec + "/" + a.codec + "]");
                                        var n = a.initSegment;
                                        if (n) {
                                            var s = {
                                                type: "audio",
                                                data: n,
                                                parent: "audio",
                                                content: "initSegment"
                                            };
                                            this.audioSwitch ? this.pendingData = [s] : (this.appended = !0, this.pendingBuffering = !0, this.hls.trigger(g["default"].BUFFER_APPENDING, s))
                                        }
                                        this.tick()
                                    }
                                }
                            }
                        },
                        {
                            key: "onFragParsingData",
                            value: function(e) {
                                var t = this,
                                r = this.fragCurrent,
                                i = e.frag;
                                if (r && "audio" === e.id && "audio" === e.type && i.sn === r.sn && i.level === r.level && this.state === A.PARSING) {
                                    var a = this.trackId,
                                    n = this.tracks[a],
                                    s = this.hls;
                                    isNaN(e.endPTS) && (e.endPTS = e.startPTS + r.duration, e.endDTS = e.startDTS + r.duration),
                                    _.logger.log("parsed " + e.type + ",PTS:[" + e.startPTS.toFixed(3) + "," + e.endPTS.toFixed(3) + "],DTS:[" + e.startDTS.toFixed(3) + "/" + e.endDTS.toFixed(3) + "],nb:" + e.nb),
                                    T["default"].updateFragPTSDTS(n.details, r.sn, e.startPTS, e.endPTS);
                                    var o = this.audioSwitch,
                                    l = this.media,
                                    u = !1;
                                    if (o && l) if (l.readyState) {
                                        var d = l.currentTime;
                                        _.logger.log("switching audio track : currentTime:" + d),
                                        d >= e.startPTS && (_.logger.log("switching audio track : flushing all audio"), this.state = A.BUFFER_FLUSHING, s.trigger(g["default"].BUFFER_FLUSHING, {
                                            startOffset: 0,
                                            endOffset: Number.POSITIVE_INFINITY,
                                            type: "audio"
                                        }), u = !0, this.audioSwitch = !1, s.trigger(g["default"].AUDIO_TRACK_SWITCHED, {
                                            id: a
                                        }))
                                    } else this.audioSwitch = !1,
                                    s.trigger(g["default"].AUDIO_TRACK_SWITCHED, {
                                        id: a
                                    });
                                    var c = this.pendingData;
                                    this.audioSwitch || ([e.data1, e.data2].forEach(function(t) {
                                        t && t.length && c.push({
                                            type: e.type,
                                            data: t,
                                            parent: "audio",
                                            content: "data"
                                        })
                                    }), !u && c.length && (c.forEach(function(e) {
                                        t.state === A.PARSING && (t.pendingBuffering = !0, t.hls.trigger(g["default"].BUFFER_APPENDING, e))
                                    }), this.pendingData = [], this.appended = !0)),
                                    this.tick()
                                }
                            }
                        },
                        {
                            key: "onFragParsed",
                            value: function(e) {
                                var t = this.fragCurrent,
                                r = e.frag;
                                t && "audio" === e.id && r.sn === t.sn && r.level === t.level && this.state === A.PARSING && (this.stats.tparsed = performance.now(), this.state = A.PARSED, this._checkAppendedParsed())
                            }
                        },
                        {
                            key: "onBufferCreated",
                            value: function(e) {
                                var t = e.tracks.audio;
                                t && (this.mediaBuffer = t.buffer, this.loadedmetadata = !0)
                            }
                        },
                        {
                            key: "onBufferAppended",
                            value: function(e) {
                                if ("audio" === e.parent) {
                                    var t = this.state;
                                    t !== A.PARSING && t !== A.PARSED || (this.pendingBuffering = e.pending > 0, this._checkAppendedParsed())
                                }
                            }
                        },
                        {
                            key: "_checkAppendedParsed",
                            value: function() {
                                if (! (this.state !== A.PARSED || this.appended && this.pendingBuffering)) {
                                    var e = this.fragCurrent,
                                    t = this.stats,
                                    r = this.hls;
                                    if (e) {
                                        this.fragPrevious = e,
                                        t.tbuffered = performance.now(),
                                        r.trigger(g["default"].FRAG_BUFFERED, {
                                            stats: t,
                                            frag: e,
                                            id: "audio"
                                        });
                                        var i = this.mediaBuffer ? this.mediaBuffer: this.media;
                                        _.logger.log("audio buffered : " + k["default"].toString(i.buffered)),
                                        this.audioSwitch && this.appended && (this.audioSwitch = !1, r.trigger(g["default"].AUDIO_TRACK_SWITCHED, {
                                            id: this.trackId
                                        })),
                                        this.state = A.IDLE
                                    }
                                    this.tick()
                                }
                            }
                        },
                        {
                            key: "onError",
                            value: function(e) {
                                var t = e.frag;
                                if (!t || "audio" === t.type) switch (e.details) {
                                case b.ErrorDetails.FRAG_LOAD_ERROR:
                                case b.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                    if (!e.fatal) {
                                        var r = this.fragLoadError;
                                        r ? r++:r = 1;
                                        var i = this.config;
                                        if (r <= i.fragLoadingMaxRetry) {
                                            this.fragLoadError = r,
                                            t.loadCounter = 0;
                                            var a = Math.min(Math.pow(2, r - 1) * i.fragLoadingRetryDelay, i.fragLoadingMaxRetryTimeout);
                                            _.logger.warn("audioStreamController: frag loading failed, retry in " + a + " ms"),
                                            this.retryDate = performance.now() + a,
                                            this.state = A.FRAG_LOADING_WAITING_RETRY
                                        } else _.logger.error("audioStreamController: " + e.details + " reaches max retry, redispatch as fatal ..."),
                                        e.fatal = !0,
                                        this.state = A.ERROR
                                    }
                                    break;
                                case b.ErrorDetails.FRAG_LOOP_LOADING_ERROR:
                                case b.ErrorDetails.AUDIO_TRACK_LOAD_ERROR:
                                case b.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT:
                                case b.ErrorDetails.KEY_LOAD_ERROR:
                                case b.ErrorDetails.KEY_LOAD_TIMEOUT:
                                    this.state !== A.ERROR && (this.state = e.fatal ? A.ERROR: A.IDLE, _.logger.warn("audioStreamController: " + e.details + " while loading frag,switch to " + this.state + " state ..."));
                                    break;
                                case b.ErrorDetails.BUFFER_FULL_ERROR:
                                    if ("audio" === e.parent && (this.state === A.PARSING || this.state === A.PARSED)) {
                                        var n = this.mediaBuffer,
                                        s = this.media.currentTime,
                                        o = n && c["default"].isBuffered(n, s) && c["default"].isBuffered(n, s + .5);
                                        if (o) {
                                            var l = this.config;
                                            l.maxMaxBufferLength >= l.maxBufferLength && (l.maxMaxBufferLength /= 2, _.logger.warn("audio:reduce max buffer length to " + l.maxMaxBufferLength + "s"), this.fragLoadIdx += 2 * l.fragLoadingLoopThreshold),
                                            this.state = A.IDLE
                                        } else _.logger.warn("buffer full error also media.currentTime is not buffered, flush audio buffer"),
                                        this.fragCurrent = null,
                                        this.state = A.BUFFER_FLUSHING,
                                        this.hls.trigger(g["default"].BUFFER_FLUSHING, {
                                            startOffset: 0,
                                            endOffset: Number.POSITIVE_INFINITY,
                                            type: "audio"
                                        })
                                    }
                                }
                            }
                        },
                        {
                            key: "onBufferFlushed",
                            value: function() {
                                var e = this,
                                t = this.pendingData;
                                t && t.length ? (_.logger.log("appending pending audio data on Buffer Flushed"), t.forEach(function(t) {
                                    e.hls.trigger(g["default"].BUFFER_APPENDING, t)
                                }), this.appended = !0, this.pendingData = [], this.state = A.PARSED) : (this.state = A.IDLE, this.fragPrevious = null, this.tick())
                            }
                        },
                        {
                            key: "state",
                            set: function(e) {
                                if (this.state !== e) {
                                    var t = this.state;
                                    this._state = e,
                                    _.logger.log("audio stream:" + t + "->" + e)
                                }
                            },
                            get: function() {
                                return this._state
                            }
                        }]),
                        t
                    } (y["default"]);
                    r["default"] = S
                },
                {
                    24 : 24,
                    30 : 30,
                    31 : 31,
                    32 : 32,
                    34 : 34,
                    35 : 35,
                    45 : 45,
                    48 : 48,
                    51 : 51,
                    52 : 52
                }],
                7 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    function n(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return ! t || "object" != typeof t && "function" != typeof t ? e: t
                    }
                    function s(e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var o = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    l = e(32),
                    u = i(l),
                    d = e(31),
                    c = i(d),
                    f = e(51),
                    h = function(e) {
                        function t(e) {
                            a(this, t);
                            var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u["default"].MANIFEST_LOADING, u["default"].MANIFEST_LOADED, u["default"].AUDIO_TRACK_LOADED));
                            return r.ticks = 0,
                            r.ontick = r.tick.bind(r),
                            r
                        }
                        return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function() {
                                c["default"].prototype.destroy.call(this)
                            }
                        },
                        {
                            key: "tick",
                            value: function() {
                                this.ticks++,
                                1 === this.ticks && (this.doTick(), this.ticks > 1 && setTimeout(this.tick, 1), this.ticks = 0)
                            }
                        },
                        {
                            key: "doTick",
                            value: function() {
                                this.updateTrack(this.trackId)
                            }
                        },
                        {
                            key: "onManifestLoading",
                            value: function() {
                                this.tracks = [],
                                this.trackId = -1
                            }
                        },
                        {
                            key: "onManifestLoaded",
                            value: function(e) {
                                var t = this,
                                r = e.audioTracks || [],
                                i = !1;
                                this.tracks = r,
                                this.hls.trigger(u["default"].AUDIO_TRACKS_UPDATED, {
                                    audioTracks: r
                                });
                                var a = 0;
                                r.forEach(function(e) {
                                    return e["default"] ? (t.audioTrack = a, void(i = !0)) : void a++
                                }),
                                i === !1 && r.length && (f.logger.log("no default audio track defined, use first audio track as default"), this.audioTrack = 0)
                            }
                        },
                        {
                            key: "onAudioTrackLoaded",
                            value: function(e) {
                                e.id < this.tracks.length && (f.logger.log("audioTrack " + e.id + " loaded"), this.tracks[e.id].details = e.details, e.details.live && !this.timer && (this.timer = setInterval(this.ontick, 1e3 * e.details.targetduration)), !e.details.live && this.timer && (clearInterval(this.timer), this.timer = null))
                            }
                        },
                        {
                            key: "setAudioTrackInternal",
                            value: function(e) {
                                if (e >= 0 && e < this.tracks.length) {
                                    this.timer && (clearInterval(this.timer), this.timer = null),
                                    this.trackId = e,
                                    f.logger.log("switching to audioTrack " + e);
                                    var t = this.tracks[e],
                                    r = this.hls,
                                    i = t.type,
                                    a = t.url,
                                    n = {
                                        id: e,
                                        type: i,
                                        url: a
                                    };
                                    r.trigger(u["default"].AUDIO_TRACK_SWITCH, n),
                                    r.trigger(u["default"].AUDIO_TRACK_SWITCHING, n);
                                    var s = t.details; ! a || void 0 !== s && s.live !== !0 || (f.logger.log("(re)loading playlist for audioTrack " + e), r.trigger(u["default"].AUDIO_TRACK_LOADING, {
                                        url: a,
                                        id: e
                                    }))
                                }
                            }
                        },
                        {
                            key: "updateTrack",
                            value: function(e) {
                                if (e >= 0 && e < this.tracks.length) {
                                    this.timer && (clearInterval(this.timer), this.timer = null),
                                    this.trackId = e,
                                    f.logger.log("updating audioTrack " + e);
                                    var t = this.tracks[e],
                                    r = t.url,
                                    i = t.details; ! r || void 0 !== i && i.live !== !0 || (f.logger.log("(re)loading playlist for audioTrack " + e), this.hls.trigger(u["default"].AUDIO_TRACK_LOADING, {
                                        url: r,
                                        id: e
                                    }))
                                }
                            }
                        },
                        {
                            key: "audioTracks",
                            get: function() {
                                return this.tracks
                            }
                        },
                        {
                            key: "audioTrack",
                            get: function() {
                                return this.trackId
                            },
                            set: function(e) {
                                this.trackId === e && void 0 !== this.tracks[e].details || this.setAudioTrackInternal(e)
                            }
                        }]),
                        t
                    } (c["default"]);
                    r["default"] = h
                },
                {
                    31 : 31,
                    32 : 32,
                    51 : 51
                }],
                8 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    function n(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return ! t || "object" != typeof t && "function" != typeof t ? e: t
                    }
                    function s(e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var o = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    l = e(32),
                    u = i(l),
                    d = e(31),
                    c = i(d),
                    f = e(51),
                    h = e(30),
                    v = function(e) {
                        function t(e) {
                            a(this, t);
                            var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u["default"].MEDIA_ATTACHING, u["default"].MEDIA_DETACHING, u["default"].MANIFEST_PARSED, u["default"].BUFFER_RESET, u["default"].BUFFER_APPENDING, u["default"].BUFFER_CODECS, u["default"].BUFFER_EOS, u["default"].BUFFER_FLUSHING, u["default"].LEVEL_PTS_UPDATED, u["default"].LEVEL_UPDATED));
                            return r._msDuration = null,
                            r._levelDuration = null,
                            r.onsbue = r.onSBUpdateEnd.bind(r),
                            r.onsbe = r.onSBUpdateError.bind(r),
                            r.pendingTracks = {},
                            r.tracks = {},
                            r
                        }
                        return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function() {
                                c["default"].prototype.destroy.call(this)
                            }
                        },
                        {
                            key: "onLevelPtsUpdated",
                            value: function(e) {
                                var t = e.type,
                                r = this.tracks.audio;
                                if ("audio" === t && r && "audio/mpeg" === r.container) {
                                    var i = this.sourceBuffer.audio,
                                    a = Math.abs(i.timestampOffset - e.start);
                                    if (a > .1) {
                                        var n = i.updating;
                                        try {
                                            i.abort()
                                        } catch(s) {
                                            n = !0,
                                            f.logger.warn("can not abort audio buffer: " + s)
                                        }
                                        n ? this.audioTimestampOffset = e.start: (f.logger.warn("change mpeg audio timestamp offset from " + i.timestampOffset + " to " + e.start), i.timestampOffset = e.start)
                                    }
                                }
                            }
                        },
                        {
                            key: "onManifestParsed",
                            value: function(e) {
                                var t = e.audio,
                                r = e.video,
                                i = 0;
                                e.altAudio && (t || r) && (i = (t ? 1 : 0) + (r ? 1 : 0), f.logger.log(i + " sourceBuffer(s) expected")),
                                this.sourceBufferNb = i
                            }
                        },
                        {
                            key: "onMediaAttaching",
                            value: function(e) {
                                var t = this.media = e.media;
                                if (t) {
                                    var r = this.mediaSource = new MediaSource;
                                    this.onmso = this.onMediaSourceOpen.bind(this),
                                    this.onmse = this.onMediaSourceEnded.bind(this),
                                    this.onmsc = this.onMediaSourceClose.bind(this),
                                    r.addEventListener("sourceopen", this.onmso),
                                    r.addEventListener("sourceended", this.onmse),
                                    r.addEventListener("sourceclose", this.onmsc),
                                    t.src = URL.createObjectURL(r)
                                }
                            }
                        },
                        {
                            key: "onMediaDetaching",
                            value: function() {
                                f.logger.log("media source detaching");
                                var e = this.mediaSource;
                                if (e) {
                                    if ("open" === e.readyState) try {
                                        e.endOfStream()
                                    } catch(t) {
                                        f.logger.warn("onMediaDetaching:" + t.message + " while calling endOfStream")
                                    }
                                    e.removeEventListener("sourceopen", this.onmso),
                                    e.removeEventListener("sourceended", this.onmse),
                                    e.removeEventListener("sourceclose", this.onmsc),
                                    this.media && (URL.revokeObjectURL(this.media.src), this.media.removeAttribute("src"), this.media.load()),
                                    this.mediaSource = null,
                                    this.media = null,
                                    this.pendingTracks = {},
                                    this.tracks = {},
                                    this.sourceBuffer = {},
                                    this.flushRange = [],
                                    this.segments = [],
                                    this.appended = 0
                                }
                                this.onmso = this.onmse = this.onmsc = null,
                                this.hls.trigger(u["default"].MEDIA_DETACHED)
                            }
                        },
                        {
                            key: "onMediaSourceOpen",
                            value: function() {
                                f.logger.log("media source opened"),
                                this.hls.trigger(u["default"].MEDIA_ATTACHED, {
                                    media: this.media
                                });
                                var e = this.mediaSource;
                                e && e.removeEventListener("sourceopen", this.onmso),
                                this.checkPendingTracks()
                            }
                        },
                        {
                            key: "checkPendingTracks",
                            value: function() {
                                var e = this.pendingTracks,
                                t = Object.keys(e).length;
                                t && (this.sourceBufferNb <= t || 0 === this.sourceBufferNb) && (this.createSourceBuffers(e), this.pendingTracks = {},
                                this.doAppending())
                            }
                        },
                        {
                            key: "onMediaSourceClose",
                            value: function() {
                                f.logger.log("media source closed")
                            }
                        },
                        {
                            key: "onMediaSourceEnded",
                            value: function() {
                                f.logger.log("media source ended")
                            }
                        },
                        {
                            key: "onSBUpdateEnd",
                            value: function() {
                                if (this.audioTimestampOffset) {
                                    var e = this.sourceBuffer.audio;
                                    f.logger.warn("change mpeg audio timestamp offset from " + e.timestampOffset + " to " + this.audioTimestampOffset),
                                    e.timestampOffset = this.audioTimestampOffset,
                                    delete this.audioTimestampOffset
                                }
                                this._needsFlush && this.doFlush(),
                                this._needsEos && this.checkEos(),
                                this.appending = !1;
                                var t = this.parent,
                                r = this.segments.reduce(function(e, r) {
                                    return r.parent === t ? e + 1 : e
                                },
                                0);
                                this.hls.trigger(u["default"].BUFFER_APPENDED, {
                                    parent: t,
                                    pending: r
                                }),
                                this._needsFlush || this.doAppending(),
                                this.updateMediaElementDuration()
                            }
                        },
                        {
                            key: "onSBUpdateError",
                            value: function(e) {
                                f.logger.error("sourceBuffer error:", e),
                                this.hls.trigger(u["default"].ERROR, {
                                    type: h.ErrorTypes.MEDIA_ERROR,
                                    details: h.ErrorDetails.BUFFER_APPENDING_ERROR,
                                    fatal: !1
                                })
                            }
                        },
                        {
                            key: "onBufferReset",
                            value: function() {
                                var e = this.sourceBuffer;
                                for (var t in e) {
                                    var r = e[t];
                                    try {
                                        this.mediaSource.removeSourceBuffer(r),
                                        r.removeEventListener("updateend", this.onsbue),
                                        r.removeEventListener("error", this.onsbe)
                                    } catch(i) {}
                                }
                                this.sourceBuffer = {},
                                this.flushRange = [],
                                this.segments = [],
                                this.appended = 0
                            }
                        },
                        {
                            key: "onBufferCodecs",
                            value: function(e) {
                                if (0 === Object.keys(this.sourceBuffer).length) {
                                    for (var t in e) this.pendingTracks[t] = e[t];
                                    var r = this.mediaSource;
                                    r && "open" === r.readyState && this.checkPendingTracks()
                                }
                            }
                        },
                        {
                            key: "createSourceBuffers",
                            value: function(e) {
                                var t = this.sourceBuffer,
                                r = this.mediaSource;
                                for (var i in e) if (!t[i]) {
                                    var a = e[i],
                                    n = a.levelCodec || a.codec,
                                    s = a.container + ";codecs=" + n;
                                    f.logger.log("creating sourceBuffer(" + s + ")");
                                    try {
                                        var o = t[i] = r.addSourceBuffer(s);
                                        o.addEventListener("updateend", this.onsbue),
                                        o.addEventListener("error", this.onsbe),
                                        this.tracks[i] = {
                                            codec: n,
                                            container: a.container
                                        },
                                        a.buffer = o
                                    } catch(l) {
                                        f.logger.error("error while trying to add sourceBuffer:" + l.message),
                                        this.hls.trigger(u["default"].ERROR, {
                                            type: h.ErrorTypes.MEDIA_ERROR,
                                            details: h.ErrorDetails.BUFFER_ADD_CODEC_ERROR,
                                            fatal: !1,
                                            err: l,
                                            mimeType: s
                                        })
                                    }
                                }
                                this.hls.trigger(u["default"].BUFFER_CREATED, {
                                    tracks: e
                                })
                            }
                        },
                        {
                            key: "onBufferAppending",
                            value: function(e) {
                                this._needsFlush || (this.segments ? this.segments.push(e) : this.segments = [e], this.doAppending())
                            }
                        },
                        {
                            key: "onBufferAppendFail",
                            value: function(e) {
                                f.logger.error("sourceBuffer error:", e.event),
                                this.hls.trigger(u["default"].ERROR, {
                                    type: h.ErrorTypes.MEDIA_ERROR,
                                    details: h.ErrorDetails.BUFFER_APPENDING_ERROR,
                                    fatal: !1
                                })
                            }
                        },
                        {
                            key: "onBufferEos",
                            value: function(e) {
                                var t = this.sourceBuffer,
                                r = e.type;
                                for (var i in t) r && i !== r || t[i].ended || (t[i].ended = !0, f.logger.log(i + " sourceBuffer now EOS"));
                                this.checkEos()
                            }
                        },
                        {
                            key: "checkEos",
                            value: function() {
                                var e = this.sourceBuffer,
                                t = this.mediaSource;
                                if (!t || "open" !== t.readyState) return void(this._needsEos = !1);
                                for (var r in e) {
                                    var i = e[r];
                                    if (!i.ended) return;
                                    if (i.updating) return void(this._needsEos = !0)
                                }
                                f.logger.log("all media data available, signal endOfStream() to MediaSource and stop loading fragment");
                                try {
                                    t.endOfStream()
                                } catch(a) {
                                    f.logger.warn("exception while calling mediaSource.endOfStream()")
                                }
                                this._needsEos = !1
                            }
                        },
                        {
                            key: "onBufferFlushing",
                            value: function(e) {
                                this.flushRange.push({
                                    start: e.startOffset,
                                    end: e.endOffset,
                                    type: e.type
                                }),
                                this.flushBufferCounter = 0,
                                this.doFlush()
                            }
                        },
                        {
                            key: "onLevelUpdated",
                            value: function(e) {
                                var t = e.details;
                                0 !== t.fragments.length && (this._levelDuration = t.totalduration + t.fragments[0].start, this.updateMediaElementDuration())
                            }
                        },
                        {
                            key: "updateMediaElementDuration",
                            value: function() {
                                var e = this.media,
                                t = this.mediaSource,
                                r = this.sourceBuffer,
                                i = this._levelDuration;
                                if (null !== i && e && t && r && 0 !== e.readyState && "open" === t.readyState) {
                                    for (var a in r) if (r[a].updating) return;
                                    null === this._msDuration && (this._msDuration = t.duration);
                                    var n = e.duration; (i > this._msDuration && i > n || n === 1 / 0 || isNaN(n)) && (f.logger.log("Updating mediasource duration to " + i.toFixed(3)), this._msDuration = t.duration = i)
                                }
                            }
                        },
                        {
                            key: "doFlush",
                            value: function() {
                                for (; this.flushRange.length;) {
                                    var e = this.flushRange[0];
                                    if (!this.flushBuffer(e.start, e.end, e.type)) return void(this._needsFlush = !0);
                                    this.flushRange.shift(),
                                    this.flushBufferCounter = 0
                                }
                                if (0 === this.flushRange.length) {
                                    this._needsFlush = !1;
                                    var t = 0,
                                    r = this.sourceBuffer;
                                    try {
                                        for (var i in r) t += r[i].buffered.length
                                    } catch(a) {
                                        f.logger.error("error while accessing sourceBuffer.buffered")
                                    }
                                    this.appended = t,
                                    this.hls.trigger(u["default"].BUFFER_FLUSHED)
                                }
                            }
                        },
                        {
                            key: "doAppending",
                            value: function() {
                                var e = this.hls,
                                t = this.sourceBuffer,
                                r = this.segments;
                                if (Object.keys(t).length) {
                                    if (this.media.error) return this.segments = [],
                                    void f.logger.error("trying to append although a media error occured, flush segment and abort");
                                    if (this.appending) return;
                                    if (r && r.length) {
                                        var i = r.shift();
                                        try {
                                            var a = i.type,
                                            n = t[a];
                                            n ? n.updating ? r.unshift(i) : (n.ended = !1, this.parent = i.parent, n.appendBuffer(i.data), this.appendError = 0, this.appended++, this.appending = !0) : this.onSBUpdateEnd()
                                        } catch(s) {
                                            f.logger.error("error while trying to append buffer:" + s.message),
                                            r.unshift(i);
                                            var o = {
                                                type: h.ErrorTypes.MEDIA_ERROR,
                                                parent: i.parent
                                            };
                                            if (22 === s.code) return this.segments = [],
                                            o.details = h.ErrorDetails.BUFFER_FULL_ERROR,
                                            o.fatal = !1,
                                            void e.trigger(u["default"].ERROR, o);
                                            if (this.appendError ? this.appendError++:this.appendError = 1, o.details = h.ErrorDetails.BUFFER_APPEND_ERROR, this.appendError > e.config.appendErrorMaxRetry) return f.logger.log("fail " + e.config.appendErrorMaxRetry + " times to append segment in sourceBuffer"),
                                            r = [],
                                            o.fatal = !0,
                                            void e.trigger(u["default"].ERROR, o);
                                            o.fatal = !1,
                                            e.trigger(u["default"].ERROR, o)
                                        }
                                    }
                                }
                            }
                        },
                        {
                            key: "flushBuffer",
                            value: function(e, t, r) {
                                var i, a, n, s, o, l, u = this.sourceBuffer;
                                if (Object.keys(u).length) {
                                    if (f.logger.log("flushBuffer,pos/start/end: " + this.media.currentTime.toFixed(3) + "/" + e + "/" + t), this.flushBufferCounter < this.appended) {
                                        for (var d in u) if (!r || d === r) {
                                            if (i = u[d], i.ended = !1, i.updating) return f.logger.warn("cannot flush, sb updating in progress"),
                                            !1;
                                            try {
                                                for (a = 0; a < i.buffered.length; a++) if (n = i.buffered.start(a), s = i.buffered.end(a), navigator.userAgent.toLowerCase().indexOf("firefox") !== -1 && t === Number.POSITIVE_INFINITY ? (o = e, l = t) : (o = Math.max(n, e), l = Math.min(s, t)), Math.min(l, s) - o > .5) return this.flushBufferCounter++,
                                                f.logger.log("flush " + d + " [" + o + "," + l + "], of [" + n + "," + s + "], pos:" + this.media.currentTime),
                                                i.remove(o, l),
                                                !1
                                            } catch(c) {
                                                f.logger.warn("exception while accessing sourcebuffer, it might have been removed from MediaSource")
                                            }
                                        }
                                    } else f.logger.warn("abort flushing too many retries");
                                    f.logger.log("buffer flushed")
                                }
                                return ! 0
                            }
                        }]),
                        t
                    } (c["default"]);
                    r["default"] = v
                },
                {
                    30 : 30,
                    31 : 31,
                    32 : 32,
                    51 : 51
                }],
                9 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    function n(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return ! t || "object" != typeof t && "function" != typeof t ? e: t
                    }
                    function s(e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var o = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    l = e(32),
                    u = i(l),
                    d = e(31),
                    c = i(d),
                    f = function(e) {
                        function t(e) {
                            return a(this, t),
                            n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u["default"].FPS_DROP_LEVEL_CAPPING, u["default"].MEDIA_ATTACHING, u["default"].MANIFEST_PARSED))
                        }
                        return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function() {
                                this.hls.config.capLevelToPlayerSize && (this.media = this.restrictedLevels = null, this.autoLevelCapping = Number.POSITIVE_INFINITY, this.timer && (this.timer = clearInterval(this.timer)))
                            }
                        },
                        {
                            key: "onFpsDropLevelCapping",
                            value: function(e) {
                                t.isLevelAllowed(e.droppedLevel, this.restrictedLevels) && this.restrictedLevels.push(e.droppedLevel)
                            }
                        },
                        {
                            key: "onMediaAttaching",
                            value: function(e) {
                                this.media = e.media instanceof HTMLVideoElement ? e.media: null
                            }
                        },
                        {
                            key: "onManifestParsed",
                            value: function(e) {
                                var t = this.hls;
                                t.config.capLevelToPlayerSize && (this.autoLevelCapping = Number.POSITIVE_INFINITY, this.levels = e.levels, t.firstLevel = this.getMaxLevel(e.firstLevel), clearInterval(this.timer), this.timer = setInterval(this.detectPlayerSize.bind(this), 1e3), this.detectPlayerSize())
                            }
                        },
                        {
                            key: "detectPlayerSize",
                            value: function() {
                                if (this.media) {
                                    var e = this.levels ? this.levels.length: 0;
                                    if (e) {
                                        var t = this.hls;
                                        t.autoLevelCapping = this.getMaxLevel(e - 1),
                                        t.autoLevelCapping > this.autoLevelCapping && t.streamController.nextLevelSwitch(),
                                        this.autoLevelCapping = t.autoLevelCapping
                                    }
                                }
                            }
                        },
                        {
                            key: "getMaxLevel",
                            value: function(e) {
                                var r = this;
                                if (!this.levels) return - 1;
                                var i = this.levels.filter(function(i, a) {
                                    return t.isLevelAllowed(a, r.restrictedLevels) && a <= e
                                });
                                return t.getMaxLevelByMediaSize(i, this.mediaWidth, this.mediaHeight)
                            }
                        },
                        {
                            key: "mediaWidth",
                            get: function() {
                                var e = void 0,
                                r = this.media;
                                return r && (e = r.width || r.clientWidth || r.offsetWidth, e *= t.contentScaleFactor),
                                e
                            }
                        },
                        {
                            key: "mediaHeight",
                            get: function() {
                                var e = void 0,
                                r = this.media;
                                return r && (e = r.height || r.clientHeight || r.offsetHeight, e *= t.contentScaleFactor),
                                e
                            }
                        }], [{
                            key: "isLevelAllowed",
                            value: function(e) {
                                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                                return t.indexOf(e) === -1
                            }
                        },
                        {
                            key: "getMaxLevelByMediaSize",
                            value: function(e, t, r) {
                                if (!e || e && !e.length) return - 1;
                                for (var i = function(e, t) {
                                    return ! t || (e.width !== t.width || e.height !== t.height)
                                },
                                a = e.length - 1, n = 0; n < e.length; n += 1) {
                                    var s = e[n];
                                    if ((s.width >= t || s.height >= r) && i(s, e[n + 1])) {
                                        a = n;
                                        break
                                    }
                                }
                                return a
                            }
                        },
                        {
                            key: "contentScaleFactor",
                            get: function() {
                                var e = 1;
                                try {
                                    e = window.devicePixelRatio
                                } catch(t) {}
                                return e
                            }
                        }]),
                        t
                    } (c["default"]);
                    r["default"] = f
                },
                {
                    31 : 31,
                    32 : 32
                }],
                10 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    function n(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return ! t || "object" != typeof t && "function" != typeof t ? e: t
                    }
                    function s(e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var o = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    l = e(32),
                    u = i(l),
                    d = e(31),
                    c = i(d),
                    f = e(51),
                    h = function(e) {
                        function t(e) {
                            return a(this, t),
                            n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u["default"].MEDIA_ATTACHING))
                        }
                        return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function() {
                                this.timer && clearInterval(this.timer),
                                this.isVideoPlaybackQualityAvailable = !1
                            }
                        },
                        {
                            key: "onMediaAttaching",
                            value: function(e) {
                                var t = this.hls.config;
                                if (t.capLevelOnFPSDrop) {
                                    var r = this.video = e.media instanceof HTMLVideoElement ? e.media: null;
                                    "function" == typeof r.getVideoPlaybackQuality && (this.isVideoPlaybackQualityAvailable = !0),
                                    clearInterval(this.timer),
                                    this.timer = setInterval(this.checkFPSInterval.bind(this), t.fpsDroppedMonitoringPeriod)
                                }
                            }
                        },
                        {
                            key: "checkFPS",
                            value: function(e, t, r) {
                                var i = performance.now();
                                if (t) {
                                    if (this.lastTime) {
                                        var a = i - this.lastTime,
                                        n = r - this.lastDroppedFrames,
                                        s = t - this.lastDecodedFrames,
                                        o = 1e3 * n / a,
                                        l = this.hls;
                                        if (l.trigger(u["default"].FPS_DROP, {
                                            currentDropped: n,
                                            currentDecoded: s,
                                            totalDroppedFrames: r
                                        }), o > 0 && n > l.config.fpsDroppedMonitoringThreshold * s) {
                                            var d = l.currentLevel;
                                            f.logger.warn("drop FPS ratio greater than max allowed value for currentLevel: " + d),
                                            d > 0 && (l.autoLevelCapping === -1 || l.autoLevelCapping >= d) && (d -= 1, l.trigger(u["default"].FPS_DROP_LEVEL_CAPPING, {
                                                level: d,
                                                droppedLevel: l.currentLevel
                                            }), l.autoLevelCapping = d, l.streamController.nextLevelSwitch())
                                        }
                                    }
                                    this.lastTime = i,
                                    this.lastDroppedFrames = r,
                                    this.lastDecodedFrames = t
                                }
                            }
                        },
                        {
                            key: "checkFPSInterval",
                            value: function() {
                                var e = this.video;
                                if (e) if (this.isVideoPlaybackQualityAvailable) {
                                    var t = e.getVideoPlaybackQuality();
                                    this.checkFPS(e, t.totalVideoFrames, t.droppedVideoFrames)
                                } else this.checkFPS(e, e.webkitDecodedFrameCount, e.webkitDroppedFrameCount)
                            }
                        }]),
                        t
                    } (c["default"]);
                    r["default"] = h
                },
                {
                    31 : 31,
                    32 : 32,
                    51 : 51
                }],
                11 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    function n(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return ! t || "object" != typeof t && "function" != typeof t ? e: t
                    }
                    function s(e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var o = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    l = e(32),
                    u = i(l),
                    d = e(31),
                    c = i(d),
                    f = e(51),
                    h = e(30),
                    v = e(34),
                    g = i(v),
                    p = function(e) {
                        function t(e) {
                            a(this, t);
                            var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u["default"].MANIFEST_LOADED, u["default"].LEVEL_LOADED, u["default"].FRAG_LOADED, u["default"].ERROR));
                            return r.ontick = r.tick.bind(r),
                            r._manualLevel = -1,
                            r
                        }
                        return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function() {
                                this.timer && (clearTimeout(this.timer), this.timer = null),
                                this._manualLevel = -1
                            }
                        },
                        {
                            key: "startLoad",
                            value: function() {
                                this.canload = !0;
                                var e = this._levels;
                                e && e.forEach(function(e) {
                                    e.loadError = 0;
                                    var t = e.details;
                                    t && t.live && (e.details = void 0)
                                }),
                                this.timer && this.tick()
                            }
                        },
                        {
                            key: "stopLoad",
                            value: function() {
                                this.canload = !1
                            }
                        },
                        {
                            key: "onManifestLoaded",
                            value: function(e) {
                                var t, r = [],
                                i = [],
                                a = {},
                                n = !1,
                                s = !1,
                                o = this.hls,
                                l = /chrome|firefox/.test(navigator.userAgent.toLowerCase()),
                                d = function(e, t) {
                                    return MediaSource.isTypeSupported(e + "/mp4;codecs=" + t)
                                };
                                if (e.levels.forEach(function(e) {
                                    e.videoCodec && (n = !0),
                                    l && e.audioCodec && e.audioCodec.indexOf("mp4a.40.34") !== -1 && (e.audioCodec = void 0),
                                    (e.audioCodec || e.attrs && e.attrs.AUDIO) && (s = !0);
                                    var t = a[e.bitrate];
                                    void 0 === t ? (a[e.bitrate] = r.length, e.url = [e.url], e.urlId = 0, r.push(e)) : r[t].url.push(e.url)
                                }), n && s ? r.forEach(function(e) {
                                    e.videoCodec && i.push(e)
                                }) : i = r, i = i.filter(function(e) {
                                    var t = e.audioCodec,
                                    r = e.videoCodec;
                                    return (!t || d("audio", t)) && (!r || d("video", r))
                                }), i.length) {
                                    t = i[0].bitrate,
                                    i.sort(function(e, t) {
                                        return e.bitrate - t.bitrate
                                    }),
                                    this._levels = i;
                                    for (var c = 0; c < i.length; c++) if (i[c].bitrate === t) {
                                        this._firstLevel = c,
                                        f.logger.log("manifest loaded," + i.length + " level(s) found, first bitrate:" + t);
                                        break
                                    }
                                    o.trigger(u["default"].MANIFEST_PARSED, {
                                        levels: i,
                                        firstLevel: this._firstLevel,
                                        stats: e.stats,
                                        audio: s,
                                        video: n,
                                        altAudio: e.audioTracks.length > 0
                                    })
                                } else o.trigger(u["default"].ERROR, {
                                    type: h.ErrorTypes.MEDIA_ERROR,
                                    details: h.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR,
                                    fatal: !0,
                                    url: o.url,
                                    reason: "no level with compatible codecs found in manifest"
                                })
                            }
                        },
                        {
                            key: "setLevelInternal",
                            value: function(e) {
                                var t = this._levels,
                                r = this.hls;
                                if (e >= 0 && e < t.length) {
                                    if (this.timer && (clearTimeout(this.timer), this.timer = null), this._level !== e) {
                                        f.logger.log("switching to level " + e),
                                        this._level = e;
                                        var i = t[e];
                                        i.level = e,
                                        r.trigger(u["default"].LEVEL_SWITCH, i),
                                        r.trigger(u["default"].LEVEL_SWITCHING, i)
                                    }
                                    var a = t[e],
                                    n = a.details;
                                    if (!n || n.live === !0) {
                                        var s = a.urlId;
                                        r.trigger(u["default"].LEVEL_LOADING, {
                                            url: a.url[s],
                                            level: e,
                                            id: s
                                        })
                                    }
                                } else r.trigger(u["default"].ERROR, {
                                    type: h.ErrorTypes.OTHER_ERROR,
                                    details: h.ErrorDetails.LEVEL_SWITCH_ERROR,
                                    level: e,
                                    fatal: !1,
                                    reason: "invalid level idx"
                                })
                            }
                        },
                        {
                            key: "onError",
                            value: function(e) {
                                if (!e.fatal) {
                                    var t = e.details,
                                    r = this.hls,
                                    i = void 0,
                                    a = void 0,
                                    n = !1,
                                    s = !1;
                                    switch (t) {
                                    case h.ErrorDetails.FRAG_LOAD_ERROR:
                                    case h.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                    case h.ErrorDetails.FRAG_LOOP_LOADING_ERROR:
                                    case h.ErrorDetails.KEY_LOAD_ERROR:
                                    case h.ErrorDetails.KEY_LOAD_TIMEOUT:
                                        i = e.frag.level;
                                        break;
                                    case h.ErrorDetails.LEVEL_LOAD_ERROR:
                                    case h.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                                        i = e.context.level,
                                        n = !0;
                                        break;
                                    case h.ErrorDetails.REMUX_ALLOC_ERROR:
                                        i = e.level;
                                        break;
                                    case h.ErrorDetails.MANIFEST_EMPTY_ERROR:
                                        i = e.context.level,
                                        n = !0,
                                        s = !0
                                    }
                                    if (void 0 !== i) {
                                        a = this._levels[i],
                                        a.loadError ? a.loadError++:a.loadError = 1;
                                        var o = a.url.length;
                                        if (o > 1 && a.loadError < o) a.urlId = (a.urlId + 1) % o,
                                        a.details = void 0,
                                        f.logger.warn("level controller," + t + " for level " + i + ": switching to redundant stream id " + a.urlId);
                                        else {
                                            s && (f.logger.warn("Bad level encountered, removing & forcing to auto mode"), this._levels = this.levels.filter(function(e, t) {
                                                return t !== i
                                            }), r.currentLevel = -1, r.trigger(u["default"].LEVEL_REMOVED, {
                                                level: i
                                            }));
                                            var l = this._manualLevel === -1 && i;
                                            if (l) f.logger.warn("level controller," + t + ": switch-down for next fragment"),
                                            r.nextAutoLevel = Math.max(0, i - 1);
                                            else if (a && a.details && a.details.live) f.logger.warn("level controller," + t + " on live stream, discard"),
                                            n && (this._level = void 0);
                                            else if (t === h.ErrorDetails.LEVEL_LOAD_ERROR || t === h.ErrorDetails.LEVEL_LOAD_TIMEOUT) {
                                                var d = r.media,
                                                c = d && g["default"].isBuffered(d, d.currentTime) && g["default"].isBuffered(d, d.currentTime + .5);
                                                if (c) {
                                                    var v = r.config.levelLoadingRetryDelay;
                                                    f.logger.warn("level controller," + t + ", but media buffered, retry in " + v + "ms"),
                                                    this.timer = setTimeout(this.ontick, v)
                                                } else f.logger.error("cannot recover " + t + " error"),
                                                this._level = void 0,
                                                this.timer && (clearTimeout(this.timer), this.timer = null),
                                                e.fatal = !0
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        {
                            key: "onFragLoaded",
                            value: function(e) {
                                var t = e.frag;
                                if (t && "main" === t.type) {
                                    var r = this._levels[t.level];
                                    r && (r.loadError = 0)
                                }
                            }
                        },
                        {
                            key: "onLevelLoaded",
                            value: function(e) {
                                var t = e.level;
                                if (t === this._level) {
                                    var r = this._levels[t];
                                    r.loadError = 0;
                                    var i = e.details;
                                    if (i.live) {
                                        var a = 1e3 * (i.averagetargetduration ? i.averagetargetduration: i.targetduration),
                                        n = this._levels[e.level],
                                        s = n.details;
                                        s && i.endSN === s.endSN && (a /= 2, f.logger.log("same live playlist, reload twice faster")),
                                        a -= performance.now() - e.stats.trequest,
                                        a = Math.max(1e3, Math.round(a)),
                                        f.logger.log("live playlist, reload in " + a + " ms"),
                                        this.timer = setTimeout(this.ontick, a)
                                    } else this.timer = null
                                }
                            }
                        },
                        {
                            key: "tick",
                            value: function() {
                                var e = this._level;
                                if (void 0 !== e && this.canload) {
                                    var t = this._levels[e];
                                    if (t && t.url) {
                                        var r = t.urlId;
                                        this.hls.trigger(u["default"].LEVEL_LOADING, {
                                            url: t.url[r],
                                            level: e,
                                            id: r
                                        })
                                    }
                                }
                            }
                        },
                        {
                            key: "levels",
                            get: function() {
                                return this._levels
                            }
                        },
                        {
                            key: "level",
                            get: function() {
                                return this._level
                            },
                            set: function(e) {
                                var t = this._levels;
                                t && t.length > e && (this._level === e && void 0 !== t[e].details || this.setLevelInternal(e))
                            }
                        },
                        {
                            key: "manualLevel",
                            get: function() {
                                return this._manualLevel
                            },
                            set: function(e) {
                                this._manualLevel = e,
                                void 0 === this._startLevel && (this._startLevel = e),
                                e !== -1 && (this.level = e)
                            }
                        },
                        {
                            key: "firstLevel",
                            get: function() {
                                return this._firstLevel
                            },
                            set: function(e) {
                                this._firstLevel = e
                            }
                        },
                        {
                            key: "startLevel",
                            get: function() {
                                if (void 0 === this._startLevel) {
                                    var e = this.hls.config.startLevel;
                                    return void 0 !== e ? e: this._firstLevel
                                }
                                return this._startLevel
                            },
                            set: function(e) {
                                this._startLevel = e
                            }
                        },
                        {
                            key: "nextLoadLevel",
                            get: function() {
                                return this._manualLevel !== -1 ? this._manualLevel: this.hls.nextAutoLevel
                            },
                            set: function(e) {
                                this.level = e,
                                this._manualLevel === -1 && (this.hls.nextAutoLevel = e)
                            }
                        }]),
                        t
                    } (c["default"]);
                    r["default"] = p
                },
                {
                    30 : 30,
                    31 : 31,
                    32 : 32,
                    34 : 34,
                    51 : 51
                }],
                12 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function");
                    }
                    function n(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return ! t || "object" != typeof t && "function" != typeof t ? e: t
                    }
                    function s(e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var o = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    l = e(45),
                    u = i(l),
                    d = e(34),
                    c = i(d),
                    f = e(24),
                    h = i(f),
                    v = e(32),
                    g = i(v),
                    p = e(31),
                    y = i(p),
                    m = e(35),
                    T = i(m),
                    E = e(52),
                    k = i(E),
                    b = e(30),
                    _ = e(51),
                    R = e(48),
                    A = {
                        STOPPED: "STOPPED",
                        IDLE: "IDLE",
                        KEY_LOADING: "KEY_LOADING",
                        FRAG_LOADING: "FRAG_LOADING",
                        FRAG_LOADING_WAITING_RETRY: "FRAG_LOADING_WAITING_RETRY",
                        WAITING_LEVEL: "WAITING_LEVEL",
                        PARSING: "PARSING",
                        PARSED: "PARSED",
                        BUFFER_FLUSHING: "BUFFER_FLUSHING",
                        ENDED: "ENDED",
                        ERROR: "ERROR"
                    },
                    S = function(e) {
                        function t(e) {
                            a(this, t);
                            var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, g["default"].MEDIA_ATTACHED, g["default"].MEDIA_DETACHING, g["default"].MANIFEST_LOADING, g["default"].MANIFEST_PARSED, g["default"].LEVEL_LOADED, g["default"].KEY_LOADED, g["default"].FRAG_LOADED, g["default"].FRAG_LOAD_EMERGENCY_ABORTED, g["default"].FRAG_PARSING_INIT_SEGMENT, g["default"].FRAG_PARSING_DATA, g["default"].FRAG_PARSED, g["default"].ERROR, g["default"].AUDIO_TRACK_SWITCHING, g["default"].AUDIO_TRACK_SWITCHED, g["default"].BUFFER_CREATED, g["default"].BUFFER_APPENDED, g["default"].BUFFER_FLUSHED, g["default"].LEVEL_REMOVED));
                            return r.config = e.config,
                            r.audioCodecSwap = !1,
                            r.ticks = 0,
                            r._state = A.STOPPED,
                            r.ontick = r.tick.bind(r),
                            r
                        }
                        return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function() {
                                this.stopLoad(),
                                this.timer && (clearInterval(this.timer), this.timer = null),
                                y["default"].prototype.destroy.call(this),
                                this.state = A.STOPPED
                            }
                        },
                        {
                            key: "startLoad",
                            value: function(e) {
                                if (this.levels) {
                                    var t = this.lastCurrentTime,
                                    r = this.hls;
                                    if (this.stopLoad(), this.timer || (this.timer = setInterval(this.ontick, 100)), this.level = -1, this.fragLoadError = 0, !this.startFragRequested) {
                                        var i = r.startLevel;
                                        i === -1 && (i = 0, this.bitrateTest = !0),
                                        this.level = r.nextLoadLevel = i,
                                        this.loadedmetadata = !1
                                    }
                                    t > 0 && e === -1 && (_.logger.log("override startPosition with lastCurrentTime @" + t.toFixed(3)), e = t),
                                    this.state = A.IDLE,
                                    this.nextLoadPosition = this.startPosition = this.lastCurrentTime = e,
                                    this.tick()
                                } else this.forceStartLoad = !0,
                                this.state = A.STOPPED
                            }
                        },
                        {
                            key: "stopLoad",
                            value: function() {
                                var e = this.fragCurrent;
                                e && (e.loader && e.loader.abort(), this.fragCurrent = null),
                                this.fragPrevious = null,
                                this.demuxer && (this.demuxer.destroy(), this.demuxer = null),
                                this.state = A.STOPPED,
                                this.forceStartLoad = !1
                            }
                        },
                        {
                            key: "tick",
                            value: function() {
                                this.ticks++,
                                1 === this.ticks && (this.doTick(), this.ticks > 1 && setTimeout(this.tick, 1), this.ticks = 0)
                            }
                        },
                        {
                            key: "doTick",
                            value: function() {
                                switch (this.state) {
                                case A.ERROR:
                                    break;
                                case A.BUFFER_FLUSHING:
                                    this.fragLoadError = 0;
                                    break;
                                case A.IDLE:
                                    if (!this._doTickIdle()) return;
                                    break;
                                case A.WAITING_LEVEL:
                                    var e = this.levels[this.level];
                                    e && e.details && (this.state = A.IDLE);
                                    break;
                                case A.FRAG_LOADING_WAITING_RETRY:
                                    var t = performance.now(),
                                    r = this.retryDate; (!r || t >= r || this.media && this.media.seeking) && (_.logger.log("mediaController: retryDate reached, switch back to IDLE state"), this.state = A.IDLE);
                                    break;
                                case A.ERROR:
                                case A.STOPPED:
                                case A.FRAG_LOADING:
                                case A.PARSING:
                                case A.PARSED:
                                case A.ENDED:
                                }
                                this._checkBuffer(),
                                this._checkFragmentChanged()
                            }
                        },
                        {
                            key: "_doTickIdle",
                            value: function() {
                                var e = this.hls,
                                t = e.config,
                                r = this.media;
                                if (void 0 !== this.levelLastLoaded && !r && (this.startFragRequested || !t.startFragPrefetch)) return ! 0;
                                var i = 0;
                                this.loadedmetadata ? i = r.currentTime: this.nextLoadPosition && (i = this.nextLoadPosition);
                                var a = e.nextLoadLevel,
                                n = this.levels[a],
                                s = n.bitrate,
                                o = void 0;
                                o = s ? Math.max(8 * t.maxBufferSize / s, t.maxBufferLength) : t.maxBufferLength,
                                o = Math.min(o, t.maxMaxBufferLength);
                                var l = c["default"].bufferInfo(this.mediaBuffer ? this.mediaBuffer: r, i, t.maxBufferHole),
                                u = l.len;
                                if (u >= o) return ! 0;
                                _.logger.trace("buffer length of " + u.toFixed(3) + " is below max of " + o.toFixed(3) + ". checking for more payload ..."),
                                this.level = e.nextLoadLevel = a;
                                var d = n.details;
                                if ("undefined" == typeof d || d.live && this.levelLastLoaded !== a) return this.state = A.WAITING_LEVEL,
                                !0;
                                var f = this.fragPrevious;
                                if (!d.live && f && f.sn === d.endSN) {
                                    var h = Math.min(r.duration, f.start + f.duration);
                                    if (h - Math.max(l.end, f.start) <= Math.max(.2, f.duration / 2)) {
                                        var v = {};
                                        return this.altAudio && (v.type = "video"),
                                        this.hls.trigger(g["default"].BUFFER_EOS, v),
                                        this.state = A.ENDED,
                                        !0
                                    }
                                }
                                return this._fetchPayloadOrEos(i, l, d)
                            }
                        },
                        {
                            key: "_fetchPayloadOrEos",
                            value: function(e, t, r) {
                                var i = this.fragPrevious,
                                a = this.level,
                                n = r.fragments,
                                s = n.length;
                                if (0 === s) return ! 1;
                                var o = n[0].start,
                                l = n[s - 1].start + n[s - 1].duration,
                                u = t.end,
                                d = void 0;
                                if (r.initSegment && !r.initSegment.data) d = r.initSegment;
                                else if (r.live) {
                                    var c = this.config.initialLiveManifestSize;
                                    if (s < c) return _.logger.warn("Can not start playback of a level, reason: not enough fragments " + s + " < " + c),
                                    !1;
                                    if (d = this._ensureFragmentAtLivePoint(r, u, o, l, i, n, s), null === d) return ! 1
                                } else u < o && (d = n[0]);
                                return d || (d = this._findFragment(o, i, s, n, u, l, r)),
                                !d || this._loadFragmentOrKey(d, a, r, e, u)
                            }
                        },
                        {
                            key: "_ensureFragmentAtLivePoint",
                            value: function(e, t, r, i, a, n, s) {
                                var o = this.hls.config,
                                l = this.media,
                                u = void 0,
                                d = void 0 !== o.liveMaxLatencyDuration ? o.liveMaxLatencyDuration: o.liveMaxLatencyDurationCount * e.targetduration;
                                if (t < Math.max(r - o.maxFragLookUpTolerance, i - d)) {
                                    var c = this.liveSyncPosition = this.computeLivePosition(r, e);
                                    _.logger.log("buffer end: " + t.toFixed(3) + " is located too far from the end of live sliding playlist, reset currentTime to : " + c.toFixed(3)),
                                    t = c,
                                    l && l.readyState && l.duration > c && (l.currentTime = c),
                                    this.nextLoadPosition = c
                                }
                                if (e.PTSKnown && t > i && l && l.readyState) return null;
                                if (this.startFragRequested && !e.PTSKnown) {
                                    if (a) {
                                        var f = a.sn + 1,
                                        h = a.cc + 1;
                                        f >= e.startSN && f <= e.endSN ? (u = n[f - e.startSN], _.logger.log("live playlist, switching playlist, load frag with next SN: " + u.sn)) : h >= e.startCC && h <= e.endCC && (u = (0, R.findFirstFragWithCC)(n, h), _.logger.log("Live playlist switch, cannot find frag with target SN. Loading frag with next CC: " + u.cc))
                                    }
                                    u || (u = n[Math.min(s - 1, Math.round(s / 2))], _.logger.log("live playlist, switching playlist, unknown, load middle frag : " + u.sn))
                                }
                                return u
                            }
                        },
                        {
                            key: "_findFragment",
                            value: function(e, t, r, i, a, n, s) {
                                var o = this.hls.config,
                                l = void 0,
                                d = void 0,
                                c = o.maxFragLookUpTolerance,
                                f = t ? i[t.sn - i[0].sn + 1] : void 0,
                                h = function(e) {
                                    var t = Math.min(c, e.duration);
                                    return e.start + e.duration - t <= a ? 1 : e.start - t > a && e.start ? -1 : 0
                                };
                                if (a < n ? (a > n - c && (c = 0), d = f && !h(f) ? f: u["default"].search(i, h)) : d = i[r - 1], d) {
                                    l = d;
                                    var v = l.sn - s.startSN,
                                    g = t && l.level === t.level,
                                    p = i[v - 1],
                                    y = i[v + 1];
                                    if (t && l.sn === t.sn) if (g && !l.backtracked) if (l.sn < s.endSN) {
                                        var m = t.deltaPTS;
                                        m && m > o.maxBufferHole && t.dropped && v && !l.backtracked ? (l = p, _.logger.warn("SN just loaded, with large PTS gap between audio and video, maybe frag is not starting with a keyframe ? load previous one to try to overcome this"), t.loadCounter--) : (l = y, _.logger.log("SN just loaded, load next one: " + l.sn))
                                    } else l = null;
                                    else l.backtracked && (y && y.backtracked ? (_.logger.warn("Already backtracked from fragment " + y.sn + ", will not backtrack to fragment " + l.sn + ". Loading fragment " + y.sn), l = y) : (_.logger.warn("Loaded fragment with dropped frames, backtracking 1 segment to find a keyframe"), l.dropped = 0, p ? (p.loadCounter && p.loadCounter--, l = p, l.backtracked = !0) : v && (l = null)))
                                }
                                return l
                            }
                        },
                        {
                            key: "_loadFragmentOrKey",
                            value: function(e, t, r, i, a) {
                                var n = this.hls,
                                s = n.config;
                                if (!e.decryptdata || null == e.decryptdata.uri || null != e.decryptdata.key) {
                                    if (_.logger.log("Loading " + e.sn + " of [" + r.startSN + " ," + r.endSN + "],level " + t + ", currentTime:" + i.toFixed(3) + ",bufferEnd:" + a), void 0 !== this.fragLoadIdx ? this.fragLoadIdx++:this.fragLoadIdx = 0, e.loadCounter) {
                                        e.loadCounter++;
                                        var o = s.fragLoadingLoopThreshold;
                                        if (e.loadCounter > o && Math.abs(this.fragLoadIdx - e.loadIdx) < o) return n.trigger(g["default"].ERROR, {
                                            type: b.ErrorTypes.MEDIA_ERROR,
                                            details: b.ErrorDetails.FRAG_LOOP_LOADING_ERROR,
                                            fatal: !1,
                                            frag: e
                                        }),
                                        !1
                                    } else e.loadCounter = 1;
                                    return e.loadIdx = this.fragLoadIdx,
                                    e.autoLevel = n.autoLevelEnabled,
                                    e.bitrateTest = this.bitrateTest,
                                    this.fragCurrent = e,
                                    this.startFragRequested = !0,
                                    isNaN(e.sn) || e.bitrateTest || (this.nextLoadPosition = e.start + e.duration),
                                    n.trigger(g["default"].FRAG_LOADING, {
                                        frag: e
                                    }),
                                    this.demuxer || (this.demuxer = new h["default"](n, "main")),
                                    this.state = A.FRAG_LOADING,
                                    !0
                                }
                                _.logger.log("Loading key for " + e.sn + " of [" + r.startSN + " ," + r.endSN + "],level " + t),
                                this.state = A.KEY_LOADING,
                                n.trigger(g["default"].KEY_LOADING, {
                                    frag: e
                                })
                            }
                        },
                        {
                            key: "getBufferedFrag",
                            value: function(e) {
                                return u["default"].search(this._bufferedFrags,
                                function(t) {
                                    return e < t.startPTS ? -1 : e > t.endPTS ? 1 : 0
                                })
                            }
                        },
                        {
                            key: "followingBufferedFrag",
                            value: function(e) {
                                return e ? this.getBufferedFrag(e.endPTS + .5) : null
                            }
                        },
                        {
                            key: "_checkFragmentChanged",
                            value: function() {
                                var e, t, r = this.media;
                                if (r && r.readyState && r.seeking === !1 && (t = r.currentTime, t > r.playbackRate * this.lastCurrentTime && (this.lastCurrentTime = t), c["default"].isBuffered(r, t) ? e = this.getBufferedFrag(t) : c["default"].isBuffered(r, t + .1) && (e = this.getBufferedFrag(t + .1)), e)) {
                                    var i = e;
                                    if (i !== this.fragPlaying) {
                                        this.hls.trigger(g["default"].FRAG_CHANGED, {
                                            frag: i
                                        });
                                        var a = i.level;
                                        this.fragPlaying && this.fragPlaying.level === a || this.hls.trigger(g["default"].LEVEL_SWITCHED, {
                                            level: a
                                        }),
                                        this.fragPlaying = i
                                    }
                                }
                            }
                        },
                        {
                            key: "immediateLevelSwitch",
                            value: function() {
                                if (_.logger.log("immediateLevelSwitch"), !this.immediateSwitch) {
                                    this.immediateSwitch = !0;
                                    var e = this.media,
                                    t = void 0;
                                    e ? (t = e.paused, e.pause()) : t = !0,
                                    this.previouslyPaused = t
                                }
                                var r = this.fragCurrent;
                                r && r.loader && r.loader.abort(),
                                this.fragCurrent = null,
                                this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold,
                                this.flushMainBuffer(0, Number.POSITIVE_INFINITY)
                            }
                        },
                        {
                            key: "immediateLevelSwitchEnd",
                            value: function() {
                                var e = this.media;
                                e && e.buffered.length && (this.immediateSwitch = !1, c["default"].isBuffered(e, e.currentTime) && (e.currentTime -= 1e-4), this.previouslyPaused || e.play())
                            }
                        },
                        {
                            key: "nextLevelSwitch",
                            value: function() {
                                var e = this.media;
                                if (e && e.readyState) {
                                    var t = void 0,
                                    r = void 0,
                                    i = void 0;
                                    if (this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold, r = this.getBufferedFrag(e.currentTime), r && r.startPTS > 1 && this.flushMainBuffer(0, r.startPTS - 1), e.paused) t = 0;
                                    else {
                                        var a = this.hls.nextLoadLevel,
                                        n = this.levels[a],
                                        s = this.fragLastKbps;
                                        t = s && this.fragCurrent ? this.fragCurrent.duration * n.bitrate / (1e3 * s) + 1 : 0
                                    }
                                    if (i = this.getBufferedFrag(e.currentTime + t), i && (i = this.followingBufferedFrag(i))) {
                                        var o = this.fragCurrent;
                                        o && o.loader && o.loader.abort(),
                                        this.fragCurrent = null,
                                        this.flushMainBuffer(i.startPTS, Number.POSITIVE_INFINITY)
                                    }
                                }
                            }
                        },
                        {
                            key: "flushMainBuffer",
                            value: function(e, t) {
                                this.state = A.BUFFER_FLUSHING;
                                var r = {
                                    startOffset: e,
                                    endOffset: t
                                };
                                this.altAudio && (r.type = "video"),
                                this.hls.trigger(g["default"].BUFFER_FLUSHING, r)
                            }
                        },
                        {
                            key: "onMediaAttached",
                            value: function(e) {
                                var t = this.media = this.mediaBuffer = e.media;
                                this.onvseeking = this.onMediaSeeking.bind(this),
                                this.onvseeked = this.onMediaSeeked.bind(this),
                                this.onvended = this.onMediaEnded.bind(this),
                                t.addEventListener("seeking", this.onvseeking),
                                t.addEventListener("seeked", this.onvseeked),
                                t.addEventListener("ended", this.onvended);
                                var r = this.config;
                                this.levels && r.autoStartLoad && this.hls.startLoad(r.startPosition)
                            }
                        },
                        {
                            key: "onMediaDetaching",
                            value: function() {
                                var e = this.media;
                                e && e.ended && (_.logger.log("MSE detaching and video ended, reset startPosition"), this.startPosition = this.lastCurrentTime = 0);
                                var t = this.levels;
                                t && t.forEach(function(e) {
                                    e.details && e.details.fragments.forEach(function(e) {
                                        e.loadCounter = void 0,
                                        e.backtracked = void 0
                                    })
                                }),
                                e && (e.removeEventListener("seeking", this.onvseeking), e.removeEventListener("seeked", this.onvseeked), e.removeEventListener("ended", this.onvended), this.onvseeking = this.onvseeked = this.onvended = null),
                                this.media = this.mediaBuffer = null,
                                this.loadedmetadata = !1,
                                this.stopLoad()
                            }
                        },
                        {
                            key: "onMediaSeeking",
                            value: function() {
                                var e = this.media,
                                t = e ? e.currentTime: void 0,
                                r = this.config;
                                if (_.logger.log("media seeking to " + t.toFixed(3)), this.state === A.FRAG_LOADING) {
                                    var i = this.mediaBuffer ? this.mediaBuffer: e,
                                    a = c["default"].bufferInfo(i, t, this.config.maxBufferHole),
                                    n = this.fragCurrent;
                                    if (0 === a.len && n) {
                                        var s = r.maxFragLookUpTolerance,
                                        o = n.start - s,
                                        l = n.start + n.duration + s;
                                        t < o || t > l ? (n.loader && (_.logger.log("seeking outside of buffer while fragment load in progress, cancel fragment load"), n.loader.abort()), this.fragCurrent = null, this.fragPrevious = null, this.state = A.IDLE) : _.logger.log("seeking outside of buffer but within currently loaded fragment range")
                                    }
                                } else this.state === A.ENDED && (this.state = A.IDLE);
                                e && (this.lastCurrentTime = t),
                                this.state !== A.FRAG_LOADING && void 0 !== this.fragLoadIdx && (this.fragLoadIdx += 2 * r.fragLoadingLoopThreshold),
                                this.loadedmetadata || (this.nextLoadPosition = this.startPosition = t),
                                this.tick()
                            }
                        },
                        {
                            key: "onMediaSeeked",
                            value: function() {
                                _.logger.log("media seeked to " + this.media.currentTime.toFixed(3)),
                                this.tick()
                            }
                        },
                        {
                            key: "onMediaEnded",
                            value: function() {
                                _.logger.log("media ended"),
                                this.startPosition = this.lastCurrentTime = 0
                            }
                        },
                        {
                            key: "onManifestLoading",
                            value: function() {
                                _.logger.log("trigger BUFFER_RESET"),
                                this.hls.trigger(g["default"].BUFFER_RESET),
                                this._bufferedFrags = [],
                                this.stalled = !1,
                                this.startPosition = this.lastCurrentTime = 0
                            }
                        },
                        {
                            key: "onManifestParsed",
                            value: function(e) {
                                var t, r = !1,
                                i = !1;
                                e.levels.forEach(function(e) {
                                    t = e.audioCodec,
                                    t && (t.indexOf("mp4a.40.2") !== -1 && (r = !0), t.indexOf("mp4a.40.5") !== -1 && (i = !0))
                                }),
                                this.audioCodecSwitch = r && i,
                                this.audioCodecSwitch && _.logger.log("both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"),
                                this.levels = e.levels,
                                this.startLevelLoaded = !1,
                                this.startFragRequested = !1;
                                var a = this.config; (a.autoStartLoad || this.forceStartLoad) && this.hls.startLoad(a.startPosition)
                            }
                        },
                        {
                            key: "onLevelLoaded",
                            value: function(e) {
                                var t = e.details,
                                r = e.level,
                                i = this.levels[this.levelLastLoaded],
                                a = this.levels[r],
                                n = t.totalduration,
                                s = 0;
                                if (_.logger.log("level " + r + " loaded [" + t.startSN + "," + t.endSN + "], cc [" + t.startCC + ", " + t.endCC + "] duration:" + n), t.live) {
                                    var o = a.details;
                                    o && t.fragments.length > 0 ? (T["default"].mergeDetails(o, t), s = t.fragments[0].start, this.liveSyncPosition = this.computeLivePosition(s, o), t.PTSKnown ? _.logger.log("live playlist sliding:" + s.toFixed(3)) : (_.logger.log("live playlist - outdated PTS, unknown sliding"), (0, R.alignDiscontinuities)(this.fragPrevious, i, t))) : (_.logger.log("live playlist - first load, unknown sliding"), t.PTSKnown = !1, (0, R.alignDiscontinuities)(this.fragPrevious, i, t))
                                } else t.PTSKnown = !1;
                                if (this.levelLastLoaded = r, a.details = t, this.hls.trigger(g["default"].LEVEL_UPDATED, {
                                    details: t,
                                    level: r
                                }), this.startFragRequested === !1) {
                                    if (this.startPosition === -1 || this.lastCurrentTime === -1) {
                                        var l = t.startTimeOffset;
                                        isNaN(l) ? t.live ? (this.startPosition = this.computeLivePosition(s, t), _.logger.log("configure startPosition to " + this.startPosition)) : this.startPosition = 0 : (l < 0 && (_.logger.log("negative start time offset " + l + ", count from end of last fragment"), l = s + n + l), _.logger.log("start time offset found in playlist, adjust startPosition to " + l), this.startPosition = l),
                                        this.lastCurrentTime = this.startPosition
                                    }
                                    this.nextLoadPosition = this.startPosition
                                }
                                this.state === A.WAITING_LEVEL && (this.state = A.IDLE),
                                this.tick()
                            }
                        },
                        {
                            key: "onKeyLoaded",
                            value: function() {
                                this.state === A.KEY_LOADING && (this.state = A.IDLE, this.tick())
                            }
                        },
                        {
                            key: "onFragLoaded",
                            value: function(e) {
                                var t = this.fragCurrent,
                                r = e.frag;
                                if (this.state === A.FRAG_LOADING && t && "main" === r.type && r.level === t.level && r.sn === t.sn) {
                                    var i = e.stats,
                                    a = this.levels[t.level],
                                    n = a.details;
                                    if (_.logger.log("Loaded  " + t.sn + " of [" + n.startSN + " ," + n.endSN + "],level " + t.level), this.bitrateTest = !1, this.stats = i, r.bitrateTest === !0 && this.hls.nextLoadLevel) this.state = A.IDLE,
                                    this.startFragRequested = !1,
                                    i.tparsed = i.tbuffered = performance.now(),
                                    this.hls.trigger(g["default"].FRAG_BUFFERED, {
                                        stats: i,
                                        frag: t,
                                        id: "main"
                                    }),
                                    this.tick();
                                    else if ("initSegment" === r.sn) this.state = A.IDLE,
                                    i.tparsed = i.tbuffered = performance.now(),
                                    n.initSegment.data = e.payload,
                                    this.hls.trigger(g["default"].FRAG_BUFFERED, {
                                        stats: i,
                                        frag: t,
                                        id: "main"
                                    }),
                                    this.tick();
                                    else {
                                        this.state = A.PARSING;
                                        var s = n.totalduration,
                                        o = t.level,
                                        l = t.sn,
                                        u = this.config.defaultAudioCodec || a.audioCodec;
                                        this.audioCodecSwap && (_.logger.log("swapping playlist audio codec"), void 0 === u && (u = this.lastAudioCodec), u && (u = u.indexOf("mp4a.40.5") !== -1 ? "mp4a.40.2": "mp4a.40.5")),
                                        this.pendingBuffering = !0,
                                        this.appended = !1,
                                        _.logger.log("Parsing " + l + " of [" + n.startSN + " ," + n.endSN + "],level " + o + ", cc " + t.cc);
                                        var d = this.demuxer;
                                        d || (d = this.demuxer = new h["default"](this.hls, "main"));
                                        var c = this.media,
                                        f = c && c.seeking,
                                        v = !f && (n.PTSKnown || !n.live),
                                        p = n.initSegment ? n.initSegment.data: [];
                                        d.push(e.payload, p, u, a.videoCodec, t, s, v, void 0)
                                    }
                                }
                                this.fragLoadError = 0
                            }
                        },
                        {
                            key: "onFragParsingInitSegment",
                            value: function(e) {
                                var t = this.fragCurrent,
                                r = e.frag;
                                if (t && "main" === e.id && r.sn === t.sn && r.level === t.level && this.state === A.PARSING) {
                                    var i, a, n = e.tracks;
                                    if (n.audio && this.altAudio && delete n.audio, a = n.audio) {
                                        var s = this.levels[this.level].audioCodec,
                                        o = navigator.userAgent.toLowerCase();
                                        s && this.audioCodecSwap && (_.logger.log("swapping playlist audio codec"), s = s.indexOf("mp4a.40.5") !== -1 ? "mp4a.40.2": "mp4a.40.5"),
                                        this.audioCodecSwitch && 1 !== a.metadata.channelCount && o.indexOf("firefox") === -1 && (s = "mp4a.40.5"),
                                        o.indexOf("android") !== -1 && "audio/mpeg" !== a.container && (s = "mp4a.40.2", _.logger.log("Android: force audio codec to " + s)),
                                        a.levelCodec = s,
                                        a.id = e.id
                                    }
                                    a = n.video,
                                    a && (a.levelCodec = this.levels[this.level].videoCodec, a.id = e.id),
                                    this.hls.trigger(g["default"].BUFFER_CODECS, n);
                                    for (i in n) {
                                        a = n[i],
                                        _.logger.log("main track:" + i + ",container:" + a.container + ",codecs[level/parsed]=[" + a.levelCodec + "/" + a.codec + "]");
                                        var l = a.initSegment;
                                        l && (this.appended = !0, this.pendingBuffering = !0, this.hls.trigger(g["default"].BUFFER_APPENDING, {
                                            type: i,
                                            data: l,
                                            parent: "main",
                                            content: "initSegment"
                                        }))
                                    }
                                    this.tick()
                                }
                            }
                        },
                        {
                            key: "onFragParsingData",
                            value: function(e) {
                                var t = this,
                                r = this.fragCurrent,
                                i = e.frag;
                                if (r && "main" === e.id && i.sn === r.sn && i.level === r.level && ("audio" !== e.type || !this.altAudio) && this.state === A.PARSING) {
                                    var a = this.levels[this.level],
                                    n = r;
                                    if (isNaN(e.endPTS) && (e.endPTS = e.startPTS + r.duration, e.endDTS = e.startDTS + r.duration), _.logger.log("Parsed " + e.type + ",PTS:[" + e.startPTS.toFixed(3) + "," + e.endPTS.toFixed(3) + "],DTS:[" + e.startDTS.toFixed(3) + "/" + e.endDTS.toFixed(3) + "],nb:" + e.nb + ",dropped:" + (e.dropped || 0)), "video" === e.type) if (n.dropped = e.dropped, n.dropped) {
                                        if (!n.backtracked) return _.logger.warn("missing video frame(s), backtracking fragment"),
                                        n.backtracked = !0,
                                        this.nextLoadPosition = e.startPTS,
                                        this.state = A.IDLE,
                                        this.fragPrevious = n,
                                        void this.tick();
                                        _.logger.warn("Already backtracked on this fragment, appending with the gap")
                                    } else n.backtracked = !1;
                                    var s = T["default"].updateFragPTSDTS(a.details, n.sn, e.startPTS, e.endPTS, e.startDTS, e.endDTS),
                                    o = this.hls;
                                    o.trigger(g["default"].LEVEL_PTS_UPDATED, {
                                        details: a.details,
                                        level: this.level,
                                        drift: s,
                                        type: e.type,
                                        start: e.startPTS,
                                        end: e.endPTS
                                    }),
                                    [e.data1, e.data2].forEach(function(r) {
                                        r && r.length && t.state === A.PARSING && (t.appended = !0, t.pendingBuffering = !0, o.trigger(g["default"].BUFFER_APPENDING, {
                                            type: e.type,
                                            data: r,
                                            parent: "main",
                                            content: "data"
                                        }))
                                    }),
                                    this.tick()
                                }
                            }
                        },
                        {
                            key: "onFragParsed",
                            value: function(e) {
                                var t = this.fragCurrent,
                                r = e.frag;
                                t && "main" === e.id && r.sn === t.sn && r.level === t.level && this.state === A.PARSING && (this.stats.tparsed = performance.now(), this.state = A.PARSED, this._checkAppendedParsed())
                            }
                        },
                        {
                            key: "onAudioTrackSwitching",
                            value: function(e) {
                                var t = !!e.url,
                                r = e.id;
                                if (!t) {
                                    if (this.mediaBuffer !== this.media) {
                                        _.logger.log("switching on main audio, use media.buffered to schedule main fragment loading"),
                                        this.mediaBuffer = this.media;
                                        var i = this.fragCurrent;
                                        i.loader && (_.logger.log("switching to main audio track, cancel main fragment load"), i.loader.abort()),
                                        this.fragCurrent = null,
                                        this.fragPrevious = null,
                                        this.demuxer && (this.demuxer.destroy(), this.demuxer = null),
                                        this.state = A.IDLE
                                    }
                                    var a = this.hls;
                                    a.trigger(g["default"].BUFFER_FLUSHING, {
                                        startOffset: 0,
                                        endOffset: Number.POSITIVE_INFINITY,
                                        type: "audio"
                                    }),
                                    a.trigger(g["default"].AUDIO_TRACK_SWITCHED, {
                                        id: r
                                    }),
                                    this.altAudio = !1
                                }
                            }
                        },
                        {
                            key: "onAudioTrackSwitched",
                            value: function(e) {
                                var t = e.id,
                                r = !!this.hls.audioTracks[t].url;
                                if (r) {
                                    var i = this.videoBuffer;
                                    i && this.mediaBuffer !== i && (_.logger.log("switching on alternate audio, use video.buffered to schedule main fragment loading"), this.mediaBuffer = i)
                                }
                                this.altAudio = r,
                                this.tick()
                            }
                        },
                        {
                            key: "onBufferCreated",
                            value: function(e) {
                                var t = e.tracks,
                                r = void 0,
                                i = void 0,
                                a = !1;
                                for (var n in t) {
                                    var s = t[n];
                                    "main" === s.id ? (i = n, r = s, "video" === n && (this.videoBuffer = t[n].buffer)) : a = !0
                                }
                                a && r ? (_.logger.log("alternate track found, use " + i + ".buffered to schedule main fragment loading"), this.mediaBuffer = r.buffer) : this.mediaBuffer = this.media
                            }
                        },
                        {
                            key: "onBufferAppended",
                            value: function(e) {
                                if ("main" === e.parent) {
                                    var t = this.state;
                                    t !== A.PARSING && t !== A.PARSED || (this.pendingBuffering = e.pending > 0, this._checkAppendedParsed())
                                }
                            }
                        },
                        {
                            key: "_checkAppendedParsed",
                            value: function() {
                                if (! (this.state !== A.PARSED || this.appended && this.pendingBuffering)) {
                                    var e = this.fragCurrent;
                                    if (e) {
                                        var t = this.mediaBuffer ? this.mediaBuffer: this.media;
                                        _.logger.log("main buffered : " + k["default"].toString(t.buffered));
                                        var r = this._bufferedFrags.filter(function(e) {
                                            return c["default"].isBuffered(t, (e.startPTS + e.endPTS) / 2)
                                        });
                                        r.push(e),
                                        this._bufferedFrags = r.sort(function(e, t) {
                                            return e.startPTS - t.startPTS
                                        }),
                                        this.fragPrevious = e;
                                        var i = this.stats;
                                        i.tbuffered = performance.now(),
                                        this.fragLastKbps = Math.round(8 * i.total / (i.tbuffered - i.tfirst)),
                                        this.hls.trigger(g["default"].FRAG_BUFFERED, {
                                            stats: i,
                                            frag: e,
                                            id: "main"
                                        }),
                                        this.state = A.IDLE
                                    }
                                    this.tick()
                                }
                            }
                        },
                        {
                            key: "onError",
                            value: function(e) {
                                var t = e.frag || this.fragCurrent;
                                if (!t || "main" === t.type) {
                                    var r = this.media,
                                    i = r && c["default"].isBuffered(r, r.currentTime) && c["default"].isBuffered(r, r.currentTime + .5);
                                    switch (e.details) {
                                    case b.ErrorDetails.FRAG_LOAD_ERROR:
                                    case b.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                    case b.ErrorDetails.KEY_LOAD_ERROR:
                                    case b.ErrorDetails.KEY_LOAD_TIMEOUT:
                                        if (!e.fatal) {
                                            var a = this.fragLoadError;
                                            a ? a++:a = 1;
                                            var n = this.config;
                                            if (a <= n.fragLoadingMaxRetry || i || t.autoLevel && t.level) {
                                                this.fragLoadError = a,
                                                t.loadCounter = 0;
                                                var s = Math.min(Math.pow(2, a - 1) * n.fragLoadingRetryDelay, n.fragLoadingMaxRetryTimeout);
                                                _.logger.warn("mediaController: frag loading failed, retry in " + s + " ms"),
                                                this.retryDate = performance.now() + s,
                                                this.loadedmetadata || (this.startFragRequested = !1, this.nextLoadPosition = this.startPosition),
                                                this.state = A.FRAG_LOADING_WAITING_RETRY
                                            } else _.logger.error("mediaController: " + e.details + " reaches max retry, redispatch as fatal ..."),
                                            e.fatal = !0,
                                            this.state = A.ERROR
                                        }
                                        break;
                                    case b.ErrorDetails.FRAG_LOOP_LOADING_ERROR:
                                        e.fatal || (i ? (this._reduceMaxBufferLength(t.duration), this.state = A.IDLE) : t.autoLevel && 0 !== t.level || (e.fatal = !0, this.state = A.ERROR));
                                        break;
                                    case b.ErrorDetails.LEVEL_LOAD_ERROR:
                                    case b.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                                        this.state !== A.ERROR && (e.fatal ? (this.state = A.ERROR, _.logger.warn("streamController: " + e.details + ",switch to " + this.state + " state ...")) : this.state === A.WAITING_LEVEL && (this.state = A.IDLE));
                                        break;
                                    case b.ErrorDetails.BUFFER_FULL_ERROR:
                                        "main" !== e.parent || this.state !== A.PARSING && this.state !== A.PARSED || (i ? (this._reduceMaxBufferLength(this.config.maxBufferLength), this.state = A.IDLE) : (_.logger.warn("buffer full error also media.currentTime is not buffered, flush everything"), this.fragCurrent = null, this.flushMainBuffer(0, Number.POSITIVE_INFINITY)))
                                    }
                                }
                            }
                        },
                        {
                            key: "_reduceMaxBufferLength",
                            value: function(e) {
                                var t = this.config;
                                t.maxMaxBufferLength >= e && (t.maxMaxBufferLength /= 2, _.logger.warn("main:reduce max buffer length to " + t.maxMaxBufferLength + "s"), this.fragLoadIdx += 2 * t.fragLoadingLoopThreshold)
                            }
                        },
                        {
                            key: "_checkBuffer",
                            value: function() {
                                var e = this.media;
                                if (e && e.readyState) {
                                    var t = e.currentTime,
                                    r = this.mediaBuffer ? this.mediaBuffer: e,
                                    i = r.buffered;
                                    if (!this.loadedmetadata && i.length) {
                                        this.loadedmetadata = !0;
                                        var a = e.seeking ? t: this.startPosition,
                                        n = c["default"].isBuffered(r, a);
                                        t === a && n || (_.logger.log("target start position:" + a), n || (a = i.start(0), _.logger.log("target start position not buffered, seek to buffered.start(0) " + a)), _.logger.log("adjust currentTime from " + t + " to " + a), e.currentTime = a)
                                    } else if (this.immediateSwitch) this.immediateLevelSwitchEnd();
                                    else {
                                        var s = c["default"].bufferInfo(e, t, 0),
                                        o = !(e.paused || e.ended || 0 === e.buffered.length),
                                        l = .5,
                                        u = t !== this.lastCurrentTime,
                                        d = this.config;
                                        if (u) this.stallReported && (_.logger.warn("playback not stuck anymore @" + t + ", after " + Math.round(performance.now() - this.stalled) + "ms"), this.stallReported = !1),
                                        this.stalled = void 0,
                                        this.nudgeRetry = 0;
                                        else if (o) {
                                            var f = performance.now(),
                                            h = this.hls;
                                            if (this.stalled) {
                                                var v = f - this.stalled,
                                                p = s.len,
                                                y = this.nudgeRetry || 0;
                                                if (p <= l && v > 1e3 * d.lowBufferWatchdogPeriod) {
                                                    this.stallReported || (this.stallReported = !0, _.logger.warn("playback stalling in low buffer @" + t), h.trigger(g["default"].ERROR, {
                                                        type: b.ErrorTypes.MEDIA_ERROR,
                                                        details: b.ErrorDetails.BUFFER_STALLED_ERROR,
                                                        fatal: !1,
                                                        buffer: p
                                                    }));
                                                    var m = s.nextStart,
                                                    T = m - t;
                                                    if (m && T < d.maxSeekHole && T > 0) {
                                                        this.nudgeRetry = ++y;
                                                        var E = y * d.nudgeOffset;
                                                        _.logger.log("adjust currentTime from " + e.currentTime + " to next buffered @ " + m + " + nudge " + E),
                                                        e.currentTime = m + E,
                                                        this.stalled = void 0,
                                                        h.trigger(g["default"].ERROR, {
                                                            type: b.ErrorTypes.MEDIA_ERROR,
                                                            details: b.ErrorDetails.BUFFER_SEEK_OVER_HOLE,
                                                            fatal: !1,
                                                            hole: m + E - t
                                                        })
                                                    }
                                                } else if (p > l && v > 1e3 * d.highBufferWatchdogPeriod) if (this.stallReported || (this.stallReported = !0, _.logger.warn("playback stalling in high buffer @" + t), h.trigger(g["default"].ERROR, {
                                                    type: b.ErrorTypes.MEDIA_ERROR,
                                                    details: b.ErrorDetails.BUFFER_STALLED_ERROR,
                                                    fatal: !1,
                                                    buffer: p
                                                })), this.stalled = void 0, this.nudgeRetry = ++y, y < d.nudgeMaxRetry) {
                                                    var k = e.currentTime,
                                                    R = k + y * d.nudgeOffset;
                                                    _.logger.log("adjust currentTime from " + k + " to " + R),
                                                    e.currentTime = R,
                                                    h.trigger(g["default"].ERROR, {
                                                        type: b.ErrorTypes.MEDIA_ERROR,
                                                        details: b.ErrorDetails.BUFFER_NUDGE_ON_STALL,
                                                        fatal: !1
                                                    })
                                                } else _.logger.error("still stuck in high buffer @" + t + " after " + d.nudgeMaxRetry + ", raise fatal error"),
                                                h.trigger(g["default"].ERROR, {
                                                    type: b.ErrorTypes.MEDIA_ERROR,
                                                    details: b.ErrorDetails.BUFFER_STALLED_ERROR,
                                                    fatal: !0
                                                })
                                            } else this.stalled = f,
                                            this.stallReported = !1
                                        }
                                    }
                                }
                            }
                        },
                        {
                            key: "onFragLoadEmergencyAborted",
                            value: function() {
                                this.state = A.IDLE,
                                this.loadedmetadata || (this.startFragRequested = !1, this.nextLoadPosition = this.startPosition),
                                this.tick()
                            }
                        },
                        {
                            key: "onBufferFlushed",
                            value: function() {
                                var e = this.mediaBuffer ? this.mediaBuffer: this.media;
                                this._bufferedFrags = this._bufferedFrags.filter(function(t) {
                                    return c["default"].isBuffered(e, (t.startPTS + t.endPTS) / 2)
                                }),
                                this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold,
                                this.state = A.IDLE,
                                this.fragPrevious = null
                            }
                        },
                        {
                            key: "onLevelRemoved",
                            value: function(e) {
                                this.levels = this.levels.filter(function(t, r) {
                                    return r !== e.level
                                })
                            }
                        },
                        {
                            key: "swapAudioCodec",
                            value: function() {
                                this.audioCodecSwap = !this.audioCodecSwap
                            }
                        },
                        {
                            key: "computeLivePosition",
                            value: function(e, t) {
                                var r = void 0 !== this.config.liveSyncDuration ? this.config.liveSyncDuration: this.config.liveSyncDurationCount * t.targetduration;
                                return e + Math.max(0, t.totalduration - r)
                            }
                        },
                        {
                            key: "state",
                            set: function(e) {
                                if (this.state !== e) {
                                    var t = this.state;
                                    this._state = e,
                                    _.logger.log("main stream:" + t + "->" + e),
                                    this.hls.trigger(g["default"].STREAM_STATE_TRANSITION, {
                                        previousState: t,
                                        nextState: e
                                    })
                                }
                            },
                            get: function() {
                                return this._state
                            }
                        },
                        {
                            key: "currentLevel",
                            get: function() {
                                var e = this.media;
                                if (e) {
                                    var t = this.getBufferedFrag(e.currentTime);
                                    if (t) return t.level
                                }
                                return - 1
                            }
                        },
                        {
                            key: "nextBufferedFrag",
                            get: function() {
                                var e = this.media;
                                return e ? this.followingBufferedFrag(this.getBufferedFrag(e.currentTime)) : null
                            }
                        },
                        {
                            key: "nextLevel",
                            get: function() {
                                var e = this.nextBufferedFrag;
                                return e ? e.level: -1
                            }
                        },
                        {
                            key: "liveSyncPosition",
                            get: function() {
                                return this._liveSyncPosition
                            },
                            set: function(e) {
                                this._liveSyncPosition = e
                            }
                        }]),
                        t
                    } (y["default"]);
                    r["default"] = S
                },
                {
                    24 : 24,
                    30 : 30,
                    31 : 31,
                    32 : 32,
                    34 : 34,
                    35 : 35,
                    45 : 45,
                    48 : 48,
                    51 : 51,
                    52 : 52
                }],
                13 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    function n(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return ! t || "object" != typeof t && "function" != typeof t ? e: t
                    }
                    function s(e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var o = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    l = e(32),
                    u = i(l),
                    d = e(31),
                    c = i(d),
                    f = e(51),
                    h = function(e) {
                        function t(e) {
                            a(this, t);
                            var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u["default"].ERROR, u["default"].SUBTITLE_TRACKS_UPDATED, u["default"].SUBTITLE_TRACK_SWITCH, u["default"].SUBTITLE_TRACK_LOADED, u["default"].SUBTITLE_FRAG_PROCESSED));
                            return r.config = e.config,
                            r.vttFragSNsProcessed = {},
                            r.vttFragQueues = void 0,
                            r.currentlyProcessing = null,
                            r.currentTrackId = -1,
                            r
                        }
                        return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function() {
                                c["default"].prototype.destroy.call(this)
                            }
                        },
                        {
                            key: "clearVttFragQueues",
                            value: function() {
                                var e = this;
                                this.vttFragQueues = {},
                                this.tracks.forEach(function(t) {
                                    e.vttFragQueues[t.id] = []
                                })
                            }
                        },
                        {
                            key: "nextFrag",
                            value: function() {
                                if (null === this.currentlyProcessing && this.currentTrackId > -1 && this.vttFragQueues[this.currentTrackId].length) {
                                    var e = this.currentlyProcessing = this.vttFragQueues[this.currentTrackId].shift();
                                    this.hls.trigger(u["default"].FRAG_LOADING, {
                                        frag: e
                                    })
                                }
                            }
                        },
                        {
                            key: "onSubtitleFragProcessed",
                            value: function(e) {
                                e.success && this.vttFragSNsProcessed[e.frag.trackId].push(e.frag.sn),
                                this.currentlyProcessing = null,
                                this.nextFrag()
                            }
                        },
                        {
                            key: "onError",
                            value: function(e) {
                                var t = e.frag;
                                t && "subtitle" !== t.type || this.currentlyProcessing && (this.currentlyProcessing = null, this.nextFrag())
                            }
                        },
                        {
                            key: "onSubtitleTracksUpdated",
                            value: function(e) {
                                var t = this;
                                f.logger.log("subtitle tracks updated"),
                                this.tracks = e.subtitleTracks,
                                this.clearVttFragQueues(),
                                this.vttFragSNsProcessed = {},
                                this.tracks.forEach(function(e) {
                                    t.vttFragSNsProcessed[e.id] = []
                                })
                            }
                        },
                        {
                            key: "onSubtitleTrackSwitch",
                            value: function(e) {
                                this.currentTrackId = e.id,
                                this.clearVttFragQueues()
                            }
                        },
                        {
                            key: "onSubtitleTrackLoaded",
                            value: function(e) {
                                var t = this.vttFragSNsProcessed[e.id],
                                r = this.vttFragQueues[e.id],
                                i = this.currentlyProcessing ? this.currentlyProcessing.sn: -1,
                                a = function(e) {
                                    return t.indexOf(e.sn) > -1
                                },
                                n = function(e) {
                                    return r.some(function(t) {
                                        return t.sn === e.sn
                                    })
                                };
                                e.details.fragments.forEach(function(t) {
                                    a(t) || t.sn === i || n(t) || (t.trackId = e.id, r.push(t))
                                }),
                                this.nextFrag()
                            }
                        }]),
                        t
                    } (c["default"]);
                    r["default"] = h
                },
                {
                    31 : 31,
                    32 : 32,
                    51 : 51
                }],
                14 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    function n(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return ! t || "object" != typeof t && "function" != typeof t ? e: t
                    }
                    function s(e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var o = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    l = e(32),
                    u = i(l),
                    d = e(31),
                    c = i(d),
                    f = e(51),
                    h = function(e) {
                        function t(e) {
                            a(this, t);
                            var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u["default"].MEDIA_ATTACHED, u["default"].MEDIA_DETACHING, u["default"].MANIFEST_LOADING, u["default"].MANIFEST_LOADED, u["default"].SUBTITLE_TRACK_LOADED));
                            return r.tracks = [],
                            r.trackId = -1,
                            r.media = void 0,
                            r
                        }
                        return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function() {
                                c["default"].prototype.destroy.call(this)
                            }
                        },
                        {
                            key: "onMediaAttached",
                            value: function(e) {
                                var t = this;
                                this.media = e.media,
                                this.media && this.media.textTracks.addEventListener("change",
                                function() {
                                    if (t.media) {
                                        for (var e = -1,
                                        r = t.media.textTracks,
                                        i = 0; i < r.length; i++)"showing" === r[i].mode && (e = i);
                                        t.subtitleTrack = e
                                    }
                                })
                            }
                        },
                        {
                            key: "onMediaDetaching",
                            value: function() {
                                this.media = void 0
                            }
                        },
                        {
                            key: "onManifestLoading",
                            value: function() {
                                this.tracks = [],
                                this.trackId = -1
                            }
                        },
                        {
                            key: "onManifestLoaded",
                            value: function(e) {
                                var t = this,
                                r = e.subtitles || [],
                                i = !1;
                                this.tracks = r,
                                this.trackId = -1,
                                this.hls.trigger(u["default"].SUBTITLE_TRACKS_UPDATED, {
                                    subtitleTracks: r
                                }),
                                r.forEach(function(e) {
                                    e["default"] && (t.subtitleTrack = e.id, i = !0)
                                })
                            }
                        },
                        {
                            key: "onTick",
                            value: function() {
                                var e = this.trackId,
                                t = this.tracks[e];
                                if (t) {
                                    var r = t.details;
                                    void 0 !== r && r.live !== !0 || (f.logger.log("(re)loading playlist for subtitle track " + e), this.hls.trigger(u["default"].SUBTITLE_TRACK_LOADING, {
                                        url: t.url,
                                        id: e
                                    }))
                                }
                            }
                        },
                        {
                            key: "onSubtitleTrackLoaded",
                            value: function(e) {
                                var t = this;
                                e.id < this.tracks.length && (f.logger.log("subtitle track " + e.id + " loaded"), this.tracks[e.id].details = e.details, e.details.live && !this.timer && (this.timer = setInterval(function() {
                                    t.onTick()
                                },
                                1e3 * e.details.targetduration, this)), !e.details.live && this.timer && (clearInterval(this.timer), this.timer = null))
                            }
                        },
                        {
                            key: "setSubtitleTrackInternal",
                            value: function(e) {
                                if (e >= 0 && e < this.tracks.length) {
                                    this.timer && (clearInterval(this.timer), this.timer = null),
                                    this.trackId = e,
                                    f.logger.log("switching to subtitle track " + e);
                                    var t = this.tracks[e];
                                    this.hls.trigger(u["default"].SUBTITLE_TRACK_SWITCH, {
                                        id: e
                                    });
                                    var r = t.details;
                                    void 0 !== r && r.live !== !0 || (f.logger.log("(re)loading playlist for subtitle track " + e), this.hls.trigger(u["default"].SUBTITLE_TRACK_LOADING, {
                                        url: t.url,
                                        id: e
                                    }))
                                }
                            }
                        },
                        {
                            key: "subtitleTracks",
                            get: function() {
                                return this.tracks
                            }
                        },
                        {
                            key: "subtitleTrack",
                            get: function() {
                                return this.trackId
                            },
                            set: function(e) {
                                this.trackId !== e && this.setSubtitleTrackInternal(e)
                            }
                        }]),
                        t
                    } (c["default"]);
                    r["default"] = h
                },
                {
                    31 : 31,
                    32 : 32,
                    51 : 51
                }],
                15 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    function n(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return ! t || "object" != typeof t && "function" != typeof t ? e: t
                    }
                    function s(e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }
                    function o(e) {
                        if (e) {
                            var t = e.mode;
                            for ("disabled" === t && (e.mode = "hidden"); e.cues.length > 0;) e.removeCue(e.cues[0]);
                            e.mode = t
                        }
                    }
                    function l(e, t) {
                        return e && (!e._id || /^subtitle/.test(e._id)) && e.label === t.name && !(e.textTrack1 || e.textTrack2)
                    }
                    function u(e, t, r, i) {
                        return Math.min(t, i) - Math.max(e, r)
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var d = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    c = e(32),
                    f = i(c),
                    h = e(31),
                    v = i(h),
                    g = e(46),
                    p = i(g),
                    y = e(55),
                    m = i(y),
                    T = e(51),
                    E = function(e) {
                        function t(e) {
                            a(this, t);
                            var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, f["default"].MEDIA_ATTACHING, f["default"].MEDIA_DETACHING, f["default"].FRAG_PARSING_USERDATA, f["default"].MANIFEST_LOADING, f["default"].MANIFEST_LOADED, f["default"].FRAG_LOADED, f["default"].LEVEL_SWITCHING, f["default"].INIT_PTS_FOUND, f["default"].FRAG_PARSING_INIT_SEGMENT));
                            if (r.hls = e, r.config = e.config, r.enabled = !0, r.Cues = e.config.cueHandler, r.textTracks = [], r.tracks = [], r.unparsedVttFrags = [], r.initPTS = void 0, r.cueRanges = [], r.manifestCaptionsLabels = {},
                            r.config.enableCEA708Captions) {
                                var i = r,
                                s = r.manifestCaptionsLabels,
                                l = {
                                    newCue: function(e, t, r) {
                                        if (!i.textTrack1) if (i.config.renderNatively) {
                                            var a = i.getExistingTrack("1");
                                            if (a) {
                                                i.textTrack1 = a,
                                                o(i.textTrack1);
                                                var n = new window.Event("addtrack");
                                                n.track = i.textTrack1,
                                                i.media.dispatchEvent(n)
                                            } else i.textTrack1 = i.createTextTrack("captions", s.captionsTextTrack1Label, s.captionsTextTrack1LanguageCode),
                                            i.textTrack1.textTrack1 = !0
                                        } else i.textTrack1 = {
                                            _id: "textTrack1",
                                            label: s.captionsTextTrack1Label,
                                            kind: "captions",
                                            "default": !1
                                        },
                                        i.hls.trigger(f["default"].NON_NATIVE_TEXT_TRACKS_FOUND, {
                                            tracks: [i.textTrack1]
                                        });
                                        i.addCues("textTrack1", e, t, r)
                                    }
                                },
                                u = {
                                    newCue: function(e, t, r) {
                                        if (!i.textTrack2) if (i.config.renderNatively) {
                                            var a = i.getExistingTrack("2");
                                            if (a) {
                                                i.textTrack2 = a,
                                                o(i.textTrack2);
                                                var n = new window.Event("addtrack");
                                                n.track = i.textTrack2,
                                                i.media.dispatchEvent(n)
                                            } else i.textTrack2 = i.createTextTrack("captions", s.captionsTextTrack2Label, s.captionsTextTrack2LanguageCode),
                                            i.textTrack2.textTrack2 = !0
                                        } else i.textTrack2 = {
                                            _id: "textTrack2",
                                            label: s.captionsTextTrack2Label,
                                            kind: "captions",
                                            "default": !1
                                        },
                                        i.hls.trigger(f["default"].NON_NATIVE_TEXT_TRACKS_FOUND, {
                                            tracks: [i.textTrack2]
                                        });
                                        i.addCues("textTrack2", e, t, r)
                                    }
                                };
                                r.cea608Parser = new p["default"](0, l, u)
                            }
                            return r
                        }
                        return s(t, e),
                        d(t, [{
                            key: "addCues",
                            value: function(e, t, r, i) {
                                for (var a = this,
                                n = this.cueRanges,
                                s = !1,
                                o = n.length; o--;) {
                                    var l = n[o],
                                    d = u(l[0], l[1], t, r);
                                    if (d >= 0 && (l[0] = Math.min(l[0], t), l[1] = Math.max(l[1], r), s = !0, d / (r - t) > .5)) return
                                }
                                s || n.push([t, r]);
                                var c = this.Cues.createCues(t, r, i);
                                this.config.renderNatively ? c.forEach(function(t) {
                                    a[e].addCue(t)
                                }) : this.hls.trigger(f["default"].CUES_PARSED, {
                                    type: "captions",
                                    cues: c,
                                    track: e
                                })
                            }
                        },
                        {
                            key: "onInitPtsFound",
                            value: function(e) {
                                var t = this;
                                "undefined" == typeof this.initPTS && (this.initPTS = e.initPTS),
                                this.unparsedVttFrags.length && (this.unparsedVttFrags.forEach(function(e) {
                                    t.onFragLoaded(e)
                                }), this.unparsedVttFrags = [])
                            }
                        },
                        {
                            key: "getExistingTrack",
                            value: function(e) {
                                var t = this.media;
                                if (t) for (var r = 0; r < t.textTracks.length; r++) {
                                    var i = t.textTracks[r],
                                    a = "textTrack" + e;
                                    if (i[a] === !0) return i
                                }
                                return null
                            }
                        },
                        {
                            key: "createTextTrack",
                            value: function(e, t, r) {
                                var i = this.media;
                                if (i) return i.addTextTrack(e, t, r)
                            }
                        },
                        {
                            key: "destroy",
                            value: function() {
                                v["default"].prototype.destroy.call(this)
                            }
                        },
                        {
                            key: "onMediaAttaching",
                            value: function(e) {
                                this.media = e.media
                            }
                        },
                        {
                            key: "onMediaDetaching",
                            value: function() {
                                o(this.textTrack1),
                                o(this.textTrack2)
                            }
                        },
                        {
                            key: "onManifestLoading",
                            value: function() {
                                this.lastSn = -1,
                                this.prevCC = -1,
                                this.vttCCs = {
                                    ccOffset: 0,
                                    presentationOffset: 0
                                };
                                var e = this.media;
                                if (e && e.textTracks) for (var t = e.textTracks,
                                r = 0; r < t.length; r++)(t[r].textTrack1 || t[r].textTrack2) && o(t[r])
                            }
                        },
                        {
                            key: "onManifestLoaded",
                            value: function(e) {
                                var t = this;
                                this.textTracks = [],
                                this.unparsedVttFrags = this.unparsedVttFrags || [],
                                this.initPTS = void 0,
                                this.cueRanges = [];
                                var r = this.manifestCaptionsLabels;
                                if (r.captionsTextTrack1Label = "Unknown CC", r.captionsTextTrack1LanguageCode = "en", r.captionsTextTrack2Label = "Unknown CC", r.captionsTextTrack2LanguageCode = "es", this.config.enableWebVTT) {
                                    var i = this.tracks && e.subtitles && this.tracks.length === e.subtitles.length;
                                    if (this.tracks = e.subtitles || [], this.config.renderNatively) {
                                        var a = this.media ? this.media.textTracks: [];
                                        this.tracks.forEach(function(e, r) {
                                            var i = void 0;
                                            if (r < a.length) {
                                                var n = a[r];
                                                l(n, e) && (i = n)
                                            }
                                            i || (i = t.createTextTrack("subtitles", e.name, e.lang)),
                                            i.mode = e["default"] ? "showing": "hidden",
                                            t.textTracks.push(i)
                                        })
                                    } else if (!i && this.tracks && this.tracks.length) {
                                        var n = this.tracks.map(function(e) {
                                            return {
                                                label: e.name,
                                                kind: e.type.toLowerCase(),
                                                "default": e["default"]
                                            }
                                        });
                                        this.hls.trigger(f["default"].NON_NATIVE_TEXT_TRACKS_FOUND, {
                                            tracks: n
                                        })
                                    }
                                }
                                if (this.config.enableCEA708Captions && e.captions) {
                                    var s = void 0,
                                    o = void 0;
                                    e.captions.forEach(function(e) {
                                        o = /(?:CC|SERVICE)([1-2])/.exec(e.instreamId),
                                        o && (s = o[1], r["captionsTextTrack" + s + "Label"] = e.name, e.lang && (r["captionsTextTrack" + s + "LanguageCode"] = e.lang))
                                    })
                                }
                            }
                        },
                        {
                            key: "onLevelSwitching",
                            value: function() {
                                this.enabled = "NONE" !== this.hls.currentLevel.closedCaptions
                            }
                        },
                        {
                            key: "onFragLoaded",
                            value: function(e) {
                                var t = e.frag,
                                r = e.payload,
                                i = this;
                                if ("main" === t.type) {
                                    var a = t.sn;
                                    a !== this.lastSn + 1 && this.cea608Parser.reset(),
                                    this.lastSn = a
                                } else if ("subtitle" === t.type) if (r.byteLength) {
                                    if ("undefined" == typeof this.initPTS) return void this.unparsedVttFrags.push(e);
                                    var n = this.vttCCs;
                                    n[t.cc] || (n[t.cc] = {
                                        start: t.start,
                                        prevCC: this.prevCC,
                                        "new": !0
                                    },
                                    this.prevCC = t.cc);
                                    var s = this.hls,
                                    o = i.config.renderNatively ? this.textTracks: this.tracks;
                                    m["default"].parse(r, this.initPTS, n, t.cc,
                                    function(e) {
                                        if (i.config.renderNatively) e.forEach(function(e) {
                                            o[t.trackId].addCue(e)
                                        });
                                        else {
                                            var r = o[t.trackId],
                                            a = r["default"] ? "default": "subtitles" + t.trackId;
                                            s.trigger(f["default"].CUES_PARSED, {
                                                type: "subtitles",
                                                cues: e,
                                                track: a
                                            })
                                        }
                                        s.trigger(f["default"].SUBTITLE_FRAG_PROCESSED, {
                                            success: !0,
                                            frag: t
                                        })
                                    },
                                    function(e) {
                                        T.logger.log("Failed to parse VTT cue: " + e),
                                        s.trigger(f["default"].SUBTITLE_FRAG_PROCESSED, {
                                            success: !1,
                                            frag: t
                                        })
                                    })
                                } else this.hls.trigger(f["default"].SUBTITLE_FRAG_PROCESSED, {
                                    success: !1,
                                    frag: t
                                })
                            }
                        },
                        {
                            key: "onFragParsingUserdata",
                            value: function(e) {
                                if (this.enabled && this.config.enableCEA708Captions) for (var t = 0; t < e.samples.length; t++) {
                                    var r = this.extractCea608Data(e.samples[t].bytes);
                                    this.cea608Parser.addData(e.samples[t].pts, r)
                                }
                            }
                        },
                        {
                            key: "onFragParsingInitSegment",
                            value: function() {
                                "undefined" == typeof this.initPTS && this.onInitPtsFound({
                                    initPTS: 9e4
                                })
                            }
                        },
                        {
                            key: "extractCea608Data",
                            value: function(e) {
                                for (var t, r, i, a, n, s = 31 & e[0], o = 2, l = [], u = 0; u < s; u++) t = e[o++],
                                r = 127 & e[o++],
                                i = 127 & e[o++],
                                a = 0 !== (4 & t),
                                n = 3 & t,
                                0 === r && 0 === i || a && 0 === n && (l.push(r), l.push(i));
                                return l
                            }
                        }]),
                        t
                    } (v["default"]);
                    r["default"] = E
                },
                {
                    31 : 31,
                    32 : 32,
                    46 : 46,
                    51 : 51,
                    55 : 55
                }],
                16 : [function(e, t, r) {
                    "use strict";
                    function i(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var a = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    n = function() {
                        function e(t, r) {
                            i(this, e),
                            this.subtle = t,
                            this.aesIV = r
                        }
                        return a(e, [{
                            key: "decrypt",
                            value: function(e, t) {
                                return this.subtle.decrypt({
                                    name: "AES-CBC",
                                    iv: this.aesIV
                                },
                                t, e)
                            }
                        }]),
                        e
                    } ();
                    r["default"] = n
                },
                {}],
                17 : [function(e, t, r) {
                    "use strict";
                    function i(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var a = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    n = function() {
                        function e() {
                            i(this, e),
                            this.rcon = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
                            this.subMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)],
                            this.invSubMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)],
                            this.sBox = new Uint32Array(256),
                            this.invSBox = new Uint32Array(256),
                            this.key = new Uint32Array(0),
                            this.initTable()
                        }
                        return a(e, [{
                            key: "uint8ArrayToUint32Array_",
                            value: function(e) {
                                for (var t = new DataView(e), r = new Uint32Array(4), i = 0; i < 4; i++) r[i] = t.getUint32(4 * i);
                                return r
                            }
                        },
                        {
                            key: "initTable",
                            value: function() {
                                var e = this.sBox,
                                t = this.invSBox,
                                r = this.subMix,
                                i = r[0],
                                a = r[1],
                                n = r[2],
                                s = r[3],
                                o = this.invSubMix,
                                l = o[0],
                                u = o[1],
                                d = o[2],
                                c = o[3],
                                f = new Uint32Array(256),
                                h = 0,
                                v = 0,
                                g = 0;
                                for (g = 0; g < 256; g++) g < 128 ? f[g] = g << 1 : f[g] = g << 1 ^ 283;
                                for (g = 0; g < 256; g++) {
                                    var p = v ^ v << 1 ^ v << 2 ^ v << 3 ^ v << 4;
                                    p = p >>> 8 ^ 255 & p ^ 99,
                                    e[h] = p,
                                    t[p] = h;
                                    var y = f[h],
                                    m = f[y],
                                    T = f[m],
                                    E = 257 * f[p] ^ 16843008 * p;
                                    i[h] = E << 24 | E >>> 8,
                                    a[h] = E << 16 | E >>> 16,
                                    n[h] = E << 8 | E >>> 24,
                                    s[h] = E,
                                    E = 16843009 * T ^ 65537 * m ^ 257 * y ^ 16843008 * h,
                                    l[p] = E << 24 | E >>> 8,
                                    u[p] = E << 16 | E >>> 16,
                                    d[p] = E << 8 | E >>> 24,
                                    c[p] = E,
                                    h ? (h = y ^ f[f[f[T ^ y]]], v ^= f[f[v]]) : h = v = 1
                                }
                            }
                        },
                        {
                            key: "expandKey",
                            value: function(e) {
                                for (var t = this.uint8ArrayToUint32Array_(e), r = !0, i = 0; i < t.length && r;) r = t[i] === this.key[i],
                                i++;
                                if (!r) {
                                    this.key = t;
                                    var a = this.keySize = t.length;
                                    if (4 !== a && 6 !== a && 8 !== a) throw new Error("Invalid aes key size=" + a);
                                    var n = this.ksRows = 4 * (a + 6 + 1),
                                    s = void 0,
                                    o = void 0,
                                    l = this.keySchedule = new Uint32Array(n),
                                    u = this.invKeySchedule = new Uint32Array(n),
                                    d = this.sBox,
                                    c = this.rcon,
                                    f = this.invSubMix,
                                    h = f[0],
                                    v = f[1],
                                    g = f[2],
                                    p = f[3],
                                    y = void 0,
                                    m = void 0;
                                    for (s = 0; s < n; s++) s < a ? y = l[s] = t[s] : (m = y, s % a === 0 ? (m = m << 8 | m >>> 24, m = d[m >>> 24] << 24 | d[m >>> 16 & 255] << 16 | d[m >>> 8 & 255] << 8 | d[255 & m], m ^= c[s / a | 0] << 24) : a > 6 && s % a === 4 && (m = d[m >>> 24] << 24 | d[m >>> 16 & 255] << 16 | d[m >>> 8 & 255] << 8 | d[255 & m]), l[s] = y = (l[s - a] ^ m) >>> 0);
                                    for (o = 0; o < n; o++) s = n - o,
                                    m = 3 & o ? l[s] : l[s - 4],
                                    o < 4 || s <= 4 ? u[o] = m: u[o] = h[d[m >>> 24]] ^ v[d[m >>> 16 & 255]] ^ g[d[m >>> 8 & 255]] ^ p[d[255 & m]],
                                    u[o] = u[o] >>> 0
                                }
                            }
                        },
                        {
                            key: "networkToHostOrderSwap",
                            value: function(e) {
                                return e << 24 | (65280 & e) << 8 | (16711680 & e) >> 8 | e >>> 24
                            }
                        },
                        {
                            key: "decrypt",
                            value: function(e, t, r) {
                                for (var i, a, n = this.keySize + 6,
                                s = this.invKeySchedule,
                                o = this.invSBox,
                                l = this.invSubMix,
                                u = l[0], d = l[1], c = l[2], f = l[3], h = this.uint8ArrayToUint32Array_(r), v = h[0], g = h[1], p = h[2], y = h[3], m = new Int32Array(e), T = new Int32Array(m.length), E = void 0, k = void 0, b = void 0, _ = void 0, R = void 0, A = void 0, S = void 0, L = void 0, w = void 0, D = void 0, O = void 0, I = void 0, C = this.networkToHostOrderSwap; t < m.length;) {
                                    for (w = C(m[t]), D = C(m[t + 1]), O = C(m[t + 2]), I = C(m[t + 3]), R = w ^ s[0], A = I ^ s[1], S = O ^ s[2], L = D ^ s[3], i = 4, a = 1; a < n; a++) E = u[R >>> 24] ^ d[A >> 16 & 255] ^ c[S >> 8 & 255] ^ f[255 & L] ^ s[i],
                                    k = u[A >>> 24] ^ d[S >> 16 & 255] ^ c[L >> 8 & 255] ^ f[255 & R] ^ s[i + 1],
                                    b = u[S >>> 24] ^ d[L >> 16 & 255] ^ c[R >> 8 & 255] ^ f[255 & A] ^ s[i + 2],
                                    _ = u[L >>> 24] ^ d[R >> 16 & 255] ^ c[A >> 8 & 255] ^ f[255 & S] ^ s[i + 3],
                                    R = E,
                                    A = k,
                                    S = b,
                                    L = _,
                                    i += 4;
                                    E = o[R >>> 24] << 24 ^ o[A >> 16 & 255] << 16 ^ o[S >> 8 & 255] << 8 ^ o[255 & L] ^ s[i],
                                    k = o[A >>> 24] << 24 ^ o[S >> 16 & 255] << 16 ^ o[L >> 8 & 255] << 8 ^ o[255 & R] ^ s[i + 1],
                                    b = o[S >>> 24] << 24 ^ o[L >> 16 & 255] << 16 ^ o[R >> 8 & 255] << 8 ^ o[255 & A] ^ s[i + 2],
                                    _ = o[L >>> 24] << 24 ^ o[R >> 16 & 255] << 16 ^ o[A >> 8 & 255] << 8 ^ o[255 & S] ^ s[i + 3],
                                    i += 3,
                                    T[t] = C(E ^ v),
                                    T[t + 1] = C(_ ^ g),
                                    T[t + 2] = C(b ^ p),
                                    T[t + 3] = C(k ^ y),
                                    v = w,
                                    g = D,
                                    p = O,
                                    y = I,
                                    t += 4
                                }
                                return T.buffer
                            }
                        },
                        {
                            key: "destroy",
                            value: function() {
                                this.key = void 0,
                                this.keySize = void 0,
                                this.ksRows = void 0,
                                this.sBox = void 0,
                                this.invSBox = void 0,
                                this.subMix = void 0,
                                this.invSubMix = void 0,
                                this.keySchedule = void 0,
                                this.invKeySchedule = void 0,
                                this.rcon = void 0
                            }
                        }]),
                        e
                    } ();
                    r["default"] = n
                },
                {}],
                18 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var n = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    s = e(16),
                    o = i(s),
                    l = e(19),
                    u = i(l),
                    d = e(17),
                    c = i(d),
                    f = e(30),
                    h = e(51),
                    v = function() {
                        function e(t, r) {
                            a(this, e),
                            this.observer = t,
                            this.config = r,
                            this.logEnabled = !0;
                            try {
                                var i = crypto ? crypto: self.crypto;
                                this.subtle = i.subtle || i.webkitSubtle
                            } catch(n) {}
                            this.disableWebCrypto = !this.subtle
                        }
                        return n(e, [{
                            key: "isSync",
                            value: function() {
                                return this.disableWebCrypto && this.config.enableSoftwareAES
                            }
                        },
                        {
                            key: "decrypt",
                            value: function(e, t, r, i) {
                                var a = this;
                                if (this.disableWebCrypto && this.config.enableSoftwareAES) {
                                    this.logEnabled && (h.logger.log("JS AES decrypt"), this.logEnabled = !1);
                                    var n = this.decryptor;
                                    n || (this.decryptor = n = new c["default"]),
                                    n.expandKey(t),
                                    i(n.decrypt(e, 0, r))
                                } else {
                                    this.logEnabled && (h.logger.log("WebCrypto AES decrypt"), this.logEnabled = !1);
                                    var s = this.subtle;
                                    this.key !== t && (this.key = t, this.fastAesKey = new u["default"](s, t)),
                                    this.fastAesKey.expandKey().then(function(n) {
                                        var l = new o["default"](s, r);
                                        l.decrypt(e, n)["catch"](function(n) {
                                            a.onWebCryptoError(n, e, t, r, i)
                                        }).then(function(e) {
                                            i(e)
                                        })
                                    })["catch"](function(n) {
                                        a.onWebCryptoError(n, e, t, r, i)
                                    })
                                }
                            }
                        },
                        {
                            key: "onWebCryptoError",
                            value: function(e, t, r, i, a) {
                                this.config.enableSoftwareAES ? (h.logger.log("WebCrypto Error, disable WebCrypto API"), this.disableWebCrypto = !0, this.logEnabled = !0, this.decrypt(t, r, i, a)) : (h.logger.error("decrypting error : " + e.message), this.observer.trigger(Event.ERROR, {
                                    type: f.ErrorTypes.MEDIA_ERROR,
                                    details: f.ErrorDetails.FRAG_DECRYPT_ERROR,
                                    fatal: !0,
                                    reason: e.message
                                }))
                            }
                        },
                        {
                            key: "destroy",
                            value: function() {
                                var e = this.decryptor;
                                e && (e.destroy(), this.decryptor = void 0)
                            }
                        }]),
                        e
                    } ();
                    r["default"] = v
                },
                {
                    16 : 16,
                    17 : 17,
                    19 : 19,
                    30 : 30,
                    51 : 51
                }],
                19 : [function(e, t, r) {
                    "use strict";
                    function i(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var a = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    n = function() {
                        function e(t, r) {
                            i(this, e),
                            this.subtle = t,
                            this.key = r
                        }
                        return a(e, [{
                            key: "expandKey",
                            value: function() {
                                return this.subtle.importKey("raw", this.key, {
                                    name: "AES-CBC"
                                },
                                !1, ["encrypt", "decrypt"])
                            }
                        }]),
                        e
                    } ();
                    r["default"] = n
                },
                {}],
                20 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var n = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    s = e(21),
                    o = i(s),
                    l = e(51),
                    u = e(26),
                    d = i(u),
                    c = function() {
                        function e(t, r, i) {
                            a(this, e),
                            this.observer = t,
                            this.config = i,
                            this.remuxer = r
                        }
                        return n(e, [{
                            key: "resetInitSegment",
                            value: function(e, t, r, i) {
                                this._aacTrack = {
                                    container: "audio/adts",
                                    type: "audio",
                                    id: -1,
                                    sequenceNumber: 0,
                                    isAAC: !0,
                                    samples: [],
                                    len: 0,
                                    manifestCodec: t,
                                    duration: i,
                                    inputTimeScale: 9e4
                                }
                            }
                        },
                        {
                            key: "resetTimeStamp",
                            value: function() {}
                        },
                        {
                            key: "append",
                            value: function(e, t, r, i) {
                                var a, n, s, u, c, f, h, v, g, p, y, m = new d["default"](e);
                                for (n = m.timeStamp ? 90 * m.timeStamp: 9e4 * t, a = this._aacTrack, h = m.length || 0, p = e.length; h < p - 1 && (255 !== e[h] || 240 !== (246 & e[h + 1])); h++);
                                for (a.samplerate || (s = o["default"].getAudioConfig(this.observer, e, h, a.manifestCodec), a.config = s.config, a.samplerate = s.samplerate, a.channelCount = s.channelCount, a.codec = s.codec, l.logger.log("parsed codec:" + a.codec + ",rate:" + s.samplerate + ",nb channel:" + s.channelCount)), f = 0, c = 9216e4 / a.samplerate; h + 5 < p && (v = 1 & e[h + 1] ? 7 : 9, u = (3 & e[h + 3]) << 11 | e[h + 4] << 3 | (224 & e[h + 5]) >>> 5, u -= v, u > 0 && h + v + u <= p);) for (g = n + f * c, y = {
                                    unit: e.subarray(h + v, h + v + u),
                                    pts: g,
                                    dts: g
                                },
                                a.samples.push(y), a.len += u, h += u + v, f++; h < p - 1 && (255 !== e[h] || 240 !== (240 & e[h + 1])); h++);
                                var T = m.payload ? {
                                    samples: [{
                                        pts: n,
                                        dts: n,
                                        unit: m.payload
                                    }],
                                    inputTimeScale: 9e4
                                }: {
                                    samples: []
                                };
                                this.remuxer.remux(a, {
                                    samples: []
                                },
                                T, {
                                    samples: []
                                },
                                t, r, i)
                            }
                        },
                        {
                            key: "destroy",
                            value: function() {}
                        }], [{
                            key: "probe",
                            value: function(e) {
                                var t, r, i = new d["default"](e);
                                for (t = i.length || 0, r = e.length; t < r - 1; t++) if (255 === e[t] && 240 === (246 & e[t + 1])) return ! 0;
                                return ! 1
                            }
                        }]),
                        e
                    } ();
                    r["default"] = c
                },
                {
                    21 : 21,
                    26 : 26,
                    51 : 51
                }],
                21 : [function(e, t, r) {
                    "use strict";
                    var i = e(51),
                    a = e(30),
                    n = {
                        getAudioConfig: function(e, t, r, n) {
                            var s, o, l, u, d, c = navigator.userAgent.toLowerCase(),
                            f = n,
                            h = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350];
                            return s = ((192 & t[r + 2]) >>> 6) + 1,
                            o = (60 & t[r + 2]) >>> 2,
                            o > h.length - 1 ? void e.trigger(Event.ERROR, {
                                type: a.ErrorTypes.MEDIA_ERROR,
                                details: a.ErrorDetails.FRAG_PARSING_ERROR,
                                fatal: !0,
                                reason: "invalid ADTS sampling index:" + o
                            }) : (u = (1 & t[r + 2]) << 2, u |= (192 & t[r + 3]) >>> 6, i.logger.log("manifest codec:" + n + ",ADTS data:type:" + s + ",sampleingIndex:" + o + "[" + h[o] + "Hz],channelConfig:" + u), /firefox/i.test(c) ? o >= 6 ? (s = 5, d = new Array(4), l = o - 3) : (s = 2, d = new Array(2), l = o) : c.indexOf("android") !== -1 ? (s = 2, d = new Array(2), l = o) : (s = 5, d = new Array(4), n && (n.indexOf("mp4a.40.29") !== -1 || n.indexOf("mp4a.40.5") !== -1) || !n && o >= 6 ? l = o - 3 : ((n && n.indexOf("mp4a.40.2") !== -1 && o >= 6 && 1 === u || !n && 1 === u) && (s = 2, d = new Array(2)), l = o)), d[0] = s << 3, d[0] |= (14 & o) >> 1, d[1] |= (1 & o) << 7, d[1] |= u << 3, 5 === s && (d[1] |= (14 & l) >> 1, d[2] = (1 & l) << 7, d[2] |= 8, d[3] = 0), {
                                config: d,
                                samplerate: h[o],
                                channelCount: u,
                                codec: "mp4a.40." + s,
                                manifestCodec: f
                            })
                        }
                    };
                    t.exports = n
                },
                {
                    30 : 30,
                    51 : 51
                }],
                22 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var n = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    s = e(32),
                    o = i(s),
                    l = e(30),
                    u = e(18),
                    d = i(u),
                    c = e(20),
                    f = i(c),
                    h = e(27),
                    v = i(h),
                    g = e(29),
                    p = i(g),
                    y = e(42),
                    m = i(y),
                    T = e(43),
                    E = i(T),
                    k = function() {
                        function e(t, r, i, n) {
                            a(this, e),
                            this.observer = t,
                            this.typeSupported = r,
                            this.config = i,
                            this.vendor = n
                        }
                        return n(e, [{
                            key: "destroy",
                            value: function() {
                                var e = this.demuxer;
                                e && e.destroy()
                            }
                        },
                        {
                            key: "push",
                            value: function(e, t, r, i, a, n, s, l, u, c, f, h) {
                                if (e.byteLength > 0 && null != t && null != t.key && "AES-128" === t.method) {
                                    var v = this.decrypter;
                                    null == v && (v = this.decrypter = new d["default"](this.observer, this.config));
                                    var g, p = this;
                                    try {
                                        g = performance.now()
                                    } catch(y) {
                                        g = Date.now()
                                    }
                                    v.decrypt(e, t.key.buffer, t.iv.buffer,
                                    function(e) {
                                        var d;
                                        try {
                                            d = performance.now()
                                        } catch(v) {
                                            d = Date.now()
                                        }
                                        p.observer.trigger(o["default"].FRAG_DECRYPTED, {
                                            stats: {
                                                tstart: g,
                                                tdecrypt: d
                                            }
                                        }),
                                        p.pushDecrypted(new Uint8Array(e), t, new Uint8Array(r), i, a, n, s, l, u, c, f, h)
                                    })
                                } else this.pushDecrypted(new Uint8Array(e), t, new Uint8Array(r), i, a, n, s, l, u, c, f, h)
                            }
                        },
                        {
                            key: "pushDecrypted",
                            value: function(e, t, r, i, a, n, s, u, d, c, h, g) {
                                var y = this.demuxer;
                                if (!y || s && !this.probe(e)) {
                                    var T = this.observer,
                                    k = this.typeSupported,
                                    b = this.config,
                                    _ = [{
                                        demux: p["default"],
                                        remux: m["default"]
                                    },
                                    {
                                        demux: f["default"],
                                        remux: m["default"]
                                    },
                                    {
                                        demux: v["default"],
                                        remux: E["default"]
                                    }];
                                    for (var R in _) {
                                        var A = _[R],
                                        S = A.demux.probe;
                                        if (S(e)) {
                                            var L = this.remuxer = new A.remux(T, b, k, this.vendor);
                                            y = new A.demux(T, L, b, k),
                                            this.probe = S;
                                            break
                                        }
                                    }
                                    if (!y) return void T.trigger(o["default"].ERROR, {
                                        type: l.ErrorTypes.MEDIA_ERROR,
                                        details: l.ErrorDetails.FRAG_PARSING_ERROR,
                                        fatal: !0,
                                        reason: "no demux matching with content found"
                                    });
                                    this.demuxer = y
                                }
                                var w = this.remuxer; (s || u) && (y.resetInitSegment(r, i, a, c), w.resetInitSegment()),
                                s && (y.resetTimeStamp(), w.resetTimeStamp(g)),
                                "function" == typeof y.setDecryptData && y.setDecryptData(t),
                                y.append(e, n, d, h)
                            }
                        }]),
                        e
                    } ();
                    r["default"] = k
                },
                {
                    18 : 18,
                    20 : 20,
                    27 : 27,
                    29 : 29,
                    30 : 30,
                    32 : 32,
                    42 : 42,
                    43 : 43
                }],
                23 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var a = e(22),
                    n = i(a),
                    s = e(32),
                    o = i(s),
                    l = e(51),
                    u = e(1),
                    d = i(u),
                    c = function(e) {
                        var t = new d["default"];
                        t.trigger = function(e) {
                            for (var r = arguments.length,
                            i = Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) i[a - 1] = arguments[a];
                            t.emit.apply(t, [e, e].concat(i))
                        },
                        t.off = function(e) {
                            for (var r = arguments.length,
                            i = Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) i[a - 1] = arguments[a];
                            t.removeListener.apply(t, [e].concat(i))
                        };
                        var r = function(t, r) {
                            e.postMessage({
                                event: t,
                                data: r
                            })
                        };
                        e.addEventListener("message",
                        function(i) {
                            var a = i.data;
                            switch (a.cmd) {
                            case "init":
                                var s = JSON.parse(a.config);
                                e.demuxer = new n["default"](t, a.typeSupported, s, a.vendor);
                                try { (0, l.enableLogs)(s.debug === !0)
                                } catch(o) {
                                    console.warn("demuxerWorker: unable to enable logs")
                                }
                                r("init", null);
                                break;
                            case "demux":
                                e.demuxer.push(a.data, a.decryptdata, a.initSegment, a.audioCodec, a.videoCodec, a.timeOffset, a.discontinuity, a.trackSwitch, a.contiguous, a.duration, a.accurateTimeOffset, a.defaultInitPTS)
                            }
                        }),
                        t.on(o["default"].FRAG_DECRYPTED, r),
                        t.on(o["default"].FRAG_PARSING_INIT_SEGMENT, r),
                        t.on(o["default"].FRAG_PARSED, r),
                        t.on(o["default"].ERROR, r),
                        t.on(o["default"].FRAG_PARSING_METADATA, r),
                        t.on(o["default"].FRAG_PARSING_USERDATA, r),
                        t.on(o["default"].INIT_PTS_FOUND, r),
                        t.on(o["default"].FRAG_PARSING_DATA,
                        function(t, r) {
                            var i = [],
                            a = {
                                event: t,
                                data: r
                            };
                            r.data1 && (a.data1 = r.data1.buffer, i.push(r.data1.buffer), delete r.data1),
                            r.data2 && (a.data2 = r.data2.buffer, i.push(r.data2.buffer), delete r.data2),
                            e.postMessage(a, i)
                        })
                    };
                    r["default"] = c
                },
                {
                    1 : 1,
                    22 : 22,
                    32 : 32,
                    51 : 51
                }],
                24 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var n = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    s = e(32),
                    o = i(s),
                    l = e(22),
                    u = i(l),
                    d = e(23),
                    c = i(d),
                    f = e(51),
                    h = e(30),
                    v = e(1),
                    g = i(v),
                    p = function() {
                        function t(r, i) {
                            a(this, t),
                            this.hls = r,
                            this.id = i;
                            var n = this.observer = new g["default"],
                            s = r.config;
                            n.trigger = function(e) {
                                for (var t = arguments.length,
                                r = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) r[i - 1] = arguments[i];
                                n.emit.apply(n, [e, e].concat(r))
                            },
                            n.off = function(e) {
                                for (var t = arguments.length,
                                r = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) r[i - 1] = arguments[i];
                                n.removeListener.apply(n, [e].concat(r))
                            };
                            var l = function(e, t) {
                                t = t || {},
                                t.frag = this.frag,
                                t.id = this.id,
                                r.trigger(e, t)
                            }.bind(this);
                            n.on(o["default"].FRAG_DECRYPTED, l),
                            n.on(o["default"].FRAG_PARSING_INIT_SEGMENT, l),
                            n.on(o["default"].FRAG_PARSING_DATA, l),
                            n.on(o["default"].FRAG_PARSED, l),
                            n.on(o["default"].ERROR, l),
                            n.on(o["default"].FRAG_PARSING_METADATA, l),
                            n.on(o["default"].FRAG_PARSING_USERDATA, l),
                            n.on(o["default"].INIT_PTS_FOUND, l);
                            var d = {
                                mp4: MediaSource.isTypeSupported("video/mp4"),
                                mpeg: MediaSource.isTypeSupported("audio/mpeg"),
                                mp3: MediaSource.isTypeSupported('audio/mp4; codecs="mp3"')
                            },
                            v = navigator.vendor;
                            if (s.enableWorker && "undefined" != typeof Worker) {
                                f.logger.log("demuxing in webworker");
                                var p = void 0;
                                try {
                                    var y = e(3);
                                    p = this.w = y(c["default"]),
                                    this.onwmsg = this.onWorkerMessage.bind(this),
                                    p.addEventListener("message", this.onwmsg),
                                    p.onerror = function(e) {
                                        r.trigger(o["default"].ERROR, {
                                            type: h.ErrorTypes.OTHER_ERROR,
                                            details: h.ErrorDetails.INTERNAL_EXCEPTION,
                                            fatal: !0,
                                            event: "demuxerWorker",
                                            err: {
                                                message: e.message + " (" + e.filename + ":" + e.lineno + ")"
                                            }
                                        })
                                    },
                                    p.postMessage({
                                        cmd: "init",
                                        typeSupported: d,
                                        vendor: v,
                                        id: i,
                                        config: JSON.stringify(s)
                                    })
                                } catch(m) {
                                    f.logger.error("error while initializing DemuxerWorker, fallback on DemuxerInline"),
                                    p && URL.revokeObjectURL(p.objectURL),
                                    this.demuxer = new u["default"](n, d, s, v),
                                    this.w = void 0
                                }
                            } else this.demuxer = new u["default"](n, d, s, v)
                        }
                        return n(t, [{
                            key: "destroy",
                            value: function() {
                                var e = this.w;
                                if (e) e.removeEventListener("message", this.onwmsg),
                                e.terminate(),
                                this.w = null;
                                else {
                                    var t = this.demuxer;
                                    t && (t.destroy(), this.demuxer = null)
                                }
                                var r = this.observer;
                                r && (r.removeAllListeners(), this.observer = null)
                            }
                        },
                        {
                            key: "push",
                            value: function(e, t, r, i, a, n, s, o) {
                                var l = this.w,
                                u = isNaN(a.startDTS) ? a.start: a.startDTS,
                                d = a.decryptdata,
                                c = this.frag,
                                h = !(c && a.cc === c.cc),
                                v = !(c && a.level === c.level),
                                g = c && a.sn === c.sn + 1,
                                p = !v && g;
                                if (h && f.logger.log(this.id + ":discontinuity detected"), v && f.logger.log(this.id + ":switch detected"), this.frag = a, l) l.postMessage({
                                    cmd: "demux",
                                    data: e,
                                    decryptdata: d,
                                    initSegment: t,
                                    audioCodec: r,
                                    videoCodec: i,
                                    timeOffset: u,
                                    discontinuity: h,
                                    trackSwitch: v,
                                    contiguous: p,
                                    duration: n,
                                    accurateTimeOffset: s,
                                    defaultInitPTS: o
                                },
                                [e]);
                                else {
                                    var y = this.demuxer;
                                    y && y.push(e, d, t, r, i, u, h, v, p, n, s, o)
                                }
                            }
                        },
                        {
                            key: "onWorkerMessage",
                            value: function(e) {
                                var t = e.data,
                                r = this.hls;
                                switch (t.event) {
                                case "init":
                                    URL.revokeObjectURL(this.w.objectURL);
                                    break;
                                case o["default"].FRAG_PARSING_DATA:
                                    t.data.data1 = new Uint8Array(t.data1),
                                    t.data2 && (t.data.data2 = new Uint8Array(t.data2));
                                default:
                                    t.data = t.data || {},
                                    t.data.frag = this.frag,
                                    t.data.id = this.id,
                                    r.trigger(t.event, t.data)
                                }
                            }
                        }]),
                        t
                    } ();
                    r["default"] = p
                },
                {
                    1 : 1,
                    22 : 22,
                    23 : 23,
                    3 : 3,
                    30 : 30,
                    32 : 32,
                    51 : 51
                }],
                25 : [function(e, t, r) {
                    "use strict";
                    function i(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var a = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    n = e(51),
                    s = function() {
                        function e(t) {
                            i(this, e),
                            this.data = t,
                            this.bytesAvailable = t.byteLength,
                            this.word = 0,
                            this.bitsAvailable = 0
                        }
                        return a(e, [{
                            key: "loadWord",
                            value: function() {
                                var e = this.data,
                                t = this.bytesAvailable,
                                r = e.byteLength - t,
                                i = new Uint8Array(4),
                                a = Math.min(4, t);
                                if (0 === a) throw new Error("no bytes available");
                                i.set(e.subarray(r, r + a)),
                                this.word = new DataView(i.buffer).getUint32(0),
                                this.bitsAvailable = 8 * a,
                                this.bytesAvailable -= a
                            }
                        },
                        {
                            key: "skipBits",
                            value: function(e) {
                                var t;
                                this.bitsAvailable > e ? (this.word <<= e, this.bitsAvailable -= e) : (e -= this.bitsAvailable, t = e >> 3, e -= t >> 3, this.bytesAvailable -= t, this.loadWord(), this.word <<= e, this.bitsAvailable -= e)
                            }
                        },
                        {
                            key: "readBits",
                            value: function(e) {
                                var t = Math.min(this.bitsAvailable, e),
                                r = this.word >>> 32 - t;
                                return e > 32 && n.logger.error("Cannot read more than 32 bits at a time"),
                                this.bitsAvailable -= t,
                                this.bitsAvailable > 0 ? this.word <<= t: this.bytesAvailable > 0 && this.loadWord(),
                                t = e - t,
                                t > 0 && this.bitsAvailable ? r << t | this.readBits(t) : r
                            }
                        },
                        {
                            key: "skipLZ",
                            value: function() {
                                var e;
                                for (e = 0; e < this.bitsAvailable; ++e) if (0 !== (this.word & 2147483648 >>> e)) return this.word <<= e,
                                this.bitsAvailable -= e,
                                e;
                                return this.loadWord(),
                                e + this.skipLZ()
                            }
                        },
                        {
                            key: "skipUEG",
                            value: function() {
                                this.skipBits(1 + this.skipLZ())
                            }
                        },
                        {
                            key: "skipEG",
                            value: function() {
                                this.skipBits(1 + this.skipLZ())
                            }
                        },
                        {
                            key: "readUEG",
                            value: function() {
                                var e = this.skipLZ();
                                return this.readBits(e + 1) - 1
                            }
                        },
                        {
                            key: "readEG",
                            value: function() {
                                var e = this.readUEG();
                                return 1 & e ? 1 + e >>> 1 : -1 * (e >>> 1)
                            }
                        },
                        {
                            key: "readBoolean",
                            value: function() {
                                return 1 === this.readBits(1)
                            }
                        },
                        {
                            key: "readUByte",
                            value: function() {
                                return this.readBits(8)
                            }
                        },
                        {
                            key: "readUShort",
                            value: function() {
                                return this.readBits(16)
                            }
                        },
                        {
                            key: "readUInt",
                            value: function() {
                                return this.readBits(32)
                            }
                        },
                        {
                            key: "skipScalingList",
                            value: function(e) {
                                var t, r, i = 8,
                                a = 8;
                                for (t = 0; t < e; t++) 0 !== a && (r = this.readEG(), a = (i + r + 256) % 256),
                                i = 0 === a ? i: a
                            }
                        },
                        {
                            key: "readSPS",
                            value: function() {
                                var e, t, r, i, a, n, s, o, l, u = 0,
                                d = 0,
                                c = 0,
                                f = 0,
                                h = this.readUByte.bind(this),
                                v = this.readBits.bind(this),
                                g = this.readUEG.bind(this),
                                p = this.readBoolean.bind(this),
                                y = this.skipBits.bind(this),
                                m = this.skipEG.bind(this),
                                T = this.skipUEG.bind(this),
                                E = this.skipScalingList.bind(this);
                                if (h(), e = h(), t = v(5), y(3), r = h(), T(), 100 === e || 110 === e || 122 === e || 244 === e || 44 === e || 83 === e || 86 === e || 118 === e || 128 === e) {
                                    var k = g();
                                    if (3 === k && y(1), T(), T(), y(1), p()) for (o = 3 !== k ? 8 : 12, l = 0; l < o; l++) p() && E(l < 6 ? 16 : 64)
                                }
                                T();
                                var b = g();
                                if (0 === b) g();
                                else if (1 === b) for (y(1), m(), m(), i = g(), l = 0; l < i; l++) m();
                                T(),
                                y(1),
                                a = g(),
                                n = g(),
                                s = v(1),
                                0 === s && y(1),
                                y(1),
                                p() && (u = g(), d = g(), c = g(), f = g());
                                var _ = [1, 1];
                                if (p() && p()) {
                                    var R = h();
                                    switch (R) {
                                    case 1:
                                        _ = [1, 1];
                                        break;
                                    case 2:
                                        _ = [12, 11];
                                        break;
                                    case 3:
                                        _ = [10, 11];
                                        break;
                                    case 4:
                                        _ = [16, 11];
                                        break;
                                    case 5:
                                        _ = [40, 33];
                                        break;
                                    case 6:
                                        _ = [24, 11];
                                        break;
                                    case 7:
                                        _ = [20, 11];
                                        break;
                                    case 8:
                                        _ = [32, 11];
                                        break;
                                    case 9:
                                        _ = [80, 33];
                                        break;
                                    case 10:
                                        _ = [18, 11];
                                        break;
                                    case 11:
                                        _ = [15, 11];
                                        break;
                                    case 12:
                                        _ = [64, 33];
                                        break;
                                    case 13:
                                        _ = [160, 99];
                                        break;
                                    case 14:
                                        _ = [4, 3];
                                        break;
                                    case 15:
                                        _ = [3, 2];
                                        break;
                                    case 16:
                                        _ = [2, 1];
                                        break;
                                    case 255:
                                        _ = [h() << 8 | h(), h() << 8 | h()]
                                    }
                                }
                                return {
                                    width: Math.ceil(16 * (a + 1) - 2 * u - 2 * d),
                                    height: (2 - s) * (n + 1) * 16 - (s ? 2 : 4) * (c + f),
                                    pixelRatio: _
                                }
                            }
                        },
                        {
                            key: "readSliceType",
                            value: function() {
                                return this.readUByte(),
                                this.readUEG(),
                                this.readUEG()
                            }
                        }]),
                        e
                    } ();
                    r["default"] = s
                },
                {
                    51 : 51
                }],
                26 : [function(e, t, r) {
                    "use strict";
                    function i(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var a = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    n = e(51),
                    s = function() {
                        function e(t) {
                            i(this, e),
                            this._hasTimeStamp = !1;
                            for (var r, a, s, o, l, u, d, c, f = 0;;) if (d = this.readUTF(t, f, 3), f += 3, "ID3" === d) f += 3,
                            r = 127 & t[f++],
                            a = 127 & t[f++],
                            s = 127 & t[f++],
                            o = 127 & t[f++],
                            l = (r << 21) + (a << 14) + (s << 7) + o,
                            u = f + l,
                            this._parseID3Frames(t, f, u),
                            f = u;
                            else {
                                if ("3DI" !== d) return f -= 3,
                                c = f,
                                void(c && (this.hasTimeStamp || n.logger.warn("ID3 tag found, but no timestamp"), this._length = c, this._payload = t.subarray(0, c)));
                                f += 7,
                                n.logger.log("3DI footer found, end: " + f)
                            }
                        }
                        return a(e, [{
                            key: "readUTF",
                            value: function(e, t, r) {
                                var i = "",
                                a = t,
                                n = t + r;
                                do i += String.fromCharCode(e[a++]);
                                while (a < n);
                                return i
                            }
                        },
                        {
                            key: "_parseID3Frames",
                            value: function(e, t, r) {
                                for (var i, a, s, o, l; t + 8 <= r;) switch (i = this.readUTF(e, t, 4), t += 4, a = e[t++] << 24 + e[t++] << 16 + e[t++] << 8 + e[t++], o = e[t++] << 8 + e[t++], s = t, i) {
                                case "PRIV":
                                    if ("com.apple.streaming.transportStreamTimestamp" === this.readUTF(e, t, 44)) {
                                        t += 44,
                                        t += 4;
                                        var u = 1 & e[t++];
                                        this._hasTimeStamp = !0,
                                        l = ((e[t++] << 23) + (e[t++] << 15) + (e[t++] << 7) + e[t++]) / 45,
                                        u && (l += 47721858.84),
                                        l = Math.round(l),
                                        n.logger.trace("ID3 timestamp found: " + l),
                                        this._timeStamp = l
                                    }
                                }
                            }
                        },
                        {
                            key: "hasTimeStamp",
                            get: function() {
                                return this._hasTimeStamp
                            }
                        },
                        {
                            key: "timeStamp",
                            get: function() {
                                return this._timeStamp;
                            }
                        },
                        {
                            key: "length",
                            get: function() {
                                return this._length
                            }
                        },
                        {
                            key: "payload",
                            get: function() {
                                return this._payload
                            }
                        }]),
                        e
                    } ();
                    r["default"] = s
                },
                {
                    51 : 51
                }],
                27 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var n = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    s = e(32),
                    o = i(s),
                    l = function() {
                        function e(t, r) {
                            a(this, e),
                            this.observer = t,
                            this.remuxer = r
                        }
                        return n(e, [{
                            key: "resetTimeStamp",
                            value: function() {}
                        },
                        {
                            key: "resetInitSegment",
                            value: function(t, r, i, a) {
                                var n = this.initData = e.parseInitSegment(t),
                                s = {};
                                n.audio && (s.audio = {
                                    container: "audio/mp4",
                                    codec: r,
                                    initSegment: t
                                }),
                                n.video && (s.video = {
                                    container: "video/mp4",
                                    codec: i,
                                    initSegment: t
                                }),
                                this.observer.trigger(o["default"].FRAG_PARSING_INIT_SEGMENT, {
                                    tracks: s
                                })
                            }
                        },
                        {
                            key: "append",
                            value: function(t, r, i, a) {
                                var n = this.initData,
                                s = e.startDTS(n, t);
                                this.remuxer.remux(n.audio, n.video, null, null, s, i, a, t)
                            }
                        },
                        {
                            key: "destroy",
                            value: function() {}
                        }], [{
                            key: "probe",
                            value: function(t) {
                                if (t.length >= 8) {
                                    var r = e.bin2str(t.subarray(4, 8));
                                    return ["moof", "ftyp", "styp"].indexOf(r) >= 0
                                }
                                return ! 1
                            }
                        },
                        {
                            key: "bin2str",
                            value: function(e) {
                                return String.fromCharCode.apply(null, e)
                            }
                        },
                        {
                            key: "findBox",
                            value: function(t, r) {
                                var i, a, n, s, o, l = [];
                                if (!r.length) return null;
                                for (i = 0; i < t.byteLength;) a = t[i] << 24,
                                a |= t[i + 1] << 16,
                                a |= t[i + 2] << 8,
                                a |= t[i + 3],
                                n = e.bin2str(t.subarray(i + 4, i + 8)),
                                s = a > 1 ? i + a: t.byteLength,
                                n === r[0] && (1 === r.length ? l.push(t.subarray(i + 8, s)) : (o = e.findBox(t.subarray(i + 8, s), r.slice(1)), o.length && (l = l.concat(o)))),
                                i = s;
                                return l
                            }
                        },
                        {
                            key: "parseInitSegment",
                            value: function(t) {
                                var r = [],
                                i = e.findBox(t, ["moov", "trak"]);
                                return i.forEach(function(t) {
                                    var i = e.findBox(t, ["tkhd"])[0];
                                    if (i) {
                                        var a = i[0],
                                        n = 0 === a ? 12 : 20,
                                        s = i[n] << 24 | i[n + 1] << 16 | i[n + 2] << 8 | i[n + 3];
                                        s = s < 0 ? 4294967296 + s: s;
                                        var o = e.findBox(t, ["mdia", "mdhd"])[0];
                                        if (o) {
                                            a = o[0],
                                            n = 0 === a ? 12 : 20;
                                            var l = o[n] << 24 | o[n + 1] << 16 | o[n + 2] << 8 | o[n + 3],
                                            u = e.findBox(t, ["mdia", "hdlr"])[0];
                                            if (u) {
                                                var d = e.bin2str(u.subarray(8, 12)),
                                                c = {
                                                    soun: "audio",
                                                    vide: "video"
                                                } [d];
                                                c && (r[s] = {
                                                    timescale: l,
                                                    type: c
                                                },
                                                r[c] = {
                                                    timescale: l,
                                                    id: s
                                                })
                                            }
                                        }
                                    }
                                }),
                                r
                            }
                        },
                        {
                            key: "startDTS",
                            value: function(t, r) {
                                var i, a, n;
                                return i = e.findBox(r, ["moof", "traf"]),
                                a = [].concat.apply([], i.map(function(r) {
                                    return e.findBox(r, ["tfhd"]).map(function(i) {
                                        var a, n, s;
                                        return a = i[4] << 24 | i[5] << 16 | i[6] << 8 | i[7],
                                        n = t[a].timescale || 9e4,
                                        s = e.findBox(r, ["tfdt"]).map(function(e) {
                                            var t, r;
                                            return t = e[0],
                                            r = e[4] << 24 | e[5] << 16 | e[6] << 8 | e[7],
                                            1 === t && (r *= Math.pow(2, 32), r += e[8] << 24 | e[9] << 16 | e[10] << 8 | e[11]),
                                            r
                                        })[0],
                                        s = s || 1 / 0,
                                        s / n
                                    })
                                })),
                                n = Math.min.apply(null, a),
                                isFinite(n) ? n: 0
                            }
                        }]),
                        e
                    } ();
                    r["default"] = l
                },
                {
                    32 : 32
                }],
                28 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var n = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    s = e(18),
                    o = i(s),
                    l = function() {
                        function e(t, r, i, n) {
                            a(this, e),
                            this.decryptdata = i,
                            this.discardEPB = n,
                            this.decrypter = new o["default"](t, r)
                        }
                        return n(e, [{
                            key: "decryptBuffer",
                            value: function(e, t) {
                                this.decrypter.decrypt(e, this.decryptdata.key.buffer, this.decryptdata.iv.buffer, t)
                            }
                        },
                        {
                            key: "decryptAacSample",
                            value: function(e, t, r, i) {
                                var a = e[t].unit,
                                n = a.subarray(16, a.length - a.length % 16),
                                s = n.buffer.slice(n.byteOffset, n.byteOffset + n.length),
                                o = this;
                                this.decryptBuffer(s,
                                function(n) {
                                    n = new Uint8Array(n),
                                    a.set(n, 16),
                                    i || o.decryptAacSamples(e, t + 1, r)
                                })
                            }
                        },
                        {
                            key: "decryptAacSamples",
                            value: function(e, t, r) {
                                for (;; t++) {
                                    if (t >= e.length) return void r();
                                    if (! (e[t].unit.length < 32)) {
                                        var i = this.decrypter.isSync();
                                        if (this.decryptAacSample(e, t, r, i), !i) return
                                    }
                                }
                            }
                        },
                        {
                            key: "getAvcEncryptedData",
                            value: function(e) {
                                for (var t = 16 * Math.floor((e.length - 48) / 160) + 16, r = new Int8Array(t), i = 0, a = 32; a <= e.length - 16; a += 160, i += 16) r.set(e.subarray(a, a + 16), i);
                                return r
                            }
                        },
                        {
                            key: "getAvcDecryptedUnit",
                            value: function(e, t) {
                                t = new Uint8Array(t);
                                for (var r = 0,
                                i = 32; i <= e.length - 16; i += 160, r += 16) e.set(t.subarray(r, r + 16), i);
                                return e
                            }
                        },
                        {
                            key: "decryptAvcSample",
                            value: function(e, t, r, i, a, n) {
                                var s = this.discardEPB(a.data),
                                o = this.getAvcEncryptedData(s),
                                l = this;
                                this.decryptBuffer(o.buffer,
                                function(o) {
                                    a.data = l.getAvcDecryptedUnit(s, o),
                                    n || l.decryptAvcSamples(e, t, r + 1, i)
                                })
                            }
                        },
                        {
                            key: "decryptAvcSamples",
                            value: function(e, t, r, i) {
                                for (;; t++, r = 0) {
                                    if (t >= e.length) return void i();
                                    for (var a = e[t].units; ! (r >= a.length); r++) {
                                        var n = a[r];
                                        if (! (n.length <= 48 || 1 !== n.type && 5 !== n.type)) {
                                            var s = this.decrypter.isSync();
                                            if (this.decryptAvcSample(e, t, r, i, n, s), !s) return
                                        }
                                    }
                                }
                            }
                        }]),
                        e
                    } ();
                    r["default"] = l
                },
                {
                    18 : 18
                }],
                29 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var n = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    s = e(21),
                    o = i(s),
                    l = e(32),
                    u = i(l),
                    d = e(25),
                    c = i(d),
                    f = e(28),
                    h = i(f),
                    v = e(51),
                    g = e(30),
                    p = function() {
                        function e(t, r, i, n) {
                            a(this, e),
                            this.observer = t,
                            this.config = i,
                            this.typeSupported = n,
                            this.remuxer = r,
                            this.sampleAes = null
                        }
                        return n(e, [{
                            key: "setDecryptData",
                            value: function(e) {
                                null != e && null != e.key && "SAMPLE-AES" === e.method ? this.sampleAes = new h["default"](this.observer, this.config, e, this.discardEPB) : this.sampleAes = null
                            }
                        },
                        {
                            key: "resetInitSegment",
                            value: function(e, t, r, i) {
                                this.pmtParsed = !1,
                                this._pmtId = -1,
                                this._avcTrack = {
                                    container: "video/mp2t",
                                    type: "video",
                                    id: -1,
                                    inputTimeScale: 9e4,
                                    sequenceNumber: 0,
                                    samples: [],
                                    len: 0,
                                    dropped: 0
                                },
                                this._audioTrack = {
                                    container: "video/mp2t",
                                    type: "audio",
                                    id: -1,
                                    inputTimeScale: 9e4,
                                    sequenceNumber: 0,
                                    samples: [],
                                    len: 0,
                                    isAAC: !0
                                },
                                this._id3Track = {
                                    type: "id3",
                                    id: -1,
                                    inputTimeScale: 9e4,
                                    sequenceNumber: 0,
                                    samples: [],
                                    len: 0
                                },
                                this._txtTrack = {
                                    type: "text",
                                    id: -1,
                                    inputTimeScale: 9e4,
                                    sequenceNumber: 0,
                                    samples: [],
                                    len: 0
                                },
                                this.aacOverFlow = null,
                                this.aacLastPTS = null,
                                this.avcSample = null,
                                this.audioCodec = t,
                                this.videoCodec = r,
                                this._duration = i
                            }
                        },
                        {
                            key: "resetTimeStamp",
                            value: function() {}
                        },
                        {
                            key: "append",
                            value: function(e, t, r, i) {
                                var a, n, s, o, l, d, c = e.length,
                                f = !1;
                                this.contiguous = r;
                                var h = this.pmtParsed,
                                p = this._avcTrack,
                                y = this._audioTrack,
                                m = this._id3Track,
                                T = p.id,
                                E = y.id,
                                k = m.id,
                                b = this._pmtId,
                                _ = p.pesData,
                                R = y.pesData,
                                A = m.pesData,
                                S = this._parsePAT,
                                L = this._parsePMT,
                                w = this._parsePES,
                                D = this._parseAVCPES.bind(this),
                                O = this._parseAACPES.bind(this),
                                I = this._parseMPEGPES.bind(this),
                                C = this._parseID3PES.bind(this);
                                for (c -= c % 188, a = 0; a < c; a += 188) if (71 === e[a]) {
                                    if (n = !!(64 & e[a + 1]), s = ((31 & e[a + 1]) << 8) + e[a + 2], o = (48 & e[a + 3]) >> 4, o > 1) {
                                        if (l = a + 5 + e[a + 4], l === a + 188) continue
                                    } else l = a + 4;
                                    switch (s) {
                                    case T:
                                        n && (_ && (d = w(_)) && D(d, !1), _ = {
                                            data: [],
                                            size: 0
                                        }),
                                        _ && (_.data.push(e.subarray(l, a + 188)), _.size += a + 188 - l);
                                        break;
                                    case E:
                                        n && (R && (d = w(R)) && (y.isAAC ? O(d) : I(d)), R = {
                                            data: [],
                                            size: 0
                                        }),
                                        R && (R.data.push(e.subarray(l, a + 188)), R.size += a + 188 - l);
                                        break;
                                    case k:
                                        n && (A && (d = w(A)) && C(d), A = {
                                            data: [],
                                            size: 0
                                        }),
                                        A && (A.data.push(e.subarray(l, a + 188)), A.size += a + 188 - l);
                                        break;
                                    case 0:
                                        n && (l += e[l] + 1),
                                        b = this._pmtId = S(e, l);
                                        break;
                                    case b:
                                        n && (l += e[l] + 1);
                                        var P = L(e, l, this.typeSupported.mpeg === !0 || this.typeSupported.mp3 === !0, null != this.sampleAes);
                                        T = P.avc,
                                        T > 0 && (p.id = T),
                                        E = P.audio,
                                        E > 0 && (y.id = E, y.isAAC = P.isAAC),
                                        k = P.id3,
                                        k > 0 && (m.id = k),
                                        f && !h && (v.logger.log("reparse from beginning"), f = !1, a = -188),
                                        h = this.pmtParsed = !0;
                                        break;
                                    case 17:
                                    case 8191:
                                        break;
                                    default:
                                        f = !0
                                    }
                                } else this.observer.trigger(u["default"].ERROR, {
                                    type: g.ErrorTypes.MEDIA_ERROR,
                                    details: g.ErrorDetails.FRAG_PARSING_ERROR,
                                    fatal: !1,
                                    reason: "TS packet did not start with 0x47"
                                });
                                _ && (d = w(_)) ? (D(d, !0), p.pesData = null) : p.pesData = _,
                                R && (d = w(R)) ? (y.isAAC ? O(d) : I(d), y.pesData = null) : (R && R.size && v.logger.log("last AAC PES packet truncated,might overlap between fragments"), y.pesData = R),
                                A && (d = w(A)) ? (C(d), m.pesData = null) : m.pesData = A,
                                null == this.sampleAes ? this.remuxer.remux(y, p, m, this._txtTrack, t, r, i) : this.decryptAndRemux(y, p, m, this._txtTrack, t, r, i)
                            }
                        },
                        {
                            key: "decryptAndRemux",
                            value: function(e, t, r, i, a, n, s) {
                                if (e.samples && e.isAAC) {
                                    var o = this;
                                    this.sampleAes.decryptAacSamples(e.samples, 0,
                                    function() {
                                        o.decryptAndRemuxAvc(e, t, r, i, a, n, s)
                                    })
                                } else this.decryptAndRemuxAvc(e, t, r, i, a, n, s)
                            }
                        },
                        {
                            key: "decryptAndRemuxAvc",
                            value: function(e, t, r, i, a, n, s) {
                                if (t.samples) {
                                    var o = this;
                                    this.sampleAes.decryptAvcSamples(t.samples, 0, 0,
                                    function() {
                                        o.remuxer.remux(e, t, r, i, a, n, s)
                                    })
                                } else this.remuxer.remux(e, t, r, i, a, n, s)
                            }
                        },
                        {
                            key: "destroy",
                            value: function() {
                                this._initPTS = this._initDTS = void 0,
                                this._duration = 0
                            }
                        },
                        {
                            key: "_parsePAT",
                            value: function(e, t) {
                                return (31 & e[t + 10]) << 8 | e[t + 11]
                            }
                        },
                        {
                            key: "_parsePMT",
                            value: function(e, t, r, i) {
                                var a, n, s, o, l = {
                                    audio: -1,
                                    avc: -1,
                                    id3: -1,
                                    isAAC: !0
                                };
                                for (a = (15 & e[t + 1]) << 8 | e[t + 2], n = t + 3 + a - 4, s = (15 & e[t + 10]) << 8 | e[t + 11], t += 12 + s; t < n;) {
                                    switch (o = (31 & e[t + 1]) << 8 | e[t + 2], e[t]) {
                                    case 207:
                                        if (!i) {
                                            v.logger.log("unkown stream type:" + e[t]);
                                            break
                                        }
                                    case 15:
                                        l.audio === -1 && (l.audio = o);
                                        break;
                                    case 21:
                                        l.id3 === -1 && (l.id3 = o);
                                        break;
                                    case 219:
                                        if (!i) {
                                            v.logger.log("unkown stream type:" + e[t]);
                                            break
                                        }
                                    case 27:
                                        l.avc === -1 && (l.avc = o);
                                        break;
                                    case 3:
                                    case 4:
                                        r ? l.audio === -1 && (l.audio = o, l.isAAC = !1) : v.logger.log("MPEG audio found, not supported in this browser for now");
                                        break;
                                    case 36:
                                        v.logger.warn("HEVC stream type found, not supported for now");
                                        break;
                                    default:
                                        v.logger.log("unkown stream type:" + e[t])
                                    }
                                    t += ((15 & e[t + 3]) << 8 | e[t + 4]) + 5
                                }
                                return l
                            }
                        },
                        {
                            key: "_parsePES",
                            value: function(e) {
                                var t, r, i, a, n, s, o, l, u, d = 0,
                                c = e.data;
                                if (!e || 0 === e.size) return null;
                                for (; c[0].length < 19 && c.length > 1;) {
                                    var f = new Uint8Array(c[0].length + c[1].length);
                                    f.set(c[0]),
                                    f.set(c[1], c[0].length),
                                    c[0] = f,
                                    c.splice(1, 1)
                                }
                                if (t = c[0], i = (t[0] << 16) + (t[1] << 8) + t[2], 1 === i) {
                                    if (a = (t[4] << 8) + t[5], a && a > e.size - 6) return null;
                                    r = t[7],
                                    192 & r && (o = 536870912 * (14 & t[9]) + 4194304 * (255 & t[10]) + 16384 * (254 & t[11]) + 128 * (255 & t[12]) + (254 & t[13]) / 2, o > 4294967295 && (o -= 8589934592), 64 & r ? (l = 536870912 * (14 & t[14]) + 4194304 * (255 & t[15]) + 16384 * (254 & t[16]) + 128 * (255 & t[17]) + (254 & t[18]) / 2, l > 4294967295 && (l -= 8589934592), o - l > 54e5 && (v.logger.warn(Math.round((o - l) / 9e4) + "s delta between PTS and DTS, align them"), o = l)) : l = o),
                                    n = t[8],
                                    u = n + 9,
                                    e.size -= u,
                                    s = new Uint8Array(e.size);
                                    for (var h = 0,
                                    g = c.length; h < g; h++) {
                                        t = c[h];
                                        var p = t.byteLength;
                                        if (u) {
                                            if (u > p) {
                                                u -= p;
                                                continue
                                            }
                                            t = t.subarray(u),
                                            p -= u,
                                            u = 0
                                        }
                                        s.set(t, d),
                                        d += p
                                    }
                                    return a && (a -= n + 3),
                                    {
                                        data: s,
                                        pts: o,
                                        dts: l,
                                        len: a
                                    }
                                }
                                return null
                            }
                        },
                        {
                            key: "pushAccesUnit",
                            value: function(e, t) {
                                if (e.units.length && e.frame) {
                                    var r = t.samples,
                                    i = r.length; ! this.config.forceKeyFrameOnDiscontinuity || e.key === !0 || t.sps && (i || this.contiguous) ? (e.id = i, r.push(e)) : t.dropped++
                                }
                                e.debug.length && v.logger.log(e.pts + "/" + e.dts + ":" + e.debug)
                            }
                        },
                        {
                            key: "_parseAVCPES",
                            value: function(e, t) {
                                var r, i, a, n = this,
                                s = this._avcTrack,
                                o = this._parseAVCNALu(e.data),
                                l = !1,
                                u = this.avcSample;
                                e.data = null,
                                o.forEach(function(t) {
                                    switch (t.type) {
                                    case 1:
                                        i = !0,
                                        l && u && (u.debug += "NDR "),
                                        u.frame = !0;
                                        var o = t.data;
                                        if (o.length > 4) {
                                            var d = new c["default"](o).readSliceType();
                                            2 !== d && 4 !== d && 7 !== d && 9 !== d || (u.key = !0)
                                        }
                                        break;
                                    case 5:
                                        i = !0,
                                        u || (u = n.avcSample = n._createAVCSample(!0, e.pts, e.dts, "")),
                                        l && (u.debug += "IDR "),
                                        u.key = !0,
                                        u.frame = !0;
                                        break;
                                    case 6:
                                        i = !0,
                                        l && u && (u.debug += "SEI "),
                                        r = new c["default"](n.discardEPB(t.data)),
                                        r.readUByte();
                                        for (var f = 0,
                                        h = 0,
                                        v = !1,
                                        g = 0; ! v && r.bytesAvailable > 1;) {
                                            f = 0;
                                            do g = r.readUByte(),
                                            f += g;
                                            while (255 === g);
                                            h = 0;
                                            do g = r.readUByte(),
                                            h += g;
                                            while (255 === g);
                                            if (4 === f && 0 !== r.bytesAvailable) {
                                                v = !0;
                                                var p = r.readUByte();
                                                if (181 === p) {
                                                    var y = r.readUShort();
                                                    if (49 === y) {
                                                        var m = r.readUInt();
                                                        if (1195456820 === m) {
                                                            var T = r.readUByte();
                                                            if (3 === T) {
                                                                var E = r.readUByte(),
                                                                k = r.readUByte(),
                                                                b = 31 & E,
                                                                _ = [E, k];
                                                                for (a = 0; a < b; a++) _.push(r.readUByte()),
                                                                _.push(r.readUByte()),
                                                                _.push(r.readUByte());
                                                                n._insertSampleInOrder(n._txtTrack.samples, {
                                                                    type: 3,
                                                                    pts: e.pts,
                                                                    bytes: _
                                                                })
                                                            }
                                                        }
                                                    }
                                                }
                                            } else if (h < r.bytesAvailable) for (a = 0; a < h; a++) r.readUByte()
                                        }
                                        break;
                                    case 7:
                                        if (i = !0, l && u && (u.debug += "SPS "), !s.sps) {
                                            r = new c["default"](t.data);
                                            var R = r.readSPS();
                                            s.width = R.width,
                                            s.height = R.height,
                                            s.pixelRatio = R.pixelRatio,
                                            s.sps = [t.data],
                                            s.duration = n._duration;
                                            var A = t.data.subarray(1, 4),
                                            S = "avc1.";
                                            for (a = 0; a < 3; a++) {
                                                var L = A[a].toString(16);
                                                L.length < 2 && (L = "0" + L),
                                                S += L
                                            }
                                            s.codec = S
                                        }
                                        break;
                                    case 8:
                                        i = !0,
                                        l && u && (u.debug += "PPS "),
                                        s.pps || (s.pps = [t.data]);
                                        break;
                                    case 9:
                                        i = !1,
                                        u && n.pushAccesUnit(u, s),
                                        u = n.avcSample = n._createAVCSample(!1, e.pts, e.dts, l ? "AUD ": "");
                                        break;
                                    case 12:
                                        i = !1;
                                        break;
                                    default:
                                        i = !1,
                                        u && (u.debug += "unknown NAL " + t.type + " ")
                                    }
                                    if (u && i) {
                                        var w = u.units;
                                        w.push(t)
                                    }
                                }),
                                t && u && (this.pushAccesUnit(u, s), this.avcSample = null)
                            }
                        },
                        {
                            key: "_createAVCSample",
                            value: function(e, t, r, i) {
                                return {
                                    key: e,
                                    pts: t,
                                    dts: r,
                                    units: [],
                                    debug: i
                                }
                            }
                        },
                        {
                            key: "_insertSampleInOrder",
                            value: function(e, t) {
                                var r = e.length;
                                if (r > 0) {
                                    if (t.pts >= e[r - 1].pts) e.push(t);
                                    else for (var i = r - 1; i >= 0; i--) if (t.pts < e[i].pts) {
                                        e.splice(i, 0, t);
                                        break
                                    }
                                } else e.push(t)
                            }
                        },
                        {
                            key: "_getLastNalUnit",
                            value: function() {
                                var e = this.avcSample,
                                t = void 0;
                                if (!e || 0 === e.units.length) {
                                    var r = this._avcTrack,
                                    i = r.samples;
                                    e = i[i.length - 1]
                                }
                                if (e) {
                                    var a = e.units;
                                    t = a[a.length - 1]
                                }
                                return t
                            }
                        },
                        {
                            key: "_parseAVCNALu",
                            value: function(e) {
                                var t, r, i, a, n, s = 0,
                                o = e.byteLength,
                                l = this._avcTrack,
                                u = l.naluState || 0,
                                d = u,
                                c = [],
                                f = -1;
                                for (u === -1 && (f = 0, n = 31 & e[0], u = 0, s = 1); s < o;) if (t = e[s++], u) if (1 !== u) if (t) if (1 === t) {
                                    if (f >= 0) i = {
                                        data: e.subarray(f, s - u - 1),
                                        type: n
                                    },
                                    c.push(i);
                                    else {
                                        var h = this._getLastNalUnit();
                                        if (h && (d && s <= 4 - d && h.state && (h.data = h.data.subarray(0, h.data.byteLength - d)), r = s - u - 1, r > 0)) {
                                            var v = new Uint8Array(h.data.byteLength + r);
                                            v.set(h.data, 0),
                                            v.set(e.subarray(0, r), h.data.byteLength),
                                            h.data = v
                                        }
                                    }
                                    s < o ? (a = 31 & e[s], f = s, n = a, u = 0) : u = -1
                                } else u = 0;
                                else u = 3;
                                else u = t ? 0 : 2;
                                else u = t ? 0 : 1;
                                if (f >= 0 && u >= 0 && (i = {
                                    data: e.subarray(f, o),
                                    type: n,
                                    state: u
                                },
                                c.push(i)), 0 === c.length) {
                                    var g = this._getLastNalUnit();
                                    if (g) {
                                        var p = new Uint8Array(g.data.byteLength + e.byteLength);
                                        p.set(g.data, 0),
                                        p.set(e, g.data.byteLength),
                                        g.data = p
                                    }
                                }
                                return l.naluState = u,
                                c
                            }
                        },
                        {
                            key: "discardEPB",
                            value: function(e) {
                                for (var t, r, i = e.byteLength,
                                a = [], n = 1; n < i - 2;) 0 === e[n] && 0 === e[n + 1] && 3 === e[n + 2] ? (a.push(n + 2), n += 2) : n++;
                                if (0 === a.length) return e;
                                t = i - a.length,
                                r = new Uint8Array(t);
                                var s = 0;
                                for (n = 0; n < t; s++, n++) s === a[0] && (s++, a.shift()),
                                r[n] = e[s];
                                return r
                            }
                        },
                        {
                            key: "_parseAACPES",
                            value: function(e) {
                                var t, r, i, a, n, s, l, d, c, f = this._audioTrack,
                                h = e.data,
                                p = e.pts,
                                y = 0,
                                m = this.aacOverFlow,
                                T = this.aacLastPTS;
                                if (m) {
                                    var E = new Uint8Array(m.byteLength + h.byteLength);
                                    E.set(m, 0),
                                    E.set(h, m.byteLength),
                                    h = E
                                }
                                for (n = y, d = h.length; n < d - 1 && (255 !== h[n] || 240 !== (240 & h[n + 1])); n++);
                                if (n) {
                                    var k, b;
                                    if (n < d - 1 ? (k = "AAC PES did not start with ADTS header,offset:" + n, b = !1) : (k = "no ADTS header found in AAC PES", b = !0), v.logger.warn("parsing error:" + k), this.observer.trigger(u["default"].ERROR, {
                                        type: g.ErrorTypes.MEDIA_ERROR,
                                        details: g.ErrorDetails.FRAG_PARSING_ERROR,
                                        fatal: b,
                                        reason: k
                                    }), b) return
                                }
                                if (!f.samplerate) {
                                    var _ = this.audioCodec;
                                    t = o["default"].getAudioConfig(this.observer, h, n, _),
                                    f.config = t.config,
                                    f.samplerate = t.samplerate,
                                    f.channelCount = t.channelCount,
                                    f.codec = t.codec,
                                    f.manifestCodec = t.manifestCodec,
                                    f.duration = this._duration,
                                    v.logger.log("parsed codec:" + f.codec + ",rate:" + t.samplerate + ",nb channel:" + t.channelCount)
                                }
                                if (a = 0, i = 9216e4 / f.samplerate, m && T) {
                                    var R = T + i;
                                    Math.abs(R - p) > 1 && (v.logger.log("AAC: align PTS for overlapping frames by " + Math.round((R - p) / 90)), p = R)
                                }
                                for (; n + 5 < d && (s = 1 & h[n + 1] ? 7 : 9, r = (3 & h[n + 3]) << 11 | h[n + 4] << 3 | (224 & h[n + 5]) >>> 5, r -= s, r > 0 && n + s + r <= d);) for (l = p + a * i, c = {
                                    unit: h.subarray(n + s, n + s + r),
                                    pts: l,
                                    dts: l
                                },
                                f.samples.push(c), f.len += r, n += r + s, a++; n < d - 1 && (255 !== h[n] || 240 !== (240 & h[n + 1])); n++);
                                m = n < d ? h.subarray(n, d) : null,
                                this.aacOverFlow = m,
                                this.aacLastPTS = l
                            }
                        },
                        {
                            key: "_parseMPEGPES",
                            value: function(e) {
                                for (var t, r = e.data,
                                i = e.pts,
                                a = r.length,
                                n = 0,
                                s = 0; s < a && (t = this._parseMpeg(r, s, a, n++, i)) > 0;) s += t
                            }
                        },
                        {
                            key: "_onMpegFrame",
                            value: function(e, t, r, i, a, n) {
                                var s = 1152 / r * 1e3,
                                o = n + a * s,
                                l = this._audioTrack;
                                l.config = [],
                                l.channelCount = i,
                                l.samplerate = r,
                                l.duration = this._duration,
                                l.samples.push({
                                    unit: e,
                                    pts: o,
                                    dts: o
                                }),
                                l.len += e.length
                            }
                        },
                        {
                            key: "_onMpegNoise",
                            value: function(e) {
                                v.logger.warn("mpeg audio has noise: " + e.length + " bytes")
                            }
                        },
                        {
                            key: "_parseMpeg",
                            value: function(e, t, r, i, a) {
                                var n = [32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],
                                s = [44100, 48e3, 32e3, 22050, 24e3, 16e3, 11025, 12e3, 8e3];
                                if (t + 2 > r) return - 1;
                                if (255 === e[t] || 224 === (224 & e[t + 1])) {
                                    if (t + 24 > r) return - 1;
                                    var o = e[t + 1] >> 3 & 3,
                                    l = e[t + 1] >> 1 & 3,
                                    u = e[t + 2] >> 4 & 15,
                                    d = e[t + 2] >> 2 & 3,
                                    c = !!(2 & e[t + 2]);
                                    if (1 !== o && 0 !== u && 15 !== u && 3 !== d) {
                                        var f = 3 === o ? 3 - l: 3 === l ? 3 : 4,
                                        h = 1e3 * n[14 * f + u - 1],
                                        v = 3 === o ? 0 : 2 === o ? 1 : 2,
                                        g = s[3 * v + d],
                                        p = c ? 1 : 0,
                                        y = e[t + 3] >> 6 === 3 ? 1 : 2,
                                        m = 3 === l ? (3 === o ? 12 : 6) * h / g + p << 2 : (3 === o ? 144 : 72) * h / g + p | 0;
                                        return t + m > r ? -1 : (this._onMpegFrame && this._onMpegFrame(e.subarray(t, t + m), h, g, y, i, a), m)
                                    }
                                }
                                for (var T = t + 2; T < r;) {
                                    if (255 === e[T - 1] && 224 === (224 & e[T])) return this._onMpegNoise && this._onMpegNoise(e.subarray(t, T - 1)),
                                    T - t - 1;
                                    T++
                                }
                                return - 1
                            }
                        },
                        {
                            key: "_parseID3PES",
                            value: function(e) {
                                this._id3Track.samples.push(e)
                            }
                        }], [{
                            key: "probe",
                            value: function(e) {
                                return e.length >= 564 && 71 === e[0] && 71 === e[188] && 71 === e[376]
                            }
                        }]),
                        e
                    } ();
                    r["default"] = p
                },
                {
                    21 : 21,
                    25 : 25,
                    28 : 28,
                    30 : 30,
                    32 : 32,
                    51 : 51
                }],
                30 : [function(e, t, r) {
                    "use strict";
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    r.ErrorTypes = {
                        NETWORK_ERROR: "networkError",
                        MEDIA_ERROR: "mediaError",
                        MUX_ERROR: "muxError",
                        OTHER_ERROR: "otherError"
                    },
                    r.ErrorDetails = {
                        MANIFEST_LOAD_ERROR: "manifestLoadError",
                        MANIFEST_LOAD_TIMEOUT: "manifestLoadTimeOut",
                        MANIFEST_PARSING_ERROR: "manifestParsingError",
                        MANIFEST_INCOMPATIBLE_CODECS_ERROR: "manifestIncompatibleCodecsError",
                        MANIFEST_EMPTY_ERROR: "manifestEmptyError",
                        LEVEL_LOAD_ERROR: "levelLoadError",
                        LEVEL_LOAD_TIMEOUT: "levelLoadTimeOut",
                        LEVEL_SWITCH_ERROR: "levelSwitchError",
                        AUDIO_TRACK_LOAD_ERROR: "audioTrackLoadError",
                        AUDIO_TRACK_LOAD_TIMEOUT: "audioTrackLoadTimeOut",
                        FRAG_LOAD_ERROR: "fragLoadError",
                        FRAG_LOOP_LOADING_ERROR: "fragLoopLoadingError",
                        FRAG_LOAD_TIMEOUT: "fragLoadTimeOut",
                        FRAG_DECRYPT_ERROR: "fragDecryptError",
                        FRAG_PARSING_ERROR: "fragParsingError",
                        REMUX_ALLOC_ERROR: "remuxAllocError",
                        KEY_LOAD_ERROR: "keyLoadError",
                        KEY_LOAD_TIMEOUT: "keyLoadTimeOut",
                        BUFFER_ADD_CODEC_ERROR: "bufferAddCodecError",
                        BUFFER_APPEND_ERROR: "bufferAppendError",
                        BUFFER_APPENDING_ERROR: "bufferAppendingError",
                        BUFFER_STALLED_ERROR: "bufferStalledError",
                        BUFFER_FULL_ERROR: "bufferFullError",
                        BUFFER_SEEK_OVER_HOLE: "bufferSeekOverHole",
                        BUFFER_NUDGE_ON_STALL: "bufferNudgeOnStall",
                        INTERNAL_EXCEPTION: "internalException",
                        WEBVTT_EXCEPTION: "webVTTException"
                    }
                },
                {}],
                31 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
                    function(e) {
                        return typeof e
                    }: function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
                    },
                    s = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    o = e(51),
                    l = e(30),
                    u = e(32),
                    d = i(u),
                    c = function() {
                        function e(t) {
                            a(this, e),
                            this.hls = t,
                            this.onEvent = this.onEvent.bind(this);
                            for (var r = arguments.length,
                            i = Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++) i[n - 1] = arguments[n];
                            this.handledEvents = i,
                            this.useGenericHandler = !0,
                            this.registerListeners()
                        }
                        return s(e, [{
                            key: "destroy",
                            value: function() {
                                this.unregisterListeners()
                            }
                        },
                        {
                            key: "isEventHandler",
                            value: function() {
                                return "object" === n(this.handledEvents) && this.handledEvents.length && "function" == typeof this.onEvent
                            }
                        },
                        {
                            key: "registerListeners",
                            value: function() {
                                this.isEventHandler() && this.handledEvents.forEach(function(e) {
                                    if ("hlsEventGeneric" === e) throw new Error("Forbidden event name: " + e);
                                    this.hls.on(e, this.onEvent)
                                }.bind(this))
                            }
                        },
                        {
                            key: "unregisterListeners",
                            value: function() {
                                this.isEventHandler() && this.handledEvents.forEach(function(e) {
                                    this.hls.off(e, this.onEvent)
                                }.bind(this))
                            }
                        },
                        {
                            key: "onEvent",
                            value: function(e, t) {
                                this.onEventGeneric(e, t)
                            }
                        },
                        {
                            key: "onEventGeneric",
                            value: function(e, t) {
                                var r = function(e, t) {
                                    var r = "on" + e.replace("hls", "");
                                    if ("function" != typeof this[r]) throw new Error("Event " + e + " has no generic handler in this " + this.constructor.name + " class (tried " + r + ")");
                                    return this[r].bind(this, t)
                                };
                                try {
                                    r.call(this, e, t).call()
                                } catch(i) {
                                    o.logger.error("internal error happened while processing " + e + ":" + i.message),
                                    this.hls.trigger(d["default"].ERROR, {
                                        type: l.ErrorTypes.OTHER_ERROR,
                                        details: l.ErrorDetails.INTERNAL_EXCEPTION,
                                        fatal: !1,
                                        event: e,
                                        err: i
                                    })
                                }
                            }
                        }]),
                        e
                    } ();
                    r["default"] = c
                },
                {
                    30 : 30,
                    32 : 32,
                    51 : 51
                }],
                32 : [function(e, t, r) {
                    "use strict";
                    t.exports = {
                        MEDIA_ATTACHING: "hlsMediaAttaching",
                        MEDIA_ATTACHED: "hlsMediaAttached",
                        MEDIA_DETACHING: "hlsMediaDetaching",
                        MEDIA_DETACHED: "hlsMediaDetached",
                        BUFFER_RESET: "hlsBufferReset",
                        BUFFER_CODECS: "hlsBufferCodecs",
                        BUFFER_CREATED: "hlsBufferCreated",
                        BUFFER_APPENDING: "hlsBufferAppending",
                        BUFFER_APPENDED: "hlsBufferAppended",
                        BUFFER_EOS: "hlsBufferEos",
                        BUFFER_FLUSHING: "hlsBufferFlushing",
                        BUFFER_FLUSHED: "hlsBufferFlushed",
                        MANIFEST_LOADING: "hlsManifestLoading",
                        MANIFEST_LOADED: "hlsManifestLoaded",
                        MANIFEST_PARSED: "hlsManifestParsed",
                        LEVEL_SWITCH: "hlsLevelSwitch",
                        LEVEL_SWITCHING: "hlsLevelSwitching",
                        LEVEL_SWITCHED: "hlsLevelSwitched",
                        LEVEL_LOADING: "hlsLevelLoading",
                        LEVEL_LOADED: "hlsLevelLoaded",
                        LEVEL_UPDATED: "hlsLevelUpdated",
                        LEVEL_PTS_UPDATED: "hlsLevelPtsUpdated",
                        LEVEL_REMOVED: "hlsLevelRemoved",
                        AUDIO_TRACKS_UPDATED: "hlsAudioTracksUpdated",
                        AUDIO_TRACK_SWITCH: "hlsAudioTrackSwitch",
                        AUDIO_TRACK_SWITCHING: "hlsAudioTrackSwitching",
                        AUDIO_TRACK_SWITCHED: "hlsAudioTrackSwitched",
                        AUDIO_TRACK_LOADING: "hlsAudioTrackLoading",
                        AUDIO_TRACK_LOADED: "hlsAudioTrackLoaded",
                        SUBTITLE_TRACKS_UPDATED: "hlsSubtitleTracksUpdated",
                        SUBTITLE_TRACK_SWITCH: "hlsSubtitleTrackSwitch",
                        SUBTITLE_TRACK_LOADING: "hlsSubtitleTrackLoading",
                        SUBTITLE_TRACK_LOADED: "hlsSubtitleTrackLoaded",
                        SUBTITLE_FRAG_PROCESSED: "hlsSubtitleFragProcessed",
                        CUES_PARSED: "hlsCuesParsed",
                        NON_NATIVE_TEXT_TRACKS_FOUND: "hlsNonNativeTextTracksFound",
                        INIT_PTS_FOUND: "hlsInitPtsFound",
                        FRAG_LOADING: "hlsFragLoading",
                        FRAG_LOAD_PROGRESS: "hlsFragLoadProgress",
                        FRAG_LOAD_EMERGENCY_ABORTED: "hlsFragLoadEmergencyAborted",
                        FRAG_LOADED: "hlsFragLoaded",
                        FRAG_DECRYPT_STARTED: "hlsFragDecryptStarted",
                        FRAG_DECRYPTED: "hlsFragDecrypted",
                        FRAG_PARSING_INIT_SEGMENT: "hlsFragParsingInitSegment",
                        FRAG_PARSING_USERDATA: "hlsFragParsingUserdata",
                        FRAG_PARSING_METADATA: "hlsFragParsingMetadata",
                        FRAG_PARSING_DATA: "hlsFragParsingData",
                        FRAG_PARSED: "hlsFragParsed",
                        FRAG_BUFFERED: "hlsFragBuffered",
                        FRAG_CHANGED: "hlsFragChanged",
                        FPS_DROP: "hlsFpsDrop",
                        FPS_DROP_LEVEL_CAPPING: "hlsFpsDropLevelCapping",
                        ERROR: "hlsError",
                        DESTROYING: "hlsDestroying",
                        KEY_LOADING: "hlsKeyLoading",
                        KEY_LOADED: "hlsKeyLoaded",
                        STREAM_STATE_TRANSITION: "hlsStreamStateTransition"
                    }
                },
                {}],
                33 : [function(e, t, r) {
                    "use strict";
                    function i(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var a = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    n = function() {
                        function e() {
                            i(this, e)
                        }
                        return a(e, null, [{
                            key: "getSilentFrame",
                            value: function(e, t) {
                                switch (e) {
                                case "mp4a.40.2":
                                    if (1 === t) return new Uint8Array([0, 200, 0, 128, 35, 128]);
                                    if (2 === t) return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]);
                                    if (3 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]);
                                    if (4 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]);
                                    if (5 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]);
                                    if (6 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]);
                                    break;
                                default:
                                    if (1 === t) return new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                                    if (2 === t) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                                    if (3 === t) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94])
                                }
                                return null
                            }
                        }]),
                        e
                    } ();
                    r["default"] = n
                },
                {}],
                34 : [function(e, t, r) {
                    "use strict";
                    var i = {
                        isBuffered: function(e, t) {
                            if (e) for (var r = e.buffered,
                            i = 0; i < r.length; i++) if (t >= r.start(i) && t <= r.end(i)) return ! 0;
                            return ! 1
                        },
                        bufferInfo: function(e, t, r) {
                            var i = {
                                len: 0,
                                start: t,
                                end: t,
                                nextStart: void 0
                            };
                            if (!e) return i;
                            try {
                                for (var a = e.buffered,
                                n = [], s = 0; s < a.length; s++) n.push({
                                    start: a.start(s),
                                    end: a.end(s)
                                });
                                return this.bufferedInfo(n, t, r)
                            } catch(o) {
                                return i
                            }
                        },
                        bufferedInfo: function(e, t, r) {
                            var i, a, n, s, o, l = [];
                            for (e.sort(function(e, t) {
                                var r = e.start - t.start;
                                return r ? r: t.end - e.end
                            }), o = 0; o < e.length; o++) {
                                var u = l.length;
                                if (u) {
                                    var d = l[u - 1].end;
                                    e[o].start - d < r ? e[o].end > d && (l[u - 1].end = e[o].end) : l.push(e[o])
                                } else l.push(e[o])
                            }
                            for (o = 0, i = 0, a = n = t; o < l.length; o++) {
                                var c = l[o].start,
                                f = l[o].end;
                                if (t + r >= c && t < f) a = c,
                                n = f,
                                i = n - t;
                                else if (t + r < c) {
                                    s = c;
                                    break
                                }
                            }
                            return {
                                len: i,
                                start: a || 0,
                                end: n || 0,
                                nextStart: s
                            }
                        }
                    };
                    t.exports = i
                },
                {}],
                35 : [function(e, t, r) {
                    "use strict";
                    var i = e(51),
                    a = {
                        mergeDetails: function(e, t) {
                            var r, n = Math.max(e.startSN, t.startSN) - t.startSN,
                            s = Math.min(e.endSN, t.endSN) - t.startSN,
                            o = t.startSN - e.startSN,
                            l = e.fragments,
                            u = t.fragments,
                            d = 0;
                            if (s < n) return void(t.PTSKnown = !1);
                            for (var c = n; c <= s; c++) {
                                var f = l[o + c],
                                h = u[c];
                                h && f && (d = f.cc - h.cc, isNaN(f.startPTS) || (h.start = h.startPTS = f.startPTS, h.endPTS = f.endPTS, h.duration = f.duration, h.backtracked = f.backtracked, h.dropped = f.dropped, r = h))
                            }
                            if (d) for (i.logger.log("discontinuity sliding from playlist, take drift into account"), c = 0; c < u.length; c++) u[c].cc += d;
                            if (r) a.updateFragPTSDTS(t, r.sn, r.startPTS, r.endPTS, r.startDTS, r.endDTS);
                            else if (o >= 0 && o < l.length) {
                                var v = l[o].start;
                                for (c = 0; c < u.length; c++) u[c].start += v
                            }
                            t.PTSKnown = e.PTSKnown
                        },
                        updateFragPTSDTS: function(e, t, r, i, n, s) {
                            var o, l, u, d;
                            if (!e || t < e.startSN || t > e.endSN) return 0;
                            if (o = t - e.startSN, l = e.fragments, u = l[o], !isNaN(u.startPTS)) {
                                var c = Math.abs(u.startPTS - r);
                                isNaN(u.deltaPTS) ? u.deltaPTS = c: u.deltaPTS = Math.max(c, u.deltaPTS),
                                r = Math.min(r, u.startPTS),
                                i = Math.max(i, u.endPTS),
                                n = Math.min(n, u.startDTS),
                                s = Math.max(s, u.endDTS)
                            }
                            var f = r - u.start;
                            for (u.start = u.startPTS = r, u.endPTS = i, u.startDTS = n, u.endDTS = s, u.duration = i - r, d = o; d > 0; d--) a.updatePTS(l, d, d - 1);
                            for (d = o; d < l.length - 1; d++) a.updatePTS(l, d, d + 1);
                            return e.PTSKnown = !0,
                            f
                        },
                        updatePTS: function(e, t, r) {
                            var a = e[t],
                            n = e[r],
                            s = n.startPTS;
                            isNaN(s) ? r > t ? n.start = a.start + a.duration: n.start = Math.max(a.start - n.duration, 0) : r > t ? (a.duration = s - a.start, a.duration < 0 && i.logger.warn("negative duration computed for frag " + a.sn + ",level " + a.level + ", there should be some duration drift between playlist and fragment!")) : (n.duration = a.start - s, n.duration < 0 && i.logger.warn("negative duration computed for frag " + n.sn + ",level " + n.level + ", there should be some duration drift between playlist and fragment!"))
                        }
                    };
                    t.exports = a
                },
                {
                    51 : 51
                }],
                36 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var n = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    s = e(2),
                    o = i(s),
                    l = e(32),
                    u = i(l),
                    d = e(30),
                    c = e(40),
                    f = i(c),
                    h = e(38),
                    v = i(h),
                    g = e(39),
                    p = i(g),
                    y = e(12),
                    m = i(y),
                    T = e(11),
                    E = i(T),
                    k = e(51),
                    b = e(1),
                    _ = i(b),
                    R = e(4),
                    A = function() {
                        function e() {
                            var t = this,
                            r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            a(this, e);
                            var i = e.DefaultConfig;
                            if ((r.liveSyncDurationCount || r.liveMaxLatencyDurationCount) && (r.liveSyncDuration || r.liveMaxLatencyDuration)) throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration");
                            for (var n in i) n in r || (r[n] = i[n]);
                            if (void 0 !== r.liveMaxLatencyDurationCount && r.liveMaxLatencyDurationCount <= r.liveSyncDurationCount) throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be gt "liveSyncDurationCount"');
                            if (void 0 !== r.liveMaxLatencyDuration && (r.liveMaxLatencyDuration <= r.liveSyncDuration || void 0 === r.liveSyncDuration)) throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be gt "liveSyncDuration"'); (0, k.enableLogs)(r.debug),
                            this.config = r,
                            this._autoLevelCapping = -1;
                            var s = this.observer = new _["default"];
                            s.trigger = function(e) {
                                for (var t = arguments.length,
                                r = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) r[i - 1] = arguments[i];
                                s.emit.apply(s, [e, e].concat(r))
                            },
                            s.off = function(e) {
                                for (var t = arguments.length,
                                r = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) r[i - 1] = arguments[i];
                                s.removeListener.apply(s, [e].concat(r))
                            },
                            this.on = s.on.bind(s),
                            this.off = s.off.bind(s),
                            this.trigger = s.trigger.bind(s);
                            var o = this.abrController = new r.abrController(this),
                            l = new r.bufferController(this),
                            u = new r.capLevelController(this),
                            d = new r.fpsController(this),
                            c = new f["default"](this),
                            h = new v["default"](this),
                            g = new p["default"](this),
                            y = this.levelController = new E["default"](this),
                            T = this.streamController = new m["default"](this),
                            b = [y, T],
                            R = r.audioStreamController;
                            R && b.push(new R(this)),
                            this.networkControllers = b;
                            var A = [c, h, g, o, l, u, d];
                            if (R = r.audioTrackController) {
                                var S = new R(this);
                                this.audioTrackController = S,
                                A.push(S)
                            }
                            if (R = r.subtitleTrackController) {
                                var L = new R(this);
                                this.subtitleTrackController = L,
                                A.push(L)
                            } [r.subtitleStreamController, r.timelineController].forEach(function(e) {
                                e && A.push(new e(t))
                            }),
                            this.coreComponents = A
                        }
                        return n(e, null, [{
                            key: "isSupported",
                            value: function() {
                                return window.MediaSource = window.MediaSource || window.WebKitMediaSource,
                                window.MediaSource && "function" == typeof window.MediaSource.isTypeSupported && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')
                            }
                        },
                        {
                            key: "version",
                            get: function() {
                                return "0.7.5"
                            }
                        },
                        {
                            key: "Events",
                            get: function() {
                                return u["default"]
                            }
                        },
                        {
                            key: "ErrorTypes",
                            get: function() {
                                return d.ErrorTypes
                            }
                        },
                        {
                            key: "ErrorDetails",
                            get: function() {
                                return d.ErrorDetails
                            }
                        },
                        {
                            key: "DefaultConfig",
                            get: function() {
                                return e.defaultConfig ? e.defaultConfig: R.hlsDefaultConfig
                            },
                            set: function(t) {
                                e.defaultConfig = t
                            }
                        }]),
                        n(e, [{
                            key: "destroy",
                            value: function() {
                                k.logger.log("destroy"),
                                this.trigger(u["default"].DESTROYING),
                                this.detachMedia(),
                                this.coreComponents.concat(this.networkControllers).forEach(function(e) {
                                    e.destroy()
                                }),
                                this.url = null,
                                this.observer.removeAllListeners(),
                                this._autoLevelCapping = -1
                            }
                        },
                        {
                            key: "attachMedia",
                            value: function(e) {
                                k.logger.log("attachMedia"),
                                this.media = e,
                                this.trigger(u["default"].MEDIA_ATTACHING, {
                                    media: e
                                })
                            }
                        },
                        {
                            key: "detachMedia",
                            value: function() {
                                k.logger.log("detachMedia"),
                                this.trigger(u["default"].MEDIA_DETACHING),
                                this.media = null
                            }
                        },
                        {
                            key: "loadSource",
                            value: function(e) {
                                e = o["default"].buildAbsoluteURL(window.location.href, e, {
                                    alwaysNormalize: !0
                                }),
                                k.logger.log("loadSource:" + e),
                                this.url = e,
                                this.trigger(u["default"].MANIFEST_LOADING, {
                                    url: e
                                })
                            }
                        },
                        {
                            key: "startLoad",
                            value: function() {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
                                k.logger.log("startLoad(" + e + ")"),
                                this.networkControllers.forEach(function(t) {
                                    t.startLoad(e)
                                })
                            }
                        },
                        {
                            key: "stopLoad",
                            value: function() {
                                k.logger.log("stopLoad"),
                                this.networkControllers.forEach(function(e) {
                                    e.stopLoad()
                                })
                            }
                        },
                        {
                            key: "swapAudioCodec",
                            value: function() {
                                k.logger.log("swapAudioCodec"),
                                this.streamController.swapAudioCodec()
                            }
                        },
                        {
                            key: "recoverMediaError",
                            value: function() {
                                k.logger.log("recoverMediaError");
                                var e = this.media;
                                this.detachMedia(),
                                this.attachMedia(e)
                            }
                        },
                        {
                            key: "levels",
                            get: function() {
                                return this.levelController.levels
                            }
                        },
                        {
                            key: "currentLevel",
                            get: function() {
                                return this.streamController.currentLevel
                            },
                            set: function(e) {
                                k.logger.log("set currentLevel:" + e),
                                this.loadLevel = e,
                                this.streamController.immediateLevelSwitch()
                            }
                        },
                        {
                            key: "nextLevel",
                            get: function() {
                                return this.streamController.nextLevel
                            },
                            set: function(e) {
                                k.logger.log("set nextLevel:" + e),
                                this.levelController.manualLevel = e,
                                this.streamController.nextLevelSwitch();
                            }
                        },
                        {
                            key: "loadLevel",
                            get: function() {
                                return this.levelController.level
                            },
                            set: function(e) {
                                k.logger.log("set loadLevel:" + e),
                                this.levelController.manualLevel = e
                            }
                        },
                        {
                            key: "nextLoadLevel",
                            get: function() {
                                return this.levelController.nextLoadLevel
                            },
                            set: function(e) {
                                this.levelController.nextLoadLevel = e
                            }
                        },
                        {
                            key: "firstLevel",
                            get: function() {
                                return Math.max(this.levelController.firstLevel, this.minAutoLevel)
                            },
                            set: function(e) {
                                k.logger.log("set firstLevel:" + e),
                                this.levelController.firstLevel = e
                            }
                        },
                        {
                            key: "startLevel",
                            get: function() {
                                return this.levelController.startLevel
                            },
                            set: function(e) {
                                k.logger.log("set startLevel:" + e);
                                var t = this;
                                e !== -1 && (e = Math.max(e, t.minAutoLevel)),
                                t.levelController.startLevel = e
                            }
                        },
                        {
                            key: "autoLevelCapping",
                            get: function() {
                                return this._autoLevelCapping
                            },
                            set: function(e) {
                                k.logger.log("set autoLevelCapping:" + e),
                                this._autoLevelCapping = e
                            }
                        },
                        {
                            key: "autoLevelEnabled",
                            get: function() {
                                return this.levelController.manualLevel === -1
                            }
                        },
                        {
                            key: "manualLevel",
                            get: function() {
                                return this.levelController.manualLevel
                            }
                        },
                        {
                            key: "minAutoLevel",
                            get: function() {
                                for (var e = this,
                                t = e.levels,
                                r = e.config.minAutoBitrate,
                                i = t ? t.length: 0, a = 0; a < i; a++) {
                                    var n = t[a].realBitrate ? Math.max(t[a].realBitrate, t[a].bitrate) : t[a].bitrate;
                                    if (n > r) return a
                                }
                                return 0
                            }
                        },
                        {
                            key: "maxAutoLevel",
                            get: function() {
                                var e = this,
                                t = e.levels,
                                r = e.autoLevelCapping,
                                i = void 0;
                                return i = r === -1 && t && t.length ? t.length - 1 : r
                            }
                        },
                        {
                            key: "nextAutoLevel",
                            get: function() {
                                var e = this;
                                return Math.min(Math.max(e.abrController.nextAutoLevel, e.minAutoLevel), e.maxAutoLevel)
                            },
                            set: function(e) {
                                var t = this;
                                t.abrController.nextAutoLevel = Math.max(t.minAutoLevel, e)
                            }
                        },
                        {
                            key: "audioTracks",
                            get: function() {
                                var e = this.audioTrackController;
                                return e ? e.audioTracks: []
                            }
                        },
                        {
                            key: "audioTrack",
                            get: function() {
                                var e = this.audioTrackController;
                                return e ? e.audioTrack: -1
                            },
                            set: function(e) {
                                var t = this.audioTrackController;
                                t && (t.audioTrack = e)
                            }
                        },
                        {
                            key: "liveSyncPosition",
                            get: function() {
                                return this.streamController.liveSyncPosition
                            }
                        },
                        {
                            key: "subtitleTracks",
                            get: function() {
                                var e = this.subtitleTrackController;
                                return e ? e.subtitleTracks: []
                            }
                        },
                        {
                            key: "subtitleTrack",
                            get: function() {
                                var e = this.subtitleTrackController;
                                return e ? e.subtitleTrack: -1
                            },
                            set: function(e) {
                                var t = this.subtitleTrackController;
                                t && (t.subtitleTrack = e)
                            }
                        }]),
                        e
                    } ();
                    r["default"] = A
                },
                {
                    1 : 1,
                    11 : 11,
                    12 : 12,
                    2 : 2,
                    30 : 30,
                    32 : 32,
                    38 : 38,
                    39 : 39,
                    4 : 4,
                    40 : 40,
                    51 : 51
                }],
                37 : [function(e, t, r) {
                    "use strict";
                    t.exports = e(36)["default"]
                },
                {
                    36 : 36
                }],
                38 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    function n(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return ! t || "object" != typeof t && "function" != typeof t ? e: t
                    }
                    function s(e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var o = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    l = e(32),
                    u = i(l),
                    d = e(31),
                    c = i(d),
                    f = e(30),
                    h = e(51),
                    v = function(e) {
                        function t(e) {
                            a(this, t);
                            var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u["default"].FRAG_LOADING));
                            return r.loaders = {},
                            r
                        }
                        return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function() {
                                var e = this.loaders;
                                for (var t in e) {
                                    var r = e[t];
                                    r && r.destroy()
                                }
                                this.loaders = {},
                                c["default"].prototype.destroy.call(this)
                            }
                        },
                        {
                            key: "onFragLoading",
                            value: function(e) {
                                var t = e.frag,
                                r = t.type,
                                i = this.loaders[r],
                                a = this.hls.config;
                                t.loaded = 0,
                                i && (h.logger.warn("abort previous fragment loader for type:" + r), i.abort()),
                                i = this.loaders[r] = t.loader = "undefined" != typeof a.fLoader ? new a.fLoader(a) : new a.loader(a);
                                var n = void 0,
                                s = void 0,
                                o = void 0;
                                n = {
                                    url: t.url,
                                    frag: t,
                                    responseType: "arraybuffer",
                                    progressData: !1
                                };
                                var l = t.byteRangeStartOffset,
                                u = t.byteRangeEndOffset;
                                isNaN(l) || isNaN(u) || (n.rangeStart = l, n.rangeEnd = u),
                                s = {
                                    timeout: a.fragLoadingTimeOut,
                                    maxRetry: 0,
                                    retryDelay: 0,
                                    maxRetryDelay: a.fragLoadingMaxRetryTimeout
                                },
                                o = {
                                    onSuccess: this.loadsuccess.bind(this),
                                    onError: this.loaderror.bind(this),
                                    onTimeout: this.loadtimeout.bind(this),
                                    onProgress: this.loadprogress.bind(this)
                                },
                                i.load(n, s, o)
                            }
                        },
                        {
                            key: "loadsuccess",
                            value: function(e, t, r) {
                                var i = e.data,
                                a = r.frag;
                                a.loader = void 0,
                                this.loaders[a.type] = void 0,
                                this.hls.trigger(u["default"].FRAG_LOADED, {
                                    payload: i,
                                    frag: a,
                                    stats: t
                                })
                            }
                        },
                        {
                            key: "loaderror",
                            value: function(e, t) {
                                var r = t.loader;
                                r && r.abort(),
                                this.loaders[t.type] = void 0,
                                this.hls.trigger(u["default"].ERROR, {
                                    type: f.ErrorTypes.NETWORK_ERROR,
                                    details: f.ErrorDetails.FRAG_LOAD_ERROR,
                                    fatal: !1,
                                    frag: t.frag,
                                    response: e
                                })
                            }
                        },
                        {
                            key: "loadtimeout",
                            value: function(e, t) {
                                var r = t.loader;
                                r && r.abort(),
                                this.loaders[t.type] = void 0,
                                this.hls.trigger(u["default"].ERROR, {
                                    type: f.ErrorTypes.NETWORK_ERROR,
                                    details: f.ErrorDetails.FRAG_LOAD_TIMEOUT,
                                    fatal: !1,
                                    frag: t.frag
                                })
                            }
                        },
                        {
                            key: "loadprogress",
                            value: function(e, t, r) {
                                var i = t.frag;
                                i.loaded = e.loaded,
                                this.hls.trigger(u["default"].FRAG_LOAD_PROGRESS, {
                                    frag: i,
                                    stats: e
                                })
                            }
                        }]),
                        t
                    } (c["default"]);
                    r["default"] = v
                },
                {
                    30 : 30,
                    31 : 31,
                    32 : 32,
                    51 : 51
                }],
                39 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    function n(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return ! t || "object" != typeof t && "function" != typeof t ? e: t
                    }
                    function s(e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var o = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    l = e(32),
                    u = i(l),
                    d = e(31),
                    c = i(d),
                    f = e(30),
                    h = e(51),
                    v = function(e) {
                        function t(e) {
                            a(this, t);
                            var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u["default"].KEY_LOADING));
                            return r.loaders = {},
                            r.decryptkey = null,
                            r.decrypturl = null,
                            r
                        }
                        return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function() {
                                for (var e in this.loaders) {
                                    var t = this.loaders[e];
                                    t && t.destroy()
                                }
                                this.loaders = {},
                                c["default"].prototype.destroy.call(this)
                            }
                        },
                        {
                            key: "onKeyLoading",
                            value: function(e) {
                                var t = e.frag,
                                r = t.type,
                                i = this.loaders[r],
                                a = t.decryptdata,
                                n = a.uri;
                                if (n !== this.decrypturl || null === this.decryptkey) {
                                    var s = this.hls.config;
                                    i && (h.logger.warn("abort previous key loader for type:" + r), i.abort()),
                                    t.loader = this.loaders[r] = new s.loader(s),
                                    this.decrypturl = n,
                                    this.decryptkey = null;
                                    var o = void 0,
                                    l = void 0,
                                    d = void 0;
                                    o = {
                                        url: n,
                                        frag: t,
                                        responseType: "arraybuffer"
                                    },
                                    l = {
                                        timeout: s.fragLoadingTimeOut,
                                        maxRetry: s.fragLoadingMaxRetry,
                                        retryDelay: s.fragLoadingRetryDelay,
                                        maxRetryDelay: s.fragLoadingMaxRetryTimeout
                                    },
                                    d = {
                                        onSuccess: this.loadsuccess.bind(this),
                                        onError: this.loaderror.bind(this),
                                        onTimeout: this.loadtimeout.bind(this)
                                    },
                                    t.loader.load(o, l, d)
                                } else this.decryptkey && (a.key = this.decryptkey, this.hls.trigger(u["default"].KEY_LOADED, {
                                    frag: t
                                }))
                            }
                        },
                        {
                            key: "loadsuccess",
                            value: function(e, t, r) {
                                var i = r.frag;
                                this.decryptkey = i.decryptdata.key = new Uint8Array(e.data),
                                i.loader = void 0,
                                this.loaders[i.type] = void 0,
                                this.hls.trigger(u["default"].KEY_LOADED, {
                                    frag: i
                                })
                            }
                        },
                        {
                            key: "loaderror",
                            value: function(e, t) {
                                var r = t.frag,
                                i = r.loader;
                                i && i.abort(),
                                this.loaders[t.type] = void 0,
                                this.hls.trigger(u["default"].ERROR, {
                                    type: f.ErrorTypes.NETWORK_ERROR,
                                    details: f.ErrorDetails.KEY_LOAD_ERROR,
                                    fatal: !1,
                                    frag: r,
                                    response: e
                                })
                            }
                        },
                        {
                            key: "loadtimeout",
                            value: function(e, t) {
                                var r = t.frag,
                                i = r.loader;
                                i && i.abort(),
                                this.loaders[t.type] = void 0,
                                this.hls.trigger(u["default"].ERROR, {
                                    type: f.ErrorTypes.NETWORK_ERROR,
                                    details: f.ErrorDetails.KEY_LOAD_TIMEOUT,
                                    fatal: !1,
                                    frag: r
                                })
                            }
                        }]),
                        t
                    } (c["default"]);
                    r["default"] = v
                },
                {
                    30 : 30,
                    31 : 31,
                    32 : 32,
                    51 : 51
                }],
                40 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return ! t || "object" != typeof t && "function" != typeof t ? e: t
                    }
                    function n(e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }
                    function s(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var o = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    l = e(2),
                    u = i(l),
                    d = e(32),
                    c = i(d),
                    f = e(31),
                    h = i(f),
                    v = e(30),
                    g = e(44),
                    p = i(g),
                    y = e(51),
                    m = /#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g,
                    T = /#EXT-X-MEDIA:(.*)/g,
                    E = /#EXTINF:(\d*(?:\.\d+)?)(?:,(.*))?|(?!#)(\S.+)|#EXT-X-BYTERANGE: *(.+)|#EXT-X-PROGRAM-DATE-TIME:(.+)|#.*/g,
                    k = /(?:(?:#(EXTM3U))|(?:#EXT-X-(PLAYLIST-TYPE):(.+))|(?:#EXT-X-(MEDIA-SEQUENCE): *(\d+))|(?:#EXT-X-(TARGETDURATION): *(\d+))|(?:#EXT-X-(KEY):(.+))|(?:#EXT-X-(START):(.+))|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DISCONTINUITY-SEQ)UENCE:(\d+))|(?:#EXT-X-(DIS)CONTINUITY))|(?:#EXT-X-(VERSION):(\d+))|(?:#EXT-X-(MAP):(.+))|(?:(#)(.*):(.*))|(?:(#)(.*))(?:.*)\r?\n?/,
                    b = function() {
                        function e() {
                            s(this, e),
                            this.method = null,
                            this.key = null,
                            this.iv = null,
                            this._uri = null
                        }
                        return o(e, [{
                            key: "uri",
                            get: function() {
                                return ! this._uri && this.reluri && (this._uri = u["default"].buildAbsoluteURL(this.baseuri, this.reluri, {
                                    alwaysNormalize: !0
                                })),
                                this._uri
                            }
                        }]),
                        e
                    } (),
                    _ = function() {
                        function e() {
                            s(this, e),
                            this._url = null,
                            this._byteRange = null,
                            this._decryptdata = null,
                            this.tagList = []
                        }
                        return o(e, [{
                            key: "createInitializationVector",
                            value: function(e) {
                                for (var t = new Uint8Array(16), r = 12; r < 16; r++) t[r] = e >> 8 * (15 - r) & 255;
                                return t
                            }
                        },
                        {
                            key: "fragmentDecryptdataFromLevelkey",
                            value: function(e, t) {
                                var r = e;
                                return e && e.method && e.uri && !e.iv && (r = new b, r.method = e.method, r.baseuri = e.baseuri, r.reluri = e.reluri, r.iv = this.createInitializationVector(t)),
                                r
                            }
                        },
                        {
                            key: "cloneObj",
                            value: function(e) {
                                return JSON.parse(JSON.stringify(e))
                            }
                        },
                        {
                            key: "url",
                            get: function() {
                                return ! this._url && this.relurl && (this._url = u["default"].buildAbsoluteURL(this.baseurl, this.relurl, {
                                    alwaysNormalize: !0
                                })),
                                this._url
                            },
                            set: function(e) {
                                this._url = e
                            }
                        },
                        {
                            key: "programDateTime",
                            get: function() {
                                return ! this._programDateTime && this.rawProgramDateTime && (this._programDateTime = new Date(Date.parse(this.rawProgramDateTime))),
                                this._programDateTime
                            }
                        },
                        {
                            key: "byteRange",
                            get: function() {
                                if (!this._byteRange) {
                                    var e = this._byteRange = [];
                                    if (this.rawByteRange) {
                                        var t = this.rawByteRange.split("@", 2);
                                        if (1 === t.length) {
                                            var r = this.lastByteRangeEndOffset;
                                            e[0] = r ? r: 0
                                        } else e[0] = parseInt(t[1]);
                                        e[1] = parseInt(t[0]) + e[0]
                                    }
                                }
                                return this._byteRange
                            }
                        },
                        {
                            key: "byteRangeStartOffset",
                            get: function() {
                                return this.byteRange[0]
                            }
                        },
                        {
                            key: "byteRangeEndOffset",
                            get: function() {
                                return this.byteRange[1]
                            }
                        },
                        {
                            key: "decryptdata",
                            get: function() {
                                return this._decryptdata || (this._decryptdata = this.fragmentDecryptdataFromLevelkey(this.levelkey, this.sn)),
                                this._decryptdata
                            }
                        }]),
                        e
                    } (),
                    R = function(e) {
                        function t(e) {
                            s(this, t);
                            var r = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, c["default"].MANIFEST_LOADING, c["default"].LEVEL_LOADING, c["default"].AUDIO_TRACK_LOADING, c["default"].SUBTITLE_TRACK_LOADING));
                            return r.loaders = {},
                            r
                        }
                        return n(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function() {
                                for (var e in this.loaders) {
                                    var t = this.loaders[e];
                                    t && t.destroy()
                                }
                                this.loaders = {},
                                h["default"].prototype.destroy.call(this)
                            }
                        },
                        {
                            key: "onManifestLoading",
                            value: function(e) {
                                this.load(e.url, {
                                    type: "manifest"
                                })
                            }
                        },
                        {
                            key: "onLevelLoading",
                            value: function(e) {
                                this.load(e.url, {
                                    type: "level",
                                    level: e.level,
                                    id: e.id
                                })
                            }
                        },
                        {
                            key: "onAudioTrackLoading",
                            value: function(e) {
                                this.load(e.url, {
                                    type: "audioTrack",
                                    id: e.id
                                })
                            }
                        },
                        {
                            key: "onSubtitleTrackLoading",
                            value: function(e) {
                                this.load(e.url, {
                                    type: "subtitleTrack",
                                    id: e.id
                                })
                            }
                        },
                        {
                            key: "load",
                            value: function(e, t) {
                                var r = this.loaders[t.type];
                                if (r) {
                                    var i = r.context;
                                    if (i && i.url === e) return void y.logger.trace("playlist request ongoing");
                                    y.logger.warn("abort previous loader for type:" + t.type),
                                    r.abort()
                                }
                                var a = this.hls.config,
                                n = void 0,
                                s = void 0,
                                o = void 0,
                                l = void 0;
                                "manifest" === t.type ? (n = a.manifestLoadingMaxRetry, s = a.manifestLoadingTimeOut, o = a.manifestLoadingRetryDelay, l = a.manifestLoadingMaxRetryTimeout) : (n = a.levelLoadingMaxRetry, s = a.levelLoadingTimeOut, o = a.levelLoadingRetryDelay, l = a.levelLoadingMaxRetryTimeout, y.logger.log("loading playlist for " + t.type + " " + (t.level || t.id))),
                                r = this.loaders[t.type] = t.loader = "undefined" != typeof a.pLoader ? new a.pLoader(a) : new a.loader(a),
                                t.url = e,
                                t.responseType = "";
                                var u = void 0,
                                d = void 0;
                                u = {
                                    timeout: s,
                                    maxRetry: n,
                                    retryDelay: o,
                                    maxRetryDelay: l
                                },
                                d = {
                                    onSuccess: this.loadsuccess.bind(this),
                                    onError: this.loaderror.bind(this),
                                    onTimeout: this.loadtimeout.bind(this)
                                },
                                r.load(t, u, d)
                            }
                        },
                        {
                            key: "resolve",
                            value: function(e, t) {
                                return u["default"].buildAbsoluteURL(t, e, {
                                    alwaysNormalize: !0
                                })
                            }
                        },
                        {
                            key: "parseMasterPlaylist",
                            value: function(e, t) {
                                var r = [],
                                i = void 0;
                                for (m.lastIndex = 0; null != (i = m.exec(e));) {
                                    var a = {},
                                    n = a.attrs = new p["default"](i[1]);
                                    a.url = this.resolve(i[2], t);
                                    var s = n.decimalResolution("RESOLUTION");
                                    s && (a.width = s.width, a.height = s.height),
                                    a.bitrate = n.decimalInteger("AVERAGE-BANDWIDTH") || n.decimalInteger("BANDWIDTH"),
                                    a.name = n.NAME;
                                    var o = n.CODECS;
                                    if (o) {
                                        o = o.split(/[ ,]+/);
                                        for (var l = 0; l < o.length; l++) {
                                            var u = o[l];
                                            u.indexOf("avc1") !== -1 ? a.videoCodec = this.avc1toavcoti(u) : a.audioCodec = u
                                        }
                                    }
                                    r.push(a)
                                }
                                return r
                            }
                        },
                        {
                            key: "parseMasterPlaylistMedia",
                            value: function(e, t, r) {
                                var i = void 0,
                                a = [],
                                n = 0;
                                for (T.lastIndex = 0; null != (i = T.exec(e));) {
                                    var s = {},
                                    o = new p["default"](i[1]);
                                    o.TYPE === r && (s.groupId = o["GROUP-ID"], s.instreamId = o["INSTREAM-ID"], s.name = o.NAME, s.type = r, s["default"] = "YES" === o.DEFAULT, s.autoselect = "YES" === o.AUTOSELECT, s.forced = "YES" === o.FORCED, o.URI && (s.url = this.resolve(o.URI, t)), s.lang = o.LANGUAGE, s.name || (s.name = s.lang), s.id = n++, a.push(s))
                                }
                                return a
                            }
                        },
                        {
                            key: "avc1toavcoti",
                            value: function(e) {
                                var t, r = e.split(".");
                                return r.length > 2 ? (t = r.shift() + ".", t += parseInt(r.shift()).toString(16), t += ("000" + parseInt(r.shift()).toString(16)).substr( - 4)) : t = e,
                                t
                            }
                        },
                        {
                            key: "parseLevelPlaylist",
                            value: function(e, t, r, i) {
                                var a, n, s = 0,
                                o = 0,
                                l = {
                                    type: null,
                                    version: null,
                                    url: t,
                                    fragments: [],
                                    live: !0,
                                    startSN: 0
                                },
                                u = new b,
                                d = 0,
                                c = null,
                                f = new _;
                                for (E.lastIndex = 0; null !== (a = E.exec(e));) {
                                    var h = a[1];
                                    if (h) {
                                        f.duration = parseFloat(h);
                                        var v = (" " + a[2]).slice(1);
                                        f.title = v ? v: null,
                                        f.tagList.push(v ? ["INF", h, v] : ["INF", h])
                                    } else if (a[3]) {
                                        if (!isNaN(f.duration)) {
                                            var g = s++;
                                            f.type = i,
                                            f.start = o,
                                            f.levelkey = u,
                                            f.sn = g,
                                            f.level = r,
                                            f.cc = d,
                                            f.baseurl = t,
                                            f.relurl = (" " + a[3]).slice(1),
                                            l.fragments.push(f),
                                            c = f,
                                            o += f.duration,
                                            f = new _
                                        }
                                    } else if (a[4]) {
                                        if (f.rawByteRange = (" " + a[4]).slice(1), c) {
                                            var m = c.byteRangeEndOffset;
                                            m && (f.lastByteRangeEndOffset = m)
                                        }
                                    } else if (a[5]) f.rawProgramDateTime = (" " + a[5]).slice(1),
                                    f.tagList.push(["PROGRAM-DATE-TIME", f.rawProgramDateTime]);
                                    else {
                                        for (a = a[0].match(k), n = 1; n < a.length && void 0 === a[n]; n++);
                                        var T = (" " + a[n + 1]).slice(1),
                                        R = (" " + a[n + 2]).slice(1);
                                        switch (a[n]) {
                                        case "#":
                                            f.tagList.push(R ? [T, R] : [T]);
                                            break;
                                        case "PLAYLIST-TYPE":
                                            l.type = T.toUpperCase();
                                            break;
                                        case "MEDIA-SEQUENCE":
                                            s = l.startSN = parseInt(T);
                                            break;
                                        case "TARGETDURATION":
                                            l.targetduration = parseFloat(T);
                                            break;
                                        case "VERSION":
                                            l.version = parseInt(T);
                                            break;
                                        case "EXTM3U":
                                            break;
                                        case "ENDLIST":
                                            l.live = !1;
                                            break;
                                        case "DIS":
                                            d++,
                                            f.tagList.push(["DIS"]);
                                            break;
                                        case "DISCONTINUITY-SEQ":
                                            d = parseInt(T);
                                            break;
                                        case "KEY":
                                            var A = T,
                                            S = new p["default"](A),
                                            L = S.enumeratedString("METHOD"),
                                            w = S.URI,
                                            D = S.hexadecimalInteger("IV");
                                            L && (u = new b, w && ["AES-128", "SAMPLE-AES"].indexOf(L) >= 0 && (u.method = L, u.baseuri = t, u.reluri = w, u.key = null, u.iv = D));
                                            break;
                                        case "START":
                                            var O = T,
                                            I = new p["default"](O),
                                            C = I.decimalFloatingPoint("TIME-OFFSET");
                                            isNaN(C) || (l.startTimeOffset = C);
                                            break;
                                        case "MAP":
                                            var P = new p["default"](T);
                                            f.relurl = P.URI,
                                            f.rawByteRange = P.BYTERANGE,
                                            f.baseurl = t,
                                            f.level = r,
                                            f.type = i,
                                            f.sn = "initSegment",
                                            l.initSegment = f,
                                            f = new _;
                                            break;
                                        default:
                                            y.logger.warn("line parsed but not handled: " + a)
                                        }
                                    }
                                }
                                return f = c,
                                f && !f.relurl && (l.fragments.pop(), o -= f.duration),
                                l.totalduration = o,
                                l.averagetargetduration = o / l.fragments.length,
                                l.endSN = s - 1,
                                l.startCC = l.fragments[0] ? l.fragments[0].cc: 0,
                                l.endCC = d,
                                l
                            }
                        },
                        {
                            key: "loadsuccess",
                            value: function(e, t, r) {
                                var i = e.data,
                                a = e.url,
                                n = r.type,
                                s = r.id,
                                o = r.level,
                                l = this.hls;
                                if (this.loaders[n] = void 0, void 0 !== a && 0 !== a.indexOf("data:") || (a = r.url), t.tload = performance.now(), 0 === i.indexOf("#EXTM3U")) if (i.indexOf("#EXTINF:") > 0) {
                                    var u = "audioTrack" !== n && "subtitleTrack" !== n,
                                    d = isNaN(o) ? isNaN(s) ? 0 : s: o,
                                    f = this.parseLevelPlaylist(i, a, d, "audioTrack" === n ? "audio": "subtitleTrack" === n ? "subtitle": "main");
                                    f.tload = t.tload,
                                    "manifest" === n && l.trigger(c["default"].MANIFEST_LOADED, {
                                        levels: [{
                                            url: a,
                                            details: f
                                        }],
                                        audioTracks: [],
                                        url: a,
                                        stats: t
                                    }),
                                    t.tparsed = performance.now(),
                                    f.targetduration ? u ? l.trigger(c["default"].LEVEL_LOADED, {
                                        details: f,
                                        level: o || 0,
                                        id: s || 0,
                                        stats: t
                                    }) : "audioTrack" === n ? l.trigger(c["default"].AUDIO_TRACK_LOADED, {
                                        details: f,
                                        id: s,
                                        stats: t
                                    }) : "subtitleTrack" === n && l.trigger(c["default"].SUBTITLE_TRACK_LOADED, {
                                        details: f,
                                        id: s,
                                        stats: t
                                    }) : l.trigger(c["default"].ERROR, {
                                        type: v.ErrorTypes.NETWORK_ERROR,
                                        details: v.ErrorDetails.MANIFEST_PARSING_ERROR,
                                        fatal: !0,
                                        url: a,
                                        reason: "invalid targetduration"
                                    })
                                } else {
                                    var h = this.parseMasterPlaylist(i, a);
                                    if (h.length) {
                                        var g = this.parseMasterPlaylistMedia(i, a, "AUDIO"),
                                        p = this.parseMasterPlaylistMedia(i, a, "SUBTITLES"),
                                        m = this.parseMasterPlaylistMedia(i, a, "CLOSED-CAPTIONS");
                                        if (g.length) {
                                            var T = !1;
                                            g.forEach(function(e) {
                                                e.url || (T = !0)
                                            }),
                                            T === !1 && h[0].audioCodec && !h[0].attrs.AUDIO && (y.logger.log("audio codec signaled in quality level, but no embedded audio track signaled, create one"), g.unshift({
                                                type: "main",
                                                name: "main"
                                            }))
                                        }
                                        l.trigger(c["default"].MANIFEST_LOADED, {
                                            levels: h,
                                            audioTracks: g,
                                            subtitles: p,
                                            captions: m,
                                            url: a,
                                            stats: t
                                        })
                                    } else "manifest" === n ? l.trigger(c["default"].ERROR, {
                                        type: v.ErrorTypes.NETWORK_ERROR,
                                        details: v.ErrorDetails.MANIFEST_PARSING_ERROR,
                                        fatal: !0,
                                        url: a,
                                        reason: "no level found in manifest"
                                    }) : l.trigger(c["default"].ERROR, {
                                        type: v.ErrorTypes.NETWORK_ERROR,
                                        details: v.ErrorDetails.MANIFEST_EMPTY_ERROR,
                                        fatal: !1,
                                        url: a,
                                        reason: "no level found in manifest",
                                        context: r
                                    })
                                } else l.trigger(c["default"].ERROR, {
                                    type: v.ErrorTypes.NETWORK_ERROR,
                                    details: v.ErrorDetails.MANIFEST_PARSING_ERROR,
                                    fatal: !0,
                                    url: a,
                                    reason: "no EXTM3U delimiter"
                                })
                            }
                        },
                        {
                            key: "loaderror",
                            value: function(e, t) {
                                var r, i, a = t.loader;
                                switch (t.type) {
                                case "manifest":
                                    r = v.ErrorDetails.MANIFEST_LOAD_ERROR,
                                    i = !0;
                                    break;
                                case "level":
                                    r = v.ErrorDetails.LEVEL_LOAD_ERROR,
                                    i = !1;
                                    break;
                                case "audioTrack":
                                    r = v.ErrorDetails.AUDIO_TRACK_LOAD_ERROR,
                                    i = !1
                                }
                                a && (a.abort(), this.loaders[t.type] = void 0),
                                this.hls.trigger(c["default"].ERROR, {
                                    type: v.ErrorTypes.NETWORK_ERROR,
                                    details: r,
                                    fatal: i,
                                    url: t.url,
                                    loader: a,
                                    response: e,
                                    context: t
                                })
                            }
                        },
                        {
                            key: "loadtimeout",
                            value: function(e, t) {
                                var r, i, a = t.loader;
                                switch (t.type) {
                                case "manifest":
                                    r = v.ErrorDetails.MANIFEST_LOAD_TIMEOUT,
                                    i = !0;
                                    break;
                                case "level":
                                    r = v.ErrorDetails.LEVEL_LOAD_TIMEOUT,
                                    i = !1;
                                    break;
                                case "audioTrack":
                                    r = v.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT,
                                    i = !1
                                }
                                a && (a.abort(), this.loaders[t.type] = void 0),
                                this.hls.trigger(c["default"].ERROR, {
                                    type: v.ErrorTypes.NETWORK_ERROR,
                                    details: r,
                                    fatal: i,
                                    url: t.url,
                                    loader: a,
                                    context: t
                                })
                            }
                        }]),
                        t
                    } (h["default"]);
                    r["default"] = R
                },
                {
                    2 : 2,
                    30 : 30,
                    31 : 31,
                    32 : 32,
                    44 : 44,
                    51 : 51
                }],
                41 : [function(e, t, r) {
                    "use strict";
                    function i(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var a = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    n = Math.pow(2, 32) - 1,
                    s = function() {
                        function e() {
                            i(this, e)
                        }
                        return a(e, null, [{
                            key: "init",
                            value: function() {
                                e.types = {
                                    avc1: [],
                                    avcC: [],
                                    btrt: [],
                                    dinf: [],
                                    dref: [],
                                    esds: [],
                                    ftyp: [],
                                    hdlr: [],
                                    mdat: [],
                                    mdhd: [],
                                    mdia: [],
                                    mfhd: [],
                                    minf: [],
                                    moof: [],
                                    moov: [],
                                    mp4a: [],
                                    ".mp3": [],
                                    mvex: [],
                                    mvhd: [],
                                    pasp: [],
                                    sdtp: [],
                                    stbl: [],
                                    stco: [],
                                    stsc: [],
                                    stsd: [],
                                    stsz: [],
                                    stts: [],
                                    tfdt: [],
                                    tfhd: [],
                                    traf: [],
                                    trak: [],
                                    trun: [],
                                    trex: [],
                                    tkhd: [],
                                    vmhd: [],
                                    smhd: []
                                };
                                var t;
                                for (t in e.types) e.types.hasOwnProperty(t) && (e.types[t] = [t.charCodeAt(0), t.charCodeAt(1), t.charCodeAt(2), t.charCodeAt(3)]);
                                var r = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0]),
                                i = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]);
                                e.HDLR_TYPES = {
                                    video: r,
                                    audio: i
                                };
                                var a = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1]),
                                n = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
                                e.STTS = e.STSC = e.STCO = n,
                                e.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                e.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]),
                                e.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]),
                                e.STSD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);
                                var s = new Uint8Array([105, 115, 111, 109]),
                                o = new Uint8Array([97, 118, 99, 49]),
                                l = new Uint8Array([0, 0, 0, 1]);
                                e.FTYP = e.box(e.types.ftyp, s, l, s, o),
                                e.DINF = e.box(e.types.dinf, e.box(e.types.dref, a))
                            }
                        },
                        {
                            key: "box",
                            value: function(e) {
                                for (var t, r = Array.prototype.slice.call(arguments, 1), i = 8, a = r.length, n = a; a--;) i += r[a].byteLength;
                                for (t = new Uint8Array(i), t[0] = i >> 24 & 255, t[1] = i >> 16 & 255, t[2] = i >> 8 & 255, t[3] = 255 & i, t.set(e, 4), a = 0, i = 8; a < n; a++) t.set(r[a], i),
                                i += r[a].byteLength;
                                return t
                            }
                        },
                        {
                            key: "hdlr",
                            value: function(t) {
                                return e.box(e.types.hdlr, e.HDLR_TYPES[t])
                            }
                        },
                        {
                            key: "mdat",
                            value: function(t) {
                                return e.box(e.types.mdat, t)
                            }
                        },
                        {
                            key: "mdhd",
                            value: function(t, r) {
                                r *= t;
                                var i = Math.floor(r / (n + 1)),
                                a = Math.floor(r % (n + 1));
                                return e.box(e.types.mdhd, new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, 255 & t, i >> 24, i >> 16 & 255, i >> 8 & 255, 255 & i, a >> 24, a >> 16 & 255, a >> 8 & 255, 255 & a, 85, 196, 0, 0]))
                            }
                        },
                        {
                            key: "mdia",
                            value: function(t) {
                                return e.box(e.types.mdia, e.mdhd(t.timescale, t.duration), e.hdlr(t.type), e.minf(t))
                            }
                        },
                        {
                            key: "mfhd",
                            value: function(t) {
                                return e.box(e.types.mfhd, new Uint8Array([0, 0, 0, 0, t >> 24, t >> 16 & 255, t >> 8 & 255, 255 & t]))
                            }
                        },
                        {
                            key: "minf",
                            value: function(t) {
                                return "audio" === t.type ? e.box(e.types.minf, e.box(e.types.smhd, e.SMHD), e.DINF, e.stbl(t)) : e.box(e.types.minf, e.box(e.types.vmhd, e.VMHD), e.DINF, e.stbl(t))
                            }
                        },
                        {
                            key: "moof",
                            value: function(t, r, i) {
                                return e.box(e.types.moof, e.mfhd(t), e.traf(i, r))
                            }
                        },
                        {
                            key: "moov",
                            value: function(t) {
                                for (var r = t.length,
                                i = []; r--;) i[r] = e.trak(t[r]);
                                return e.box.apply(null, [e.types.moov, e.mvhd(t[0].timescale, t[0].duration)].concat(i).concat(e.mvex(t)))
                            }
                        },
                        {
                            key: "mvex",
                            value: function(t) {
                                for (var r = t.length,
                                i = []; r--;) i[r] = e.trex(t[r]);
                                return e.box.apply(null, [e.types.mvex].concat(i))
                            }
                        },
                        {
                            key: "mvhd",
                            value: function(t, r) {
                                r *= t;
                                var i = Math.floor(r / (n + 1)),
                                a = Math.floor(r % (n + 1)),
                                s = new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, 255 & t, i >> 24, i >> 16 & 255, i >> 8 & 255, 255 & i, a >> 24, a >> 16 & 255, a >> 8 & 255, 255 & a, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]);
                                return e.box(e.types.mvhd, s)
                            }
                        },
                        {
                            key: "sdtp",
                            value: function(t) {
                                var r, i, a = t.samples || [],
                                n = new Uint8Array(4 + a.length);
                                for (i = 0; i < a.length; i++) r = a[i].flags,
                                n[i + 4] = r.dependsOn << 4 | r.isDependedOn << 2 | r.hasRedundancy;
                                return e.box(e.types.sdtp, n)
                            }
                        },
                        {
                            key: "stbl",
                            value: function(t) {
                                return e.box(e.types.stbl, e.stsd(t), e.box(e.types.stts, e.STTS), e.box(e.types.stsc, e.STSC), e.box(e.types.stsz, e.STSZ), e.box(e.types.stco, e.STCO))
                            }
                        },
                        {
                            key: "avc1",
                            value: function(t) {
                                var r, i, a, n = [],
                                s = [];
                                for (r = 0; r < t.sps.length; r++) i = t.sps[r],
                                a = i.byteLength,
                                n.push(a >>> 8 & 255),
                                n.push(255 & a),
                                n = n.concat(Array.prototype.slice.call(i));
                                for (r = 0; r < t.pps.length; r++) i = t.pps[r],
                                a = i.byteLength,
                                s.push(a >>> 8 & 255),
                                s.push(255 & a),
                                s = s.concat(Array.prototype.slice.call(i));
                                var o = e.box(e.types.avcC, new Uint8Array([1, n[3], n[4], n[5], 255, 224 | t.sps.length].concat(n).concat([t.pps.length]).concat(s))),
                                l = t.width,
                                u = t.height,
                                d = t.pixelRatio[0],
                                c = t.pixelRatio[1];
                                return e.box(e.types.avc1, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l >> 8 & 255, 255 & l, u >> 8 & 255, 255 & u, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 18, 100, 97, 105, 108, 121, 109, 111, 116, 105, 111, 110, 47, 104, 108, 115, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 17, 17]), o, e.box(e.types.btrt, new Uint8Array([0, 28, 156, 128, 0, 45, 198, 192, 0, 45, 198, 192])), e.box(e.types.pasp, new Uint8Array([d >> 24, d >> 16 & 255, d >> 8 & 255, 255 & d, c >> 24, c >> 16 & 255, c >> 8 & 255, 255 & c])))
                            }
                        },
                        {
                            key: "esds",
                            value: function(e) {
                                var t = e.config.length;
                                return new Uint8Array([0, 0, 0, 0, 3, 23 + t, 0, 1, 0, 4, 15 + t, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([t]).concat(e.config).concat([6, 1, 2]))
                            }
                        },
                        {
                            key: "mp4a",
                            value: function(t) {
                                var r = t.samplerate;
                                return e.box(e.types.mp4a, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, t.channelCount, 0, 16, 0, 0, 0, 0, r >> 8 & 255, 255 & r, 0, 0]), e.box(e.types.esds, e.esds(t)))
                            }
                        },
                        {
                            key: "mp3",
                            value: function(t) {
                                var r = t.samplerate;
                                return e.box(e.types[".mp3"], new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, t.channelCount, 0, 16, 0, 0, 0, 0, r >> 8 & 255, 255 & r, 0, 0]))
                            }
                        },
                        {
                            key: "stsd",
                            value: function(t) {
                                return "audio" === t.type ? t.isAAC || "mp3" !== t.codec ? e.box(e.types.stsd, e.STSD, e.mp4a(t)) : e.box(e.types.stsd, e.STSD, e.mp3(t)) : e.box(e.types.stsd, e.STSD, e.avc1(t))
                            }
                        },
                        {
                            key: "tkhd",
                            value: function(t) {
                                var r = t.id,
                                i = t.duration * t.timescale,
                                a = t.width,
                                s = t.height,
                                o = Math.floor(i / (n + 1)),
                                l = Math.floor(i % (n + 1));
                                return e.box(e.types.tkhd, new Uint8Array([1, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r, 0, 0, 0, 0, o >> 24, o >> 16 & 255, o >> 8 & 255, 255 & o, l >> 24, l >> 16 & 255, l >> 8 & 255, 255 & l, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, a >> 8 & 255, 255 & a, 0, 0, s >> 8 & 255, 255 & s, 0, 0]))
                            }
                        },
                        {
                            key: "traf",
                            value: function(t, r) {
                                var i = e.sdtp(t),
                                a = t.id,
                                s = Math.floor(r / (n + 1)),
                                o = Math.floor(r % (n + 1));
                                return e.box(e.types.traf, e.box(e.types.tfhd, new Uint8Array([0, 0, 0, 0, a >> 24, a >> 16 & 255, a >> 8 & 255, 255 & a])), e.box(e.types.tfdt, new Uint8Array([1, 0, 0, 0, s >> 24, s >> 16 & 255, s >> 8 & 255, 255 & s, o >> 24, o >> 16 & 255, o >> 8 & 255, 255 & o])), e.trun(t, i.length + 16 + 20 + 8 + 16 + 8 + 8), i)
                            }
                        },
                        {
                            key: "trak",
                            value: function(t) {
                                return t.duration = t.duration || 4294967295,
                                e.box(e.types.trak, e.tkhd(t), e.mdia(t))
                            }
                        },
                        {
                            key: "trex",
                            value: function(t) {
                                var r = t.id;
                                return e.box(e.types.trex, new Uint8Array([0, 0, 0, 0, r >> 24, r >> 16 & 255, r >> 8 & 255, 255 & r, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]))
                            }
                        },
                        {
                            key: "trun",
                            value: function(t, r) {
                                var i, a, n, s, o, l, u = t.samples || [],
                                d = u.length,
                                c = 12 + 16 * d,
                                f = new Uint8Array(c);
                                for (r += 8 + c, f.set([0, 0, 15, 1, d >>> 24 & 255, d >>> 16 & 255, d >>> 8 & 255, 255 & d, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, 255 & r], 0), i = 0; i < d; i++) a = u[i],
                                n = a.duration,
                                s = a.size,
                                o = a.flags,
                                l = a.cts,
                                f.set([n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n, s >>> 24 & 255, s >>> 16 & 255, s >>> 8 & 255, 255 & s, o.isLeading << 2 | o.dependsOn, o.isDependedOn << 6 | o.hasRedundancy << 4 | o.paddingValue << 1 | o.isNonSync, 61440 & o.degradPrio, 15 & o.degradPrio, l >>> 24 & 255, l >>> 16 & 255, l >>> 8 & 255, 255 & l], 12 + 16 * i);
                                return e.box(e.types.trun, f)
                            }
                        },
                        {
                            key: "initSegment",
                            value: function(t) {
                                e.types || e.init();
                                var r, i = e.moov(t);
                                return r = new Uint8Array(e.FTYP.byteLength + i.byteLength),
                                r.set(e.FTYP),
                                r.set(i, e.FTYP.byteLength),
                                r
                            }
                        }]),
                        e
                    } ();
                    r["default"] = s
                },
                {}],
                42 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var n = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    s = e(33),
                    o = i(s),
                    l = e(32),
                    u = i(l),
                    d = e(51),
                    c = e(41),
                    f = i(c),
                    h = e(30),
                    v = 1e4,
                    g = function() {
                        function e(t, r, i, n) {
                            a(this, e),
                            this.observer = t,
                            this.config = r,
                            this.typeSupported = i;
                            var s = navigator.userAgent;
                            this.isSafari = n && n.indexOf("Apple") > -1 && s && !s.match("CriOS"),
                            this.ISGenerated = !1
                        }
                        return n(e, [{
                            key: "destroy",
                            value: function() {}
                        },
                        {
                            key: "resetTimeStamp",
                            value: function(e) {
                                this._initPTS = this._initDTS = e
                            }
                        },
                        {
                            key: "resetInitSegment",
                            value: function() {
                                this.ISGenerated = !1
                            }
                        },
                        {
                            key: "remux",
                            value: function(e, t, r, i, a, n, s) {
                                if (this.ISGenerated || this.generateIS(e, t, a), this.ISGenerated) if (e.samples.length) {
                                    var o = this.remuxAudio(e, a, n, s);
                                    if (t.samples.length) {
                                        var l = void 0;
                                        o && (l = o.endPTS - o.startPTS),
                                        this.remuxVideo(t, a, n, l)
                                    }
                                } else {
                                    var d = void 0;
                                    t.samples.length && (d = this.remuxVideo(t, a, n)),
                                    d && e.codec && this.remuxEmptyAudio(e, a, n, d)
                                }
                                r.samples.length && this.remuxID3(r, a),
                                i.samples.length && this.remuxText(i, a),
                                this.observer.trigger(u["default"].FRAG_PARSED)
                            }
                        },
                        {
                            key: "generateIS",
                            value: function(e, t, r) {
                                var i, a, n = this.observer,
                                s = e.samples,
                                o = t.samples,
                                l = this.typeSupported,
                                c = "audio/mp4",
                                v = {},
                                g = {
                                    tracks: v
                                },
                                p = void 0 === this._initPTS;
                                if (p && (i = a = 1 / 0), e.config && s.length && (e.timescale = e.samplerate, d.logger.log("audio sampling rate : " + e.samplerate), e.isAAC || (l.mpeg ? (c = "audio/mpeg", e.codec = "") : l.mp3 && (e.codec = "mp3")), v.audio = {
                                    container: c,
                                    codec: e.codec,
                                    initSegment: !e.isAAC && l.mpeg ? new Uint8Array: f["default"].initSegment([e]),
                                    metadata: {
                                        channelCount: e.channelCount
                                    }
                                },
                                p && (i = a = s[0].pts - e.inputTimeScale * r)), t.sps && t.pps && o.length) {
                                    var y = t.inputTimeScale;
                                    t.timescale = y,
                                    v.video = {
                                        container: "video/mp4",
                                        codec: t.codec,
                                        initSegment: f["default"].initSegment([t]),
                                        metadata: {
                                            width: t.width,
                                            height: t.height
                                        }
                                    },
                                    p && (i = Math.min(i, o[0].pts - y * r), a = Math.min(a, o[0].dts - y * r), this.observer.trigger(u["default"].INIT_PTS_FOUND, {
                                        initPTS: i
                                    }))
                                }
                                Object.keys(v).length ? (n.trigger(u["default"].FRAG_PARSING_INIT_SEGMENT, g), this.ISGenerated = !0, p && (this._initPTS = i, this._initDTS = a)) : n.trigger(u["default"].ERROR, {
                                    type: h.ErrorTypes.MEDIA_ERROR,
                                    details: h.ErrorDetails.FRAG_PARSING_ERROR,
                                    fatal: !1,
                                    reason: "no audio/video samples found"
                                })
                            }
                        },
                        {
                            key: "remuxVideo",
                            value: function(e, t, r, i) {
                                var a, n, s, o, l, c, v, g, p = 8,
                                y = e.timescale,
                                m = e.samples,
                                T = [],
                                E = m.length,
                                k = this._PTSNormalize,
                                b = this._initDTS;
                                m.sort(function(e, t) {
                                    var r = e.dts - t.dts,
                                    i = e.pts - t.pts;
                                    return r ? r: i ? i: e.id - t.id
                                });
                                var _ = m.reduce(function(e, t) {
                                    return Math.max(Math.min(e, t.pts - t.dts), -18e3)
                                },
                                0);
                                if (_ < 0) {
                                    d.logger.warn("PTS < DTS detected in video samples, shifting DTS by " + Math.round(_ / 90) + " ms to overcome this issue");
                                    for (var R = 0; R < m.length; R++) m[R].dts += _
                                }
                                var A = void 0;
                                A = r ? this.nextAvcDts: t * y;
                                var S = m[0];
                                l = Math.max(k(S.dts - b, A), 0),
                                o = Math.max(k(S.pts - b, A), 0);
                                var L = Math.round((l - A) / 90);
                                r && L && (L > 1 ? d.logger.log("AVC:" + L + " ms hole between fragments detected,filling it") : L < -1 && d.logger.log("AVC:" + -L + " ms overlapping between fragments detected"), l = A, m[0].dts = l + b, o = Math.max(o - L, A), m[0].pts = o + b, d.logger.log("Video/PTS/DTS adjusted: " + Math.round(o / 90) + "/" + Math.round(l / 90) + ",delta:" + L + " ms")),
                                c = l,
                                S = m[m.length - 1],
                                g = Math.max(k(S.dts - b, A), 0),
                                v = Math.max(k(S.pts - b, A), 0),
                                v = Math.max(v, g);
                                var w = this.isSafari;
                                w && (a = Math.round((g - l) / (m.length - 1)));
                                for (var D = 0,
                                O = 0,
                                I = 0; I < E; I++) {
                                    for (var C = m[I], P = C.units, x = P.length, M = 0, N = 0; N < x; N++) M += P[N].data.length;
                                    O += M,
                                    D += x,
                                    C.length = M,
                                    w ? C.dts = l + I * a: C.dts = Math.max(k(C.dts - b, A), l),
                                    C.pts = Math.max(k(C.pts - b, A), C.dts)
                                }
                                var F = O + 4 * D + 8;
                                try {
                                    n = new Uint8Array(F)
                                } catch(U) {
                                    return void this.observer.trigger(u["default"].ERROR, {
                                        type: h.ErrorTypes.MUX_ERROR,
                                        details: h.ErrorDetails.REMUX_ALLOC_ERROR,
                                        fatal: !1,
                                        bytes: F,
                                        reason: "fail allocating video mdat " + F
                                    })
                                }
                                var B = new DataView(n.buffer);
                                B.setUint32(0, F),
                                n.set(f["default"].types.mdat, 4);
                                for (var G = 0; G < E; G++) {
                                    for (var j = m[G], V = j.units, H = 0, W = void 0, K = 0, Y = V.length; K < Y; K++) {
                                        var q = V[K],
                                        X = q.data,
                                        z = q.data.byteLength;
                                        B.setUint32(p, z),
                                        p += 4,
                                        n.set(X, p),
                                        p += z,
                                        H += 4 + z
                                    }
                                    if (w) W = Math.max(0, a * Math.round((j.pts - j.dts) / a));
                                    else {
                                        if (G < E - 1) a = m[G + 1].dts - j.dts;
                                        else {
                                            var J = this.config,
                                            Q = j.dts - m[G > 0 ? G - 1 : G].dts;
                                            if (J.stretchShortVideoTrack) {
                                                var Z = J.maxBufferHole,
                                                $ = J.maxSeekHole,
                                                ee = Math.floor(Math.min(Z, $) * y),
                                                te = (i ? o + i * y: this.nextAudioPts) - j.pts;
                                                te > ee ? (a = te - Q, a < 0 && (a = Q), d.logger.log("It is approximately " + te / 90 + " ms to the next segment; using duration " + a / 90 + " ms for the last video frame.")) : a = Q
                                            } else a = Q
                                        }
                                        W = Math.round(j.pts - j.dts)
                                    }
                                    T.push({
                                        size: H,
                                        duration: a,
                                        cts: W,
                                        flags: {
                                            isLeading: 0,
                                            isDependedOn: 0,
                                            hasRedundancy: 0,
                                            degradPrio: 0,
                                            dependsOn: j.key ? 2 : 1,
                                            isNonSync: j.key ? 0 : 1
                                        }
                                    })
                                }
                                this.nextAvcDts = g + a;
                                var re = e.dropped;
                                if (e.len = 0, e.nbNalu = 0, e.dropped = 0, T.length && navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
                                    var ie = T[0].flags;
                                    ie.dependsOn = 2,
                                    ie.isNonSync = 0
                                }
                                e.samples = T,
                                s = f["default"].moof(e.sequenceNumber++, l, e),
                                e.samples = [];
                                var ae = {
                                    data1: s,
                                    data2: n,
                                    startPTS: o / y,
                                    endPTS: (v + a) / y,
                                    startDTS: l / y,
                                    endDTS: this.nextAvcDts / y,
                                    type: "video",
                                    nb: T.length,
                                    dropped: re
                                };
                                return this.observer.trigger(u["default"].FRAG_PARSING_DATA, ae),
                                ae
                            }
                        },
                        {
                            key: "remuxAudio",
                            value: function(e, t, r, i) {
                                var a, n, s, l, c, g, p, y, m, T, E, k, b, _, R, A, S = e.inputTimeScale,
                                L = e.timescale,
                                w = S / L,
                                D = e.isAAC ? 1024 : 1152,
                                O = D * w,
                                I = this._PTSNormalize,
                                C = this._initDTS,
                                P = !e.isAAC && this.typeSupported.mpeg,
                                x = P ? 0 : 8,
                                M = [],
                                N = [];
                                if (e.samples.sort(function(e, t) {
                                    return e.pts - t.pts
                                }), N = e.samples, A = this.nextAudioPts, r |= N.length && A && (Math.abs(t - A / S) < .1 || Math.abs(N[0].pts - A - C) < 20 * O), r || (A = t * S), i && e.isAAC) for (var F = 0,
                                U = A; F < N.length;) {
                                    var B = N[F],
                                    G = I(B.pts - C, A),
                                    j = G - U,
                                    V = Math.abs(1e3 * j / S);
                                    if (j <= -O) d.logger.warn("Dropping 1 audio frame @ " + (U / S).toFixed(3) + "s due to " + V + " ms overlap."),
                                    N.splice(F, 1),
                                    e.len -= B.unit.length;
                                    else if (j >= O && V < v && U) {
                                        var H = Math.round(j / O);
                                        d.logger.warn("Injecting " + H + " audio frame @ " + (U / S).toFixed(3) + "s due to " + 1e3 * j / S + " ms gap.");
                                        for (var W = 0; W < H; W++) R = U + C,
                                        R = Math.max(R, C),
                                        _ = o["default"].getSilentFrame(e.manifestCodec || e.codec, e.channelCount),
                                        _ || (d.logger.log("Unable to get silent frame for given audio codec; duplicating last frame instead."), _ = B.unit.subarray()),
                                        N.splice(F, 0, {
                                            unit: _,
                                            pts: R,
                                            dts: R
                                        }),
                                        e.len += _.length,
                                        U += O,
                                        F += 1;
                                        B.pts = B.dts = U + C,
                                        U += O,
                                        F += 1
                                    } else Math.abs(j) > .1 * O,
                                    U += O,
                                    0 === F ? B.pts = B.dts = C + A: B.pts = B.dts = N[F - 1].pts + O,
                                    F += 1
                                }
                                for (var K = 0,
                                Y = N.length; K < Y; K++) {
                                    if (n = N[K], l = n.unit, T = n.pts - C, E = n.dts - C, void 0 !== m) k = I(T, m),
                                    b = I(E, m),
                                    s.duration = Math.round((b - m) / w);
                                    else {
                                        k = I(T, A),
                                        b = I(E, A);
                                        var q = Math.round(1e3 * (k - A) / S),
                                        X = 0;
                                        if (r && e.isAAC && q) {
                                            if (q > 0 && q < v) X = Math.round((k - A) / O),
                                            d.logger.log(q + " ms hole between AAC samples detected,filling it"),
                                            X > 0 && (_ = o["default"].getSilentFrame(e.manifestCodec || e.codec, e.channelCount), _ || (_ = l.subarray()), e.len += X * _.length);
                                            else if (q < -12) {
                                                d.logger.log( - q + " ms overlapping between AAC samples detected, drop frame"),
                                                e.len -= l.byteLength;
                                                continue
                                            }
                                            k = b = A
                                        }
                                        if (p = Math.max(0, k), y = Math.max(0, b), !(e.len > 0)) return;
                                        var z = P ? e.len: e.len + 8;
                                        try {
                                            c = new Uint8Array(z)
                                        } catch(J) {
                                            return void this.observer.trigger(u["default"].ERROR, {
                                                type: h.ErrorTypes.MUX_ERROR,
                                                details: h.ErrorDetails.REMUX_ALLOC_ERROR,
                                                fatal: !1,
                                                bytes: z,
                                                reason: "fail allocating audio mdat " + z
                                            })
                                        }
                                        P || (a = new DataView(c.buffer), a.setUint32(0, z), c.set(f["default"].types.mdat, 4));
                                        for (var Q = 0; Q < X; Q++) R = k - (X - Q) * O,
                                        _ = o["default"].getSilentFrame(e.manifestCodec || e.codec, e.channelCount),
                                        _ || (d.logger.log("Unable to get silent frame for given audio codec; duplicating this frame instead."), _ = l.subarray()),
                                        c.set(_, x),
                                        x += _.byteLength,
                                        s = {
                                            size: _.byteLength,
                                            cts: 0,
                                            duration: 1024,
                                            flags: {
                                                isLeading: 0,
                                                isDependedOn: 0,
                                                hasRedundancy: 0,
                                                degradPrio: 0,
                                                dependsOn: 1
                                            }
                                        },
                                        M.push(s)
                                    }
                                    c.set(l, x);
                                    var Z = l.byteLength;
                                    x += Z,
                                    s = {
                                        size: Z,
                                        cts: 0,
                                        duration: 0,
                                        flags: {
                                            isLeading: 0,
                                            isDependedOn: 0,
                                            hasRedundancy: 0,
                                            degradPrio: 0,
                                            dependsOn: 1
                                        }
                                    },
                                    M.push(s),
                                    m = b
                                }
                                var $ = 0,
                                ee = M.length;
                                if (ee >= 2 && ($ = M[ee - 2].duration, s.duration = $), ee) {
                                    this.nextAudioPts = k + w * $,
                                    e.len = 0,
                                    e.samples = M,
                                    g = P ? new Uint8Array: f["default"].moof(e.sequenceNumber++, y / w, e),
                                    e.samples = [];
                                    var te = {
                                        data1: g,
                                        data2: c,
                                        startPTS: p / S,
                                        endPTS: this.nextAudioPts / S,
                                        startDTS: y / S,
                                        endDTS: (b + w * $) / S,
                                        type: "audio",
                                        nb: ee
                                    };
                                    return this.observer.trigger(u["default"].FRAG_PARSING_DATA, te),
                                    te
                                }
                                return null
                            }
                        },
                        {
                            key: "remuxEmptyAudio",
                            value: function(e, t, r, i) {
                                var a = e.inputTimeScale,
                                n = e.samplerate ? e.samplerate: a,
                                s = a / n,
                                l = this.nextAudioPts,
                                u = (void 0 !== l ? l: i.startDTS * a) + this._initDTS,
                                c = i.endDTS * a + this._initDTS,
                                f = 1024,
                                h = s * f,
                                v = Math.ceil((c - u) / h),
                                g = o["default"].getSilentFrame(e.manifestCodec || e.codec, e.channelCount);
                                if (d.logger.warn("remux empty Audio"), !g) return void d.logger.trace("Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec!");
                                for (var p = [], y = 0; y < v; y++) {
                                    var m = u + y * h;
                                    p.push({
                                        unit: g,
                                        pts: m,
                                        dts: m
                                    }),
                                    e.len += g.length
                                }
                                e.samples = p,
                                this.remuxAudio(e, t, r)
                            }
                        },
                        {
                            key: "remuxID3",
                            value: function(e, t) {
                                var r, i = e.samples.length,
                                a = e.inputTimeScale,
                                n = this._initPTS,
                                s = this._initDTS;
                                if (i) {
                                    for (var o = 0; o < i; o++) r = e.samples[o],
                                    r.pts = (r.pts - n) / a,
                                    r.dts = (r.dts - s) / a;
                                    this.observer.trigger(u["default"].FRAG_PARSING_METADATA, {
                                        samples: e.samples
                                    })
                                }
                                e.samples = [],
                                t = t
                            }
                        },
                        {
                            key: "remuxText",
                            value: function(e, t) {
                                e.samples.sort(function(e, t) {
                                    return e.pts - t.pts
                                });
                                var r, i = e.samples.length,
                                a = e.inputTimeScale,
                                n = this._initPTS;
                                if (i) {
                                    for (var s = 0; s < i; s++) r = e.samples[s],
                                    r.pts = (r.pts - n) / a;
                                    this.observer.trigger(u["default"].FRAG_PARSING_USERDATA, {
                                        samples: e.samples
                                    })
                                }
                                e.samples = [],
                                t = t
                            }
                        },
                        {
                            key: "_PTSNormalize",
                            value: function(e, t) {
                                var r;
                                if (void 0 === t) return e;
                                for (r = t < e ? -8589934592 : 8589934592; Math.abs(e - t) > 4294967296;) e += r;
                                return e
                            }
                        }]),
                        e
                    } ();
                    r["default"] = g
                },
                {
                    30 : 30,
                    32 : 32,
                    33 : 33,
                    41 : 41,
                    51 : 51
                }],
                43 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var n = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    s = e(32),
                    o = i(s),
                    l = function() {
                        function e(t) {
                            a(this, e),
                            this.observer = t
                        }
                        return n(e, [{
                            key: "destroy",
                            value: function() {}
                        },
                        {
                            key: "resetTimeStamp",
                            value: function() {}
                        },
                        {
                            key: "resetInitSegment",
                            value: function() {}
                        },
                        {
                            key: "remux",
                            value: function(e, t, r, i, a, n, s, l) {
                                var u = this.observer,
                                d = "";
                                e && (d += "audio"),
                                t && (d += "video"),
                                u.trigger(o["default"].FRAG_PARSING_DATA, {
                                    data1: l,
                                    startPTS: a,
                                    startDTS: a,
                                    type: d,
                                    nb: 1,
                                    dropped: 0
                                }),
                                u.trigger(o["default"].FRAG_PARSED)
                            }
                        }]),
                        e
                    } ();
                    r["default"] = l
                },
                {
                    32 : 32
                }],
                44 : [function(e, t, r) {
                    "use strict";
                    function i(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var a = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    n = /^(\d+)x(\d+)$/,
                    s = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g,
                    o = function() {
                        function e(t) {
                            i(this, e),
                            "string" == typeof t && (t = e.parseAttrList(t));
                            for (var r in t) t.hasOwnProperty(r) && (this[r] = t[r])
                        }
                        return a(e, [{
                            key: "decimalInteger",
                            value: function(e) {
                                var t = parseInt(this[e], 10);
                                return t > Number.MAX_SAFE_INTEGER ? 1 / 0 : t
                            }
                        },
                        {
                            key: "hexadecimalInteger",
                            value: function(e) {
                                if (this[e]) {
                                    var t = (this[e] || "0x").slice(2);
                                    t = (1 & t.length ? "0": "") + t;
                                    for (var r = new Uint8Array(t.length / 2), i = 0; i < t.length / 2; i++) r[i] = parseInt(t.slice(2 * i, 2 * i + 2), 16);
                                    return r
                                }
                                return null
                            }
                        },
                        {
                            key: "hexadecimalIntegerAsNumber",
                            value: function(e) {
                                var t = parseInt(this[e], 16);
                                return t > Number.MAX_SAFE_INTEGER ? 1 / 0 : t
                            }
                        },
                        {
                            key: "decimalFloatingPoint",
                            value: function(e) {
                                return parseFloat(this[e])
                            }
                        },
                        {
                            key: "enumeratedString",
                            value: function(e) {
                                return this[e]
                            }
                        },
                        {
                            key: "decimalResolution",
                            value: function(e) {
                                var t = n.exec(this[e]);
                                if (null !== t) return {
                                    width: parseInt(t[1], 10),
                                    height: parseInt(t[2], 10)
                                }
                            }
                        }], [{
                            key: "parseAttrList",
                            value: function(e) {
                                var t, r = {};
                                for (s.lastIndex = 0; null !== (t = s.exec(e));) {
                                    var i = t[2],
                                    a = '"';
                                    0 === i.indexOf(a) && i.lastIndexOf(a) === i.length - 1 && (i = i.slice(1, -1)),
                                    r[t[1]] = i
                                }
                                return r
                            }
                        }]),
                        e
                    } ();
                    r["default"] = o
                },
                {}],
                45 : [function(e, t, r) {
                    "use strict";
                    var i = {
                        search: function(e, t) {
                            for (var r = 0,
                            i = e.length - 1,
                            a = null,
                            n = null; r <= i;) {
                                a = (r + i) / 2 | 0,
                                n = e[a];
                                var s = t(n);
                                if (s > 0) r = a + 1;
                                else {
                                    if (! (s < 0)) return n;
                                    i = a - 1
                                }
                            }
                            return null
                        }
                    };
                    t.exports = i
                },
                {}],
                46 : [function(e, t, r) {
                    "use strict";
                    function i(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var a = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    n = {
                        42 : 225,
                        92 : 233,
                        94 : 237,
                        95 : 243,
                        96 : 250,
                        123 : 231,
                        124 : 247,
                        125 : 209,
                        126 : 241,
                        127 : 9608,
                        128 : 174,
                        129 : 176,
                        130 : 189,
                        131 : 191,
                        132 : 8482,
                        133 : 162,
                        134 : 163,
                        135 : 9834,
                        136 : 224,
                        137 : 32,
                        138 : 232,
                        139 : 226,
                        140 : 234,
                        141 : 238,
                        142 : 244,
                        143 : 251,
                        144 : 193,
                        145 : 201,
                        146 : 211,
                        147 : 218,
                        148 : 220,
                        149 : 252,
                        150 : 8216,
                        151 : 161,
                        152 : 42,
                        153 : 8217,
                        154 : 9473,
                        155 : 169,
                        156 : 8480,
                        157 : 8226,
                        158 : 8220,
                        159 : 8221,
                        160 : 192,
                        161 : 194,
                        162 : 199,
                        163 : 200,
                        164 : 202,
                        165 : 203,
                        166 : 235,
                        167 : 206,
                        168 : 207,
                        169 : 239,
                        170 : 212,
                        171 : 217,
                        172 : 249,
                        173 : 219,
                        174 : 171,
                        175 : 187,
                        176 : 195,
                        177 : 227,
                        178 : 205,
                        179 : 204,
                        180 : 236,
                        181 : 210,
                        182 : 242,
                        183 : 213,
                        184 : 245,
                        185 : 123,
                        186 : 125,
                        187 : 92,
                        188 : 94,
                        189 : 95,
                        190 : 124,
                        191 : 8764,
                        192 : 196,
                        193 : 228,
                        194 : 214,
                        195 : 246,
                        196 : 223,
                        197 : 165,
                        198 : 164,
                        199 : 9475,
                        200 : 197,
                        201 : 229,
                        202 : 216,
                        203 : 248,
                        204 : 9487,
                        205 : 9491,
                        206 : 9495,
                        207 : 9499
                    },
                    s = function(e) {
                        var t = e;
                        return n.hasOwnProperty(e) && (t = n[e]),
                        String.fromCharCode(t)
                    },
                    o = 15,
                    l = 100,
                    u = {
                        17 : 1,
                        18 : 3,
                        21 : 5,
                        22 : 7,
                        23 : 9,
                        16 : 11,
                        19 : 12,
                        20 : 14
                    },
                    d = {
                        17 : 2,
                        18 : 4,
                        21 : 6,
                        22 : 8,
                        23 : 10,
                        19 : 13,
                        20 : 15
                    },
                    c = {
                        25 : 1,
                        26 : 3,
                        29 : 5,
                        30 : 7,
                        31 : 9,
                        24 : 11,
                        27 : 12,
                        28 : 14
                    },
                    f = {
                        25 : 2,
                        26 : 4,
                        29 : 6,
                        30 : 8,
                        31 : 10,
                        27 : 13,
                        28 : 15
                    },
                    h = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "black", "transparent"],
                    v = {
                        verboseFilter: {
                            DATA: 3,
                            DEBUG: 3,
                            INFO: 2,
                            WARNING: 2,
                            TEXT: 1,
                            ERROR: 0
                        },
                        time: null,
                        verboseLevel: 0,
                        setTime: function(e) {
                            this.time = e
                        },
                        log: function(e, t) {
                            var r = this.verboseFilter[e];
                            this.verboseLevel >= r && console.log(this.time.toFixed(3) + " [" + e + "] " + t)
                        }
                    },
                    g = function(e) {
                        for (var t = [], r = 0; r < e.length; r++) t.push(e[r].toString(16));
                        return t
                    },
                    p = function() {
                        function e(t, r, a, n, s) {
                            i(this, e),
                            this.foreground = t || "white",
                            this.underline = r || !1,
                            this.italics = a || !1,
                            this.background = n || "black",
                            this.flash = s || !1
                        }
                        return a(e, [{
                            key: "reset",
                            value: function() {
                                this.foreground = "white",
                                this.underline = !1,
                                this.italics = !1,
                                this.background = "black",
                                this.flash = !1
                            }
                        },
                        {
                            key: "setStyles",
                            value: function(e) {
                                for (var t = ["foreground", "underline", "italics", "background", "flash"], r = 0; r < t.length; r++) {
                                    var i = t[r];
                                    e.hasOwnProperty(i) && (this[i] = e[i])
                                }
                            }
                        },
                        {
                            key: "isDefault",
                            value: function() {
                                return "white" === this.foreground && !this.underline && !this.italics && "black" === this.background && !this.flash
                            }
                        },
                        {
                            key: "equals",
                            value: function(e) {
                                return this.foreground === e.foreground && this.underline === e.underline && this.italics === e.italics && this.background === e.background && this.flash === e.flash
                            }
                        },
                        {
                            key: "copy",
                            value: function(e) {
                                this.foreground = e.foreground,
                                this.underline = e.underline,
                                this.italics = e.italics,
                                this.background = e.background,
                                this.flash = e.flash
                            }
                        },
                        {
                            key: "toString",
                            value: function() {
                                return "color=" + this.foreground + ", underline=" + this.underline + ", italics=" + this.italics + ", background=" + this.background + ", flash=" + this.flash
                            }
                        }]),
                        e
                    } (),
                    y = function() {
                        function e(t, r, a, n, s, o) {
                            i(this, e),
                            this.uchar = t || " ",
                            this.penState = new p(r, a, n, s, o)
                        }
                        return a(e, [{
                            key: "reset",
                            value: function() {
                                this.uchar = " ",
                                this.penState.reset()
                            }
                        },
                        {
                            key: "setChar",
                            value: function(e, t) {
                                this.uchar = e,
                                this.penState.copy(t)
                            }
                        },
                        {
                            key: "setPenState",
                            value: function(e) {
                                this.penState.copy(e)
                            }
                        },
                        {
                            key: "equals",
                            value: function(e) {
                                return this.uchar === e.uchar && this.penState.equals(e.penState)
                            }
                        },
                        {
                            key: "copy",
                            value: function(e) {
                                this.uchar = e.uchar,
                                this.penState.copy(e.penState)
                            }
                        },
                        {
                            key: "isEmpty",
                            value: function() {
                                return " " === this.uchar && this.penState.isDefault()
                            }
                        }]),
                        e
                    } (),
                    m = function() {
                        function e() {
                            i(this, e),
                            this.chars = [];
                            for (var t = 0; t < l; t++) this.chars.push(new y);
                            this.pos = 0,
                            this.currPenState = new p
                        }
                        return a(e, [{
                            key: "equals",
                            value: function(e) {
                                for (var t = !0,
                                r = 0; r < l; r++) if (!this.chars[r].equals(e.chars[r])) {
                                    t = !1;
                                    break
                                }
                                return t
                            }
                        },
                        {
                            key: "copy",
                            value: function(e) {
                                for (var t = 0; t < l; t++) this.chars[t].copy(e.chars[t])
                            }
                        },
                        {
                            key: "isEmpty",
                            value: function() {
                                for (var e = !0,
                                t = 0; t < l; t++) if (!this.chars[t].isEmpty()) {
                                    e = !1;
                                    break
                                }
                                return e
                            }
                        },
                        {
                            key: "setCursor",
                            value: function(e) {
                                this.pos !== e && (this.pos = e),
                                this.pos < 0 ? (v.log("ERROR", "Negative cursor position " + this.pos), this.pos = 0) : this.pos > l && (v.log("ERROR", "Too large cursor position " + this.pos), this.pos = l)
                            }
                        },
                        {
                            key: "moveCursor",
                            value: function(e) {
                                var t = this.pos + e;
                                if (e > 1) for (var r = this.pos + 1; r < t + 1; r++) this.chars[r].setPenState(this.currPenState);
                                this.setCursor(t)
                            }
                        },
                        {
                            key: "backSpace",
                            value: function() {
                                this.moveCursor( - 1),
                                this.chars[this.pos].setChar(" ", this.currPenState)
                            }
                        },
                        {
                            key: "insertChar",
                            value: function(e) {
                                e >= 144 && this.backSpace();
                                var t = s(e);
                                return this.pos >= l ? void v.log("WARNING", "Cannot insert " + e.toString(16) + " (" + t + ") at position " + this.pos + ". Skipping it!") : (this.chars[this.pos].setChar(t, this.currPenState), void this.moveCursor(1))
                            }
                        },
                        {
                            key: "clearFromPos",
                            value: function(e) {
                                var t;
                                for (t = e; t < l; t++) this.chars[t].reset()
                            }
                        },
                        {
                            key: "clear",
                            value: function() {
                                this.clearFromPos(0),
                                this.pos = 0,
                                this.currPenState.reset()
                            }
                        },
                        {
                            key: "clearToEndOfRow",
                            value: function() {
                                this.clearFromPos(this.pos)
                            }
                        },
                        {
                            key: "getTextString",
                            value: function() {
                                for (var e = [], t = !0, r = 0; r < l; r++) {
                                    var i = this.chars[r].uchar;
                                    " " !== i && (t = !1),
                                    e.push(i)
                                }
                                return t ? "": e.join("")
                            }
                        },
                        {
                            key: "setPenStyles",
                            value: function(e) {
                                this.currPenState.setStyles(e);
                                var t = this.chars[this.pos];
                                t.setPenState(this.currPenState)
                            }
                        }]),
                        e
                    } (),
                    T = function() {
                        function e() {
                            i(this, e),
                            this.rows = [];
                            for (var t = 0; t < o; t++) this.rows.push(new m);
                            this.currRow = o - 1,
                            this.nrRollUpRows = null,
                            this.reset()
                        }
                        return a(e, [{
                            key: "reset",
                            value: function() {
                                for (var e = 0; e < o; e++) this.rows[e].clear();
                                this.currRow = o - 1
                            }
                        },
                        {
                            key: "equals",
                            value: function(e) {
                                for (var t = !0,
                                r = 0; r < o; r++) if (!this.rows[r].equals(e.rows[r])) {
                                    t = !1;
                                    break
                                }
                                return t
                            }
                        },
                        {
                            key: "copy",
                            value: function(e) {
                                for (var t = 0; t < o; t++) this.rows[t].copy(e.rows[t])
                            }
                        },
                        {
                            key: "isEmpty",
                            value: function() {
                                for (var e = !0,
                                t = 0; t < o; t++) if (!this.rows[t].isEmpty()) {
                                    e = !1;
                                    break
                                }
                                return e
                            }
                        },
                        {
                            key: "backSpace",
                            value: function() {
                                var e = this.rows[this.currRow];
                                e.backSpace()
                            }
                        },
                        {
                            key: "clearToEndOfRow",
                            value: function() {
                                var e = this.rows[this.currRow];
                                e.clearToEndOfRow()
                            }
                        },
                        {
                            key: "insertChar",
                            value: function(e) {
                                var t = this.rows[this.currRow];
                                t.insertChar(e)
                            }
                        },
                        {
                            key: "setPen",
                            value: function(e) {
                                var t = this.rows[this.currRow];
                                t.setPenStyles(e)
                            }
                        },
                        {
                            key: "moveCursor",
                            value: function(e) {
                                var t = this.rows[this.currRow];
                                t.moveCursor(e)
                            }
                        },
                        {
                            key: "setCursor",
                            value: function(e) {
                                v.log("INFO", "setCursor: " + e);
                                var t = this.rows[this.currRow];
                                t.setCursor(e)
                            }
                        },
                        {
                            key: "setPAC",
                            value: function(e) {
                                v.log("INFO", "pacData = " + JSON.stringify(e));
                                var t = e.row - 1;
                                if (this.nrRollUpRows && t < this.nrRollUpRows - 1 && (t = this.nrRollUpRows - 1), this.nrRollUpRows && this.currRow !== t) {
                                    for (var r = 0; r < o; r++) this.rows[r].clear();
                                    var i = this.currRow + 1 - this.nrRollUpRows,
                                    a = this.lastOutputScreen;
                                    if (a) {
                                        var n = a.rows[i].cueStartTime;
                                        if (n && n < v.time) for (var s = 0; s < this.nrRollUpRows; s++) this.rows[t - this.nrRollUpRows + s + 1].copy(a.rows[i + s])
                                    }
                                }
                                this.currRow = t;
                                var l = this.rows[this.currRow];
                                if (null !== e.indent) {
                                    var u = e.indent,
                                    d = Math.max(u - 1, 0);
                                    l.setCursor(e.indent),
                                    e.color = l.chars[d].penState.foreground
                                }
                                var c = {
                                    foreground: e.color,
                                    underline: e.underline,
                                    italics: e.italics,
                                    background: "black",
                                    flash: !1
                                };
                                this.setPen(c)
                            }
                        },
                        {
                            key: "setBkgData",
                            value: function(e) {
                                v.log("INFO", "bkgData = " + JSON.stringify(e)),
                                this.backSpace(),
                                this.setPen(e),
                                this.insertChar(32)
                            }
                        },
                        {
                            key: "setRollUpRows",
                            value: function(e) {
                                this.nrRollUpRows = e
                            }
                        },
                        {
                            key: "rollUp",
                            value: function() {
                                if (null === this.nrRollUpRows) return void v.log("DEBUG", "roll_up but nrRollUpRows not set yet");
                                v.log("TEXT", this.getDisplayText());
                                var e = this.currRow + 1 - this.nrRollUpRows,
                                t = this.rows.splice(e, 1)[0];
                                t.clear(),
                                this.rows.splice(this.currRow, 0, t),
                                v.log("INFO", "Rolling up")
                            }
                        },
                        {
                            key: "getDisplayText",
                            value: function(e) {
                                e = e || !1;
                                for (var t = [], r = "", i = -1, a = 0; a < o; a++) {
                                    var n = this.rows[a].getTextString();
                                    n && (i = a + 1, e ? t.push("Row " + i + ": '" + n + "'") : t.push(n.trim()))
                                }
                                return t.length > 0 && (r = e ? "[" + t.join(" | ") + "]": t.join("\n")),
                                r
                            }
                        },
                        {
                            key: "getTextAndFormat",
                            value: function() {
                                return this.rows
                            }
                        }]),
                        e
                    } (),
                    E = function() {
                        function e(t, r) {
                            i(this, e),
                            this.chNr = t,
                            this.outputFilter = r,
                            this.mode = null,
                            this.verbose = 0,
                            this.displayedMemory = new T,
                            this.nonDisplayedMemory = new T,
                            this.lastOutputScreen = new T,
                            this.currRollUpRow = this.displayedMemory.rows[o - 1],
                            this.writeScreen = this.displayedMemory,
                            this.mode = null,
                            this.cueStartTime = null
                        }
                        return a(e, [{
                            key: "reset",
                            value: function() {
                                this.mode = null,
                                this.displayedMemory.reset(),
                                this.nonDisplayedMemory.reset(),
                                this.lastOutputScreen.reset(),
                                this.currRollUpRow = this.displayedMemory.rows[o - 1],
                                this.writeScreen = this.displayedMemory,
                                this.mode = null,
                                this.cueStartTime = null,
                                this.lastCueEndTime = null
                            }
                        },
                        {
                            key: "getHandler",
                            value: function() {
                                return this.outputFilter
                            }
                        },
                        {
                            key: "setHandler",
                            value: function(e) {
                                this.outputFilter = e
                            }
                        },
                        {
                            key: "setPAC",
                            value: function(e) {
                                this.writeScreen.setPAC(e)
                            }
                        },
                        {
                            key: "setBkgData",
                            value: function(e) {
                                this.writeScreen.setBkgData(e)
                            }
                        },
                        {
                            key: "setMode",
                            value: function(e) {
                                e !== this.mode && (this.mode = e, v.log("INFO", "MODE=" + e), "MODE_POP-ON" === this.mode ? this.writeScreen = this.nonDisplayedMemory: (this.writeScreen = this.displayedMemory, this.writeScreen.reset()), "MODE_ROLL-UP" !== this.mode && (this.displayedMemory.nrRollUpRows = null, this.nonDisplayedMemory.nrRollUpRows = null), this.mode = e)
                            }
                        },
                        {
                            key: "insertChars",
                            value: function(e) {
                                for (var t = 0; t < e.length; t++) this.writeScreen.insertChar(e[t]);
                                var r = this.writeScreen === this.displayedMemory ? "DISP": "NON_DISP";
                                v.log("INFO", r + ": " + this.writeScreen.getDisplayText(!0)),
                                "MODE_PAINT-ON" !== this.mode && "MODE_ROLL-UP" !== this.mode || (v.log("TEXT", "DISPLAYED: " + this.displayedMemory.getDisplayText(!0)), this.outputDataUpdate())
                            }
                        },
                        {
                            key: "ccRCL",
                            value: function() {
                                v.log("INFO", "RCL - Resume Caption Loading"),
                                this.setMode("MODE_POP-ON")
                            }
                        },
                        {
                            key: "ccBS",
                            value: function() {
                                v.log("INFO", "BS - BackSpace"),
                                "MODE_TEXT" !== this.mode && (this.writeScreen.backSpace(), this.writeScreen === this.displayedMemory && this.outputDataUpdate())
                            }
                        },
                        {
                            key: "ccAOF",
                            value: function() {}
                        },
                        {
                            key: "ccAON",
                            value: function() {}
                        },
                        {
                            key: "ccDER",
                            value: function() {
                                v.log("INFO", "DER- Delete to End of Row"),
                                this.writeScreen.clearToEndOfRow(),
                                this.outputDataUpdate()
                            }
                        },
                        {
                            key: "ccRU",
                            value: function(e) {
                                v.log("INFO", "RU(" + e + ") - Roll Up"),
                                this.writeScreen = this.displayedMemory,
                                this.setMode("MODE_ROLL-UP"),
                                this.writeScreen.setRollUpRows(e)
                            }
                        },
                        {
                            key: "ccFON",
                            value: function() {
                                v.log("INFO", "FON - Flash On"),
                                this.writeScreen.setPen({
                                    flash: !0
                                })
                            }
                        },
                        {
                            key: "ccRDC",
                            value: function() {
                                v.log("INFO", "RDC - Resume Direct Captioning"),
                                this.setMode("MODE_PAINT-ON")
                            }
                        },
                        {
                            key: "ccTR",
                            value: function() {
                                v.log("INFO", "TR"),
                                this.setMode("MODE_TEXT")
                            }
                        },
                        {
                            key: "ccRTD",
                            value: function() {
                                v.log("INFO", "RTD"),
                                this.setMode("MODE_TEXT")
                            }
                        },
                        {
                            key: "ccEDM",
                            value: function() {
                                v.log("INFO", "EDM - Erase Displayed Memory"),
                                this.displayedMemory.reset(),
                                this.outputDataUpdate()
                            }
                        },
                        {
                            key: "ccCR",
                            value: function() {
                                v.log("CR - Carriage Return"),
                                this.writeScreen.rollUp(),
                                this.outputDataUpdate()
                            }
                        },
                        {
                            key: "ccENM",
                            value: function() {
                                v.log("INFO", "ENM - Erase Non-displayed Memory"),
                                this.nonDisplayedMemory.reset()
                            }
                        },
                        {
                            key: "ccEOC",
                            value: function() {
                                if (v.log("INFO", "EOC - End Of Caption"), "MODE_POP-ON" === this.mode) {
                                    var e = this.displayedMemory;
                                    this.displayedMemory = this.nonDisplayedMemory,
                                    this.nonDisplayedMemory = e,
                                    this.writeScreen = this.nonDisplayedMemory,
                                    v.log("TEXT", "DISP: " + this.displayedMemory.getDisplayText())
                                }
                                this.outputDataUpdate()
                            }
                        },
                        {
                            key: "ccTO",
                            value: function(e) {
                                v.log("INFO", "TO(" + e + ") - Tab Offset"),
                                this.writeScreen.moveCursor(e)
                            }
                        },
                        {
                            key: "ccMIDROW",
                            value: function(e) {
                                var t = {
                                    flash: !1
                                };
                                if (t.underline = e % 2 === 1, t.italics = e >= 46, t.italics) t.foreground = "white";
                                else {
                                    var r = Math.floor(e / 2) - 16,
                                    i = ["white", "green", "blue", "cyan", "red", "yellow", "magenta"];
                                    t.foreground = i[r]
                                }
                                v.log("INFO", "MIDROW: " + JSON.stringify(t)),
                                this.writeScreen.setPen(t)
                            }
                        },
                        {
                            key: "outputDataUpdate",
                            value: function() {
                                var e = v.time;
                                null !== e && this.outputFilter && (this.outputFilter.updateData && this.outputFilter.updateData(e, this.displayedMemory), null !== this.cueStartTime || this.displayedMemory.isEmpty() ? this.displayedMemory.equals(this.lastOutputScreen) || (this.outputFilter.newCue && this.outputFilter.newCue(this.cueStartTime, e, this.lastOutputScreen), this.cueStartTime = this.displayedMemory.isEmpty() ? null: e) : this.cueStartTime = e, this.lastOutputScreen.copy(this.displayedMemory))
                            }
                        },
                        {
                            key: "cueSplitAtTime",
                            value: function(e) {
                                this.outputFilter && (this.displayedMemory.isEmpty() || (this.outputFilter.newCue && this.outputFilter.newCue(this.cueStartTime, e, this.displayedMemory), this.cueStartTime = e))
                            }
                        }]),
                        e
                    } (),
                    k = function() {
                        function e(t, r, a) {
                            i(this, e),
                            this.field = t || 1,
                            this.outputs = [r, a],
                            this.channels = [new E(1, r), new E(2, a)],
                            this.currChNr = -1,
                            this.lastCmdA = null,
                            this.lastCmdB = null,
                            this.bufferedData = [],
                            this.startTime = null,
                            this.lastTime = null,
                            this.dataCounters = {
                                padding: 0,
                                "char": 0,
                                cmd: 0,
                                other: 0
                            }
                        }
                        return a(e, [{
                            key: "getHandler",
                            value: function(e) {
                                return this.channels[e].getHandler()
                            }
                        },
                        {
                            key: "setHandler",
                            value: function(e, t) {
                                this.channels[e].setHandler(t)
                            }
                        },
                        {
                            key: "addData",
                            value: function(e, t) {
                                var r, i, a, n = !1;
                                this.lastTime = e,
                                v.setTime(e);
                                for (var s = 0; s < t.length; s += 2) if (i = 127 & t[s], a = 127 & t[s + 1], 0 !== i || 0 !== a) {
                                    if (v.log("DATA", "[" + g([t[s], t[s + 1]]) + "] -> (" + g([i, a]) + ")"), r = this.parseCmd(i, a), r || (r = this.parseMidrow(i, a)), r || (r = this.parsePAC(i, a)), r || (r = this.parseBackgroundAttributes(i, a)), !r && (n = this.parseChars(i, a))) if (this.currChNr && this.currChNr >= 0) {
                                        var o = this.channels[this.currChNr - 1];
                                        o.insertChars(n)
                                    } else v.log("WARNING", "No channel found yet. TEXT-MODE?");
                                    r ? this.dataCounters.cmd += 2 : n ? this.dataCounters["char"] += 2 : (this.dataCounters.other += 2, v.log("WARNING", "Couldn't parse cleaned data " + g([i, a]) + " orig: " + g([t[s], t[s + 1]])))
                                } else this.dataCounters.padding += 2
                            }
                        },
                        {
                            key: "parseCmd",
                            value: function(e, t) {
                                var r = null,
                                i = (20 === e || 28 === e) && 32 <= t && t <= 47,
                                a = (23 === e || 31 === e) && 33 <= t && t <= 35;
                                if (!i && !a) return ! 1;
                                if (e === this.lastCmdA && t === this.lastCmdB) return this.lastCmdA = null,
                                this.lastCmdB = null,
                                v.log("DEBUG", "Repeated command (" + g([e, t]) + ") is dropped"),
                                !0;
                                r = 20 === e || 23 === e ? 1 : 2;
                                var n = this.channels[r - 1];
                                return 20 === e || 28 === e ? 32 === t ? n.ccRCL() : 33 === t ? n.ccBS() : 34 === t ? n.ccAOF() : 35 === t ? n.ccAON() : 36 === t ? n.ccDER() : 37 === t ? n.ccRU(2) : 38 === t ? n.ccRU(3) : 39 === t ? n.ccRU(4) : 40 === t ? n.ccFON() : 41 === t ? n.ccRDC() : 42 === t ? n.ccTR() : 43 === t ? n.ccRTD() : 44 === t ? n.ccEDM() : 45 === t ? n.ccCR() : 46 === t ? n.ccENM() : 47 === t && n.ccEOC() : n.ccTO(t - 32),
                                this.lastCmdA = e,
                                this.lastCmdB = t,
                                this.currChNr = r,
                                !0
                            }
                        },
                        {
                            key: "parseMidrow",
                            value: function(e, t) {
                                var r = null;
                                if ((17 === e || 25 === e) && 32 <= t && t <= 47) {
                                    if (r = 17 === e ? 1 : 2, r !== this.currChNr) return v.log("ERROR", "Mismatch channel in midrow parsing"),
                                    !1;
                                    var i = this.channels[r - 1];
                                    return i.ccMIDROW(t),
                                    v.log("DEBUG", "MIDROW (" + g([e, t]) + ")"),
                                    !0
                                }
                                return ! 1
                            }
                        },
                        {
                            key: "parsePAC",
                            value: function(e, t) {
                                var r = null,
                                i = null,
                                a = (17 <= e && e <= 23 || 25 <= e && e <= 31) && 64 <= t && t <= 127,
                                n = (16 === e || 24 === e) && 64 <= t && t <= 95;
                                if (!a && !n) return ! 1;
                                if (e === this.lastCmdA && t === this.lastCmdB) return this.lastCmdA = null,
                                this.lastCmdB = null,
                                !0;
                                r = e <= 23 ? 1 : 2,
                                i = 64 <= t && t <= 95 ? 1 === r ? u[e] : c[e] : 1 === r ? d[e] : f[e];
                                var s = this.interpretPAC(i, t),
                                o = this.channels[r - 1];
                                return o.setPAC(s),
                                this.lastCmdA = e,
                                this.lastCmdB = t,
                                this.currChNr = r,
                                !0
                            }
                        },
                        {
                            key: "interpretPAC",
                            value: function(e, t) {
                                var r = t,
                                i = {
                                    color: null,
                                    italics: !1,
                                    indent: null,
                                    underline: !1,
                                    row: e
                                };
                                return r = t > 95 ? t - 96 : t - 64,
                                i.underline = 1 === (1 & r),
                                r <= 13 ? i.color = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "white"][Math.floor(r / 2)] : r <= 15 ? (i.italics = !0, i.color = "white") : i.indent = 4 * Math.floor((r - 16) / 2),
                                i
                            }
                        },
                        {
                            key: "parseChars",
                            value: function(e, t) {
                                var r = null,
                                i = null,
                                a = null;
                                if (e >= 25 ? (r = 2, a = e - 8) : (r = 1, a = e), 17 <= a && a <= 19) {
                                    var n = t;
                                    n = 17 === a ? t + 80 : 18 === a ? t + 112 : t + 144,
                                    v.log("INFO", "Special char '" + s(n) + "' in channel " + r),
                                    i = [n]
                                } else 32 <= e && e <= 127 && (i = 0 === t ? [e] : [e, t]);
                                if (i) {
                                    var o = g(i);
                                    v.log("DEBUG", "Char codes =  " + o.join(",")),
                                    this.lastCmdA = null,
                                    this.lastCmdB = null
                                }
                                return i
                            }
                        },
                        {
                            key: "parseBackgroundAttributes",
                            value: function(e, t) {
                                var r, i, a, n, s = (16 === e || 24 === e) && 32 <= t && t <= 47,
                                o = (23 === e || 31 === e) && 45 <= t && t <= 47;
                                return ! (!s && !o) && (r = {},
                                16 === e || 24 === e ? (i = Math.floor((t - 32) / 2), r.background = h[i], t % 2 === 1 && (r.background = r.background + "_semi")) : 45 === t ? r.background = "transparent": (r.foreground = "black", 47 === t && (r.underline = !0)), a = e < 24 ? 1 : 2, n = this.channels[a - 1], n.setBkgData(r), this.lastCmdA = null, this.lastCmdB = null, !0)
                            }
                        },
                        {
                            key: "reset",
                            value: function() {
                                for (var e = 0; e < this.channels.length; e++) this.channels[e] && this.channels[e].reset();
                                this.lastCmdA = null,
                                this.lastCmdB = null
                            }
                        },
                        {
                            key: "cueSplitAtTime",
                            value: function(e) {
                                for (var t = 0; t < this.channels.length; t++) this.channels[t] && this.channels[t].cueSplitAtTime(e)
                            }
                        }]),
                        e
                    } ();
                    r["default"] = k
                },
                {}],
                47 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    var a = e(54),
                    n = e(53),
                    s = i(n),
                    o = {
                        createCues: function(e, t, r) {
                            for (var i, n, o, l, u, d = [], c = 0; c < r.rows.length; c++) if (i = r.rows[c], o = !0, l = 0, u = "", !i.isEmpty()) {
                                for (var f = 0; f < i.chars.length; f++) i.chars[f].uchar.match(/\s/) && o ? l++:(u += i.chars[f].uchar, o = !1);
                                i.cueStartTime = e,
                                e === t && (t += 1e-4),
                                n = new s["default"](e, t, (0, a.fixLineBreaks)(u.trim())),
                                l >= 16 ? l--:l++,
                                navigator.userAgent.match(/Firefox\//) ? n.line = c + 1 : n.line = c > 7 ? c - 2 : c + 1,
                                n.align = "left",
                                n.position = Math.max(0, Math.min(100, 100 * (l / 32))),
                                d.push(n)
                            }
                            return d
                        }
                    };
                    t.exports = o
                },
                {
                    53 : 53,
                    54 : 54
                }],
                48 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        for (var r = null,
                        i = 0; i < e.length; i += 1) {
                            var a = e[i];
                            if (a && a.cc === t) {
                                r = a;
                                break
                            }
                        }
                        return r
                    }
                    function n(e, t) {
                        return c["default"].search(e,
                        function(e) {
                            return e.cc < t ? 1 : e.cc > t ? -1 : 0
                        })
                    }
                    function s(e, t, r) {
                        var i = !1;
                        return t && t.details && r && (r.endCC > r.startCC || e && e.cc < r.startCC) && (i = !0),
                        i
                    }
                    function o(e, t) {
                        var r = e.fragments,
                        i = t.fragments;
                        if (!i.length || !r.length) return void f.logger.log("No fragments to align");
                        var n = a(r, i[0].cc);
                        return ! n || n && !n.startPTS ? void f.logger.log("No frag in previous level to align on") : n
                    }
                    function l(e, t) {
                        e && (t.fragments.forEach(function(t, r) {
                            t && (t.duration = e.duration, t.end = t.endPTS = e.endPTS + t.duration * r, t.start = t.startPTS = e.startPTS + t.start)
                        }), t.PTSKnown = !0)
                    }
                    function u(e, t, r) {
                        if (s(e, t, r)) {
                            f.logger.log("Adjusting PTS using last level due to CC increase within current level");
                            var i = o(t.details, r);
                            l(i, r)
                        }
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    }),
                    r.findFirstFragWithCC = a,
                    r.findFragWithCC = n,
                    r.shouldAlignOnDiscontinuities = s,
                    r.findDiscontinuousReferenceFrag = o,
                    r.adjustPtsByReferenceFrag = l,
                    r.alignDiscontinuities = u;
                    var d = e(45),
                    c = i(d),
                    f = e(51)
                },
                {
                    45 : 45,
                    51 : 51
                }],
                49 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var n = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    s = e(50),
                    o = i(s),
                    l = function() {
                        function e(t, r, i, n) {
                            a(this, e),
                            this.hls = t,
                            this.defaultEstimate_ = n,
                            this.minWeight_ = .001,
                            this.minDelayMs_ = 50,
                            this.slow_ = new o["default"](r),
                            this.fast_ = new o["default"](i)
                        }
                        return n(e, [{
                            key: "sample",
                            value: function(e, t) {
                                e = Math.max(e, this.minDelayMs_);
                                var r = 8e3 * t / e,
                                i = e / 1e3;
                                this.fast_.sample(i, r),
                                this.slow_.sample(i, r)
                            }
                        },
                        {
                            key: "canEstimate",
                            value: function() {
                                var e = this.fast_;
                                return e && e.getTotalWeight() >= this.minWeight_
                            }
                        },
                        {
                            key: "getEstimate",
                            value: function() {
                                return this.canEstimate() ? Math.min(this.fast_.getEstimate(), this.slow_.getEstimate()) : this.defaultEstimate_
                            }
                        },
                        {
                            key: "destroy",
                            value: function() {}
                        }]),
                        e
                    } ();
                    r["default"] = l
                },
                {
                    50 : 50
                }],
                50 : [function(e, t, r) {
                    "use strict";
                    function i(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var a = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    n = function() {
                        function e(t) {
                            i(this, e),
                            this.alpha_ = t ? Math.exp(Math.log(.5) / t) : 0,
                            this.estimate_ = 0,
                            this.totalWeight_ = 0
                        }
                        return a(e, [{
                            key: "sample",
                            value: function(e, t) {
                                var r = Math.pow(this.alpha_, e);
                                this.estimate_ = t * (1 - r) + r * this.estimate_,
                                this.totalWeight_ += e
                            }
                        },
                        {
                            key: "getTotalWeight",
                            value: function() {
                                return this.totalWeight_
                            }
                        },
                        {
                            key: "getEstimate",
                            value: function() {
                                if (this.alpha_) {
                                    var e = 1 - Math.pow(this.alpha_, this.totalWeight_);
                                    return this.estimate_ / e
                                }
                                return this.estimate_
                            }
                        }]),
                        e
                    } ();
                    r["default"] = n
                },
                {}],
                51 : [function(e, t, r) {
                    "use strict";
                    function i() {}
                    function a(e, t) {
                        return t = "[" + e + "] > " + t
                    }
                    function n(e) {
                        var t = self.console[e];
                        return t ?
                        function() {
                            for (var r = arguments.length,
                            i = Array(r), n = 0; n < r; n++) i[n] = arguments[n];
                            i[0] && (i[0] = a(e, i[0])),
                            t.apply(self.console, i)
                        }: i
                    }
                    function s(e) {
                        for (var t = arguments.length,
                        r = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) r[i - 1] = arguments[i];
                        r.forEach(function(t) {
                            u[t] = e[t] ? e[t].bind(e) : n(t)
                        })
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
                    function(e) {
                        return typeof e
                    }: function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
                    },
                    l = {
                        trace: i,
                        debug: i,
                        log: i,
                        warn: i,
                        info: i,
                        error: i
                    },
                    u = l;
                    r.enableLogs = function(e) {
                        if (e === !0 || "object" === ("undefined" == typeof e ? "undefined": o(e))) {
                            s(e, "debug", "log", "info", "warn", "error");
                            try {
                                u.log()
                            } catch(t) {
                                u = l
                            }
                        } else u = l
                    },
                    r.logger = u
                },
                {}],
                52 : [function(e, t, r) {
                    "use strict";
                    var i = {
                        toString: function(e) {
                            for (var t = "",
                            r = e.length,
                            i = 0; i < r; i++) t += "[" + e.start(i).toFixed(3) + "," + e.end(i).toFixed(3) + "]";
                            return t
                        }
                    };
                    t.exports = i
                },
                {}],
                53 : [function(e, t, r) {
                    "use strict";
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    }),
                    r["default"] = function() {
                        function e(e) {
                            if ("string" != typeof e) return ! 1;
                            var t = n[e.toLowerCase()];
                            return !! t && e.toLowerCase()
                        }
                        function t(e) {
                            if ("string" != typeof e) return ! 1;
                            var t = s[e.toLowerCase()];
                            return !! t && e.toLowerCase()
                        }
                        function r(e) {
                            for (var t = 1; t < arguments.length; t++) {
                                var r = arguments[t];
                                for (var i in r) e[i] = r[i]
                            }
                            return e
                        }
                        function i(i, n, s) {
                            var o = this,
                            l = function() {
                                if ("undefined" != typeof navigator) return /MSIE\s8\.0/.test(navigator.userAgent)
                            } (),
                            u = {};
                            l ? o = document.createElement("custom") : u.enumerable = !0,
                            o.hasBeenReset = !1;
                            var d = "",
                            c = !1,
                            f = i,
                            h = n,
                            v = s,
                            g = null,
                            p = "",
                            y = !0,
                            m = "auto",
                            T = "start",
                            E = 50,
                            k = 50,
                            b = "middle";
                            if (Object.defineProperty(o, "id", r({},
                            u, {
                                get: function() {
                                    return d
                                },
                                set: function(e) {
                                    d = "" + e
                                }
                            })), Object.defineProperty(o, "pauseOnExit", r({},
                            u, {
                                get: function() {
                                    return c
                                },
                                set: function(e) {
                                    c = !!e
                                }
                            })), Object.defineProperty(o, "startTime", r({},
                            u, {
                                get: function() {
                                    return f
                                },
                                set: function(e) {
                                    if ("number" != typeof e) throw new TypeError("Start time must be set to a number.");
                                    f = e,
                                    this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(o, "endTime", r({},
                            u, {
                                get: function() {
                                    return h
                                },
                                set: function(e) {
                                    if ("number" != typeof e) throw new TypeError("End time must be set to a number.");
                                    h = e,
                                    this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(o, "text", r({},
                            u, {
                                get: function() {
                                    return v
                                },
                                set: function(e) {
                                    v = "" + e,
                                    this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(o, "region", r({},
                            u, {
                                get: function() {
                                    return g
                                },
                                set: function(e) {
                                    g = e,
                                    this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(o, "vertical", r({},
                            u, {
                                get: function() {
                                    return p
                                },
                                set: function(t) {
                                    var r = e(t);
                                    if (r === !1) throw new SyntaxError("An invalid or illegal string was specified.");
                                    p = r,
                                    this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(o, "snapToLines", r({},
                            u, {
                                get: function() {
                                    return y
                                },
                                set: function(e) {
                                    y = !!e,
                                    this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(o, "line", r({},
                            u, {
                                get: function() {
                                    return m
                                },
                                set: function(e) {
                                    if ("number" != typeof e && e !== a) throw new SyntaxError("An invalid number or illegal string was specified.");
                                    m = e,
                                    this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(o, "lineAlign", r({},
                            u, {
                                get: function() {
                                    return T
                                },
                                set: function(e) {
                                    var r = t(e);
                                    if (!r) throw new SyntaxError("An invalid or illegal string was specified.");
                                    T = r,
                                    this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(o, "position", r({},
                            u, {
                                get: function() {
                                    return E
                                },
                                set: function(e) {
                                    if (e < 0 || e > 100) throw new Error("Position must be between 0 and 100.");
                                    E = e,
                                    this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(o, "size", r({},
                            u, {
                                get: function() {
                                    return k
                                },
                                set: function(e) {
                                    if (e < 0 || e > 100) throw new Error("Size must be between 0 and 100.");
                                    k = e,
                                    this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(o, "align", r({},
                            u, {
                                get: function() {
                                    return b
                                },
                                set: function(e) {
                                    var r = t(e);
                                    if (!r) throw new SyntaxError("An invalid or illegal string was specified.");
                                    b = r,
                                    this.hasBeenReset = !0
                                }
                            })), o.displayState = void 0, l) return o
                        }
                        if ("undefined" != typeof window && window.VTTCue) return window.VTTCue;
                        var a = "auto",
                        n = {
                            "": !0,
                            lr: !0,
                            rl: !0
                        },
                        s = {
                            start: !0,
                            middle: !0,
                            end: !0,
                            left: !0,
                            right: !0
                        };
                        return i.prototype.getCueAsHTML = function() {
                            var e = window.WebVTT;
                            return e.convertCueToDOMTree(window, this.text)
                        },
                        i
                    } ()
                },
                {}],
                54 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    function a() {
                        this.window = window,
                        this.state = "INITIAL",
                        this.buffer = "",
                        this.decoder = new f,
                        this.regionList = []
                    }
                    function n(e) {
                        function t(e, t, r, i) {
                            return 3600 * (0 | e) + 60 * (0 | t) + (0 | r) + (0 | i) / 1e3
                        }
                        var r = e.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);
                        return r ? r[3] ? t(r[1], r[2], r[3].replace(":", ""), r[4]) : r[1] > 59 ? t(r[1], r[2], 0, r[4]) : t(0, r[1], r[2], r[4]) : null;
                    }
                    function s() {
                        this.values = Object.create(null)
                    }
                    function o(e, t, r, i) {
                        var a = i ? e.split(i) : [e];
                        for (var n in a) if ("string" == typeof a[n]) {
                            var s = a[n].split(r);
                            if (2 === s.length) {
                                var o = s[0],
                                l = s[1];
                                t(o, l)
                            }
                        }
                    }
                    function l(e, t, r) {
                        function i() {
                            var t = n(e);
                            if (null === t) throw new Error("Malformed timestamp: " + u);
                            return e = e.replace(/^[^\sa-zA-Z-]+/, ""),
                            t
                        }
                        function a(e, t) {
                            var i = new s;
                            o(e,
                            function(e, t) {
                                switch (e) {
                                case "region":
                                    for (var a = r.length - 1; a >= 0; a--) if (r[a].id === t) {
                                        i.set(e, r[a].region);
                                        break
                                    }
                                    break;
                                case "vertical":
                                    i.alt(e, t, ["rl", "lr"]);
                                    break;
                                case "line":
                                    var n = t.split(","),
                                    s = n[0];
                                    i.integer(e, s),
                                    i.percent(e, s) && i.set("snapToLines", !1),
                                    i.alt(e, s, ["auto"]),
                                    2 === n.length && i.alt("lineAlign", n[1], ["start", v, "end"]);
                                    break;
                                case "position":
                                    n = t.split(","),
                                    i.percent(e, n[0]),
                                    2 === n.length && i.alt("positionAlign", n[1], ["start", v, "end", "line-left", "line-right", "auto"]);
                                    break;
                                case "size":
                                    i.percent(e, t);
                                    break;
                                case "align":
                                    i.alt(e, t, ["start", v, "end", "left", "right"])
                                }
                            },
                            /:/, /\s/),
                            t.region = i.get("region", null),
                            t.vertical = i.get("vertical", "");
                            var a = i.get("line", "auto");
                            "auto" === a && h.line === -1 && (a = -1),
                            t.line = a,
                            t.lineAlign = i.get("lineAlign", "start"),
                            t.snapToLines = i.get("snapToLines", !0),
                            t.size = i.get("size", 100),
                            t.align = i.get("align", v);
                            var n = i.get("position", "auto");
                            "auto" === n && 50 === h.position && (n = "start" === t.align || "left" === t.align ? 0 : "end" === t.align || "right" === t.align ? 100 : 50),
                            t.position = n
                        }
                        function l() {
                            e = e.replace(/^\s+/, "")
                        }
                        var u = e;
                        if (l(), t.startTime = i(), l(), "-->" !== e.substr(0, 3)) throw new Error("Malformed time stamp (time stamps must be separated by '-->'): " + u);
                        e = e.substr(3),
                        l(),
                        t.endTime = i(),
                        l(),
                        a(e, t)
                    }
                    function u(e) {
                        return e.replace(/<br(?: \/)?>/gi, "\n")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    }),
                    r.fixLineBreaks = void 0;
                    var d = e(53),
                    c = i(d),
                    f = function() {
                        return {
                            decode: function(e) {
                                if (!e) return "";
                                if ("string" != typeof e) throw new Error("Error - expected string data.");
                                return decodeURIComponent(encodeURIComponent(e))
                            }
                        }
                    };
                    s.prototype = {
                        set: function(e, t) {
                            this.get(e) || "" === t || (this.values[e] = t)
                        },
                        get: function(e, t, r) {
                            return r ? this.has(e) ? this.values[e] : t[r] : this.has(e) ? this.values[e] : t
                        },
                        has: function(e) {
                            return e in this.values
                        },
                        alt: function(e, t, r) {
                            for (var i = 0; i < r.length; ++i) if (t === r[i]) {
                                this.set(e, t);
                                break
                            }
                        },
                        integer: function(e, t) { / ^-?\d + $ / .test(t) && this.set(e, parseInt(t, 10))
                        },
                        percent: function(e, t) {
                            var r;
                            return !! ((r = t.match(/^([\d]{1,3})(\.[\d]*)?%$/)) && (t = parseFloat(t), t >= 0 && t <= 100)) && (this.set(e, t), !0)
                        }
                    };
                    var h = new c["default"](0, 0, 0),
                    v = "middle" === h.align ? "middle": "center";
                    a.prototype = {
                        parse: function(e) {
                            function t() {
                                var e = i.buffer,
                                t = 0;
                                for (e = u(e); t < e.length && "\r" !== e[t] && "\n" !== e[t];)++t;
                                var r = e.substr(0, t);
                                return "\r" === e[t] && ++t,
                                "\n" === e[t] && ++t,
                                i.buffer = e.substr(t),
                                r
                            }
                            function r(e) {
                                o(e,
                                function(e, t) {
                                    switch (e) {
                                    case "Region":
                                        console.log("parse region", t)
                                    }
                                },
                                /:/)
                            }
                            var i = this;
                            e && (i.buffer += i.decoder.decode(e, {
                                stream: !0
                            }));
                            try {
                                var a;
                                if ("INITIAL" === i.state) {
                                    if (!/\r\n|\n/.test(i.buffer)) return this;
                                    a = t();
                                    var n = a.match(/^WEBVTT([ \t].*)?$/);
                                    if (!n || !n[0]) throw new Error("Malformed WebVTT signature.");
                                    i.state = "HEADER"
                                }
                                for (var s = !1; i.buffer;) {
                                    if (!/\r\n|\n/.test(i.buffer)) return this;
                                    switch (s ? s = !1 : a = t(), i.state) {
                                    case "HEADER":
                                        /:/.test(a) ? r(a) : a || (i.state = "ID");
                                        continue;
                                    case "NOTE":
                                        a || (i.state = "ID");
                                        continue;
                                    case "ID":
                                        if (/^NOTE($|[ \t])/.test(a)) {
                                            i.state = "NOTE";
                                            break
                                        }
                                        if (!a) continue;
                                        if (i.cue = new c["default"](0, 0, ""), i.state = "CUE", a.indexOf("-->") === -1) {
                                            i.cue.id = a;
                                            continue
                                        }
                                    case "CUE":
                                        try {
                                            l(a, i.cue, i.regionList)
                                        } catch(d) {
                                            i.cue = null,
                                            i.state = "BADCUE";
                                            continue
                                        }
                                        i.state = "CUETEXT";
                                        continue;
                                    case "CUETEXT":
                                        var f = a.indexOf("-->") !== -1;
                                        if (!a || f && (s = !0)) {
                                            i.oncue && i.oncue(i.cue),
                                            i.cue = null,
                                            i.state = "ID";
                                            continue
                                        }
                                        i.cue.text && (i.cue.text += "\n"),
                                        i.cue.text += a;
                                        continue;
                                    case "BADCUE":
                                        a || (i.state = "ID");
                                        continue
                                    }
                                }
                            } catch(d) {
                                "CUETEXT" === i.state && i.cue && i.oncue && i.oncue(i.cue),
                                i.cue = null,
                                i.state = "INITIAL" === i.state ? "BADWEBVTT": "BADCUE"
                            }
                            return this
                        },
                        flush: function() {
                            var e = this;
                            try {
                                if (e.buffer += e.decoder.decode(), (e.cue || "HEADER" === e.state) && (e.buffer += "\n\n", e.parse()), "INITIAL" === e.state) throw new Error("Malformed WebVTT signature.")
                            } catch(t) {
                                throw t
                            }
                            return e.onflush && e.onflush(),
                            this
                        }
                    },
                    r.fixLineBreaks = u,
                    r["default"] = a
                },
                {
                    53 : 53
                }],
                55 : [function(e, t, r) {
                    "use strict";
                    function i(e) {
                        return e && e.__esModule ? e: {
                            "default": e
                        }
                    }
                    var a = e(54),
                    n = i(a),
                    s = function(e) {
                        for (var t = e.length,
                        r = void 0,
                        i = void 0,
                        a = void 0,
                        n = "",
                        s = 0; s < t;) if (r = e[s++], 0 !== r && 3 !== r) switch (r >> 4) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                            n += String.fromCharCode(r);
                            break;
                        case 12:
                        case 13:
                            i = e[s++],
                            n += String.fromCharCode((31 & r) << 6 | 63 & i);
                            break;
                        case 14:
                            i = e[s++],
                            a = e[s++],
                            n += String.fromCharCode((15 & r) << 12 | (63 & i) << 6 | (63 & a) << 0)
                        }
                        return n
                    },
                    o = function(e, t, r) {
                        return e.substr(r || 0, t.length) === t
                    },
                    l = function(e) {
                        var t = parseInt(e.substr( - 3)),
                        r = parseInt(e.substr( - 6, 2)),
                        i = parseInt(e.substr( - 9, 2)),
                        a = e.length > 9 ? parseInt(e.substr(0, e.indexOf(":"))) : 0;
                        return isNaN(t) || isNaN(r) || isNaN(i) || isNaN(a) ? -1 : (t += 1e3 * r, t += 6e4 * i, t += 36e5 * a)
                    },
                    u = function(e, t, r) {
                        var i = e[t],
                        a = e[i.prevCC];
                        if (!a || !a["new"] && i["new"]) return e.ccOffset = e.presentationOffset = i.start,
                        void(i["new"] = !1);
                        for (; a && a["new"];) e.ccOffset += i.start - a.start,
                        i["new"] = !1,
                        i = a,
                        a = e[i.prevCC];
                        e.presentationOffset = r
                    },
                    d = {
                        parse: function(e, t, r, i, a, d) {
                            var c = /\r\n|\n\r|\n|\r/g,
                            f = s(new Uint8Array(e)).trim().replace(c, "\n").split("\n"),
                            h = "00:00.000",
                            v = 0,
                            g = 0,
                            p = 0,
                            y = [],
                            m = void 0,
                            T = !0,
                            E = new n["default"];
                            E.oncue = function(e) {
                                var t = r[i],
                                a = r.ccOffset;
                                t && t["new"] && (g ? a = r.ccOffset = t.start: u(r, i, p)),
                                p && !g && (a = p + r.ccOffset - r.presentationOffset),
                                e.startTime += a - g,
                                e.endTime += a - g,
                                e.text = decodeURIComponent(encodeURIComponent(e.text)),
                                e.endTime > 0 && y.push(e)
                            },
                            E.onparsingerror = function(e) {
                                m = e
                            },
                            E.onflush = function() {
                                return m && d ? void d(m) : void a(y)
                            },
                            f.forEach(function(e) {
                                if (T) {
                                    if (o(e, "X-TIMESTAMP-MAP=")) {
                                        T = !1,
                                        e.substr(16).split(",").forEach(function(e) {
                                            o(e, "LOCAL:") ? h = e.substr(6) : o(e, "MPEGTS:") && (v = parseInt(e.substr(7)))
                                        });
                                        try {
                                            t = t < 0 ? t + 8589934592 : t,
                                            v -= t,
                                            g = l(h) / 1e3,
                                            p = v / 9e4,
                                            g === -1 && (m = new Error("Malformed X-TIMESTAMP-MAP: " + e))
                                        } catch(r) {
                                            m = new Error("Malformed X-TIMESTAMP-MAP: " + e)
                                        }
                                        return
                                    }
                                    "" === e && (T = !1)
                                }
                                E.parse(e + "\n")
                            }),
                            E.flush()
                        }
                    };
                    t.exports = d
                },
                {
                    54 : 54
                }],
                56 : [function(e, t, r) {
                    "use strict";
                    function i(e, t) {
                        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var a = function() {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, r, i) {
                            return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                        }
                    } (),
                    n = e(51),
                    s = function() {
                        function e(t) {
                            i(this, e),
                            t && t.xhrSetup && (this.xhrSetup = t.xhrSetup)
                        }
                        return a(e, [{
                            key: "destroy",
                            value: function() {
                                this.abort(),
                                this.loader = null
                            }
                        },
                        {
                            key: "abort",
                            value: function() {
                                var e = this.loader;
                                e && 4 !== e.readyState && (this.stats.aborted = !0, e.abort()),
                                window.clearTimeout(this.requestTimeout),
                                this.requestTimeout = null,
                                window.clearTimeout(this.retryTimeout),
                                this.retryTimeout = null
                            }
                        },
                        {
                            key: "load",
                            value: function(e, t, r) {
                                this.context = e,
                                this.config = t,
                                this.callbacks = r,
                                this.stats = {
                                    trequest: performance.now(),
                                    retry: 0
                                },
                                this.retryDelay = t.retryDelay,
                                this.loadInternal()
                            }
                        },
                        {
                            key: "loadInternal",
                            value: function() {
                                var e, t = this.context;
                                e = "undefined" != typeof XDomainRequest ? this.loader = new XDomainRequest: this.loader = new XMLHttpRequest;
                                var r = this.stats;
                                r.tfirst = 0,
                                r.loaded = 0;
                                var i = this.xhrSetup;
                                try {
                                    if (i) try {
                                        i(e, t.url)
                                    } catch(a) {
                                        e.open("GET", t.url, !0),
                                        i(e, t.url)
                                    }
                                    e.readyState || e.open("GET", t.url, !0)
                                } catch(a) {
                                    return void this.callbacks.onError({
                                        code: e.status,
                                        text: a.message
                                    },
                                    t)
                                }
                                t.rangeEnd && e.setRequestHeader("Range", "bytes=" + t.rangeStart + "-" + (t.rangeEnd - 1)),
                                e.onreadystatechange = this.readystatechange.bind(this),
                                e.onprogress = this.loadprogress.bind(this),
                                e.responseType = t.responseType,
                                this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), this.config.timeout),
                                e.send()
                            }
                        },
                        {
                            key: "readystatechange",
                            value: function(e) {
                                var t = e.currentTarget,
                                r = t.readyState,
                                i = this.stats,
                                a = this.context,
                                s = this.config;
                                if (!i.aborted && r >= 2) if (window.clearTimeout(this.requestTimeout), 0 === i.tfirst && (i.tfirst = Math.max(performance.now(), i.trequest)), 4 === r) {
                                    var o = t.status;
                                    if (o >= 200 && o < 300) {
                                        i.tload = Math.max(i.tfirst, performance.now());
                                        var l = void 0,
                                        u = void 0;
                                        "arraybuffer" === a.responseType ? (l = t.response, u = l.byteLength) : (l = t.responseText, u = l.length),
                                        i.loaded = i.total = u;
                                        var d = {
                                            url: t.responseURL,
                                            data: l
                                        };
                                        this.callbacks.onSuccess(d, i, a)
                                    } else i.retry >= s.maxRetry || o >= 400 && o < 499 ? (n.logger.error(o + " while loading " + a.url), this.callbacks.onError({
                                        code: o,
                                        text: t.statusText
                                    },
                                    a)) : (n.logger.warn(o + " while loading " + a.url + ", retrying in " + this.retryDelay + "..."), this.destroy(), this.retryTimeout = window.setTimeout(this.loadInternal.bind(this), this.retryDelay), this.retryDelay = Math.min(2 * this.retryDelay, s.maxRetryDelay), i.retry++)
                                } else this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), s.timeout)
                            }
                        },
                        {
                            key: "loadtimeout",
                            value: function() {
                                n.logger.warn("timeout while loading " + this.context.url),
                                this.callbacks.onTimeout(this.stats, this.context)
                            }
                        },
                        {
                            key: "loadprogress",
                            value: function(e) {
                                var t = this.stats;
                                t.loaded = e.loaded,
                                e.lengthComputable && (t.total = e.total);
                                var r = this.callbacks.onProgress;
                                r && r(t, this.context, null)
                            }
                        }]),
                        e
                    } ();
                    r["default"] = s
                },
                {
                    51 : 51
                }]
            },
            {},
            [37])(37)
        })
    }
});