import React, { useState } from "react";

interface AudioSettingsProps {
  onSettingsChange: (settings: AudioSettings) => void;
  onPlayAll: () => void;
}

export interface AudioSettings {
  playbackRate: number;
  pitch: number;
  loopCount: number;
  volume: number;
}

const AudioSettings: React.FC<AudioSettingsProps> = ({ onSettingsChange, onPlayAll }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [loopCount, setLoopCount] = useState(1);
  const [volume, setVolume] = useState(1);

  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: number,
    key: keyof AudioSettings,
  ) => {
    setter(value);
    onSettingsChange({
      playbackRate,
      pitch,
      loopCount,
      volume,
      [key]: value,
    });
  };

  const resetSettings = () => {
    setPlaybackRate(1);
    setPitch(1);
    setLoopCount(1);
    setVolume(1);
    onSettingsChange({
      playbackRate: 1,
      pitch: 1,
      loopCount: 1,
      volume: 1,
    });
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 underline"
      >
        {isOpen ? "▼" : "▶"} Advanced Settings
      </button>

      {isOpen && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Playback Speed: {playbackRate.toFixed(2)}x
            </label>
            <input
              type="range"
              min="0.25"
              max="2"
              step="0.05"
              value={playbackRate}
              onChange={(e) =>
                handleChange(setPlaybackRate, parseFloat(e.target.value), "playbackRate")
              }
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>0.25x</span>
              <span>2x</span>
            </div>
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Pitch Shift: {pitch.toFixed(2)}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.05"
              value={pitch}
              onChange={(e) => handleChange(setPitch, parseFloat(e.target.value), "pitch")}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>0.5x (Lower)</span>
              <span>2x (Higher)</span>
            </div>
          </div> */}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Loop Count: {loopCount}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={loopCount}
              onChange={(e) => handleChange(setLoopCount, parseInt(e.target.value), "loopCount")}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>1</span>
              <span>10</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Volume: {Math.round(volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleChange(setVolume, parseFloat(e.target.value), "volume")}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          <button
            onClick={resetSettings}
            className="mt-2 px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Reset to Default
          </button>

          <button
            onClick={onPlayAll}
            className="mt-2 ml-2 px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 font-bold"
          >
            🔊 Play All Sounds
          </button>
        </div>
      )}
    </div>
  );
};

export default AudioSettings;
