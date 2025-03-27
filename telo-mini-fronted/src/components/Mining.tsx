import React, { useState, useEffect } from 'react';
import { useMiningContext } from '../contexts/MiningContext';
import telegramApp from '../utils/telegramApp';

const Mining: React.FC = () => {
  const {
    startMining,
    stopMining,
    miningStatus,
    miningRate,
    totalMined,
    todayMined,
    activeBoosts,
    availableBoosts,
    activateBoost
  } = useMiningContext();
  
  const [isLoading, setIsLoading] = useState(false);
  const [animationActive, setAnimationActive] = useState(false);

  useEffect(() => {
    setAnimationActive(miningStatus === 'active');
  }, [miningStatus]);

  const handleStartMining = async () => {
    if (miningStatus === 'active') return;
    startMining();
    telegramApp.showSafeAlert('Madencilik başlatıldı! 🚀');
  };

  const handleStopMining = () => {
    if (miningStatus === 'inactive') return;
    stopMining();
    telegramApp.showSafeAlert('Madencilik durduruldu.');
  };

  const handleBuyStars = async () => {
    setIsLoading(true);
    try {
      const success = await telegramApp.buyTelegramStars(5); // 5 dolar değerinde Telegram Yıldızı
      if (success) {
        telegramApp.showSafeAlert('Telegram Yıldızları başarıyla satın alındı! ⭐');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleActivateBoost = async (boostId: string, price: number) => {
    setIsLoading(true);
    try {
      const boost = availableBoosts.find(b => b.id === boostId);
      if (!boost) return;
      
      const success = await telegramApp.buyBoostWithStars(boost.name, price);
      if (success) {
        await activateBoost(boostId);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Madencilik hızını formatla
  const formatMiningRate = (rate: number) => {
    if (rate >= 1000) {
      return `${(rate / 1000).toFixed(2)} K/s`;
    }
    return `${rate.toFixed(2)}/s`;
  };

  // Toplam madencilik miktarını formatla
  const formatMiningAmount = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(2)} M`;
    }
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(2)} K`;
    }
    return amount.toFixed(2);
  };

  return (
    <div className="mining-container">
      <div className={`mining-animation ${animationActive ? 'active' : ''}`}>
        <div className="mining-effect"></div>
        <div className="mining-icon">
          {/* Cosmofy görselini kullanıyoruz */}
          <img 
            src="/images/cosmofy.png" 
            alt="Cosmofy" 
            className="astronaut-image" 
            width="150" 
            height="150"
          />
        </div>
      </div>
      
      <div className={`mining-status ${miningStatus === 'active' ? 'active' : 'inactive'}`}>
        {miningStatus === 'active' ? '🔥 Madencilik Aktif' : '⏸️ Madencilik Bekliyor'}
      </div>
      
      <div className="mining-info">
        <div className="mining-info-item">
          <span>Madencilik Hızı:</span>
          <span>{formatMiningRate(miningRate)}</span>
        </div>
        <div className="mining-info-item">
          <span>Bugün Kazanılan:</span>
          <span>{formatMiningAmount(todayMined)}</span>
        </div>
        <div className="mining-info-item">
          <span>Toplam Kazanılan:</span>
          <span>{formatMiningAmount(totalMined)}</span>
        </div>
      </div>
      
      <div className="mining-progress">
        <div 
          className="mining-progress-bar" 
          style={{ width: `${Math.min((todayMined / 1000) * 100, 100)}%` }}
        ></div>
      </div>
      
      {miningStatus === 'inactive' ? (
        <div className="button-group">
          <button 
            className="button-primary" 
            onClick={handleStartMining} 
            disabled={isLoading}
          >
            🚀 Madenciliği Başlat
          </button>
          <button 
            className="button-secondary" 
            onClick={handleBuyStars} 
            disabled={isLoading}
          >
            <span role="img" aria-label="star" style={{ marginRight: '5px' }}>⭐</span>
            Telegram Yıldızı Satın Al
          </button>
        </div>
      ) : (
        <button 
          className="button-accent" 
          onClick={handleStopMining} 
          disabled={isLoading}
        >
          ⏹️ Madenciliği Durdur
        </button>
      )}
      
      <div className="boosts-container">
        <h3>✨ Aktif Boostlar</h3>
        {activeBoosts.length === 0 ? (
          <p className="no-boosts">Henüz aktif boost yok</p>
        ) : (
          activeBoosts.map(boost => (
            <div key={boost.id} className="boost-item active-boost">
              <span>
                {boost.name} <span className="boost-multiplier">x{boost.multiplier}</span>
              </span>
              <span className="boost-time">
                {boost.endTime && Math.floor((boost.endTime - Date.now()) / 1000)} saniye kaldı
              </span>
            </div>
          ))
        )}
        
        <h3>🛒 Boost Satın Al</h3>
        <p className="boost-description">Telegram Yıldızları ile boost satın alarak madencilik hızınızı artırın!</p>
        {availableBoosts.map(boost => (
          <div key={boost.id} className="boost-item">
            <span>
              {boost.name} <span className="boost-multiplier">x{boost.multiplier}</span> - 
              <span className="star-icon">⭐</span>
              {boost.price} Yıldız
            </span>
            <button 
              onClick={() => handleActivateBoost(boost.id, boost.price)}
              disabled={isLoading || miningStatus === 'inactive'}
              className="button-accent"
            >
              Satın Al
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mining;
