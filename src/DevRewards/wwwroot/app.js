!function($) {
    $.fn.slabText = function(options) {
        var settings = {
            fontRatio: .78,
            forceNewCharCount: !0,
            wrapAmpersand: !0,
            headerBreakpoint: null,
            viewportBreakpoint: null,
            noResizeEvent: !1,
            resizeThrottleTime: 300,
            maxFontSize: 999,
            postTweak: !0,
            precision: 3,
            minCharsPerLine: 0
        };
        return $("body").addClass("slabtexted"), this.each(function() {
            options && $.extend(settings, options);
            var $this = $(this), keepSpans = $("span.slabtext", $this).length, words = keepSpans ? [] : String($.trim($this.text())).replace(/\s{2,}/g, " ").split(" "), origFontSize = null, idealCharPerLine = null, fontRatio = settings.fontRatio, forceNewCharCount = settings.forceNewCharCount, headerBreakpoint = settings.headerBreakpoint, viewportBreakpoint = settings.viewportBreakpoint, postTweak = settings.postTweak, precision = settings.precision, resizeThrottleTime = settings.resizeThrottleTime, minCharsPerLine = settings.minCharsPerLine, resizeThrottle = null, viewportWidth = $(window).width(), headLink = $this.find("a:first").attr("href") || $this.attr("href"), linkTitle = headLink ? $this.find("a:first").attr("title") : "";
            if (!(!keepSpans && minCharsPerLine && words.join(" ").length < minCharsPerLine)) {
                var grabPixelFontSize = function() {
                    var dummy = jQuery('<div style="display:none;font-size:1em;margin:0;padding:0;height:auto;line-height:1;border:0;">&nbsp;</div>').appendTo($this), emH = dummy.height();
                    return dummy.remove(), emH;
                }, resizeSlabs = function() {
                    var fs, parentWidth = $this.width();
                    if (0 !== parentWidth) {
                        if ($this.removeClass("slabtextdone slabtextinactive"), viewportBreakpoint && viewportBreakpoint > viewportWidth || headerBreakpoint && headerBreakpoint > parentWidth) return void $this.addClass("slabtextinactive");
                        if (fs = grabPixelFontSize(), keepSpans || !forceNewCharCount && fs == origFontSize) origFontSize = fs; else {
                            origFontSize = fs;
                            var slice, preDiff, postDiff, newCharPerLine = Math.min(60, Math.floor(parentWidth / (origFontSize * fontRatio))), wordIndex = 0, lineText = [], preText = "", postText = "", finalText = "";
                            if (0 != newCharPerLine && newCharPerLine != idealCharPerLine) {
                                for (idealCharPerLine = newCharPerLine; wordIndex < words.length; ) {
                                    for (postText = ""; postText.length < idealCharPerLine && (preText = postText, postText += words[wordIndex] + " ", 
                                    !(++wordIndex >= words.length)); ) ;
                                    minCharsPerLine && (slice = words.slice(wordIndex).join(" "), slice.length < minCharsPerLine && (postText += slice, 
                                    preText = postText, wordIndex = words.length + 2)), preDiff = idealCharPerLine - preText.length, 
                                    postDiff = postText.length - idealCharPerLine, postDiff > preDiff && preText.length >= (minCharsPerLine || 2) ? (finalText = preText, 
                                    wordIndex--) : finalText = postText, finalText = $("<div/>").text(finalText).html(), 
                                    settings.wrapAmpersand && (finalText = finalText.replace(/&amp;/g, '<span class="amp">&amp;</span>')), 
                                    finalText = $.trim(finalText), lineText.push('<span class="slabtext">' + finalText + "</span>");
                                }
                                $this.html(lineText.join(" ")), headLink && $this.wrapInner('<a href="' + headLink + '" ' + (linkTitle ? 'title="' + linkTitle + '" ' : "") + "/>");
                            }
                        }
                        $("span.slabtext", $this).each(function() {
                            var diff, ratio, fontSize, $span = $(this), innerText = $span.text(), wordSpacing = innerText.split(" ").length > 1;
                            postTweak && $span.css({
                                "word-spacing": 0,
                                "letter-spacing": 0
                            }), ratio = parentWidth / $span.width(), fontSize = parseFloat(this.style.fontSize) || origFontSize, 
                            $span.css("font-size", Math.min((fontSize * ratio).toFixed(precision), settings.maxFontSize) + "px"), 
                            diff = postTweak ? parentWidth - $span.width() : !1, diff && $span.css((wordSpacing ? "word" : "letter") + "-spacing", (diff / (wordSpacing ? innerText.split(" ").length - 1 : innerText.length)).toFixed(precision) + "px");
                        }), $this.addClass("slabtextdone");
                    }
                };
                resizeSlabs(), settings.noResizeEvent || $(window).resize(function() {
                    $(window).width() != viewportWidth && (viewportWidth = $(window).width(), clearTimeout(resizeThrottle), 
                    resizeThrottle = setTimeout(resizeSlabs, resizeThrottleTime));
                });
            }
        });
    };
}(jQuery), function() {
    angular.module("rewardsServices", [ "ngResource" ]), angular.module("rewardsApp", [ "rewardsServices" ]);
}(), function() {
    angular.module("rewardsApp").controller("featsController", [ "$scope", "Feats", function($scope, Feats) {
        $scope.feats = Feats.query();
    } ]);
}(), function() {
    angular.module("rewardsApp").controller("rewardsController", [ "$scope", "Rewards", "Claims", "$rootScope", function($scope, Rewards, Claims, $rootScope) {
        $scope.rewards = Rewards.query(), $scope.claimed = [], $scope.claim = function(rewardId) {
            var newClaim = new Claims({
                userId: 1,
                rewardId: rewardId
            });
            newClaim.$save(function(claim, headers) {
                $scope.claimed[rewardId] = !0, $rootScope.$broadcast("rewardClaimed", {
                    rewardId: claim.rewardId
                });
            });
        };
    } ]);
}(), function() {
    angular.module("rewardsApp").controller("userController", [ "$scope", "Users", function($scope, Users) {
        function setUser() {
            console.log("before get");
            var user = Users.get({
                id: 1
            });
            console.log("after get"), console.log("user:" + JSON.stringify(user)), user.$promise.then(function(data) {
                $scope.name = data.name, $scope.points = data.points;
            });
        }
        $scope.$on("rewardClaimed", function(event, args) {
            console.log("event found!"), setUser();
        }), setUser();
    } ]);
}(), function() {
    "use strict";
    function banner($window) {
        function link(scope, element, attrs) {
            element.slabText();
        }
        var directive = {
            link: link,
            restrict: "E",
            templateUrl: "Views/banner.html"
        };
        return directive;
    }
    angular.module("rewardsApp").directive("banner", banner), banner.$inject = [ "$window" ];
}(), function() {
    "use strict";
    function feats($window) {
        function link(scope, element, attrs) {}
        var directive = {
            link: link,
            restrict: "E",
            templateUrl: "Views/featsList.html"
        };
        return directive;
    }
    angular.module("rewardsApp").directive("feats", feats), feats.$inject = [ "$window" ];
}(), function() {
    "use strict";
    function reward($window) {
        function link(scope, element, attrs) {}
        var directive = {
            link: link,
            restrict: "E",
            templateUrl: "Views/reward.html"
        };
        return directive;
    }
    angular.module("rewardsApp").directive("reward", reward), reward.$inject = [ "$window" ];
}(), function() {
    "use strict";
    function rewards($window) {
        function link(scope, element, attrs) {}
        var directive = {
            link: link,
            restrict: "E",
            templateUrl: "Views/rewardsList.html"
        };
        return directive;
    }
    angular.module("rewardsApp").directive("rewards", rewards), rewards.$inject = [ "$window" ];
}(), function() {
    angular.module("rewardsServices").factory("Claims", [ "$resource", function($resource) {
        return $resource("/api/Claims/:id", {
            id: "@id"
        }, {});
    } ]);
}(), function() {
    angular.module("rewardsServices").factory("Feats", [ "$resource", function($resource) {
        return $resource("/api/Feats/", {}, {});
    } ]);
}(), function() {
    angular.module("rewardsServices").factory("Rewards", [ "$resource", function($resource) {
        return $resource("/api/Rewards/", {}, {});
    } ]);
}(), function() {
    angular.module("rewardsServices").factory("Users", [ "$resource", function($resource) {
        return $resource("/api/users/:id", {
            id: "@id"
        }, {});
    } ]);
}();