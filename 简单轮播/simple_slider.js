function SimpleSlider($slider) {
	this.$slider = $slider
	this.$innerCt = $(this.$slider).children(".items-wrap")
	this.$items = this.$innerCt.children()
	this.ctWidth = this.$slider.width()
	this.$pre = this.$slider.find(".slider-wrap-pre")
	this.$next = this.$slider.find(".slider-wrap-next")
	this.curIndex = 1
	this.isLoad = false
	this.init(this.$slider)
}
SimpleSlider.prototype.init = function() {
	this.$items.last().clone().prependTo(this.$innerCt)
	this.$items.first().clone().appendTo(this.$innerCt)
	this.$items = this.$innerCt.children()
	this.count = this.$items.length
	this.$innerCt.css({
		width: this.count * this.ctWidth,
		left: 0 - this.ctWidth
	})
	this.bind(this.$slider)
}
SimpleSlider.prototype.bind = function() {
	var _this = this
	this.$pre.on("click", function() {
		_this.play(_this.curIndex - 1)

	})
	this.$next.on("click", function() {
		_this.play(_this.curIndex + 1)
	})
	this.autoPlay()

}
SimpleSlider.prototype.play = function(index) {
		var _this = this,
			count = this.count,
			$warp = this.$innerCt
		if(this.isLoad === true) {
			return
		}
		this.isLoad = true
		if(index > 0 && index < count - 1) {
			$warp.animate({
				left: (0 - index * _this.ctWidth)
			}, 400, function() {
				_this.curIndex = index
				_this.isLoad = false
			})
		} else if(index === (count - 1)) {
			$warp.animate({
				left: (0 - index * (_this.ctWidth + 1))
			}, 400, function() {
				_this.curIndex = 1
				$warp.css({
					left: 0 - _this.ctWidth
				})
				_this.isLoad = false
				_this.curIndex = 1

			})
		} else if(index === 0) {
			$warp.animate({
				left: 0
			}, 400, function() {
				_this.curIndex = (count - 2)
				$warp.css({
					left: 0 - (count - 2) * _this.ctWidth
				})
				_this.isLoad = false
			})
		}
	}
	//			自动播放,默认为4秒
SimpleSlider.prototype.autoPlay = function() {
	var _this = this
	setInterval(function() {
		_this.play(_this.curIndex + 1)
	}, 4000)
}