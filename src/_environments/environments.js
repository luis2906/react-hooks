const backendHost = process.env.REACT_APP_API || 'http://127.0.0.1:8000';

const frontHost = process.env.REACT_APP_FRONT || 'http://127.0.0.1:3000';

export const API_ROOT = `${backendHost}/api`;
export const FRONT_ROOT = `${frontHost}`;
