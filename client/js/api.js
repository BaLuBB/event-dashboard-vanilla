const API = {
  baseURL: window.location.origin + '/api',
  
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };
    
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      // 204 No Content hat keinen Body
      if (response.status === 204) {
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  
  // Events
  getEvents() {
    return this.request('/events');
  },
  
  getEvent(id) {
    return this.request(`/events/${id}`);
  },
  
  createEvent(data) {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  
  updateEvent(id, data) {
    return this.request(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },
  
  deleteEvent(id) {
    return this.request(`/events/${id}`, {
      method: 'DELETE'
    });
  },
  
  getStats() {
    return this.request('/stats');
  }
};
