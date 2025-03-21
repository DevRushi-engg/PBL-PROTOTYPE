/* ===== COMMON FUNCTIONALITY ===== */

// Page loader animation
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader');
  
  if (loader) {
    // Simulate loading progress
    let progress = 0;
    const progressBar = document.querySelector('.loader-progress-bar');
    
    const progressInterval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 100) progress = 100;
      
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
      
      if (progress === 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          loader.style.opacity = '0';
          document.body.classList.add('loaded');
          
          setTimeout(() => {
            loader.style.display = 'none';
          }, 500);
        }, 500);
      }
    }, 200);
  }
  
  // Initialize custom cursor
  initCustomCursor();
  
  // Initialize navigation
  initNavigation();
  
  // Handle authentication forms
  initAuthForms();
  
  // Initialize dashboard functionality
  initDashboard();
});

// Custom cursor functionality
function initCustomCursor() {
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if (!cursor || !cursorFollower) return;
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Follower with delay
    setTimeout(() => {
      cursorFollower.style.left = e.clientX + 'px';
      cursorFollower.style.top = e.clientY + 'px';
    }, 80);
  });
  
  // Add hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .nav-toggle, input, select, .feature-card, .path-card, .skill-tag, .step-item');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-active');
      cursorFollower.classList.add('cursor-active');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-active');
      cursorFollower.classList.remove('cursor-active');
    });
  });
}

/* ===== NAVIGATION ===== */
function initNavigation() {
  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  
  if (navToggle) {
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      document.body.classList.toggle('nav-open');
      if (navMenu) {
        navMenu.classList.toggle('active');
      }
    });
  }
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Close mobile nav if open
        if (document.body.classList.contains('nav-open')) {
          document.body.classList.remove('nav-open');
          const navToggle = document.querySelector('.nav-toggle');
          const navMenu = document.querySelector('.nav-menu');
          
          if (navToggle) navToggle.classList.remove('active');
          if (navMenu) navMenu.classList.remove('active');
        }
        
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // Ensure login and signup links work correctly
  document.addEventListener('DOMContentLoaded', function() {
    const loginLink = document.querySelector('.nav-login');
    const signupLink = document.querySelector('.nav-signup');
    
    if (loginLink) {
      loginLink.addEventListener('click', function(e) {
        window.location.href = 'login.html';
      });
    }
    
    if (signupLink) {
      signupLink.addEventListener('click', function(e) {
        window.location.href = 'signup.html';
      });
    }
  });
}

/* ===== LANDING PAGE ANIMATIONS ===== */
function initLandingAnimations() {
  if (document.querySelector('.hero')) {
    // Animate floating cards
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach((card, index) => {
      // Set initial position with different delays
      const yOffset = 20 + (index * 5);
      animateFloat(card, yOffset, 2 + (index * 0.3));
    });
    
    // Animate path nodes
    animatePathNodes();
    
    // Create particle effect for hero background
    createParticles();
  }
}

// Simple float animation for elements
function animateFloat(element, yOffset, duration) {
  let startTime;
  let direction = 1;
  
  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    
    const elapsed = (timestamp - startTime) / 1000; // convert to seconds
    const progress = (elapsed % duration) / duration;
    
    // Simple sine wave motion
    const yPosition = Math.sin(progress * Math.PI * 2) * yOffset;
    element.style.transform = `translateY(${yPosition}px)`;
    
    requestAnimationFrame(animate);
  }
  
  requestAnimationFrame(animate);
}

// Animate path nodes in the hero section
function animatePathNodes() {
  const nodes = document.querySelectorAll('.path-node');
  if (!nodes.length) return;
  
  nodes.forEach((node, index) => {
    setTimeout(() => {
      node.style.transform = 'scale(1.5)';
      node.style.opacity = '1';
      
      setTimeout(() => {
        node.style.transform = 'scale(1)';
        node.style.opacity = '0.8';
      }, 500);
    }, index * 800);
  });
  
  // Repeat the animation
  setTimeout(animatePathNodes, nodes.length * 800 + 1000);
}

// Create particle effect for hero background
function createParticles() {
  const heroParticles = document.querySelector('.hero-particles');
  if (!heroParticles) return;
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random size
    const size = Math.random() * 5 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random opacity
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    
    // Random animation duration
    const duration = Math.random() * 20 + 10;
    particle.style.animation = `float ${duration}s infinite ease-in-out`;
    
    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    heroParticles.appendChild(particle);
  }
}

/* ===== AUTHENTICATION FORMS ===== */
function initAuthForms() {
  // Login form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    initPasswordToggle();
    
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      // Basic validation
      if (!email || !password) {
        showFormError('Please fill in all fields');
        return;
      }
      
      // Simulate login API call
      showFormLoading(loginForm);
      
      setTimeout(() => {
        // Simulate successful login
        hideFormLoading(loginForm);
        
        // Store user info in local storage
        localStorage.setItem('edupath_user', JSON.stringify({
          email,
          name: email.split('@')[0], // Extract name from email for demo
          isLoggedIn: true
        }));
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
      }, 1500);
    });
  }
  
  // Signup form
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    initPasswordToggle();
    initPasswordStrength();
    
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const fullname = document.getElementById('fullname')?.value;
      const email = document.getElementById('signup-email')?.value;
      const password = document.getElementById('signup-password')?.value;
      const confirmPassword = document.getElementById('confirm-password')?.value;
      const terms = document.getElementById('terms')?.checked;
      
      // Basic validation
      if (!fullname || !email || !password || !confirmPassword) {
        showFormError('Please fill in all fields');
        return;
      }
      
      if (password !== confirmPassword) {
        showFormError('Passwords do not match');
        return;
      }
      
      if (!terms) {
        showFormError('Please accept the Terms of Service and Privacy Policy');
        return;
      }
      
      const strength = checkPasswordStrength(password);
      if (strength.score < 2) {
        showFormError('Please use a stronger password');
        return;
      }
      
      // Simulate signup API call
      showFormLoading(signupForm);
      
      setTimeout(() => {
        // Simulate successful signup
        hideFormLoading(signupForm);
        
        // Store user info in local storage
        localStorage.setItem('edupath_user', JSON.stringify({
          name: fullname,
          email,
          isLoggedIn: true
        }));
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
      }, 1500);
    });
  }
}

// Toggle password visibility
function initPasswordToggle() {
  const passwordToggles = document.querySelectorAll('.password-toggle');
  
  passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const passwordInput = toggle.closest('.input-with-icon').querySelector('input');
      const icon = toggle.querySelector('i');
      
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  });
}

