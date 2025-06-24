import { useEffect, useState } from 'react';

const COUNTDOWN_KEY = 'monoclean_deadline';
const HOURS = 7;
const MS = HOURS * 60 * 60 * 1000;

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  // Pad helper
  const pad = (n: number) => n.toString().padStart(2, '0');

  useEffect(() => {
    // Initialize or retrieve deadline
    let deadline = localStorage.getItem(COUNTDOWN_KEY);
    const now = Date.now();

    if (!deadline || +deadline - now <= 0) {
      deadline = (now + MS).toString();
      localStorage.setItem(COUNTDOWN_KEY, deadline);
    }

    const target = +deadline;

    const update = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTimeLeft(0);
        clearInterval(interval);
      } else {
        setTimeLeft(diff);
      }
    };

    update(); // Initial call
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  const h = Math.floor(timeLeft / 3.6e6);
  const m = Math.floor((timeLeft % 3.6e6) / 6e4);
  const s = Math.floor((timeLeft % 6e4) / 1000);

  return (
    <div id="countdown">
      {`${pad(h)} : ${pad(m)} : ${pad(s)}`}
    </div>
  );
};

export default CountdownTimer;
