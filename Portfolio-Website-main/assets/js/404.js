$(document).ready(function () {
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $(".navbar").toggleClass("nav-toggle");
  });
});

// Disable dev tools shortcuts
document.onkeydown = function (e) {
  if (
    e.keyCode == 123 ||
    (e.ctrlKey &&
      e.shiftKey &&
      ["I", "C", "J"].includes(String.fromCharCode(e.keyCode))) ||
    (e.ctrlKey && e.keyCode == "U".charCodeAt(0))
  ) {
    return false;
  }
};
var Tawk_API = Tawk_API || {},
  Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script"),
    s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6";
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);
})();
