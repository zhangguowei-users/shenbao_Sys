/**
 * jQuery step  Plug-in v1.0
 * created : 2015-05-26 10:30:26
 * last update : 2015-05-27 15:23:16
 * author:zhengyong
 */
(function(factory) {
		"use strict";
		if(typeof define === 'function') {
			// using CMD; register as anon module
			define.cmd && define('jquery-step', ['jquery'], function(require, exports, moudles) {
				var $ = require("jquery");
				factory($);
				return $;
			});
			define.amd && define(['jquery'], factory);
		} else {
			// no CMD; invoke directly
			factory((typeof(jQuery) != 'undefined') ? jQuery : window.Zepto);
		}
	}

	(function($) {
		$.fn.step = function(options) {
			var opts = $.extend({}, $.fn.step.defaults, options);
			var size = this.find(".step-header li").length;
			var barWidth = opts.initStep < size ? 100 / (2 * size) + 100 * (opts.initStep - 1) / size : 100;
			var curPage = opts.initStep;

			this.find(".step-header").prepend("<div class=\"step-bar\"><div class=\"step-bar-active\"></div></div>");
			this.find(".step-list").eq(opts.initStep - 1).show();
			if(size < opts.initStep) {
				opts.initStep = size;
			}
			if(opts.animate == false) {
				opts.speed = 0;
			}
			this.find(".step-header li").each(function(i, li) {
				if(i < opts.initStep) {
					$(li).addClass("step-active");
				}
				$(li).prepend("<span>" + (i + 1) + "</span>");
			});
			this.find(".step-header li").css({
				"width": 100 / size + "%"
			});
			this.find(".step-header").show();
			this.find(".step-bar-active").animate({
					"width": barWidth + "%"
				},
				opts.speed,
				function() {

				});

			this.nextStep = function() {
				if(curPage >= size) {
					return false;
				}
				if(curPage + 1 == "2") {
					$("#two").text("第二步")
					$("#nextBtn").show();
					$("#preBtn").show();
					$("#nextBtn").text("开始审核")
				} else if(curPage + 1 == "3" || curPage + 1 == "4") {
					$("#nextBtn").hide();
					$("#preBtn").hide();
				} else {
					$("#nextBtn").show();
					$("#preBtn").show();
					$("#nextBtn").text("下一步")
				}

				return this.goStep(curPage + 1);
			}

			this.preStep = function() {
				if(curPage <= 1) {
					return false;
				}
				if(curPage - 1 == "2") {
					$("#nextBtn").show();
					$("#preBtn").show();
					$("#nextBtn").text("开始审核")
				} else if(curPage - 1 == "3" || curPage - 1 == "4") {
					$("#nextBtn").hide();
					$("#preBtn").hide();
				} else {
					$("#nextBtn").show();
					$("#preBtn").show();
					$("#nextBtn").text("下一步")
				}

				return this.goStep(curPage - 1);
			}

			this.goStep = function(page) {
				if(page == "1"){
					$("#one").text("第一步")
				}
				if(page == "2"){
					$("#two").text("第二步")
				}
				if(page == "3"){
					$("#three").text("第三步")
				}
				if(page == "4"){
					$("#four").text("完成")
				}
				if(page == undefined || isNaN(page) || page < 0) {
					if(window.console && window.console.error) {
						console.error('the method goStep has a error,page:' + page);
					}
					return false;
				}
				curPage = page;
				this.find(".step-list").hide();
				this.find(".step-list").eq(curPage - 1).show();
				this.find(".step-header li").each(function(i, li) {
					$li = $(li);
					$li.removeClass('step-active');
					if(i < page) {
						$li.addClass('step-active');
						if(opts.scrollTop) {
							$('html,body').animate({
								scrollTop: 0
							}, 'slow');
						}
					}
				});
				barWidth = page < size ? 100 / (2 * size) + 100 * (page - 1) / size : 100;
				this.find(".step-bar-active").animate({
						"width": barWidth + "%"
					},
					opts.speed,
					function() {

					});
				return true;
			}
			return this;
		};

		$.fn.step.defaults = {
			animate: true,
			speed: 500,
			initStep: 1,
			scrollTop: true
		};

	}));