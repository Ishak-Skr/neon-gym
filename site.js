// Year in footer
var y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Screenshots: only show the ones that actually exist, and hide the section if none do.
(function () {
  var figs = Array.prototype.slice.call(document.querySelectorAll('#shots figure'));
  if (!figs.length || !window.fetch) return;
  var pending = figs.length;
  function done() {
    if (--pending > 0) return;
    if (!document.querySelector('#shots figure')) {
      var s = document.getElementById('screens'); if (s) s.remove();
      var n = document.getElementById('navShots'); if (n) n.remove();
    }
  }
  figs.forEach(function (fig) {
    var img = fig.querySelector('img');
    fetch(img.getAttribute('src'), { method: 'HEAD' })
      .then(function (r) { if (!r.ok) fig.remove(); })
      .catch(function () { /* offline or file:// — leave as is */ })
      .then(done);
  });
})();
