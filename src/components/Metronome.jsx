import { useCallback, useEffect, useRef, useState } from 'react';

const MIN_BPM = 40;
const MAX_BPM = 240;
const DEFAULT_VOLUME = 70;
const BEATS_PER_MEASURE = 4;

function clampBpm(value) {
  return Math.min(MAX_BPM, Math.max(MIN_BPM, Math.round(value)));
}

function scheduleOscillator(context, time, options) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = options.type || 'sine';
  oscillator.frequency.setValueAtTime(options.frequency, time);
  if (options.endFrequency) {
    oscillator.frequency.exponentialRampToValueAtTime(options.endFrequency, time + options.duration);
  }
  gain.gain.setValueAtTime(options.gain, time);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + options.duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(time);
  oscillator.stop(time + options.duration + 0.01);
}

function scheduleTone(context, time, isAccent, volume) {
  const volumeScale = volume / 100;
  if (volumeScale <= 0) return;

  if (isAccent) {
    scheduleOscillator(context, time, {
      type: 'triangle', frequency: 1550, endFrequency: 1080, gain: 0.13 * volumeScale, duration: 0.085,
    });
    scheduleOscillator(context, time, {
      type: 'sine', frequency: 780, endFrequency: 620, gain: 0.04 * volumeScale, duration: 0.075,
    });
    return;
  }

  scheduleOscillator(context, time, {
    type: 'triangle', frequency: 1200, endFrequency: 920, gain: 0.09 * volumeScale, duration: 0.075,
  });
}

export default function Metronome({
  songId,
  songBpm,
  activeId,
  onActivate,
  onDeactivate,
}) {
  const initialBpm = songBpm > 0 ? songBpm : 120;
  const [bpm, setBpm] = useState(initialBpm);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [pulse, setPulse] = useState(false);
  const [accentPulse, setAccentPulse] = useState(false);
  const [beatPosition, setBeatPosition] = useState(1);
  const [error, setError] = useState('');
  const audioContextRef = useRef(null);
  const schedulerRef = useRef(null);
  const pulseTimersRef = useRef(new Set());
  const nextBeatTimeRef = useRef(0);
  const bpmRef = useRef(bpm);
  const volumeRef = useRef(volume);
  const beatIndexRef = useRef(0);
  const isActive = activeId === songId;

  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  const stopAudio = useCallback(() => {
    if (schedulerRef.current) {
      window.clearInterval(schedulerRef.current);
      schedulerRef.current = null;
    }
    pulseTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    pulseTimersRef.current.clear();
    setPulse(false);
    setAccentPulse(false);
    setBeatPosition(1);

    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isActive) stopAudio();
  }, [isActive, stopAudio]);

  useEffect(() => stopAudio, [stopAudio]);

  function schedulePulse(delay, beatNumber, isAccent) {
    const startTimer = window.setTimeout(() => {
      pulseTimersRef.current.delete(startTimer);
      setBeatPosition(beatNumber);
      setAccentPulse(isAccent);
      setPulse(true);
      const endTimer = window.setTimeout(() => {
        pulseTimersRef.current.delete(endTimer);
        setPulse(false);
        setAccentPulse(false);
      }, 70);
      pulseTimersRef.current.add(endTimer);
    }, delay);
    pulseTimersRef.current.add(startTimer);
  }

  function scheduleBeats() {
    const context = audioContextRef.current;
    if (!context) return;

    while (nextBeatTimeRef.current < context.currentTime + 0.1) {
      const beatTime = nextBeatTimeRef.current;
      const beatNumber = beatIndexRef.current + 1;
      const isAccent = beatNumber === 1;
      scheduleTone(context, beatTime, isAccent, volumeRef.current);

      schedulePulse(Math.max(0, (beatTime - context.currentTime) * 1000), beatNumber, isAccent);
      beatIndexRef.current = (beatIndexRef.current + 1) % BEATS_PER_MEASURE;
      nextBeatTimeRef.current += 60 / bpmRef.current;
    }
  }

  async function start() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      setError('這個瀏覽器不支援節拍器音訊。');
      return;
    }

    stopAudio();
    setError('');

    try {
      const context = new AudioContextClass();
      audioContextRef.current = context;

      // iOS Safari 有時光呼叫 resume() 無法真正解鎖音訊輸出,
      // 需要在使用者手勢當下同步播放一個實際的（哪怕無聲的）音訊節點才可靠。
      const unlockBuffer = context.createBuffer(1, 1, 22050);
      const unlockSource = context.createBufferSource();
      unlockSource.buffer = unlockBuffer;
      unlockSource.connect(context.destination);
      unlockSource.start(0);

      if (context.state === 'suspended') await context.resume();
      nextBeatTimeRef.current = context.currentTime + 0.05;
      beatIndexRef.current = 0;
      onActivate(songId);
      scheduleBeats();
      schedulerRef.current = window.setInterval(scheduleBeats, 25);
    } catch {
      stopAudio();
      setError('無法啟動節拍器，請再試一次。');
      onDeactivate(songId);
    }
  }

  function stop() {
    stopAudio();
    onDeactivate(songId);
  }

  function updateBpm(value) {
    if (!Number.isFinite(value)) return;
    setBpm(clampBpm(value));
  }

  function resetSettings() {
    setBpm(initialBpm);
    setVolume(DEFAULT_VOLUME);
  }

  return (
    <section className="detail-section metronome" aria-labelledby={`metronome-${songId}`}>
      <div className="detail-heading-row">
        <h3 id={`metronome-${songId}`}>節拍器</h3>
        <div className="beat-display" aria-hidden="true">
          <span>{beatPosition} / {BEATS_PER_MEASURE}</span>
          <span className={`beat-indicator${pulse ? ' is-pulsing' : ''}${accentPulse ? ' is-accent' : ''}`} />
        </div>
      </div>

      <div className="metronome-controls">
        <button
          type="button"
          className="metronome-toggle"
          onClick={isActive ? stop : start}
          aria-pressed={isActive}
        >
          {isActive ? '停止' : '開始'}
        </button>

        <label className="bpm-number" htmlFor={`bpm-number-${songId}`}>
          <span>BPM</span>
          <input
            id={`bpm-number-${songId}`}
            type="number"
            min={MIN_BPM}
            max={MAX_BPM}
            value={bpm}
            onChange={(event) => updateBpm(Number(event.target.value))}
          />
        </label>

        <label className="bpm-slider" htmlFor={`bpm-slider-${songId}`}>
          <span className="sr-only">調整節拍器速度</span>
          <input
            id={`bpm-slider-${songId}`}
            type="range"
            min={MIN_BPM}
            max={MAX_BPM}
            value={bpm}
            onChange={(event) => updateBpm(Number(event.target.value))}
          />
        </label>

        <button type="button" className="metronome-reset" onClick={resetSettings}>
          重設
        </button>
      </div>

      <label className="volume-control" htmlFor={`volume-${songId}`}>
        <span>音量</span>
        <input
          id={`volume-${songId}`}
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
        />
        <output htmlFor={`volume-${songId}`}>{volume}%</output>
      </label>

      <p className="metronome-status" aria-live="polite">
        {isActive ? `播放中 · 4/4 拍 · 每分鐘 ${bpm} 拍` : `目前設定 · 4/4 拍 · 每分鐘 ${bpm} 拍`}
      </p>
      {error && <p className="metronome-error" role="alert">{error}</p>}
    </section>
  );
}
