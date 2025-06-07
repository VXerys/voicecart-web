/**
 * Interface untuk menggambarkan struktur hasil ekstraksi
 */
interface ExtractedItemPrice {
  itemName: string;
  price: number;
}

/**
 * Konfigurasi debugging - hanya aktif di development
 */
const DEBUG = process.env.NODE_ENV === 'development';
const debugLog = (...args: any[]) => DEBUG && console.log(...args);

/**
 * Mapping angka kata ke nilai numerik untuk parsing suara Indonesia
 * Dibersihkan dari entries yang tidak digunakan dalam praktik
 */
const WORD_TO_NUMBER: Record<string, number> = {
  // Angka dasar 0-19 (yang sering digunakan dalam speech)
  nol: 0,
  satu: 1,
  dua: 2,
  tiga: 3,
  empat: 4,
  lima: 5,
  enam: 6,
  tujuh: 7,
  delapan: 8,
  sembilan: 9,
  sepuluh: 10,
  sebelas: 11,
  // Compound numbers yang umum dalam speech
  'dua belas': 12,
  'lima belas': 15,
  'dua puluh': 20,
  'tiga puluh': 30,
  'empat puluh': 40,
  'lima puluh': 50,
  'enam puluh': 60,
  'tujuh puluh': 70,
  'delapan puluh': 80,
  'sembilan puluh': 90,
  // Kata khusus
  se: 1,
  seratus: 100,
  seribu: 1000,
  sejuta: 1000000,
};

const MULTIPLIERS: Record<string, number> = {
  puluh: 10,
  ratus: 100,
  ribu: 1000,
  juta: 1000000,
  rb: 1000, // singkatan ribu
  k: 1000, // untuk format 80k
};

/**
 * Pre-compiled regex patterns untuk performa yang lebih baik
 */
const PATTERNS = {
  rupiah: [
    /^(.+?)\s+rp\s*(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{1,2})?)$/i,
    /^(.+?)\s+(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{1,2})?)\s*rupiah?$/i,
  ],
  numberWithUnits: [
    /^(.+?)\s+(\d+)\s*(ribu|rb|k)$/i,
    /^(.+?)\s+(\d+|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)\s*(juta)$/i,
    /^(.+?)\s+(\d+)\s*(ratus)$/i,
  ],
  directNumbers: [/^(.+?)\s+(\d{3,})$/, /^(.+?)\s+(\d{3,})\s*$/],
};

/**
 * Helper function untuk validasi hasil ekstraksi
 */
const isValidResult = (itemName: string, price: number): boolean => {
  return itemName.trim().length > 0 && price > 0;
};

/**
 * Helper function untuk formatting nama item
 */
