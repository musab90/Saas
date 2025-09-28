const API_BASE_URL = 'http://localhost:4040/api';

export interface SuperAdminCredentials {
  email: string;
  password: string;
}

export interface SuperAdmin {
  id: string;
  email: string;
  name?: string;
  role: 'superadmin';
}

export interface SuperAdminLoginResponse {
  success: boolean;
  message: string;
  data?: {
    user: SuperAdmin;
    token: string;
  };
}

export interface SuperAdminRefreshResponse {
  success: boolean;
  message: string;
  data?: {
    user: SuperAdmin;
    token: string;
  };
}

export const superAdminAuthService = {
  async login(credentials: SuperAdminCredentials): Promise<SuperAdminLoginResponse> {
    try {
      console.log('Making API call to:', `${API_BASE_URL}/admin/login`);
      console.log('Request body:', credentials);
      
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      console.log('Response status:', response.status);
      console.log('Response status text:', response.statusText);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('=== FULL API RESPONSE ===');
      console.log('Raw response data:', JSON.stringify(data, null, 2));
      console.log('Response type:', typeof data);
      console.log('Response keys:', Object.keys(data));
      console.log('========================');
      return data;
    } catch (error) {
      console.error('Network or parsing error:', error);
      throw error;
    }
  },

  // Test function to help debug API response
  async testConnection(): Promise<void> {
    try {
      console.log('Testing API connection...');
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'test@test.com', password: 'test' }),
      });
      
      console.log('Test response status:', response.status);
      const data = await response.text();
      console.log('Test response body:', data);
    } catch (error) {
      console.error('Test connection error:', error);
    }
  },

  async refreshToken(token: string): Promise<SuperAdminRefreshResponse> {
    const response = await fetch(`${API_BASE_URL}/admin/refresh`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  },
};
