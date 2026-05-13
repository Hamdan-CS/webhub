const resolveApiBaseUrl = () => {
  const configured = import.meta.env.VITE_API_URL as string | undefined;

  if (import.meta.env.DEV) {
    return configured || 'http://localhost:3001/api';
  }

  if (configured && !/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(configured)) {
    return configured;
  }

  return '/api';
};

const API_BASE_URL = resolveApiBaseUrl();

export const submitContactForm = async (data: {
  name: string;
  email: string;
  topic: string;
  message: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to submit contact form';
      try {
        const errorData = await response.json();
        errorMessage = errorData?.error || errorData?.details || errorMessage;
      } catch {
        // Keep default message when response is not JSON.
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Cannot connect to API. Check your deployed function configuration.');
    }

    console.error('Error submitting contact form:', error);
    throw error;
  }
};

export const submitServiceRequest = async (data: {
  selectedService: string;
  email: string;
  domain?: string;
  socialMedia?: string;
  message: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/submit-service-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to submit service request';
      try {
        const errorData = await response.json();
        errorMessage = errorData?.error || errorData?.details || errorMessage;
      } catch {
        // Keep default message when response is not JSON.
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Cannot connect to API. Check your deployed function configuration.');
    }

    console.error('Error submitting service request:', error);
    throw error;
  }
};