"use client";

import { useEffect, useMemo, useState } from "react";

type WeatherResponse = {
  current: {
    temperature_2m: number;
    weather_code: number;
  };
};

const LOCATION = {
  city: process.env.NEXT_PUBLIC_CITY_NAME || "Waterloo, Ontario",
  latitude: Number(process.env.NEXT_PUBLIC_CITY_LAT || "43.4643"),
  longitude: Number(process.env.NEXT_PUBLIC_CITY_LON || "-80.5204"),
  timezone: process.env.NEXT_PUBLIC_CITY_TZ || "America/Toronto",
};

function weatherLabel(code: number): string {
  if (code === 0) return "Clear skies";
  if (code >= 1 && code <= 3) return "Partly cloudy";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 51 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Rain showers";
  if (code >= 95 && code <= 99) return "Thunderstorm";
  return "Cloudy";
}

export default function LiveStatus() {
  const [now, setNow] = useState(new Date());
  const [temperature, setTemperature] = useState<number | null>(null);
  const [conditions, setConditions] = useState("Loading weather");

  useEffect(() => {
    const clock = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(clock);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchWeather() {
      try {
        const url =
          `https://api.open-meteo.com/v1/forecast?latitude=${LOCATION.latitude}` +
          `&longitude=${LOCATION.longitude}&current=temperature_2m,weather_code&temperature_unit=celsius&timezone=${LOCATION.timezone}`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error("Weather request failed");
        const data = (await res.json()) as WeatherResponse;
        if (cancelled) return;
        setTemperature(Math.round(data.current.temperature_2m));
        setConditions(weatherLabel(data.current.weather_code));
      } catch {
        if (!cancelled) setConditions("Weather unavailable");
      }
    }

    fetchWeather();
    const poll = window.setInterval(fetchWeather, 10 * 60 * 1000);
    return () => {
      cancelled = true;
      window.clearInterval(poll);
    };
  }, []);

  const timeText = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: LOCATION.timezone,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(now),
    [now],
  );

  return (
    <div className="text-muted text-right whitespace-nowrap leading-none">
      <span>
        {LOCATION.city} {timeText}, {temperature === null ? "--" : `${temperature}°C`} {conditions}
      </span>
    </div>
  );
}

