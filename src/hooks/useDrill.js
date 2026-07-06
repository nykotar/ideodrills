import { useCallback, useEffect, useRef, useState } from "react";
import { useTimer } from "react-timer-hook";
import gsap from "gsap";

// Single source of truth for whether the drill loop is active. Both the
// recursive speech/animation loop and the timer's natural expiry check this
// ref (instead of each having their own notion of "running"), so there is
// exactly one path back to idle regardless of how the drill ends.
export function useDrill(settings) {
  const [status, setStatus] = useState("idle"); // "idle" | "running"
  const [currentIdeogram, setCurrentIdeogram] = useState("");
  const ideogramRef = useRef(null);
  const statusRef = useRef("idle");
  const stopRef = useRef(() => {});

  const { minutes, seconds, restart, pause } = useTimer({
    expiryTimestamp: 1,
    onExpire: () => stopRef.current(),
  });

  const stop = useCallback(() => {
    statusRef.current = "idle";
    setStatus("idle");
    speechSynthesis.cancel();
    setCurrentIdeogram("");
    pause();
    gsap.killTweensOf(ideogramRef.current);
  }, [pause]);

  useEffect(() => {
    stopRef.current = stop;
  }, [stop]);

  const start = useCallback(
    (ideograms) => {
      if (ideograms.length === 0) return;
      if (!settings.voice && !settings.displayIdeogram) return;

      const expiryTimestamp = new Date();
      expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + Number(settings.time) * 60);
      restart(expiryTimestamp);
      statusRef.current = "running";
      setStatus("running");

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const fadeDuration = reduceMotion ? 0 : 0.5;

      function speakNextIdeogram() {
        if (statusRef.current !== "running") return;

        const ideogram = ideograms[Math.floor(Math.random() * ideograms.length)];
        setCurrentIdeogram(ideogram);

        gsap.fromTo(
          ideogramRef.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: fadeDuration,
            ease: "expo.out",
            onComplete: () => {
              setTimeout(() => {
                gsap.to(ideogramRef.current, { opacity: 0, scale: 0.9, duration: fadeDuration, ease: "expo.in" });
              }, settings.speed * 1000 - 1000);
            },
          }
        );

        if (settings.voice) {
          const utterance = new SpeechSynthesisUtterance(ideogram.replace("/", " "));
          utterance.voice = settings.voices[settings.voice];
          utterance.onend = () => {
            if (statusRef.current === "running") {
              setTimeout(speakNextIdeogram, settings.speed * 1000);
            }
          };
          speechSynthesis.speak(utterance);
        } else {
          setTimeout(speakNextIdeogram, settings.speed * 1000);
        }
      }

      speakNextIdeogram();
    },
    [settings, restart]
  );

  return {
    status,
    isRunning: status === "running",
    currentIdeogram,
    ideogramRef,
    minutes,
    seconds,
    start,
    stop,
  };
}
