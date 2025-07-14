import getImageUrl from "../../../lib/getImageServerUrl.ts";
import { useState, useEffect } from "react";

export default function CensorTetons() {
  const image = "20250513_144524_IMG_8410.avif";

  useEffect(() => {
    // preload images for the hidden section
    new Image().src = getImageUrl("20250513_144525_IMG_8411.avif", "trip-2025");
    new Image().src = getImageUrl("20250513_144525_IMG_8411.webp", "trip-2025");
    new Image().src = getImageUrl("20250513_144525_IMG_8411.jpg", "trip-2025");
  });

  const [censored, setCensored] = useState(true);
  const toggle = () => setCensored(!censored);
  const alt = (censored ? "Censored" : "Uncensored") + " Image of the Grand Teton Range";

  return <>
    <p>
      As such, below you can {censored && <span className="line-through">not</span>} see the points (from left to right) Nez Perce, Grand Teton, and Teewiont Mountian.
    </p>
    { censored ? 
      <picture>
        <source srcSet={getImageUrl("20250513_144525_IMG_8411_censored.avif", "trip-2025")} type="image/avif" />
        <source srcSet={getImageUrl("20250513_144525_IMG_8411_censored.webp", "trip-2025")} type="image/webp" />
        <img src={getImageUrl("20250513_144525_IMG_8411_censored.jpg", "trip-2025")} alt={alt} width="6014" height="4003" />
      </picture>
      :
      <picture>
        <source srcSet={getImageUrl("20250513_144525_IMG_8411.avif", "trip-2025")} type="image/avif" />
        <source srcSet={getImageUrl("20250513_144525_IMG_8411.webp", "trip-2025")} type="image/webp" />
        <img src={getImageUrl("20250513_144525_IMG_8411.jpg", "trip-2025")} alt={alt} width="6014" height="4003" />
      </picture>
    }

    <div className="flex items-center justify-center w-full">
        <button onClick={toggle} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Show {censored ? "Uncensored" : "Censored" }
        </button>
    </div>
  </>;
}

