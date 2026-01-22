# Firebase Storage & Real Inventory Guide

## Overview
Your Firebase app is now set up to store real truck images/videos and data instead of placeholders!

## 🔧 What's Been Set Up

### 1. **Firebase Storage** - For Images & Videos
- Stores all truck photos and videos
- Organized by truck ID: `trucks/{truckId}/images/` and `trucks/{truckId}/videos/`
- Automatic URL generation for web display

### 2. **Firestore Database** - For Truck Data
- Collection: `trucks`
- Each document contains: model, year, price, mileage, features, image URLs, etc.
- Real-time updates and queries

### 3. **Admin Upload Page** - `/admin/trucks/new`
- Form to add new trucks
- Upload multiple images and videos
- Set main display image
- All data saved to Firebase

## 📝 How to Add Real Trucks

### Step 1: Enable Firebase Storage (REQUIRED)
1. Go to [Firebase Console](https://console.firebase.google.com/project/euro-truck-export/storage)
2. Click "Get Started"
3. Choose "Start in production mode" (we'll secure it later)
4. Click "Done"

### Step 2: Update Storage Security Rules
1. In Firebase Console > Storage > Rules tab
2. Replace with these rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to upload
    match /trucks/{truckId}/{allPaths=**} {
      allow read: if true;  // Anyone can view
      allow write: if request.auth != null;  // Only authenticated users can upload
    }
  }
}
```

3. Click "Publish"

### Step 3: Add Your First Truck
1. Sign in to your website
2. Go to: `https://euro-truck-export.web.app/admin/trucks/new`
3. Fill in the form:
   - Model: "Volvo FH16"
   - Year: 2020
   - Price: 45000
   - etc.
4. Upload images (multiple files)
5. Optionally upload videos
6. Click "Add Truck"

### Step 4: Update Inventory Page to Use Real Data
You need to modify your `Inventory.tsx` to fetch from Firebase instead of using placeholder data.

## 🔄 Migrating from Placeholder to Real Data

### Current State:
- Your app uses fake data from `truckData.ts`
- Images are placeholders from Unsplash

### To Switch to Firebase:

**Option A: Replace existing inventory page**
```typescript
// In src/pages/Inventory.tsx
import { useTrucks } from '../hooks/useTrucks';

function Inventory() {
  const { trucks, loading, error } = useTrucks();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  // Use 'trucks' instead of placeholder data
  return (
    // Your existing JSX, but map over 'trucks'
  );
}
```

**Option B: Gradual migration**
Keep placeholders for now, add new trucks via admin panel, then switch when ready.

## 🎯 Next Steps

### 1. Enable Firebase Storage (CRITICAL)
Without this, image uploads will fail!

### 2. Test the Admin Upload
- Visit `/admin/trucks/new`
- Upload a test truck with real photos
- Check Firebase Console > Storage to see uploaded files
- Check Firebase Console > Firestore to see truck data

### 3. Update Your Inventory Page
Replace the placeholder data fetching with the `useTrucks()` hook.

### 4. Add Admin Protection (Recommended)
Create an admin-only route protection:

```typescript
// src/components/AdminRoute.tsx
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  
  // Add admin check here (e.g., check email against list of admins)
  const isAdmin = currentUser?.email === 'rayane.s.bahader@gmail.com';
  
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
}
```

Then wrap admin routes:
```typescript
<Route path="/admin/trucks/new" element={
  <AdminRoute>
    <AdminTruckUpload />
  </AdminRoute>
} />
```

## 📊 Data Structure

### Firestore Document (trucks collection):
```json
{
  "model": "Volvo FH16",
  "year": 2020,
  "price": 45000,
  "mileage": "450,000 km",
  "location": "Netherlands",
  "transmission": "Manual",
  "enginePower": "540 HP",
  "fuelType": "Diesel",
  "features": ["Air Conditioning", "Cruise Control"],
  "images": [
    "https://firebasestorage.googleapis.com/...",
    "https://firebasestorage.googleapis.com/..."
  ],
  "videos": ["https://firebasestorage.googleapis.com/..."],
  "mainImage": "https://firebasestorage.googleapis.com/...",
  "status": "available",
  "description": "Well maintained truck...",
  "createdAt": Timestamp,
  "updatedAt": Timestamp
}
```

## 🚀 Quick Start Checklist

- [ ] Enable Firebase Storage in Console
- [ ] Update Storage security rules
- [ ] Sign in to your website
- [ ] Visit `/admin/trucks/new`
- [ ] Upload first real truck with photos
- [ ] Check Firebase Console to verify upload
- [ ] Update Inventory page to use `useTrucks()` hook
- [ ] Test viewing the truck on the website

## 💡 Tips

1. **Image Optimization**: Compress images before upload (aim for under 1MB each)
2. **Video Length**: Keep videos under 50MB for faster loading
3. **Batch Uploads**: You can add multiple trucks, then switch to real data all at once
4. **Backup**: Always keep original photos/videos locally as backup

## 🛠 Troubleshooting

**Images not uploading?**
- Check Storage is enabled in Firebase Console
- Check browser console for errors
- Verify Storage security rules are published

**Can't access admin page?**
- Make sure you're signed in
- Check the URL is correct: `/admin/trucks/new`

**Trucks not showing?**
- Make sure you've updated Inventory.tsx to use `useTrucks()` hook
- Check Firestore Console to see if trucks are saved
- Check browser console for errors

## Need Help?
- Check Firebase Console > Firestore to see your data
- Check Firebase Console > Storage to see uploaded files
- Check browser console (F12) for JavaScript errors
