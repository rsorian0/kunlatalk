import { useEffect } from 'react';

const VIDEO_SRC =
  'https://www.youtube.com/embed/LKNVQSMiC8o?si=Stfztu0YHtWtQJfF&autoplay=1&rel=0';

export default function VideoModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    document.body.classList.add('modal-open');
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={`video-modal${open ? ' open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Vídeo: como a Kunlatalk funciona"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="video-modal-dialog">
        <button
          type="button"
          className="video-modal-close"
          aria-label="Fechar vídeo"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        {open && (
          <iframe
            src={VIDEO_SRC}
            title="Como a Kunlatalk funciona"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}
