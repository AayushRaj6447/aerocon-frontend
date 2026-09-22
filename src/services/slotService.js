export const API_BASE = 'https://aerocon-backend.onrender.com/api';

let cachedSlots = null;
let activeFetchPromise = null;

/**
 * Pre-fetches the slots from the Render backend immediately on page load.
 * Wakes up Render free tier from sleep and caches the slot data in memory.
 * 
 * @param {boolean} forceRefresh - If true, ignores cache and makes a new network request.
 * @returns {Promise<Array>} Array of slot objects.
 */
export const prefetchSlots = async (forceRefresh = false) => {
  if (!forceRefresh && cachedSlots && cachedSlots.length > 0) {
    return cachedSlots;
  }

  if (!forceRefresh && activeFetchPromise) {
    return activeFetchPromise;
  }

  activeFetchPromise = fetch(`${API_BASE}/slots`)
    .then(async (res) => {
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      cachedSlots = data.data || [];
      return cachedSlots;
    })
    .catch((err) => {
      console.warn('Backend wake-up / slots prefetch warning:', err);
      throw err;
    })
    .finally(() => {
      activeFetchPromise = null;
    });

  return activeFetchPromise;
};

export const getCachedSlots = () => cachedSlots;

export const setCachedSlots = (slots) => {
  cachedSlots = slots;
};
