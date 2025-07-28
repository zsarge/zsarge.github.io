import getImageUrl from "../../../lib/getImageServerUrl.ts";
import { useState, useEffect } from "react";

export default function ShowPeople() {
  useEffect(() => {
    // preload images for the hidden section
    new Image().src = getImageUrl("20250609_154622_IMG_1740_zoomed.avif", "trip-2025");
    new Image().src = getImageUrl("20250609_154622_IMG_1740_zoomed.webp", "trip-2025");
    new Image().src = getImageUrl("20250609_154622_IMG_1740_zoomed.jpg", "trip-2025");
  });

  const [zoomed, setZoomed] = useState(true);
  const toggle = () => setZoomed(!zoomed);
  const alt = (zoomed ? "Zoomed" : "Unzoomed") + " Image of hikers at the Grand Canyon";

  return <>
    { zoomed ? 
      <picture>
        <source srcSet={getImageUrl("20250609_154622_IMG_1740.avif", "trip-2025")} type="image/avif" />
        <source srcSet={getImageUrl("20250609_154622_IMG_1740.webp", "trip-2025")} type="image/webp" />
        <img       src={getImageUrl("20250609_154622_IMG_1740.jpg", "trip-2025")} alt={alt} width="6014" height="4003" />
      </picture>
      :
      <picture>
        <source srcSet={getImageUrl("20250609_154622_IMG_1740_zoomed.avif", "trip-2025")} type="image/avif" />
        <source srcSet={getImageUrl("20250609_154622_IMG_1740_zoomed.webp", "trip-2025")} type="image/webp" />
        <img       src={getImageUrl("20250609_154622_IMG_1740_zoomed.jpg", "trip-2025")} alt={alt} width="6014" height="4003" />
      </picture>
    }

    <div className="flex items-center justify-center w-full mb-5">
        <button onClick={toggle} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          {zoomed ? "Show People" : "Hide People" }
        </button>
    </div>
  </>;
}

