import React, { useEffect, useRef, useState } from 'react';
import {
  Mic,
  MicOff,
  Plus,
  Trash2,
  AlertCircle,
  ShoppingCart,
} from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { extractItemAndPrice, formatToRupiah } from '../utils/speechProcessing';
import { useVoiceCart } from '../hooks/useVoiceCart';

// Interface definitions
interface Item {
  id: number;
  name: string;
  price: number;
}

interface StatusMessage {
  text: string;
  type: 'success' | 'error' | 'info';
}

const Demo: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Custom hook that handles all the cart logic
  const {
    items,
    inputMode,
    manualName,
    manualPrice,
    statusMessage,
    totalPrice,
    itemCount,
    setInputMode,
    setManualName,
    setManualPrice,
    handleDeleteItem,
    handleManualAdd,
    handleClearCart,
    addItem,
    setStatusWithClear,
  } = useVoiceCart();

  // Speech recognition callbacks
  const handleSpeechResult = (transcript: string) => {
    console.log('Processing transcript:', transcript);

    setStatusWithClear(`Memproses: "${transcript}"`, 'info');

    const extractedData = extractItemAndPrice(transcript);

    if (extractedData) {
      addItem(extractedData.itemName, extractedData.price);
    } else {
      setStatusWithClear(
        `❌ Tidak dapat memahami: "${transcript}". Coba ucapkan seperti "mangga lima puluh ribu"`,
        'error',
        6000
      );
    }
  };

  const handleSpeechError = (error: string) => {
    console.error('Speech recognition error:', error);
    setStatusWithClear(error, 'error', 5000);
  };

  // Speech recognition hook
  const { isListening, startListening, stopListening, isSupported } =
    useSpeechRecognition({
      language: 'id-ID',
      onResult: handleSpeechResult,
      onError: handleSpeechError,
    });

  // Toggle voice recognition
  const toggleVoiceRecognition = () => {
    if (isListening) {
      stopListening();
      setStatusWithClear('🔇 Pengenalan suara dihentikan', 'info', 2000);
    } else {
      if (!isSupported) {
        setStatusWithClear(
          '❌ Speech recognition tidak didukung di browser ini. Gunakan Chrome atau Edge.',
          'error',
          5000
        );
        return;
      }
      startListening();
      setStatusWithClear(
        '🎤 Mendengarkan... Ucapkan nama produk dan harga (contoh: "mangga lima puluh ribu")',
        'info'
      );
    }
  };

  const handleInputModeChange = (mode: 'voice' | 'manual') => {
    if (isListening) {
      stopListening();
    }
    setInputMode(mode);
  };

  return (
    <section
      ref={sectionRef}
      id="demo"
      className={`min-h-screen py-12 bg-gradient-to-b from-gray-900 via-indigo-950 to-black relative overflow-hidden transition-all duration-1000 will-change-transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ 
        contain: 'layout style paint',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <OptimizedBackgroundDecorations />

      <div className={`container mx-auto px-4 md:px-6 max-w-6xl relative z-10 transition-all duration-700 delay-300 will-change-transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <Header isVisible={isVisible} />

        <div className="max-w-5xl mx-auto">
          <div className={`bg-gray-900/40 rounded-2xl border border-gray-700/50 overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.1)] transition-all duration-700 delay-500 will-change-transform ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ 
            backdropFilter: 'blur(12px)',
            transform: 'translateZ(0)'
          }}>
            <StatusMessageDisplay statusMessage={statusMessage} />

            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <InputSection
                  inputMode={inputMode}
                  onInputModeChange={handleInputModeChange}
                  isListening={isListening}
                  isSupported={isSupported}
                  onToggleVoice={toggleVoiceRecognition}
                  manualName={manualName}
                  manualPrice={manualPrice}
                  onManualNameChange={setManualName}
                  onManualPriceChange={setManualPrice}
                  onManualAdd={handleManualAdd}
                />

                <ShoppingCartSection
                  items={items}
                  itemCount={itemCount}
                  totalPrice={totalPrice}
                  onDeleteItem={handleDeleteItem}
                  onClearCart={handleClearCart}
                />
              </div>
            </div>
          </div>
        </div>

        <InstructionsFooter isVisible={isVisible} />
      </div>
    </section>
  );
};

// Optimized background - reduced blur and animation intensity
const OptimizedBackgroundDecorations: React.FC = () => (
  <div style={{ contain: 'strict', transform: 'translateZ(0)' }}>
    <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-900/50 to-transparent will-change-transform"></div>
    
    {/* Optimized floating elements - reduced blur and simplified animation */}
    <div 
      className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full animate-pulse"
      style={{ 
        filter: 'blur(48px)',
        animationDuration: '4s',
        transform: 'translateZ(0)',
        will: 'opacity'
      }}
    ></div>
    <div 
      className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/5 rounded-full animate-pulse"
      style={{ 
        filter: 'blur(48px)',
        animationDuration: '4s',
        animationDelay: '1s',
        transform: 'translateZ(0)',
        will: 'opacity'
      }}
    ></div>
    <div 
      className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-600/3 rounded-full animate-pulse"
      style={{ 
        filter: 'blur(48px)',
        animationDuration: '4s',
        animationDelay: '2s',
        transform: 'translate(-50%, -50%) translateZ(0)',
        will: 'opacity'
      }}
    ></div>
    
    {/* Gradient overlay */}
    <div 
      className="absolute inset-0 bg-gradient-to-br from-transparent via-indigo-950/10 to-purple-950/20"
      style={{ transform: 'translateZ(0)' }}
    ></div>
  </div>
);

const Header: React.FC<{ isVisible: boolean }> = ({ isVisible }) => (
  <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 delay-200 will-change-transform ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
  }`}>
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      Coba VoiceCart
    </h2>
    <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
      Rasakan kemudahan mencatat belanja dengan teknologi pengenalan suara
      VoiceCart. Cukup sebutkan nama produk dan harganya!
    </p>
  </div>
);

const StatusMessageDisplay: React.FC<{
  statusMessage: StatusMessage | null;
}> = ({ statusMessage }) => {
  if (!statusMessage) return null;

  return (
    <div
      className={`mx-6 mt-6 p-4 rounded-xl flex items-start border transition-all duration-500 ${
        statusMessage.type === 'error'
          ? 'bg-red-900/20 border-red-700/30 text-red-300 animate-pulse'
          : statusMessage.type === 'success'
          ? 'bg-green-900/20 border-green-700/30 text-green-300 animate-bounce'
          : 'bg-blue-900/20 border-blue-700/30 text-blue-300'
      }`}
      style={{ transform: 'translateZ(0)' }}
    >
      <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
      <span className="text-sm font-medium">{statusMessage.text}</span>
    </div>
  );
};

interface InputSectionProps {
  inputMode: 'voice' | 'manual';
  onInputModeChange: (mode: 'voice' | 'manual') => void;
  isListening: boolean;
  isSupported: boolean;
  onToggleVoice: () => void;
  manualName: string;
  manualPrice: string;
  onManualNameChange: (value: string) => void;
  onManualPriceChange: (value: string) => void;
  onManualAdd: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  inputMode,
  onInputModeChange,
  isListening,
  isSupported,
  onToggleVoice,
  manualName,
  manualPrice,
  onManualNameChange,
  onManualPriceChange,
  onManualAdd,
}) => (
  <div className="space-y-6">
    <InputModeToggle
      inputMode={inputMode}
      onInputModeChange={onInputModeChange}
    />

    {inputMode === 'voice' ? (
      <VoiceInputInterface
        isListening={isListening}
        isSupported={isSupported}
        onToggleVoice={onToggleVoice}
      />
    ) : (
      <ManualInputInterface
        manualName={manualName}
        manualPrice={manualPrice}
        onManualNameChange={onManualNameChange}
        onManualPriceChange={onManualPriceChange}
        onManualAdd={onManualAdd}
      />
    )}
  </div>
);

