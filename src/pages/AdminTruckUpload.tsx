import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { uploadTruckImage, uploadTruckVideo, addTruck } from '../lib/firebaseStorage';
import { useNavigate } from 'react-router-dom';

export default function AdminTruckUpload() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  
  const [formData, setFormData] = useState({
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: '',
    location: '',
    transmission: 'Manual',
    enginePower: '',
    fuelType: 'Diesel',
    description: '',
    features: [''],
    status: 'available' as const,
  });
  
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  // Check if user is admin (you should implement proper admin check)
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Please sign in to access this page.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setUploadProgress('Starting upload...');

    try {
      // Generate temporary truck ID
      const tempTruckId = `truck_${Date.now()}`;
      
      // Upload images
      setUploadProgress('Uploading images...');
      const imageUrls: string[] = [];
      for (let i = 0; i < imageFiles.length; i++) {
        setUploadProgress(`Uploading image ${i + 1} of ${imageFiles.length}...`);
        const url = await uploadTruckImage(imageFiles[i], tempTruckId, i);
        imageUrls.push(url);
      }
      
      // Upload videos
      const videoUrls: string[] = [];
      if (videoFiles.length > 0) {
        setUploadProgress('Uploading videos...');
        for (let i = 0; i < videoFiles.length; i++) {
          setUploadProgress(`Uploading video ${i + 1} of ${videoFiles.length}...`);
          const url = await uploadTruckVideo(videoFiles[i], tempTruckId);
          videoUrls.push(url);
        }
      }
      
      // Create truck document
      setUploadProgress('Creating truck listing...');
      const truckId = await addTruck({
        ...formData,
        images: imageUrls,
        videos: videoUrls.length > 0 ? videoUrls : undefined,
        mainImage: imageUrls[mainImageIndex] || imageUrls[0],
        features: formData.features.filter(f => f.trim() !== ''),
      });
      
      setUploadProgress('Upload complete!');
      alert('Truck added successfully!');
      navigate(`/truck/${truckId}`);
      
    } catch (error) {
      console.error('Error uploading truck:', error);
      alert('Error uploading truck. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideoFiles(Array.from(e.target.files));
    }
  };

  const addFeatureField = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Truck</h1>
        
        {uploadProgress && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700">{uploadProgress}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
              <input
                type="text"
                required
                value={formData.model}
                onChange={e => setFormData({...formData, model: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Volvo FH16"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <input
                type="number"
                required
                value={formData.year}
                onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (€)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={e => setFormData({...formData, price: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mileage</label>
              <input
                type="text"
                required
                value={formData.mileage}
                onChange={e => setFormData({...formData, mileage: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 450,000 km"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
              <select
                value={formData.transmission}
                onChange={e => setFormData({...formData, transmission: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>Manual</option>
                <option>Automatic</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Engine Power</label>
              <input
                type="text"
                required
                value={formData.enginePower}
                onChange={e => setFormData({...formData, enginePower: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 540 HP"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
              <select
                value={formData.fuelType}
                onChange={e => setFormData({...formData, fuelType: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>Diesel</option>
                <option>Electric</option>
                <option>Hybrid</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Detailed description of the truck..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
            {formData.features.map((feature, index) => (
              <input
                key={index}
                type="text"
                value={feature}
                onChange={e => updateFeature(index, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-2"
                placeholder="e.g., Air Conditioning"
              />
            ))}
            <button
              type="button"
              onClick={addFeatureField}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              + Add Feature
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images (Multiple files) *
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              required
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {imageFiles.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">{imageFiles.length} images selected</p>
                <label className="block text-sm font-medium text-gray-700 mt-2">Main Image Index:</label>
                <input
                  type="number"
                  min={0}
                  max={imageFiles.length - 1}
                  value={mainImageIndex}
                  onChange={e => setMainImageIndex(parseInt(e.target.value))}
                  className="w-32 px-3 py-1 border border-gray-300 rounded"
                />
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Videos (Optional)
            </label>
            <input
              type="file"
              accept="video/*"
              multiple
              onChange={handleVideoChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {videoFiles.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">{videoFiles.length} videos selected</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Uploading...' : 'Add Truck'}
          </button>
        </form>
      </div>
    </div>
  );
}
