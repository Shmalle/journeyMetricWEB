/**
 * JourneyMetric - Core Interactive Engine & Visual Animations
 * DHBW Mannheim Consulting Project
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollTracker();
  initNavbar();
  initMetroHeroMap();
  initProblemBarsAnimation();
  initRoiCalculator();
  initContactForm();
  initMobileMenu();
});

/* --------------------------------------------------------------------------
   1. Scroll Progress Bar (Metro Line Tracker)
   -------------------------------------------------------------------------- */
function initScrollTracker() {
  const tracker = document.getElementById('scroll-track');
  if (!tracker) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    tracker.style.width = scrolled + '%';
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   2. Sticky Navbar & Active Section Tracking
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Scrollspy
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   3. Mobile Navigation Menu
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const navList = document.querySelector('.nav-links');
  if (!toggle || !navList) return;

  toggle.addEventListener('click', () => {
    navList.classList.toggle('open');
  });

  // Close menu when clicking link
  document.querySelectorAll('.nav-link, .nav-cta').forEach(item => {
    item.addEventListener('click', () => {
      navList.classList.remove('open');
    });
  });
}

/* --------------------------------------------------------------------------
   4. Metro Hero Map & Interactive Persona Station Inspection
   -------------------------------------------------------------------------- */
function initMetroHeroMap() {
  const toast = document.getElementById('persona-toast');
  const stations = document.querySelectorAll('.station-node');
  if (!stations.length || !toast) return;

  const stationData = {
    'station-start': {
      title: 'Halt 01: Startseite',
      text: '🤖 Persona #142 (B2B Einkäufer): Steigt ein über Google Ads Suchbegriff. Cookie-Banner mit 194 Partnern überfordert mobile Nutzer.',
      type: 'info'
    },
    'station-produkt': {
      title: 'Halt 02: Produktseite',
      text: '🤖 Persona #889 (Compliance Officer): Staffelpreise unklar, B2B-Nettopreise erst nach Registrierung sichtbar. 12% springen hier ab.',
      type: 'warning'
    },
    'station-warenkorb': {
      title: 'Halt 03: Warenkorb (Endstation?)',
      text: '⚠️ Kritischer Knotenpunkt: ~70% aller Warenkörbe bleiben hier unbezahlt. Versandkosten tauchen unerwartet auf (+14,90 € Spedition).',
      type: 'danger'
    },
    'station-checkout': {
      title: 'Halt 04: Checkout & Kasse',
      text: '🛑 Fehler 403: PayPal übernimmt Firmenadresse nicht, USt-IdNr. Prüfung schlägt fehl. 4.871,86 € wechseln zum Wettbewerber!',
      type: 'danger'
    },
    'station-kauf': {
      title: 'Endstation: Kauf erfolgreich',
      text: '✓ Reibungslose Customer Journey nach Metroverse Optimierung. Conversion-Rate steigt von 2,0% auf 2,5%.',
      type: 'success'
    },
    'station-absprung-1': {
      title: 'Absprung: Vorzeitiger Ausstieg',
      text: '✕ Kunde bricht Kauf ab. Grund: Zwang zur Kontoerstellung. Analytics meldet nur "Exit Rate 38%", Metroverse deckt den Grund auf.',
      type: 'danger'
    },
    'station-absprung-2': {
      title: 'Absprung: Zahlungsabbruch',
      text: '✕ Kunde bricht Kauf ab. Grund: Rechnungs- und Lieferadresse stimmen nicht überein. 0 € Umsatz.',
      type: 'danger'
    },
    'station-absprung-top': {
      title: 'Absprung: Versteckte Hürde',
      text: '✕ Kunde springt vor dem Warenkorb ab. Grund: Unklare Lieferzeitangabe ("Lieferung in 2-14 Tagen").',
      type: 'danger'
    }
  };

  let toastHideTimer = null;

  stations.forEach(node => {
    node.addEventListener('mouseenter', () => {
      if (toastHideTimer) {
        clearTimeout(toastHideTimer);
        toastHideTimer = null;
      }
      const id = node.getAttribute('id');
      const data = stationData[id];
      if (data) {
        toast.innerHTML = `<strong>${data.title}</strong><br>${data.text}`;
        toast.classList.add('active');
      }
    });

    node.addEventListener('mouseleave', () => {
      toastHideTimer = setTimeout(() => {
        toast.classList.remove('active');
      }, 300);
    });

    // Touch support for mobile devices
    node.addEventListener('click', (e) => {
      e.preventDefault();
      const id = node.getAttribute('id');
      const data = stationData[id];
      if (data) {
        toast.innerHTML = `<strong>${data.title}</strong><br>${data.text}`;
        toast.classList.add('active');
        setTimeout(() => toast.classList.remove('active'), 5000);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. Problem Bars Animation on Viewport Entry
   -------------------------------------------------------------------------- */
function initProblemBarsAnimation() {
  const bars = document.querySelectorAll('.bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bars.forEach(bar => {
          const target = bar.getAttribute('data-width');
          bar.style.width = target + '%';
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const problemSection = document.getElementById('problem');
  if (problemSection) {
    observer.observe(problemSection);
  }
}

/* --------------------------------------------------------------------------
   6. Interactive Metroverse ROI Calculator
   -------------------------------------------------------------------------- */
function initRoiCalculator() {
  const visitorsSlider = document.getElementById('calc-visitors');
  const aovSlider = document.getElementById('calc-aov');
  const visitorsVal = document.getElementById('val-visitors');
  const aovVal = document.getElementById('val-aov');
  const resultMonth = document.getElementById('roi-result-month');
  const resultYear = document.getElementById('roi-result-year');

  if (!visitorsSlider || !aovSlider || !resultMonth) return;

  function updateRoi() {
    const visitors = parseInt(visitorsSlider.value, 10);
    const aov = parseInt(aovSlider.value, 10);

    // Format input displays
    if (visitorsVal) visitorsVal.textContent = visitors.toLocaleString('de-DE');
    if (aovVal) aovVal.textContent = aov.toLocaleString('de-DE') + ' €';

    // Calculation:
    // Baseline conversion = 2.0%
    // Optimized conversion = 2.5%
    // Conversion uplift = +0.5% (0.005)
    // Additional orders = visitors * 0.005
    // Monthly extra revenue = additional orders * AOV
    const monthlyExtra = Math.round(visitors * 0.005 * aov);
    const yearlyExtra = monthlyExtra * 12;

    resultMonth.textContent = '+ ' + monthlyExtra.toLocaleString('de-DE') + ' €';
    if (resultYear) {
      resultYear.textContent = `+ ${yearlyExtra.toLocaleString('de-DE')} € im Jahr`;
    }
  }

  visitorsSlider.addEventListener('input', updateRoi);
  aovSlider.addEventListener('input', updateRoi);

  // Initial calculation
  updateRoi();
}

/* --------------------------------------------------------------------------
   7. Contact Form Simulation & Feedback
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Wird übermittelt...';
    btn.disabled = true;

    setTimeout(() => {
      form.reset();
      btn.textContent = originalText;
      btn.disabled = false;
      status.textContent = '✓ Vielen Dank! Ihre Anfrage ist eingegangen. Wir melden uns unverbindlich innerhalb von 24 Stunden.';
      status.className = 'form-status success';
      setTimeout(() => {
        status.style.display = 'none';
      }, 8000);
    }, 900);
  });
}
