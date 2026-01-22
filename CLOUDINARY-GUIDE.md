# Cloudinary Integration Guide

## ✅ Setup Complete!

Your Cloudinary account is integrated and ready to use.

**Cloud Name:** `dqhesb1lq`

## 📸 How to Upload & Use Images

### Step 1: Upload Images to Cloudinary

1. Go to: https://console.cloudinary.com/console/media_library
2. Create a folder structure:
   - Click "Create Folder" → Name it `trucks`
   - Inside `trucks`, create subfolders for each truck (optional)
3. Upload images:
   - Drag & drop images into Cloudinary
   - Or click "Upload" → Select files

### Step 2: Get Public ID from Cloudinary

After uploading, each image gets a **Public ID**. Examples:
- If uploaded to root: `image-name.jpg` → Public ID: `image-name`
- If in trucks folder: `trucks/volvo-fh16-1.jpg` → Public ID: `trucks/volvo-fh16-1`

**To find Public ID:**
- Click on any image in Media Library
- Copy the "Public ID" shown (e.g., `trucks/volvo-fh16-main`)

### Step 3: Update Your Truck Data

Open `src/lib/truckData.ts` and use Cloudinary Public IDs:

```typescript
// OLD WAY (Unsplash placeholders):
{
  id: '1',
  model: 'Volvo FH16',
  image: 'https://images.unsplash.com/photo-1234567890',
  images: ['https://images.unsplash.com/photo-1234567890']
}

// NEW WAY (Cloudinary):
{
  id: '1',
  model: 'Volvo FH16',
  image: 'trucks/volvo-fh16-main',  // Just the Public ID!
  images: [
    'trucks/volvo-fh16-1',
    'trucks/volvo-fh16-2',
    'trucks/volvo-fh16-3'
  ]
}
```

That's it! The helper functions will automatically convert these to full optimized URLs.

## 🔧 Using Cloudinary Images in Your Code

### Option 1: Simple URL String (Recommended for your current setup)

```typescript
import { getCloudinaryUrl, getThumbnailUrl } from '@/lib/cloudinary';

// In your component:
const imageUrl = getCloudinaryUrl('trucks/volvo-fh16-1', 800);
// Returns: "https://res.cloudinary.com/dqhesb1lq/image/upload/w_800,f_auto,q_auto/trucks/volvo-fh16-1"

<img src={imageUrl} alt="Truck" />
```

### Option 2: Advanced Cloudinary React Component

```typescript
import { AdvancedImage } from '@cloudinary/react';
import { getCloudinaryImage } from '@/lib/cloudinary';

// In your component:
const img = getCloudinaryImage('trucks/volvo-fh16-1', 800, 600);

<AdvancedImage cldImg={img} />
```

## 📁 Recommended Folder Structure in Cloudinary

```
cloudinary/
├── trucks/
│   ├── volvo-fh16-750/
│   │   ├── main.jpg         → Public ID: trucks/volvo-fh16-750/main
│   │   ├── interior.jpg     → Public ID: trucks/volvo-fh16-750/interior
│   │   ├── engine.jpg       → Public ID: trucks/volvo-fh16-750/engine
│   │   └── side-view.jpg    → Public ID: trucks/volvo-fh16-750/side-view
│   ├── mercedes-actros-1845/
│   │   ├── main.jpg
│   │   └── ...
│   └── ...
```

## 🎯 Quick Workflow Example

Let's say you want to add a new Volvo FH16 truck:

1. **Take photos** of the truck
2. **Upload to Cloudinary:**
   - Go to Media Library → `trucks` folder
   - Create folder: `volvo-fh16-2020-abc123`
   - Upload 5 photos: `main.jpg`, `interior.jpg`, `exterior.jpg`, `engine.jpg`, `dashboard.jpg`

3. **Update truckData.ts:**
```typescript
{
  id: 'volvo-fh16-2020-abc123',
  model: 'Volvo FH16 750',
  year: 2020,
  price: 45000,
  image: 'trucks/volvo-fh16-2020-abc123/main',
  images: [
    'trucks/volvo-fh16-2020-abc123/main',
    'trucks/volvo-fh16-2020-abc123/interior',
    'trucks/volvo-fh16-2020-abc123/exterior',
    'trucks/volvo-fh16-2020-abc123/engine',
    'trucks/volvo-fh16-2020-abc123/dashboard'
  ],
  // ... rest of truck data
}
```

4. **Commit & Push:**
```bash
git add .
git commit -m "Add new Volvo FH16 truck"
git push origin main
```

5. **Done!** Your site automatically updates.

## 🚀 Benefits You Get Automatically

✅ **Automatic format optimization** - Serves WebP to Chrome, AVIF to Safari, JPEG to old browsers  
✅ **Automatic compression** - Reduces file size by 50-80% without quality loss  
✅ **CDN delivery** - Fast loading worldwide  
✅ **Responsive images** - Different sizes for mobile/desktop  
✅ **FREE tier** - 25GB storage, 25GB bandwidth/month  

## 💡 Tips

1. **Image Names:** Use descriptive names like `volvo-fh16-front.jpg` instead of `IMG_1234.jpg`
2. **Image Size:** Upload high-res (1920px+), Cloudinary will optimize/resize automatically
3. **Organization:** Use folders to keep trucks organized
4. **Backup:** Keep original photos locally as backup

## 🔗 Useful Links

- **Media Library:** https://console.cloudinary.com/console/media_library
- **Upload Widget:** https://console.cloudinary.com/console/media_library/upload
- **Dashboard:** https://console.cloudinary.com/console/

## ❓ Need to Update the Code?

If you want me to update your existing components (Inventory, TruckDetail) to use Cloudinary URLs automatically, just let me know! The helper functions are ready to use.
