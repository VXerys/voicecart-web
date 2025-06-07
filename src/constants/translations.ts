export type Language = 'id' | 'en';

export const translations = {
  id: {
    // Navbar
    features: 'Fitur',
    ourWhy: 'Latar Belakang',
    demo: 'Demo',
    tryDemo: 'Coba Demo',

    // Hero section
    title: 'Kontrol Anggaran Belanja Dengan ',
    subtitle: 'VoiceCart adalah solusi berbasis web yang membantu Anda melacak pengeluaran belanja secara real-time hanya dengan suara. Tanpa perlu instalasi, login, atau input manual.',
    tryDemoNow: 'Coba Demo Sekarang',
    learnMore: 'Pelajari Lebih Lanjut',

    // Features section
    featuresTitle: 'Fitur Unggulan',
    featuresSubtitle: 'VoiceCart menggabungkan teknologi pengenalan suara cerdas dengan pengalaman pengguna yang sederhana untuk membuat pelacakan anggaran menjadi mudah saat berbelanja.',
    
    featureCards: {
      voiceRecognition: {
        title: 'Pengenalan Suara',
        description: 'Sistem pengenalan suara yang dioptimalkan khusus untuk konteks belanja dengan format yang mudah dipahami sistem.'
      },
      smartFiltering: {
        title: 'Filter Cerdas',
        description: 'Filter cerdas dan algoritma canggih secara otomatis memisahkan nama produk dan harga dengan akurasi tinggi, bahkan di lingkungan yang bising.'
      },
      realTimeBudget: {
        title: 'Pelacakan Anggaran Real-time',
        description: 'Lihat total belanja Anda diperbarui secara instan saat menambahkan item, membantu Anda tetap dalam anggaran saat berbelanja.'
      },
      noiseReduction: {
        title: 'Reduksi Noise',
        description: 'Algoritma canggih menyaring noise latar belakang untuk akurasi pengenalan yang lebih baik di lingkungan belanja yang ramai.'
      },
      noInstallation: {
        title: 'Tanpa Instalasi',
        description: 'Berjalan langsung di browser Anda tanpa unduhan aplikasi, tanpa pendaftaran, dan tanpa menyimpan data pribadi.'
      },
      listExport: {
        title: 'Ekspor Daftar Belanja',
        description: 'Simpan dan bagikan daftar belanja beserta total Anda dengan orang lain melalui tautan sederhana.'
      }
    },

    voiceInputTips: {
      title: 'Tips Penggunaan Suara',
      tips: [
        'Bicara dengan jelas dengan format nama produk diikuti harga',
        'Gunakan mikrofon yang baik untuk akurasi pengenalan yang lebih baik',
        'Beri jeda singkat antara setiap item untuk pengenalan yang optimal'
      ]
    },

    // Background section
    backgroundTitle: 'Latar Belakang',
    ourWhyTitle: 'Mengapa VoiceCart',
    backgroundStory: [
      'Di banyak swalayan, kita terbiasa mengambil barang tanpa tahu pasti berapa total yang akan dibayar. Tak jarang, niat belanja hemat berujung pada kejutan di kasir.',
      'Dari keresahan ini lahirlah VoiceCart, bukan sekadar aplikasi biasa tapi solusi praktis untuk semua orang yang ingin berbelanja dengan lebih terkontrol.',
      'Awalnya kami mencoba pendekatan scanning kamera, namun ternyata ada banyak kendala teknis mulai dari label harga yang buram, font yang tidak konsisten, hingga posisi angka yang sulit terdeteksi.',
      'Kami kemudian menemukan solusi melalui pendekatan suara. Dengan menyebutkan nama barang dan harganya, sistem langsung mengenali dan menghitung secara otomatis. Lebih simpel, cepat, dan akurat.',
      'Inilah bentuk inovasi sederhana yang kami harap bisa diterapkan di berbagai tempat belanja tanpa perlu sistem yang mahal dan rumit.'
    ],

    journey: {
      title: 'Perjalanan Kami',
      subtitle: 'Perjalanan menciptakan VoiceCart tidak selalu mulus. Ini adalah cerita di balik inovasi kami.',
      steps: {
        problem: {
          title: 'Masalah',
          description: 'Berbelanja tanpa mengetahui total belanjaan sering menyebabkan kejutan anggaran saat pembayaran.'
        },
        firstAttempt: {
          title: 'Percobaan Pertama',
          description: 'Kami mencoba scanning berbasis kamera, namun menghadapi masalah dengan label harga yang buram, font yang tidak konsisten, dan tantangan pendeteksian.'
        },
        breakthrough: {
          title: 'Terobosan',
          description: 'Input suara muncul sebagai solusi yang lebih sederhana dan akurat, cukup sebutkan produk dan harganya.'
        },
        solution: {
          title: 'Solusi',
          description: 'VoiceCart lahir sebagai cara sederhana dan mudah diakses untuk melacak pengeluaran belanja secara real-time hanya dengan suara Anda.'
        }
      }
    },

    // Demo section
    demoTitle: 'Coba VoiceCart',
    demoSubtitle: 'Rasakan kemudahan mencatat belanja dengan teknologi pengenalan suara VoiceCart. Cukup sebutkan nama produk dan harganya.',
    voiceInput: 'Input Suara',
    manualInput: 'Input Manual',
    listening: 'Mendengarkan... Sebutkan nama produk dan harga',
    tapMicrophone: 'Ketuk mikrofon untuk mulai',
    productName: 'Nama Produk',
    price: 'Harga',
    enterProductName: 'Masukkan nama produk',
    enterPrice: 'Masukkan harga',
    addItem: 'Tambah Item',
    shoppingList: 'Daftar Belanja',
    items: 'item',
    total: 'Total',
    noItems: 'Belum ada item. Tambahkan menggunakan suara atau input manual.',
    addToCart: 'Tambah ke Keranjang',
    deleteAll: 'Hapus Semua',
    cart: 'Keranjang',
    readyToCheckout: 'Siap untuk checkout',
    productsInCart: 'produk dalam keranjang',

    // Error messages
    retryMessage: 'Maaf, bisa diulangi lebih jelas?',
    speechNotSupported: 'Pengenalan suara tidak didukung di browser ini',
    speechError: 'Terjadi kesalahan pada pengenalan suara',
    manualInputFallback: 'Gagal mengenali input suara. Silakan gunakan input manual.',
    noSpeechDetected: 'Tidak ada suara yang terdeteksi. Coba lagi...',
    microphoneError: 'Tidak dapat mengakses mikrofon. Pastikan mikrofon terhubung dan izin diberikan.',
    microphoneDenied: 'Izin mikrofon ditolak. Silakan berikan izin untuk menggunakan mikrofon.',
    networkError: 'Masalah koneksi jaringan. Periksa koneksi internet Anda.',

    // Usage Tips
    usageTipsTitle: 'Tips Penggunaan',
    voiceInputTipsTitle: 'Input Suara',
    voiceInputTipsList: [
      'Ucapkan dengan jelas dan tidak terburu-buru',
      'Format: nama produk diikuti harga dalam kata',
      'Contoh: mangga lima puluh ribu',
      'Pastikan mikrofon mendapat izin akses'
    ],
    manualInputTipsTitle: 'Input Manual',
    manualInputTipsList: [
      'Masukkan nama produk dan harga',
      'Harga dalam format angka seperti 55000',
      'Tekan Tambah ke Keranjang untuk menyimpan',
      'Bisa digunakan sebagai backup voice input'
    ]
  },
  en: {
    // Navbar
    features: 'Features',
    ourWhy: 'Our Why',
    demo: 'Demo',
    tryDemo: 'Try Demo',

    // Hero section
    title: 'Control Your Shopping Budget With ',
    subtitle: 'VoiceCart is a lightweight web-based solution that helps you track shopping expenses in real-time using just your voice. No installation, no login, no manual input required.',
    tryDemoNow: 'Try Demo Now',
    learnMore: 'Learn More',

    // Features section
    featuresTitle: 'Supercharged Features',
    featuresSubtitle: 'VoiceCart combines intelligent voice recognition with simple user experience to make budget tracking effortless while shopping.',
    
    featureCards: {
      voiceRecognition: {
        title: 'Voice Recognition',
        description: 'Advanced voice recognition system specifically optimized for shopping contexts with intuitive product and price detection.'
      },
      smartFiltering: {
        title: 'Smart Filtering',
        description: 'Intelligent algorithms automatically separate product names and prices with high accuracy, even in noisy environments.'
      },
      realTimeBudget: {
        title: 'Real-time Budget Tracking',
        description: 'See your running total update instantly as you add items, helping you stay within budget while shopping.'
      },
      noiseReduction: {
        title: 'Noise Reduction',
        description: 'Advanced algorithms filter out background noise for better recognition accuracy in busy shopping environments.'
      },
      noInstallation: {
        title: 'No Installation Required',
        description: 'Works directly in your browser with no app downloads, no sign-ups, and no personal data stored.'
      },
      listExport: {
        title: 'Shopping List Export',
        description: 'Save and share your shopping list and totals with others through simple link sharing.'
      }
    },

    voiceInputTips: {
      title: 'Voice Input Tips',
      tips: [
        'Speak clearly with product name followed by price',
        'Use a decent microphone for better recognition accuracy',
        'Pause briefly between each item for optimal recognition'
      ]
    },

    // Background section
    backgroundTitle: 'Background',
    ourWhyTitle: 'Why VoiceCart',
    backgroundStory: [
      'In many supermarkets, we often pick up items without knowing exactly how much we will pay. Too often, our intention to shop economically ends up with budget surprises at checkout.',
      'From this concern, VoiceCart was born not just as another app, but as a practical solution for everyone who wants to shop with better control.',
      'Initially we tried a camera scanning approach, but encountered many technical challenges from blurry price labels to inconsistent fonts and difficult number detection.',
      'We then discovered the solution through voice input. By simply stating the item name and price, the system instantly recognizes and calculates automatically. Simpler, faster, and more accurate.',
      'This is a simple form of innovation that we hope can be implemented in various shopping places without needing expensive and complicated systems.'
    ],

    journey: {
      title: 'The Journey',
      subtitle: 'Our path to creating VoiceCart was not straightforward. Here is the story behind our innovation.',
      steps: {
        problem: {
          title: 'The Problem',
          description: 'Shopping without knowing your running total often leads to budget surprises at checkout.'
        },
        firstAttempt: {
          title: 'First Attempt',
          description: 'We tried camera-based scanning but encountered issues with blurry price tags, inconsistent fonts, and detection challenges.'
        },
        breakthrough: {
          title: 'The Breakthrough',
          description: 'Voice input emerged as the simpler, more accurate solution. Just speak the product and price.'
        },
        solution: {
          title: 'The Solution',
          description: 'VoiceCart was born as a simple, accessible way to track shopping expenses in real-time using just your voice.'
        }
      }
    },

    // Demo section
    demoTitle: 'Try VoiceCart',
    demoSubtitle: 'Experience the ease of recording shopping with VoiceCart voice recognition technology. Just say the product name and price.',
    voiceInput: 'Voice Input',
    manualInput: 'Manual Input',
    listening: 'Listening... Say product name and price',
    tapMicrophone: 'Tap the microphone to start',
    productName: 'Product Name',
    price: 'Price',
    enterProductName: 'Enter product name',
    enterPrice: 'Enter price',
    addItem: 'Add Item',
    shoppingList: 'Shopping List',
    items: 'items',
    total: 'Total',
    noItems: 'No items yet. Add some using voice or manual input.',
    addToCart: 'Add to Cart',
    deleteAll: 'Delete All',
    cart: 'Cart',
    readyToCheckout: 'Ready for checkout',
    productsInCart: 'products in cart',

    // Error messages
    retryMessage: 'Sorry, could you please repeat more clearly?',
    speechNotSupported: 'Speech recognition is not supported in this browser',
    speechError: 'An error occurred during speech recognition',
    manualInputFallback: 'Failed to recognize voice input. Please use manual input.',
    noSpeechDetected: 'No speech detected. Try again...',
    microphoneError: 'Cannot access microphone. Make sure it is connected and permissions are granted.',
    microphoneDenied: 'Microphone permission denied. Please allow microphone access.',
    networkError: 'Network connection issue. Check your internet connection.',

    // Usage Tips
    usageTipsTitle: 'Usage Tips',
    voiceInputTipsTitle: 'Voice Input',
    voiceInputTipsList: [
      'Speak clearly and unhurriedly',
      'Format: product name followed by price in words',
      'Example: apple fifty thousand',
      'Ensure microphone has access permission'
    ],
    manualInputTipsTitle: 'Manual Input',
    manualInputTipsList: [
      'Enter product name and price',
      'Price in number format like 55000',
      'Press Add to Cart to save',
      'Can be used as voice input backup'
    ]
  }
};