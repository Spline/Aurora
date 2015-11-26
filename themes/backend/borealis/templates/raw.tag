<raw>
  <span></span>
  var that = this;
  var updateHTML = function () {
		that.root.innerHTML = opts.content || "";
	};
  updateHTML();
  this.on('updated', updateHTML);
</raw>
