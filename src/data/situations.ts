export interface Phrase {
  id: string;
  kannada: string;
  transliteration: string;
  english: string;
  context: string;
  politenessLevel: 'casual' | 'polite' | 'formal';
  breakdown?: { word: string; transliteration: string; meaning: string }[];
  audioTip?: string;
}

export interface DialogueStep {
  speaker: 'learner' | 'local';
  speakerRole: string;
  kannada: string;
  transliteration: string;
  english: string;
  tip?: string;
}

export interface Dialogue {
  id: string;
  title: string;
  context: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Everyday';
  steps: DialogueStep[];
}

export interface SituationCategory {
  id: 'transportation' | 'shopping' | 'travelling' | 'healthcare' | 'education' | 'workplaces';
  title: string;
  kannadaTitle: string;
  subtitle: string;
  iconName: string;
  badge: string;
  description: string;
  localCultureTip: string;
  keyVocabulary: { kannada: string; transliteration: string; english: string }[];
  phrases: Phrase[];
  dialogues: Dialogue[];
  roleplayPrompt: {
    role: string;
    description: string;
    starterPhrase: { kannada: string; transliteration: string; english: string };
  };
}

export const SITUATION_CATEGORIES: SituationCategory[] = [
  {
    id: 'transportation',
    title: 'Transportation',
    kannadaTitle: 'ಸಾರಿಗೆ',
    subtitle: 'Autos, BMTC Buses, Namma Metro & Cabs',
    iconName: 'Bus',
    badge: 'Daily Commute',
    description: 'Master negotiation with auto drivers, navigating BMTC bus stages, conductor interactions, and metro ticketing in Karnataka.',
    localCultureTip: 'In Bengaluru autos, asking politely "Meter haaki sir" (Put the meter, sir) with "Sir" or "Anna" shows respect and yields better rapport.',
    keyVocabulary: [
      { kannada: 'ಎಲ್ಲಿಗೆ?', transliteration: 'Ellige?', english: 'Where to?' },
      { kannada: 'ಮೀಟರ್ ಹಾಕಿ', transliteration: 'Meter haaki', english: 'Put the meter' },
      { kannada: 'ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ', transliteration: 'Illi nillisi', english: 'Stop here' },
      { kannada: 'ಮುಂದೆ ಹೋಗಿ', transliteration: 'Munde hogi', english: 'Go straight ahead' },
      { kannada: 'ಬಲಕ್ಕೆ / ಎಡಕ್ಕೆ', transliteration: 'Balakke / Edakke', english: 'To the right / To the left' },
      { kannada: 'ಚಿಲ್ಲರೆ ಇಲ್ಲ', transliteration: 'Chillare illa', english: 'No small change / coins' },
      { kannada: 'ಟಿಕೆಟ್ ಕೊಡಿ', transliteration: 'Ticket kodi', english: 'Please give a ticket' },
      { kannada: 'ಮುಂದಿನ ನಿಲ್ದಾಣ', transliteration: 'Mundina nildaana', english: 'Next stop/station' },
    ],
    phrases: [
      {
        id: 't-1',
        kannada: 'ಇಂದಿರಾನಗರಕ್ಕೆ ಬರ್ತೀರಾ?',
        transliteration: 'Indiranagarakke bartheera?',
        english: 'Will you come to Indiranagar?',
        context: 'Hailing an auto rickshaw on the road',
        politenessLevel: 'polite',
        breakdown: [
          { word: 'ಇಂದಿರಾನಗರಕ್ಕೆ', transliteration: 'Indiranagarakke', meaning: 'To Indiranagar' },
          { word: 'ಬರ್ತೀರಾ?', transliteration: 'bartheera?', meaning: 'Will you come? (respectful)' },
        ],
        audioTip: 'Rise pitch slightly at the end for the question.',
      },
      {
        id: 't-2',
        kannada: 'ಮೀಟರ್ ಹಾಕಿ ಸರ್, ಪ್ಲೀಸ್.',
        transliteration: 'Meter haaki sir, please.',
        english: 'Please turn on the meter, sir.',
        context: 'Before entering the auto rickshaw',
        politenessLevel: 'polite',
        breakdown: [
          { word: 'ಮೀಟರ್', transliteration: 'Meter', meaning: 'Fare meter' },
          { word: 'ಹಾಕಿ', transliteration: 'haaki', meaning: 'Put / Turn on' },
          { word: 'ಸರ್', transliteration: 'sir', meaning: 'Respectful address' },
        ],
      },
      {
        id: 't-3',
        kannada: 'ಮಜೆಸ್ಟಿಕ್‌ಗೆ ಎಷ್ಟು ಆಗುತ್ತೆ?',
        transliteration: 'Majestic-ge eshtu aagutthe?',
        english: 'How much will it cost to Majestic?',
        context: 'Asking auto or taxi fare upfront',
        politenessLevel: 'polite',
      },
      {
        id: 't-4',
        kannada: 'ಒಂದು ಶಿವಾಜಿನಗರ ಟಿಕೆಟ್ ಕೊಡಿ.',
        transliteration: 'Ondu Shivajinagara ticket kodi.',
        english: 'Please give one ticket to Shivaji Nagar.',
        context: 'Talking to BMTC bus conductor',
        politenessLevel: 'polite',
        breakdown: [
          { word: 'ಒಂದು', transliteration: 'Ondu', meaning: 'One' },
          { word: 'ಟಿಕೆಟ್', transliteration: 'ticket', meaning: 'Ticket' },
          { word: 'ಕೊಡಿ', transliteration: 'kodi', meaning: 'Please give (respectful)' },
        ],
      },
      {
        id: 't-5',
        kannada: 'ಮುಂದಿನ ಸ್ಟಾಪ್‌ನಲ್ಲಿ ಇಳಿಸಿ ಅಣ್ಣ.',
        transliteration: 'Mundina stop-nalli ilisi anna.',
        english: 'Please drop me off at the next stop, brother.',
        context: 'Signaling bus conductor or auto driver to alight',
        politenessLevel: 'casual',
      },
      {
        id: 't-6',
        kannada: 'ಯುಪಿಐ ಅಥವಾ ಗೂಗಲ್ ಪೇ ಇದೆಯಾ?',
        transliteration: 'UPI athava Google Pay idiya?',
        english: 'Do you have UPI or Google Pay?',
        context: 'Paying the driver cashless',
        politenessLevel: 'polite',
      },
    ],
    dialogues: [
      {
        id: 'd-t1',
        title: 'Hailing an Auto to MG Road',
        context: 'Negotiating a ride from Koramangala to MG Road',
        difficulty: 'Beginner',
        steps: [
          {
            speaker: 'learner',
            speakerRole: 'Passenger',
            kannada: 'ನಮಸ್ಕಾರ ಅಣ್ಣ, ಎಂ.ಜಿ. ರೋಡ್‌ಗೆ ಬರ್ತೀರಾ?',
            transliteration: 'Namaskara anna, M.G. Road-ge bartheera?',
            english: 'Hello brother, will you come to MG Road?',
            tip: "'Anna' (elder brother) creates an immediate friendly tone.",
          },
          {
            speaker: 'local',
            speakerRole: 'Auto Driver',
            kannada: 'ಹಾಂ ಬನ್ನಿ, ಮೀಟರ್ ಮೇಲೆ ಇಪ್ಪತ್ತು ರೂಪಾಯಿ ಜಾಸ್ತಿ ಕೊಡಿ.',
            transliteration: 'Haam banni, meter mele ippatthu roopaayi jaasti kodi.',
            english: 'Yes, get in. Pay twenty rupees above the meter.',
          },
          {
            speaker: 'learner',
            speakerRole: 'Passenger',
            kannada: 'ಬೇಡ ಅಣ್ಣ, ಕರೆಕ್ಟ್ ಮೀಟರ್ ಹಾಕಿ, ನಾನು ಬರ್ತೀನಿ.',
            transliteration: 'Beda anna, correct meter haaki, naanu bartheeni.',
            english: 'No brother, please put the exact meter, I will come.',
            tip: "'Beda' means 'no need/don't want', clear and polite.",
          },
          {
            speaker: 'local',
            speakerRole: 'Auto Driver',
            kannada: 'ಸರಿ ಕೂತ್ಕೊಳ್ಳಿ, ಟ್ರಾಫಿಕ್ ಜಾಸ್ತಿ ಇದೆ ನೋಡಿ.',
            transliteration: 'Sari koothkoLLi, traffic jaasti ide nodi.',
            english: 'Alright, sit down. Look, there is heavy traffic.',
          },
        ],
      },
    ],
    roleplayPrompt: {
      role: 'Bengaluru Auto Driver (ಮಂಜುನಾಥ್ - Manjunath)',
      description: 'You are an auto driver at a busy stand. You speak everyday conversational Kannada, know traffic spots, and appreciate polite passengers.',
      starterPhrase: {
        kannada: 'ಹೇಳಿ ಸರ್, ಎಲ್ಲಿಗೆ ಹೋಗ್ಬೇಕು?',
        transliteration: 'Heli sir, ellige hogbeku?',
        english: 'Tell me sir, where do you need to go?',
      },
    },
  },
  {
    id: 'shopping',
    title: 'Shopping & Markets',
    kannadaTitle: 'ಖರೀದಿ ಮತ್ತು ಅಂಗಡಿ',
    subtitle: 'Kirana Stores, Vegetable Markets & Supermarkets',
    iconName: 'ShoppingBag',
    badge: 'Everyday Essentials',
    description: 'Ask for grocery weights, negotiate fresh vegetable prices at local santhe/bazaars, inquire about fresh stock, and handle payments.',
    localCultureTip: 'At traditional kirana stores and vegetable vendors, asking "Idhu tumba fresh idiya?" (Is this very fresh?) or "Swalpa kammi maadi" (Reduce a little bit) is standard and warm.',
    keyVocabulary: [
      { kannada: 'ಎಷ್ಟು ಬೆಲೆ?', transliteration: 'Eshtu bele?', english: 'How much price?' },
      { kannada: 'ಅರ್ಧ ಕೆಜಿ', transliteration: 'Ardha kg', english: 'Half kilogram' },
      { kannada: 'ಕಾಲು ಕೆಜಿ', transliteration: 'Kaalu kg', english: 'Quarter kilogram (250g)' },
      { kannada: 'ತಾಜಾ ಇದೆಯಾ?', transliteration: 'Taaja idiya?', english: 'Is it fresh?' },
      { kannada: 'ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ', transliteration: 'Swalpa kadime maadi', english: 'Reduce a little bit' },
      { kannada: 'ಬ್ಯಾಗ್ ಇದೆಯಾ?', transliteration: 'Bag idiya?', english: 'Do you have a bag?' },
      { kannada: 'ಹಾಲು / ಮೊಸರು', transliteration: 'Haalu / Mosaru', english: 'Milk / Curd' },
      { kannada: 'ಬಿಲ್ಲು ಕೊಡಿ', transliteration: 'Billu kodi', english: 'Please give the bill' },
    ],
    phrases: [
      {
        id: 's-1',
        kannada: 'ಟೊಮ್ಯಾಟೊ ಒಂದು ಕೆಜಿಗೆ ಎಷ್ಟು?',
        transliteration: 'Tomato ondu kg-ge eshtu?',
        english: 'How much is one kg of tomatoes?',
        context: 'At the vegetable bazaar or roadside stall',
        politenessLevel: 'casual',
      },
      {
        id: 's-2',
        kannada: 'ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ ಕೊಡಿ ಅಣ್ಣ.',
        transliteration: 'Swalpa kadime maadi kodi anna.',
        english: 'Please reduce the price a little, brother.',
        context: 'Gentle bargaining in local markets',
        politenessLevel: 'polite',
      },
      {
        id: 's-3',
        kannada: 'ನಂದಿನಿ ಹಾಲು ಒಂದು ಪ್ಯಾಕೆಟ್ ಕೊಡಿ.',
        transliteration: 'Nandini haalu ondu packet kodi.',
        english: 'Please give one packet of Nandini milk.',
        context: 'At the neighborhood milk booth or general store',
        politenessLevel: 'polite',
      },
      {
        id: 's-4',
        kannada: 'ಸ್ಕ್ಯಾನರ್ ಎಲ್ಲಿದೆ? ಫೋನ್ ಪೇ ಮಾಡ್ತೀನಿ.',
        transliteration: 'Scanner ellide? PhonePe maadtheeni.',
        english: 'Where is the QR scanner? I will pay via PhonePe.',
        context: 'Paying at billing counter',
        politenessLevel: 'casual',
      },
      {
        id: 's-5',
        kannada: 'ಇನ್ನೊಂದು ಸ್ವಲ್ಪ ಕೊಡಿ.',
        transliteration: 'Innondu swalpa kodi.',
        english: 'Please give a little more.',
        context: 'Asking for extra coriander/chillies or grains',
        politenessLevel: 'polite',
      },
    ],
    dialogues: [
      {
        id: 'd-s1',
        title: 'Buying Fresh Vegetables in Gandhi Bazaar',
        context: 'Purchasing onions and greens from a street vendor',
        difficulty: 'Beginner',
        steps: [
          {
            speaker: 'learner',
            speakerRole: 'Buyer',
            kannada: 'ನಮಸ್ಕಾರ ಅಮ್ಮ, ಈರುಳ್ಳಿ ಒಂದು ಕೆಜಿಗೆ ಎಷ್ಟು?',
            transliteration: 'Namaskara amma, eeruLLi ondu kg-ge eshtu?',
            english: 'Hello mother/madam, how much for 1 kg of onions?',
            tip: "'Amma' is a very respectful term for women vendor.",
          },
          {
            speaker: 'local',
            speakerRole: 'Vendor',
            kannada: 'ನಲವತ್ತು ರೂಪಾಯಿ ಸರ್, ತುಂಬಾ ತಾಜಾ ಇದೆ.',
            transliteration: 'Nalavatthu roopaayi sir, tumba taaja ide.',
            english: 'Forty rupees sir, it is very fresh.',
          },
          {
            speaker: 'learner',
            speakerRole: 'Buyer',
            kannada: 'ಎರಡು ಕೆಜಿ ತಗೋತೀನಿ, ಮೂವತ್ತೈದು ರೂಪಾಯಿಗೆ ಕೊಡಿ.',
            transliteration: 'Eradu kg thagotheeni, moovatthaidhu roopaayige kodi.',
            english: 'I will take 2 kgs, give it for thirty-five rupees.',
          },
          {
            speaker: 'local',
            speakerRole: 'Vendor',
            kannada: 'ಸರಿ ತಗೊಳ್ಳಿ, ಕೊತ್ತಂಬರಿ ಸೊಪ್ಪು ಫ್ರೀ ಆಗಿ ಹಾಕ್ತೀನಿ!',
            transliteration: 'Sari thagoLLi, kotthambari soppu free aagi haaktheeni!',
            english: 'Alright take it, I will add coriander leaves for free!',
          },
        ],
      },
    ],
    roleplayPrompt: {
      role: 'Malleshwaram Kirana Store Owner (ರಮೇಶ್ - Ramesh)',
      description: 'You run a traditional grocery store stocked with lentils, rice, spices, and Nandini dairy. You speak cordial Kannada and use terms like "Heli sir", "Bere enu beku?".',
      starterPhrase: {
        kannada: 'ನಮಸ್ಕಾರ ಸರ್, ಏನೇನು ಬೇಕು ಹೇಳಿ?',
        transliteration: 'Namaskara sir, enenu beku heli?',
        english: 'Hello sir, tell me what all items you need?',
      },
    },
  },
  {
    id: 'travelling',
    title: 'Travelling & Sightseeing',
    kannadaTitle: 'ಪ್ರವಾಸ ಮತ್ತು ಸ್ಥಳಗಳು',
    subtitle: 'Hotels, Directions, Heritage Sites & Inquiries',
    iconName: 'Compass',
    badge: 'Exploration',
    description: 'Explore Karnataka’s rich destinations (Mysuru, Hampi, Coorg, Gokarna), book lodge rooms, ask for local food recommendations, and find directions.',
    localCultureTip: 'When asking for directions, people will often say "Munde hogi, circle hathira right thagoli" (Go ahead, take right near the roundabout).',
    keyVocabulary: [
      { kannada: 'ದಾರಿ ಎಲ್ಲಿದೆ?', transliteration: 'Daari ellide?', english: 'Where is the way/road?' },
      { kannada: 'ಹತ್ತಿರ / ದೂರ', transliteration: 'Hatthira / Doora', english: 'Near / Far' },
      { kannada: 'ರೂಮ್ ಖಾಲಿ ಇದೆಯಾ?', transliteration: 'Room khaali idiya?', english: 'Is a room available?' },
      { kannada: 'ಊಟ ಸಿಗುತ್ತಾ?', transliteration: 'Oota siguttha?', english: 'Is food/meals available?' },
      { kannada: 'ಇಲ್ಲಿ ಒಳ್ಳೆಯ ಹೋಟೆಲ್ ಯಾವುದು?', transliteration: 'Illi oLLeya hotel yaavudu?', english: 'Which is a good hotel/restaurant here?' },
      { kannada: 'ಪ್ರವೇಶ ಶುಲ್ಕ ಎಷ್ಟು?', transliteration: 'Pravesha shulka eshtu?', english: 'How much is the entry fee?' },
      { kannada: 'ಫೋಟೋ ತಗೋಬಹುದಾ?', transliteration: 'Photo thagobahuda?', english: 'Can I take a photo?' },
    ],
    phrases: [
      {
        id: 'tr-1',
        kannada: 'ಕ್ಷಮಿಸಿ, ಮೈಸೂರು ಅರಮನೆಗೆ ದಾರಿ ಯಾವುದು?',
        transliteration: 'Kshamisi, Mysuru aramanege daari yaavudu?',
        english: 'Excuse me, which way is the Mysore Palace?',
        context: 'Asking a passerby for directions to a landmark',
        politenessLevel: 'polite',
      },
      {
        id: 'tr-2',
        kannada: 'ಇಲ್ಲಿಂದ ಎಷ್ಟು ದೂರ ಆಗುತ್ತೆ?',
        transliteration: 'Illinda eshtu doora aagutthe?',
        english: 'How far is it from here?',
        context: 'Estimating travel time or distance',
        politenessLevel: 'polite',
      },
      {
        id: 'tr-3',
        kannada: 'ಒಂದು ರಾತ್ರಿಗೆ ಡಬಲ್ ರೂಮ್ ಬೇಕು.',
        transliteration: 'Ondu raathrige double room beku.',
        english: 'I need a double room for one night.',
        context: 'At a hotel or homestay reception',
        politenessLevel: 'polite',
      },
      {
        id: 'tr-4',
        kannada: 'ಇಲ್ಲಿ ಪ್ರಸಿದ್ಧ ತಿನಿಸು ಯಾವುದು?',
        transliteration: 'Illi prasiddha thinisu yaavudu?',
        english: 'What is the famous local food delicacy here?',
        context: 'Inquiring about local cuisine like Mysore Pak or Bisi Bele Bath',
        politenessLevel: 'casual',
      },
      {
        id: 'tr-5',
        kannada: 'ದಯವಿಟ್ಟು ನಮಗೆ ಒಂದು ಫೋಟೋ ಕ್ಲಿಕ್ ಮಾಡ್ತೀರಾ?',
        transliteration: 'Dayavittu namage ondu photo click maadtheera?',
        english: 'Could you please click a photo for us?',
        context: 'Asking a fellow traveler to take a picture',
        politenessLevel: 'polite',
      },
    ],
    dialogues: [
      {
        id: 'd-tr1',
        title: 'Checking into a Homestay in Madikeri (Coorg)',
        context: 'Greeting the host and checking room facilities',
        difficulty: 'Intermediate',
        steps: [
          {
            speaker: 'learner',
            speakerRole: 'Traveler',
            kannada: 'ನಮಸ್ಕಾರ, ನಾವು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಬುಕ್ ಮಾಡಿದ್ವಿ.',
            transliteration: 'Namaskara, naavu online-nalli book maadidwi.',
            english: 'Hello, we booked online.',
          },
          {
            speaker: 'local',
            speakerRole: 'Homestay Host',
            kannada: 'ಬನ್ನಿ ಬನ್ನಿ! ಸ್ವಾಗತ. ನಿಮ್ಮ ಹೆಸರು ಏನು ಸರ್?',
            transliteration: 'Banni banni! Swaagata. Nimma hesaru enu sir?',
            english: 'Welcome, welcome! Please come in. What is your name, sir?',
          },
          {
            speaker: 'learner',
            speakerRole: 'Traveler',
            kannada: 'ನನ್ನ ಹೆಸರು ರಾಹುಲ್. ಬಿಸಿ ನೀರು ಮತ್ತು ವೈಫೈ ಇದೆಯಾ?',
            transliteration: 'Nanna hesaru Rahul. Bisi neeru matthu WiFi idiya?',
            english: 'My name is Rahul. Is hot water and WiFi available?',
          },
          {
            speaker: 'local',
            speakerRole: 'Homestay Host',
            kannada: 'ಖಂಡಿತ ಇದೆ. ಕಾಫಿ ತರ್ತೀನಿ, ವಿಶ್ರಾಂತಿ ತಗೊಳ್ಳಿ.',
            transliteration: 'Khanditha ide. Coffee thartheeni, vishraanthi thagoLLi.',
            english: 'Definitely available. I will bring fresh filter coffee, please rest.',
          },
        ],
      },
    ],
    roleplayPrompt: {
      role: 'Karnataka Tourism Information Guide (ಶಿವಕುಮಾರ್ - Shivakumar)',
      description: 'You are a warm local tourism officer in Karnataka who loves sharing historic tips, temple dress codes, and scenic spots.',
      starterPhrase: {
        kannada: 'ನಮಸ್ಕಾರ! ಕರ್ನಾಟಕಕ್ಕೆ ಸುಸ್ವಾಗತ. ಯಾವ ಊರು ನೋಡಲು ಇಷ್ಟಪಡುತ್ತೀರಿ?',
        transliteration: 'Namaskara! Karnatakakke suswaagata. Yaava ooru nodalu ishtapaduttheeri?',
        english: 'Hello! Welcome to Karnataka. Which town or place would you like to visit?',
      },
    },
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Medical',
    kannadaTitle: 'ಆರೋಗ್ಯ ಮತ್ತು ಆಸ್ಪತ್ರೆ',
    subtitle: 'Clinics, Symptoms, Pharmacies & Emergencies',
    iconName: 'HeartPulse',
    badge: 'Critical Care',
    description: 'Describe physical discomfort, explain symptoms (fever, stomach ache, allergy), ask medical dosage instructions, and call for emergency help.',
    localCultureTip: 'At medical shops in Karnataka, pharmacists understand English brand names but communicating dosage terms like "ಊಟ ಆದ್ಮೇಲೆ" (after food) or "ಮಲಗುವ ಮುನ್ನ" (before bed) prevents critical errors.',
    keyVocabulary: [
      { kannada: 'ನೋವು', transliteration: 'Novu', english: 'Pain / Ache' },
      { kannada: 'ಜ್ವರ', transliteration: 'Jwara', english: 'Fever' },
      { kannada: 'ತಲೆ ನೋವು', transliteration: 'Tale novu', english: 'Headache' },
      { kannada: 'ಹೊಟ್ಟೆ ನೋವು', transliteration: 'Hotte novu', english: 'Stomach ache' },
      { kannada: 'ಕೆಮ್ಮು / ಶೀತ', transliteration: 'Kemmu / Sheetha', english: 'Cough / Cold' },
      { kannada: 'ಮಾತ್ರೆ', transliteration: 'Maathre', english: 'Tablet / Pill' },
      { kannada: 'ಊಟ ಆದ್ಮೇಲೆ', transliteration: 'Oota aadmele', english: 'After food / meals' },
      { kannada: 'ತುರ್ತು / ಆಂಬುಲೆನ್ಸ್', transliteration: 'Thurtu / Ambulance', english: 'Emergency / Ambulance' },
    ],
    phrases: [
      {
        id: 'h-1',
        kannada: 'ನನಗೆ ಎರಡು ದಿನದಿಂದ ಜ್ವರ ಮತ್ತು ಕೆಮ್ಮು ಇದೆ.',
        transliteration: 'Nanage eradu dinadinda jwara matthu kemmu ide.',
        english: 'I have had a fever and cough for two days.',
        context: 'Explaining symptoms to a doctor or nurse',
        politenessLevel: 'polite',
      },
      {
        id: 'h-2',
        kannada: 'ಈ ಮಾತ್ರೆಯನ್ನು ಊಟ ಆದ್ಮೇಲೆ ತಗೋಬೇಕಾ?',
        transliteration: 'Ee maathreyannu oota aadmele thagobeka?',
        english: 'Should I take this tablet after food?',
        context: 'Clarifying prescription at a medical shop',
        politenessLevel: 'polite',
      },
      {
        id: 'h-3',
        kannada: 'ದಿನಕ್ಕೆ ಎಷ್ಟು ಸಲ ತಗೋಬೇಕು?',
        transliteration: 'Dinakke eshtu sala thagobeku?',
        english: 'How many times a day should I take this?',
        context: 'Confirming medicine schedule',
        politenessLevel: 'polite',
      },
      {
        id: 'h-4',
        kannada: 'ನನಗೆ ಪೆನ್ಸಿಲಿನ್ ಅಲರ್ಜಿ ಇದೆ.',
        transliteration: 'Nanage penicillin allergy ide.',
        english: 'I have an allergy to penicillin.',
        context: 'Vital medical alert to hospital staff',
        politenessLevel: 'formal',
      },
      {
        id: 'h-5',
        kannada: 'ತುರ್ತು ಪರಿಸ್ಥಿತಿ, ಬೇಗ ಆಂಬುಲೆನ್ಸ್ ಕರಿಸಿ!',
        transliteration: 'Thurtu paristhithi, bega ambulance karisi!',
        english: 'Emergency! Please call an ambulance immediately!',
        context: 'Accident or critical medical emergency',
        politenessLevel: 'casual',
      },
    ],
    dialogues: [
      {
        id: 'd-h1',
        title: 'Consulting a Doctor at a Clinic',
        context: 'Explaining seasonal viral symptoms',
        difficulty: 'Intermediate',
        steps: [
          {
            speaker: 'local',
            speakerRole: 'Doctor',
            kannada: 'ಬನ್ನಿ, ಕೂತ್ಕೊಳ್ಳಿ. ಏನು ತೊಂದರೆ ಆಗ್ತಿದೆ?',
            transliteration: 'Banni, koothkoLLi. Enu thondare aagthide?',
            english: 'Come in, please sit. What trouble/discomfort are you experiencing?',
          },
          {
            speaker: 'learner',
            speakerRole: 'Patient',
            kannada: 'ಡಾಕ್ಟರ್, ನಿನ್ನೆಯಿಂದ ತುಂಬಾ ತಲೆ ನೋವು ಮತ್ತು ಗಂಟಲು ನೋವು ಇದೆ.',
            transliteration: 'Doctor, ninneyinda tumba tale novu matthu gantalu novu ide.',
            english: 'Doctor, since yesterday I have severe headache and throat pain.',
          },
          {
            speaker: 'local',
            speakerRole: 'Doctor',
            kannada: 'ಜ್ವರ ನೋಡೋಣ... ಸ್ವಲ್ಪ ಜ್ವರ ಇದೆ. ಈ ಮಾತ್ರೆ ದಿನಕ್ಕೆ ಎರಡು ಬಾರಿ ಊಟದ ನಂತರ ತಗೊಳ್ಳಿ.',
            transliteration: 'Jwara nodona... swalpa jwara ide. Ee maathre dinakke eradu baari ootada nanthara thagoLLi.',
            english: 'Let me check fever... there is mild fever. Take this tablet twice daily after meals.',
          },
          {
            speaker: 'learner',
            speakerRole: 'Patient',
            kannada: 'ಧನ್ಯವಾದ ಡಾಕ್ಟರ್, ಬಿಸಿ ನೀರು ಕುಡಿಯಲಾ?',
            transliteration: 'Dhanyavaada doctor, bisi neeru kudiyalaa?',
            english: 'Thank you doctor, should I drink warm water?',
          },
        ],
      },
    ],
    roleplayPrompt: {
      role: 'Karnataka Clinic Pharmacist (ಡಾ. ಲಕ್ಷ್ಮಿ - Dr. Lakshmi)',
      description: 'You are an attentive pharmacist at a chemist store in Bengaluru. You dispense medications, explain dosage timing clearly, and provide comforting advice.',
      starterPhrase: {
        kannada: 'ನಮಸ್ಕಾರ, ಡಾಕ್ಟರ್ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಕೊಡಿ. ಯಾವ ಔಷಧಿ ಬೇಕು?',
        transliteration: 'Namaskara, doctor prescription kodi. Yaava aushadhi beku?',
        english: 'Hello, please give the doctor prescription. Which medicine do you need?',
      },
    },
  },
  {
    id: 'education',
    title: 'Education & Learning',
    kannadaTitle: 'ಶಿಕ್ಷಣ ಮತ್ತು ಕಲಿ',
    subtitle: 'Campus Life, Inquiries, Script & Pronunciation',
    iconName: 'GraduationCap',
    badge: 'Foundation',
    description: 'Learn foundational Kannada grammar constructs, ask library or administrative staff, talk with teachers/professors, and practice the Aksharamale alphabet.',
    localCultureTip: 'In Karnataka schools and colleges, addressing teachers with "Sir" or "Madam" along with "Gurugale" or "Dayavittu" shows immense respect.',
    keyVocabulary: [
      { kannada: 'ಪುಸ್ತಕ', transliteration: 'Pusthaka', english: 'Book' },
      { kannada: 'ತರಗತಿ', transliteration: 'Taragathi', english: 'Class / Classroom' },
      { kannada: 'ಗ್ರಂಥಾಲಯ', transliteration: 'Granthaalaya', english: 'Library' },
      { kannada: 'ಪರೀಕ್ಷೆ', transliteration: 'Pareekshe', english: 'Exam / Test' },
      { kannada: 'ಅರ್ಥವಾಗಲಿಲ್ಲ', transliteration: 'Arthavaagalilla', english: 'Did not understand' },
      { kannada: 'ಇನ್ನೊಮ್ಮೆ ಹೇಳಿ', transliteration: 'Innomme heli', english: 'Please say once again' },
      { kannada: 'ಕನ್ನಡ ಕಲಿಯುತ್ತಿದ್ದೇನೆ', transliteration: 'Kannada kaliyuttheeddene', english: 'I am learning Kannada' },
    ],
    phrases: [
      {
        id: 'e-1',
        kannada: 'ನಾನು ಕನ್ನಡ ಕಲಿಯುತ್ತಿದ್ದೇನೆ, ದಯವಿಟ್ಟು ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ.',
        transliteration: 'Naanu Kannada kaliyuttheeddene, dayavittu nidhaanavaagi maathanaadi.',
        english: 'I am learning Kannada, please speak slowly.',
        context: 'Essential icebreaker when talking to native speakers',
        politenessLevel: 'polite',
      },
      {
        id: 'e-2',
        kannada: 'ಇದರ ಅರ್ಥ ಏನು ಸರ್?',
        transliteration: 'Idara artha enu sir?',
        english: 'What is the meaning of this, sir?',
        context: 'Asking a teacher or mentor about a word',
        politenessLevel: 'polite',
      },
      {
        id: 'e-3',
        kannada: 'ಲೈಬ್ರರಿ ಎಷ್ಟು ಗಂಟೆಗೆ ಮುಚ್ಚುತ್ತೆ?',
        transliteration: 'Library eshtu gantege mucchutthe?',
        english: 'At what time does the library close?',
        context: 'Inquiring with campus staff',
        politenessLevel: 'casual',
      },
      {
        id: 'e-4',
        kannada: 'ದಯವಿಟ್ಟು ಇನ್ನೊಮ್ಮೆ ವಿವರಿಸಿ.',
        transliteration: 'Dayavittu innomme vivarisi.',
        english: 'Please explain once again.',
        context: 'When something is unclear in a lecture or tutorial',
        politenessLevel: 'polite',
      },
      {
        id: 'e-5',
        kannada: 'ಕನ್ನಡ ಅಕ್ಷರಮಾಲೆಯಲ್ಲಿ ಎಷ್ಟು ಅಕ್ಷರಗಳಿವೆ?',
        transliteration: 'Kannada aksharamaleyalli eshtu aksharagalive?',
        english: 'How many letters are there in the Kannada alphabet? (Answer: 49)',
        context: 'Grammar and linguistic learning',
        politenessLevel: 'casual',
      },
    ],
    dialogues: [
      {
        id: 'd-e1',
        title: 'Talking to College Administration / Library',
        context: 'Submitting assignment and borrowing reference book',
        difficulty: 'Beginner',
        steps: [
          {
            speaker: 'learner',
            speakerRole: 'Student',
            kannada: 'ನಮಸ್ಕಾರ ಸರ್, ಈ ಪುಸ್ತಕವನ್ನು ಹತ್ತು ದಿನಕ್ಕೆ ತಗೋಬಹುದಾ?',
            transliteration: 'Namaskara sir, ee pusthakavannu hatthu dinakke thagobahuda?',
            english: 'Hello sir, can I borrow this book for ten days?',
          },
          {
            speaker: 'local',
            speakerRole: 'Librarian',
            kannada: 'ಹೌದು, ನಿಮ್ಮ ಸ್ಟೂಡೆಂಟ್ ಐಡಿ ಕಾರ್ಡ್ ಕೊಡಿ.',
            transliteration: 'Haudu, nimma student ID card kodi.',
            english: 'Yes, please give your student ID card.',
          },
          {
            speaker: 'learner',
            speakerRole: 'Student',
            kannada: 'ಇಲ್ಲಿದೆ ಸರ್. ಧನ್ಯವಾದಗಳು!',
            transliteration: 'Illide sir. Dhanyavaadagalu!',
            english: 'Here it is, sir. Thank you very much!',
          },
        ],
      },
    ],
    roleplayPrompt: {
      role: 'Kannada Language Tutor (ಪ್ರೊ. ಅನಂತ್ - Prof. Ananth)',
      description: 'You are a patient and encouraging Kannada professor. You love praising non-native learners and breaking down tricky grammar points simply.',
      starterPhrase: {
        kannada: 'ಶುಭೋದಯ! ಇಂದು ನಾವು ಯಾವ ವಿಷಯ ಕಲಿಯೋಣ?',
        transliteration: 'Shubhodaya! Indu naavu yaava vishaya kaliyona?',
        english: 'Good morning! What topic shall we learn today?',
      },
    },
  },
  {
    id: 'workplaces',
    title: 'Workplaces & Offices',
    kannadaTitle: 'ಕಚೇರಿ ಮತ್ತು ಉದ್ಯೋಗ',
    subtitle: 'IT Parks, Small Talk, Colleague Rapport & Support Staff',
    iconName: 'Briefcase',
    badge: 'Professional & Social',
    description: 'Build genuine connection with colleagues, security guards, cafeteria staff, and tea stall vendors near tech parks across Karnataka.',
    localCultureTip: 'In Bengaluru tech parks (Electronic City, Whitefield, Manyata), greeting support staff (housekeeping, security, chai wallah) in Kannada with "Hegiddira anna" brings tremendous goodwill and warmth.',
    keyVocabulary: [
      { kannada: 'ಹೇಗಿದ್ದೀರಾ?', transliteration: 'Hegiddira?', english: 'How are you? (respectful)' },
      { kannada: 'ಚೆನ್ನಾಗಿದ್ದೀನಿ', transliteration: 'Chennaagiddeeni', english: 'I am doing well' },
      { kannada: 'ಕಾಫಿ / ಚಹಾ ಆಯ್ತಾ?', transliteration: 'Coffee / Chaha aaytha?', english: 'Did you have coffee / tea?' },
      { kannada: 'ಊಟ ಆಯ್ತಾ?', transliteration: 'Oota aaytha?', english: 'Did you have lunch / food?' },
      { kannada: 'ಮೀಟಿಂಗ್ ಮುಗೀತಾ?', transliteration: 'Meeting mugeetha?', english: 'Did the meeting finish?' },
      { kannada: 'ಸ್ವಲ್ಪ ಸಹಾಯ ಮಾಡ್ತೀರಾ?', transliteration: 'Swalpa sahaaya maadtheera?', english: 'Could you help a little bit?' },
      { kannada: 'ನಾಳೆ ಸಿಗೋಣ', transliteration: 'Naale sigona', english: 'See you tomorrow' },
    ],
    phrases: [
      {
        id: 'w-1',
        kannada: 'ನಮಸ್ಕಾರ ಅಣ್ಣ, ಹೇಗಿದ್ದೀರಾ? ಚಹಾ ಆಯ್ತಾ?',
        transliteration: 'Namaskara anna, hegiddira? Chaha aaytha?',
        english: 'Hello brother, how are you? Did you have tea?',
        context: 'Friendly morning greeting with security or office colleague',
        politenessLevel: 'polite',
      },
      {
        id: 'w-2',
        kannada: 'ಒಂದು ಸ್ಟ್ರಾಂಗ್ ಫಿಲ್ಟರ್ ಕಾಫಿ ಕೊಡಿ.',
        transliteration: 'Ondu strong filter coffee kodi.',
        english: 'Please give one strong filter coffee.',
        context: 'At the office cafeteria or nearby Darshini stall',
        politenessLevel: 'polite',
      },
      {
        id: 'w-3',
        kannada: 'ಇವತ್ತು ಕೆಲಸ ತುಂಬಾ ಇದೆ, ಸ್ವಲ್ಪ ಹೊತ್ತಿನಲ್ಲಿ ಮಾತಾಡ್ತೀನಿ.',
        transliteration: 'Ivatthu kelasa tumba ide, swalpa hotthinalli maathaadtheeni.',
        english: 'There is a lot of work today, I will talk in a little while.',
        context: 'When focused on a deadline or sprint deliverable',
        politenessLevel: 'casual',
      },
      {
        id: 'w-4',
        kannada: 'ಟೀಮ್ ಲಂಚ್‌ಗೆ ಎಲ್ಲಿಗೆ ಹೋಗ್ತಿದ್ದೀವಿ?',
        transliteration: 'Team lunch-ge ellige hogthiddeevi?',
        english: 'Where are we going for the team lunch?',
        context: 'Casual watercooler talk with team members',
        politenessLevel: 'casual',
      },
      {
        id: 'w-5',
        kannada: 'ತುಂಬಾ ಧನ್ಯವಾದಗಳು, ನಿಮ್ಮ ಸಹಾಯಕ್ಕೆ.',
        transliteration: 'Tumba dhanyavaadagalu, nimma sahaayakke.',
        english: 'Thank you very much for your help.',
        context: 'Expressing gratitude to a colleague or support staff',
        politenessLevel: 'formal',
      },
    ],
    dialogues: [
      {
        id: 'd-w1',
        title: 'Morning Coffee Break at the Tech Park',
        context: 'Chatting with a local colleague over morning filter coffee',
        difficulty: 'Everyday',
        steps: [
          {
            speaker: 'learner',
            speakerRole: 'Colleague',
            kannada: 'ಹಾಯ್ ಸುನಿಲ್, ಕಾಫಿ ಆಯ್ತಾ?',
            transliteration: 'Hi Sunil, coffee aaytha?',
            english: 'Hi Sunil, did you have your coffee?',
          },
          {
            speaker: 'local',
            speakerRole: 'Sunil',
            kannada: 'ಇನ್ನೂ ಇಲ್ಲ, ಈಗ ಹೋಗ್ತಾ ಇದ್ದೆ. ನೀವೂ ಬರ್ತೀರಾ?',
            transliteration: 'Innoo illa, eega hogthaa idde. Neevoo bartheera?',
            english: 'Not yet, was just heading there now. Will you also come?',
          },
          {
            speaker: 'learner',
            speakerRole: 'Colleague',
            kannada: 'ಖಂಡಿತ ಬರ್ತೀನಿ! ನನಗೂ ಒಂದು ಬಿಸಿ ಕಾಫಿ ಬೇಕು.',
            transliteration: 'Khanditha bartheeni! Nanagoo ondu bisi coffee beku.',
            english: 'Definitely coming! I also need a hot coffee.',
          },
          {
            speaker: 'local',
            speakerRole: 'Sunil',
            kannada: 'ತುಂಬಾ ಚೆನ್ನಾಗಿ ಕನ್ನಡ ಮಾತಾಡ್ತಿದ್ದೀರಲ್ಲ! ಸೂಪರ್!',
            transliteration: 'Tumba chennaagi Kannada maathaadthiddeeralla! Super!',
            english: 'You are speaking Kannada so well! Superb!',
          },
        ],
      },
    ],
    roleplayPrompt: {
      role: 'Bengaluru Tech Colleague (ದೀಪಕ್ - Deepak)',
      description: 'You are an experienced software developer in Bengaluru who loves chatting during chai breaks and helping non-local teammates pick up Kannada naturally.',
      starterPhrase: {
        kannada: 'ಹೇ ಮಚ್ಚಾ / ಫ್ರೆಂಡ್, ಹೇಗಿದೆ ಕೆಲಸ? ಕಾಫಿ ಕುಡಿಯೋಕೆ ಹೋಗೋಣ್ವಾ?',
        transliteration: 'Hey friend, hegide kelasa? Coffee kudiyoke hogonwaa?',
        english: 'Hey friend, how is work going? Shall we go grab some coffee?',
      },
    },
  },
];
