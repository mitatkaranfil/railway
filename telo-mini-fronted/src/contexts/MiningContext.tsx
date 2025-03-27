import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Boost tipi
interface Boost {
  id: string;
  name: string;
  multiplier: number;
  duration: number; // milliseconds
  price: number;
  endTime?: number;
}

// Mining context tipi
interface MiningContextType {
  miningStatus: 'active' | 'inactive';
  miningRate: number;
  totalMined: number;
  todayMined: number;
  startMining: () => void;
  stopMining: () => void;
  activeBoosts: Boost[];
  availableBoosts: Boost[];
  activateBoost: (boostId: string) => Promise<boolean>;
}

// Varsayılan değerler
const defaultContext: MiningContextType = {
  miningStatus: 'inactive',
  miningRate: 0.05,
  totalMined: 0,
  todayMined: 0,
  startMining: () => {},
  stopMining: () => {},
  activeBoosts: [],
  availableBoosts: [],
  activateBoost: async () => false
};

// Context oluşturma
const MiningContext = createContext<MiningContextType>(defaultContext);

// Provider props tipi
interface MiningProviderProps {
  children: ReactNode;
}

// Hook
export const useMiningContext = () => useContext(MiningContext);

// Provider bileşeni
export const MiningProvider: React.FC<MiningProviderProps> = ({ children }) => {
  const [miningStatus, setMiningStatus] = useState<'active' | 'inactive'>('inactive');
  const [miningRate, setMiningRate] = useState<number>(0.05);
  const [totalMined, setTotalMined] = useState<number>(0);
  const [todayMined, setTodayMined] = useState<number>(0);
  const [miningInterval, setMiningInterval] = useState<NodeJS.Timeout | null>(null);
  const [activeBoosts, setActiveBoosts] = useState<Boost[]>([]);
  const [boostCheckInterval, setBoostCheckInterval] = useState<NodeJS.Timeout | null>(null);
  
  // Kullanılabilir boostlar
  const [availableBoosts] = useState<Boost[]>([
    {
      id: 'speed-boost-1',
      name: 'Hız Boost',
      multiplier: 2,
      duration: 1000 * 60 * 5, // 5 dakika
      price: 10
    },
    {
      id: 'speed-boost-2',
      name: 'Süper Boost',
      multiplier: 3,
      duration: 1000 * 60 * 10, // 10 dakika
      price: 25
    },
    {
      id: 'mega-boost',
      name: 'Mega Boost',
      multiplier: 5,
      duration: 1000 * 60 * 15, // 15 dakika
      price: 50
    }
  ]);
  
  // Madenciliği başlat
  const startMining = () => {
    if (miningStatus === 'active') return;
    setMiningStatus('active');
    const interval = setInterval(() => {
      setTotalMined(prev => prev + miningRate);
      setTodayMined(prev => prev + miningRate);
    }, 1000);
    setMiningInterval(interval);
  };
  
  // Madenciliği durdur
  const stopMining = () => {
    if (miningStatus === 'inactive') return;
    setMiningStatus('inactive');
    if (miningInterval) {
      clearInterval(miningInterval);
      setMiningInterval(null);
    }
  };
  
  // Boost aktifleştir
  const activateBoost = async (boostId: string): Promise<boolean> => {
    const boost = availableBoosts.find(b => b.id === boostId);
    if (!boost) return false;
    
    // Boost'u aktif et
    const activeBoost = {
      ...boost,
      endTime: Date.now() + boost.duration
    };
    
    setActiveBoosts(prev => [...prev, activeBoost]);
    
    // Mining hızını güncelle
    updateMiningRate();
    
    return true;
  };
  
  // Mining hızını güncelle
  const updateMiningRate = () => {
    // Baz hız
    let baseRate = 0.05;
    
    // Aktif boostları hesapla
    let multiplier = 1;
    activeBoosts.forEach(boost => {
      if (boost.endTime && boost.endTime > Date.now()) {
        multiplier *= boost.multiplier;
      }
    });
    
    // Yeni hızı ayarla
    setMiningRate(baseRate * multiplier);
  };
  
  // Süresi dolan boostları kontrol et
  const checkExpiredBoosts = () => {
    const now = Date.now();
    const stillActiveBoosts = activeBoosts.filter(boost => boost.endTime && boost.endTime > now);
    
    if (stillActiveBoosts.length !== activeBoosts.length) {
      setActiveBoosts(stillActiveBoosts);
      updateMiningRate();
    }
  };
  
  // Boost kontrolü için interval
  useEffect(() => {
    const interval = setInterval(checkExpiredBoosts, 1000);
    setBoostCheckInterval(interval);
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeBoosts, checkExpiredBoosts]);
  
  // Component unmount olduğunda interval'ları temizle
  useEffect(() => {
    return () => {
      if (miningInterval) clearInterval(miningInterval);
      if (boostCheckInterval) clearInterval(boostCheckInterval);
    };
  }, [miningInterval, boostCheckInterval]);
  
  const contextValue: MiningContextType = {
    miningStatus,
    miningRate,
    totalMined,
    todayMined,
    startMining,
    stopMining,
    activeBoosts,
    availableBoosts,
    activateBoost
  };
  
  return (
    <MiningContext.Provider value={contextValue}>
      {children}
    </MiningContext.Provider>
  );
};

export default MiningContext;
