<!-- Cookie Notice -->
<div class="cookie-banner" id="cookieBanner" role="dialog" aria-label="Cookie notice" aria-live="polite">
    <div class="cookie-banner-inner">
        <div class="cookie-banner-text">
            <strong>🍪 No cookies here.</strong>
            This site uses <strong>no cookies</strong>, no trackers, and shares no data with third parties.
            <a href="/privacy">Privacy Policy</a>
        </div>
        <button class="cookie-banner-close btn btn-primary" id="cookieBannerClose" aria-label="Dismiss cookie notice">
            Got it
        </button>
    </div>
</div>

<script>
(function () {
    var banner = document.getElementById('cookieBanner');
    var btn    = document.getElementById('cookieBannerClose');
    // Use sessionStorage so it dismisses per-session without setting a cookie
    if (sessionStorage.getItem('cookieNotice')) {
        banner.style.display = 'none';
    }
    btn.addEventListener('click', function () {
        sessionStorage.setItem('cookieNotice', '1');
        banner.classList.add('cookie-banner--hidden');
        setTimeout(function () { banner.style.display = 'none'; }, 300);
    });
})();
</script>
