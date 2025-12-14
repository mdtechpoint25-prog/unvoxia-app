'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Moment, { MomentData } from './Moment';
import GentleInterruption from './GentleInterruption';

// Initial moments data - in production, this would come from API/database
const initialMoments: MomentData[] = [
  {
    id: '1',
    type: 'validation',
    content: 'You don\'t need to be strong here.',
    emotionTag: 'safety',
  },
  {
    id: '2',
    type: 'confession',
    content: 'I laugh with people, but inside I feel empty.',
    emotionTag: 'loneliness',
  },
  {
    id: '3',
    type: 'guidance',
    content: 'Take one breath. You are allowed to pause.',
    emotionTag: 'rest',
  },
  {
    id: '4',
    type: 'confession',
    content: 'Everyone thinks I have it together. I don\'t.',
    emotionTag: 'mask',
  },
  {
    id: '5',
    type: 'reassurance',
    content: 'What you\'re feeling is valid. All of it.',
    emotionTag: 'validation',
  },
  {
    id: '6',
    type: 'prompt',
    content: 'What are you holding in right now?',
    emotionTag: 'reflection',
  },
  {
    id: '7',
    type: 'confession',
    content: 'I\'m tired of pretending everything is fine.',
    emotionTag: 'exhaustion',
  },
  {
    id: '8',
    type: 'validation',
    content: 'You are more than your worst days.',
    emotionTag: 'hope',
  },
  {
    id: '9',
    type: 'guidance',
    content: 'You don\'t have to fix anything right now. Just be.',
    emotionTag: 'peace',
  },
  {
    id: '10',
    type: 'confession',
    content: 'I help everyone else but forget to help myself.',
    emotionTag: 'selfcare',
  },
  {
    id: '11',
    type: 'reassurance',
    content: 'Healing isn\'t linear. Neither is life.',
    emotionTag: 'journey',
  },
  {
    id: '12',
    type: 'prompt',
    content: 'What would you say if no one was listening?',
    emotionTag: 'honesty',
  },
  {
    id: '13',
    type: 'confession',
    content: 'I don\'t know who I am anymore.',
    emotionTag: 'identity',
  },
  {
    id: '14',
    type: 'validation',
    content: 'It\'s okay to not be okay.',
    emotionTag: 'acceptance',
  },
  {
    id: '15',
    type: 'guidance',
    content: 'Close your eyes. Feel your heartbeat. You are alive.',
    emotionTag: 'grounding',
  },
];

// Shuffle array helper
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Balance emotional tones - ethical algorithm
function balanceEmotions(moments: MomentData[]): MomentData[] {
  const balanced: MomentData[] = [];
  const byType = {
    confession: moments.filter(m => m.type === 'confession'),
    validation: moments.filter(m => m.type === 'validation'),
    guidance: moments.filter(m => m.type === 'guidance'),
    prompt: moments.filter(m => m.type === 'prompt'),
    reassurance: moments.filter(m => m.type === 'reassurance'),
  };

  // Shuffle each category
  Object.keys(byType).forEach(key => {
    byType[key as keyof typeof byType] = shuffleArray(byType[key as keyof typeof byType]);
  });

  // Interleave: never show more than 2 confessions in a row
  // Always follow heavy content with grounding/validation
  let confessionCount = 0;
  const types = ['validation', 'confession', 'guidance', 'confession', 'reassurance', 'prompt'];
  
  for (let i = 0; i < moments.length; i++) {
    const typeIndex = i % types.length;
    const type = types[typeIndex] as keyof typeof byType;
    
    if (byType[type].length > 0) {
      balanced.push(byType[type].shift()!);
    } else {
      // Fallback to any available
      for (const t of ['validation', 'reassurance', 'guidance']) {
        if (byType[t as keyof typeof byType].length > 0) {
          balanced.push(byType[t as keyof typeof byType].shift()!);
          break;
        }
      }
    }
  }

  return balanced;
}

export default function EmotionalStream() {
  const [moments] = useState<MomentData[]>(() => balanceEmotions(shuffleArray(initialMoments)));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInterruption, setShowInterruption] = useState(false);
  const [hasSeenInterruption, setHasSeenInterruption] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const lastScrollTime = useRef(0);

  // Show gentle interruption after 4 moments (0-indexed: after seeing index 3)
  useEffect(() => {
    if (currentIndex === 4 && !hasSeenInterruption) {
      setShowInterruption(true);
    }
  }, [currentIndex, hasSeenInterruption]);

  const scrollToIndex = useCallback((index: number) => {
    if (containerRef.current && !isScrolling.current) {
      isScrolling.current = true;
      const container = containerRef.current;
      const targetScroll = index * window.innerHeight;
      
      container.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });

      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    }
  }, []);

  // Handle scroll/swipe
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartY = 0;
    let touchEndY = 0;

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime.current < 100) return;
      lastScrollTime.current = now;

      const scrollTop = container.scrollTop;
      const viewportHeight = window.innerHeight;
      const newIndex = Math.round(scrollTop / viewportHeight);
      
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < moments.length + (showInterruption ? 1 : 0)) {
        setCurrentIndex(newIndex);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentIndex < moments.length - 1) {
          scrollToIndex(currentIndex + 1);
        } else if (diff < 0 && currentIndex > 0) {
          scrollToIndex(currentIndex - 1);
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime.current < 800) return;
      lastScrollTime.current = now;

      if (e.deltaY > 0 && currentIndex < moments.length - 1) {
        scrollToIndex(currentIndex + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        scrollToIndex(currentIndex - 1);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('wheel', handleWheel);
    };
  }, [currentIndex, moments.length, scrollToIndex, showInterruption]);

  const handleContinueReading = () => {
    setShowInterruption(false);
    setHasSeenInterruption(true);
  };

  // Build display items - insert interruption at position 4
  const displayItems = [...moments];
  
  return (
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        width: '100vw',
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        background: '#0f172a',
      }}
    >
      {displayItems.map((moment, index) => {
        // Insert interruption card at position 4
        if (index === 4 && showInterruption) {
          return (
            <div key="interruption" style={{ scrollSnapAlign: 'start' }}>
              <GentleInterruption onContinue={handleContinueReading} />
            </div>
          );
        }

        return (
          <div key={moment.id} style={{ scrollSnapAlign: 'start' }}>
            <Moment moment={moment} index={index} />
          </div>
        );
      })}
    </div>
  );
}
