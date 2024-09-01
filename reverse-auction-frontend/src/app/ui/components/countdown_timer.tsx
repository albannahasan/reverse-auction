import { Tooltip } from "@nextui-org/react";
import { EyeIcon, EditIcon, DeleteIcon } from "./icons";
import { FormEvent, MouseEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const parseDateString = (dateString: string): Date => {
  // Create a Date object from the provided dateString
  return new Date(dateString);
};

interface CountdownTimerProps {
  time: string;
}

export default function CountdownTimer({ time }: CountdownTimerProps) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [closingTime, setClosingTime] = useState(false);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date();
      const time_parsed = parseDateString(time);
      const difference = time_parsed.getTime() - now.getTime();
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);

      const target = parseDateString(time);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div>
        <div className="flex justify-center items-center p-4 bg-beige rounded-lg shadow-md">
          <div className="flex space-x-4 mt-2">
            <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm">
              <span className="text-4xl font-bold text-gray-800">{days}</span>
              <span className="text-sm font-medium text-gray-600">Days</span>
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm">
              <span className="text-4xl font-bold text-gray-800">{hours}</span>
              <span className="text-sm font-medium text-gray-600">Hours</span>
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm">
              <span className="text-4xl font-bold text-gray-800">
                {minutes}
              </span>
              <span className="text-sm font-medium text-gray-600">Minutes</span>
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm">
              <span className="text-4xl font-bold text-gray-800">
                {seconds}
              </span>
              <span className="text-sm font-medium text-gray-600">Seconds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
