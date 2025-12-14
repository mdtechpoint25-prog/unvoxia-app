// Compassionate auto-response library categorized by emotion

export type EmotionType = 'sadness' | 'anxiety' | 'anger' | 'confusion' | 'loneliness' | 'hope' | 'general';

export const MOODS = [
  { value: 'sadness', label: 'Sad', emoji: '😢' },
  { value: 'anxiety', label: 'Anxious', emoji: '😰' },
  { value: 'anger', label: 'Angry', emoji: '😤' },
  { value: 'confusion', label: 'Confused', emoji: '😕' },
  { value: 'loneliness', label: 'Lonely', emoji: '😔' },
  { value: 'hope', label: 'Hopeful', emoji: '🌱' },
  { value: 'general', label: 'Other', emoji: '💭' }
];

export const COMPASSIONATE_RESPONSES: Record<EmotionType, string[]> = {
  sadness: [
    "What you're feeling is valid. You're not weak for struggling. Take one breath — you are not alone.",
    "Your sadness deserves to be acknowledged, not hidden. It's okay to feel this way, and it's okay to need time.",
    "Grief and sadness are natural. You don't have to rush through this. Be gentle with yourself today.",
    "Your feelings matter. It's brave to admit when things hurt. Thank you for trusting us with your pain.",
    "Sometimes the weight feels unbearable. But you are stronger than you know, even when you don't feel it."
  ],
  
  anxiety: [
    "Anxiety can feel overwhelming, but you are safe in this moment. Breathe slowly. You've survived every hard day before this.",
    "What you're feeling is real, and it makes sense to feel anxious. You're doing your best, and that's enough.",
    "Right now, in this exact moment, you are okay. One breath. One step. You don't have to figure everything out today.",
    "Anxiety lies to us sometimes. You are more capable than your worry tells you. Ground yourself — you're here, you're safe.",
    "It's okay to feel scared. Fear doesn't make you weak. Reaching out shows courage."
  ],
  
  anger: [
    "Your anger is valid. It's telling you something important. You have the right to feel what you feel.",
    "Anger is a natural response to injustice or pain. Don't suppress it — acknowledge it, then channel it somewhere safe.",
    "It's okay to be angry. It's okay to not be okay. Your feelings are not a burden.",
    "You're allowed to be frustrated. You're allowed to be upset. These feelings are human, and you are heard.",
    "Anger often masks deeper pain. It's okay to be angry, and it's okay to explore what's underneath when you're ready."
  ],
  
  confusion: [
    "Not knowing what to do is hard. But confusion isn't failure — it's part of the process. You'll find clarity in time.",
    "It's okay to feel lost. Sometimes we need to sit in uncertainty before the path forward reveals itself.",
    "You don't have to have all the answers right now. Take it one moment at a time. The fog will lift.",
    "Confusion is uncomfortable, but it means you're thinking, growing, and seeking truth. That's brave.",
    "Feeling stuck is temporary. You're not broken — you're processing. Give yourself permission to not know yet."
  ],
  
  loneliness: [
    "Loneliness is one of the hardest feelings. But you are not alone in feeling alone. We see you, and you matter.",
    "Even in isolation, you are connected to others who understand. You are seen here. You are valued.",
    "Loneliness doesn't mean you're unlovable — it means you're human. Connection is possible, even when it feels far away.",
    "You are not invisible. Your presence here matters. You are part of this community, and you are not alone.",
    "It's okay to feel lonely. It's okay to want connection. You deserve to be seen and heard."
  ],
  
  hope: [
    "Hope is powerful. Even the smallest spark can light the way forward. Keep holding on to that feeling.",
    "Feeling hopeful is a sign of strength. You're looking toward something better, and that's beautiful.",
    "Your hope matters. It's a quiet courage that says, 'I believe things can change.' And they can.",
    "Hope doesn't mean everything is easy — it means you're still fighting. That's admirable.",
    "Hold on to that hope. Let it guide you, even on the hard days. You're on the right path."
  ],
  
  general: [
    "Thank you for sharing. Your feelings are valid, and you deserve to be heard.",
    "Whatever you're going through, you don't have to carry it alone. We're here.",
    "Your words matter. Your feelings matter. You matter.",
    "It takes courage to be vulnerable. Thank you for trusting this space.",
    "You are seen. You are heard. You are not alone."
  ]
};

export function getCompassionateResponse(mood?: EmotionType): string {
  const emotionType = mood || 'general';
  const responses = COMPASSIONATE_RESPONSES[emotionType];
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

export function getBreathingExercise(): string {
  return "Try this: Breathe in slowly for 4 counts, hold for 4, exhale for 4. Repeat three times. You are safe.";
}

export function getAffirmation(): string {
  const affirmations = [
    "You are worthy of love and kindness.",
    "Your feelings are valid.",
    "You are stronger than you realize.",
    "It's okay to not be okay.",
    "You deserve peace.",
    "You are enough, exactly as you are.",
    "Your story matters.",
    "You have survived every hard day so far.",
    "You are not defined by your struggles.",
    "Healing is not linear, and that's okay."
  ];
  return affirmations[Math.floor(Math.random() * affirmations.length)];
}
