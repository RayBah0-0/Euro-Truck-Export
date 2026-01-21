// Utilities for managing recently viewed and saved trucks in localStorage

export interface TruckBasic {
  id: number;
  brand: string;
  model: string;
  year: number;
  image: string;
  status: string;
  location: string;
  mileage: string;
}

const RECENTLY_VIEWED_KEY = 'euro_truck_recently_viewed';
const SAVED_TRUCKS_KEY = 'euro_truck_saved';

// Recently Viewed
export function getRecentlyViewed(): TruckBasic[] {
  try {
    const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addToRecentlyViewed(truck: TruckBasic): void {
  try {
    let recent = getRecentlyViewed();
    // Remove if already exists
    recent = recent.filter(t => t.id !== truck.id);
    // Add to front
    recent.unshift(truck);
    // Keep only last 6
    recent = recent.slice(0, 6);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recent));
  } catch (e) {
    console.error('Failed to save recently viewed:', e);
  }
}

// Saved Trucks (Watchlist)
export function getSavedTrucks(): TruckBasic[] {
  try {
    const stored = localStorage.getItem(SAVED_TRUCKS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function isTruckSaved(truckId: number): boolean {
  const saved = getSavedTrucks();
  return saved.some(t => t.id === truckId);
}

export function toggleSavedTruck(truck: TruckBasic): boolean {
  try {
    let saved = getSavedTrucks();
    const exists = saved.some(t => t.id === truck.id);
    
    if (exists) {
      saved = saved.filter(t => t.id !== truck.id);
    } else {
      saved.push(truck);
    }
    
    localStorage.setItem(SAVED_TRUCKS_KEY, JSON.stringify(saved));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('savedTrucksUpdated'));
    }
    return !exists; // Return new saved state
  } catch (e) {
    console.error('Failed to toggle saved truck:', e);
    return false;
  }
}
