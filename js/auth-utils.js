// Authentication utilities
class AuthUtils {
  static async getCurrentUser() {
    try {
      const response = await fetch('/.auth/me');
      const user = await response.json();
      return user.clientPrincipal;
    } catch (error) {
      console.error('Failed to get user info:', error);
      return null;
    }
  }
  
  static async displayUserName(elementId = 'user-name') {
    const user = await this.getCurrentUser();
    const element = document.getElementById(elementId);
    if (element && user) {
      element.textContent = `Welcome, ${user.userDetails}`;
    }
  }
}

// Auto-load user info when page loads
document.addEventListener('DOMContentLoaded', () => {
  AuthUtils.displayUserName();
});