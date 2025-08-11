// Header loader utility
class HeaderLoader {
  static async loadHeader(headerType) {
    try {
      const response = await fetch(`/includes/header-${headerType}.html`);
      const headerHTML = await response.text();
      
      const headerContainer = document.getElementById('header-container');
      if (headerContainer) {
        headerContainer.innerHTML = headerHTML;
      }
    } catch (error) {
      console.error(`Failed to load ${headerType} header:`, error);
    }
  }
}

// Auto-load header based on page location
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  let headerType = 'public';
  
  if (path.startsWith('/internal')) {
    headerType = 'internal';
  } else if (path.startsWith('/portal')) {
    headerType = 'portal';
  }
  
  HeaderLoader.loadHeader(headerType);
});