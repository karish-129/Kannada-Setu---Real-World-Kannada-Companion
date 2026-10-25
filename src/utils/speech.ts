/**
 * Audio speech helper supporting browser Web Speech Synthesis and backend TTS fallback
 */

let activeAudio: HTMLAudioElement | null = null;

export async function speakKannada(
  text: string,
  onStateChange?: (speaking: boolean) => void
): Promise<void> {
  if (onStateChange) onStateChange(true);

  // Stop any ongoing audio
  if (activeAudio) {
    activeAudio.pause();
    activeAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  // 1. First attempt: Browser Speech Synthesis with Kannada voice or Indian English
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const voices = window.speechSynthesis.getVoices();
    const kannadaVoice = voices.find(
      (v) => v.lang.toLowerCase().includes('kn') || v.lang.toLowerCase().includes('kannada')
    );

    if (kannadaVoice) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = kannadaVoice;
      utterance.lang = 'kn-IN';
      utterance.rate = 0.9; // Slightly slower for crisp clarity
      utterance.onend = () => {
        if (onStateChange) onStateChange(false);
      };
      utterance.onerror = () => {
        if (onStateChange) onStateChange(false);
      };
      window.speechSynthesis.speak(utterance);
      return;
    }
  }

  // 2. Second attempt: Call Gemini TTS endpoint on server
  try {
    const res = await fetch('/api/gemini/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.audioBase64) {
        const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
        activeAudio = audio;
        audio.onended = () => {
          if (onStateChange) onStateChange(false);
          activeAudio = null;
        };
        audio.onerror = () => {
          fallbackSpeech(text, onStateChange);
        };
        await audio.play();
        return;
      }
    }
  } catch {
    // Continue to fallback
  }

  // 3. Graceful fallback: Web Speech API general voice
  fallbackSpeech(text, onStateChange);
}

function fallbackSpeech(text: string, onStateChange?: (speaking: boolean) => void) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'kn-IN';
    utterance.rate = 0.85;
    utterance.onend = () => {
      if (onStateChange) onStateChange(false);
    };
    utterance.onerror = () => {
      if (onStateChange) onStateChange(false);
    };
    window.speechSynthesis.speak(utterance);
  } else {
    if (onStateChange) onStateChange(false);
  }
}
