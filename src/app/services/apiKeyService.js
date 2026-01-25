const STORAGE_KEY = 'gemini_user_api_key';

export function setGeminiApiKey(apiKey) {
  try {
    localStorage.setItem(STORAGE_KEY, apiKey.trim());
    return true;
  } catch (error) {
    console.error('Failed to save API key:', error);
    return false;
  }
}

export function getGeminiApiKey() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to get API key:', error);
    return null;
  }
}

export function clearGeminiApiKey() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear API key:', error);
    return false;
  }
}

export function hasCustomApiKey() {
  return !!getGeminiApiKey();
}

export function isValidApiKeyFormat(apiKey) {
  return apiKey && apiKey.startsWith('AIza') && apiKey.length > 20;
}