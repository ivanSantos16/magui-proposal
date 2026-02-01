import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  LoadingScreen,
  MusicControl,
  Header,
  Timeline,
  ProposalSection,
  SuccessModal,
  ErrorAlert
} from '@/components';
import { useMusic } from '@/hooks/useMusic';
import { useTimelineScroll } from '@/hooks/useTimelineScroll';
import { UI } from '@/constants';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const { musicPlaying, toggleMusic } = useMusic(!loading);
  const { timelineRef, scrollYProgress } = useTimelineScroll();

  const handleComplete = () => {
    setLoading(false);
  };

  const handleYes = () => {
    setShowSuccess(true);
  };

  const handleNo = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), UI.ERROR_ALERT_DURATION);
  };

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleComplete} />}
      </AnimatePresence>

      {!loading && (
        <div className="bg-black text-white overflow-x-hidden">
          {/* Background gradient */}
          <div className="fixed inset-0 bg-gradient-to-b from-rose-950/20 via-black to-black pointer-events-none" />

          {/* Music control */}
          <MusicControl isPlaying={musicPlaying} onToggle={toggleMusic} />

          {/* Header - Landing Page */}
          <Header />

          {/* Main content */}
          <div className="relative z-10 max-w-2xl mx-auto px-6 py-20">
            <Timeline timelineRef={timelineRef} scrollYProgress={scrollYProgress} />
          </div>

          {/* Proposal Section - Full Viewport */}
          <div className="relative z-10">
            <ProposalSection onYes={handleYes} onNo={handleNo} />
          </div>

          {/* Success Modal */}
          <SuccessModal open={showSuccess} onOpenChange={setShowSuccess} />

          {/* Error Alert */}
          <ErrorAlert show={showError} />
        </div>
      )}
    </>
  );
}