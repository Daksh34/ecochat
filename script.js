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

  // Hardcoded target personal WhatsApp number (+91 9833852606)
  var TARGET_WHATSAPP_NUMBER = '919833852606';

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
}());
