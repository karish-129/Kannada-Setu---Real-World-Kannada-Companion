export interface Letter {
  char: string;
  transliteration: string;
  ipa: string;
  exampleWord: string;
  exampleMeaning: string;
  type: 'vowel' | 'yogavaaha' | 'consonant-varga' | 'consonant-avarga';
  groupName?: string;
}

export interface KannadaNumber {
  digit: string;
  arabic: number;
  word: string;
  transliteration: string;
}

export interface GrammaticalPattern {
  suffix: string;
  kannada: string;
  meaning: string;
  usageRule: string;
  examples: {
    kannada: string;
    transliteration: string;
    english: string;
  }[];
}

export const VOWELS: Letter[] = [
  { char: 'ಅ', transliteration: 'a', ipa: 'ʌ', exampleWord: 'ಅಮ್ಮ (Amma)', exampleMeaning: 'Mother', type: 'vowel' },
  { char: 'ಆ', transliteration: 'aa', ipa: 'ɑː', exampleWord: 'ಆನೆ (Aane)', exampleMeaning: 'Elephant', type: 'vowel' },
  { char: 'ಇ', transliteration: 'i', ipa: 'i', exampleWord: 'ಇಲಿ (Ili)', exampleMeaning: 'Rat', type: 'vowel' },
  { char: 'ಈ', transliteration: 'ee', ipa: 'iː', exampleWord: 'ಈಜು (Eeju)', exampleMeaning: 'Swimming', type: 'vowel' },
  { char: 'ಉ', transliteration: 'u', ipa: 'u', exampleWord: 'ಉಪ್ಪು (Uppu)', exampleMeaning: 'Salt', type: 'vowel' },
  { char: 'ಊ', transliteration: 'oo', ipa: 'uː', exampleWord: 'ಊಟ (Oota)', exampleMeaning: 'Meal/Food', type: 'vowel' },
  { char: 'ಋ', transliteration: 'ru', ipa: 'ru', exampleWord: 'ಋಷಿ (Rushi)', exampleMeaning: 'Sage', type: 'vowel' },
  { char: 'ಎ', transliteration: 'e', ipa: 'e', exampleWord: 'ಎಲೆ (Ele)', exampleMeaning: 'Leaf', type: 'vowel' },
  { char: 'ಏ', transliteration: 'ae / ē', ipa: 'eː', exampleWord: 'ಏಣಿ (Eyni)', exampleMeaning: 'Ladder', type: 'vowel' },
  { char: 'ಐ', transliteration: 'ai', ipa: 'aɪ', exampleWord: 'ಐದು (Aidu)', exampleMeaning: 'Five', type: 'vowel' },
  { char: 'ಒ', transliteration: 'o', ipa: 'o', exampleWord: 'ಒಂಟೆ (Onte)', exampleMeaning: 'Camel', type: 'vowel' },
  { char: 'ಓ', transliteration: 'oo / ō', ipa: 'oː', exampleWord: 'ಓಟ (Oota)', exampleMeaning: 'Run', type: 'vowel' },
  { char: 'ಔ', transliteration: 'au', ipa: 'aʊ', exampleWord: 'ಔಷಧ (Aushadha)', exampleMeaning: 'Medicine', type: 'vowel' },
  { char: 'ಅಂ', transliteration: 'am (Anusvara)', ipa: 'ʌm', exampleWord: 'ಅಂಗಡಿ (Angadi)', exampleMeaning: 'Shop', type: 'yogavaaha' },
  { char: 'ಅಃ', transliteration: 'aha (Visarga)', ipa: 'ʌhʌ', exampleWord: 'ದುಃಖ (Dukha)', exampleMeaning: 'Sorrow', type: 'yogavaaha' },
];