// Password strength meter
function initPasswordStrength() {
  const passwordInput = document.getElementById('signup-password');
  const strengthProgress = document.querySelector('.strength-progress');
  const strengthValue = document.querySelector('.strength-value');
  
  if (passwordInput && strengthProgress && strengthValue) {
    passwordInput.addEventListener('input', () => {
      const password = passwordInput.value;
      const strength = checkPasswordStrength(password);
      
      // Update the strength indicator
      strengthProgress.style.width = `${strength.score * 25}%`;
      strengthValue.textContent = strength.label;
      
      // Update color based on strength
      strengthProgress.className = 'strength-progress';
      strengthProgress.classList.add(`strength-${strength.label.toLowerCase()}`);
    });
  }
}

// Check password strength
function checkPasswordStrength(password) {
  if (!password) {
    return { score: 0, label: 'Weak' };
  }
  
  let score = 0;
  
  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Complexity checks
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  // Normalize score to 0-4 range
  score = Math.min(Math.floor(score / 1.5), 4);
  
  const labels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  return {
    score,
    label: labels[score]
  };
}

// Show form error message
function showFormError(message) {
  const errorElement = document.querySelector('.form-error');
  
  if (!errorElement) {
    // Create error element if it doesn't exist
    const formGroup = document.createElement('div');
    formGroup.className = 'form-group';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error visible';
    errorDiv.textContent = message;
    
    formGroup.appendChild(errorDiv);
    
    // Add to form
    const form = document.querySelector('.auth-form');
    if (form) {
      form.insertBefore(formGroup, form.querySelector('button[type="submit"]').parentNode);
    }
  } else {
    // Update existing error message
    errorElement.textContent = message;
    errorElement.classList.add('visible');
  }
}

// Show loading state on form
function showFormLoading(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
  }
}

// Hide loading state on form
function hideFormLoading(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const btnText = form.classList.contains('login-form') ? 'Login' : 'Create Account';
  
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span class="btn-text">${btnText}</span>
                          <span class="btn-icon"><i class="fas fa-arrow-right"></i></span>`;
  }
}

/* ===== DASHBOARD FUNCTIONALITY ===== */
function initDashboard() {
  if (document.querySelector('.dashboard-container')) {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('edupath_user') || '{}');
    if (!user.isLoggedIn) {
      window.location.href = 'login.html';
      return;
    }
    
    // Update user info in dashboard
    updateUserInfo(user);
    
    // Initialize navigation
    initDashboardNavigation();
    
    // Initialize sidebar toggle
    initSidebarToggle();
    
    // Initialize notifications dropdown
    initNotificationsDropdown();
    
    // Initialize user dropdown
    initUserDropdown();
    
    // Initialize profile form
    initProfileForm();
    
    // Initialize path cards
    initPathCards();
    
    // Initialize resource actions
    initResourceActions();
  }
}

// Initialize dashboard navigation
function initDashboardNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const contentSections = {
    'dashboard': document.querySelector('.profile-completion, #learning-path-section'),
    'learning-paths': document.getElementById('learning-paths-section'),
    'resources': document.getElementById('resources-section'),
    'settings': document.getElementById('settings-section')
  };
  
  // If the sections don't exist yet, create them
  createMissingSections(contentSections);
  
  // Initially show only dashboard section
  Object.keys(contentSections).forEach(key => {
    if (key !== 'dashboard') {
      const section = contentSections[key];
      if (section) section.style.display = 'none';
    }
  });
  
  // Handle navigation clicks
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Get the section to show
      const sectionToShow = link.textContent.toLowerCase().trim();
      
      // Hide all sections
      Object.values(contentSections).forEach(section => {
        if (section) section.style.display = 'none';
      });
      
      // Show selected section
      if (sectionToShow === 'dashboard') {
        const profileSection = document.querySelector('.profile-completion');
        const learningPathSection = document.getElementById('learning-path-section');
        
        if (profileSection) profileSection.style.display = 'block';
        
        // Check if user has already generated a learning path
        const hasProfile = localStorage.getItem('edupath_profile');
        if (hasProfile && learningPathSection) {
          learningPathSection.style.display = 'block';
        }
      } else {
        const section = contentSections[sectionToShow];
        if (section) section.style.display = 'block';
      }
      
      // Update active nav link
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

// Create missing content sections
function createMissingSections(contentSections) {
  const dashboardContent = document.querySelector('.dashboard-content');
  
  // Create Learning Paths section if it doesn't exist
  if (!contentSections['learning-paths'] && dashboardContent) {
    const learningPathsSection = createLearningPathsSection();
    dashboardContent.appendChild(learningPathsSection);
    contentSections['learning-paths'] = learningPathsSection;
  }
  
  // Create Resources section if it doesn't exist
  if (!contentSections['resources'] && dashboardContent) {
    const resourcesSection = createResourcesSection();
    dashboardContent.appendChild(resourcesSection);
    contentSections['resources'] = resourcesSection;
  }
  
  // Create Settings section if it doesn't exist
  if (!contentSections['settings'] && dashboardContent) {
    const settingsSection = createSettingsSection();
    dashboardContent.appendChild(settingsSection);
    contentSections['settings'] = settingsSection;
  }
}

// Create Learning Paths Section
function createLearningPathsSection() {
  const section = document.createElement('div');
  section.id = 'learning-paths-section';
  section.className = 'dashboard-card';
  section.style.display = 'none';
  
  section.innerHTML = `
    <div class="card-header">
      <h3>My Learning Paths</h3>
      <p>All your saved learning journeys</p>
    </div>
    
    <div class="learning-paths-content">
      <div class="paths-container">
        <!-- Saved Path 1 -->
        <div class="saved-path">
          <div class="path-header">
            <h4>Web Development Path</h4>
            <span class="path-progress">33% Complete</span>
          </div>
          
          <div class="path-progress-bar">
            <div class="progress-fill" style="width: 33%"></div>
          </div>
          
          <div class="path-meta">
            <div class="path-stats">
              <div class="stat">
                <i class="fas fa-calendar-alt"></i>
                <span>Started: May 15, 2023</span>
              </div>
              <div class="stat">
                <i class="fas fa-clock"></i>
                <span>Est. completion: 12 weeks</span>
              </div>
            </div>
            
            <div class="path-actions">
              <a href="#" class="btn-continue">Continue Learning</a>
              <button class="btn-icon"><i class="fas fa-ellipsis-v"></i></button>
            </div>
          </div>
        </div>
        
        <!-- Saved Path 2 -->
        <div class="saved-path">
          <div class="path-header">
            <h4>Python Data Science</h4>
            <span class="path-progress">12% Complete</span>
          </div>
          
          <div class="path-progress-bar">
            <div class="progress-fill" style="width: 12%"></div>
          </div>
          
          <div class="path-meta">
            <div class="path-stats">
              <div class="stat">
                <i class="fas fa-calendar-alt"></i>
                <span>Started: June 3, 2023</span>
              </div>
              <div class="stat">
                <i class="fas fa-clock"></i>
                <span>Est. completion: 8 weeks</span>
              </div>
            </div>
            
            <div class="path-actions">
              <a href="#" class="btn-continue">Continue Learning</a>
              <button class="btn-icon"><i class="fas fa-ellipsis-v"></i></button>
            </div>
          </div>
        </div>
        
        <!-- Create New Path Button -->
        <div class="create-path">
          <div class="create-path-inner">
            <div class="create-icon">
              <i class="fas fa-plus"></i>
            </div>
            <h4>Create New Learning Path</h4>
            <p>Find the perfect resources for a new skill</p>
            <a href="#" class="btn-create">Get Started</a>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add event listeners for the continue buttons
  setTimeout(() => {
    const continueButtons = section.querySelectorAll('.btn-continue');
    continueButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Show the dashboard tab and learning path section
        document.querySelectorAll('.nav-link').forEach(link => {
          if (link.textContent.toLowerCase().trim() === 'dashboard') {
            link.click();
          }
        });
        
        // Focus on the learning path section
        const learningPathSection = document.getElementById('learning-path-section');
        if (learningPathSection) {
          learningPathSection.style.display = 'block';
          document.querySelector('.profile-completion').style.display = 'none';
          learningPathSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
    
    // Add event listener for create new path button
    const createButton = section.querySelector('.btn-create');
    if (createButton) {
      createButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Show the dashboard tab and profile form
        document.querySelectorAll('.nav-link').forEach(link => {
          if (link.textContent.toLowerCase().trim() === 'dashboard') {
            link.click();
          }
        });
        
        // Show and focus on the profile form
        document.querySelector('.profile-completion').style.display = 'block';
        document.getElementById('learning-path-section').style.display = 'none';
        document.querySelector('.profile-completion').scrollIntoView({ behavior: 'smooth' });
        
        // Reset form to first section
        document.querySelectorAll('.form-section').forEach(section => {
          section.classList.remove('active');
        });
        document.querySelector('.form-section[data-section="1"]').classList.add('active');
      });
    }
  }, 100);
  
  return section;
}

