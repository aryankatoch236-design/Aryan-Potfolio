import React, { useState, useEffect } from 'react';
import { SceneContainer } from './SceneContainer';
import { CustomCursor } from './CustomCursor';
import { FloatingNav } from './FloatingNav';
import { IntroSequence } from './IntroSequence';
import { EasterEggModal } from './EasterEggModal';
import { LivePreviewModal } from './LivePreviewModal';
import { WhatsAppFloatingButton } from './WhatsAppFloatingButton';

import { HeroSection } from './HeroSection';
import { ProfileSection } from './ProfileSection';
import { StrategySection } from './StrategySection';
import { ResponsibilitySection } from './ResponsibilitySection';
import { CapabilitiesSection } from './CapabilitiesSection';
import { CaseStudySection } from './CaseStudySection';
import { ClientRelationshipSection } from './ClientRelationshipSection';
import { ImpactSection } from './ImpactSection';
import { PhilosophySection } from './PhilosophySection';
import { PersonalSection } from './PersonalSection';
import { VisionSection } from './VisionSection';
import { FaqSection } from './FaqSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';

export const App: React.FC = () => {
  const [introFinished, setIntroFinished] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedStrategyNode, setSelectedStrategyNode] = useState<string>('maps');
  const [cursorText, setCursorText] = useState('');
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [easterEggModalOpen, setEasterEggModalOpen] = useState(false);

  // Live Project Preview Modal State
  const [livePreviewState, setLivePreviewState] = useState<{
    isOpen: boolean;
    title: string;
    url: string;
    client: string;
  }>({
    isOpen: false,
    title: '',
    url: '',
    client: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? window.scrollY / totalScroll : 0;
      setScrollProgress(progress);

      const sections = ['hero', 'profile', 'strategy', 'responsibilities', 'capabilities', 'work', 'about', 'faq', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEasterEgg = () => {
    setEasterEggActive(true);
    setEasterEggModalOpen(true);
  };

  const handleOpenLivePreview = (title: string, url: string, client: string) => {
    setLivePreviewState({
      isOpen: true,
      title,
      url,
      client
    });
  };

  const handleCloseLivePreview = () => {
    setLivePreviewState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="relative min-h-screen bg-[#060504] text-white selection:bg-[#FF5A1F] selection:text-white">
      {!introFinished && <IntroSequence onComplete={() => setIntroFinished(true)} />}

      <SceneContainer
        scrollProgress={scrollProgress}
        activeSection={activeSection}
        hoveredStrategyNode={selectedStrategyNode}
        onHoverStrategyNode={setSelectedStrategyNode}
        easterEggActive={easterEggActive}
      />

      <CustomCursor cursorText={cursorText} />

      <FloatingNav
        activeSection={activeSection}
        onEasterEggTrigger={handleEasterEgg}
      />

      <EasterEggModal
        isOpen={easterEggModalOpen}
        onClose={() => setEasterEggModalOpen(false)}
      />

      {/* Interactive In-App Live Project Preview Modal */}
      <LivePreviewModal
        isOpen={livePreviewState.isOpen}
        onClose={handleCloseLivePreview}
        title={livePreviewState.title}
        url={livePreviewState.url}
        client={livePreviewState.client}
      />

      {/* Floating 1-Click WhatsApp Action */}
      <WhatsAppFloatingButton />

      <main className="relative z-10">
        <HeroSection onHoverStateChange={setCursorText} />
        <ProfileSection onHoverStateChange={setCursorText} />
        <StrategySection
          selectedNodeId={selectedStrategyNode}
          onSelectNode={setSelectedStrategyNode}
          onHoverStateChange={setCursorText}
        />
        <ResponsibilitySection onHoverStateChange={setCursorText} />
        <CapabilitiesSection onHoverStateChange={setCursorText} />
        <CaseStudySection
          onOpenLivePreview={handleOpenLivePreview}
          onHoverStateChange={setCursorText}
        />
        <ClientRelationshipSection onHoverStateChange={setCursorText} />
        <ImpactSection onHoverStateChange={setCursorText} />
        <PhilosophySection onHoverStateChange={setCursorText} />
        <PersonalSection onHoverStateChange={setCursorText} />
        <VisionSection onHoverStateChange={setCursorText} />
        <FaqSection />
        <ContactSection onHoverStateChange={setCursorText} />
        <Footer />
      </main>
    </div>
  );
};