export const CONSONANTS: Letter[] = [
  // Ka-varga
  { char: 'ಕ', transliteration: 'ka', ipa: 'kʌ', exampleWord: 'ಕಣ್ಣು (Kannu)', exampleMeaning: 'Eye', type: 'consonant-varga', groupName: 'ಕ-ವರ್ಗ (Velar)' },
  { char: 'ಖ', transliteration: 'kha', ipa: 'kʰʌ', exampleWord: 'ಖಡ್ಗ (Khadga)', exampleMeaning: 'Sword', type: 'consonant-varga', groupName: 'ಕ-ವರ್ಗ (Velar)' },
  { char: 'ಗ', transliteration: 'ga', ipa: 'ɡʌ', exampleWord: 'ಗಂಟೆ (Gante)', exampleMeaning: 'Bell / Hour', type: 'consonant-varga', groupName: 'ಕ-ವರ್ಗ (Velar)' },
  { char: 'ಘ', transliteration: 'gha', ipa: 'ɡʱʌ', exampleWord: 'ಘಂಟೆ (Ghate)', exampleMeaning: 'Incident', type: 'consonant-varga', groupName: 'ಕ-ವರ್ಗ (Velar)' },
  { char: 'ಙ', transliteration: 'nga', ipa: 'ŋʌ', exampleWord: 'ಙ (Nga)', exampleMeaning: 'Nasal', type: 'consonant-varga', groupName: 'ಕ-ವರ್ಗ (Velar)' },

  // Cha-varga
  { char: 'ಚ', transliteration: 'cha', ipa: 'tʃʌ', exampleWord: 'ಚಮಚ (Chamacha)', exampleMeaning: 'Spoon', type: 'consonant-varga', groupName: 'ಚ-ವರ್ಗ (Palatal)' },
  { char: 'ಛ', transliteration: 'chha', ipa: 'tʃʰʌ', exampleWord: 'ಛತ್ರಿ (Chhatri)', exampleMeaning: 'Umbrella', type: 'consonant-varga', groupName: 'ಚ-ವರ್ಗ (Palatal)' },
  { char: 'ಜ', transliteration: 'ja', ipa: 'dʒʌ', exampleWord: 'ಜನ (Jana)', exampleMeaning: 'People', type: 'consonant-varga', groupName: 'ಚ-ವರ್ಗ (Palatal)' },
  { char: 'ಝ', transliteration: 'jha', ipa: 'dʒʱʌ', exampleWord: 'ಝರಿ (Jhari)', exampleMeaning: 'Stream / Cascade', type: 'consonant-varga', groupName: 'ಚ-ವರ್ಗ (Palatal)' },
  { char: 'ಞ', transliteration: 'nya', ipa: 'ɲʌ', exampleWord: 'ಞ (Nya)', exampleMeaning: 'Nasal', type: 'consonant-varga', groupName: 'ಚ-ವರ್ಗ (Palatal)' },

  // Ta-varga (Retroflex)
  { char: 'ಟ', transliteration: 'Ta', ipa: 'ʈʌ', exampleWord: 'ಟೊಮ್ಯಾಟೊ (Tomato)', exampleMeaning: 'Tomato', type: 'consonant-varga', groupName: 'ಟ-ವರ್ಗ (Retroflex)' },
  { char: 'ಠ', transliteration: 'Tha', ipa: 'ʈʰʌ', exampleWord: 'ಠಾಣೆ (Thaane)', exampleMeaning: 'Station', type: 'consonant-varga', groupName: 'ಟ-ವರ್ಗ (Retroflex)' },
  { char: 'ಡ', transliteration: 'Da', ipa: 'ɖʌ', exampleWord: 'ಡಬ್ಬಿ (Dabbi)', exampleMeaning: 'Box / Container', type: 'consonant-varga', groupName: 'ಟ-ವರ್ಗ (Retroflex)' },
  { char: 'ಢ', transliteration: 'Dha', ipa: 'ɖʱʌ', exampleWord: 'ಢಕ್ಕೆ (Dhakke)', exampleMeaning: 'Drum', type: 'consonant-varga', groupName: 'ಟ-ವರ್ಗ (Retroflex)' },
  { char: 'ಣ', transliteration: 'Na', ipa: 'ɳʌ', exampleWord: 'ಹಣ (Hana)', exampleMeaning: 'Money', type: 'consonant-varga', groupName: 'ಟ-ವರ್ಗ (Retroflex)' },

  // ta-varga (Dental)
  { char: 'ತ', transliteration: 'ta', ipa: 't̪ʌ', exampleWord: 'ತಲೆ (Tale)', exampleMeaning: 'Head', type: 'consonant-varga', groupName: 'ತ-ವರ್ಗ (Dental)' },
  { char: 'ಥ', transliteration: 'tha', ipa: 't̪ʰʌ', exampleWord: 'ಥರ್ಮಾಮೀಟರ್ (Thermometer)', exampleMeaning: 'Thermometer', type: 'consonant-varga', groupName: 'ತ-ವರ್ಗ (Dental)' },
  { char: 'ದ', transliteration: 'da', ipa: 'd̪ʌ', exampleWord: 'ದಾರಿ (Daari)', exampleMeaning: 'Way / Path', type: 'consonant-varga', groupName: 'ತ-ವರ್ಗ (Dental)' },
  { char: 'ಧ', transliteration: 'dha', ipa: 'd̪ʱʌ', exampleWord: 'ಧನ್ಯವಾದ (Dhanyavaada)', exampleMeaning: 'Thank you', type: 'consonant-varga', groupName: 'ತ-ವರ್ಗ (Dental)' },
  { char: 'ನ', transliteration: 'na', ipa: 'nʌ', exampleWord: 'ನಾಳೆ (Naale)', exampleMeaning: 'Tomorrow', type: 'consonant-varga', groupName: 'ತ-ವರ್ಗ (Dental)' },

  // Pa-varga (Labial)
  { char: 'ಪ', transliteration: 'pa', ipa: 'pʌ', exampleWord: 'ಪುಸ್ತಕ (Pusthaka)', exampleMeaning: 'Book', type: 'consonant-varga', groupName: 'ಪ-ವರ್ಗ (Labial)' },
  { char: 'ಫ', transliteration: 'pha', ipa: 'pʰʌ', exampleWord: 'ಫಲ (Phala)', exampleMeaning: 'Fruit / Result', type: 'consonant-varga', groupName: 'ಪ-ವರ್ಗ (Labial)' },
  { char: 'ಬ', transliteration: 'ba', ipa: 'bʌ', exampleWord: 'ಬೆಂಗಳೂರು (Bengaluru)', exampleMeaning: 'Bengaluru', type: 'consonant-varga', groupName: 'ಪ-ವರ್ಗ (Labial)' },
  { char: 'ಭ', transliteration: 'bha', ipa: 'bʱʌ', exampleWord: 'ಭಾರತ (Bhaaratha)', exampleMeaning: 'India', type: 'consonant-varga', groupName: 'ಪ-ವರ್ಗ (Labial)' },
  { char: 'ಮ', transliteration: 'ma', ipa: 'mʌ', exampleWord: 'ಮನೆ (Mane)', exampleMeaning: 'House / Home', type: 'consonant-varga', groupName: 'ಪ-ವರ್ಗ (Labial)' },

  // Avargiya Vyanjanagalu
  { char: 'ಯ', transliteration: 'ya', ipa: 'jʌ', exampleWord: 'ಯಾರು (Yaaru)', exampleMeaning: 'Who', type: 'consonant-avarga', groupName: 'ಅವರ್ಗೀಯ (Semi-vowels & Sibilants)' },
  { char: 'ರ', transliteration: 'ra', ipa: 'rʌ', exampleWord: 'ರಾತ್ರಿ (Raathri)', exampleMeaning: 'Night', type: 'consonant-avarga', groupName: 'ಅವರ್ಗೀಯ (Semi-vowels & Sibilants)' },
  { char: 'ಲ', transliteration: 'la', ipa: 'lʌ', exampleWord: 'ಲಡ್ಡು (Laddu)', exampleMeaning: 'Sweet Laddu', type: 'consonant-avarga', groupName: 'ಅವರ್ಗೀಯ (Semi-vowels & Sibilants)' },
  { char: 'ವ', transliteration: 'va', ipa: 'ʋʌ', exampleWord: 'ವರ್ಷ (Varsha)', exampleMeaning: 'Year / Rain', type: 'consonant-avarga', groupName: 'ಅವರ್ಗೀಯ (Semi-vowels & Sibilants)' },
  { char: 'ಶ', transliteration: 'sha', ipa: 'ʃʌ', exampleWord: 'ಶಾಲೆ (Shaale)', exampleMeaning: 'School', type: 'consonant-avarga', groupName: 'ಅವರ್ಗೀಯ (Semi-vowels & Sibilants)' },
  { char: 'ಷ', transliteration: 'Sha (Retroflex)', ipa: 'ʂʌ', exampleWord: 'ಷಣ್ಮುಖ (Shanmukha)', exampleMeaning: 'Lord Shanmukha', type: 'consonant-avarga', groupName: 'ಅವರ್ಗೀಯ (Semi-vowels & Sibilants)' },
  { char: 'ಸ', transliteration: 'sa', ipa: 'sʌ', exampleWord: 'ಸಮಯ (Samaya)', exampleMeaning: 'Time', type: 'consonant-avarga', groupName: 'ಅವರ್ಗೀಯ (Semi-vowels & Sibilants)' },
  { char: 'ಹ', transliteration: 'ha', ipa: 'hʌ', exampleWord: 'ಹಾಲು (Haalu)', exampleMeaning: 'Milk', type: 'consonant-avarga', groupName: 'ಅವರ್ಗೀಯ (Semi-vowels & Sibilants)' },
  { char: 'ಳ', transliteration: 'La (Retroflex)', ipa: 'ɭʌ', exampleWord: 'ಕನ್ನಡ (KannaDa)', exampleMeaning: 'Kannada Language', type: 'consonant-avarga', groupName: 'ಅವರ್ಗೀಯ (Semi-vowels & Sibilants)' },
];