// Create Resources Section
function createResourcesSection() {
  const section = document.createElement('div');
  section.id = 'resources-section';
  section.className = 'dashboard-card';
  section.style.display = 'none';
  
  section.innerHTML = `
    <div class="card-header">
      <h3>Learning Resources</h3>
      <p>Recommended education materials for you</p>
    </div>
    
    <div class="resources-content">
      <div class="resources-search">
        <div class="search-container">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Search resources..." class="search-input">
        </div>
        
        <div class="filter-controls">
          <select class="filter-select">
            <option value="all">All Resources</option>
            <option value="videos">Videos</option>
            <option value="articles">Articles</option>
            <option value="courses">Courses</option>
            <option value="documentation">Documentation</option>
          </select>
          
          <select class="filter-select">
            <option value="all">All Topics</option>
            <option value="html-css">HTML & CSS</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="data-science">Data Science</option>
            <option value="machine-learning">Machine Learning</option>
          </select>
        </div>
      </div>
      
      <div class="resources-grid">
        <!-- Resource 1 -->
        <div class="resource-item">
          <div class="resource-thumbnail">
            <img src="https://picsum.photos/300/200?random=1" alt="Resource Thumbnail">
            <span class="resource-type video">Video</span>
          </div>
          
          <div class="resource-info">
            <h4>Getting Started with JavaScript: A Beginner's Guide</h4>
            <div class="resource-meta">
              <span><i class="fas fa-clock"></i> 45 min</span>
              <span><i class="fas fa-signal"></i> Beginner</span>
            </div>
            <p>Learn the fundamentals of JavaScript programming with this comprehensive introduction.</p>
            
            <div class="resource-footer">
              <div class="resource-source">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png" alt="YouTube">
                <span>YouTube</span>
              </div>
              
              <div class="resource-actions">
                <button class="btn-save"><i class="far fa-bookmark"></i></button>
                <a href="https://www.youtube.com/watch?v=W6NZfCO5SIk" target="_blank" class="btn-view">Watch <i class="fas fa-external-link-alt"></i></a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Resource 2 -->
        <div class="resource-item">
          <div class="resource-thumbnail">
            <img src="https://picsum.photos/300/200?random=2" alt="Resource Thumbnail">
            <span class="resource-type article">Article</span>
          </div>
          
          <div class="resource-info">
            <h4>Modern CSS Techniques to Master in 2023</h4>
            <div class="resource-meta">
              <span><i class="fas fa-clock"></i> 15 min read</span>
              <span><i class="fas fa-signal"></i> Intermediate</span>
            </div>
            <p>Discover the latest CSS features and techniques that will revolutionize your web development.</p>
            
            <div class="resource-footer">
              <div class="resource-source">
                <img src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png" alt="CSS Tricks">
                <span>CSS Tricks</span>
              </div>
              
              <div class="resource-actions">
                <button class="btn-save"><i class="far fa-bookmark"></i></button>
                <a href="https://css-tricks.com" target="_blank" class="btn-view">Read <i class="fas fa-external-link-alt"></i></a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Resource 3 -->
        <div class="resource-item">
          <div class="resource-thumbnail">
            <img src="https://picsum.photos/300/200?random=3" alt="Resource Thumbnail">
            <span class="resource-type course">Course</span>
          </div>
          
          <div class="resource-info">
            <h4>Python for Data Science and Machine Learning Bootcamp</h4>
            <div class="resource-meta">
              <span><i class="fas fa-clock"></i> 20 hours</span>
              <span><i class="fas fa-signal"></i> All Levels</span>
            </div>
            <p>Learn Python, NumPy, Pandas, Matplotlib, Seaborn, Scikit-Learn, and TensorFlow.</p>
            
            <div class="resource-footer">
              <div class="resource-source">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Udemy_logo.svg/2560px-Udemy_logo.svg.png" alt="Udemy">
                <span>Udemy</span>
              </div>
              
              <div class="resource-actions">
                <button class="btn-save"><i class="far fa-bookmark"></i></button>
                <a href="https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/" target="_blank" class="btn-view">View Course <i class="fas fa-external-link-alt"></i></a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Resource 4 -->
        <div class="resource-item">
          <div class="resource-thumbnail">
            <img src="https://picsum.photos/300/200?random=4" alt="Resource Thumbnail">
            <span class="resource-type documentation">Documentation</span>
          </div>
          
          <div class="resource-info">
            <h4>React Official Documentation</h4>
            <div class="resource-meta">
              <span><i class="fas fa-book"></i> Reference</span>
              <span><i class="fas fa-signal"></i> All Levels</span>
            </div>
            <p>The official React documentation with guides, API reference, and examples.</p>
            
            <div class="resource-footer">
              <div class="resource-source">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="React">
                <span>react.dev</span>
              </div>
              
              <div class="resource-actions">
                <button class="btn-save"><i class="far fa-bookmark"></i></button>
                <a href="https://react.dev/" target="_blank" class="btn-view">Read Docs <i class="fas fa-external-link-alt"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="resources-pagination">
        <button class="btn-page active">1</button>
        <button class="btn-page">2</button>
        <button class="btn-page">3</button>
        <span class="pagination-separator">...</span>
        <button class="btn-page">10</button>
        <button class="btn-next-page"><i class="fas fa-chevron-right"></i></button>
      </div>
    </div>
  `;
  
  // Add event listeners for resource actions
  setTimeout(() => {
    // Save button functionality
    const saveButtons = section.querySelectorAll('.btn-save');
    saveButtons.forEach(button => {
      button.addEventListener('click', () => {
        const icon = button.querySelector('i');
        
        if (icon.classList.contains('far')) {
          icon.classList.remove('far');
          icon.classList.add('fas');
          showNotification('Resource saved to your library');
        } else {
          icon.classList.remove('fas');
          icon.classList.add('far');
          showNotification('Resource removed from your library');
        }
      });
    });
    
    // Search functionality
    const searchInput = section.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const resourceItems = section.querySelectorAll('.resource-item');
        
        resourceItems.forEach(item => {
          const title = item.querySelector('h4').textContent.toLowerCase();
          const description = item.querySelector('p').textContent.toLowerCase();
          
          if (title.includes(searchTerm) || description.includes(searchTerm)) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    }
    
    // Filter functionality
    const filterSelects = section.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
      select.addEventListener('change', () => {
        const resourceItems = section.querySelectorAll('.resource-item');
        const typeFilter = filterSelects[0].value;
        const topicFilter = filterSelects[1].value;
        
        resourceItems.forEach(item => {
          const typeMatch = typeFilter === 'all' || 
            item.querySelector('.resource-type').classList.contains(typeFilter.replace('s', ''));
          // For actual implementation, add data attributes to items for better filtering
          const topicMatch = topicFilter === 'all' || true; // Simplified for demo
          
          item.style.display = typeMatch && topicMatch ? 'flex' : 'none';
        });
      });
    });
    
    // Pagination
    const pageButtons = section.querySelectorAll('.btn-page');
    pageButtons.forEach(button => {
      button.addEventListener('click', () => {
        pageButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        showNotification(`Navigated to page ${button.textContent}`);
      });
    });
  }, 100);
  
  return section;
}

