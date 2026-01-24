import { useState } from 'react';
import { MarxistHomepage } from './components/marxist-homepage';
import { TheoryContent } from './components/theory-content';
import { ClassContent } from './components/class-content';
import { EthnicityContent } from './components/ethnicity-content';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'theory' | 'class' | 'ethnicity'>('home');

  return (
    <div className="size-full">
      {currentView === 'home' ? (
        <MarxistHomepage onViewChange={setCurrentView} />
      ) : currentView === 'theory' ? (
        <TheoryContent onViewChange={setCurrentView} />
      ) : currentView === 'class' ? (
        <ClassContent onViewChange={setCurrentView} />
      ) : (
        <EthnicityContent onViewChange={setCurrentView} />
      )}
    </div>
  );
}