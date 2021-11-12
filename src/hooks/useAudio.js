import { useState, useEffect } from "react";

const useAudio = (music) => {
  const [audio] = useState(new Audio(music));
  const [playing, setPlaying] = useState(false);

  //   const toggle = () => setPlaying(!playing);
  useEffect(() => {
    audio.volume = 0.2;
    // audio.play();
    return () => {
      audio.pause();
    };
  }, [audio]);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [audio, playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  return [playing, setPlaying];
};

export default useAudio;
