// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Header background change on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(10, 10, 15, 0.95)';
    header.style.backdropFilter = 'blur(25px)';
  } else {
    header.style.background = 'rgba(10, 10, 15, 0.9)';
    header.style.backdropFilter = 'blur(20px)';
  }
});

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const nombre = formData.get('nombre');
      const email = formData.get('email');
      const telefono = formData.get('telefono');
      const proyecto = formData.get('proyecto');
      const mensaje = formData.get('mensaje');
      
      // Create WhatsApp message
      const whatsappMessage = `¡Hola Johanna! 👋

Soy ${nombre} y me interesa trabajar contigo.

📧 Email: ${email}
📱 Teléfono: ${telefono || 'No proporcionado'}
🎯 Tipo de proyecto: ${proyecto || 'No especificado'}

💬 Mensaje:
${mensaje}

¡Espero tu respuesta!`;
      
      // Encode message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappURL = `https://wa.me/573004622943?text=${encodedMessage}`;
      
      // Open WhatsApp
      window.open(whatsappURL, '_blank');
      
      // Show success message
      showNotification('¡Mensaje enviado! Te redirigiremos a WhatsApp.', 'success');
      
      // Reset form after a short delay
      setTimeout(() => {
        form.reset();
      }, 1000);
    });
  }
});

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  `;
  
  // Add to document
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    opacity: 0.8;
    transition: opacity 0.2s ease;
  }
  
  .notification-close:hover {
    opacity: 1;
  }
`;
document.head.appendChild(style);

// Portfolio item interactions
document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('click', function() {
    const title = this.querySelector('h3').textContent;
    const description = this.querySelector('p').textContent;
    
    // Create modal or show more info
    showPortfolioModal(title, description);
  });
});

function showPortfolioModal(title, description) {
  // Remove existing modal
  const existingModal = document.querySelector('.portfolio-modal');
  if (existingModal) existingModal.remove();
  
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'portfolio-modal';
  modal.innerHTML = `
    <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="modal-close" onclick="this.closest('.portfolio-modal').remove()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <p>${description}</p>
        <p>¿Te interesa un proyecto similar? <strong>¡Hablemos!</strong></p>
        <a href="https://wa.me/573004622943?text=Hola%20Johanna,%20me%20interesa%20un%20proyecto%20como%20${encodeURIComponent(title)}" 
           target="_blank" class="modal-cta">
          <i class="fab fa-whatsapp"></i> Contactar por WhatsApp
        </a>
      </div>
    </div>
  `;
  
  // Add modal styles
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease;
  `;
  
  document.body.appendChild(modal);
}

// Add modal styles
const modalStyle = document.createElement('style');
modalStyle.textContent = `
  .modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
  }
  
  .modal-content {
    position: relative;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    color: white;
    animation: slideInUp 0.3s ease;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .modal-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s ease;
  }
  
  .modal-close:hover {
    opacity: 1;
  }
  
  .modal-body p {
    margin-bottom: 1rem;
    line-height: 1.6;
    color: #b8b8d1;
  }
  
  .modal-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #25D366;
    color: white;
    padding: 0.8rem 1.5rem;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
  }
  
  .modal-cta:hover {
    background: #22c55e;
    transform: translateY(-2px);
  }
  
  @keyframes slideInUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(modalStyle);

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Trigger fade-in animations
  setTimeout(() => {
    document.querySelectorAll('.fade-in').forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 100);
    });
  }, 500);
});

console.log('🚀 Johanna Mora Web - Todos los scripts cargados correctamente!');