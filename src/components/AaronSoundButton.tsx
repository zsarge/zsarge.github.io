import React from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-rickiest.css";
import "react-awesome-button/dist/styles.css";

interface AaronSoundButtonProps {
  audioSrc: string;
  children?: React.ReactNode;
  type?: string;
  size?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

const AaronSoundButton: React.FC<AaronSoundButtonProps> = ({
  audioSrc,
  children,
  ...otherProps
}) => {
  const playSound = () => {
    // Create a new Audio instance each time to allow overlapping playback
    const audio = new Audio(audioSrc);
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  };

  return (
    <AwesomeButton {...otherProps} onPress={playSound}>
      {children}
    </AwesomeButton>
  );
};

export default AaronSoundButton;
