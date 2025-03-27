import React, { useState, useEffect } from 'react';
import Mining from './components/Mining';
import { useMiningContext } from './contexts/MiningContext';
import telegramApp from './utils/telegramApp';
import './index.css';

// Tab içeriklerini tanımlayan enum
enum TabType {
  MINING = 'mining',
  STORE = 'store',
  LEADERBOARD = 'leaderboard',
  PROFILE = 'profile'
}

const App: React.FC = () => {
  const { totalMined, todayMined, miningRate } = useMiningContext();
  const [activeTab, setActiveTab] = useState<TabType>(TabType.MINING);
  
  useEffect(() => {
    // Telegram Web App'i hazırla
    telegramApp.ready();
    
    // Sayfa yüklendiğinde ana butonu göster
    telegramApp.showMainButton('Madenciliği Başlat', () => {
      // Ana buton tıklandığında yapılacak işlemler
      console.log('Ana buton tıklandı');
    });
    
    return () => {
      // Component unmount olduğunda ana butonu gizle
      telegramApp.hideMainButton();
    };
  }, []);
  
  // Tab değiştirme fonksiyonu
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };
  
  // Formatlanmış sayı
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}K`;
    }
    return num.toFixed(2);
  };
  
  return (
    <div className="container">
      <header className="app-header">
        <h1>Cosmofy Mining</h1>
        <p>Telegram Yıldızları ile madencilik yapın ve boost satın alın</p>
      </header>
      
      {/* Tab İçerikleri */}
      <div className={`tab-content ${activeTab === TabType.MINING ? 'active' : ''}`}>
        <Mining />
      </div>
      
      <div className={`tab-content ${activeTab === TabType.STORE ? 'active' : ''}`}>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Mağaza</h2>
          </div>
          <div className="card-body">
            <p>Madencilik deneyiminizi geliştirmek için özel ürünler satın alın.</p>
            
            <div className="store-grid">
              <div className="store-item">
                <img src="/images/cosmofy.png" alt="Hız Boost" className="store-item-image" />
                <div className="store-item-title">Hız Boost</div>
                <div className="store-item-price">
                  <span className="star-icon">⭐</span> 50
                </div>
                <button className="button-accent">Satın Al</button>
              </div>
              
              <div className="store-item">
                <img src="/images/cosmofy.png" alt="Süper Boost" className="store-item-image" />
                <div className="store-item-title">Süper Boost</div>
                <div className="store-item-price">
                  <span className="star-icon">⭐</span> 100
                </div>
                <button className="button-accent">Satın Al</button>
              </div>
              
              <div className="store-item">
                <img src="/images/cosmofy.png" alt="Mega Boost" className="store-item-image" />
                <div className="store-item-title">Mega Boost</div>
                <div className="store-item-price">
                  <span className="star-icon">⭐</span> 200
                </div>
                <button className="button-accent">Satın Al</button>
              </div>
              
              <div className="store-item">
                <img src="/images/cosmofy.png" alt="Ultra Boost" className="store-item-image" />
                <div className="store-item-title">Ultra Boost</div>
                <div className="store-item-price">
                  <span className="star-icon">⭐</span> 500
                </div>
                <button className="button-accent">Satın Al</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`tab-content ${activeTab === TabType.LEADERBOARD ? 'active' : ''}`}>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Liderlik Tablosu</h2>
          </div>
          <div className="card-body">
            <p>En çok madencilik yapan kullanıcılar</p>
            
            <div className="leaderboard-item">
              <div className="leaderboard-rank top-1">1</div>
              <div className="leaderboard-user">
                <div className="leaderboard-avatar">A</div>
                <div className="leaderboard-name">Ahmet</div>
              </div>
              <div className="leaderboard-score">15.2K</div>
            </div>
            
            <div className="leaderboard-item">
              <div className="leaderboard-rank top-2">2</div>
              <div className="leaderboard-user">
                <div className="leaderboard-avatar">M</div>
                <div className="leaderboard-name">Mehmet</div>
              </div>
              <div className="leaderboard-score">12.8K</div>
            </div>
            
            <div className="leaderboard-item">
              <div className="leaderboard-rank top-3">3</div>
              <div className="leaderboard-user">
                <div className="leaderboard-avatar">Z</div>
                <div className="leaderboard-name">Zeynep</div>
              </div>
              <div className="leaderboard-score">10.5K</div>
            </div>
            
            <div className="leaderboard-item">
              <div className="leaderboard-rank">4</div>
              <div className="leaderboard-user">
                <div className="leaderboard-avatar">E</div>
                <div className="leaderboard-name">Elif</div>
              </div>
              <div className="leaderboard-score">8.7K</div>
            </div>
            
            <div className="leaderboard-item">
              <div className="leaderboard-rank">5</div>
              <div className="leaderboard-user">
                <div className="leaderboard-avatar">C</div>
                <div className="leaderboard-name">Can</div>
              </div>
              <div className="leaderboard-score">7.2K</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`tab-content ${activeTab === TabType.PROFILE ? 'active' : ''}`}>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Profil</h2>
          </div>
          <div className="card-body">
            <div className="profile-header">
              <div className="profile-avatar">U</div>
              <div className="profile-info">
                <h2>Kullanıcı</h2>
                <p>Madenci Seviyesi: 5</p>
              </div>
            </div>
            
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{formatNumber(todayMined)}</div>
                <div className="stat-label">Bugün Kazanılan</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-value">{formatNumber(totalMined)}</div>
                <div className="stat-label">Toplam Kazanılan</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-value">{formatNumber(miningRate)}/s</div>
                <div className="stat-label">Madencilik Hızı</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-value">12</div>
                <div className="stat-label">Aktif Gün</div>
              </div>
            </div>
            
            <button className="button-primary">Profili Düzenle</button>
          </div>
        </div>
      </div>
      
      {/* Alt Navigasyon */}
      <nav className="bottom-nav">
        <div 
          className={`nav-item ${activeTab === TabType.MINING ? 'active' : ''}`}
          onClick={() => handleTabChange(TabType.MINING)}
        >
          <div className="nav-icon">⛏️</div>
          <span>Madencilik</span>
        </div>
        
        <div 
          className={`nav-item ${activeTab === TabType.STORE ? 'active' : ''}`}
          onClick={() => handleTabChange(TabType.STORE)}
        >
          <div className="nav-icon">🛒</div>
          <span>Mağaza</span>
        </div>
        
        <div 
          className={`nav-item ${activeTab === TabType.LEADERBOARD ? 'active' : ''}`}
          onClick={() => handleTabChange(TabType.LEADERBOARD)}
        >
          <div className="nav-icon">🏆</div>
          <span>Sıralama</span>
        </div>
        
        <div 
          className={`nav-item ${activeTab === TabType.PROFILE ? 'active' : ''}`}
          onClick={() => handleTabChange(TabType.PROFILE)}
        >
          <div className="nav-icon">👤</div>
          <span>Profil</span>
        </div>
      </nav>
      
      <footer className="app-footer">
        <p> 2025 Cosmofy Mining App</p>
      </footer>
    </div>
  );
};

export default App;