export const KANNADA_NUMBERS: KannadaNumber[] = [
  { digit: '೦', arabic: 0, word: 'ಸೊನ್ನೆ', transliteration: 'Sonne' },
  { digit: '೧', arabic: 1, word: 'ಒಂದು', transliteration: 'Ondu' },
  { digit: '೨', arabic: 2, word: 'ಎರಡು', transliteration: 'Eradu' },
  { digit: '೩', arabic: 3, word: 'ಮೂರು', transliteration: 'Mooru' },
  { digit: '೪', arabic: 4, word: 'ನಾಲ್ಕು', transliteration: 'Naalku' },
  { digit: '೫', arabic: 5, word: 'ಐದು', transliteration: 'Aidu' },
  { digit: '೬', arabic: 6, word: 'ಆರು', transliteration: 'Aaru' },
  { digit: '೭', arabic: 7, word: 'ಏಳು', transliteration: 'ELu' },
  { digit: '೮', arabic: 8, word: 'ಎಂಟು', transliteration: 'Entu' },
  { digit: '೯', arabic: 9, word: 'ಒಂಬತ್ತು', transliteration: 'Ombhatthu' },
  { digit: '೧೦', arabic: 10, word: 'ಹತ್ತು', transliteration: 'Hatthu' },
  { digit: '೧೫', arabic: 15, word: 'ಹದಿನೈದು', transliteration: 'Hadinaidu' },
  { digit: '೨೦', arabic: 20, word: 'ಇಪ್ಪತ್ತು', transliteration: 'Ippatthu' },
  { digit: '೨೫', arabic: 25, word: 'ಇಪ್ಪತ್ತೈದು', transliteration: 'Ippatthaidu' },
  { digit: '೩೦', arabic: 30, word: 'ಮೂವತ್ತು', transliteration: 'Moovatthu' },
  { digit: '೪೦', arabic: 40, word: 'ನಲವತ್ತು', transliteration: 'Nalavatthu' },
  { digit: '೫೦', arabic: 50, word: 'ಐವತ್ತು', transliteration: 'Aivatthu' },
  { digit: '೧೦೦', arabic: 100, word: 'ನೂರು', transliteration: 'Nooru' },
  { digit: '೫೦೦', arabic: 500, word: 'ಐನೂರು', transliteration: 'Ainooru' },
  { digit: '೧೦೦೦', arabic: 1000, word: 'ಒಂದು ಸಾವಿರ', transliteration: 'Ondu Saavira' },
];

