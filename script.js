(function () {
  // Mobile Menu Handler
  var menuButton = document.querySelector('.menu-button');
  var header = document.querySelector('.site-header');
  if (menuButton) {
    menuButton.addEventListener('click', function () {
      var open = header.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
  }

  // Modal Handler
  var modal = document.querySelector('.modal');
  var demoForm = document.getElementById('demoForm');
  var modalAlert = document.getElementById('modalAlert');
  var emailInput = document.getElementById('demoEmail');
  var companyInput = document.getElementById('demoCompany');
  var mobileInput = document.getElementById('demoMobile');

  // Hardcoded target personal WhatsApp number (+91 9898768787)
  var TARGET_WHATSAPP_NUMBER = '919898768787';

  function openModal() {
    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      if (modalAlert) {
        modalAlert.style.display = 'none';
        modalAlert.className = 'modal-alert';
        modalAlert.textContent = '';
      }
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  document.querySelectorAll('.demo-button').forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  document.querySelectorAll('.close-modal, .modal-backdrop').forEach(function (element) {
    element.addEventListener('click', function (e) {
      if (e.target.classList.contains('close-modal') || e.target.classList.contains('modal-backdrop')) {
        closeModal();
      }
    });
  });

  // Handle Form Submission to send details to WhatsApp
  if (demoForm) {
    demoForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var email = emailInput ? emailInput.value.trim() : '';
      var company = companyInput ? companyInput.value.trim() : '';
      var mobile = mobileInput ? mobileInput.value.trim() : '';

      // Validation
      if (!email || !company || !mobile) {
        showAlert('Please fill in all required details: Work Email, Company Name, and Mobile Number.', 'error');
        return;
      }

      // Format WhatsApp message text
      var messageText = "Hello EcoChat Team! 👋\n\nI would like to book an EcoChat demo.\n\nHere are my details:\n📧 Email: " + email + "\n🏢 Company: " + company + "\n📱 Mobile Number: " + mobile;

      // Construct WhatsApp URL with hardcoded number
      var whatsappUrl = "https://wa.me/" + TARGET_WHATSAPP_NUMBER + "?text=" + encodeURIComponent(messageText);

      // Show success alert
      showAlert('✅ Opening WhatsApp to send your demo request...', 'success');

      // Open WhatsApp after a brief delay
      setTimeout(function () {
        window.open(whatsappUrl, '_blank');
      }, 500);

      // Reset form fields after sending
      setTimeout(function () {
        if (emailInput) emailInput.value = '';
        if (companyInput) companyInput.value = '';
        if (mobileInput) mobileInput.value = '';
      }, 2000);
    });
  }

  function showAlert(message, type) {
    if (modalAlert) {
      modalAlert.textContent = message;
      modalAlert.className = 'modal-alert ' + type;
      modalAlert.style.display = 'block';
    }
  }

  // Interactive Tabs on Home Page
  var content = {
    marketing: { label: 'FOR MARKETING', title: 'Turn every click into a conversation.', copy: 'Capture intent from ads, campaigns, and your website. Engage the moment your audience is ready to talk.', points: ['4x more qualified leads', '98% average open rate', '3.2x ROAS'], link: 'Explore marketing →', href: '#demo' },
    sales: { label: 'FOR SALES', title: 'Keep every great deal moving.', copy: 'Help reps respond faster, qualify with confidence, and follow up at exactly the right time.', points: ['3x faster first reply', '27% shorter sales cycle', 'One shared deal view'], link: 'Explore sales →', href: 'sales.html' },
    support: { label: 'FOR SUPPORT', title: 'Make help feel human at scale.', copy: 'Resolve everyday questions instantly and route complex ones—with full context—to the right teammate.', points: ['24/7 instant answers', '60% fewer repeat tickets', 'One unified inbox'], link: 'Explore support →', href: '#demo' }
  };

  document.querySelectorAll('.tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.tab').forEach(function (item) { item.classList.remove('active'); });
      tab.classList.add('active');
      var data = content[tab.getAttribute('data-tab')];
      if (data) {
        var labelEl = document.querySelector('.tab-label');
        var titleEl = document.querySelector('.tab-title');
        var copyEl = document.querySelector('.tab-copy');
        var listEl = document.querySelector('.tab-list');
        var linkEl = document.querySelector('.tab-link');

        if (labelEl) labelEl.textContent = data.label;
        if (titleEl) titleEl.textContent = data.title;
        if (copyEl) copyEl.textContent = data.copy;
        if (listEl) listEl.innerHTML = data.points.map(function (point) { return '<li>' + point + '</li>'; }).join('');
        if (linkEl) { linkEl.textContent = data.link; linkEl.href = data.href; }
      }
    });
  });

  // Who Is It For Industry Tabs Handler
  var industryData = {
    'ecommerce': {
      title: 'E-commerce',
      badge: 'Recover up to 80% of abandoned carts',
      emoji: '🛍️',
      svg: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.351 21.3327H10.6667L8 8.66602H25.8587C27.3262 8.66602 28.0599 8.66602 28.4427 9.19277C28.8255 9.71952 28.6664 10.5102 28.348 12.0914C27.2443 17.5738 26.3344 21.3327 20.351 21.3327Z" fill="white" fill-opacity="0.4"></path><path d="M10.6667 21.3327H20.351C26.3344 21.3327 27.2443 17.5738 28.348 12.0914C28.6664 10.5102 28.8255 9.71952 28.4427 9.19277C28.0599 8.66602 27.3262 8.66602 25.8587 8.66602H8" stroke="white" stroke-width="1.5" stroke-linecap="round"></path><path d="M10.6673 21.3327L7.17229 4.68592C6.87552 3.49881 5.80889 2.66602 4.58525 2.66602H3.33398" stroke="white" stroke-width="1.5" stroke-linecap="round"></path><path d="M11.84 21.332H11.2914C9.47362 21.332 8 22.8671 8 24.7606C8 25.0762 8.2456 25.332 8.54857 25.332H23.3333" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="14" cy="27.332" r="2" stroke="white" stroke-width="1.5"></circle><circle cx="23.334" cy="27.332" r="2" stroke="white" stroke-width="1.5"></circle></svg>',
      heading: 'Increase your online store sales',
      subheading: 'Showcase products and share stock updates via WhatsApp',
      features: [
        'Send order notifications & shipping alerts',
        'Recover abandoned carts automatically',
        'Drive repeat purchases with instant catalogs',
        'Support shoppers 24/7 with automated AI replies'
      ],
      linkText: 'Explore E-commerce Solutions'
    },
    'hospitality': {
      title: 'Hospitality',
      badge: 'Boost direct bookings by 45%',
      emoji: '🏨',
      svg: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 26V8a2 2 0 012-2h16a2 2 0 012 2v18M3 26h26M10 12h4M18 12h4M10 17h4M18 17h4" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>',
      heading: 'Seamless guest experiences & booking automation',
      subheading: 'Automate pre-arrival info, room service, and instant concierge requests',
      features: [
        'Automated booking confirmations & check-in alerts',
        '24/7 AI Concierge for guest questions',
        'Send broadcast offers for spa & dining',
        'Post-checkout feedback & review collection'
      ],
      linkText: 'Explore Hospitality Solutions'
    },
    'healthcare': {
      title: 'Healthcare',
      badge: 'Reduce missed appointments by 65%',
      emoji: '🏥',
      svg: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 6v20M6 16h20" stroke="white" stroke-width="4" stroke-linecap="round"/></svg>',
      heading: 'Patient engagement & automated reminders',
      subheading: 'Keep patients informed with timely alerts and instant triage support',
      features: [
        'Automated appointment reminders & rescheduling',
        'Secure patient registration forms via WhatsApp',
        'Instant AI answers for clinic FAQs & hours',
        'Prescription alerts & health advisories'
      ],
      linkText: 'Explore Healthcare Solutions'
    },
    'education': {
      title: 'Education',
      badge: '3.5x higher inquiry-to-enrollment rate',
      emoji: '🎓',
      svg: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 4L2 11l14 7 14-7-14-7zM6 13.5v7c0 3 4.5 5.5 10 5.5s10-2.5 10-5.5v-7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      heading: 'Streamline admissions & campus updates',
      subheading: 'Engage prospective students and send instant fee/exam broadcasts',
      features: [
        'Automate student inquiry lead capture & assignment',
        'Fee reminders & exam timetable broadcasts',
        'AI RAG chatbot trained on admissions & syllabus FAQs',
        'Interactive application status tracking'
      ],
      linkText: 'Explore Education Solutions'
    },
    'marketing': {
      title: 'Marketing',
      badge: '98% average campaign open rate',
      emoji: '📢',
      svg: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 6L12 13H5v6h7l10 7V6zM26 12a5 5 0 010 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      heading: 'High-converting WhatsApp broadcasts',
      subheading: 'Turn click-to-WhatsApp ad traffic into qualified leads instantly',
      features: [
        'Bulk targeted broadcasts with rich media & buttons',
        'Click-to-WhatsApp ad tracking & ROI analytics',
        'Interactive flows for lead magnet downloads',
        'Automated lead qualification & CRM syncing'
      ],
      linkText: 'Explore Marketing Solutions'
    },
    'it&saas': {
      title: 'IT & SaaS',
      badge: '60% reduction in support ticket volume',
      emoji: '💻',
      svg: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 10l-4 6 4 6M24 10l4 6-4 6M18 6l-4 20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      heading: 'Agentic AI & Custom IT Services',
      subheading: 'Deploy knowledge-grounded RAG bots and autonomous agent workflows',
      features: [
        'Knowledge RAG Chatbots trained on docs & APIs',
        'Agentic AI for automated CRM & database actions',
        'Instant trial onboarding & setup assistance',
        '24/7 SLA-backed customer & technical support'
      ],
      linkText: 'Explore IT & AI Solutions'
    },
    'other': {
      title: 'Other Industries',
      badge: 'Bespoke CRM solutions for any business',
      emoji: '💼',
      svg: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4h8v4h-8zM4 10h24v18H4zM10 16h4v4h-4z" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>',
      heading: 'Tailored WhatsApp automation & AI',
      subheading: 'Designed for Real Estate, Financial Services, Automotive & Services',
      features: [
        'Custom visual flow builder for unique workflows',
        'Seamless integration with Salesforce, HubSpot & Webhooks',
        'Multi-agent shared team inbox with role permissions',
        'Custom AI model fine-tuning for your domain'
      ],
      linkText: 'Consult EcoChat Team'
    }
  };

  var industryTabs = document.querySelectorAll('.Tabs_tabs__tab___M8TL');
  industryTabs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var indKey = btn.getAttribute('data-industry');
      var item = industryData[indKey];
      if (!item) return;

      // Update tab active states
      industryTabs.forEach(function (t) {
        t.classList.remove('Tabs_tabs__tab--active__H7_Jq');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });
      btn.classList.add('Tabs_tabs__tab--active__H7_Jq');
      btn.setAttribute('aria-selected', 'true');
      btn.setAttribute('tabindex', '0');

      // Update contents
      var badgeIconEl = document.querySelector('.industry-badge-icon');
      var svgEl = document.querySelector('.tab-svg-icon');
      var titleEl = document.querySelector('.AnimatedTabContent_title__7iNW_');
      var subtitleEl = document.querySelector('.AnimatedTabContent_subtitle__W8k2B');
      var headingEl = document.querySelector('.TabContent_tab__title__ZcPa7');
      var subHeadingEl = document.querySelector('.TabContent_tab__subtitle__1vlfa');
      var featuresListEl = document.querySelector('.TabContent_tab__features__JjIll');
      var linkEl = document.querySelector('.TabContent_tab__link__VqDKT');

      if (badgeIconEl) badgeIconEl.textContent = item.emoji;
      if (svgEl) svgEl.innerHTML = item.svg;
      if (titleEl) titleEl.textContent = item.title;
      if (subtitleEl) subtitleEl.textContent = item.badge;
      if (headingEl) headingEl.textContent = item.heading;
      if (subHeadingEl) subHeadingEl.textContent = item.subheading;

      if (featuresListEl) {
        featuresListEl.innerHTML = item.features.map(function (feat) {
          return '<li class="TabContent_tab__item__k4k_C">' +
            '<svg class="TabContent_tab__checkIcon__u3W2T" aria-hidden="true" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<rect width="24" height="24" rx="6" fill="#00E785" fill-opacity="0.2"/>' +
            '<path d="M8 12.5L10.5 15L16 9" stroke="#1D1D1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
            '</svg>' +
            '<span class="TabContent_tab__itemText__EVddC">' + feat + '</span>' +
            '</li>';
        }).join('');
      }

      if (linkEl) {
        linkEl.innerHTML = item.linkText + ' ' +
          '<svg class="TabContent_tab__arrowIcon__XXhUW" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H21C21.4142 11.25 21.75 11.5858 21.75 12C21.75 12.4142 21.4142 12.75 21 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12Z" fill="currentColor"></path>' +
          '<path d="M14.4697 5.46967C14.7626 5.17678 15.2375 5.17678 15.5304 5.46967L21.5304 11.4697C21.8233 11.7626 21.8233 12.2374 21.5304 12.5303L15.5304 18.5303C15.2375 18.8232 14.7626 18.8232 14.4697 18.5303C14.1768 18.2374 14.1768 17.7626 14.4697 17.4697L19.9394 12L14.4697 6.53033C14.1768 6.23744 14.1768 5.76256 14.4697 5.46967Z" fill="currentColor"></path>' +
          '</svg>';
      }
    });
  });

  // Pricing Cycle Toggle Handler
  var pricingToggleBtns = document.querySelectorAll('.pricing-toggle-btn');
  var priceValues = document.querySelectorAll('.price-value');
  var billingNotes = document.querySelectorAll('.billing-note');

  pricingToggleBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cycle = btn.getAttribute('data-cycle');
      
      pricingToggleBtns.forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      priceValues.forEach(function (pv) {
        var newPrice = pv.getAttribute('data-' + cycle);
        if (newPrice) pv.textContent = newPrice;
      });

      billingNotes.forEach(function (bn) {
        var newNote = bn.getAttribute('data-' + cycle);
        if (newNote) bn.textContent = newNote;
      });
    });
  });
}());
