import { useState } from 'react';
import { MarxistHomepage } from './components/marxist-homepage';
import { TheoryContent } from './components/theory-content';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'theory'>('home');

  return (
    <div className="size-full">
      {currentView === 'home' ? (
        <MarxistHomepage onViewChange={setCurrentView} />
      ) : (
        <TheoryContent onViewChange={setCurrentView} />
      )}
    </div>
  );
}