export const CONVERSATIONAL_PATTERNS: GrammaticalPattern[] = [
  {
    suffix: '-beku',
    kannada: 'ಬೇಕು',
    meaning: 'Want / Need / Must',
    usageRule: 'Attach to nouns (Nanage coffee beku) or to verb infinitives (Hogabeku - must go).',
    examples: [
      { kannada: 'ನನಗೆ ನೀರು ಬೇಕು.', transliteration: 'Nanage neeru beku.', english: 'I want water.' },
      { kannada: 'ನಾಳೆ ಹೋಗಬೇಕು.', transliteration: 'Naale hogabeku.', english: 'Must go tomorrow.' },
    ],
  },
  {
    suffix: '-beda',
    kannada: 'ಬೇಡ',
    meaning: "Don't want / Should not / No",
    usageRule: 'Opposite of -beku. Used to politely decline or state prohibition.',
    examples: [
      { kannada: 'ನನಗೆ ಸಕ್ಕರೆ ಬೇಡ.', transliteration: 'Nanage sakkare beda.', english: 'I do not want sugar.' },
      { kannada: 'ಅಲ್ಲಿ ಹೋಗಬೇಡಿ.', transliteration: 'Alli hogabedi.', english: 'Please do not go there (polite).' },
    ],
  },
  {
    suffix: '-ide / -illa',
    kannada: 'ಇದೆ / ಇಲ್ಲ',
    meaning: 'Is present (Have) / Is not present (Don’t have)',
    usageRule: 'Expresses possession, availability or simple state.',
    examples: [
      { kannada: 'ಚಿಲ್ಲರೆ ಇದೆಯಾ? ಇಲ್ಲ.', transliteration: 'Chillare idiya? Illa.', english: 'Is change available? No.' },
      { kannada: 'ಸಮಯ ಇದೆ.', transliteration: 'Samaya ide.', english: 'There is time.' },
    ],
  },
  {
    suffix: '-kodi / -thagoLLi',
    kannada: 'ಕೊಡಿ / ತಗೊಳ್ಳಿ',
    meaning: 'Please give / Please take',
    usageRule: 'Polite imperative verb forms ending with respect for strangers, elders and service providers.',
    examples: [
      { kannada: 'ಟಿಕೆಟ್ ಕೊಡಿ.', transliteration: 'Ticket kodi.', english: 'Please give the ticket.' },
      { kannada: 'ಹಣ ತಗೊಳ್ಳಿ.', transliteration: 'Hana thagoLLi.', english: 'Please take the money.' },
    ],
  },
];
