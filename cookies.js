(function () {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');
    const consentKey = 'abcweb-ga-consent';
    const measurementId = 'G-PLR7KYV3RM';

    if (!banner || !acceptBtn || !declineBtn) {
        console.error('Cookie consent UI is missing required elements.');
        return;
    }

    function getConsent() {
        try {
            return localStorage.getItem(consentKey);
        } catch (error) {
            console.error('Unable to read cookie consent from local storage.', error);
            return null;
        }
    }

    function setConsent(value) {
        try {
            localStorage.setItem(consentKey, value);
        } catch (error) {
            console.error('Unable to save cookie consent to local storage.', error);
        }
    }

    function loadGoogleAnalytics() {
        if (document.getElementById('google-analytics')) return;

        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
            window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', measurementId);

        const script = document.createElement('script');
        script.id = 'google-analytics';
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        document.head.appendChild(script);
    }

    const consent = getConsent();
    if (consent === 'granted') {
        banner.style.display = 'none';
        loadGoogleAnalytics();
    } else if (consent === 'denied') {
        banner.style.display = 'none';
    } else {
        banner.style.display = 'block';
    }

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