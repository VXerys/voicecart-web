import { useState, useCallback, useEffect, useRef } from 'react';
import { useSpeechRecognition } from './useSpeechRecognition';
import { extractItemAndPrice } from '../utils/speechProcessing';

// Type definitions
interface CartItem {
  id: number;
  name: string;
  price: number;
  timestamp: Date;
}

interface StatusMessage {
  text: string;
  type: 'success' | 'error' | 'info';
}

interface UseVoiceCartReturn {
  // Core state
  items: CartItem[];
  isListening: boolean;
  error: string | null;
  statusMessage: StatusMessage | null;

  // Computed values
  totalPrice: number;
  itemCount: number;
  isEmpty: boolean;

  // Speech controls
  startListening: () => void;
  stopListening: () => void;
  isSupported: boolean;

  // Cart management
  addItem: (name: string, price: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  resetCart: () => void;

  // Manual input state (for UI flexibility)
  inputMode: 'voice' | 'manual';
  manualName: string;
  manualPrice: string;
  setInputMode: (mode: 'voice' | 'manual') => void;
  setManualName: (name: string) => void;
  setManualPrice: (price: string) => void;
  handleManualAdd: () => void;
  handleDeleteItem: (id: number) => void;
  handleClearCart: () => void;

  // Status management
  setStatusWithClear: (
    text: string,
    type: StatusMessage['type'],
    timeout?: number
  ) => void;
}

export const useVoiceCart = (): UseVoiceCartReturn => {
  // Core state
  const [items, setItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(
    null
  );

  // UI state
  const [inputMode, setInputMode] = useState<'voice' | 'manual'>('voice');
  const [manualName, setManualName] = useState('');
  const [manualPrice, setManualPrice] = useState('');

  // Refs for cleanup
  const statusTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const itemIdCounter = useRef(1);

  // Speech recognition callbacks
  const handleSpeechResult = useCallback((transcript: string) => {
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
  }, []);

  const handleSpeechError = useCallback((errorMessage: string) => {
    console.error('Speech recognition error:', errorMessage);
    setError(errorMessage);
    setStatusWithClear(errorMessage, 'error', 5000);
  }, []);

  // Initialize speech recognition
  const {
    isListening,
    startListening: speechStart,
    stopListening: speechStop,
    isSupported,
  } = useSpeechRecognition({
    language: 'id-ID',
    onResult: handleSpeechResult,
    onError: handleSpeechError,
  });

  // Status management with auto-clear
  const setStatusWithClear = useCallback(
    (text: string, type: StatusMessage['type'], timeout: number = 3000) => {
      // Clear existing timeout
      if (statusTimeoutRef.current) {
        clearTimeout(statusTimeoutRef.current);
      }

      // Set new status
      setStatusMessage({ text, type });
      setError(type === 'error' ? text : null);

      // Auto-clear after timeout
      statusTimeoutRef.current = setTimeout(() => {
        setStatusMessage(null);
        if (type === 'error') {
          setError(null);
        }
      }, timeout);
    },
    []
  );

  // Cart management functions
  const addItem = useCallback(
    (name: string, price: number) => {
      if (!name.trim() || price <= 0) {
        setStatusWithClear('❌ Nama produk dan harga harus valid', 'error');
        return;
      }

      const newItem: CartItem = {
        id: itemIdCounter.current++,
        name: name.trim(),
        price: Math.round(price),
        timestamp: new Date(),
      };

      setItems((prevItems) => [...prevItems, newItem]);
      setStatusWithClear(
        `✅ ${newItem.name} (${formatToRupiah(
          newItem.price
        )}) ditambahkan ke keranjang`,
        'success',
        3000
      );
    },
    [setStatusWithClear]
  );

  const removeItem = useCallback(
    (id: number) => {
      setItems((prevItems) => {
        const itemToRemove = prevItems.find((item) => item.id === id);
        if (itemToRemove) {
          setStatusWithClear(
            `🗑️ ${itemToRemove.name} dihapus dari keranjang`,
            'info',
            2000
          );
        }
        return prevItems.filter((item) => item.id !== id);
      });
    },
    [setStatusWithClear]
  );

  const clearCart = useCallback(() => {
    if (items.length === 0) {
      setStatusWithClear('Keranjang sudah kosong', 'info', 2000);
      return;
    }

    setItems([]);
    setStatusWithClear(
      `🧹 Semua item (${items.length}) dihapus dari keranjang`,
      'info',
      3000
    );
  }, [items.length, setStatusWithClear]);

  const resetCart = useCallback(() => {
    setItems([]);
    setError(null);
    setStatusMessage(null);
    setManualName('');
    setManualPrice('');
    if (isListening) {
      speechStop();
    }
  }, [isListening, speechStop]);

  // Speech control wrappers
  const startListening = useCallback(() => {
    if (!isSupported) {
      setStatusWithClear(
        '❌ Speech recognition tidak didukung di browser ini. Gunakan Chrome atau Edge.',
        'error',
        5000
      );
      return;
    }

    speechStart();
    setStatusWithClear(
      '🎤 Mendengarkan... Ucapkan nama produk dan harga (contoh: "mangga lima puluh ribu")',
      'info'
    );
  }, [isSupported, speechStart, setStatusWithClear]);

  const stopListening = useCallback(() => {
    speechStop();
    setStatusWithClear('🔇 Pengenalan suara dihentikan', 'info', 2000);
  }, [speechStop, setStatusWithClear]);

  // Manual input handlers
  const handleManualAdd = useCallback(() => {
    const name = manualName.trim();
    const priceStr = manualPrice.trim();

    if (!name) {
      setStatusWithClear('❌ Nama produk tidak boleh kosong', 'error');
      return;
    }

    const price = parseFloat(priceStr);
    if (isNaN(price) || price <= 0) {
      setStatusWithClear(
        '❌ Harga harus berupa angka yang valid dan lebih dari 0',
        'error'
      );
      return;
    }

    addItem(name, price);

    // Clear manual inputs on success
    setManualName('');
    setManualPrice('');
  }, [manualName, manualPrice, addItem, setStatusWithClear]);

  // Wrapper functions for consistent naming with original component
  const handleDeleteItem = useCallback(
    (id: number) => {
      removeItem(id);
    },
    [removeItem]
  );

  const handleClearCart = useCallback(() => {
    clearCart();
  }, [clearCart]);

  // Handle input mode changes
  const handleInputModeChange = useCallback(
    (mode: 'voice' | 'manual') => {
      if (isListening) {
        stopListening();
      }
      setInputMode(mode);
    },
    [isListening, stopListening]
  );

  // Computed values
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const itemCount = items.length;
  const isEmpty = items.length === 0;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (statusTimeoutRef.current) {
        clearTimeout(statusTimeoutRef.current);
      }
    };
  }, []);

  return {
    // Core state
    items,
    isListening,
    error,
    statusMessage,

    // Computed values
    totalPrice,
    itemCount,
    isEmpty,

    // Speech controls
    startListening,
    stopListening,
    isSupported,

    // Cart management
    addItem,
    removeItem,
    clearCart,
    resetCart,

    // Manual input state
    inputMode,
    manualName,
    manualPrice,
    setInputMode: handleInputModeChange,
    setManualName,
    setManualPrice,
    handleManualAdd,
    handleDeleteItem,
    handleClearCart,

    // Status management
    setStatusWithClear,
  };
};

// Helper function for currency formatting
const formatToRupiah = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

export default useVoiceCart;
