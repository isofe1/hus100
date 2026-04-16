import { useState, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import VideoPlayer from "./components/VideoPlayer";
import { LECTURES } from "./data/lectures";
import { Ic } from "./components/Icons";
import "./styles/globals.css";

export default function App() {
  const [activeLc, setActiveLc] = useState(LECTURES[0]);

  const selectLecture = useCallback((lc) => setActiveLc(lc), []);

  const onNext = useCallback(() => {
    if (activeLc.globalIdx < LECTURES.length - 1) setActiveLc(LECTURES[activeLc.globalIdx + 1]);
  }, [activeLc]);

  const onPrev = useCallback(() => {
    if (activeLc.globalIdx > 0) setActiveLc(LECTURES[activeLc.globalIdx - 1]);
  }, [activeLc]);

  const hasPrev = activeLc.globalIdx > 0;
  const hasNext = activeLc.globalIdx < LECTURES.length - 1;
  const nextLc = hasNext ? LECTURES[activeLc.globalIdx + 1] : null;
  const prevLc = hasPrev ? LECTURES[activeLc.globalIdx - 1] : null;

  return (
    <div className="app">
      <Sidebar activeLcId={activeLc?.id} onSelect={selectLecture} />
      
      <div className="main">
        <VideoPlayer 
          lecture={activeLc} 
          onNext={onNext} 
          onPrev={onPrev} 
          hasNext={hasNext} 
          hasPrev={hasPrev} 
        />
        
        <div className="info">
          <div className="info-ch">{activeLc.chapterName}</div>
          <div className="info-title">{activeLc.title}</div>
          <div className="info-meta">
            <span style={{ marginLeft: 10 }}>⏱ {activeLc.duration}</span>
          </div>
        </div>
        
        <div className="nav-row">
          <button className="nav-btn" onClick={onPrev} disabled={!hasPrev}>
            {Ic.prev}
            <span>{prevLc ? prevLc.title : 'السابقة'}</span>
          </button>
          <button className="nav-btn primary" onClick={onNext} disabled={!hasNext}>
            <span>{nextLc ? nextLc.title : 'التالية'}</span>
            {Ic.next}
          </button>
        </div>
      </div>
    </div>
  );
}
