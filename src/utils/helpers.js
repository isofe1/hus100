export const isHLS = (url) => url.includes('.m3u8');

export const fmt = (s) => {
  if (!s || isNaN(s)) return '0:00';
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sc = Math.floor(s % 60);
  return h > 0 
    ? `${h}:${String(m).padStart(2,'0')}:${String(sc).padStart(2,'0')}` 
    : `${m}:${String(sc).padStart(2,'0')}`;
};

// ─── HLS.JS LOADER ───
let _hlsState = 'idle';
let _hlsCbs = [];

export const loadHls = (cb) => {
  if (_hlsState === 'loaded') { cb(window.Hls); return; }
  _hlsCbs.push(cb);
  if (_hlsState === 'idle') {
    _hlsState = 'loading';
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.4.14/hls.min.js';
    s.onload = () => { _hlsState = 'loaded'; _hlsCbs.forEach(f => f(window.Hls)); _hlsCbs = []; };
    s.onerror = () => { _hlsState = 'idle'; };
    document.head.appendChild(s);
  }
};
