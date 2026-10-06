(function () {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');
    const KEY = 'abcweb-ga-consent';

    function getConsent() {
      try { return localStorage.getItem(KEY); } catch { return null; }
    }
    function setConsent(v) {
      try { localStorage.setItem(KEY, v); } catch {}
    }

    function loadGoogleAnalytics() {
      // Replace G-XXXXXXXXXX with your GA4 ID and uncomment:
      /*
      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
      document.head.appendChild(s);
      */
    }

    const consent = getConsent();
    if (!consent) banner.style.display = 'block';
    else if (consent === 'granted') loadGoogleAnalytics();

    acceptBtn.addEventListener('click', function () {
      setConsent('granted');
      banner.style.display = 'none';
      loadGoogleAnalytics();
    });

    declineBtn.addEventListener('click', function () {
      setConsent('denied');
      banner.style.display = 'none';
    });
  })();