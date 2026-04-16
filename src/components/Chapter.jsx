import { useState, useEffect } from "react";
import { LECTURES } from "../data/lectures";
import { Ic } from "./Icons";
import LectureItem from "./LectureItem";

export default function Chapter({ chapter, chapterIdx, activeLcId, onSelect, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (activeLcId) {
      const [ci] = activeLcId.split('_');
      if (parseInt(ci) === chapterIdx) setOpen(true);
    }
  }, [activeLcId, chapterIdx]);

  const lectures = LECTURES.filter(l => l.chapterIdx === chapterIdx);
  const totalDur = lectures.reduce((acc, l) => {
    const parts = l.duration.split(':').map(Number);
    return acc + (parts.length === 3 ? parts[0] * 3600 + parts[1] * 60 + parts[2] : parts[0] * 60 + parts[1]);
  }, 0);
  const totalH = Math.floor(totalDur / 3600);
  const totalM = Math.floor((totalDur % 3600) / 60);

  return (
    <div className="chapter">
      <div className={`ch-head${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
        <div className="ch-icon">{chapterIdx + 1}</div>
        <div className="ch-info">
          <div className="ch-name">{chapter.name}</div>
          <div className="ch-count">{lectures.length} محاضرة · {totalH > 0 ? `${totalH}س ` : ''}{totalM}د</div>
        </div>
        <span className={`ch-arrow${open ? ' open' : ''}`}>{Ic.chevronD}</span>
      </div>
      {open && (
        <div className="ch-lectures" style={{ padding: '2px 4px 6px' }}>
          {lectures.map(lc => (
            <LectureItem key={lc.id} lc={lc} isActive={lc.id === activeLcId} onClick={() => onSelect(lc)} />
          ))}
        </div>
      )}
    </div>
  );
}
