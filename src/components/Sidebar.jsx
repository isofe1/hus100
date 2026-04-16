import { RAW, LECTURES } from "../data/lectures";
import Chapter from "./Chapter";

export default function Sidebar({ activeLcId, onSelect }) {
  const totalLectures = LECTURES.length;
  
  return (
    <div className="sidebar">
      <div className="sb-header">
        <div className="sb-title">منصة الهاشمي</div>
        <div className="sb-sub">{RAW.classes.length} فصول · {totalLectures} محاضرة</div>
      </div>
      <div className="sb-body">
        {RAW.classes.map((ch, ci) => (
          <Chapter 
            key={ci} 
            chapter={ch} 
            chapterIdx={ci} 
            activeLcId={activeLcId} 
            onSelect={onSelect} 
            defaultOpen={ci === 0} 
          />
        ))}
      </div>
    </div>
  );
}
