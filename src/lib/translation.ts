// Simple translation mock for Telugu ↔ English
// In a real app, this would integrate with Google Translate API or similar service

const translations: Record<string, Record<string, string>> = {
  // Telugu to English basic translations
  "te-en": {
    "దీపావళి గురించి చెప్పండి": "tell me about diwali",
    "హోలీ ఎప్పుడు జరుగుతుంది": "when does holi happen",
    "పొంగల్ ఏమిటి": "what is pongal",
    "గణేష చతుర్థి": "ganesh chaturthi",
    "రక్షా బంధన్": "raksha bandhan",
  },
  // English to Telugu basic translations for common phrases
  "en-te": {
    "I couldn't find information about that topic. Please ask about Indian festivals like Diwali, Holi, Pongal, Ganesh Chaturthi, or Raksha Bandhan.": 
      "ఆ విషయం గురించి సమాచారం దొరకలేదు. దయచేసి దీపావళి, హోలీ, పొంగల్, గణేష చతుర్థి, లేదా రక్షా బంధన్ వంటి భారతీయ పండుగల గురించి అడగండి.",
    
    "Diwali, also called Deepavali, is the festival of lights celebrated by Hindus, Jains, Sikhs, and some Buddhists. It symbolizes the spiritual victory of light over darkness, good over evil, and knowledge over ignorance. The festival spans five days and involves lighting oil lamps (diyas), decorating homes with rangoli, exchanging gifts, and preparing special sweets. Families gather to worship Goddess Lakshmi for prosperity and Lord Ganesha for good fortune.":
      "దీపావళి, దీపావళి అని కూడా పిలుస్తారు, ఇది హిందువులు, జైనులు, సిక్కులు మరియు కొంతమంది బౌద్ధులు జరుపుకునే దీపాల పండుగ. ఇది చీకటిపై వెలుగు, చెడుపై మంచి, అజ్ఞానంపై జ్ఞానం యొక్క ఆధ్యాత్మిక విజయాన్ని సూచిస్తుంది. ఈ పండుగ ఐదు రోజులు ఉంటుంది మరియు నూనె దీపాలు (దీయాలు) వెలిగించడం, రంగోలీతో ఇళ్లను అలంకరించడం, బహుమతులు ఇచ్చుకోవడం మరియు ప్రత్యేక స్వీట్లు తయారు చేయడం వంటివి ఉంటాయి. కుటుంబాలు శ్రేయస్సు కోసం లక్ష్మీదేవిని మరియు అదృష్టం కోసం గణేశుడిని పూజిస్తారు.",

    "Holi is the festival of colors celebrated in the spring season, marking the arrival of spring and the triumph of good over evil. It commemorates the divine love of Radha and Krishna and celebrates the victory of devotee Prahlad over his evil father Hiranyakashipu. People play with colored powders (gulal), dance, sing, and feast together. The festival promotes unity, forgiveness, and the renewal of relationships.":
      "హోలీ అనేది వసంత ఋతువులో జరుపుకునే రంగుల పండుగ, ఇది వసంతకాలం రాకను మరియు చెడుపై మంచి విజయాన్ని సూచిస్తుంది. ఇది రాధ మరియు కృష్ణుల దైవిక ప్రేమను స్మరిస్తుంది మరియు భక్తుడు ప్రహ్లాదుడు తన దుష్ట తండ్రి హిరణ్యకశిపుపై సాధించిన విజయాన్ని జరుపుకుంటుంది. ప్రజలు రంగుల పొడితో (గులాల్) ఆట, నృత్యం, పాట మరియు కలిసి విందు చేస్తారు. ఈ పండుగ ఐక్యత, క్షమాపణ మరియు సంబంధాల పునరుద్ధరణను ప్రోత్సహిస్తుంది.",

    "Pongal is a harvest festival celebrated primarily in Tamil Nadu to thank the Sun God, nature, and farm animals for a successful harvest. The four-day celebration includes Bhogi Pongal, Thai Pongal, Mattu Pongal, and Kaanum Pongal. The festival involves cooking the traditional Pongal dish made of rice and jaggery, decorating cattle, and expressing gratitude to nature. It represents the deep connection between Tamil culture and agriculture.":
      "పొంగల్ అనేది ప్రధానంగా తమిళనాడులో విజయవంతమైన పంటకు సూర్యదేవుడు, ప్రకృతి మరియు వ్యవసాయ జంతువులకు కృతజ్ఞతలు చెప్పడానికి జరుపుకునే పంట పండుగ. నాలుగు రోజుల వేడుకలో భోగి పొంగల్, తై పొంగల్, మట్టు పొంగల్ మరియు కాణుమ్ పొంగల్ ఉన్నాయి. ఈ పండుగలో బియ్యం మరియు బెల్లంతో చేసిన సాంప్రదాయ పొంగల్ వంటకం వండటం, పశువులను అలంకరించడం మరియు ప్రకృతికి కృతజ్ఞతలు తెలుపుట ఉంటుంది. ఇది తమిళ సంస్కృతి మరియు వ్యవసాయం మధ్య లోతైన సంబంధాన్ని సూచిస్తుంది."
  }
};

export async function translateText(text: string, fromLang: string, toLang: string): Promise<string> {
  // Mock translation - in a real app, this would call Google Translate API
  const translationKey = `${fromLang}-${toLang}`;
  const translationMap = translations[translationKey];
  
  if (translationMap && translationMap[text]) {
    return translationMap[text];
  }
  
  // If no exact translation found, try to find partial matches for common words
  if (fromLang === "te" && toLang === "en") {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("దీపావళి") || lowerText.includes("దీవాళి")) return "diwali";
    if (lowerText.includes("హోలీ")) return "holi";
    if (lowerText.includes("పొంగల్")) return "pongal";
    if (lowerText.includes("గణేష")) return "ganesh chaturthi";
    if (lowerText.includes("రక్షా")) return "raksha bandhan";
  }
  
  // For demo purposes, return original text if no translation found
  // In production, this would make an actual API call
  return text;
}

// Helper function to detect if text is in Telugu
export function isTeluguText(text: string): boolean {
  // Simple check for Telugu Unicode range
  const teluguRegex = /[\u0C00-\u0C7F]/;
  return teluguRegex.test(text);
}