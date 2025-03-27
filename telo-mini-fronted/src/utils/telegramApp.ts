interface TelegramWebApp {
  openPaymentForm: (params: any) => Promise<any>;
  MainButton: {
    show: () => void;
    hide: () => void;
    setText: (text: string) => void;
    onClick: (callback: () => void) => void;
  };
  showAlert?: (message: string) => void; 
  showConfirm?: (message: string) => Promise<boolean>; 
  ready: () => void;
  expand: () => void;
  isVersionAtLeast: (version: string) => boolean;
}

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

const telegramApp = {
  openTelegramPayment: (title: string, description: string, amount: number): Promise<any> => {
    return window.Telegram.WebApp.openPaymentForm({
      title,
      description,
      amount,
      currency: 'USD',
      provider_token: '284685063:TEST:NjUzZjFjNGI1YmQy', 
      payload: JSON.stringify({
        unique_id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        payment_type: 'telegram_stars'
      }),
      photo_url: 'https://www.example.com/mining-image.png',
      need_name: false,
      need_phone_number: false,
      need_email: false,
      need_shipping_address: false,
      send_phone_number_to_provider: false,
      send_email_to_provider: false,
      is_flexible: false
    });
  },
  
  buyTelegramStars: async (amount: number): Promise<boolean> => {
    try {
      // Telegram Yıldızları satın alma
      await telegramApp.openTelegramPayment(
        'Telegram Yıldızları',
        'Madencilik için Telegram Yıldızları satın alın',
        amount * 100 
      );
      return true;
    } catch (error) {
      console.error('Telegram Stars purchase error:', error);
      telegramApp.showSafeAlert('Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      return false;
    }
  },
  
  buyBoostWithStars: async (boostType: string, stars: number): Promise<boolean> => {
    // Telegram Yıldızları ile boost satın alma
    // Gerçek uygulamada, bu fonksiyon backend'e bir istek göndererek
    // kullanıcının Telegram Yıldızlarını harcamasını sağlar
    return new Promise((resolve) => {
      setTimeout(() => {
        telegramApp.showSafeAlert(`${boostType} boost aktivasyonu başarılı! ${stars} Telegram Yıldızı harcandı.`);
        resolve(true);
      }, 1000);
    });
  },
  
  showSafeAlert: (message: string) => {
    if (window.Telegram.WebApp.showAlert && window.Telegram.WebApp.isVersionAtLeast('6.1')) {
      window.Telegram.WebApp.showAlert(message);
    } else {
      console.log('Alert message:', message);
      const alertDiv = document.createElement('div');
      alertDiv.className = 'telegram-alert';
      alertDiv.textContent = message;
      document.body.appendChild(alertDiv);
      
      setTimeout(() => {
        if (alertDiv.parentNode) {
          alertDiv.parentNode.removeChild(alertDiv);
        }
      }, 3000);
    }
  },
  
  showMainButton: (text: string, callback: () => void) => {
    window.Telegram.WebApp.MainButton.setText(text);
    window.Telegram.WebApp.MainButton.onClick(callback);
    window.Telegram.WebApp.MainButton.show();
  },
  
  hideMainButton: () => {
    window.Telegram.WebApp.MainButton.hide();
  },
  
  ready: () => {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }
};

export default telegramApp;
