import axios from 'axios';

export const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
  },
});

// Fetch a new request token and redirect to TMDB authentication page
export const fetchToken = async () => {
  try {
    const { data } = await moviesApi.get('/authentication/token/new');

    if (data.success) {
      localStorage.setItem('request_token', data.request_token);
      window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=${window.location.origin}/approved`;
      return data.request_token;
    }

    console.error('Failed to create request token.');
    return null;
  } catch (error) {
    console.error('Your authentication token could not be created:', error);
    return null;
  }
};

// Create a session ID using the stored request token
export const createSessionId = async () => {
  const token = localStorage.getItem('request_token');

  if (!token) {
    return null;
  }

  try {
    const { data: { session_id } } = await moviesApi.post('/authentication/session/new', {
      request_token: token,
    });

    localStorage.setItem('session_id', session_id);
    return session_id;
  } catch (error) {
    console.error('Your session id could not be created:', error);
    return null;
  }
};