const InputModeToggle: React.FC<{
  inputMode: 'voice' | 'manual';
  onInputModeChange: (mode: 'voice' | 'manual') => void;
}> = ({ inputMode, onInputModeChange }) => (
  <div className="flex space-x-2">
    <button
      className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
        inputMode === 'voice'
          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
          : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50 hover:border-gray-600/50'
      }`}
      onClick={() => onInputModeChange('voice')}
      style={{ transform: 'translateZ(0)' }}
    >
      🎤 Voice Input
    </button>
    <button
      className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
        inputMode === 'manual'
          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
          : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50 hover:border-gray-600/50'
      }`}
      onClick={() => onInputModeChange('manual')}
      style={{ transform: 'translateZ(0)' }}
    >
      ✏️ Manual Input
    </button>
  </div>
);

const VoiceInputInterface: React.FC<{
  isListening: boolean;
  isSupported: boolean;
  onToggleVoice: () => void;
}> = ({ isListening, isSupported, onToggleVoice }) => (
  <div 
    className="bg-gray-800/30 rounded-xl p-8 text-center border border-gray-700/30"
    style={{ 
      backdropFilter: 'blur(8px)',
      transform: 'translateZ(0)'
    }}
  >
    <button
      onClick={onToggleVoice}
      disabled={!isSupported}
      className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto transition-all duration-300 ${
        !isSupported
          ? 'bg-gray-600/50 cursor-not-allowed'
          : isListening
          ? 'bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/30 animate-pulse'
          : 'bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30'
      }`}
      style={{ transform: 'translateZ(0)' }}
    >
      {isListening ? (
        <MicOff className="h-8 w-8 text-white" />
      ) : (
        <Mic className="h-8 w-8 text-white" />
      )}
    </button>

    <h3 className="text-white font-semibold text-lg mb-3 transition-colors duration-300">
      {!isSupported
        ? 'Speech Recognition Tidak Didukung'
        : isListening
        ? 'Sedang Mendengarkan...'
        : 'Siap Mendengarkan'}
    </h3>

    <p className="text-gray-400 text-sm leading-relaxed mb-4">
      {!isSupported
        ? 'Gunakan browser Chrome atau Edge untuk fitur voice recognition'
        : isListening
        ? 'Ucapkan nama produk dan harga dengan jelas'
        : 'Tekan tombol mikrofon dan ucapkan produk dengan harga'}
    </p>

    <div className="bg-gray-700/20 rounded-lg p-4 text-left border border-gray-600/20">
      <p className="text-gray-300 text-xs font-medium mb-2">Contoh:</p>
      <ul className="text-gray-400 text-xs space-y-1">
        <li>• "mangga lima puluh ribu"</li>
        <li>• "apel tiga puluh ribu"</li>
        <li>• "jeruk dua puluh lima ribu"</li>
      </ul>
    </div>
  </div>
);

const ManualInputInterface: React.FC<{
  manualName: string;
  manualPrice: string;
  onManualNameChange: (value: string) => void;
  onManualPriceChange: (value: string) => void;
  onManualAdd: () => void;
}> = ({
  manualName,
  manualPrice,
  onManualNameChange,
  onManualPriceChange,
  onManualAdd,
}) => (
  <div 
    className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30"
    style={{ 
      backdropFilter: 'blur(8px)',
      transform: 'translateZ(0)'
    }}
  >
    <h3 className="text-white font-semibold text-lg mb-4">
      Tambah Item Manual
    </h3>

    <div className="space-y-4">
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Nama Produk
        </label>
        <input
          type="text"
          value={manualName}
          onChange={(e) => onManualNameChange(e.target.value)}
          placeholder="Contoh: Mangga"
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
          style={{ transform: 'translateZ(0)' }}
        />
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Harga (Rupiah)
        </label>
        <input
          type="number"
          value={manualPrice}
          onChange={(e) => onManualPriceChange(e.target.value)}
          placeholder="Contoh: 55000"
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
          style={{ transform: 'translateZ(0)' }}
        />
      </div>

      <button
        onClick={onManualAdd}
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center shadow-lg shadow-purple-500/25"
        style={{ transform: 'translateZ(0)' }}
      >
        <Plus className="h-5 w-5 mr-2" />
        Tambah ke Keranjang
      </button>
    </div>
  </div>
);

interface ShoppingCartSectionProps {
  items: Item[];
  itemCount: number;
  totalPrice: number;
  onDeleteItem: (id: number) => void;
  onClearCart: () => void;
}

const ShoppingCartSection: React.FC<ShoppingCartSectionProps> = ({
  items,
  itemCount,
  totalPrice,
  onDeleteItem,
  onClearCart,
}) => (
  <div className="space-y-6">
    <CartHeader
      itemCount={itemCount}
      onClearCart={onClearCart}
      itemsLength={items.length}
    />
    <CartItemsList items={items} onDeleteItem={onDeleteItem} />
    {items.length > 0 && (
      <CartSummary totalPrice={totalPrice} itemCount={itemCount} />
    )}
  </div>
);

const CartHeader: React.FC<{
  itemCount: number;
  onClearCart: () => void;
  itemsLength: number;
}> = ({ itemCount, onClearCart, itemsLength }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-3">
      <ShoppingCart className="h-6 w-6 text-purple-400" />
      <h3 className="text-white font-semibold text-xl">
        Keranjang ({itemCount} item)
      </h3>
    </div>

    {itemsLength > 0 && (
      <button
        onClick={onClearCart}
        className="text-red-400 hover:text-red-300 text-sm font-medium transition-all duration-300 flex items-center space-x-1 hover:bg-red-900/10 px-3 py-1 rounded-lg"
        style={{ transform: 'translateZ(0)' }}
      >
        <Trash2 className="h-4 w-4" />
        <span>Hapus Semua</span>
      </button>
    )}
  </div>
);

const CartItemsList: React.FC<{
  items: Item[];
  onDeleteItem: (id: number) => void;
}> = ({ items, onDeleteItem }) => (
  <div 
    className="bg-gray-800/20 rounded-xl border border-gray-700/30 max-h-96 overflow-y-auto"
    style={{ 
      backdropFilter: 'blur(8px)',
      transform: 'translateZ(0)',
      contain: 'layout style paint'
    }}
  >
    {items.length === 0 ? (
      <EmptyCart />
    ) : (
      <div className="divide-y divide-gray-700/30">
        {items.map((item, index) => (
          <CartItem
            key={item.id}
            item={item}
            index={index}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </div>
    )}
  </div>
);

const EmptyCart: React.FC = () => (
  <div className="p-8 text-center">
    <ShoppingCart className="h-12 w-12 text-gray-600 mx-auto mb-3 animate-pulse" />
    <p className="text-gray-400">Keranjang masih kosong</p>
    <p className="text-gray-500 text-sm mt-1">
      Tambahkan produk dengan voice atau manual input
    </p>
  </div>
);

const CartItem: React.FC<{
  item: Item;
  index: number;
  onDeleteItem: (id: number) => void;
}> = ({ item, index, onDeleteItem }) => (
  <div 
    className="p-4 flex items-center justify-between hover:bg-gray-700/20 transition-all duration-300"
    style={{ transform: 'translateZ(0)' }}
  >
    <div className="flex-1">
      <div className="flex items-center space-x-3">
        <span className="text-gray-400 text-sm font-mono w-6">
          {index + 1}.
        </span>
        <div>
          <h4 className="text-white font-medium">{item.name}</h4>
          <p className="text-purple-400 font-semibold">
            {formatToRupiah(item.price)}
          </p>
        </div>
      </div>
    </div>

    <button
      onClick={() => onDeleteItem(item.id)}
      className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-900/20 transition-all duration-300"
      title={`Hapus ${item.name}`}
      style={{ transform: 'translateZ(0)' }}
    >
      <Trash2 className="h-4 w-4" />
    </button>
  </div>
);

const CartSummary: React.FC<{
  totalPrice: number;
  itemCount: number;
}> = ({ totalPrice, itemCount }) => (
  <div 
    className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl p-6 border border-purple-500/20 shadow-lg"
    style={{ 
      backdropFilter: 'blur(8px)',
      transform: 'translateZ(0)'
    }}
  >
    <div className="flex items-center justify-between mb-4">
      <span className="text-gray-300 font-medium">Total Belanja:</span>
      <span className="text-2xl font-bold text-white animate-pulse">
        {formatToRupiah(totalPrice)}
      </span>
    </div>

    <div className="flex items-center justify-between text-sm text-gray-400">
      <span>{itemCount} produk dalam keranjang</span>
      <span>Siap untuk checkout</span>
    </div>
  </div>
);

const InstructionsFooter: React.FC<{ isVisible: boolean }> = ({ isVisible }) => (
  <div className={`max-w-4xl mx-auto mt-12 text-center transition-all duration-700 delay-700 will-change-transform ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
  }`}>
    <div 
      className="bg-gray-900/30 rounded-xl border border-gray-700/30 p-6 hover:bg-gray-900/40 transition-all duration-300"
      style={{ 
        backdropFilter: 'blur(8px)',
        transform: 'translateZ(0)'
      }}
    >
      <h3 className="text-white font-semibold text-lg mb-4">
        💡 Tips Penggunaan
      </h3>
      <div className="grid md:grid-cols-2 gap-6 text-left">
        <div>
          <h4 className="text-purple-400 font-medium mb-2">Voice Input:</h4>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>• Ucapkan dengan jelas dan tidak terburu-buru</li>
            <li>• Format: "[nama produk] [harga dalam kata]"</li>
            <li>• Contoh: "mangga lima puluh ribu"</li>
            <li>• Pastikan mikrofon mendapat izin akses</li>
          </ul>
        </div>
        <div>
          <h4 className="text-blue-400 font-medium mb-2">Manual Input:</h4>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>• Masukkan nama produk dan harga</li>
            <li>• Harga dalam format angka (contoh: 55000)</li>
            <li>• Tekan "Tambah ke Keranjang" untuk menyimpan</li>
            <li>• Bisa digunakan sebagai backup voice input</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default Demo;