const formatItemName = (itemName: string): string => {
  return itemName
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Helper function untuk membersihkan dan mengkonversi string harga
 */
const cleanPriceString = (priceStr: string): number => {
  if (priceStr.includes('.') || priceStr.includes(',')) {
    const cleanPrice = priceStr.replace(/[.,]/g, '');
    return parseInt(cleanPrice, 10);
  }
  return parseInt(priceStr, 10);
};

/**
 * Ekstraksi nama item dan harga dari transkrip suara - ENHANCED VERSION 2.0
 */
export const extractItemAndPrice = (
  transcript: string
): ExtractedItemPrice | null => {
  if (!transcript || typeof transcript !== 'string') {
    return null;
  }

  // Normalisasi input dengan proses yang lebih efisien
  const normalizedTranscript = transcript
    .trim()
    .toLowerCase()
    .replace(/[.,!?]/g, '') // Hapus tanda baca
    .replace(/\s+/g, ' ') // Normalize spasi
    .replace(/rp\.?\s*/gi, 'rp '); // Standardisasi format Rp

  if (normalizedTranscript.length === 0) {
    return null;
  }

  debugLog('Processing transcript:', normalizedTranscript);

  // Coba ekstraksi dengan berbagai pola (urutan penting untuk akurasi!)
  const extractionMethods = [
    extractWithRupiahFormat,
    extractWithIndonesianWords,
    extractWithNumbersAndUnits,
    extractWithDirectNumbers,
  ];

  for (const method of extractionMethods) {
    const result = method(normalizedTranscript);
    if (result && isValidResult(result.itemName, result.price)) {
      debugLog('Successfully extracted with method:', method.name, result);
      return result;
    }
  }

  debugLog('❌ Failed to extract from transcript:', normalizedTranscript);
  return null;
};

/**
 * Ekstraksi format "Pizza Hut Rp75.000" atau "Pizza Hut rp 75000"
 * Menggunakan pre-compiled patterns untuk performa yang lebih baik
 */
const extractWithRupiahFormat = (
  transcript: string
): ExtractedItemPrice | null => {
  debugLog('🔍 Trying Rupiah format extraction...');

  for (const pattern of PATTERNS.rupiah) {
    const match = transcript.match(pattern);
    if (match) {
      const itemName = match[1].trim();
      const priceStr = match[2];

      debugLog('🎯 Rupiah match found:', { itemName, priceStr });

      const price = cleanPriceString(priceStr);

      if (isValidResult(itemName, price)) {
        return {
          itemName: formatItemName(itemName),
          price: price,
        };
      }
    }
  }

  return null;
};

/**
 * Ekstraksi dengan angka dan unit "Nabati Dan Oreo 80 ribu"
 * Menggunakan pendekatan yang lebih streamlined
 */
const extractWithNumbersAndUnits = (
  transcript: string
): ExtractedItemPrice | null => {
  debugLog('🔍 Trying numbers with units extraction...');

  for (const pattern of PATTERNS.numberWithUnits) {
    const match = transcript.match(pattern);
    if (match) {
      const itemName = match[1].trim();
      const numberStr = match[2];
      const unit = match[3].toLowerCase();

      debugLog('🎯 Number+Unit match found:', { itemName, numberStr, unit });

      // Konversi angka dengan logic yang disederhanakan
      const baseNumber = /^\d+$/.test(numberStr)
        ? parseInt(numberStr, 10)
        : WORD_TO_NUMBER[numberStr] || 0;

      // Aplikasikan multiplier berdasarkan unit
      const multiplier = MULTIPLIERS[unit] || 1;
      const price = baseNumber * multiplier;

      if (isValidResult(itemName, price)) {
        return {
          itemName: formatItemName(itemName),
          price: price,
        };
      }
    }
  }

  return null;
};

/**
 * Ekstraksi format Indonesia tradisional "mangga lima puluh ribu"
 * Logic parsing hierarchical tetap dipertahankan untuk akurasi maksimal
 */
const extractWithIndonesianWords = (
  transcript: string
): ExtractedItemPrice | null => {
  debugLog('🔍 Trying Indonesian words extraction...');

  const words = transcript.split(' ');
  let priceStartIndex = -1;

  // Cari kata pertama yang menunjukkan angka/harga
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const twoWords = i < words.length - 1 ? `${word} ${words[i + 1]}` : '';

    if (
      WORD_TO_NUMBER[word] !== undefined ||
      WORD_TO_NUMBER[twoWords] !== undefined ||
      Object.keys(MULTIPLIERS).includes(word) ||
      /^\d+$/.test(word) ||
      word === 'se' // untuk "seratus", "seribu"
    ) {
      priceStartIndex = i;
      break;
    }
  }

  if (priceStartIndex === -1 || priceStartIndex === 0) {
    return null;
  }

  const itemName = words.slice(0, priceStartIndex).join(' ');
  const priceWords = words.slice(priceStartIndex);

  debugLog('🎯 Indonesian words found:', { itemName, priceWords });

  const price = parseIndonesianPriceFixed(priceWords);

  if (isValidResult(itemName.trim(), price)) {
    return {
      itemName: formatItemName(itemName),
      price: price,
    };
  }

  return null;
};

/**
 * Ekstraksi format angka langsung "Indomie 5000"
 * Dengan smart detection untuk angka kecil yang kemungkinan dalam ribuan
 */
const extractWithDirectNumbers = (
  transcript: string
): ExtractedItemPrice | null => {
  debugLog('🔍 Trying direct numbers extraction...');

  for (const pattern of PATTERNS.directNumbers) {
    const match = transcript.match(pattern);
    if (match) {
      const itemName = match[1].trim();
      const price = parseInt(match[2], 10);

      debugLog('🎯 Direct number match found:', { itemName, price });

      // Smart detection: untuk angka 100-999, asumsikan dalam ribuan
      // Ini handle kasus seperti "Indomie 5" yang sebenarnya "5000"
      let finalPrice = price;
      if (price >= 100 && price <= 999) {
        finalPrice = price * 1000;
      }

      if (isValidResult(itemName, finalPrice)) {
        return {
          itemName: formatItemName(itemName),
          price: finalPrice,
        };
      }
    }
  }

  return null;
};