// Create Settings Section
function createSettingsSection() {
  const section = document.createElement('div');
  section.id = 'settings-section';
  section.className = 'dashboard-card';
  section.style.display = 'none';
  
  const userData = JSON.parse(localStorage.getItem('edupath_user') || '{}');
  
  section.innerHTML = `
    <div class="card-header">
      <h3>Account Settings</h3>
      <p>Manage your preferences and profile</p>
    </div>
    
    <div class="settings-content">
      <div class="settings-nav">
        <ul class="settings-tabs">
          <li class="settings-tab active" data-tab="profile">Profile</li>
          <li class="settings-tab" data-tab="preferences">Preferences</li>
          <li class="settings-tab" data-tab="notifications">Notifications</li>
          <li class="settings-tab" data-tab="security">Privacy & Security</li>
        </ul>
      </div>
      
      <div class="settings-panels">
        <!-- Profile Panel -->
        <div class="settings-panel active" data-panel="profile">
          <h4>Profile Information</h4>
          
          <form id="profile-settings-form">
            <div class="form-group">
              <label for="profile-name">Full Name</label>
              <input type="text" id="profile-name" value="${userData.name || ''}" placeholder="Your name">
            </div>
            
            <div class="form-group">
              <label for="profile-email">Email</label>
              <input type="email" id="profile-email" value="${userData.email || ''}" placeholder="Your email">
            </div>
            
            <div class="form-group">
              <label for="profile-bio">Bio</label>
              <textarea id="profile-bio" placeholder="Tell us about yourself">${userData.bio || ''}</textarea>
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn-save-settings">Save Changes</button>
            </div>
          </form>
        </div>
        
        <!-- Preferences Panel -->
        <div class="settings-panel" data-panel="preferences">
          <h4>Learning Preferences</h4>
          
          <form id="preferences-settings-form">
            <div class="form-group">
              <label>Preferred Learning Formats</label>
              <div class="checkbox-group">
                <div class="checkbox-item">
                  <input type="checkbox" id="pref-videos" checked>
                  <label for="pref-videos">Videos</label>
                </div>
                <div class="checkbox-item">
                  <input type="checkbox" id="pref-articles" checked>
                  <label for="pref-articles">Articles</label>
                </div>
                <div class="checkbox-item">
                  <input type="checkbox" id="pref-courses" checked>
                  <label for="pref-courses">Interactive Courses</label>
                </div>
                <div class="checkbox-item">
                  <input type="checkbox" id="pref-docs">
                  <label for="pref-docs">Documentation</label>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="difficulty-level">Preferred Difficulty Level</label>
              <select id="difficulty-level">
                <option value="beginner">Beginner</option>
                <option value="intermediate" selected>Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="all">All Levels</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="study-time">Weekly Study Time</label>
              <select id="study-time">
                <option value="minimal">Less than 5 hours/week</option>
                <option value="moderate" selected>5-10 hours/week</option>
                <option value="significant">10-20 hours/week</option>
                <option value="full-time">20+ hours/week</option>
              </select>
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn-save-settings">Save Preferences</button>
            </div>
          </form>
        </div>
        
        <!-- Notifications Panel -->
        <div class="settings-panel" data-panel="notifications">
          <h4>Notification Settings</h4>
          
          <form id="notifications-settings-form">
            <div class="toggle-group">
              <div class="toggle-item">
                <div class="toggle-info">
                  <h5>Email Notifications</h5>
                  <p>Receive updates and recommendations via email</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked>
                  <span class="toggle-slider"></span>
                </label>
              </div>
              
              <div class="toggle-item">
                <div class="toggle-info">
                  <h5>Learning Reminders</h5>
                  <p>Get reminders to continue your learning journey</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked>
                  <span class="toggle-slider"></span>
                </label>
              </div>
              
              <div class="toggle-item">
                <div class="toggle-info">
                  <h5>Resource Updates</h5>
                  <p>Be notified when new resources match your interests</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked>
                  <span class="toggle-slider"></span>
                </label>
              </div>
              
              <div class="toggle-item">
                <div class="toggle-info">
                  <h5>Achievement Notifications</h5>
                  <p>Celebrate your learning milestones</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked>
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn-save-settings">Save Notification Settings</button>
            </div>
          </form>
        </div>
        
        <!-- Security Panel -->
        <div class="settings-panel" data-panel="security">
          <h4>Privacy & Security</h4>
          
          <form id="security-settings-form">
            <div class="form-group">
              <label for="current-password">Current Password</label>
              <input type="password" id="current-password" placeholder="Enter your current password">
            </div>
            
            <div class="form-group">
              <label for="new-password">New Password</label>
              <input type="password" id="new-password" placeholder="Enter new password">
            </div>
            
            <div class="form-group">
              <label for="confirm-new-password">Confirm New Password</label>
              <input type="password" id="confirm-new-password" placeholder="Confirm new password">
            </div>
            
            <div class="form-group">
              <h5>Data Privacy</h5>
              <div class="checkbox-group">
                <div class="checkbox-item">
                  <input type="checkbox" id="data-collection" checked>
                  <label for="data-collection">Allow data collection to improve recommendations</label>
                </div>
                <div class="checkbox-item">
                  <input type="checkbox" id="third-party-sharing">
                  <label for="third-party-sharing">Share my learning data with educational partners</label>
                </div>
              </div>
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn-save-settings">Update Security Settings</button>
            </div>
            
            <div class="danger-zone">
              <h5>Danger Zone</h5>
              <p>Once you delete your account, there is no going back. Please be certain.</p>
              <button type="button" class="btn-danger">Delete Account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
  
  // Add event listeners for settings functionality
  setTimeout(() => {
    // Settings tab navigation
    const settingsTabs = section.querySelectorAll('.settings-tab');
    const settingsPanels = section.querySelectorAll('.settings-panel');
    
    settingsTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetPanel = tab.dataset.tab;
        
        // Update active tab
        settingsTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show correct panel
        settingsPanels.forEach(panel => {
          panel.classList.remove('active');
          if (panel.dataset.panel === targetPanel) {
            panel.classList.add('active');
          }
        });
      });
    });
    
    // Profile form submission
    const profileForm = section.querySelector('#profile-settings-form');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('profile-name').value;
        const email = document.getElementById('profile-email').value;
        const bio = document.getElementById('profile-bio').value;
        
        // Update user data in localStorage
        const userData = JSON.parse(localStorage.getItem('edupath_user') || '{}');
        userData.name = name;
        userData.email = email;
        userData.bio = bio;
        
        localStorage.setItem('edupath_user', JSON.stringify(userData));
        
        // Update UI
        document.querySelectorAll('.user-name').forEach(el => {
          el.textContent = name;
        });
        
        showNotification('Profile updated successfully');
      });
    }
    
    // Preferences form submission
    const preferencesForm = section.querySelector('#preferences-settings-form');
    if (preferencesForm) {
      preferencesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Learning preferences saved');
      });
    }
    
    // Notifications form submission
    const notificationsForm = section.querySelector('#notifications-settings-form');
    if (notificationsForm) {
      notificationsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Notification settings updated');
      });
    }
    
    // Security form submission
    const securityForm = section.querySelector('#security-settings-form');
    if (securityForm) {
      securityForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-new-password').value;
        
        if (!currentPassword || !newPassword || !confirmPassword) {
          showNotification('Please fill in all password fields', 'error');
          return;
        }
        
        if (newPassword !== confirmPassword) {
          showNotification('New passwords do not match', 'error');
          return;
        }
        
        // In a real app, you would validate the current password against the stored one
        // and use proper security measures
        
        // Clear form
        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-new-password').value = '';
        
        showNotification('Password updated successfully');
      });
    }
    
    // Delete account button
    const deleteAccountBtn = section.querySelector('.btn-danger');
    if (deleteAccountBtn) {
      deleteAccountBtn.addEventListener('click', () => {
        const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
        
        if (confirmed) {
          // Remove user data from local storage
          localStorage.removeItem('edupath_user');
          localStorage.removeItem('edupath_profile');
          
          // Redirect to homepage
          window.location.href = 'index.html';
        }
      });
    }
  }, 100);
  
  return section;
}

// Update user info in dashboard
function updateUserInfo(user) {
  const userNameElements = document.querySelectorAll('.user-name');
  
  userNameElements.forEach(element => {
    element.textContent = user.name || 'User';
  });
}

// Initialize sidebar toggle
function initSidebarToggle() {
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      const sidebar = document.querySelector('.dashboard-sidebar');
      const main = document.querySelector('.dashboard-main');
      
      if (sidebar && main) {
        sidebar.classList.toggle('collapsed');
        main.classList.toggle('expanded');
      }
    });
  }
}

// Initialize notifications dropdown
function initNotificationsDropdown() {
  const notificationButton = document.querySelector('.notification-button');
  
  if (notificationButton) {
    notificationButton.addEventListener('click', () => {
      const dropdown = document.querySelector('.notification-dropdown');
      
      if (dropdown) {
        dropdown.classList.toggle('active');
        
        // Close when clicking outside
        document.addEventListener('click', (e) => {
          if (!e.target.closest('.notifications')) {
            dropdown.classList.remove('active');
          }
        }, { once: true });
      }
    });
  }
}

// Initialize user dropdown
function initUserDropdown() {
  const userButton = document.querySelector('.user-button');
  
  if (userButton) {
    userButton.addEventListener('click', () => {
      const dropdown = document.querySelector('.user-dropdown');
      
      if (dropdown) {
        dropdown.classList.toggle('active');
        
        // Close when clicking outside
        document.addEventListener('click', (e) => {
          if (!e.target.closest('.user-menu')) {
            dropdown.classList.remove('active');
          }
        }, { once: true });
      }
    });
  }
}

// Initialize profile form
function initProfileForm() {
  const profileForm = document.getElementById('profile-form');
  
  if (profileForm) {
    // Section navigation
    const nextButtons = profileForm.querySelectorAll('.btn-next');
    const prevButtons = profileForm.querySelectorAll('.btn-prev');
    
    nextButtons.forEach(button => {
      button.addEventListener('click', () => {
        const currentSection = button.closest('.form-section');
        const nextSectionNumber = button.dataset.next;
        const nextSection = profileForm.querySelector(`.form-section[data-section="${nextSectionNumber}"]`);
        
        if (currentSection && nextSection) {
          currentSection.classList.remove('active');
          nextSection.classList.add('active');
          
          // Update progress
          updateProfileProgress(nextSectionNumber);
        }
      });
    });
    
    prevButtons.forEach(button => {
      button.addEventListener('click', () => {
        const currentSection = button.closest('.form-section');
        const prevSectionNumber = button.dataset.prev;
        const prevSection = profileForm.querySelector(`.form-section[data-section="${prevSectionNumber}"]`);
        
        if (currentSection && prevSection) {
          currentSection.classList.remove('active');
          prevSection.classList.add('active');
          
          // Update progress
          updateProfileProgress(prevSectionNumber);
        }
      });
    });
    
    // Form submission
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Gather form data
      const formData = {
        education: {
          level: document.getElementById('education-level')?.value,
          field: document.getElementById('field-of-study')?.value
        },
        skills: getSelectedSkills(),
        skillLevel: document.getElementById('skill-level')?.value,
        goals: {
          learning: document.getElementById('learning-goal')?.value,
          purpose: document.getElementById('learning-purpose')?.value,
          time: document.getElementById('time-commitment')?.value
        }
      };
      
      // Store profile data
      localStorage.setItem('edupath_profile', JSON.stringify(formData));
      
      // Show success message and redirect
      alert('Profile updated! Generating your personalized learning path...');
      
      // Redirect to a learning path page (would be implemented later)
      // window.location.href = 'learning-path.html';
    });
    
    // Add custom skill
    const addSkillInput = document.querySelector('.add-skill .skill-input');
    
    if (addSkillInput) {
      addSkillInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ',') {
          e.preventDefault();
          
          const skillName = addSkillInput.value.trim();
          if (skillName) {
            addCustomSkill(skillName);
            addSkillInput.value = '';
          }
        }
      });
    }
  }
}

// Update profile completion progress
function updateProfileProgress(sectionNumber) {
  const progressFill = document.querySelector('.progress-fill');
  const progressPercentage = document.querySelector('.progress-percentage');
  
  if (progressFill && progressPercentage) {
    const percentage = sectionNumber * 30; // 3 sections, up to 90%
    
    progressFill.style.width = `${percentage}%`;
    progressPercentage.textContent = `${percentage}%`;
  }
}

// Get selected skills from checkboxes
function getSelectedSkills() {
  const skillCheckboxes = document.querySelectorAll('.skill-checkbox:checked');
  return Array.from(skillCheckboxes).map(checkbox => checkbox.id.replace('skill-', ''));
}

// Add custom skill tag
function addCustomSkill(skillName) {
  const skillTags = document.querySelector('.skill-tags');
  const addSkill = document.querySelector('.add-skill');
  
  if (skillTags && addSkill) {
    const skillId = `skill-${skillName.toLowerCase().replace(/\s+/g, '-')}`;
    
    // Create new skill tag
    const skillTag = document.createElement('div');
    skillTag.className = 'skill-tag';
    skillTag.innerHTML = `
      <input type="checkbox" id="${skillId}" class="skill-checkbox" checked>
      <label for="${skillId}" class="skill-label">${skillName}</label>
    `;
    
    // Insert before the add skill input
    skillTags.insertBefore(skillTag, addSkill);
  }
}

// Initialize path cards
function initPathCards() {
  const saveButtons = document.querySelectorAll('.btn-path-save');
  
  saveButtons.forEach(button => {
    button.addEventListener('click', () => {
      const icon = button.querySelector('i');
      
      if (icon.classList.contains('far')) {
        // Save the path
        icon.classList.remove('far');
        icon.classList.add('fas');
      } else {
        // Unsave the path
        icon.classList.remove('fas');
        icon.classList.add('far');
      }
    });
  });
}

// Initialize resource actions
function initResourceActions() {
  const saveButtons = document.querySelectorAll('.btn-resource-save');
  
  saveButtons.forEach(button => {
    button.addEventListener('click', () => {
      const icon = button.querySelector('i');
      
      if (icon.classList.contains('far')) {
        // Save the resource
        icon.classList.remove('far');
        icon.classList.add('fas');
      } else {
        // Unsave the resource
        icon.classList.remove('fas');
        icon.classList.add('far');
      }
    });
  });
}

// Run landing page animations if on landing page
if (document.querySelector('.hero')) {
  initLandingAnimations();
}

// Add this to the end of your script.js file or add it as inline JavaScript in dashboard.html

document.addEventListener('DOMContentLoaded', function() {
  // Dashboard Navigation
  const navLinks = document.querySelectorAll('.nav-link');
  const dashboardSection = document.getElementById('dashboard-section');
  const learningPathsSection = document.getElementById('learning-paths-section');
  const resourcesSection = document.getElementById('resources-section');
  const settingsSection = document.getElementById('settings-section');

  // Create sections if they don't exist
  if (!learningPathsSection) {
    createLearningPathsSection();
  }
  
  if (!resourcesSection) {
    createResourcesSection();
  }
  
  if (!settingsSection) {
    createSettingsSection();
  }
  
  // Hide all sections except dashboard initially
  if (learningPathsSection) learningPathsSection.style.display = 'none';
  if (resourcesSection) resourcesSection.style.display = 'none';
  if (settingsSection) settingsSection.style.display = 'none';
  
  // Add click handlers for navigation
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      navLinks.forEach(l => l.closest('.nav-item').classList.remove('active'));
      
      // Add active class to clicked link
      this.closest('.nav-item').classList.add('active');
      
      // Hide all sections
      if (dashboardSection) dashboardSection.style.display = 'none';
      if (learningPathsSection) learningPathsSection.style.display = 'none';
      if (resourcesSection) resourcesSection.style.display = 'none';
      if (settingsSection) settingsSection.style.display = 'none';
      
      // Show the selected section
      const target = this.getAttribute('data-target');
      
      switch(target) {
        case 'dashboard':
          if (dashboardSection) dashboardSection.style.display = 'block';
          break;
        case 'paths':
          if (learningPathsSection) learningPathsSection.style.display = 'block';
          break;
        case 'resources':
          if (resourcesSection) resourcesSection.style.display = 'block';
          break;
        case 'settings':
          if (settingsSection) settingsSection.style.display = 'block';
          break;
      }
    });
  });
  
  // Initialize sidebar toggle
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function() {
      const sidebar = document.querySelector('.dashboard-sidebar');
      const main = document.querySelector('.dashboard-main');
      
      if (sidebar && main) {
        sidebar.classList.toggle('collapsed');
        main.classList.toggle('expanded');
      }
    });
  }
  
  // Initialize user dropdown
  const userButton = document.querySelector('.user-button');
  if (userButton) {
    userButton.addEventListener('click', function() {
      const dropdown = document.querySelector('.user-dropdown');
      
      if (dropdown) {
        dropdown.classList.toggle('active');
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
          if (!e.target.closest('.user-menu')) {
            dropdown.classList.remove('active');
          }
        }, { once: true });
      }
    });
  }
  
  // Settings navigation
  const settingsMenuItems = document.querySelectorAll('.settings-menu-item');
  const settingsTabs = document.querySelectorAll('.settings-tab');
  
  settingsMenuItems.forEach(item => {
    item.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all menu items and tabs
      settingsMenuItems.forEach(i => i.classList.remove('active'));
      settingsTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked item and target tab
      this.classList.add('active');
      document.querySelector(`.settings-tab[data-tab="${targetTab}"]`).classList.add('active');
    });
  });
});

// Create Learning Paths Section
function createLearningPathsSection() {
  const dashboardContent = document.querySelector('.dashboard-content');
  
  if (!dashboardContent) return;
  
  const learningPathsSection = document.createElement('div');
  learningPathsSection.id = 'learning-paths-section';
  learningPathsSection.className = 'dashboard-section';
  
  learningPathsSection.innerHTML = `
    <div class="dashboard-card">
      <div class="card-header">
        <h3>Your Learning Paths</h3>
        <p>Continue your learning journey</p>
      </div>
      
      <div class="paths-container">
        <div class="saved-path">
          <div class="path-header">
            <h4>Web Development Fundamentals</h4>
            <span class="path-progress-text">Progress: 45%</span>
          </div>
          
          <div class="path-progress-bar">
            <div class="progress-fill" style="width: 45%"></div>
          </div>
          
          <div class="path-details">
            <div class="path-info">
              <div class="path-info-item">
                <i class="fas fa-tasks"></i>
                <span>9 resources (4 completed)</span>
              </div>
              
              <div class="path-info-item">
                <i class="fas fa-clock"></i>
                <span>Estimated: 15 hours</span>
              </div>
            </div>
            
            <div class="path-buttons">
              <button class="btn-continue">Continue <i class="fas fa-arrow-right"></i></button>
              <button class="btn-more"><i class="fas fa-ellipsis-v"></i></button>
            </div>
          </div>
        </div>
        
        <div class="create-path">
          <div class="create-path-content">
            <div class="create-path-icon">
              <i class="fas fa-plus"></i>
            </div>
            
            <h4>Create New Learning Path</h4>
            <p>Generate a custom learning path based on your interests and goals</p>
            
            <button class="btn-create-path">Create Path</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  dashboardContent.appendChild(learningPathsSection);
  return learningPathsSection;
}

