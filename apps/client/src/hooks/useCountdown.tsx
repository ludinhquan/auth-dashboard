import { useState, useEffect } from "react";

export const useCountDown = (count = 0) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(count);

  useEffect(() => {
    if (timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  return {
    timeRemaining,
    setTimeRemaining,
  };
};
