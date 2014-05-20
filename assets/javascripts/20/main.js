(function() {
  var form;

  form = document.getElementById('letterticker-entry-form');

  form.addEventListener('submit', function(event) {
    var letterTicker, txt;
    event.preventDefault();
    txt = event.target.entry.value;
    letterTicker = new LetterTicker('.letter', {
      callback: function() {
        return console.log(txt);
      },
      fps: 60,
      text: txt
    });
    return this;
  });

  new LetterTicker('.letter', {
    fps: 60
  });

}).call(this);
