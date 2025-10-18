import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

type Props = {
  message: string;
  details?: Record<string, string>;
  onClose?: () => void;
};

const FloatingPopupPortal = ({ message, details, onClose }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }

    const timer = setTimeout(() => {
      if (ref.current) {
        gsap.to(ref.current, {
          opacity: 0,
          y: 20,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => onClose?.(),
        });
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return createPortal(
    <div
      ref={ref}
      className="fixed bottom-6 right-6 z-[9999] w-[400px] bg-gray-300/30 backdrop-blur-md rounded-lg shadow-lg border border-lime-500 p-4 text-sm text-white"
    >
      <p className="font-semibold text-lime-500 mb-2">✅ {message}</p>
      {details &&
        Object.entries(details).map(([key, value]) => (
          <p key={key}>
            <span className="font-semibold">{key}:</span> {value}
          </p>
        ))}
    </div>,
    document.body
  );
};

export default FloatingPopupPortal;