// API client utility
class ApiClient {
  static async request(endpoint, options = {}) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(`/api/${endpoint}`, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Asset API methods
  static async getAssets() {
    return this.request('assets');
  }

  static async createAsset(asset) {
    return this.request('assets', {
      method: 'POST',
      body: JSON.stringify(asset)
    });
  }

  // Customer API methods
  static async getCustomers() {
    return this.request('customers');
  }

  static async createCustomer(customer) {
    return this.request('customers', {
      method: 'POST',
      body: JSON.stringify(customer)
    });
  }

  // Portal API methods
  static async getPortalData() {
    return this.request('portal');
  }
}