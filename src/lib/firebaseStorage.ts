import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

const storage = getStorage();

export interface TruckData {
  id?: string;
  model: string;
  year: number;
  price: number;
  mileage: string;
  location: string;
  transmission: string;
  enginePower: string;
  fuelType: string;
  features: string[];
  images: string[]; // Array of Firebase Storage URLs
  videos?: string[]; // Array of Firebase Storage video URLs
  mainImage: string; // Primary image URL
  status: 'available' | 'sold' | 'reserved';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  description?: string;
}

// Upload truck images to Firebase Storage
export async function uploadTruckImage(file: File, truckId: string, imageIndex: number): Promise<string> {
  const timestamp = Date.now();
  const fileName = `trucks/${truckId}/images/${timestamp}_${imageIndex}_${file.name}`;
  const storageRef = ref(storage, fileName);
  
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  
  return downloadURL;
}

// Upload truck video to Firebase Storage
export async function uploadTruckVideo(file: File, truckId: string): Promise<string> {
  const timestamp = Date.now();
  const fileName = `trucks/${truckId}/videos/${timestamp}_${file.name}`;
  const storageRef = ref(storage, fileName);
  
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  
  return downloadURL;
}

// Add a new truck to Firestore
export async function addTruck(truckData: Omit<TruckData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const trucksRef = collection(db, 'trucks');
  const docRef = await addDoc(trucksRef, {
    ...truckData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  
  return docRef.id;
}

// Update truck data
export async function updateTruck(truckId: string, updates: Partial<TruckData>): Promise<void> {
  const truckRef = doc(db, 'trucks', truckId);
  await updateDoc(truckRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
}

// Delete truck and its images
export async function deleteTruck(truckId: string, imageUrls: string[], videoUrls?: string[]): Promise<void> {
  // Delete images from storage
  for (const url of imageUrls) {
    try {
      const imageRef = ref(storage, url);
      await deleteObject(imageRef);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }
  
  // Delete videos from storage
  if (videoUrls) {
    for (const url of videoUrls) {
      try {
        const videoRef = ref(storage, url);
        await deleteObject(videoRef);
      } catch (error) {
        console.error('Error deleting video:', error);
      }
    }
  }
  
  // Delete truck document
  const truckRef = doc(db, 'trucks', truckId);
  await deleteDoc(truckRef);
}

// Get all trucks
export async function getAllTrucks(): Promise<TruckData[]> {
  const trucksRef = collection(db, 'trucks');
  const q = query(trucksRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as TruckData));
}

// Get available trucks only
export async function getAvailableTrucks(): Promise<TruckData[]> {
  const trucksRef = collection(db, 'trucks');
  const q = query(
    trucksRef, 
    where('status', '==', 'available'),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as TruckData));
}

// Get single truck by ID
export async function getTruckById(truckId: string): Promise<TruckData | null> {
  const truckRef = doc(db, 'trucks', truckId);
  const snapshot = await getDoc(truckRef);
  
  if (!snapshot.exists()) {
    return null;
  }
  
  return {
    id: snapshot.id,
    ...snapshot.data()
  } as TruckData;
}

// Search trucks
export async function searchTrucks(filters: {
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  fuelType?: string;
  status?: string;
}): Promise<TruckData[]> {
  const trucksRef = collection(db, 'trucks');
  let q = query(trucksRef, orderBy('createdAt', 'desc'));
  
  if (filters.status) {
    q = query(q, where('status', '==', filters.status));
  }
  
  const snapshot = await getDocs(q);
  let trucks = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as TruckData));
  
  // Client-side filtering for range queries
  if (filters.minPrice !== undefined) {
    trucks = trucks.filter(t => t.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    trucks = trucks.filter(t => t.price <= filters.maxPrice!);
  }
  if (filters.minYear !== undefined) {
    trucks = trucks.filter(t => t.year >= filters.minYear!);
  }
  if (filters.maxYear !== undefined) {
    trucks = trucks.filter(t => t.year <= filters.maxYear!);
  }
  if (filters.fuelType) {
    trucks = trucks.filter(t => t.fuelType === filters.fuelType);
  }
  
  return trucks;
}
