/* ===== jQuery: Navbar & Scroll-to-Top ===== */
$(document).ready(function () {
    // Navbar Toggle
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Scroll behavior
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }
    });
});

/* ===== ScrollReveal Animation ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: false // smoother UX
});

// Reveal experience timeline
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });


fetch("/experience/experience.json")
  .then(res => res.json())
  .then(experiences => {
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = experiences.map(exp => `
      <div class="container ${exp.side}">
        <div class="content">
          <div class="tag"><h2>${exp.company}</h2></div>
          <div class="desc">
            <h3>${exp.role}</h3>
            <p>${exp.date}</p>
          </div>
        </div>
      </div>
    `).join('');
  });



/* ===== Tawk.to Live Chat Integration ===== */

var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/688c71b57058a019273802d8/1j1i9oc97';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();


// Custom behavior: footer chat button
Tawk_API.onLoad = function () {
    Tawk_API.hideWidget();
    const chatBtn = document.getElementById('chatBtn');
    if (chatBtn) {
        chatBtn.addEventListener('click', function () {
            Tawk_API.showWidget();
            Tawk_API.maximize();
        });
    }
};

/* ===== Disable Developer Tools ===== */
document.addEventListener('keydown', function (e) {
    if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key.toUpperCase())) || 
        (e.ctrlKey && e.key.toUpperCase() === 'U')
    ) {
        e.preventDefault();
        return false;
    }
});

/* ===== Page Visibility Change ===== */
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Experience | Portfolio Karthik Chowdhary";
        $("#favicon").attr("href", "./assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "./assets/images/favhand.png");
    }
});