// Create Resources Section
function createResourcesSection() {
  const dashboardContent = document.querySelector('.dashboard-content');
  
  if (!dashboardContent) return;
  
  const resourcesSection = document.createElement('div');
  resourcesSection.id = 'resources-section';
  resourcesSection.className = 'dashboard-section';
  
  resourcesSection.innerHTML = `
    <div class="dashboard-card">
      <div class="card-header">
        <h3>Educational Resources</h3>
        <p>Find the best learning materials</p>
      </div>
      
      <div class="resources-content">
        <div class="resources-filters">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" class="search-input" placeholder="Search resources...">
          </div>
          
          <div class="filter-options">
            <select class="filter-select">
              <option value="">All Types</option>
              <option value="video">Videos</option>
              <option value="article">Articles</option>
              <option value="course">Courses</option>
              <option value="documentation">Documentation</option>
            </select>
            
            <select class="filter-select">
              <option value="">All Topics</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="react">React</option>
            </select>
          </div>
        </div>
        
        <div class="resources-grid">
          <div class="resource-item">
            <div class="resource-thumb">
              <img src="https://img.youtube.com/vi/PkZNo7MFNFg/maxresdefault.jpg" alt="JavaScript Crash Course">
              <span class="resource-type video">Video</span>
            </div>
            
            <div class="resource-content">
              <h4>JavaScript Crash Course For Beginners</h4>
              
              <div class="resource-meta">
                <span><i class="fas fa-clock"></i> 1h 40m</span>
                <span><i class="fas fa-star"></i> 4.8</span>
              </div>
              
              <p>Learn all the JavaScript fundamentals in this comprehensive crash course for beginners.</p>
              
              <div class="resource-footer">
                <div class="resource-source">
                  <img src="https://www.google.com/s2/favicons?domain=youtube.com" alt="YouTube">
                  <span>YouTube</span>
                </div>
                
                <div class="resource-actions">
                  <button class="btn-save"><i class="far fa-bookmark"></i></button>
                  <a href="https://youtu.be/PkZNo7MFNFg" target="_blank" class="btn-view">View <i class="fas fa-external-link-alt"></i></a>
                </div>
              </div>
            </div>
          </div>
          
          <div class="resource-item">
            <div class="resource-thumb">
              <img src="https://www.freecodecamp.org/news/content/images/size/w2000/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png" alt="Learn React">
              <span class="resource-type course">Course</span>
            </div>
            
            <div class="resource-content">
              <h4>React - The Complete Guide</h4>
              
              <div class="resource-meta">
                <span><i class="fas fa-clock"></i> 40h total</span>
                <span><i class="fas fa-star"></i> 4.9</span>
              </div>
              
              <p>Dive into React development with this comprehensive guide covering hooks, Redux, and more.</p>
              
              <div class="resource-footer">
                <div class="resource-source">
                  <img src="https://www.google.com/s2/favicons?domain=freecodecamp.org" alt="freeCodeCamp">
                  <span>freeCodeCamp</span>
                </div>
                
                <div class="resource-actions">
                  <button class="btn-save"><i class="far fa-bookmark"></i></button>
                  <a href="https://www.freecodecamp.org/learn/front-end-development-libraries/" target="_blank" class="btn-view">View <i class="fas fa-external-link-alt"></i></a>
                </div>
              </div>
            </div>
          </div>
          
          <div class="resource-item">
            <div class="resource-thumb">
              <img src="https://geeksforgeeks.org/wp-content/uploads/20201213214632/gfg-300x300.jpg" alt="Python Data Structures">
              <span class="resource-type article">Article</span>
            </div>
            
            <div class="resource-content">
              <h4>Python Data Structures and Algorithms</h4>
              
              <div class="resource-meta">
                <span><i class="fas fa-clock"></i> 25 min read</span>
                <span><i class="fas fa-star"></i> 4.7</span>
              </div>
              
              <p>Learn important data structures and algorithms concepts in Python with practical examples.</p>
              
              <div class="resource-footer">
                <div class="resource-source">
                  <img src="https://www.google.com/s2/favicons?domain=geeksforgeeks.org" alt="GeeksforGeeks">
                  <span>GeeksforGeeks</span>
                </div>
                
                <div class="resource-actions">
                  <button class="btn-save"><i class="far fa-bookmark"></i></button>
                  <a href="https://www.geeksforgeeks.org/python-data-structures/" target="_blank" class="btn-view">View <i class="fas fa-external-link-alt"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="pagination">
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
          <button class="page-btn next">Next <i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
  `;
  
  dashboardContent.appendChild(resourcesSection);
  return resourcesSection;
}

