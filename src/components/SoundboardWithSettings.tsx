import React, { useState } from "react";
import AudioSettings, { type AudioSettings as AudioSettingsType } from "./AudioSettings";
import AaronSoundButton from "./AaronSoundButton";

interface SoundboardWithSettingsProps {
  soundButtons: Array<{
    name: string;
    sound: string;
    image: any;
  }>;
}

const SoundboardWithSettings: React.FC<SoundboardWithSettingsProps> = ({ soundButtons }) => {
  const [audioSettings, setAudioSettings] = useState<AudioSettingsType>({
    playbackRate: 1,
    pitch: 1,
    loopCount: 1,
    volume: 1,
  });

  const playAllSounds = async () => {
    // Play all sounds simultaneously with current settings
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    for (const button of soundButtons) {
      // Fetch and decode the audio
      const response = await fetch(button.sound);
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

        // Calculate delay for loops
        const delayTime =
          i * (audioBuffer.duration / (audioSettings.playbackRate * audioSettings.pitch));

        // Start playback
        source.start(audioContext.currentTime + delayTime);
      }
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <AudioSettings onSettingsChange={setAudioSettings} onPlayAll={playAllSounds} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
        {soundButtons.map((button, index) => (
          <div key={index} className="flex flex-col items-center">
            <h2 className="text-xl text-black text-center dark:text-white font-bold mb-2">
              {button.name}
            </h2>
            <AaronSoundButton
              audioSrc={button.sound}
              audioSettings={audioSettings}
              type="primary"
              size="large"
              style={{
                width: "100%",
                minHeight: "200px",
                fontSize: "1rem",
              }}
            >
              <img
                src={button.image.src}
                alt={`${button.name} - Aaron`}
                style={{ height: "150px" }}
              />
            </AaronSoundButton>
          </div>
        ))}
      </div>
    </>
  );
};

export default SoundboardWithSettings;
