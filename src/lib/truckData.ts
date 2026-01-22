// Shared truck data with marketplace features

export interface Truck {
  id: number;
  brand: string;
  model: string;
  modelType: string;
  year: number;
  mileage: string;
  condition: string;
  euro: string;
  status: string;
  location: string;
  color: string;
  image: string;
  images: string[];
  engine: string;
  transmission: string;
  axle: string;
  cabin: string;
  immediateExport: boolean;
  updatedDaysAgo: number;
  availableRegions: string[];
  documentation: {
    registration: 'ready' | 'request';
    exportDocs: 'ready' | 'request';
    inspection: 'ready' | 'request';
    serviceHistory: 'ready' | 'request';
  };
}

export const TRUCKS: Truck[] = [
  {
    id: 1,
    brand: 'Mercedes-Benz',
    model: 'Actros 1845',
    modelType: 'actros',
    year: 2016,
    mileage: '850,000 km',
    condition: 'Used',
    euro: 'Euro 6',
    status: 'Available',
    location: 'Germany',
    color: 'White',
    image: 'https://res.cloudinary.com/dqhesb1lq/image/upload/w_800,f_auto,q_auto/6v_c8wdiy',
    images: [
      'https://res.cloudinary.com/dqhesb1lq/image/upload/w_1200,f_auto,q_auto/6v_c8wdiy',
      'https://res.cloudinary.com/dqhesb1lq/image/upload/w_1200,f_auto,q_auto/35_uebtit',
      'https://res.cloudinary.com/dqhesb1lq/image/upload/w_1200,f_auto,q_auto/38_vmoyjd',
      'https://res.cloudinary.com/dqhesb1lq/image/upload/w_1200,f_auto,q_auto/39_eokazz',
      'https://res.cloudinary.com/dqhesb1lq/image/upload/w_1200,f_auto,q_auto/22_xcrnj5',
      'https://res.cloudinary.com/dqhesb1lq/image/upload/w_1200,f_auto,q_auto/21_r3htgj',
      'https://res.cloudinary.com/dqhesb1lq/image/upload/w_1200,f_auto,q_auto/37_xqgqcf',
    ],
    engine: 'Mercedes-Benz OM471 - 12.8L I6 Diesel - 450 HP (330 kW) - 2,200 Nm Torque',
    transmission: 'Mercedes PowerShift 3 - 12-speed Automated Manual with EcoRoll',
    axle: '4x2 - Rear-wheel drive (RWD) - Hypoid axle',
    cabin: 'StreamSpace / BigSpace - Air-suspended, Full Sleeper Cab',
    immediateExport: true,
    updatedDaysAgo: 0,
    availableRegions: ['North Africa', 'West Africa', 'Middle East', 'East Africa', 'Eastern Europe'],
    documentation: {
      registration: 'ready',
      exportDocs: 'ready',
      inspection: 'ready',
      serviceHistory: 'ready',
    },
  },
];

export function getTruckById(id: number): Truck | undefined {
  return TRUCKS.find(t => t.id === id);
}