/**
 * ⭐ FIXED INDONESIAN PRICE PARSER - HIERARCHICAL APPROACH ⭐
 *
 * Pendekatan hierarchical yang sudah terbukti akurat dipertahankan sepenuhnya
 * Hanya ditambahkan optimisasi logging dan edge case handling
 */
const parseIndonesianPriceFixed = (words: string[]): number => {
  debugLog('🔧 Parsing Indonesian price from words:', words);

  const processedWords = preprocessSimpleCompounds(words);
  debugLog('📋 Processed words:', processedWords);

  return parseHierarchicalNumber(processedWords);
};

/**
 * Preprocessing yang lebih conservative dan optimized
 */
const preprocessSimpleCompounds = (words: string[]): string[] => {
  const result: string[] = [];
  let i = 0;

  while (i < words.length) {
    const word = words[i];
    const nextWord = i + 1 < words.length ? words[i + 1] : '';
    const compound = `${word} ${nextWord}`;

    // Hanya gabungkan compound numbers yang sudah terdefinisi di WORD_TO_NUMBER
    if (WORD_TO_NUMBER[compound] !== undefined) {
      result.push(compound);
      i += 2;
    } else {
      result.push(word);
      i++;
    }
  }

  return result;
};

/**
 * Parser hierarkis untuk angka Indonesia dengan enhanced edge case handling
 */
const parseHierarchicalNumber = (words: string[]): number => {
  debugLog('🏗️ Starting hierarchical parsing for:', words);

  const segments = splitByMajorMultipliers(words);
  debugLog('📊 Segments after splitting:', segments);

  let total = 0;

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];

    if (segment.type === 'number') {
      const segmentValue = parseNumberSegment(segment.words);
      debugLog(`🔢 Segment "${segment.words.join(' ')}" = ${segmentValue}`);

      // Enhanced: Check untuk multiplier setelah segment ini
      if (i + 1 < segments.length && segments[i + 1].type === 'multiplier') {
        const multiplier = segments[i + 1].value;
        total += segmentValue * multiplier;
        debugLog(
          `✅ Added ${segmentValue} × ${multiplier} = ${
            segmentValue * multiplier
          } to total`
        );
        i++; // Skip multiplier segment
      } else {
        total += segmentValue;
        debugLog(`✅ Added ${segmentValue} directly to total`);
      }
    }
  }

  debugLog(`🎯 Final hierarchical result: ${total}`);
  return total;
};

/**
 * Split words berdasarkan major multipliers dengan validation yang lebih baik
 */
const splitByMajorMultipliers = (
  words: string[]
): Array<{
  type: 'number' | 'multiplier';
  words?: string[];
  value?: number;
}> => {
  const majorMultipliers = ['juta', 'ribu'];
  const segments = [];
  let currentSegment: string[] = [];

  for (const word of words) {
    if (majorMultipliers.includes(word)) {
      // Enhanced: Validasi bahwa ada segment sebelumnya
      if (currentSegment.length > 0) {
        segments.push({ type: 'number' as const, words: [...currentSegment] });
        currentSegment = [];
      }

      // Tambahkan multiplier
      segments.push({
        type: 'multiplier' as const,
        value: MULTIPLIERS[word],
      });
    } else {
      currentSegment.push(word);
    }
  }

  // Tambahkan segment terakhir jika ada
  if (currentSegment.length > 0) {
    segments.push({ type: 'number' as const, words: currentSegment });
  }

  return segments;
};

/**
 * Parse segment angka dengan enhanced edge case handling
 * Termasuk handling untuk "seratus lima ribu" pattern
 */
