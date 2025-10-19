import { useEffect, useState } from "react";

type Props = {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number; 
};

const colors = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-blue-600",
  warning: "bg-yellow-600 text-black",
};

const ToastMessage = ({ message, type = "info", duration = 4000 }: Props) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded shadow-lg text-white text-sm font-medium ${colors[type]} animate-fade-in`}>
      {message}
    </div>
  );
};

export default ToastMessage;
