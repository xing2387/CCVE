(window.webpackJsonp = window.webpackJsonp || []).push([[1], {
    329 : function(e, t) {
        var i = {
            init: function() {
                i.setup()
            },
            setup: function() {
                $(".dialogBtn").bind("click", i.showDialog),
                $(".mod-dialogs-close").bind("click", i.closeDialog),
                $(".mod-dialog-btn a").bind("click", i.feedbackAjax),
                $(".mod-commitSuccess-close").bind("click", i.closeSuccessDialog),
                i.hintHide()
            },
            showDialog: function() {
                $(".mod-covers").show(),
                $(".mod-dialogs").show(),
                $("body").css("overflow-y", "hidden")
            },
            closeDialog: function() {
                $(".mod-covers").hide(),
                $(".mod-dialogs").hide(),
                $("body").css("overflow-y", "auto")
            },
            closeSuccessDialog: function() {
                $(".mod-commitSuccess").hide(),
                $(".mod-covers").hide(),
                $("body").css("overflow-y", "auto")
            },
            hintHide: function() {
                $(".mod-dialog-text textarea").keydown(function() {
                    $(".mod-dialog-text span").hide()
                })
            },
            feedbackAjax: function() {
                if ("" == $.trim($("#test").val())) $(".mod-dialog-text span").show();
                else {
                    if ($("#test").val().length > 233) return;
                    if ($(".mod-dialog-QQ input").val().length > 0 && !/^[0-9]*$/.test($(".mod-dialog-QQ input").val())) return alert("有这样的QQ号吗(눈▂눈)"),
                    !1;
                    var e = {
                        content: encodeURIComponent($("#test").val()),
                        qq: $(".mod-dialog-QQ input").val()
                    };
                    $.ajax({
                        url: "/System/feedback",
                        dataType: "json",
                        data: e,
                        type: "post",
                        success: function(e) {
                            1 == e.Data.StateCode && ($(".mod-dialogs").hide(), $(".mod-commitSuccess").show(), $(".mod-dialog-text textarea").val(""), $(".mod-dialog-QQ input").val(""))
                        }
                    })
                }
            }
        };
        e.exports = i
    },
    330 : function(e, t, i) {
        var a = i(363),
        n = {
            init: function(e, t, i, a, s) {
                return config = {
                    flag: "false"
                },
                n.setup(e, t, i, a, s)
            },
            setup: function(e, t, i, a, s) {
                return n.like(e, t, i, a, s)
            },
            like: function(e, t, i, n, s) {
                if (a.init()) return $.ajax({
                    url: t,
                    dataType: "json",
                    data: i,
                    async: !1,
                    success: function(t) {
                        console.log(t),
                        1 == t.Data.StateCode && (e.hasClass(s) ? (e.removeClass(s), e.find(n).text(parseInt(e.find(n).text()) - 1)) : (e.addClass(s), e.find(n).text(parseInt(e.find(n).text()) + 1)), config.flag = "true")
                    }
                }),
                config.flag
            }
        };
        e.exports = n
    },
    331 : function(e, t) {
        var i = {
            arg: {
                animeid: 0,
                type: 0,
                loginToken: "",
                Url: "/user/subscribe"
            },
            subscribeConfig: {
                subscribeResult: !1
            },
            init: function(e) {
                return i.arg.animeid = e.animeid,
                i.arg.type = e.type,
                i.arg.loginToken = e.loginToken,
                i.subscribe(i.arg),
                i.subscribeConfig.subscribeResult
            },
            subscribe: function(e) {
                var t = {
                    animeid: e.animeid,
                    type: e.type,
                    loginToken: e.loginToken
                };
                $.ajax({
                    url: e.Url,
                    dataType: "json",
                    data: t,
                    async: !1,
                    success: function(e) {
                        1 == e.Data.StateCode && (i.subscribeConfig.subscribeResult = !0)
                    }
                })
            }
        };
        e.exports = i
    },
    332 : function(e, t) {
        var i = {
            init: function() { ({
                    commentId: 0
                }),
                i.setup()
            },
            setup: function() {
                $(".commentshare").unbind().bind("click", i.handleShare)
            },
            handleShare: function() {
                var e = $(this);
                if (e.hasClass("disabled")) return $(".dialog-share").slideUp(),
                void e.removeClass("disabled");
                $(".btn-share").removeClass("disabled"),
                e.addClass("disabled"),
                $(".dialog-share").remove();
                var t = e.attr("data-animeId"),
                a = e.attr("data-commentId");
                config.commentId = a;
                var n = e.attr("nob"),
                s = e.attr("locid"),
                o = (e[0].offsetLeft, e[0].offsetTop, "http://www.acgneta.com/comment/" + t + "/" + a + "/1.html"),
                c = e.attr("qq-desc"),
                d = e.attr("qq-title"),
                l = e.attr("qq-summary"),
                r = e.attr("qq-pics"),
                u = '<div class="dialog-share"><div class="model"><div class="btn"><a target="_blank" class="btn-share-i qq" href="' + ("http://connect.qq.com/widget/shareqq/index.html?url=" + encodeURIComponent(o) + "&desc=" + c + "&title=" + d + "&summary=" + l + "&pics=" + r + "&flash=&site=" + encodeURIComponent("ACGneta") + "&style=201&width=32&height=32&searchPic=true") + '"><span class="icon icon-qq"></span>分享到QQ</a><i class="splice">或</i><a target="_blank" class="btn-share-i copy" onclick="return false;" data-clipboard-action="copy" data-clipboard-target="#sharetxt" href="javascript:void(0)"><span class="icon icon-link"></span>点此复制链接分享</a></div><input class="copy-text" id="sharetxt" type="text" value="' + o + '" /></div></div>';
                1 == s ? $("#Comment-" + n).find(".con-btn").after(u) : $("#Comment-" + n).find(".comment-operate").after(u),
                $(".dialog-share").slideDown(),
                new Clipboard(".btn-share-i.copy").on("success",
                function(e) {
                    $(".btn-share-i.copy").append('<div class="icon copied"></div>'),
                    setTimeout(function() {
                        $(".btn-share-i.copy").find(".copied").remove()
                    },
                    1500)
                }),
                $(".btn-share-i").unbind().bind("click", i.handleAddExp)
            },
            handleAddExp: function() {
                if (!$(this).hasClass("disabled")) {
                    $(this).addClass("disabled");
                    var e = config.commentId;
                    $.ajax({
                        url: "/user/AddExpForShare?commentId=" + e + "&t=" + (new Date).getTime(),
                        dataType: "json",
                        success: function(e) {
                            $(this).removeClass("disabled")
                        }
                    })
                }
            }
        },
        a = $("#pageSign").val();
        "commentlist" == a || "index" == a ? e.exports = i: $(function() {
            i.init()
        })
    },
    333 : function(e, t) {
        var i = {
            config: {
                pageUrl: "",
                dataType: "",
                async: !1
            },
            res: {
                resJSON: "",
                result: !1
            },
            init: function(e) {
                return i.config.pageUrl = e.url,
                i.config.dataType = e.resType,
                i.config.async = e.async,
                "{}" != JSON.stringify(e.data) && i.page(e.data),
                1 == i.res.result ? i.res: i.res.result
            },
            page: function(e) {
                $.ajax({
                    url: i.config.pageUrl,
                    dataType: i.config.dataType,
                    async: i.config.async,
                    data: e,
                    success: function(e) {
                        1 == e.Data.StateCode && (i.res.result = !0, i.res.resJSON = e.Data.List)
                    }
                })
            }
        };
        e.exports = i
    },
    334 : function(e, t, i) {
        var a = i(365),
        n = i(329),
        s = {},
        o = {
            init: function() {
                s = {
                    logoutStr: '<a class="nav-i" href="http://www.acgneta.com/login?forward=' + location.href + '"><span>登录</span></a><i class="line"></i><a class="nav-i" href="http://www.acgneta.com/register"><span>注册</span></a>',
                    friendfrom: "",
                    friendtips: ""
                },
                UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl,
                UE.Editor.prototype.getActionUrl = function(e) {
                    return "uploadimageUE" == e || "uploadimage" == e || "uploadscrawl" == e ? "/api/imgUpload": this._bkGetActionUrl.call(this, e)
                },
                o.headerLogin(),
                o.lazyload(),
                a.init(),
                n.init(),
                o.inputVal()
            },
            inputVal: function() {
                var e = window.location.search;
                if ( - 1 == e.indexOf("keyword")) return ! 1;
                var t = e.indexOf("&");
                if (t > 0) var i = decodeURIComponent(e.substring(9, t));
                else i = decodeURIComponent(e.substring(9));
                "login" != $("#pageSign").val() && $("#keyword").val(i)
            },
            headerLogin: function() {
                var e = $.cookie("usertoken"),
                t = null == $.cookie("icon") ? "": $.cookie("icon");
                if (e && "" != e) {
                    var i = "",
                    a = {
                        t: (new Date).getTime()
                    };
                    $.ajax({
                        url: "/user/getUserInfo",
                        dataType: "json",
                        data: a,
                        success: function(e) {
                            if ("" != t) var a = t.indexOf("?") + 1,
                            n = t.substr(a);
                            var s = e.Data,
                            c = s.MsgList,
                            d = 0 != c.UnreadCount ? '<span class="umsg-num">' + (c.UnreadCount > 999 ? "999+": c.UnreadCount) + "</span>": "",
                            l = Math.round(s.Score / s.NextLevelScore * 100) + "%";
                            i += '<div class="user-hd"><div class="user-hover"><div class="uimg"><a href="http://www.acgneta.com/user/' + s.Uid + '"><img src="/user/avatar?size=34&c=' + n + '"  onerror=\'this.onerror=null;this.src="/asset/images/def_avater.png"\'></a></div><div class="ubox"><div class="ubox-hd"><span class="uname">Hi，' + s.Nickname + '</span><a class="btn-i-s settings" targe="_blank" href="http://www.acgneta.com/settings"><span class="icon icon-settings"></span>' + (s.IsSetting ? "": '<span class="icon icon-tips"></span><span class="dot"></span>') + '</a><a class="btn-i-s home" targe="_blank" href="http://www.acgneta.com/user/' + s.Uid + '"><span class="icon icon-home"></span></a></div><ul class="clearfix"><li></li> <li></li><li> <a class="btn-i" href="http://www.acgneta.com/user/' + s.Uid + '/comments"><span class="icon icon-nav__comment"></span>我的评论</a></li><li></li></ul><div class="operate TbLevel"><span class="mod-level"><i>LV.' + s.TbLevel + '</i></span></div><div class="mod-level-exp"><div class="rate" style="width: ' + l + '"></div><span class="exp-text">Exp:' + s.Score + "/" + s.NextLevelScore + '</span></div><div class="operate"><a id="logout" class="btn-logout" targe＝"_self" href="javascript:void(0)"><span>退出</span></a></div></div></div><a target="_blank" href="/user/messages" class="umsg">消息' + d + "</a></div>",
                            $("#userinfo").html(i),
                            $("#logout").bind("click", o.logout),
                            $(".daily-sign").bind("click", o.handleSign),
                            $("#invite").bind("click", o.handleInvite)
                        }
                    })
                } else $("#userinfo").html(s.logoutStr)
            },
            logout: function() {
                $.removeCookie("icon", {
                    path: "/",
                    domain: ".acgneta.com"
                }),
                $.removeCookie("usertoken", {
                    path: "/",
                    domain: ".acgneta.com"
                }),
                $.removeCookie("userstate", {
                    path: "/",
                    domain: ".acgneta.com"
                }),
                window.location = "http://www.acgneta.com/security/logout"
            },
            lazyload: function() {
                new LazyLoad
            },
            handleSign: function() {
                var e = $(this);
                e.hasClass("signed") || e.hasClass("disabled") || (e.addClass("disabled"), $.ajax({
                    url: "/user/sign?t=" + (new Date).getTime(),
                    dataType: "json",
                    success: function(t) {
                        if (1 == t.Data.StateCode) {
                            $(".daily-sign").addClass("signed"),
                            $(".daily-sign").find("i").text("已签到"),
                            e.removeClass("disabled"),
                            e.append('<span class="expUp">EXP +5</span>'),
                            setTimeout(function() {
                                $(".daily-sign").find(".expUp").remove()
                            },
                            2e3);
                            var i = $(".mod-level").find("i").text().replace(/LV./, "");
                            if (t.Data.TbLevel > i) {
                                $(".mod-level").find("i").text("LV.4")
                            }
                            var a = "Exp:" + t.Data.Exp + "/" + t.Data.NextLevelExp,
                            n = Math.round(t.Data.Exp / t.Data.NextLevelExp * 100) + "%";
                            $(".mod-level-exp .exp-text").text(a),
                            $(".mod-level-exp .rate").css({
                                width: n
                            })
                        }
                    }
                }))
            },
            handleInvite: function() {
                $(this).hasClass("disabled") || $.ajax({
                    url: "/user/inviteFriend?t=" + (new Date).getTime(),
                    dataType: "json",
                    success: function(e) {
                        if (1 == e.Data.StateCode) {
                            var t = o.handleHtml(e.Data);
                            $(".main").append(t),
                            $(".invite-dialog .btn-close").unbind().bind("click",
                            function() {
                                $(".main").find(".invite-dialog").remove()
                            }),
                            new Clipboard(".btn-copy").on("success",
                            function(e) {
                                $(".btn-copy").append('<div class="icon copied"></div>'),
                                setTimeout(function() {
                                    $(".btn-copy").find(".copied").remove()
                                },
                                1500)
                            })
                        } else 1010 == e.Data.StateCode && $(".btn-invite").addClass("disabled").text(e.Data.Message)
                    }
                })
            },
            handleHtml: function(e) {
                return '<div class="invite-dialog"><div class="mod-mask"></div><div class="mod-dialog"><div class="model"><a class="close btn-close" href="javascript:void(0)"><span class="icon icon-close"></span></a><div class="info"><p class="header">将邀请链接发送给好友<span class="tips">' + e.Tips + '</span></p><div class="copy-content"><a class="btn-copy" data-clipboard-action="copy" data-clipboard-target="#foo" href="javascript:void(0)"><span class="icon icon-link"></span>点此复制链接</a><input id="foo" class="link-box" type="text" value="http://www.acgneta.com/register?friendfrom=' + e.Url + '"/></div><p>①好友登录才可算作成功邀请。</p><p>②邀请链接每次只能邀请一名好友，好友首次登录后邀请链接将失效。</p></div></div></div></div>'
            }
        };
        $(function() {
            o.init()
        })
    },
    335 : function(e, t, i) {
        var a, n = i(363),
        s = {
            init: function() {
                a = {
                    likes_clickcheck: !0,
                    disLikes_clickcheck: !0
                },
                s.setup()
            },
            setup: function() {
                $(".commentLike").bind("click", s.likes),
                $(".commentDislike").bind("click", s.disLikes)
            },
            likes: function() {
                if (n.init()) {
                    var e = $(this),
                    t = ($(e).next(".commentDislike"), e.parents(".operate-r").attr("data-animeid")),
                    i = e.parents(".operate-r").attr("data-commentid");
                    a.likes_clickcheck && $.ajax({
                        url: "/commentApi/vote?animeId=" + t + "&commentId=" + i + "&type=1&t=" + (new Date).getTime(),
                        dataType: "json",
                        success: function(t) {
                            $(e).next(".commentDislike").hasClass("vote-down") && ($(e).next(".commentDislike").removeClass("vote-down"), $(e).next(".commentDislike").find(".dislike-count").text($(e).next(".commentDislike").find(".dislike-count").text() - 1)),
                            e.removeClass("btn-up").toggleClass("vote-up");
                            var i = parseInt(e.find(".like-count").text());
                            e.hasClass("vote-up") ? (e.find(".like-count").text(i + 1), e.siblings(".commentDislike").removeClass("btn-down")) : (e.find(".like-count").text(i - 1), e.addClass("btn-up").siblings(".commentDislike").addClass("btn-down")),
                            a.likes_clickcheck = !0
                        }
                    })
                }
            },
            disLikes: function() {
                if (n.init()) {
                    var e = $(this),
                    t = ($(e).prev(".commentLike"), e.parents(".operate-r").attr("data-animeid")),
                    i = e.parents(".operate-r").attr("data-commentid");
                    a.disLikes_clickcheck && $.ajax({
                        url: "/commentApi/vote?animeId=" + t + "&commentId=" + i + "&type=2&t=" + (new Date).getTime(),
                        dataType: "json",
                        success: function(t) {
                            $(e).prev(".commentLike").hasClass("vote-up") && ($(e).prev(".commentLike").removeClass("vote-up"), $(e).prev(".commentLike").find(".like-count").text($(e).prev(".commentLike").find(".like-count").text() - 1)),
                            e.removeClass("btn-down").toggleClass("vote-down");
                            var i = parseInt(e.find(".dislike-count").text());
                            e.hasClass("vote-down") ? (e.find(".dislike-count").text(i + 1), e.siblings(".commentLike").removeClass("btn-up")) : (e.find(".dislike-count").text(i - 1), e.addClass("btn-down").siblings(".commentLike").addClass("btn-up")),
                            a.disLikes_clickcheck = !0
                        }
                    })
                }
            }
        };
        "commentlist" == $("#pageSign").val() ? e.exports = s: $(function() {
            s.init()
        })
    },
    336 : function(e, t, i) {
        "use strict";
        i.r(t);
        var a, n = i(366),
        s = i.n(n),
        o = i(364),
        c = i.n(o),
        d = i(330),
        l = i(363),
        r = {
            init: function() {
                a = {
                    indexSideRankTop: $(".index-side_rank").offset().top,
                    toTopBtn: $(".toTop")
                },
                r.setup(),
                s.a.init(3, 348, 0, 6, 0)
            },
            setup: function() {
                $(".hd-tab a").bind("click", r.jdfj),
                r.slider(),
                r.xfzx(),
                $(".top_menu .scroll-i").each(function(e) {
                    $(this).bind("click", r.scrollTodo)
                }),
                r.xfzx_prveAndnext(),
                r.getDayTime(),
                $(".dropdown-list li").click(function() {
                    $(this).addClass("toToday").siblings().removeClass("toToday")
                }),
                $(document).scroll(r.indexSideRankScroll),
                $(".index_addMoreComment").bind("click", r.addMoreComment),
                $(".index_newsAndGood li").bind("click", r.commentTab),
                r.hideNoneText(),
                r.showCover(),
                r.showMore(),
                a.toTopBtn.bind("click", r.gototop),
                $(".UidLikes").bind("click", r.userLikes),
                $(".userCatchLogin a").bind("click", r.userCatchCheckLogin)
            },
            userLikes: function() {
                var e = $(this),
                t = {
                    animeId: parseInt($(this).parents(".index-netaComment-item").attr("data-animeid")),
                    commentId: parseInt($(this).parents(".index-netaComment-item").attr("data-commentId")),
                    type: 1,
                    t: (new Date).getTime()
                };
                d.init(e, "/commentApi/vote", t, ".likeNum", "userClick")
            },
            getDayTime: function() {
                var e = new Date,
                t = $(".dropdown-list li");
                $.each(t,
                function(t, i) {
                    $(i).attr("AttrId") == e.getDay() ? $(this).addClass("toToday") : 0 == e.getDay() && 7 == $(i).attr("AttrId") && $(this).addClass("toToday")
                })
            },
            commentTab: function() {
                var e = $(this).attr("class");
                if (!$(this).hasClass("li-click")) {
                    var t = "li-good-comment" == e ? 1 : 2;
                    $.ajax({
                        url: "/site/newCommentListPage",
                        data: {
                            flag: t
                        },
                        type: "POST",
                        dataType: "text",
                        success: function(e) {
                            $(".new-con").empty().append(e);
                            new LazyLoad
                        }
                    }),
                    $(this).addClass("li-click").siblings().removeClass("li-click"),
                    $(".index_addMoreComment").show(),
                    $(".index_addMoreComment").attr("attrId", "2")
                }
            },
            scrollTodo: function() {
                var e = $(this).attr("data-id");
                c.a.init(e)
            },
            slider: function() {
                $("#slider-index").smallslider({
                    textAlign: "center",
                    showButtons: !0
                }),
                $(".list-side-rank").delegate("li", "mouseover",
                function() {
                    $(this).addClass("is-active").siblings().removeClass("is-active")
                })
            },
            xfzx: function() {
                $(".dropdown-list").delegate("li", "click",
                function() {
                    var e = $(".xf_timeline ul"),
                    t = $(this).text(),
                    i = $(this).attr("AttrId");
                    $(".selected").text(t),
                    $.ajax({
                        url: "/api/GetWeekanimelist?week=" + i + "&t=" + (new Date).getTime(),
                        dataType: "json",
                        success: function(t) {
                            if (0 == t.Code) {
                                for (var i = "",
                                n = t.Data.List,
                                s = 0,
                                o = n.length; s < o; s++) {
                                    var c = n[s],
                                    d = 1 == c.IsUpdated ? "IsUpdated": "";
                                    "" != c.WordCount ? i += '<li class="item"><a class="xf_link" target="_blank" title="' + c.Name + '" href="/animes/' + c.Id + '.html"><p class="title">' + c.Name + "</p>" + ("11" == c.AreaType ? '<i class="chinesAnimeIcon"></i>': "") + '</a><a class="xf_link" target="_blank" href="' + c.PlayUrl + '"><p class="text ' + d + '">第<span class="xf_update">' + c.WordCount + "</span>话</p></a></li>": i += '<li class="item"><a class="xf_link" target="_blank" title="' + c.Name + '" href="/animes/' + c.Id + '.html"><p class="title">' + c.Name + "</p>" + ("11" == c.AreaType ? '<i class="chinesAnimeIcon"></i>': "") + '</a><p class="text">待更新</p></li>'
                                }
                                e.find("li").remove(),
                                e.append(i),
                                a.indexSideRankTop = $(".index-side_rank").offset().top
                            }
                        }
                    })
                })
            },
            xfzx_prveAndnext: function() {
                var e = $(".xf_timeline ul"),
                t = $(".load-left"),
                i = $(".load-right"),
                a = e.attr("data-count"),
                n = Math.ceil(a / 4),
                s = 1,
                o = 0;
                t.unbind().bind("click",
                function() {
                    var t = $(this);
                    t.hasClass("disabled") || a < 4 || (1 == --s && t.addClass("disabled"), o += 568, e.css({
                        "margin-left": o + "px"
                    }), s != n && i.removeClass("disabled"))
                }),
                i.unbind().bind("click",
                function() {
                    var i = $(this);
                    i.hasClass("disabled") || a < 4 || (++s == n && i.addClass("disabled"), o -= 568, e.css({
                        "margin-left": o + "px"
                    }), 1 != s && t.removeClass("disabled"))
                })
            },
            jdfj: function() {
                if (!$(this).hasClass("is-active")) {
                    var e = $(this).attr("AttrId");
                    $(this).addClass("is-active").siblings().removeClass("is-active");
                    var t = "http://www.acgneta.com/tag/0-" + $(this).attr("AttrPinyin") + "-0-0-0-0-1.html";
                    $("#jdfj").attr("href", t),
                    $.ajax({
                        url: "/api/GetListByCate?cate=" + e + "&t=" + (new Date).getTime(),
                        dataType: "json",
                        success: function(e) {
                            if (console.log(e), 0 == e.Code) {
                                for (var t = "",
                                i = e.Data.List,
                                a = 0; a < 10; a++) {
                                    for (var n = i[a], s = n.Category, o = 0, c = s.length; o < c; o++) {
                                        var d = s[o];
                                        o < 2 && '<a class="tag-i" target="_blank" href="/tag/0-' + d.PinYin + '-0-0-0-0-1.html"  rel="nofollow" title="' + d.Name + '">' + d.Name + "</a>"
                                    }
                                    t += '<li class="item list-module"><a class="item-pic" target="_blank" href="/animes/' + n.Id + '.html" title="' + n.Name + '"><div class="img"><img src="' + n.CoverImg + '" onerror="this.src=\'/asset/images/img_default.jpg\'"></div><p class="item-name">' + n.Name + '</p></a><div class="clearfix"><div class="item-score-star clearfix">' + n.artCon + '</div><span class="item-num">' + n.DisplayScore.toFixed(1) + "</span></div></li>"
                                }
                                $(".list-classics ul").find("li").remove(),
                                $(".list-classics ul").append(t)
                            }
                        }
                    })
                }
            },
            netaWinnow: function() {
                $.ajax({
                    url: "/api/getnetawinnow/adlist",
                    dataType: "json",
                    success: function(e) {
                        if (0 != e.Data.List.length) {
                            for (var t = 0; t < e.Data.List.length; t++) $(".index-winnowCon").append("<li><a href='" + e.Data.List[t].Url + "' target='_blank'><img src='" + e.Data.List[t].Img + "'><span>" + e.Data.List[t].Title + "</span></a></li>");
                            $(".index-winnowCon").css("height", "auto")
                        }
                    }
                })
            },
            hideNoneText: function() {
                $("#to-zxpl").next().find(".text").each(function(e) {
                    "" === $.trim($(this).text()) && $(this).parents(".con-i").hide()
                })
            },
            indexSideRankScroll: function() {
                $(document).scrollTop() > a.indexSideRankTop ? $(".index-side_rank").css("position", "fixed") : $(".index-side_rank").css("position", "static")
            },
            addMoreComment: function() {
                $(".index-netaComment li").each(function(e, t) {
                    $(t).attr("attrId") == $(".index_addMoreComment").attr("attrId") && $(t).show()
                }),
                $(".index_addMoreComment").attr("attrId", parseInt($(".index_addMoreComment").attr("attrId")) + 1),
                r.hideMoreBtn(6)
            },
            hideMoreBtn: function(e) {
                $(".index_addMoreComment").attr("attrId") == e && $(".index_addMoreComment").hide()
            },
            showCover: function() {
                $(".index_news").hover(function() {
                    $(this).find("a").addClass("showCover")
                },
                function() {
                    $(this).find("a").removeClass("showCover")
                })
            },
            showMore: function() {
                $(".zxzx").hover(function() {
                    $(".index_newsMore").show()
                },
                function() {
                    $(".index_newsMore").hide()
                })
            },
            gototop: function() {
                c.a.init("top")
            },
            userCatchCheckLogin: function() {
                l.init()
            }
        };
        $(function() {
            "index" == $("#pageSign").val() && r.init()
        })
    },
    337 : function(module, exports, __webpack_require__) {
        var checklogin = __webpack_require__(363),
        SubscribeModels = __webpack_require__(331),
        config,
        ue,
        detailFunc = {
            isLoading: !1,
            init: function() {
                config = {
                    animeId: $(".btn-comment-submit").attr("animeId"),
                    newTagLimit: 0,
                    type: 1,
                    commentType: 1,
                    commentId: 0,
                    checkSee: !1,
                    flag: 1,
                    guidanceBoxTop: $(".detail-guidanceBox").offset().top
                },
                ue = UE.getEditor("comment-container", {
                    toolbars: [["bold", "indent", "undo", "redo", "simpleupload"]],
                    enableContextMenu: !1,
                    autoHeightEnabled: !0,
                    autoFloatEnabled: !0,
                    catchRemoteImageEnable: !1,
                    retainOnlyLabelPasted: !0,
                    removeformat: !0,
                    wordCount: !1,
                    elementPathEnabled: !1
                }),
                detailFunc.setup()
            },
            setup: function() {
                $("body").css("overflow-x", "hidden"),
                ue.ready(function() {}),
                $(".Watched").bind("click", detailFunc.watched),
                $(".Watched-add").bind("click", detailFunc.editComment),
                $(".tag-box .add-new-tag").bind("click", detailFunc.customTag),
                $(".close").bind("click", detailFunc.closeContrl),
                $(".btn-comment-submit").bind("click", detailFunc.addcomment),
                detailFunc.showDetail(),
                detailFunc.animesPaly(),
                detailFunc.hideNoneText(),
                $(".detail-guidanceBoxBtn").bind("click", detailFunc.guidanceBoxBtn),
                $(window).scroll(detailFunc.guidanceBoxScroll),
                detailFunc.hideJpName(),
                $(".subscribe li").bind("click", detailFunc.catchAnimes)
            },
            watched: function() {
                checklogin.init() && detailFunc.dialogContrl()
            },
            editComment: function() {
                checklogin.init() && (config.commentType = 2, $(".mod-dialog .tip-dialog").hide(), $.ajax({
                    url: "/commentApi/getcommentInfo?animeId=" + config.animeId + "&t=" + (new Date).getTime(),
                    dataType: "json",
                    success: function(e) {
                        if (e.Data) {
                            var t = e.Data,
                            i = t.UserCate,
                            a = t.Content;
                            if (i) for (var n = 0; n < i.length; n++) {
                                var s = i[n];
                                '<li><a class="tag-i tag-choose choosed disabled" href="javascript:void(0)" tagid="' + s.Id + '">' + decodeURIComponent(s.Name) + "</a></li>"
                            }
                            ue.execCommand("cleardoc"),
                            ue.execCommand("inserthtml", a);
                            var o = new Array;
                            o[0] = ["juqing", t.PlotScore],
                            o[1] = ["huafeng", t.StyleScore],
                            o[2] = ["shengyou", t.CvScore],
                            o[3] = ["yinyue", t.MusicScore];
                            for (n = 0; n < o.length; n++) {
                                var c = ".star_" + o[n][1],
                                d = $("#" + o[n][0]),
                                l = d.find(c),
                                r = d.parent().find(".star-text");
                                d.attr("score", o[n][1]);
                                var u = l.text();
                                l.addClass("checked"),
                                r.text(u),
                                r.attr("src-text", u)
                            }
                            config.commentId = t.Id,
                            t.IsSpoiled && (document.getElementById("spoiler").checked = !0),
                            detailFunc.dialogContrl()
                        }
                    }
                }))
            },
            closeContrl: function() {
                $(".mod-mask").hide(),
                $(".mod-dialog").hide(),
                2 == config.commentType && ue.execCommand("cleardoc")
            },
            dialogContrl: function() {
                detailFunc.starContrl(),
                $(".mod-mask").show(),
                $(".mod-dialog").show()
            },
            starContrl: function() {
                $(".star_s_bg a").each(function(e) {
                    $(this).bind("mouseover",
                    function() {
                        var e = $(this).attr("title");
                        $(this).parent().parent().find(".star-text").text(e)
                    }),
                    $(this).bind("mouseout",
                    function() {
                        var e = $(this).parent().parent().find(".star-text"),
                        t = e.attr("src-text");
                        t || (t = ""),
                        e.text(t)
                    }),
                    $(this).click(function() {
                        $(this).addClass("checked").siblings().removeClass("checked");
                        var e = $(this).attr("score"),
                        t = $(this).attr("title");
                        $(this).parent().parent().find(".star-text").attr("src-text", t),
                        $(this).parent().attr("score", e)
                    })
                })
            },
            tagContrl: function() {
                var e = 0;
                $(".mod-dialog .tag-choose").unbind().bind("click",
                function() {
                    if (!$(this).hasClass("disabled")) {
                        var t = $(this);
                        if (t.hasClass("choosed")) t.removeClass("choosed"),
                        e--;
                        else {
                            if (e > 5) return;
                            t.addClass("choosed"),
                            e++
                        }
                    }
                })
            },
            customTag: function() {
                config.newTagLimit > 1 ? detailFunc.tipContrl("至多添加两个自定义标签哦") : ($(".add-tag-box").show(), $(".add-tag-box .btn").unbind("click").bind("click",
                function() {
                    var e = $(this);
                    if (!e.hasClass("disabled")) {
                        e.addClass("disabled");
                        var t = !0,
                        i = $("#newtag").val();
                        if ("" === $.trim(i)) return detailFunc.tipContrl("标签不能为空"),
                        void e.removeClass("disabled");
                        if (!/^[A-Za-z0-9\u4e00-\u9fa5]+$/gi.test(i)) return detailFunc.tipContrl("请输入汉字、字母或数字"),
                        void e.removeClass("disabled");
                        if ($.trim(i).length > 10) return detailFunc.tipContrl("标签长度不能超过十个字哦"),
                        void e.removeClass("disabled");
                        if (detailFunc.tipContrl(""), 1 == config.newTagLimit) {
                            var a = $(".tag-custom .tag-i").text();
                            if (i == a) return detailFunc.tipContrl("标签不能重复喔"),
                            void e.removeClass("disabled")
                        }
                        if ($(".tag-box .tag-choose").each(function(e) {
                            var a = $(this).text();
                            i == a && ($(this).hasClass("choosed") || $(this).addClass("choosed"), t = !1)
                        }), t) {
                            var n = '<li class="tag-custom"><span class="tag-i">' + i + '</span><a class="delete" href="javascript:void(0)"><span class="icon icon-delete"></span></a></li>';
                            $(".tag-addNew").before(n),
                            config.newTagLimit++
                        }
                        $("#newtag").val(""),
                        $(".add-tag-box").hide(),
                        e.removeClass("disabled"),
                        $(".tag-custom .delete").unbind().bind("click",
                        function() {
                            $(this).parent().remove(),
                            config.newTagLimit--
                        })
                    }
                }))
            },
            ajaxFollowUrl: function() {
                $.ajax({
                    url: "/commentApi/addFollows?animeId=" + config.animeId + "&type=" + config.type + "&t=" + (new Date).getTime(),
                    dataType: "json",
                    asyc: !1,
                    success: function(e) {
                        1 == e.Data.StateCode && (2 == config.type ? ($(".WantToSee-tip").fadeIn(), setTimeout(function() {
                            $(".WantToSee-tip").fadeOut()
                        },
                        3e3)) : (config.checkSee = !0, $(".WantToSee ").remove(), detailFunc.dialogContrl()))
                    }
                })
            },
            addcomment: function() {
                checklogin.init();
                var animeId = config.animeId,
                e1 = $("#juqing").attr("score"),
                e2 = $("#huafeng").attr("score"),
                e3 = $("#shengyou").attr("score"),
                e4 = $("#yinyue").attr("score"),
                e5 = $("input[name='spoiler']").is(":checked") ? 1 : 0,
                cateIds = "",
                userCate = "";
                if (0 == e1 & 0 == e2 & 0 == e3 & 0 == e4) detailFunc.tipContrl("还没有评分哦");
                else if (0 != e1 && 0 != e2 && 0 != e3 && 0 != e4) {
                    var comment_text = ue.getContent(),
                    form_data = {
                        animeId: animeId,
                        content: encodeURIComponent(comment_text),
                        isSpoil: e5,
                        plot: e1,
                        style: e2,
                        cv: e3,
                        music: e4,
                        cateIds: "",
                        userCate: "",
                        t: (new Date).getTime()
                    };
                    1 == config.commentType ? $.post("/commentApi/add", form_data,
                    function(data) {
                        data = eval("(" + data + ")"),
                        data.Data.StateCode
                    }) : (form_data.commentId = config.commentId, $.post("/commentApi/update", form_data,
                    function(data) {
                        if (data = eval("(" + data + ")"), 1 == data.Data.StateCode) {
                            var href_s = "?sort=1&f=1";
                            "?sort=1&f=1" == window.location.search && (href_s = "?sort=1"),
                            window.location.href = "/animes/" + animeId + ".html" + href_s + "#New"
                        }
                    }))
                } else detailFunc.tipContrl("请对作品进行四方面的完整评分哦")
            },
            tipContrl: function(e) {
                $(".error-tip").text(e)
            },
            showDetail: function() {
                $(".comment-i .text").each(function(e) {
                    var t = $(this).html().match(/<img.*?(?:>|\/>)/gi),
                    i = $(this).height();
                    $(this).hasClass("hidden") || (t ? ($(this).addClass("limitHeight"), $(this).parent().find(".limit_show").show()) : i > 146 && ($(this).addClass("limitHeight"), $(this).parent().find(".limit_show").show()))
                }),
                $(".jutou").each(function(e) {
                    $(this).bind("click",
                    function() {
                        $(this).parent().find(".text").removeClass("hidden"),
                        $(this).hide(),
                        $(this).parent().find(".jutou_close").show()
                    })
                }),
                $(".jutou_close").each(function(e) {
                    $(this).bind("click",
                    function() {
                        $(this).parent().find(".text").addClass("hidden"),
                        $(this).hide(),
                        $(this).parent().find(".jutou").show()
                    })
                }),
                $(".limit_show").each(function(e) {
                    $(this).bind("click",
                    function() {
                        $(this).parent().find(".text").removeClass("limitHeight"),
                        $(this).hide(),
                        $(this).parent().find(".limit_close").show()
                    })
                }),
                $(".limit_close").each(function(e) {
                    $(this).bind("click",
                    function() {
                        $(this).parent().find(".text").addClass("limitHeight"),
                        $(this).hide(),
                        $(this).parent().find(".limit_show").show()
                    })
                })
            },
            gototop: function() {},
            showLinks: function() {
                $.ajax({
                    url: "/api/getplayurl?animeId=" + config.animeId + "&t=" + (new Date).getTime(),
                    dataType: "json",
                    success: function(e) {
                        if ("" != e.Data) {
                            for (var t = !1,
                            i = "",
                            a = 0; a < e.Data.length; a++) {
                                var n = detailFunc.checkLinkName(e.Data[a].Pinyin);
                                "" != n ? ($("#" + n).removeClass("disabled"), $("#" + n).attr("href", e.Data[a].Url)) : ($("#otherLink").removeClass("disabled"), t = !0, i += '<a class="other-i" target="_blank" href="' + e.Data[a].Url + '">' + e.Data[a].Platform + "</a>")
                            }
                            if (t) {
                                var s = '<div class="other-list">' + i + "</div>";
                                $("#otherLink").append(s)
                            }
                        }
                    }
                })
            },
            checkLinkName: function(e) {
                for (var t = ["bzhan", "aiqiyi", "tengxun", "youku"], i = "", a = 0; a < t.length; a++) t[a] == e && (i = t[a]);
                return i
            },
            renderData: function(e, t) {
                var i = $(".bd_select li").index($(".bd_action")),
                a = $(".content-detailOrder span").index($(".detailOrder_action")),
                n = "";
                e.forEach(function(e, s) {
                    i + 1 == t.Data.TotalPage && 0 == s && 1 == a ? n += '<li><em class="newsIcon"></em><a href="' + e.Url + '" target="_blank">' + e.Episode + "</a></li>": n += '<li><a href="' + e.Url + '" target="_blank">' + e.Episode + "</a></li>"
                }),
                $(".bd_slShow").html(n)
            },
            loadData: function() {
                var e = $(".bd_select li").index($(".bd_action")),
                t = $(".content-detailOrder span").index($(".detailOrder_action"));
                detailFunc.isLoading = !0,
                $.ajax({
                    url: "/api/playUrlEpisode",
                    data: {
                        id: $(".btn-comment-submit").attr("animeId"),
                        pageindex: e + 1
                    },
                    dataType: "json",
                    success: function(e) {
                        if (detailFunc.isLoading = !1, 0 == e.Code) {
                            var i = 0 == t ? e.Data.List: e.Data.List.reverse();
                            detailFunc.renderData(i, e)
                        }
                    }
                })
            },
            animesPaly: function() {
                var e = this;
                $.ajax({
                    url: "/api/playUrlEpisode?id=" + $(".btn-comment-submit").attr("animeId") + "&pageindex=1",
                    dataType: "json",
                    success: function(t) {
                        if (0 == t.Code) {
                            var i = t.Data;
                            if (0 == i.List.length) return $(".bd img").removeClass("noEmpty"),
                            $(".content-detailOrder").css("display", "none"),
                            !0;
                            $(".content-detailOrder").css("display", "block");
                            for (var a = i.TotalPage,
                            n = i.TotalCount,
                            s = "",
                            o = 1; o <= n; o += 50) s += o == n ? "<li>" + o + "集</li>": o >= 951 ? "<li>" + o + "~" + (o + 49 > n ? n: o + 49) + "</li>": "<li>" + o + "~" + (o + 49 > n ? n: o + 49) + "集</li>";
                            $(".bd_select").html(s);
                            var c = "已完结" == $(".title .status").attr("title");
                            c ? ($(".content-detailOrder span").eq(0).addClass("detailOrder_action"), $(".bd_select li").eq(0).addClass("bd_action"), detailFunc.renderData(i.List, t)) : ($(".content-detailOrder span").eq(1).addClass("detailOrder_action"), $(".bd_select li").eq(a - 1).addClass("bd_action"), detailFunc.loadData()),
                            $(".bd_select li").bind("click",
                            function() {
                                return ! $(this).hasClass("bd_action") && (!detailFunc.isLoading && ($(this).addClass("bd_action").siblings(".bd_action").removeClass("bd_action"), c ? ($(".content-detailOrder span").eq(0).addClass("detailOrder_action"), $(".content-detailOrder span").eq(1).removeClass("detailOrder_action")) : ($(".content-detailOrder span").eq(0).removeClass("detailOrder_action"), $(".content-detailOrder span").eq(1).addClass("detailOrder_action")), void e.loadData()))
                            }),
                            $(".content-detailOrder span").bind("click",
                            function() {
                                if ($(this).hasClass("detailOrder_action")) return ! 0;
                                $(this).addClass("detailOrder_action").siblings(".detailOrder_action").removeClass("detailOrder_action"),
                                s = "",
                                $($(".bd_slShow li").toArray().reverse()).each(function(e, t) {
                                    s += t.outerHTML
                                }),
                                $(".bd_slShow").html(s)
                            })
                        }
                    }
                })
            },
            rankPaly: function() {
                for (var e = $(".detail-Url > a"), t = e.length - 1; t > -1; t--) $(".detail-Url").append(e[t])
            },
            sequenceOrder: function() {
                0 == config.flag && (detailFunc.rankPaly(), config.flag = 1)
            },
            invertedOrder: function() {
                1 == config.flag && (detailFunc.rankPaly(), config.flag = 0)
            },
            hideNoneText: function() {
                $("#list-comments").find(".text").each(function(e) {
                    "" === $.trim($(this).text()) && $(this).parents(".comment-i.first.clearfix").hide()
                })
            },
            guidanceBoxBtn: function() {
                if (checklogin.init(), 1 == $(this).attr("id")) {
                    var e = $(this).find("a").text();
                    "趁热来一发评论..." == e ? detailFunc.dialogContrl() : "修改我的评论" == e && detailFunc.editComment()
                }
            },
            guidanceBoxScroll: function() {
                "修改我的评论" != $(".detail-guidanceBoxBtn a").text() && ($(window).scrollTop() > config.guidanceBoxTop ? $(".detail-guidanceBox").css("position", "fixed") : $(".detail-guidanceBox").css("position", "static"))
            },
            hideJpName: function() {
                var e = $(".content-detail .pre-title").height(),
                t = $(".content-detail .pre-title").css("line-height").slice(0, $(".content-detail .pre-title").css("line-height").indexOf("px"));
                if (e > 2 * t) for (var i = 200; e > 2 * t; i--) e = $(".content-detail .pre-title").height(),
                $(".content-detail .pre-title").text($(".content-detail .pre-title").text().slice(0, i) + "...");
                $(".content-detail .info").removeClass("visi_hidden")
            },
            userArg: {
                animeid: 0,
                type: 0,
                loginToken: ""
            },
            catchAnimes: function() {
                if (checklogin.init()) {
                    detailFunc.userArg.type = $(this).hasClass("Subscribe_0") ? 1 : 2,
                    detailFunc.userArg.animeid = config.animeId;
                    var e = SubscribeModels.init(detailFunc.userArg),
                    t = $(this).find("em").text();
                    console.log(e),
                    e && (1 == detailFunc.userArg.type && "追番" == t ? ($(this).find("em").text("已追"), $(this).addClass("subscribe_catch")) : 1 == detailFunc.userArg.type && "已追" == t ? ($(this).find("em").text("追番"), $(this).removeClass("subscribe_catch")) : 2 == detailFunc.userArg.type && "看完" == t ? ($(".subscribe li").addClass("displayNone"), $(".Subscribe_over").removeClass("displayNone"), 0 == $(".subscribe").attr("data-isCommented") && detailFunc.dialogContrl()) : 2 == detailFunc.userArg.type && "已看完" == t && ($(".Subscribe_0").find("em").text("追番"), $(".Subscribe_0").removeClass("subscribe_catch"), $(this).siblings("li").removeClass("displayNone"), $(".Subscribe_over").addClass("displayNone")))
                }
            }
        };
        $(function() {
            "detail" == $("#pageSign").val() && detailFunc.init()
        })
    },
    338 : function(module, exports, __webpack_require__) {
        var checklogin = __webpack_require__(363),
        commentConfig,
        commentFuc = {
            init: function() {
                commentConfig = {
                    cid: $("#commentId").val(),
                    aid: $("#animeId").val(),
                    toUid: $("#toUid"),
                    childReply: 0,
                    deleteBtn: $(".comment-operate .btn-delete")
                },
                ue = UE.getEditor("comment-container", {
                    toolbars: [["bold", "indent", "undo", "redo", "simpleupload"]],
                    enableContextMenu: !1,
                    autoHeightEnabled: !0,
                    autoFloatEnabled: !0,
                    catchRemoteImageEnable: !1,
                    retainOnlyLabelPasted: !0,
                    removeformat: !0,
                    wordCount: !1,
                    elementPathEnabled: !1
                }),
                commentFuc.setup()
            },
            setup: function() {
                $(".btn-reply").bind("click", commentFuc.childReply),
                $(".comment-submit").bind("click", commentFuc.submitReply),
                commentFuc.showDetail(),
                commentConfig.deleteBtn.each(function(e) {
                    $(this).bind("click", commentFuc.deleteReply)
                })
            },
            showDetail: function() {
                $(".con-i .text").each(function(e) {
                    var t = $(this).html().match(/<img.*?(?:>|\/>)/gi),
                    i = $(this).height();
                    t ? ($(this).addClass("limitHeight"), $(this).parent().find(".limit_show").show()) : i > 146 && !$(this).hasClass("hidden") && ($(this).addClass("limitHeight"), $(this).parent().find(".limit_show").show())
                }),
                $(".limit_show").each(function(e) {
                    $(this).bind("click",
                    function() {
                        $(this).parent().find(".text").removeClass("limitHeight"),
                        $(this).hide(),
                        $(this).parent().find(".limit_close").show()
                    })
                }),
                $(".limit_close").each(function(e) {
                    $(this).bind("click",
                    function() {
                        $(this).parent().find(".text").addClass("limitHeight"),
                        $(this).hide(),
                        $(this).parent().find(".limit_show").show()
                    })
                })
            },
            childReply: function() {
                if (checklogin.init()) {
                    var e = $(this).attr("fromNickname"),
                    t = $(this).attr("fromuid");
                    commentConfig.toUid.val(t),
                    ue.execCommand("cleardoc"),
                    ue.focus(),
                    ue.execCommand("inserthtml", "回复 @" + e + ":")
                }
            },
            submitReply: function() {
                if (checklogin.init() && !$(this).hasClass("disabled")) {
                    var comment = ue.getContent(),
                    comment_text = comment.replace(/<p>/g, "").replace(/<\/p>/g, ""),
                    toUid = commentConfig.toUid.val();
                    if ("回复" == comment_text.substr(0, 2)) {
                        var index = comment_text.indexOf(":") + 1;
                        if (comment_text = comment_text.substr(index, comment_text.length), "" == comment_text) return void commentFuc.tipContrl("评论不可以为空哦")
                    } else toUid = $(this).attr("fromuid");
                    if (comment_text.replace(/<\/?[^>]*>/g, "").length > 140) commentFuc.tipContrl("评论不能超过140个字符哦");
                    else if (ue.hasContents()) {
                        var form_data = {
                            animeId: commentConfig.aid,
                            commentId: commentConfig.cid,
                            toUid: toUid,
                            content: encodeURIComponent(comment),
                            refContent: "",
                            t: (new Date).getTime()
                        };
                        $(this).addClass("disabled"),
                        $.post("/commentApi/addReply", form_data,
                        function(data) {
                            if (data = eval("(" + data + ")"), 1 == data.Data.StateCode) {
                                var href_s = "?f=1";
                                "?f=1" == window.location.search && (href_s = ""),
                                window.location.href = "/comment/" + commentConfig.aid + "/" + commentConfig.cid + "/1.html" + href_s + "#New"
                            }
                        }),
                        commentFuc.tipContrl("")
                    } else commentFuc.tipContrl("评论不可以为空哦")
                }
            },
            tipContrl: function(e) {
                $(".error-tip").text(e)
            },
            deleteReply: function() {
                var that = $(this);
                commentConfig.deleteBtn.removeClass("disabled"),
                $(".dialog-issueDel").remove(),
                commentFuc.creatDelBox(that),
                that.addClass("disabled");
                var commentid = that.attr("data-commentid"),
                userid = that.attr("data-fromuid");
                $(".issue-delete").unbind().bind("click",
                function() {
                    if (checklogin.init() && !$(this).hasClass("disabled")) {
                        var form_data = {
                            commentId: commentid,
                            userId: userid,
                            t: (new Date).getTime()
                        };
                        $(this).addClass("disabled"),
                        $.post("/commentApi/deleteReply", form_data,
                        function(data) {
                            if (data = eval("(" + data + ")"), 1 == data.Data.StateCode) {
                                var seletor = "#reply-" + commentid;
                                $(seletor).remove(),
                                $(".dialog-issueDel").remove();
                                var btnReplyText = parseInt($(".btn-reply").text().slice($(".btn-reply").text().indexOf("（") + 1, $(".btn-reply").text().indexOf("）"))) - 1;
                                $(".btn-reply").text("回复（" + btnReplyText + "）")
                            }
                        })
                    }
                }),
                $(".issue-cancel").unbind().bind("click",
                function() {
                    $(".dialog-issueDel").remove(),
                    that.removeClass("disabled")
                })
            },
            creatDelBox: function(e) {
                var t = '<div class="dialog-issueDel" style="left:' + (e[0].offsetLeft - 61) + "px;top:" + (e[0].offsetTop - 83) + 'px;"><div class="model"><p>确定要删除该回复吗？</p><div class="issue-btn clearfix"><a class="btn issue-delete" href="javascript:void(0)">确定</a><a class="btn issue-cancel" href="javascript:void(0)">取消</a></div><div class="arrow-up--border"><div class="arrow-up"></div></div></div></div';
                $(".comment-childlist").append(t)
            }
        };
        $(function() {
            "commentdetail" == $("#pageSign").val() && commentFuc.init()
        })
    },
    339 : function(e, t, i) {
        var a = i(365),
        n = i(363),
        s = i(331),
        o = {
            init: function() {
                a.init(),
                o.setup()
            },
            setup: function() {
                o.TagContrl(),
                $(".list-subscribe").bind("click", o.subscribeFun),
                o.addkeyWord(),
                o.keyWordInput()
            },
            keyWordInput: function() {
                var e = decodeURI(window.location.search).split("keyWord=");
                1 != e.length && $("#keyword").val(e[1])
            },
            addkeyWord: function() {
                $("#pages .pagination a").not(".active").each(function(e, t) {
                    "/search" != window.location.pathname && $(this).attr("href", $(this).attr("href") + window.location.search)
                })
            },
            TagContrl: function() {
                $(".btn-tag-show").bind("click",
                function() {
                    $("#tags").find(".tag-title").addClass("high"),
                    $(this).addClass("hidden"),
                    $(".list-more").removeClass("hidden")
                }),
                $(".btn-tag-hide").bind("click",
                function() {
                    $("#tags").find(".tag-title").removeClass("high"),
                    $(".list-more").addClass("hidden"),
                    $(".btn-tag-show").removeClass("hidden")
                }),
                $(".show-oldlist").bind("click",
                function() {
                    $(".mod-tag-list").addClass("is-show")
                }),
                $(".show-newlist").bind("click",
                function() {
                    $(".mod-tag-list").removeClass("is-show")
                })
            },
            userArg: {
                animeid: 0,
                type: 0,
                loginToken: ""
            },
            subscribeFun: function() {
                if (n.init()) {
                    var e = $(this).find("em").attr("class");
                    o.userArg.type = "0" == e || "1" == e ? 1 : 2,
                    o.userArg.animeid = $(this).parents("li").attr("data-animesid"),
                    o.userArg.loginToken = $.cookie("token"),
                    s.init(o.userArg) && (1 == o.userArg.type && "0" == e ? ($(this).find("em").text("已追"), $(this).find("em").attr("class", "1"), $(this).addClass("list-subscribe_catch")) : 1 == o.userArg.type && "1" == e ? ($(this).find("em").text("追番"), $(this).find("em").attr("class", "0"), $(this).removeClass("list-subscribe_catch")) : 2 == o.userArg.type && "2" == e && ($(this).find("em").text("追番"), $(this).find("em").attr("class", "0"), $(this).removeClass("list-subscribe_catch"), $(this).removeClass("list-subscribe_over")))
                }
            }
        };
        $(function() {
            "list" == $("#pageSign").val() && o.init()
        })
    },
    340 : function(module, exports) {
        var registerFuc = {
            init: function() {
                config = {
                    e1: !1,
                    e2: !0,
                    e3: !1,
                    e4: !1,
                    e5: !0,
                    e6: !1,
                    e7: !1,
                    e8: !1,
                    e9: !1,
                    registration: 1,
                    sendCheck: !0,
                    friendfrom: $("#friendfrom").val()
                },
                registerFuc.setup()
            },
            setup: function() {
                $(".menu .menu-i").bind("click", registerFuc.changeNav),
                $(".getCodeByCilck").unbind().bind("click", registerFuc.sendCode),
                $("#MailCodeImg").bind("click", registerFuc.change_code),
                $("#regCodeImg").bind("click", registerFuc.change_code),
                $(".send-again").bind("click", registerFuc.doSendMail),
                $("#RegSubmit").bind("click", registerFuc.doRegByPhone),
                registerFuc.regByPhone(),
                registerFuc.regByMail(),
                registerFuc.checkbox()
            },
            changeNav: function() {
                var e = $(this).attr("attrName");
                $(this).addClass("is-active").siblings().removeClass("is-active"),
                "mail" == e ? (config.registration = 2, $(".reg-form").addClass("is-show"), $(".form-2rd").removeClass("form-limitHeiht"), $(".form-first").addClass("hidden"), $("#MailCodeImg").attr("src", "/code?" + (new Date).getTime()), registerFuc.checkMailStatus(), $("#RegSubmit").text("注册").unbind("click").bind("click", registerFuc.doRegByMail)) : (config.registration = 1, registerFuc.checkPhoneStatus(), $(".reg-form").removeClass("is-show"), $(".form-2rd").addClass("form-limitHeiht"), $(".form-first").removeClass("hidden"), $("#RegSubmit").text("注册").unbind("click").bind("click", registerFuc.doRegByPhone))
            },
            checkMailStatus: function() {
                $("#reg-email").length > 0 && (config.e6 && config.e7 && config.e8 && config.e9 && config.e5 ? $("#RegSubmit").removeClass("disabled") : $("#RegSubmit").addClass("disabled"))
            },
            checkPhoneStatus: function() {
                $("#phoneNum").length > 0 && (config.e1 && config.e2 && config.e3 && config.e4 && config.e5 ? $("#RegSubmit").removeClass("disabled") : $("#RegSubmit").addClass("disabled"))
            },
            regByPhone: function() {
                $("#phoneNum").bind("input propertychange",
                function() {
                    var e = $(this).val();
                    $(".code-box").hide(),
                    $("#picCode").val(""),
                    $(".error-des").text(""),
                    $("#verifyCode").siblings(".tip").remove(),
                    "" == e ? ($(this).addClass("wrong").siblings(".tip").remove(), $(this).after("<p class='tip'>请输入手机号码</p>")) : registerFuc.checkPhoneNum(e) ? (config.e1 = !0, $(this).removeClass("wrong").siblings(".tip").remove()) : ($(this).addClass("wrong").siblings(".tip").remove(), $(this).after("<p class='tip'>请输入正确手机号码</p>"))
                }).keyup(function() {
                    registerFuc.checkPhoneStatus()
                }),
                $("#verifyCode").bind("input propertychange",
                function() {
                    var e = $(this).val();
                    "" == e ? ($(this).addClass("wrong").siblings(".tip").remove(), $(this).siblings(".getCode").after("<p class='tip'>请输入手机验证码</p>")) : $.isNumeric(e) ? (config.e3 = !0, $(this).removeClass("wrong").siblings(".tip").remove()) : ($(this).addClass("wrong").siblings(".tip").remove(), $(this).siblings(".getCode").after("<p class='tip'>请输入正确的验证码</p>"))
                }).keyup(function() {
                    registerFuc.checkPhoneStatus()
                }),
                $("#phonePw").bind("input propertychange",
                function() {
                    var e = $(this).val(),
                    t = !0; (e.length < 6 || e.length > 16) && (t = !1, $(this).parent().find(".tip").detach(), $(this).after("<span class='tip'>6-16 个字符</span>")),
                    / /.test(e) && (t = !1, $(this).parent().find(".tip").detach(), $(this).after("<span class='tip'>不能含有空格</span>")),
                    $("#phoneNum").length > 0 && -1 != $("#phoneNum").val().indexOf(e) && "" != e && ($(this).parent().find(".tip").detach(), $(this).after("<span class='tip'>密码与账号太相似</span>"), t = !1),
                    "" == e && (t = !1, $(this).parent().find(".tip").detach()),
                    config.e4 = t,
                    t && $(this).parent().find(".tip").detach()
                }).keyup(function() {
                    registerFuc.checkPhoneStatus()
                })
            },
            regByMail: function() {
                $("#reg-email").bind("input propertychange",
                function() {
                    config.e6 = !1,
                    $(this).parent().find(".tip").detach();
                    var e = $(this).val();
                    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(e) ? e.length > 52 ? ($(this).after("<span class='tip'>邮箱不能超过52个字符</span>"), void(config.e6 = !1)) : (config.e6 = !0, void config.e6) : ($(this).after("<span class='tip'>请输入有效的邮箱地址</span>"), void(config.e6 = !1))
                }).keyup(function() {
                    $("#RegSubmit").text("注册"),
                    $("#code").parent().find(".tip").detach(),
                    registerFuc.checkMailStatus()
                }),
                $("#reg-mailPw").bind("input propertychange",
                function() {
                    var e = $(this).val(),
                    t = !0; (e.length < 6 || e.length > 16) && (t = !1, $(this).parent().find(".tip").detach(), $(this).after("<span class='tip'>6-16 个字符</span>")),
                    / /.test(e) && (t = !1, $(this).parent().find(".tip").detach(), $(this).after("<span class='tip'>不能含有空格</span>")),
                    $("#reg-email").length > 0 && -1 != $("#reg-email").val().indexOf(e) && "" != e && ($(this).parent().find(".tip").detach(), $(this).after("<span class='tip'>密码与邮箱太相似</span>"), t = !1),
                    "" == e && (t = !1, $(this).parent().find(".tip").detach()),
                    config.e7 = t,
                    t && ($(this).parent().find(".tip").detach(), "" != $("#reg-mailPw-2").val() ? e == $("#reg-mailPw-2").val() ? ($("#reg-mailPw-2").parent().find(".tip").detach(), config.e8 = !0) : (config.e8 = !1, $("#reg-mailPw-2").parent().find(".tip").detach(), $("#reg-mailPw-2").after("<span class='tip'>两次输入的密码不一致</span>")) : $("#reg-mailPw-2").parent().find(".tip").detach())
                }).keyup(function() {
                    registerFuc.checkMailStatus()
                }),
                $("#reg-mailPw-2").bind("input propertychange",
                function() {
                    "" != $("#reg-mailPw-2").val() ? $(this).val() != $("#reg-mailPw").val() ? ($(this).parent().find(".tip").detach(), $(this).after("<span class='tip'>两次输入的密码不一致</span>"), config.e8 = !1) : ($(this).parent().find(".tip").detach(), config.e8 = !0) : $(this).parent().find(".tip").detach()
                }).keyup(function() {
                    registerFuc.checkMailStatus()
                }),
                $("#code").bind("input propertychange",
                function() {
                    $(this).parent().find(".tip").detach(),
                    "" == $(this).val() ? ($(this).siblings(".login-code").after("<p class='tip'>请输入验证码</p>"), config.e9 = !1) : config.e9 = !0
                }).keyup(function() {
                    registerFuc.checkMailStatus()
                })
            },
            checkPhoneNum: function(e) {
                return /^(1[3|4|5|6|7|8|9])\d{9}$/.test(e)
            },
            sendCode: function() {
                if (!$(this).hasClass("disabled")) {
                    if (!config.e1) return $("#phoneNum").addClass("wrong").siblings(".tip").remove(),
                    void $("#phoneNum").after("<span class='tip'>请输入手机号码</span>");
                    var patrn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
                    $("#regCodeImg").attr("src", "/code?" + (new Date).getTime()),
                    $(".code-box").show(),
                    $("#picCode").bind("input propertychange",
                    function() {
                        var e = $(this).val();
                        "" == e ? $(".error-des").text("请输入验证码") : patrn.test(e) ? ($(".error-des").text("验证码有误"), config.e2 = !1) : (config.e2 = !0, $(".error-des").text(""))
                    }),
                    $(".code-submit").unbind().bind("click",
                    function() {
                        var code = $("#picCode").val(),
                        phone = $("#phoneNum").val(),
                        timeid,
                        t = 60;
                        if ("" != code) {
                            if (config.e1 && config.e2) {
                                var form_data = {
                                    code: code,
                                    value: phone,
                                    type: 1,
                                    valuetype: 1,
                                    t: (new Date).getTime()
                                };
                                $.post("/security/sendCode", form_data,
                                function(data) {
                                    if (data = eval("(" + data + ")"), 1 == data.Data.StateCode) $(".code-box").hide(),
                                    $(".getCodeByCilck").addClass("disabled"),
                                    $("#picCode").val(""),
                                    config.e2 = !0,
                                    timeid = setInterval(function() {
                                        0 == t ? (clearInterval(timeid), $(".getCodeByCilck").removeClass("disabled").text("重新获取")) : (t -= 1, $(".getCodeByCilck").text(t + "s"))
                                    },
                                    1e3);
                                    else {
                                        if ($("#regCodeImg").attr("src", "/code?" + (new Date).getTime()), 702 == data.Data.StateCode || 703 == data.Data.StateCode || 704 == data.Data.StateCode) return $("#verifyCode").siblings(".tip").remove(),
                                        void $("#verifyCode").siblings(".getCode").after("<p class='tip'>" + data.Data.Message + "</p>");
                                        var text = data.Data.Message ? data.Data.Message: "验证码有误";
                                        $(".error-des").text(text)
                                    }
                                })
                            }
                        } else $(".error-des").text("请输入验证码")
                    })
                }
            },
            doRegByPhone: function() {
                if (!$(this).hasClass("disabled") && !$(this).hasClass("succeded") && 2 != config.registration) {
                    var code = $("#verifyCode").val(),
                    password = $("#phonePw").val(),
                    phone = $("#phoneNum").val(),
                    form_data = {
                        code: code,
                        password: $.md5(password),
                        phone: phone,
                        friendfrom: config.friendfrom,
                        t: (new Date).getTime()
                    };
                    $.post("/security/regPhone", form_data,
                    function(data) {
                        data = eval("(" + data + ")"),
                        1 == data.Data.StateCode ? ($("#RegSubmit").addClass("succeded").text("注册成功"), setTimeout(function() {
                            location.href = "/register/uname"
                        },
                        3e3)) : ($("#RegSubmit").addClass("disabled"), $("#verifyCode").siblings(".tip").remove(), $("#verifyCode").siblings(".getCode").after("<p class='tip'>" + data.Data.Message + "</p>"))
                    })
                }
            },
            doRegByMail: function() {
                if (!$(this).hasClass("disabled") && !$(this).hasClass("succeded") && 1 != config.registration) {
                    var that = $(this),
                    code = $("#code").val(),
                    password = $("#reg-mailPw").val(),
                    mail = $("#reg-email").val(),
                    form_data = {
                        code: code,
                        password: $.md5(password),
                        mail: mail,
                        t: (new Date).getTime()
                    };
                    $.post("/security/regMail", form_data,
                    function(data) {
                        data = eval("(" + data + ")"),
                        1 == data.Data.StateCode ? (that.addClass("succeded").text("注册成功"), $(".user-email").text(mail), setTimeout(registerFuc.showMailbox, 2e3)) : 370 == data.Data.StateCode ? (that.addClass("disabled").text(data.Data.Message), $(".user-email").text(mail), setTimeout(registerFuc.showMailbox, 2e3)) : -1 == data.Data.StateCode ? ($("#MailCodeImg").attr("src", "/code?" + (new Date).getTime()), $("#code").siblings(".tip").remove(), $("#code").siblings(".login-code").after("<p class='tip'>验证码错误</p>"), that.addClass("disabled")) : ($("#MailCodeImg").attr("src", "/code?" + (new Date).getTime()), $("#code").val(""), $("#code").parent().find(".tip").detach(), $("#code").siblings(".login-code").after("<p class='tip'>" + data.Data.Message + "</p>"), that.addClass("disabled"))
                    })
                }
            },
            doSendMail: function() {
                if (!$(this).hasClass("disabled") && config.sendCheck) {
                    var timeid, time = 60;
                    config.sendCheck = !1,
                    $(this).addClass("disabled");
                    var form_data = {
                        email: $(".user-email").text(),
                        t: (new Date).getTime()
                    };
                    $.post("/security/sendEmail", form_data,
                    function(data) {
                        if (data = eval("(" + data + ")"), 1 == data.Data.StateCode) timeid = setInterval(function() {
                            0 == time ? (clearInterval(timeid), config.sendCheck = !0, $(".send-again").removeClass("disabled").text("未收到邮件？重新发送激活邮件 >")) : (time -= 1, $(".send-again").text("已发送，" + time + "s后可重新发送"))
                        },
                        1e3);
                        else {
                            if (703 == data.Data.StateCode) return void $(".send-again").text(data.Data.Message);
                            config.sendCheck = !0,
                            $(this).removeClass("disabled")
                        }
                    })
                }
            },
            showMailbox: function() {
                $(".reg-container").hide(),
                $(".reg-container-send").show().find(".reg-box").addClass("is-show")
            },
            checkbox: function() {
                $("#isAgree").change(function() {
                    document.getElementById("isAgree").checked ? (config.e5 = !0, $(".checkbox-input").addClass("icon-checkbox")) : (config.e5 = !1, $(".checkbox-input").removeClass("icon-checkbox")),
                    1 == config.registration ? registerFuc.checkPhoneStatus() : registerFuc.checkMailStatus()
                })
            },
            change_code: function() {
                $(this).attr("src", "/code?" + (new Date).getTime())
            }
        };
        $(function() {
            "register" == $("#pageSign").val() && registerFuc.init()
        })
    },
    341 : function(module, exports) {
        var loginFuc = {
            init: function() {
                config = {
                    clickable: !0,
                    sendCheck: !0,
                    login_time: 7
                },
                loginFuc.setup()
            },
            setup: function() {
                $("#LoginSubmit").bind("keydown click", loginFuc.loginSubmit),
                $("#regCodeImg").bind("click", loginFuc.change_code),
                loginFuc.inputContrl(),
                loginFuc.checkbox()
            },
            loginSubmit: function() {
                config.clickable = !1;
                var account = $("#account").val();
                if (loginFuc.show_tips(""), "" == account) return loginFuc.show_tips("请输入账号"),
                config.clickable = !0,
                !1;
                if (loginFuc.isChina(account)) return loginFuc.show_tips("账号不能含有中文"),
                config.clickable = !0,
                !1;
                if (/ /.test(account)) return loginFuc.show_tips("账号不能含有空格"),
                config.clickable = !0,
                !1;
                if (account.length > 50) return loginFuc.show_tips("输入的账号太长"),
                config.clickable = !0,
                !1;
                if ("" == $("#password").val()) return loginFuc.show_tips("请输入密码"),
                config.clickable = !0,
                !1;
                if ("" == $("#code").val()) return loginFuc.show_tips("请输入验证码"),
                config.clickable = !0,
                !1;
                $(".btn-submit").addClass("disabled");
                var form_data = {
                    account: $("#account").val(),
                    password: $.md5($("#password").val()),
                    regcode: $("#code").val(),
                    days: config.login_time,
                    useragent: navigator.userAgent.toLowerCase(),
                    t: (new Date).getTime()
                };
                return "undefined" != typeof verify && verify && (form_data.verify = "novcode"),
                $.post("/login/submit", form_data,
                function(data) {
                    if (data = eval("(" + data + ")"), 1 == data.code) {
                        var url = "" != data.msg ? decodeURIComponent(data.msg) : "/";
                        window.location = url
                    } else {
                        if ($("#regCodeImg").attr("src", "/code?" + (new Date).getTime()), config.clickable = !0, 312 == data.code) {
                            var str = data.msg + '<a class="btn-send" href="javascript:void(0)">发送激活邮件 ></a>';
                            return $(".login-tips").append(str),
                            void $(".btn-send").unbind().bind("click", loginFuc.doSendMail)
                        }
                        if (350 == data.code && ($("#password").val(""), $("#code").val(""), config.clickable = !0), 351 == data.code) {
                            var str = '账号已被锁定1小时，解锁请联系<a class="kefu" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1796562676&site=qq&menu=yes">在线客服</a>';
                            return void $(".login-tips").append(str)
                        }
                        loginFuc.show_tips(data.msg),
                        $(".btn-submit").removeClass("disabled")
                    }
                }),
                !1
            },
            doSendMail: function() {
                if (!$(this).hasClass("disabled") && config.sendCheck) {
                    var timeid, time = 60,
                    that = $(this);
                    config.sendCheck = !1,
                    that.addClass("disabled");
                    var form_data = {
                        email: $("#account").val(),
                        t: (new Date).getTime()
                    };
                    $.post("/security/sendEmail", form_data,
                    function(data) {
                        data = eval("(" + data + ")"),
                        1 == data.Data.StateCode ? timeid = setInterval(function() {
                            0 == time ? (clearInterval(timeid), config.sendCheck = !0, $(".btn-send").removeClass("disabled").text("未收到邮件？重新发送 >")) : (time -= 1, $(".btn-send").text("已发送，" + time + "s后可重新发送"))
                        },
                        1e3) : (702 != data.Data.StateCode && 703 != data.Data.StateCode && 704 != data.Data.StateCode || loginFuc.show_tips(data.Data.Message), config.sendCheck = !0, that.removeClass("disabled"))
                    })
                }
            },
            inputContrl: function() {
                $("#account").bind("input propertychange",
                function() {
                    loginFuc.show_tips("")
                }).keyup(function() {
                    $(".btn-submit").removeClass("disabled")
                })
            },
            show_layer_list: function(e) {
                var t = $(".layer_menu_list .list-i"),
                i = '<li class="item" action-data="value=' + e + '@sina.com"><a href="javascript:void(0)">' + e + '@sina.com</a></li><li class="item" action-data="value=' + e + '@163.com"><a href="javascript:void(0)">' + e + '@163.com</a></li><li class="item" action-data="value=' + e + '@qq.com"><a href="javascript:void(0)">' + e + '@qq.com</a></li><li class="item" action-data="value=' + e + '@126.com"><a href="javascript:void(0)">' + e + '@126.com</a></li><li class="item" action-data="value=' + e + '@sohu.com"><a href="javascript:void(0)">' + e + '@sohu.com</a></li><li class="item" action-data="value=' + e + '@yahoo.com.cn"><a href="javascript:void(0)">' + e + '@yahoo.com.cn</a></li><li class="item" action-data="value=' + e + '@yahoo.com"><a href="javascript:void(0)">' + e + '@yahoo.com</a></li><li class="item" action-data="value=' + e + '@foxmail.com"><a href="javascript:void(0)">' + e + "@foxmail.com</a></li>";
                $(".list-i li").remove(),
                t.append(i),
                $(".item").each(function(e) {
                    $(this).bind("click",
                    function() {
                        var e = $(this).attr("action-data");
                        e = $.trim(e.replace("value=", "")),
                        $("#account").val(e)
                    })
                })
            },
            checkbox: function() {
                $("#isAgree").change(function() {
                    document.getElementById("isAgree").checked ? (config.login_time = 7, $(".checkbox-input").addClass("icon-checkbox")) : (config.login_time = 1, $(".checkbox-input").removeClass("icon-checkbox"))
                })
            },
            show_tips: function(e) {
                $(".login-tips").text(e)
            },
            change_code: function() {
                $(this).attr("src", "/code?" + (new Date).getTime())
            },
            isChina: function(e) {
                return !! /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi.exec(e)
            },
            checkAccount: function(e) {
                var t = !0,
                i = e.indexOf("@"),
                a = e.indexOf(".com");
                return "" == (e = e.substr(0, i)) ? t = !1 : loginFuc.isChina(e) ? t = !1 : / /.test(e) ? t = !1 : e.length > 32 ? t = !1 : -1 != a && (t = !1),
                t
            }
        };
        $(function() {
            "login" == $("#pageSign").val() && loginFuc.init()
        })
    },
    342 : function(module, exports) {
        var cardFuc = {
            init: function() {
                cardFuc.setup()
            },
            setup: function() {
                $("#AuthenSubmit").bind("click", cardFuc.submit)
            },
            submit: function() {
                if (!$(this).hasClass("disabled")) {
                    var name = $("#RealName").val(),
                    IDcard = $("#IdCard").val(),
                    forward = $.cookie("forward");
                    "" != name ? /^[\u4e00-\u9fa5]+$/.test(name) ? name.length < 2 || name.length > 5 ? cardFuc.etips("姓名只能2-5个字") : "" != IDcard ? cardFuc.IDCardCheck(IDcard) ? $.post("/security/SetIdCard", {
                        realname: name,
                        idcard: IDcard
                    },
                    function(data) {
                        data = eval("(" + data + ")"),
                        1 == data.Data.StateCode ? ($("#AuthenSubmit").addClass("disabled").text("认证成功"), $.cookie("IfRealName", !0, {
                            expires: 7,
                            path: "/",
                            domain: ".acgneta.com"
                        }), forward && "/" != forward ? window.location.href = forward: setTimeout(function() {
                            window.location.href = "/register/uname"
                        },
                        2e3)) : cardFuc.etips(data.Data.Message)
                    }) : cardFuc.etips("身份证号码出错啦") : cardFuc.etips("请输入身份证号码") : cardFuc.etips("只能使用中文名字") : cardFuc.etips("请输入姓名")
                }
            },
            IDCardCheck: function(e) {
                if (e = e.toUpperCase(), !/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(e)) return ! 1;
                var t, i;
                if (15 == (t = e.length)) {
                    i = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
                    var a = e.match(i);
                    if ((c = new Date("19" + a[2] + "/" + a[3] + "/" + a[4])).getYear() == Number(a[2]) && c.getMonth() + 1 == Number(a[3]) && c.getDate() == Number(a[4])) {
                        var n = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2),
                        s = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"),
                        o = 0;
                        for (e = e.substr(0, 6) + "19" + e.substr(6, e.length - 6), d = 0; d < 17; d++) o += e.substr(d, 1) * n[d];
                        return e += s[o % 11],
                        !0
                    }
                    return ! 1
                }
                if (18 == t) {
                    i = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
                    var c;
                    a = e.match(i);
                    if ((c = new Date(a[2] + "/" + a[3] + "/" + a[4])).getFullYear() == Number(a[2]) && c.getMonth() + 1 == Number(a[3]) && c.getDate() == Number(a[4])) {
                        var d;
                        n = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2),
                        s = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"),
                        o = 0;
                        for (d = 0; d < 17; d++) o += e.substr(d, 1) * n[d];
                        return s[o % 11] == e.substr(17, 1)
                    }
                    return ! 1
                }
                return ! 1
            },
            etips: function(e) {
                $(".login-tips").text(e)
            }
        };
        $(function() {
            "card" == $("#pageSign").val() && cardFuc.init()
        })
    },
    343 : function(module, exports) {
        var unameFuc = {
            init: function() {
                config = {
                    e1: !1,
                    e2: !1,
                    e3: !1
                },
                unameFuc.setup()
            },
            setup: function() {
                $("#UnameSubmit").bind("click", unameFuc.setUname),
                unameFuc.checkUname(),
                $("#skip").bind("click", unameFuc.skipSetting)
            },
            checkStatus: function() {
                $("#nickname").length > 0 && (config.e2 && config.e3 ? $("#UnameSubmit").removeClass("disabled") : $("#UnameSubmit").addClass("disabled"))
            },
            setUname: function() {
                if (!$(this).hasClass("disabled")) return unameFuc.sendError(""),
                $(this).addClass("disabled").val("提交中..."),
                $.post("/security/resetname", {
                    nickname: $("#nickname").val(),
                    token: $("#token").val()
                },
                function(data) {
                    if (data = eval("(" + data + ")"), 1 != data.Data.StateCode) return unameFuc.sendError(data.Data.Message),
                    $(this).removeClass("disabled").val("下一步>"),
                    !1;
                    $(this).val("设置成功"),
                    $.cookie("uname", $("#nickname").val(), {
                        expires: 7,
                        path: "/",
                        domain: ".acgneta.com"
                    }),
                    setTimeout(function() {
                        window.location.href = "/register/setTag"
                    },
                    2e3)
                }),
                !1
            },
            checkUname: function() {
                $("#nickname").bind("input propertychange",
                function() {
                    $(this).parent().find(".tip").detach();
                    var e = $(this).val(),
                    t = !0;
                    "_" != e.charAt(0) && "_" != e.charAt(e.length - 1) && "-" != e.charAt(0) && "-" != e.charAt(e.length - 1) || ($(this).parent().find(".tip").detach(), $(this).siblings(".hover-rule").after("<span class='tip'>下划线、中划线不能出现在首末位哦</span>"), t = !1),
                    (unameFuc.strlen(e) < 4 || unameFuc.strlen(e) > 14) && ($(this).parent().find(".tip").detach(), $(this).siblings(".hover-rule").after("<span class='tip'>4-14 个字符</span>"), t = !1);
                    /[`~!@#$%^&*()+<>?:"{},.\/;'[\]]/im.test(e) && (t = !1, $(this).parent().find(".tip").detach(), $(this).siblings(".hover-rule").after("<span class='tip'>不能含有特殊字符</span>")),
                    config.e2 = t,
                    unameFuc.checkStatus()
                }).keyup(function() {
                    config.e2 && (config.e3 = !1, $nickname = $(this), $.ajax({
                        url: "/security/checkNickname?nickname=" + encodeURIComponent($(this).val()),
                        success: function(data) {
                            data = eval("(" + data + ")"),
                            1 == data.Data.StateCode ? "" != $nickname.val() && (config.e3 = !0, $nickname.parent().find(".tip").detach(), $nickname.siblings(".hover-rule").after("<span class='tip tip-pass'>该昵称可用</span>")) : (config.e3 = !1, $nickname.parent().find(".tip").detach(), $nickname.siblings(".hover-rule").after("<span class='tip'>" + data.Data.Message + "</span>")),
                            unameFuc.checkStatus()
                        }
                    }))
                })
            },
            sendError: function(e) {
                $(".login-tips").text(e)
            },
            strlen: function(e) {
                for (var t = 0,
                i = 0; i < e.length; i++) {
                    var a = e.charCodeAt(i);
                    a >= 1 && a <= 126 || 65376 <= a && a <= 65439 ? t++:t += 2
                }
                return t
            },
            skipSetting: function() {
                window.location.href = "/register/setTag"
            }
        };
        $(function() {
            "uname" == $("#pageSign").val() && unameFuc.init()
        })
    },
    344 : function(module, exports) {
        var setTag = {
            init: function() {
                config = {
                    limit: 1,
                    submitBtn: $("#TagSubmit"),
                    pageSign: $("#pageSign").val()
                },
                setTag.setup()
            },
            setup: function() {
                "changTags" == config.pageSign && (config.limit = $("#count").val()),
                config.submitBtn.bind("click", setTag.submit),
                setTag.tagContrl(),
                $("#skip").bind("click", setTag.skipSetting)
            },
            tagContrl: function() {
                $(".list-unlike-tag .item").each(function(e) {
                    $(this).bind("click",
                    function() {
                        var e = $(this);
                        if (e.hasClass("choosed")) e.removeClass("choosed"),
                        config.limit--,
                        config.pageSign,
                        $(".s-tip").removeClass("succeded").text("");
                        else {
                            if ($(".s-tip").removeClass("succeded").text(""), config.limit > 5) return void $(".s-tip").removeClass("succeded").text("不喜欢的动画标签最多五个哦");
                            e.addClass("choosed"),
                            config.limit++
                        }
                        "changTags" != config.pageSign && (config.limit > 1 ? config.submitBtn.removeClass("disabled") : config.submitBtn.addClass("disabled"))
                    })
                })
            },
            submit: function() {
                if (!$(this).hasClass("disabled")) {
                    var that = $(this),
                    cateIds = "";
                    $(".list-unlike-tag .choosed").each(function(e) {
                        var t = $(this).attr("tagId");
                        cateIds = "" == cateIds ? t: t + "," + cateIds
                    }),
                    "changTags" != config.pageSign || "" != cateIds ? (that.addClass("disabled"), $.post("/register/addCategory", {
                        cateids: cateIds
                    },
                    function(data) {
                        if (data = eval("(" + data + ")"), 1 == data.Data.StateCode)"changTags" == config.pageSign ? ($(".s-tip").removeClass("succeded").text(""), $(".s-tip").addClass("succeded").text("修改成功")) : (that.val("设置成功"), setTimeout(function() {
                            window.location.href = "/"
                        },
                        2e3)),
                        $.cookie("IfClass", !0, {
                            expires: 7,
                            path: "/",
                            domain: ".acgneta.com"
                        });
                        else {
                            if ("changTags" != config.pageSign) return that.removeClass("disabled").val("完成"),
                            !1;
                            $(".s-tip").removeClass("succeded").text(""),
                            $(".s-tip").text(data.Data.Message),
                            that.removeClass("disabled")
                        }
                    })) : $(".s-tip").removeClass("succeded").text("请选择标签哦～")
                }
            },
            skipSetting: function() {
                $.cookie("IfClass", !0, {
                    expires: 7,
                    path: "/",
                    domain: ".acgneta.com"
                }),
                window.location.href = "/"
            }
        };
        $(function() {
            var e = $("#pageSign").val();
            "setTag" != e && "changTags" != e || setTag.init()
        })
    },
    345 : function(module, exports) {
        var forgetFuc = {
            init: function() {
                config = {
                    InputValue: $("#InputValue"),
                    submitBottn: $("#ForgetSubmit"),
                    way: $("#ForgetSubmit").attr("attrName"),
                    valuetype: 1,
                    e1: !1,
                    e2: !1,
                    e3: !1,
                    e4: !1
                },
                forgetFuc.setup()
            },
            setup: function() {
                $(".getCodeByCilck").bind("click", forgetFuc.sendCode),
                $("#ForgetSubmit").bind("click", forgetFuc.submit),
                $("#regCodeImg").bind("click", forgetFuc.change_code),
                forgetFuc.inputContrl()
            },
            checkStatus: function() {
                config.InputValue.length > 0 && (config.e1 && config.e2 && config.e3 ? config.submitBottn.removeClass("disabled") : config.submitBottn.addClass("disabled"))
            },
            inputContrl: function() {
                "mail" == config.way ? $("#InputValue").bind("input propertychange",
                function() {
                    $(".code-box").hide(),
                    $("#picCode").val(""),
                    $(".error-des").text(""),
                    $("#verifyCode").siblings(".tip").remove(),
                    config.e1 = !1,
                    $(this).parent().find(".tip").detach();
                    var e = $(this).val();
                    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(e) ? e.length > 30 ? ($(this).addClass("wrong").siblings(".tip").remove(), $(this).after("<span class='tip'>邮箱不能超过30个字符</span>"), void(config.e1 = !1)) : (config.e1 = !0, $(this).removeClass("wrong").siblings(".tip").remove(), void config.e1) : ($(this).addClass("wrong").siblings(".tip").remove(), $(this).after("<span class='tip'>请输入有效的邮箱地址</span>"), void(config.e1 = !1))
                }).blur(function() {
                    forgetFuc.checkStatus()
                }) : $("#InputValue").bind("input propertychange",
                function() {
                    var e = $(this).val();
                    $(".code-box").hide(),
                    $("#picCode").val(""),
                    $(".error-des").text(""),
                    $("#verifyCode").siblings(".tip").remove(),
                    "" == e ? ($(this).addClass("wrong").siblings(".tip").remove(), $(this).after("<p class='tip'>请输入手机号码</p>")) : forgetFuc.checkPhoneNum(e) ? (config.e1 = !0, $(this).removeClass("wrong").siblings(".tip").remove()) : ($(this).addClass("wrong").siblings(".tip").remove(), $(this).after("<p class='tip'>请输入正确手机号码</p>"))
                }).blur(function() {
                    forgetFuc.checkStatus()
                }),
                $("#verifyCode").bind("input propertychange",
                function() {
                    var e = $(this).val();
                    "" == e ? ($(this).addClass("wrong").siblings(".tip").remove(), $(this).siblings(".getCode").after("<p class='tip'>请输入验证码</p>")) : $.isNumeric(e) ? (config.e2 = !0, $(this).removeClass("wrong").siblings(".tip").remove()) : ($(this).addClass("wrong").siblings(".tip").remove(), $(this).siblings(".getCode").after("<p class='tip'>请输入正确的验证码</p>"))
                }).blur(function() {
                    forgetFuc.checkStatus()
                }),
                $("#phonePw").bind("input propertychange",
                function() {
                    var e = $(this).val(),
                    t = !0; (e.length < 6 || e.length > 16) && (t = !1, $(this).addClass("wrong").parent().find(".tip").detach(), $(this).after("<span class='tip'>6-16 个字符</span>")),
                    / /.test(e) && (t = !1, $(this).addClass("wrong").parent().find(".tip").detach(), $(this).after("<span class='tip'>不能含有空格</span>")),
                    $("#InputValue").length > 0 && -1 != $("#InputValue").val().indexOf(e) && "" != e && ($(this).addClass("wrong").parent().find(".tip").detach(), $(this).after("<span class='tip'>密码与账号太相似</span>"), t = !1),
                    "" == e && (t = !1, $(this).parent().find(".tip").detach()),
                    config.e3 = t,
                    t && $(this).removeClass("wrong").parent().find(".tip").detach()
                }).blur(function() {
                    forgetFuc.checkStatus()
                })
            },
            sendCode: function() {
                if (!$(this).hasClass("disabled")) {
                    var text = "mail" == config.way ? "邮箱地址": "手机号";
                    if (!config.e1) return config.InputValue.addClass("wrong").siblings(".tip").remove(),
                    void config.InputValue.after("<span class='tip'>请输入" + text + "</span>");
                    var patrn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
                    $("#regCodeImg").attr("src", "/code?" + (new Date).getTime()),
                    $(".code-box").show(),
                    $("#picCode").bind("input propertychange",
                    function() {
                        var e = $(this).val();
                        "" == e ? $(".error-des").text("请输入验证码") : patrn.test(e) ? $(".error-des").text("验证码有误") : (config.e4 = !0, $(".error-des").text(""))
                    }),
                    $(".code-submit").unbind().bind("click",
                    function() {
                        var code = $("#picCode").val(),
                        value = config.InputValue.val(),
                        timeid,
                        t = 60;
                        if (config.valuetype = "mail" == config.way ? 2 : 1, "" != code) {
                            if (config.e1 && config.e4) {
                                var form_data = {
                                    code: code,
                                    value: value,
                                    type: 2,
                                    valuetype: config.valuetype,
                                    t: (new Date).getTime()
                                };
                                $.post("/security/sendCode", form_data,
                                function(data) {
                                    if (data = eval("(" + data + ")"), 1 == data.Data.StateCode) $(".code-box").hide(),
                                    $(".getCodeByCilck").addClass("disabled"),
                                    $("#picCode").val(""),
                                    config.e2 = !0,
                                    timeid = setInterval(function() {
                                        0 == t ? (clearInterval(timeid), $(".getCodeByCilck").removeClass("disabled").text("重新获取")) : (t -= 1, $(".getCodeByCilck").text(t + "s"))
                                    },
                                    1e3);
                                    else {
                                        if ($("#regCodeImg").attr("src", "/code?" + (new Date).getTime()), 702 == data.Data.StateCode || 703 == data.Data.StateCode || 704 == data.Data.StateCode) return $("#verifyCode").siblings(".tip").remove(),
                                        $("#verifyCode").siblings(".getCode").after("<p class='tip'>" + data.Data.Message + "</p>"),
                                        $(".code-box").hide(),
                                        $("#picCode").val(""),
                                        void $(".error-des").text("");
                                        $("#picCode").val(""),
                                        $(".error-des").text(data.Data.Message)
                                    }
                                })
                            }
                        } else $(".error-des").text("请输入验证码")
                    })
                }
            },
            submit: function() {
                if (!$(this).hasClass("disabled") && !$(this).hasClass("succeded") && 1 != config.registration) {
                    var value = config.InputValue.val(),
                    password = $("#phonePw").val(),
                    code = $("#verifyCode").val(),
                    that = $(this);
                    config.valuetype = "mail" == config.way ? 2 : 1;
                    var form_data = {
                        value: value,
                        password: $.md5(password),
                        code: code,
                        valuetype: config.valuetype,
                        t: (new Date).getTime()
                    };
                    $.post("/forget/findBack", form_data,
                    function(data) {
                        data = eval("(" + data + ")"),
                        1 == data.Data.StateCode ? (that.addClass("succeded").text("找回成功"), setTimeout(function() {
                            window.location.href = "/login"
                        },
                        2e3)) : (that.addClass("disabled"), $("#verifyCode").siblings(".tip").remove(), $("#verifyCode").siblings(".getCode").after("<p class='tip'>" + data.Data.Message + "</p>"))
                    })
                }
            },
            checkPhoneNum: function(e) {
                return /^(1[3|4|5|6|7|8|9])\d{9}$/.test(e)
            },
            change_code: function() {
                $(this).attr("src", "/code?" + (new Date).getTime())
            }
        };
        $(function() {
            "forget" == $("#pageSign").val() && forgetFuc.init()
        })
    },
    346 : function(module, exports, __webpack_require__) {
        var checklogin = __webpack_require__(363),
        cvFuc = {
            init: function() {
                config = {
                    FollowButton: $("#cvLike"),
                    type: 1
                },
                cvFuc.setup()
            },
            setup: function() {
                config.FollowButton.bind("click", cvFuc.followContrl)
            },
            followContrl: function() {
                if (checklogin.init()) {
                    var that = $(this);
                    if (!that.hasClass("disabled")) {
                        that.hasClass("like-self") ? config.type = 2 : config.type = 1,
                        that.addClass("disabled");
                        var cvid = that.attr("attrcvid");
                        $.post("/cv/follow", {
                            id: cvid,
                            type: config.type
                        },
                        function(data) {
                            data = eval("(" + data + ")"),
                            1 == data.Data.StateCode ? (1 == config.type ? that.addClass("like-self") : that.removeClass("like-self"), that.removeClass("disabled")) : that.removeClass("disabled")
                        })
                    }
                }
            }
        };
        $(function() {
            "cvdetail" == $("#pageSign").val() && cvFuc.init()
        })
    },
    347 : function(e, t, i) {
        "use strict";
        i.r(t);
        var a = i(366),
        n = i.n(a),
        s = function() {
            n.a.init(3, 356, 1, 10, 0)
        };
        $(function() {
            "commentlist" == $("#pageSign").val() && s()
        })
    },
    348 : function(e, t, i) {
        "use strict";
        i.r(t);
        var a, n = i(364),
        s = i.n(n),
        o = {
            init: function() {
                a = {
                    toTopBtn: $(".toTop")
                },
                o.setup()
            },
            setup: function() {
                a.toTopBtn.bind("click", o.gototop)
            },
            gototop: function() {
                s.a.init("top")
            }
        };
        $(function() {
            "chart" == $("#pageSign").val() && o.init()
        })
    },
    349 : function(module, exports) {
        var settingFuc = {
            init: function() {
                settingConf = {
                    SexButton: $(".submit-sex"),
                    NameButton: $(".submit-nickname"),
                    BrifeButton: $(".submit-brief"),
                    CannelButton: $(".cannel-nickname"),
                    EditButton: $(".edit-nickname"),
                    TextArea: $("#BriefArea"),
                    uploadButton: $("#fileuploader")
                },
                settingFuc.setup()
            },
            setup: function() {
                settingConf.SexButton.click(settingFuc.changeSex),
                settingConf.EditButton.click(settingFuc.showNicknameBox),
                settingConf.NameButton.bind("click", settingFuc.changeNickname),
                settingConf.CannelButton.bind("click", settingFuc.hideNicknameBox),
                settingConf.BrifeButton.bind("click", settingFuc.changeBrief),
                settingFuc.uploadContrl()
            },
            changeSex: function() {
                if (!$(this).hasClass("disabled")) {
                    var that = $(this),
                    sex = $('.sex_item input[name="gender"]:checked ').val();
                    return that.parent().find(".tip").detach(),
                    $.post("/security/changeSex", {
                        sex: sex
                    },
                    function(data) {
                        if (data = eval("(" + data + ")"), 1 != data.Data.StateCode) return that.after("<p class='tip'>" + data.Data.Message + "</p>"),
                        that.removeClass("disabled"),
                        !1;
                        that.after("<p class='tip succeed'>" + data.Data.Message + "</p>"),
                        that.removeClass("disabled")
                    }),
                    !1
                }
            },
            showNicknameBox: function() {
                $(this).hasClass("disabled") || ($(this).addClass("disabled"), $(".edit-box").show())
            },
            hideNicknameBox: function() {
                settingConf.EditButton.removeClass("disabled"),
                $(".edit-box").hide(),
                $("#nickname").val(""),
                $(this).parent().find(".tip").detach()
            },
            changeNickname: function() {
                if (!$(this).hasClass("disabled")) {
                    var that = $(this),
                    nickname = $("#nickname").val();
                    if ("" === $.trim(nickname)) return that.parent().find(".tip").detach(),
                    void that.siblings(".cannel-nickname").after("<p class='tip'>昵称不能为空</p>");
                    if (settingFuc.strlen(nickname) < 4 || settingFuc.strlen(nickname) > 14) return that.parent().find(".tip").detach(),
                    void that.siblings(".cannel-nickname").after("<p class='tip'>4-14 个字符</p>");
                    var patrn = /[`~!@#$%^&*()+<>?:"{},.\/;'[\]]/im;
                    return patrn.test(nickname) ? (that.parent().find(".tip").detach(), void that.siblings(".cannel-nickname").after("<p class='tip'>不能含有特殊字符</p>")) : (that.parent().find(".tip").detach(), that.addClass("disabled"), $.post("/security/resetname", {
                        nickname: $("#nickname").val(),
                        token: $("#token").val()
                    },
                    function(data) {
                        if (data = eval("(" + data + ")"), 1 != data.Data.StateCode) return that.siblings(".cannel-nickname").after("<p class='tip'>" + data.Data.Message + "</p>"),
                        that.removeClass("disabled"),
                        !1;
                        $(".edit-box").hide(),
                        $(".nickname").text(nickname),
                        $(".user-name").text(nickname),
                        $("#nickname").val(""),
                        that.removeClass("disabled"),
                        settingConf.EditButton.removeClass("disabled")
                    }), !1)
                }
            },
            changeBrief: function() {
                if (!$(this).hasClass("disabled")) {
                    var that = $(this),
                    content = settingConf.TextArea.val();
                    return "" === $.trim(content) ? (that.siblings(".tip").detach(), void that.before("<p class='tip'>简介不能为空</p>")) : settingFuc.strlen(content) > 400 ? (that.siblings(".tip").detach(), void that.before("<p class='tip'>字数不能超过200个字哦</p>")) : (that.siblings(".tip").detach(), that.addClass("disabled"), $.post("/security/changeBrief", {
                        content: content
                    },
                    function(data) {
                        if (data = eval("(" + data + ")"), 1 != data.Data.StateCode) return that.before("<p class='tip'>" + data.Data.Message + "</p>"),
                        that.removeClass("disabled"),
                        !1;
                        that.before("<p class='tip succeed'>修改成功</p>"),
                        $("#intro").text(content),
                        that.removeClass("disabled")
                    }), !1)
                }
            },
            uploadContrl: function() {
                settingConf.uploadButton.uploadFile({
                    url: "/api/imgUpload?action=icon",
                    autoUpload: !1,
                    allowedTypes: "jpg,jpeg,png",
                    acceptFiles: ".jpg,.jpeg,.png",
                    maxNumberOfFiles: 1,
                    maxFileSize: 512e3,
                    sequentialUploads: !0,
                    dragDrop: !1,
                    uploadStr: "上传头像",
                    showQueueDiv: !0,
                    sizeErrorStr: "上传图像不能超过：",
                    dataType: "json",
                    onSuccess: function(files, response, xhr, pd) {
                        response = eval("(" + response + ")"),
                        "SUCCESS" == response.state && ($(".img_tip").removeClass("succeed").text(""), $.post("/security/changeUimg", {
                            img: 1
                        },
                        function(data) {
                            if (data = eval("(" + data + ")"), 1 == data.Data.StateCode) {
                                var index = data.Data.Img.indexOf("?") + 1,
                                c = data.Data.Img.substr(index),
                                s_url = "/user/avatar?size=60&c=" + c + "&t=" + (new Date).getTime();
                                $(".uimg img").attr("src", s_url);
                                var url = "/user/avatar?size=60&c=" + c + "&t=" + (new Date).getTime();
                                $(".uimg").attr("src", url);
                                var b_url = "/user/avatar?size=105&c=" + c + "&t=" + (new Date).getTime();
                                $(".user-info img").attr("src", b_url),
                                settingConf.uploadButton.attr("data-state", "1"),
                                $(".img_tip").addClass("succeed").text("头像保存成功")
                            } else $(".img_tip").removeClass("succeed").text("保存头像失败，请重新上传")
                        }))
                    },
                    onLoad: function(e) {
                        $(".operate").show()
                    },
                    onError: function() {
                        settingConf.uploadButton.attr("data-state", "0"),
                        $(".img_tip").removeClass("succeed").text("上传失败，请重新上传")
                    }
                })
            },
            strlen: function(e) {
                for (var t = 0,
                i = 0; i < e.length; i++) {
                    var a = e.charCodeAt(i);
                    a >= 1 && a <= 126 || 65376 <= a && a <= 65439 ? t++:t += 2
                }
                return t
            }
        };
        $(function() {
            "settings" == $("#pageSign").val() && settingFuc.init()
        })
    },
    350 : function(module, exports) {
        var accountFuc = {
            init: function() {
                config = {
                    e1: !1,
                    e2: !0,
                    e3: !1,
                    changePhone: $(".changePhone")
                },
                accountFuc.setup()
            },
            setup: function() {
                config.changePhone.bind("click", accountFuc.changePhoneFuc),
                $(".getCodeByCilck").unbind().bind("click", accountFuc.sendCode),
                $("#regCodeImg").bind("click", accountFuc.change_code),
                $(".submit-account").bind("click", accountFuc.submit),
                accountFuc.inputCtrl()
            },
            checkStatus: function() {
                $(".submit-account").length > 0 && (config.e1 && config.e2 && config.e3 ? $(".submit-account").removeClass("disabled") : $(".submit-account").addClass("disabled"))
            },
            inputCtrl: function() {
                $("#phoneNum").bind("input propertychange",
                function() {
                    var e = $(this).val();
                    config.e1 = !1,
                    $(".code-box").hide(),
                    $("#picCode").val(""),
                    $(".error-des").text(""),
                    $(".code-submit").removeClass("disabled"),
                    "" == e ? ($(this).addClass("wrong").siblings(".tip").remove(), $(this).after("<span class='tip'>请输入手机号码</span>")) : accountFuc.checkPhoneNum(e) ? (config.e1 = !0, $(this).removeClass("wrong").siblings(".tip").remove()) : ($(this).addClass("wrong").siblings(".tip").remove(), $(this).after("<span class='tip'>请输入正确手机号码</span>"))
                }).keyup(function() {
                    accountFuc.checkStatus()
                }),
                $("#verifyCode").bind("input propertychange",
                function() {
                    config.e3 = !1;
                    var e = $(this).val();
                    "" == e ? ($(this).addClass("wrong").siblings(".tip").remove(), $(this).siblings(".getCode").after("<span class='tip'>请输入手机验证码</span>")) : $.isNumeric(e) ? (config.e3 = !0, $(this).removeClass("wrong").siblings(".tip").remove()) : ($(this).addClass("wrong").siblings(".tip").remove(), $(this).siblings(".getCode").after("<span class='tip'>请输入正确的验证码</span>"))
                }).keyup(function() {
                    accountFuc.checkStatus()
                })
            },
            changePhoneFuc: function() {
                $(this).hasClass("disabled") || ($(this).addClass("disabled"), $(".edit-account").removeClass("hidden"))
            },
            sendCode: function() {
                if (!$(this).hasClass("disabled")) {
                    if ($("#verifyCode").siblings(".tip").remove(), !config.e1) return $("#phoneNum").addClass("wrong").siblings(".tip").remove(),
                    void $("#phoneNum").after("<span class='tip'>请输入正确手机号码</span>");
                    var patrn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
                    $("#regCodeImg").attr("src", "/code?" + (new Date).getTime()),
                    $(".code-box").show(),
                    $("#picCode").bind("input propertychange",
                    function() {
                        var e = $(this).val();
                        "" == e ? $(".error-des").text("请输入验证码") : patrn.test(e) ? $(".error-des").text("验证码有误") : (config.e3 = !0, $(".error-des").text(""))
                    }),
                    $(".code-submit").unbind().bind("click",
                    function() {
                        if (!$(this).hasClass("disabled")) {
                            var code = $("#picCode").val(),
                            phone = $("#phoneNum").val(),
                            that = $(this),
                            timeid,
                            t = 60;
                            if ("" != code) {
                                if (config.e1 && config.e3) {
                                    var form_data = {
                                        code: code,
                                        value: phone,
                                        type: 3,
                                        valuetype: 1,
                                        t: (new Date).getTime()
                                    };
                                    that.addClass("disabled"),
                                    $.post("/security/sendCode", form_data,
                                    function(data) {
                                        if (data = eval("(" + data + ")"), 1 == data.Data.StateCode) $(".code-box").hide(),
                                        $(".getCodeByCilck").addClass("disabled"),
                                        $("#picCode").val(""),
                                        config.e2 = !0,
                                        timeid = setInterval(function() {
                                            0 == t ? (clearInterval(timeid), $(".getCodeByCilck").removeClass("disabled").text("重新获取"), that.removeClass("disabled")) : (t -= 1, $(".getCodeByCilck").text(t + "s"))
                                        },
                                        1e3);
                                        else {
                                            if ($("#regCodeImg").attr("src", "/code?" + (new Date).getTime()), 702 == data.Data.StateCode || 703 == data.Data.StateCode || 704 == data.Data.StateCode) return $("#verifyCode").siblings(".tip").remove(),
                                            $("#verifyCode").siblings(".getCode").after("<p class='tip'>" + data.Data.Message + "</p>"),
                                            void that.removeClass("disabled");
                                            var text = data.Data.Message ? data.Data.Message: "验证码有误";
                                            $(".error-des").text(text)
                                        }
                                    })
                                }
                            } else $(".error-des").text("请输入验证码")
                        }
                    })
                }
            },
            submit: function() {
                if (!$(this).hasClass("disabled") && !$(this).hasClass("succeded")) {
                    var that = $(this),
                    code = $("#verifyCode").val(),
                    phone = $("#phoneNum").val(),
                    form_data = {
                        code: code,
                        phone: phone,
                        t: (new Date).getTime()
                    };
                    $.post("/security/resetAccount", form_data,
                    function(data) {
                        data = eval("(" + data + ")"),
                        1 == data.Data.StateCode ? (that.addClass("succeded").text("绑定成功"), $(".s-tip").text("绑定成功"), setTimeout(function() {
                            window.location.reload()
                        },
                        2e3)) : 401 == data.Data.StateCode ? (that.addClass("disabled"), $("#verifyCode").siblings(".tip").remove(), $("#verifyCode").siblings(".getCode").after("<p class='tip'>该手机号已绑定过其他账号</p>")) : (that.addClass("disabled"), $("#verifyCode").siblings(".tip").remove(), $("#verifyCode").siblings(".getCode").after("<p class='tip'>" + data.Data.Message + "</p>"))
                    })
                }
            },
            change_code: function() {
                $(this).attr("src", "/code?" + (new Date).getTime())
            },
            checkPhoneNum: function(e) {
                return /^(1[3|4|5|6|7|8|9])\d{9}$/.test(e)
            }
        };
        $(function() {
            "account" == $("#pageSign").val() && accountFuc.init()
        })
    },
    351 : function(module, exports) {
        var passwordFuc = {
            init: function() {
                passwordConf = {
                    e1: !1,
                    e2: !1,
                    e3: !1
                },
                passwordFuc.setup()
            },
            setup: function() {
                $(".submit-pwd").bind("click", passwordFuc.changePwd),
                passwordFuc.inputContrl()
            },
            inputContrl: function() {
                $("#pwd-i").bind("input propertychange",
                function() {
                    $("#pwd-i-2").removeClass("wrong").parent().find(".tip").detach(),
                    $(".opearte").find(".tip").detach();
                    var e = $(this).val(),
                    t = !0;
                    if (passwordConf.e1 = !1, / /.test(e) && (t = !1, $(this).addClass("wrong").parent().find(".tip").detach(), $(this).after("<span class='tip'>不能含有空格</span>")), "" == $.trim(e) && (t = !1, $(this).addClass("wrong").parent().find(".tip").detach(), $(this).after("<span class='tip'>请输入旧密码</span>")), "" != $.trim($("#pwd-i-2").val()) && $.trim(e) == $.trim($("#pwd-i-2").val()) && (t = !1, $("#pwd-i-2").addClass("wrong").parent().find(".tip").detach(), $("#pwd-i-2").after("<span class='tip'>新密码不能和当前密码一样哦</span>")), t) {
                        passwordConf.e1 = !0,
                        $(this).removeClass("wrong").parent().find(".tip").detach();
                        var i = $("#pwd-i-2"),
                        a = (e = i.val(), !0);
                        passwordConf.e2 = !1,
                        (e.length < 6 || e.length > 16) && (a = !1, i.addClass("wrong").parent().find(".tip").detach(), i.after("<span class='tip'>6-16 个字符</span>")),
                        / /.test(e) && (a = !1, i.addClass("wrong").parent().find(".tip").detach(), i.after("<span class='tip'>不能含有空格</span>")),
                        "" == $.trim(e) && (a = !1, i.addClass("wrong").parent().find(".tip").detach(), i.after("<span class='tip'>请输入新密码</span>")),
                        $.trim(e) == $.trim($("#pwd-i").val()) && (a = !1, i.addClass("wrong").parent().find(".tip").detach(), i.after("<span class='tip'>新密码不能和当前密码一样哦</span>")),
                        a && (passwordConf.e2 = !0, i.removeClass("wrong").parent().find(".tip").detach())
                    }
                }),
                $("#pwd-i-2").bind("input propertychange",
                function() {
                    $(".opearte").find(".tip").detach();
                    var e = $(this).val(),
                    t = !0;
                    if (passwordConf.e2 = !1, passwordConf.e3 = !1, (e.length < 6 || e.length > 16) && (t = !1, $(this).addClass("wrong").parent().find(".tip").detach(), $(this).after("<span class='tip'>6-16 个字符</span>")), / /.test(e) && (t = !1, $(this).addClass("wrong").parent().find(".tip").detach(), $(this).after("<span class='tip'>不能含有空格</span>")), "" == $.trim(e) && (t = !1, $(this).addClass("wrong").parent().find(".tip").detach(), $(this).after("<span class='tip'>请输入新密码</span>")), $.trim(e) == $.trim($("#pwd-i").val()) && (t = !1, $(this).addClass("wrong").parent().find(".tip").detach(), $(this).after("<span class='tip'>新密码不能和当前密码一样哦</span>")), t) {
                        passwordConf.e2 = !0,
                        $(this).removeClass("wrong").parent().find(".tip").detach();
                        var i = $.trim($("#pwd-i-3").val());
                        "" != i && ($.trim(e) != i ? (passwordConf.e3 = !1, $("#pwd-i-3").addClass("wrong").parent().find(".tip").detach(), $("#pwd-i-3").after("<span class='tip'>两次输入的新密码不一致哦</span>")) : (passwordConf.e3 = !0, $("#pwd-i-3").removeClass("wrong").parent().find(".tip").detach()))
                    }
                }),
                $("#pwd-i-3").bind("input propertychange",
                function() {
                    "" != $("#pwd-i-3").val() ? $(this).val() != $("#pwd-i-2").val() ? ($(this).addClass("wrong").parent().find(".tip").detach(), $(this).after("<span class='tip'>两次输入的新密码不一致哦</span>"), passwordConf.e3 = !1) : ($(this).removeClass("wrong").parent().find(".tip").detach(), passwordConf.e3 = !0) : $(this).removeClass("wrong").parent().find(".tip").detach()
                })
            },
            changePwd: function() {
                if (!$(this).hasClass("disabled")) {
                    var that = $(this),
                    password = $("#pwd-i").val(),
                    new_password = $("#pwd-i-2").val(),
                    new_password_check = $("#pwd-i-3").val();
                    if ("" == $.trim(password) && ($("#pwd-i").addClass("wrong").parent().find(".tip").detach(), $("#pwd-i").after("<span class='tip'>请输入旧密码</span>")), "" == $.trim(new_password) && ($("#pwd-i-2").addClass("wrong").parent().find(".tip").detach(), $("#pwd-i-2").after("<span class='tip'>请输入新密码</span>")), "" == $.trim(new_password_check) && ($("#pwd-i-3").addClass("wrong").parent().find(".tip").detach(), $("#pwd-i-3").after("<span class='tip'>请确认新密码</span>")), passwordConf.e1 && passwordConf.e2 && passwordConf.e3) {
                        var form_data = {
                            password: $.md5(password),
                            new_password: $.md5(new_password),
                            t: (new Date).getTime()
                        };
                        that.addClass("disabled").siblings(".tip").remove(),
                        $.post("/security/updatePwd", form_data,
                        function(data) {
                            data = eval("(" + data + ")"),
                            1 == data.Data.StateCode ? (that.before("<p class='tip succeded'>密码修改成功，请重新登录哦</p>"), setTimeout(function() {
                                $.removeCookie("icon", {
                                    path: "/",
                                    domain: ".acgneta.com"
                                }),
                                $.removeCookie("usertoken", {
                                    path: "/",
                                    domain: ".acgneta.com"
                                }),
                                $.removeCookie("userstate", {
                                    path: "/",
                                    domain: ".acgneta.com"
                                }),
                                window.location = "http://www.acgneta.com/security/logout"
                            },
                            1e3)) : (that.removeClass("disabled"), that.before("<p class='tip'>" + data.Data.Message + "</p>"))
                        })
                    }
                }
            }
        };
        $(function() {
            "password" == $("#pageSign").val() && passwordFuc.init()
        })
    },
    352 : function(module, exports) {
        var userpageFuc = {
            init: function() {
                userpageFuc.setup()
            },
            setup: function() {
                userpageFuc.showDetail()
            },
            showDetail: function() {
                $(".comment-i .text").each(function(e) {
                    var t = $(this).html().match(/<img.*?(?:>|\/>)/gi),
                    i = $(this).height();
                    $(this).hasClass("hidden") || (t ? ($(this).addClass("limitHeight"), $(this).parent().find(".limit_show").show()) : i > 146 && ($(this).addClass("limitHeight"), $(this).parent().find(".limit_show").show()))
                }),
                $(".jutou").each(function(e) {
                    $(this).bind("click",
                    function() {
                        $(this).parent().find(".text").removeClass("hidden"),
                        $(this).hide(),
                        $(this).parent().find(".jutou_close").show()
                    })
                }),
                $(".jutou_close").each(function(e) {
                    $(this).bind("click",
                    function() {
                        $(this).parent().find(".text").addClass("hidden"),
                        $(this).hide(),
                        $(this).parent().find(".jutou").show()
                    })
                }),
                $(".limit_show").each(function(e) {
                    $(this).bind("click",
                    function() {
                        $(this).parent().find(".text").removeClass("limitHeight"),
                        $(this).hide(),
                        $(this).parent().find(".limit_close").show()
                    })
                }),
                $(".limit_close").each(function(e) {
                    $(this).bind("click",
                    function() {
                        $(this).parent().find(".text").addClass("limitHeight"),
                        $(this).hide(),
                        $(this).parent().find(".limit_show").show()
                    })
                })
            },
            DeleteFollows: function() {
                $(".list-module .btn-delete").each(function(i) {
                    $(this).bind("click",
                    function() {
                        var check = confirm("确认删除这个作品收藏？"),
                        that = $(this),
                        animesId = that.attr("data-id"),
                        type = that.attr("data-type");
                        check && $.post("/api/deleteFollows", {
                            id: animesId,
                            type: type
                        },
                        function(data) {
                            if (data = eval("(" + data + ")"), 1 != data.Data.StateCode) return alert("删除失败，请稍后再试"),
                            !1;
                            that.parent().remove()
                        })
                    })
                })
            }
        };
        $(function() {
            var e = $("#pageSign").val();
            "user" == e || "userComments" == e ? userpageFuc.init() : "userAnimes" == e && userpageFuc.DeleteFollows()
        })
    },
    353 : function(e, t, i) {
        "use strict";
        i.r(t);
        var a = i(364),
        n = i.n(a),
        s = {
            init: function() {
                s.setup()
            },
            setup: function() {
                $(".side-menu-manual .menu-i").each(function(e) {
                    $(this).bind("click", s.scrollTodo)
                }),
                s.doScroll()
            },
            scrollTodo: function() {
                var e = $(this).attr("data-id");
                n.a.init(e)
            },
            doScroll: function() {
                var e = $(window).scrollTop();
                s.ScrollContrl(e),
                $(".side-menu-manual").css({
                    "margin-top": e
                }),
                $(window).scroll(function() {
                    e = $(this).scrollTop(),
                    s.ScrollContrl(e),
                    $(".side-menu-manual").css({
                        "margin-top": e
                    })
                })
            },
            ScrollContrl: function(e) {
                e >= 2700 && e < 5500 ? $(".menu-i").removeClass("is-active").eq(1).addClass("is-active") : e >= 5500 && e < 5900 ? $(".menu-i").removeClass("is-active").eq(2).addClass("is-active") : e >= 5900 && e < 6044 ? $(".menu-i").removeClass("is-active").eq(3).addClass("is-active") : e >= 6044 && e < 6610 ? $(".menu-i").removeClass("is-active").eq(4).addClass("is-active") : e >= 6610 ? $(".menu-i").removeClass("is-active").eq(5).addClass("is-active") : $(".menu-i").removeClass("is-active").eq(0).addClass("is-active")
            }
        };
        $(function() {
            "manual" == $("#pageSign").val() && s.init()
        })
    },
    354 : function(module, exports, __webpack_require__) {
        var checklogin = __webpack_require__(363),
        pointsFuc = {
            init: function() {
                config = {
                    name: $("#pointsName").val(),
                    points: $("#points").val(),
                    wallet: $("#wallet").val(),
                    pointsid: $("#pointsId").val(),
                    checkpoints: $("#checkpoints").val(),
                    Uname: "",
                    phoneNum: "",
                    address: "",
                    step: 0
                },
                pointsFuc.setup()
            },
            setup: function() {
                $(".slider-click .slider-s-img").bind("click", pointsFuc.clickForSliders),
                $(".btn-points").bind("click", pointsFuc.checkPoints)
            },
            clickForSliders: function() {
                var e = $(this),
                t = e.find(".img").css("backgroundImage");
                $(".slider-click .slider-l-img").css("background-image", t),
                e.addClass("is-active").siblings().removeClass("is-active")
            },
            checkPoints: function() {
                checklogin.init() && ("1" === config.checkpoints ? (config.Uname = "", config.phoneNum = "", config.address = "", config.step = 1, pointsFuc.toShow()) : pointsFuc.toFail())
            },
            toShow: function() {
                var e = "<p>您要兑换的奖品是---</p><p>" + config.name + '。确认兑换将扣除奖品积分<span class="text-red">' + config.points + '</span>，是否立即兑换？</p><div class="mod-btn clearfix ml50"><a class="btn-i bule confirm" href="javascript:void(0)">确认兑换</a><a class="btn-i white ml30 btn-close" href="javascript:void(0)">暂不兑换</a></div>',
                t = pointsFuc.handleHtml(e, "check");
                $(".main").append(t),
                $(".points-exchange-dialog .btn-close").bind("click", pointsFuc.toCannel),
                $(".points-exchange-dialog .confirm").bind("click", pointsFuc.handleInput)
            },
            handleHtml: function(e, t, i) {
                return '<div class="points-exchange-dialog"><div class="mod-mask"></div><div class="mod-dialog ' + t + '"><div class="model"><a class="close ' + (i = i || "btn-close") + '" href="javascript:void(0)"><span class="icon icon-close"></span></a>' + e + "</div></div></div>"
            },
            handleInput: function() {
                config.step = 2;
                var e = '<div class="dialog-header"><span class="icon icon-location"></span>请填写收货信息</div><div class="info"><div class="row"><div class="label">收货人姓名</div><input id="Uname" tabindex="1" type="text" name="name" maxlength="32" autocomplete="off" placeholder="请输入姓名" value="' + config.Uname + '"></div><div class="row"><div class="label">联系方式</div><input id="phoneNum" tabindex="2" type="text" name="phonenum" maxlength="11" autocomplete="off" placeholder="请输入手机号" value="' + config.phoneNum + '"></div><div class="row"><div class="label">收货地址</div><input id="address" tabindex="3" type="text" name="address" maxlength="150" autocomplete="off" placeholder="**省**市**县（区）**街道（小区）**号" value="' + config.address + '"></div></div><p class="tips"></p><div class="mod-btn center clearfix"><a class="btn-i bule is-ture" href="javascript:void(0)">好的</a></div>';
                pointsFuc.handleClose();
                var t = pointsFuc.handleHtml(e, "on");
                $(".main").append(t),
                pointsFuc.inputContrl(),
                $(".points-exchange-dialog .is-ture").bind("click", pointsFuc.handleConfirm),
                $(".points-exchange-dialog .btn-close").bind("click", pointsFuc.toCannel)
            },
            inputContrl: function() {
                $("#Uname").bind("input propertychange",
                function() {
                    var e = $(this).val(),
                    t = !0;
                    /[`~!@#$%^&*()+<>?:"{},.\/;'[\]]/im.test(e) && (t = !1, $(this).addClass("wrong"), pointsFuc.sendError("请不要输入特殊字符哦～")),
                    "" == e && (t = !1, $(this).addClass("wrong"), pointsFuc.sendError("请输入收货人姓名")),
                    t && (config.Uname = e, $(this).removeClass("wrong"), pointsFuc.sendError(""))
                }),
                $("#phoneNum").bind("input propertychange",
                function() {
                    var e = !0;
                    $(this).removeClass("wrong");
                    var t = $(this).val();
                    "" == t && (e = !1, $(this).addClass("wrong"), pointsFuc.sendError("请输入手机号码")),
                    pointsFuc.checkPhoneNum(t) || (e = !1, $(this).addClass("wrong"), pointsFuc.sendError("请输入正确手机号码")),
                    e && (config.phoneNum = t, $(this).removeClass("wrong"), pointsFuc.sendError(""))
                }),
                $("#address").bind("input propertychange",
                function() {
                    var e = !0;
                    $(this).removeClass("wrong");
                    var t = $(this).val();
                    /[`~!@#$%^&*()+<>?:"{},.\/;'[\]]/im.test(t) && (e = !1, $(this).addClass("wrong"), pointsFuc.sendError("请不要输入特殊字符哦～")),
                    "" == t && (e = !1, $(this).addClass("wrong"), pointsFuc.sendError("请输入收货地址")),
                    e && (config.address = t, $(this).removeClass("wrong"), pointsFuc.sendError(""))
                })
            },
            checkPhoneNum: function(e) {
                return /^(1[3|4|5|6|7|8|9])\d{9}$/.test(e)
            },
            handleConfirm: function() {
                var e = "";
                if ("" == config.Uname && (e += "收货人姓名，", $("#Uname").addClass("wrong")), "" == config.phoneNum && (e += "手机号，", $("#phoneNum").addClass("wrong")), "" == config.address && (e += "收货地址", $("#address").addClass("wrong")), "" != config.Uname && "" != config.phoneNum && "" != config.address || (e += "不能为空哦～"), pointsFuc.sendError(e), "" != config.Uname && "" != config.phoneNum && "" != config.address) {
                    config.step = 3;
                    var t = '<div class="dialog-header">请仔细核实收货信息</div><div class="info"><div class="row"><div class="label">收货人姓名</div><p class="text">' + config.Uname + '</p></div><div class="row"><div class="label">联系方式</div><p class="text">' + config.phoneNum + '</p></div><div class="row"><div class="label">收货地址</div><p class="text address">' + config.address + '</p></div></div><div class="mod-btn clearfix ml50"><a class="btn-i bule is-edit" href="javascript:void(0)">修改信息</a><a class="btn-i white ml30 is-submit" href="javascript:void(0)">确认兑换</a></div>';
                    pointsFuc.handleClose();
                    var i = pointsFuc.handleHtml(t, "on");
                    $(".main").append(i),
                    $(".points-exchange-dialog .is-edit").bind("click",
                    function() {
                        pointsFuc.handleInput()
                    }),
                    $(".points-exchange-dialog .is-submit").bind("click", pointsFuc.handleSubmit),
                    $(".points-exchange-dialog .btn-close").bind("click", pointsFuc.toCannel)
                }
            },
            handleSubmit: function() {
                var data = {
                    pointsid: config.pointsid,
                    Uname: config.Uname,
                    phoneNum: config.phoneNum,
                    address: config.address
                };
                $.post("/user/exchangePoints", data,
                function(res) {
                    res = eval("(" + res + ")"),
                    1 == res.Data.StateCode && pointsFuc.toSuccess()
                })
            },
            toSuccess: function() {
                pointsFuc.handleClose();
                var e = pointsFuc.handleHtml('<div class="dialog-header"><span class="icon icon-success"></span>成功兑换！</div><p class="info">兑换后积分将自动扣除，奖品会在15个工作日内寄出，请您耐心等待哟～</p><div class="mod-btn center"><a class="btn-i bule btn-close" href="javascript:void(0)">好的</a></div>', "success");
                $(".main").append(e),
                $(".points-exchange-dialog .btn-close").bind("click", pointsFuc.handleClose),
                pointsFuc.handlePoints()
            },
            handlePoints: function() {
                var e = config.wallet - config.points;
                config.wallet = e,
                $("#Score").text(e),
                e < config.points && (config.checkpoints = "0")
            },
            toFail: function() {
                pointsFuc.handleClose();
                var e = pointsFuc.handleHtml('<p class="info">N币不足无法兑换哦</p><div class="mod-btn center"><a class="btn-i bule btn-close" href="javascript:void(0)">好的</a></div>', "fail");
                $(".main").append(e),
                $(".points-exchange-dialog .btn-close").bind("click", pointsFuc.handleClose)
            },
            toCannel: function() {
                pointsFuc.handleClose();
                var e = pointsFuc.handleHtml('<p class="info">您想要放弃兑换吗？</p><div class="mod-btn center"><a class="btn-i bule btn-close" href="javascript:void(0)">是的</a></div>', "cannel", "btn-cannel");
                $(".main").append(e),
                $(".points-exchange-dialog .btn-close").bind("click", pointsFuc.handleClose),
                $(".points-exchange-dialog .btn-cannel").bind("click",
                function() {
                    switch (pointsFuc.handleClose(), config.step) {
                    case 1:
                        pointsFuc.toShow();
                        break;
                    case 2:
                        pointsFuc.handleInput();
                        break;
                    case 3:
                        pointsFuc.handleConfirm();
                        break;
                    default:
                        pointsFuc.handleClose()
                    }
                })
            },
            handleClose: function() {
                $(".main").find(".points-exchange-dialog").remove()
            },
            sendError: function(e) {
                $(".points-exchange-dialog .tips").text(e)
            }
        };
        $(function() {
            "points_detail" == $("#pageSign").val() && pointsFuc.init()
        })
    },
    355 : function(e, t, i) {
        i(363);
        var a = {
            init: function() {
                a.setup()
            },
            setup: function() {
                $(".act1808_joinUs").bind("click", a.joinUs)
            },
            joinUs: function() {
                var e = $.cookie("usertoken");
                e && "" != e ? window.open("http://www.acgneta.com") : window.open("http://www.acgneta.com/register")
            }
        };
        $(function() {
            "Act1808" == $("#pageSign").val() && a.init()
        })
    },
    356 : function(e, t, i) {
        var a, n = i(364),
        s = {
            init: function() {
                a = {
                    toTopBtn: $(".ToTop a")
                },
                s.setup()
            },
            setup: function() {
                $(window).scroll(function() {
                    var e = document.documentElement.scrollTop || document.body.scrollTop;
                    window.screen.height / 2 <= e ? $(".ToTop").slideDown() : $(".ToTop").slideUp()
                }),
                a.toTopBtn.bind("click", s.gototop)
            },
            gototop: function() {
                n.init("top")
            }
        };
        $(function() {
            s.init()
        })
    },
    357 : function(e, t, i) {
        i(329);
        $(function() {})
    },
    358 : function(e, t, i) {
        var a = i(363),
        n = i(330),
        s = $(".mod-news-detail-comment .comment-wrapper .comment-input");
        s.empty();
        var o = parseInt($(".inner-container").attr("data-newId")),
        c = $(".mod-news-detail-comment .comment-wrapper .comment-btn"),
        d = {
            init: function() {
                d.setup()
            },
            setup: function() {
                d.suspension(),
                d.inputChange(),
                c.bind("click", d.addComment),
                $(".content-wrapper").mouseover(d.hoverDelete),
                $(".content-wrapper").mouseout(d.mouseOut),
                $(".delete").bind("click", d.deleteComment),
                $(".reply").bind("click", d.replyComment),
                $(".awesome-userLikes").bind("click", d.userLikes),
                $(".awesome-userDislikes").bind("click", d.userDislikes),
                d.listHover()
            },
            userLikes: function() {
                var e = $(this),
                t = {
                    id: parseInt(o),
                    commentId: parseInt($(this).parents(".content-wrapper").attr("data-commentId"))
                };
                n.init(e, "/article/like", t, ".likeNum", "userLikes") && $(this).siblings(".awesome-userDislikes").hasClass("userDislikes") && ($(this).siblings(".awesome-userDislikes").removeClass("userDislikes"), $(this).siblings(".awesome-userDislikes").find(".dislikeNum").text(parseInt($(this).siblings(".awesome-userDislikes").find(".dislikeNum").text()) - 1))
            },
            suspension: function() {
                $(window).scroll(function() {
                    $(window).scrollTop() > 38 ? ($(".article-leftNav").css("position", "fixed"), $(".article-articlesCon").css("marginLeft", "146px")) : ($(".article-leftNav").css("position", "static"), $(".article-articlesCon").css("marginLeft", "0"))
                })
            },
            inputChange: function() {
                var e = $(".mod-news-detail-comment .comment-wrapper .prompt");
                s.bind("click",
                function() {
                    a.init(),
                    s.attr("contentEditable", "true"),
                    c.show(),
                    s.focus()
                }),
                s.blur(function() {
                    s.addClass("blur"),
                    s.text().length > 0 && s.attr("placeholder", "")
                }),
                s.bind("DOMSubtreeModified",
                function(t) {
                    s.find("img").remove(),
                    $(".mod-news-detail-comment .comment-wrapper .comment-input  *").attr("style", ""),
                    $(".mod-news-detail-comment .comment-wrapper .comment-input  *").attr("class", "");
                    var i = s.text().length;
                    s.text().length >= 500 && (s.text(s.text().slice(0, 499)), s.blur()),
                    i >= 0 ? (e.html("<em>" + i + "</em>/500"), e.css("visibility", "visible"), c.removeClass("unavailable"), c.addClass("available"), c.css("opacity", 1)) : (c.addClass("unavailable"), c.css("opacity", .5))
                })
            },
            addComment: function() {
                var e = $(".mod-news-detail-comment .comment-input").text();
                if ("" == $.trim(e)) return ! 1;
                var t = {
                    newsId: o,
                    content: e
                };
                $.ajax({
                    url: "/article/AddComment",
                    data: t,
                    type: "POST",
                    dataType: "json",
                    success: function(e) {
                        1 == e.Data.StateCode && location.reload()
                    }
                })
            },
            hoverDelete: function() {
                $(this).attr("data-Uid") == $(this).attr("data-fromUid") && $(this).find(".delete").addClass("show")
            },
            mouseOut: function() {
                $(this).find(".delete").removeClass("show")
            },
            deleteComment: function() {
                var e = $(this).parent().find(".pop");
                $(".pop").removeClass("show"),
                $(this).addClass("show"),
                $(".delete").attr("id", "0"),
                $(this).attr("id", "delete-show"),
                $(this).parents(".attach-delete").find(".delete").attr("id", "delete-show"),
                e.addClass("show"),
                e.find(".cancel").click(function() {
                    e.removeClass("show"),
                    $(this).parents(".attach-delete").find(".delete").attr("id", "none")
                }),
                e.find(".confirm").click(function() {
                    var e = {
                        commentId: $(this).attr("data-commentId")
                    };
                    $.ajax({
                        url: "/article/DeleteComment",
                        data: e,
                        dataType: "json",
                        success: function(e) {
                            location.reload()
                        }
                    })
                })
            },
            replyComment: function() {
                a.init(),
                $("html,body").animate({
                    scrollTop: $(".comment-wrapper").offset().top
                },
                500);
                $(this).attr("data-name");
                var e = $(this).attr("data-Uid"),
                t = $(this).attr("data-fromUid"),
                i = $(this).attr("data-commentId");
                s.focus(),
                s.attr("contenteditable", "true"),
                s.addClass("blur"),
                $(".comment-btn").css("display", "inline-block"),
                s.focus(),
                c.unbind("click"),
                c.bind("click",
                function() {
                    var a = s.text(),
                    n = {
                        newsId: o,
                        commentId: i,
                        fromUid: e,
                        toUid: t,
                        content: a
                    };
                    $.ajax({
                        url: "/article/AddReply",
                        data: n,
                        dataType: "json",
                        success: function(e) {
                            location.reload()
                        }
                    })
                })
            },
            listHover: function() {
                $(".list-articles-width li").hover(function() {
                    $(this).find(".article-articleName").addClass("a-hover")
                },
                function() {
                    $(this).find(".article-articleName").removeClass("a-hover")
                }),
                $(".list-articles-width li").bind("click",
                function() {
                    window.open($(this).attr("data-url"))
                })
            }
        };
        $(function() {
            "article" == $("#pageSign").val() && d.init()
        })
    },
    359 : function(e, t) {
        var i = {
            init: function() {
                i.setup()
            },
            setup: function() {
                $(".main").css("height", $(window).height() - 38),
                $(".main").addClass("downloadMain"),
                $(".download").css("height", $(window).height() - 38),
                $(".download_bottom").css("margin-top", 38)
            }
        };
        $(function() {
            "download" == $("#pageSign").val() && i.init()
        })
    },
    360 : function(e, t) {
        var i = {
            init: function() {
                i.setup()
            },
            setup: function() {
                $(".index-download").hover(function() {
                    $(".index-download ul").show()
                },
                function() {
                    $(".index-download ul").hide()
                })
            }
        };
        $(function() {
            i.init()
        })
    },
    361 : function(e, t) {
        var i = {
            init: function() {
                configs = {
                    PHPSESSID: $.cookie("PHPSESSID"),
                    TIME: (new Date).toLocaleDateString()
                },
                i.setup()
            },
            setup: function() {
                i.showDownload(),
                $(".index_download_footer-close").bind("click", i.closeDownload),
                $(".index_download_footer-btn").bind("click", i.goDownloadPage)
            },
            showDownload: function() {
                null == localStorage.getItem("userId") && (localStorage.setItem("userId", configs.PHPSESSID), localStorage.setItem("time", configs.TIME)),
                "true" != localStorage.getItem("userClick") && $(".index_download_footer").show(),
                (new Date).toLocaleDateString() != localStorage.getItem("time") && "true" == localStorage.getItem("userClick") && ($(".index_download_footer").show(), localStorage.setItem("time", configs.TIME), localStorage.setItem("userClick", "false"))
            },
            closeDownload: function() {
                $(".index_download_footer").hide(),
                localStorage.setItem("userClick", "true")
            },
            goDownloadPage: function() {
                window.open("http://www.acgneta.com/download")
            }
        };
        $(function() {
            i.init()
        })
    },
    362 : function(e, t, i) {
        var a = i(333),
        n = {
            pageArg: {
                url: "/user/SubscribeListPage",
                resType: "JSON",
                async: !1,
                data: {
                    type: 1,
                    pageindex: 1,
                    id: 0
                }
            },
            init: function() {
                n.setup()
            },
            setup: function() {
                $(".catch_page li").bind("click", n.getPageNum),
                $(".pageHiden").unbind("click", n.getPageNum)
            },
            getPageNum: function() {
                var e = $(this).text();
                if ($(this).hasClass("onClick") || $(this).hasClass(".pageHiden")) return ! 1;
                if ("下一页" == e) {
                    if ($(".onClick").text() == parseInt($(".user_center_catchInfo").attr("attr-usertotalpage"))) return ! 1;
                    n.getPage(parseInt($(".onClick").text()) + 1),
                    $(".onClick").next().addClass("onClick"),
                    $(".onClick").prev().removeClass("onClick"),
                    $(".onClick").hasClass("pageNone") && ($(".onClick").css("display", "block"), $(".onClick").next().hasClass("pageHiden") ? $(".onClick").next().css("display", "none") : $(".onClick").next().hasClass("pageNone") && ($(".catch_page li").eq(parseInt($(".onClick").text()) - 10 + 1).css("display", "none"), $(".catch_page li").eq(parseInt($(".onClick").text()) - 10 + 1).addClass("pageNone"), $(".pageHiden").eq(0).css("display", "block")))
                } else if ("上一页" == e) {
                    if ($(".user_center_catchInfo").attr("attr-usertotalpage") > 10) {
                        if (1 == parseInt($(".onClick").text()) && $(".catch_page li").eq(parseInt($(".onClick").text()) + 10 + 1).hasClass("pageNone")) return ! 1
                    } else if (1 == parseInt($(".onClick").text()) || $(".catch_page li").eq(parseInt($(".onClick").text()) + 10 + 1).hasClass("pageNone")) return ! 1;
                    n.getPage(parseInt($(".onClick").text()) - 1),
                    $(".onClick").prev().addClass("onClick"),
                    $(".onClick").next().removeClass("onClick"),
                    $(".onClick").hasClass("pageNone") && ($(".onClick").css("display", "block"), $(".onClick").prev().hasClass("pageHiden") ? $(".onClick").prev().css("display", "none") : $(".onClick").prev().hasClass("pageNone") && ($(".catch_page li").eq(parseInt($(".onClick").text()) + 10 + 1).css("display", "none"), $(".catch_page li").eq(parseInt($(".onClick").text()) + 10 + 1).addClass("pageNone"), $(".pageHiden").eq(1).css("display", "block")))
                } else $(this).parents(".catch_page").find("li").eq(parseInt(e) + 10 + 1).hasClass("pageNone") && ($(this).parents(".catch_page").find("li").eq(parseInt(e) + 10 + 1).css("display", "none"), $(".pageHiden").eq(1).css("display", "block")),
                n.getPage(parseInt(e)),
                $(this).addClass("onClick").siblings().removeClass("onClick")
            },
            getPage: function(e) {
                var t = e;
                "userCatch" == $("#pageSign").val() ? n.pageArg.data.type = 1 : n.pageArg.data.type = 2,
                n.pageArg.data.pageindex = t,
                n.pageArg.data.id = parseInt($(".container_top").attr("attr-userid"));
                var i = a.init(n.pageArg);
                if (0 != i.result) {
                    $(".user_center_catchInfo > ul").remove();
                    for (var s = 0; s < i.resJSON.length; s++) {
                        var o = '<ul class="user_center_catch_animesInfo"><li class="user_center_animesInfoImg"><a href="/animes/' + i.resJSON[s].Id + '.html" target="_blank"><img src="' + i.resJSON[s].CoverImg + '"></a></li><li class="user_center_catch_animesName"><a href="/animes/' + i.resJSON[s].Id + '.html" target="_blank"><em>' + i.resJSON[s].Name + '</em></a></li><li class="user_center_catch_playType">',
                        c = "";
                        "" != i.resJSON[s].PlayUrl ? "连载中" == i.resJSON[s].PlayType ? c = '<a href="' + i.resJSON[s].PlayUrl + '" target="_blank">更新至<em class=' + (0 == i.resJSON[s].IsUpdated ? "": "IsUpdated") + "> " + i.resJSON[s].WordCount + "</em></a></li></ul>": "已完结" == i.resJSON[s].PlayType && (c = '<a href="/animes/' + i.resJSON[s].Id + '.html" target="_blank">全' + i.resJSON[s].WordCount + "话</a></li></ul>") : c = '<a href="/animes/' + i.resJSON[s].Id + '.html" target="_blank">待更新</a></li></ul>',
                        $(".user_center_catchInfo").append(o + c)
                    }
                }
            }
        };
        $(function() {
            var e = $("#pageSign").val();
            "userCatch" != e && "userOver" != e || n.init()
        })
    },
    363 : function(e, t) {
        var i = {
            init: function() {
                return !! {
                    state: $.cookie("userstate"),
                    uname: $.cookie("uname"),
                    IfRealName: $.cookie("IfRealName"),
                    IfClass: $.cookie("IfClass")
                }.state || (window.location.href = "/login?forward=" + location.href, !1)
            }
        };
        e.exports = i
    },
    364 : function(e, t) {
        var i, a, n = {
            init: function(e) {
                i = {
                    current: e
                },
                n.setup()
            },
            setup: function() {
                n.scroller(i.current, 800)
            },
            intval: function(e) {
                return e = parseInt(e),
                isNaN(e) ? 0 : e
            },
            getPos: function(e) {
                for (var t = 0,
                i = 0,
                a = this.intval(e.style.width), n = this.intval(e.style.height), s = e.offsetWidth, o = e.offsetHeight; e.offsetParent;) t += e.offsetLeft + (e.currentStyle ? this.intval(e.currentStyle.borderLeftWidth) : 0),
                i += e.offsetTop + (e.currentStyle ? this.intval(e.currentStyle.borderTopWidth) : 0),
                e = e.offsetParent;
                return {
                    x: t += e.offsetLeft + (e.currentStyle ? this.intval(e.currentStyle.borderLeftWidth) : 0),
                    y: i += e.offsetTop + (e.currentStyle ? this.intval(e.currentStyle.borderTopWidth) : 0),
                    w: a,
                    h: n,
                    wb: s,
                    hb: o
                }
            },
            getScroll: function() {
                var e, t, i, a;
                return document.documentElement && document.documentElement.scrollTop ? (e = document.documentElement.scrollTop, t = document.documentElement.scrollLeft, i = document.documentElement.scrollWidth, a = document.documentElement.scrollHeight) : document.body && (e = document.body.scrollTop, t = document.body.scrollLeft, i = document.body.scrollWidth, a = document.body.scrollHeight),
                {
                    t: e,
                    l: t,
                    w: i,
                    h: a
                }
            },
            scroller: function(e, t) {
                if ("object" != typeof e && (e = document.getElementById(e)), e) {
                    var i = this;
                    i.el = e,
                    i.p = this.getPos(e),
                    i.s = this.getScroll(),
                    i.clear = function() {
                        window.clearInterval(i.timer),
                        i.timer = null
                    },
                    i.clear(),
                    i.t = (new Date).getTime(),
                    i.step = function() {
                        var e = (new Date).getTime(),
                        n = (e - i.t) / t;
                        e >= t + i.t ? (i.clear(), window.setTimeout(function() {
                            i.scroll(i.p.y, i.p.x)
                        },
                        13)) : (a = ( - Math.cos(n * Math.PI) / 2 + .5) * (i.p.y - i.s.t) + i.s.t, sl = ( - Math.cos(n * Math.PI) / 2 + .5) * (i.p.x - i.s.l) + i.s.l, i.scroll(a, sl))
                    },
                    i.scroll = function(e, t) {
                        window.scrollTo(t, e)
                    },
                    i.timer = window.setInterval(function() {
                        i.step()
                    },
                    13)
                }
            }
        };
        e.exports = n
    },
    365 : function(e, t) {
        var i, a = {
            init: function() {
                i = {
                    searchInput: $("#keyword"),
                    submitButton: $(".search-submit")
                },
                a.setup()
            },
            setup: function() {
                i.submitButton.bind("click", a.searchHref),
                i.searchInput.bind("keydown", a.keydown)
            },
            searchHref: function() {
                var e = $.trim(i.searchInput.val());
                "" != e && (window.location.href = "/tag/0-0-0-0-default-0-0-1.html?keyWord=" + e)
            },
            keydown: function(e) {
                if (13 == e.keyCode) return a.searchHref(),
                !1
            }
        };
        e.exports = a
    },
    366 : function(e, t, i) {
        var a, n = i(332),
        s = {
            init: function(e, t, i, n, o) { (a = {
                    container: document.getElementById("comment-container"),
                    columnPage: 1,
                    columnPageSize: n,
                    columnNumber: e,
                    columnWidth: t,
                    indexColumn: 1,
                    scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
                    detectLeft: 0,
                    loadFinish: !1,
                    ajaxUrl: "/commentApi/hotCommentList/",
                    pageNum: 0,
                    needScoll: i,
                    isVote: o
                }).container && (s.getData(), a.needScoll && s.scroll())
            },
            getIndex: function() {
                var e = a.indexColumn,
                t = e % a.columnNumber;
                return e > a.columnNumber && (e = 1, a.indexColumn = 1),
                0 == t && (e = a.columnNumber),
                e
            },
            scroll: function() {
                return window.onscroll = function() {
                    var e = document.documentElement.scrollTop || document.body.scrollTop;
                    a.columnPage < a.pageNum && !a.loadFinish && Math.abs(e - a.scrollTop) > 400 && (a.scrollTop = e, a.loadFinish = !1, a.columnPage += 1, s.getData())
                },
                this
            },
            composHtml: function(e) {
                if (1 == a.columnPage) {
                    var t = 0,
                    i = "",
                    o = "";
                    for (t = 0; t < a.columnNumber; t += 1) 3 == a.columnNumber && (o = 1 == t ? "margin: 0 40px;": ""),
                    i = i + '<ul id="waterFallColumn_' + (t + 1) + '" class="comment-column" style="' + o + "width:" + a.columnWidth + 'px;"></ul> ';
                    i += '<span id="waterFallDetect"></span>',
                    a.container.innerHTML = i
                }
                for (var c = "",
                d = e.Data.List,
                l = 0; l < d.length; l += 1) {
                    var r = d[l],
                    u = s.getIndex();
                    c = s.composToItem(r),
                    $("#waterFallColumn_" + u).append(c),
                    a.indexColumn++
                }
                return a.detectLeft = document.getElementById("waterFallDetect").offsetLeft,
                n.init(),
                this
            },
            composToItem: function(e) {
                var t = "",
                i = a.isVote ? "btn-up": "",
                n = !1;
                return e.textHide && (n = !0),
                t += '<li id="Comment-' + e.Id + '"><div class="con-i"><div class="userInfo clearfix"><div class="img"><a target="_blank" href="/user/' + e.FromUid + '" title="' + e.FromNickname + '"><img src="' + e.FromUserImg + '" onerror=\'this.onerror=null;this.src="/asset/images/def_avater.png"\' ></a></div><h3 class="name"><a target="_blank" href="/user/' + e.FromUid + '" title="' + e.FromNickname + '">' + e.FromNickname + '</a></h3><span class="mod-level ml10"><i>LV.' + e.FromTbLevel + '</i></span></div><div class="con-des">' + decodeURIComponent(e.Content) + '</div><div class="con-btn clearfix">' + (n ? '<a class="more" target="_blank" href="/comment/' + e.AnimationId + "/" + e.Id + '/1.html" >查看全部 ></a>': "") + '<div class="comment-operate"><div class="operate-r" data-animeId="' + e.AnimationId + '" data-commentId="' + e.Id + '"><a class="commentLike ' + (0 == e.UidLikes ? i: "vote-up") + '" href="javascript:void(0)"><span class="icon icon-operate icon-up"></span><span class="like-count">' + e.Likes + '</span></a><a class="commentDislike ' + (0 == e.UidDislikes ? i: "vote-down") + '" href="javascript:void(0)"><span class="icon icon-operate icon-down"></span><span class="dislike-count">' + e.Dislikes + '</span></a><a class="btn-share commentshare" nob="' + e.Id + '" locid="1" href="javascript:void(0)" data-animeId="' + e.AnimationId + '" data-commentId="' + e.Id + '" qq-desc="' + encodeURIComponent(e.Content) + '" qq-pics="" qq-title="' + encodeURIComponent(e.FromNickname + "发起了对" + e.AnimationName + "的评论") + '" qq-summary="">分享</a><a class="btn-reply" target="_blank" href="/comment/' + e.AnimationId + "/" + e.Id + '/1.html">回复（' + e.ReplyCount + '）</a></div></div></div><div class="animes-info clearfix"><a class="pro-name" title="' + e.AnimationName + '" href="/animes/' + e.AnimationId + '.html" target="_blank">' + e.AnimationName + '</a><div class="rating-des"><div class="star-area-s"><span class="star star_' + Math.floor(e.Score) + '"></span></div></div></div></div></li>'
            },
            getData: function() {
                $.ajax({
                    url: a.ajaxUrl + "?page=" + a.columnPage + "&pz=" + a.columnPageSize + "&t=" + (new Date).getTime(),
                    success: function(e) {
                        "" != e.Data.List && (a.pageNum = e.Data.TotalPage, a.pageNum < 2 && (a.loadFinish = !0), s.composHtml(e))
                    },
                    dataType: "json"
                })
            }
        };
        e.exports = s
    }
}]);