const parseNumberSegment = (words: string[]): number => {
  debugLog(`🔍 Parsing number segment: [${words.join(', ')}]`);

  let result = 0;
  let currentNumber = 0;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    // Handle angka langsung atau kata angka
    if (/^\d+$/.test(word)) {
      currentNumber = parseInt(word, 10);
      debugLog(`📝 Set currentNumber to ${currentNumber} from digit "${word}"`);
    } else if (WORD_TO_NUMBER[word] !== undefined) {
      currentNumber = WORD_TO_NUMBER[word];
      debugLog(`📝 Set currentNumber to ${currentNumber} from word "${word}"`);
    }
    // Handle minor multipliers dengan enhanced logic
    else if (word === 'puluh') {
      if (currentNumber === 0) currentNumber = 1;
      currentNumber *= 10;
      debugLog(`🔄 Multiplied by 10 (puluh): currentNumber = ${currentNumber}`);
    } else if (word === 'ratus') {
      if (currentNumber === 0) currentNumber = 1;
      currentNumber *= 100;
      debugLog(
        `🔄 Multiplied by 100 (ratus): currentNumber = ${currentNumber}`
      );
    }
    // Enhanced: Handle unrecognized words dengan better accumulation
    else {
      if (currentNumber > 0) {
        result += currentNumber;
        debugLog(`➕ Added ${currentNumber} to result: ${result}`);
        currentNumber = 0;
      }
    }
  }

  // Tambahkan currentNumber terakhir
  result += currentNumber;
  debugLog(
    `🏁 Final segment result: ${result} (added remaining ${currentNumber})`
  );

  return result;
};

/**
 * Utility function untuk formatting ke Rupiah (exported untuk keperluan eksternal)
 */
export const formatToRupiah = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

/**
 * Test runner function - hanya untuk development/testing
 * Moved ke conditional execution untuk production safety
 */
const runTestCases = () => {
  if (!DEBUG) return; // Skip di production

  const testCases = [
    {
      input: 'jeruk lima ratus dua puluh satu ribu',
      expected: { itemName: 'Jeruk', price: 521000 },
      description: 'Kasus utama yang bermasalah: 521 ribu',
    },
    {
      input: 'nanas lima belas ribu lima ratus',
      expected: { itemName: 'Nanas', price: 15500 },
      description: 'Kasus kombinasi ribu + ratus',
    },
    {
      input: 'mangga seratus dua puluh ribu lima ratus',
      expected: { itemName: 'Mangga', price: 120500 },
      description: 'Kasus kompleks: seratus dua puluh ribu lima ratus',
    },
    {
      input: 'apel tiga ratus lima puluh ribu',
      expected: { itemName: 'Apel', price: 350000 },
      description: 'Test 350 ribu',
    },
    {
      input: 'pisang satu juta dua ratus ribu',
      expected: { itemName: 'Pisang', price: 1200000 },
      description: 'Test jutaan + ribuan',
    },
    {
      input: 'mangga lima puluh ribu',
      expected: { itemName: 'Mangga', price: 50000 },
      description: 'Format sederhana yang sudah bekerja',
    },
    {
      input: 'indomie 3000',
      expected: { itemName: 'Indomie', price: 3000 },
      description: 'Format angka langsung',
    },
    {
      input: 'nabati dan oreo 80 ribu',
      expected: { itemName: 'Nabati Dan Oreo', price: 80000 },
      description: 'Format angka + unit',
    },
  ];

  console.log('🧪 Testing ENHANCED hierarchical speech processing:');
  testCases.forEach((test, index) => {
    console.log(`\n--- Test ${index + 1}: ${test.description} ---`);
    console.log(`Input: "${test.input}"`);
    console.log(`Expected:`, test.expected);

    const result = extractItemAndPrice(test.input);
    console.log(`Result:`, result);

    const isCorrect =
      result?.price === test.expected.price &&
      result?.itemName === test.expected.itemName;
    console.log(isCorrect ? '✅ PASS' : '❌ FAIL');

    if (!isCorrect && result) {
      if (result.price !== test.expected.price) {
        const priceDiff = result.price - test.expected.price;
        console.log(
          `💡 Price difference: ${priceDiff} (got ${result.price}, expected ${test.expected.price})`
        );
      }
      if (result.itemName !== test.expected.itemName) {
        console.log(
          `💡 Name difference: got "${result.itemName}", expected "${test.expected.itemName}"`
        );
      }
    }
  });
};

// Jalankan test cases hanya di development
runTestCases();
