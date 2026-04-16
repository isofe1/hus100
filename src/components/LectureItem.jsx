import { useRef, useEffect } from "react";

export default function LectureItem({ lc, isActive, onClick }) {
  const ref = useRef(null);
  
  useEffect(() => { 
    if (isActive && ref.current) ref.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); 
  }, [isActive]);
  
  return (
    <div ref={ref} className={`lc-item${isActive ? ' act' : ''}`} onClick={onClick}>
      <div className={`lc-dot${isActive ? ' act' : ''}`} />
      <span className="lc-title">{lc.title}</span>
      <span className="lc-dur">{lc.duration}</span>
    </div>
  );
}
