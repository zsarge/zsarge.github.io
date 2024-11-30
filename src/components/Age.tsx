import { useEffect } from "react";
import usePrefersReducedMotion from "../lib/usePrefersReducedMotion";

// A quick script to show my age in a ridiculous amount of precision.
const birthday = new Date("2004-06-11");

function getAgeString() {
  const msPerYear = 1000 * 60 * 60 * 24 * 365.25;
  const differenceInMs = new Date() - birthday;
  const differenceInYears = differenceInMs / msPerYear;
  return differenceInYears.toFixed(9);
}

let animationInterval: ReturnType<typeof setInterval>;

function animateAge() {
  const age = document.getElementById("age");
  if (age) {
    if (animationInterval) clearInterval(animationInterval);
    animationInterval = setInterval(() => {
      age.textContent = getAgeString();
    }, 50);
  }
}

export default function Age() {
  // Check if the media query matches or is not available.
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Ads an event listener to check for changes in the media query's value.
    if (prefersReducedMotion) {
      clearInterval(animationInterval);
    } else {
      animateAge();
    }

    return () => {
      clearInterval(animationInterval);
    };
  }, [prefersReducedMotion]);

  return <span id="age">20.471511751</span>;
}
