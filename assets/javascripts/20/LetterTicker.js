(function() {
  window.LetterTicker = (function() {
    var mergeOptions, randomChar;

    LetterTicker.prototype.step = 8;

    LetterTicker.prototype.fps = 24;

    LetterTicker.prototype.text = '';

    LetterTicker.prototype.callback = function() {};

    LetterTicker.prototype.str = [];

    LetterTicker.prototype.types = [];

    LetterTicker.prototype.nodes = null;

    function LetterTicker(selector, opts) {
      var ch, i, node, _i, _j, _len, _ref, _ref1;
      this.nodes = document.querySelectorAll(selector);
      if (!this.nodes) {
        return;
      }
      mergeOptions.call(this, opts);
      _ref = this.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if (this.text) {
          this.str = this.text.split('');
        } else if (node.textContent) {
          this.str = node.textContent.split('');
        } else {
          continue;
        }
        this.types = [];
        for (i = _j = 0, _ref1 = this.str.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
          ch = this.str[i];
          if (ch === ' ') {
            this.types[i] = 'space';
          } else {
            this.types[i] = 'symbol';
          }
        }
        node.innerHTML = '';
        this.shuffle(node, this.step * -1);
      }
    }

    mergeOptions = function(opts) {
      var key, value;
      for (key in opts) {
        value = opts[key];
        if (value) {
          this[key] = value;
        }
      }
      return this;
    };

    randomChar = function(type) {
      var arr, pool;
      switch (type) {
        case 'symbol':
          pool = ',.?/\\(^)![]{}*&^%$#\'"';
          break;
        default:
          pool = '';
      }
      arr = pool.split('');
      return arr[Math.floor(Math.random() * arr.length)];
    };

    LetterTicker.prototype.shuffle = function(node, start) {
      var i, len, strCopy, _i, _ref,
        _this = this;
      len = this.str.length;
      strCopy = this.str.slice(0);
      if (start > len) {
        this.callback.call(node);
        return;
      }
      for (i = _i = _ref = Math.max(start, 0); _ref <= len ? _i < len : _i > len; i = _ref <= len ? ++_i : --_i) {
        if (i < start + this.step) {
          strCopy[i] = randomChar.call(this, this.types[i]);
        } else {
          strCopy[i] = '';
        }
      }
      node.textContent = strCopy.join('');
      setTimeout(function() {
        _this.shuffle(node, start + 1);
      }, 1000 / this.fps);
      return this;
    };

    return LetterTicker;

  })();

}).call(this);
