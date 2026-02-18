import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      onComplete();
    };

    video.addEventListener("ended", handleEnded);
    video.play().catch(() => {
      // Autoplay blocked — skip loading
      onComplete();
    });

    return () => video.removeEventListener("ended", handleEnded);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        muted
        playsInline
        preload="auto"
        src="/videos/intro.mp4"
      />
    </motion.div>
  );
};
