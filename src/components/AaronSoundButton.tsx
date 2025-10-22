import React from "react";
// @ts-ignore
import * as AwesomeButtonModule from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-rickiest.css";
import "react-awesome-button/dist/styles.css";

// @ts-ignore
const AwesomeButton =
  AwesomeButtonModule.AwesomeButton ||
  AwesomeButtonModule.default?.AwesomeButton ||
  AwesomeButtonModule.default;

interface AudioSettings {
  playbackRate: number;
  pitch: number;
  loopCount: number;
  volume: number;
}

interface AaronSoundButtonProps {
  audioSrc: string;
  audioSettings?: AudioSettings;
  children?: React.ReactNode;
  type?: string;
  size?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

const AaronSoundButton: React.FC<AaronSoundButtonProps> = ({
  audioSrc,
  audioSettings = { playbackRate: 1, pitch: 1, loopCount: 1, volume: 1 },
  children,
  ...otherProps
}) => {
  const playSound = async () => {
    // Use Web Audio API for pitch shifting
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Fetch and decode the audio
    const response = await fetch(audioSrc);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Play the sound based on loop count
    for (let i = 0; i < audioSettings.loopCount; i++) {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;

      // Create gain node for volume control
      const gainNode = audioContext.createGain();
      gainNode.gain.value = audioSettings.volume;

      // Set playback rate (affects both speed and pitch together)
      source.playbackRate.value = audioSettings.playbackRate * audioSettings.pitch;

      // Connect nodes: source -> gain -> destination
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Calculate delay for loops (duration adjusted by playback rate)
      const delayTime =
        i * (audioBuffer.duration / (audioSettings.playbackRate * audioSettings.pitch));

      // Start playback
      source.start(audioContext.currentTime + delayTime);
    }
  };

  return (
    <AwesomeButton {...otherProps} onPress={playSound}>
      {children}
    </AwesomeButton>
  );
};

export default AaronSoundButton;
