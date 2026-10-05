import api from './api';

/**
 * MaanWin51 - Authentication Service
 * 
 * Interacts with backend PHP authentication endpoints.
 */
export const authService = {
  /**
   * Register a new user account (Phone or Email)
   * On success, backend creates account, logs user in, and sets session cookie.
   * @param {Object} payload
   */
  async register(payload) {
    return api.post('/auth/register.php', payload);
  },

  /**
   * Authenticate user with credentials (Phone or Email)
   * @param {Object} credentials
   */
  async login(credentials) {
    return api.post('/auth/login.php', credentials);
  },

  /**
   * Destroy active PHP session
   */
  async logout() {
    return api.post('/auth/logout.php');
  },

  /**
   * Retrieve current authenticated user from session
   */
  async getCurrentUser() {
    return api.get('/auth/me.php');
  },

  /**
   * Request password reset instructions
   * @param {Object} data
   */
  async forgotPassword(data) {
    return api.post('/auth/forgot-password.php', data);
  },

  /**
   * Reset password with verified token
   * @param {Object} data
   */
  async resetPassword(data) {
    return api.post('/auth/reset-password.php', data);
  },
};

export default authService;