// Create Settings Section
function createSettingsSection() {
  const dashboardContent = document.querySelector('.dashboard-content');
  
  if (!dashboardContent) return;
  
  const settingsSection = document.createElement('div');
  settingsSection.id = 'settings-section';
  settingsSection.className = 'dashboard-section';
  
  settingsSection.innerHTML = `
    <div class="dashboard-card">
      <div class="card-header">
        <h3>Account Settings</h3>
        <p>Manage your preferences and profile</p>
      </div>
      
      <div class="settings-content">
        <div class="settings-nav">
          <ul class="settings-tabs">
            <li class="settings-tab active" data-tab="profile">Profile</li>
            <li class="settings-tab" data-tab="preferences">Preferences</li>
            <li class="settings-tab" data-tab="notifications">Notifications</li>
            <li class="settings-tab" data-tab="security">Privacy & Security</li>
          </ul>
        </div>
        
        <div class="settings-panels">
          <!-- Profile Panel -->
          <div class="settings-panel active" data-panel="profile">
            <h4>Profile Information</h4>
            
            <form id="profile-settings-form">
              <div class="form-group">
                <label for="profile-name">Full Name</label>
                <input type="text" id="profile-name" value="${userData.name || ''}" placeholder="Your name">
              </div>
              
              <div class="form-group">
                <label for="profile-email">Email</label>
                <input type="email" id="profile-email" value="${userData.email || ''}" placeholder="Your email">
              </div>
              
              <div class="form-group">
                <label for="profile-bio">Bio</label>
                <textarea id="profile-bio" placeholder="Tell us about yourself">${userData.bio || ''}</textarea>
              </div>
              
              <div class="form-actions">
                <button type="submit" class="btn-save-settings">Save Changes</button>
              </div>
            </form>
          </div>
          
          <!-- Preferences Panel -->
          <div class="settings-panel" data-panel="preferences">
            <h4>Learning Preferences</h4>
            
            <form id="preferences-settings-form">
              <div class="form-group">
                <label>Preferred Learning Formats</label>
                <div class="checkbox-group">
                  <div class="checkbox-item">
                    <input type="checkbox" id="pref-videos" checked>
                    <label for="pref-videos">Videos</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="pref-articles" checked>
                    <label for="pref-articles">Articles</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="pref-courses" checked>
                    <label for="pref-courses">Interactive Courses</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="pref-docs">
                    <label for="pref-docs">Documentation</label>
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label for="difficulty-level">Preferred Difficulty Level</label>
                <select id="difficulty-level">
                  <option value="beginner">Beginner</option>
                  <option value="intermediate" selected>Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="all">All Levels</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="study-time">Weekly Study Time</label>
                <select id="study-time">
                  <option value="minimal">Less than 5 hours/week</option>
                  <option value="moderate" selected>5-10 hours/week</option>
                  <option value="significant">10-20 hours/week</option>
                  <option value="full-time">20+ hours/week</option>
                </select>
              </div>
              
              <div class="form-actions">
                <button type="submit" class="btn-save-settings">Save Preferences</button>
              </div>
            </form>
          </div>
          
          <!-- Notifications Panel -->
          <div class="settings-panel" data-panel="notifications">
            <h4>Notification Settings</h4>
            
            <form id="notifications-settings-form">
              <div class="toggle-group">
                <div class="toggle-item">
                  <div class="toggle-info">
                    <h5>Email Notifications</h5>
                    <p>Receive updates and recommendations via email</p>
                  </div>
                  <label class="toggle-switch">
                    <input type="checkbox" checked>
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                
                <div class="toggle-item">
                  <div class="toggle-info">
                    <h5>Learning Reminders</h5>
                    <p>Get reminders to continue your learning journey</p>
                  </div>
                  <label class="toggle-switch">
                    <input type="checkbox" checked>
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                
                <div class="toggle-item">
                  <div class="toggle-info">
                    <h5>Resource Updates</h5>
                    <p>Be notified when new resources match your interests</p>
                  </div>
                  <label class="toggle-switch">
                    <input type="checkbox" checked>
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                
                <div class="toggle-item">
                  <div class="toggle-info">
                    <h5>Achievement Notifications</h5>
                    <p>Celebrate your learning milestones</p>
                  </div>
                  <label class="toggle-switch">
                    <input type="checkbox" checked>
                    <span class="toggle-slider"></span>
                  </label>
                </div>
              </div>
              
              <div class="form-actions">
                <button type="submit" class="btn-save-settings">Save Notification Settings</button>
              </div>
            </form>
          </div>
          
          <!-- Security Panel -->
          <div class="settings-panel" data-panel="security">
            <h4>Privacy & Security</h4>
            
            <form id="security-settings-form">
              <div class="form-group">
                <label for="current-password">Current Password</label>
                <input type="password" id="current-password" placeholder="Enter your current password">
              </div>
              
              <div class="form-group">
                <label for="new-password">New Password</label>
                <input type="password" id="new-password" placeholder="Enter new password">
              </div>
              
              <div class="form-group">
                <label for="confirm-new-password">Confirm New Password</label>
                <input type="password" id="confirm-new-password" placeholder="Confirm new password">
              </div>
              
              <div class="form-group">
                <h5>Data Privacy</h5>
                <div class="checkbox-group">
                  <div class="checkbox-item">
                    <input type="checkbox" id="data-collection" checked>
                    <label for="data-collection">Allow data collection to improve recommendations</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="third-party-sharing">
                    <label for="third-party-sharing">Share my learning data with educational partners</label>
                  </div>
                </div>
              </div>
              
              <div class="form-actions">
                <button type="submit" class="btn-save-settings">Update Security Settings</button>
              </div>
              
              <div class="danger-zone">
                <h5>Danger Zone</h5>
                <p>Once you delete your account, there is no going back. Please be certain.</p>
                <button type="button" class="btn-danger">Delete Account</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
  
  dashboardContent.appendChild(settingsSection);
  return settingsSection;
}
