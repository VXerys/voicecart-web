import { useState, useCallback, useRef } from 'react';

interface UseSpeechRecognitionProps {
  language: 'id-ID' | 'en-US';
  onResult: (transcript: string) => void;
  onError: (error: string) => void;
}

export function useSpeechRecognition({
  language,
  onResult,
  onError,
}: UseSpeechRecognitionProps) {
  const [isListening, setIsListening] = useState(false);
  const recognition = useRef<any>(null);
  const retryCount = useRef(0);
  const maxRetries = 3;

  const isSpeechRecognitionSupported = useCallback(() => {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  }, []);

  const startListening = useCallback(() => {
    try {
      if (!isSpeechRecognitionSupported()) {
        throw new Error('Speech recognition is not supported in this browser');
      }

      if (recognition.current) {
        recognition.current.stop();
      }

      const SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      recognition.current = new SpeechRecognition();

      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = language;
      recognition.current.maxAlternatives = 1;

      recognition.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript.trim();
        console.log('Speech recognition result:', transcript);
        onResult(transcript);
        retryCount.current = 0;
        setIsListening(false);
      };

      recognition.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);

        switch (event.error) {
          case 'no-speech':
            if (retryCount.current < maxRetries) {
              retryCount.current++;
              onError('Tidak ada suara yang terdeteksi. Coba lagi...');
              setTimeout(() => {
                if (!isListening) {
                  startListening();
                }
              }, 1000);
            } else {
              onError(
                'Tidak ada suara yang terdeteksi setelah beberapa percobaan.'
              );
              retryCount.current = 0;
            }
            break;
          case 'audio-capture':
            onError(
              'Tidak dapat mengakses mikrofon. Pastikan mikrofon terhubung dan izin diberikan.'
            );
            break;
          case 'not-allowed':
            onError(
              'Izin mikrofon ditolak. Silakan berikan izin untuk menggunakan mikrofon.'
            );
            break;
          case 'network':
            onError('Masalah koneksi jaringan. Periksa koneksi internet Anda.');
            break;
          default:
            onError(
              'Terjadi kesalahan pada pengenalan suara. Silakan coba lagi.'
            );
        }
      };

      recognition.current.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      };

      recognition.current.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
      };

      recognition.current.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      onError(
        'Pengenalan suara tidak didukung di browser ini. Gunakan Chrome atau Edge untuk hasil terbaik.'
      );
      setIsListening(false);
    }
  }, [language, onResult, onError, isSpeechRecognitionSupported, isListening]);

  const stopListening = useCallback(() => {
    if (recognition.current && isListening) {
      console.log('Stopping speech recognition');
      recognition.current.stop();
      setIsListening(false);
      retryCount.current = 0;
    }
  }, [isListening]);

  return {
    isListening,
    startListening,
    stopListening,
    isSupported: isSpeechRecognitionSupported(),
  };
}