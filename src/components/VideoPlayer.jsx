import { useState, useEffect, useRef, useCallback } from "react";
import { isHLS, loadHls, fmt } from "../utils/helpers";
import { Ic } from "./Icons";

export default function VideoPlayer({ lecture, onNext, onPrev, hasNext, hasPrev }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const hlsRef = useRef(null);
  const hideTimer = useRef(null);
  const progressRef = useRef(null);
  const isDragging = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);
  const [buf, setBuf] = useState(0);
  const [vol, setVol] = useState(1);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [ctrl, setCtrl] = useState(true);
  const [speedMenu, setSpeedMenu] = useState(false);
  const [isFS, setIsFS] = useState(false);
  const [tipVisible, setTipVisible] = useState(false);
  const [tipX, setTipX] = useState(0);
  const [tipTime, setTipTime] = useState('');
  const [flashIcon, setFlashIcon] = useState(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !lecture) return;
    setPlaying(false); setCur(0); setDur(0); setBuf(0);

    const destroyHls = () => { if (hlsRef.current) { hlsRef.current.destroy(); hlsRef.current = null; } };

    if (isHLS(lecture.url)) {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        destroyHls(); video.src = lecture.url;
      } else {
        loadHls((Hls) => {
          if (!Hls || !Hls.isSupported()) return;
          destroyHls();
          const hls = new Hls({ maxBufferLength: 15, maxMaxBufferLength: 30, startLevel: -1 });
          hls.loadSource(lecture.url);
          hls.attachMedia(video);
          hlsRef.current = hls;
        });
      }
    } else {
      destroyHls(); video.src = lecture.url;
    }
    video.playbackRate = speed;
    return destroyHls;
  }, [lecture?.id, speed]);

  useEffect(() => {
    const v = videoRef.current; if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTimeUpdate = () => { setCur(v.currentTime); if (v.buffered.length) setBuf(v.buffered.end(v.buffered.length - 1)); };
    const onDurationChange = () => setDur(v.duration);
    const onEnded = () => { setPlaying(false); if (hasNext) setTimeout(onNext, 800); };
    v.addEventListener('play', onPlay); v.addEventListener('pause', onPause);
    v.addEventListener('timeupdate', onTimeUpdate); v.addEventListener('durationchange', onDurationChange);
    v.addEventListener('ended', onEnded);
    return () => { v.removeEventListener('play', onPlay); v.removeEventListener('pause', onPause); v.removeEventListener('timeupdate', onTimeUpdate); v.removeEventListener('durationchange', onDurationChange); v.removeEventListener('ended', onEnded); };
  }, [hasNext, onNext]);

  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const v = videoRef.current; if (!v) return;
      switch (e.code) {
        case 'Space': e.preventDefault(); togglePlay(); break;
        case 'ArrowRight': e.preventDefault(); v.currentTime = Math.min(v.currentTime + 10, v.duration); showFlash('forward'); break;
        case 'ArrowLeft': e.preventDefault(); v.currentTime = Math.max(v.currentTime - 10, 0); showFlash('back'); break;
        case 'ArrowUp': e.preventDefault(); { const nv = Math.min(v.volume + 0.1, 1); v.volume = nv; setVol(nv); } break;
        case 'ArrowDown': e.preventDefault(); { const nv = Math.max(v.volume - 0.1, 0); v.volume = nv; setVol(nv); } break;
        case 'KeyF': toggleFS(); break;
        case 'KeyM': setMuted(m => { v.muted = !m; return !m; }); break;
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onFS = () => setIsFS(!!document.fullscreenElement || !!document.webkitFullscreenElement);
    document.addEventListener('fullscreenchange', onFS);
    document.addEventListener('webkitfullscreenchange', onFS);
    return () => { document.removeEventListener('fullscreenchange', onFS); document.removeEventListener('webkitfullscreenchange', onFS); };
  }, []);

  const showControls = useCallback(() => {
    setCtrl(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setCtrl(false), 3000);
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current; if (!v) return;
    if (v.paused) { v.play().catch(() => {}); } else { v.pause(); }
  }, []);

  const toggleFS = useCallback(() => {
    const el = containerRef.current; if (!el) return;
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (videoRef.current?.webkitEnterFullscreen) videoRef.current.webkitEnterFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }
  }, []);

  const showFlash = (type) => {
    setFlashIcon(type); setTimeout(() => setFlashIcon(null), 400);
  };

  const seekTo = (clientX) => {
    const v = videoRef.current; const bar = progressRef.current;
    if (!v || !bar || !v.duration) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    v.currentTime = pct * v.duration;
  };

  const onProgressMouseMove = (e) => {
    const bar = progressRef.current; if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setTipX(pct * 100); setTipTime(fmt(pct * dur)); setTipVisible(true);
    if (isDragging.current) seekTo(e.clientX);
  };

  const onProgressMouseDown = (e) => {
    isDragging.current = true; seekTo(e.clientX);
    const onUp = () => { isDragging.current = false; window.removeEventListener('mouseup', onUp); window.removeEventListener('mousemove', onDrag); };
    const onDrag = (e2) => seekTo(e2.clientX);
    window.addEventListener('mouseup', onUp); window.addEventListener('mousemove', onDrag);
  };

  const onProgressTouch = (e) => {
    e.preventDefault();
    const touch = e.touches[0]; if (!touch) return;
    seekTo(touch.clientX);
  };

  const setVolume = (v) => {
    const vid = videoRef.current; if (!vid) return;
    vid.volume = v; setVol(v);
    if (v > 0 && muted) { vid.muted = false; setMuted(false); }
  };

  const toggleMute = () => {
    const v = videoRef.current; if (!v) return;
    v.muted = !muted; setMuted(!muted);
  };

  const setPlaybackSpeed = (s) => {
    const v = videoRef.current; if (v) v.playbackRate = s;
    setSpeed(s); setSpeedMenu(false);
  };

  const progress = dur > 0 ? (cur / dur) * 100 : 0;
  const buffered = dur > 0 ? (buf / dur) * 100 : 0;
  const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  return (
    <div
      ref={containerRef}
      className="vp-wrap"
      onMouseMove={showControls}
      onMouseEnter={showControls}
      onTouchStart={showControls}
      onClick={(e) => { if (e.target === videoRef.current || e.target === containerRef.current) { togglePlay(); showFlash(playing ? 'pause' : 'play'); } }}
    >
      <video ref={videoRef} preload="metadata" playsInline />

      <div className={`vp-overlay${flashIcon ? ' flash' : ''}`}>
        {flashIcon === 'play' && Ic.playLg}
        {flashIcon === 'pause' && Ic.pauseLg}
        {flashIcon === 'forward' && <svg width="38" height="38" viewBox="0 0 24 24" fill="white"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/><text x="5" y="27" fill="white" fontSize="5" fontFamily="Cairo">+10</text></svg>}
        {flashIcon === 'back' && <svg width="38" height="38" viewBox="0 0 24 24" fill="white"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>}
      </div>

      <div className={`vp-controls${ctrl ? '' : ' hidden'}`} onClick={(e) => e.stopPropagation()}>
        <div
          ref={progressRef}
          className={`vp-progress${isDragging.current ? ' dragging' : ''}`}
          onMouseMove={onProgressMouseMove}
          onMouseLeave={() => setTipVisible(false)}
          onMouseDown={onProgressMouseDown}
          onTouchMove={onProgressTouch}
          onTouchStart={onProgressTouch}
        >
          <div className="vp-buf" style={{ width: `${buffered}%` }} />
          <div className="vp-fill" style={{ width: `${progress}%` }} />
          <div className="vp-thumb" style={{ left: `${progress}%` }} />
          {tipVisible && <div className="vp-tip" style={{ left: `${tipX}%` }}>{tipTime}</div>}
        </div>

        <div className="vp-row">
          <button className="vp-btn" onClick={togglePlay} title={playing ? 'إيقاف (Space)' : 'تشغيل (Space)'}>
            {playing ? Ic.pause : Ic.play}
          </button>
          <button className="vp-btn" onClick={() => { videoRef.current && (videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0)); }} title="ترجع 10 ثوان (←)">
            {Ic.back}
          </button>
          <button className="vp-btn" onClick={() => { videoRef.current && (videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, videoRef.current.duration)); }} title="تقدم 10 ثوان (→)">
            {Ic.forward}
          </button>

          <div className="vol-wrap">
            <button className="vp-btn" onClick={toggleMute}>{muted || vol === 0 ? Ic.volOff : Ic.volOn}</button>
            <input className="vol-slider" type="range" min="0" max="1" step="0.05" value={muted ? 0 : vol} onChange={e => setVolume(+e.target.value)} />
          </div>

          <span className="vp-time">{fmt(cur)} / {fmt(dur)}</span>
          <div className="vp-spacer" />

          <div className="vp-speed">
            {speedMenu && (
              <div className="vp-speed-menu">
                {SPEEDS.map(s => (
                  <div key={s} className={`vp-speed-item${speed === s ? ' act' : ''}`} onClick={() => setPlaybackSpeed(s)}>{s}x</div>
                ))}
              </div>
            )}
            <button className="vp-btn" style={{ fontSize: 11, fontFamily: "'Cairo', sans-serif", padding: '4px 7px', letterSpacing: '.03em' }}
              onClick={() => setSpeedMenu(m => !m)} onBlur={() => setTimeout(() => setSpeedMenu(false), 150)}>
              {speed}x
            </button>
          </div>

          <button className="vp-btn" onClick={toggleFS} title="ملء الشاشة (F)">{isFS ? Ic.fsExit : Ic.fs}</button>
        </div>
      </div>
    </div>
  );
}
