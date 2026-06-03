import { useState, useCallback } from 'react';
import HtmlContent from '../components/HtmlContent.jsx';
import VideoModal from '../components/VideoModal.jsx';
import usePageMeta from '../usePageMeta.js';
import html from '../content/landing.html?raw';

export default function Landing() {
  usePageMeta(
    'Kunlatalk - Atendentes de IA com a identidade da sua marca',
    'A Kunlatalk cria atendentes de IA com nome, rosto e personalidade próprios da sua marca. Vende, atende e fideliza pelo WhatsApp - 24 horas por dia.'
  );

  const [videoOpen, setVideoOpen] = useState(false);
  const openVideo = useCallback(() => setVideoOpen(true), []);
  const closeVideo = useCallback(() => setVideoOpen(false), []);

  return (
    <>
      <HtmlContent html={html} onOpenVideo={openVideo} />
      <VideoModal open={videoOpen} onClose={closeVideo} />
    </>
  );
}
