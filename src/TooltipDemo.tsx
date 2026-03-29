import React, { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Tooltip from './Tooltip';
import MobileTooltip from './MobileTooltip';
import type { TooltipPlacement, DataRow } from './Tooltip';

// ─── Dark mode context ────────────────────────────────────────────────────

const DarkCtx = React.createContext(false);

// ─── Anchor ────────────────────────────────────────────────────────────────

const GAP = 8;

let globalForceHide: (() => void) | null = null;

function getFixedStyle(rect: DOMRect, placement: TooltipPlacement): React.CSSProperties {
  switch (placement) {
    case 'Up':    return { position:'fixed', bottom: window.innerHeight - rect.top + GAP, left: rect.left + rect.width/2, transform:'translateX(-50%)' };
    case 'Down':  return { position:'fixed', top: rect.bottom + GAP, left: rect.left + rect.width/2, transform:'translateX(-50%)' };
    case 'Left':  return { position:'fixed', right: window.innerWidth - rect.left + GAP, top: rect.top + rect.height/2, transform:'translateY(-50%)' };
    case 'Right': return { position:'fixed', left: rect.right + GAP, top: rect.top + rect.height/2, transform:'translateY(-50%)' };
  }
}

function Anchor({ children, tip, placement, className = 'inline-flex' }: {
  children: React.ReactNode; tip: React.ReactNode;
  placement: TooltipPlacement; className?: string;
}) {
  const isDark = React.useContext(DarkCtx);
  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const forceHide = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setRect(null);
  }, []);
  const show = useCallback(() => {
    if (globalForceHide && globalForceHide !== forceHide) globalForceHide();
    globalForceHide = forceHide;
    if (timer.current) clearTimeout(timer.current);
    if (ref.current) setRect(ref.current.getBoundingClientRect());
  }, [forceHide]);
  const hide = useCallback(() => {
    timer.current = setTimeout(() => {
      setRect(null);
      if (globalForceHide === forceHide) globalForceHide = null;
    }, 120);
  }, [forceHide]);
  const cancelHide = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return (
    <div ref={ref} onMouseEnter={show} onMouseLeave={hide} className={className}>
      {children}
      {rect && createPortal(
        <div style={{ ...getFixedStyle(rect, placement), zIndex: 9999 }}
          className={isDark ? 'dark' : ''}
          onMouseEnter={cancelHide} onMouseLeave={hide}>
          {tip}
        </div>,
        document.body
      )}
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────

function IcoGear()     { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.7 3.7l1.4 1.4M12.9 12.9l1.4 1.4M14.3 3.7l-1.4 1.4M5.1 12.9l-1.4 1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>; }
function IcoBell()     { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2a5 5 0 0 1 5 5v3l1.5 2.5H2.5L4 10V7a5 5 0 0 1 5-5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M7 13.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.4"/></svg>; }
function IcoDownload() { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3v9M5.5 8.5L9 12l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>; }
function IcoShare()    { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="14" cy="4" r="1.8" stroke="currentColor" strokeWidth="1.4"/><circle cx="4"  cy="9" r="1.8" stroke="currentColor" strokeWidth="1.4"/><circle cx="14" cy="14" r="1.8" stroke="currentColor" strokeWidth="1.4"/><path d="M5.7 8.1L12.3 5M5.7 9.9l6.6 3.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>; }
function IcoFile()     { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M10 2H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6l-4-4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M10 2v4h4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M7 10h4M7 13h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>; }
function IcoInfo()     { return <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/><path d="M8 7v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="5" r="0.7" fill="currentColor"/></svg>; }
function IcoSun()      { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2.8" stroke="currentColor" strokeWidth="1.4"/><path d="M8 1.5v1.8M8 12.7v1.8M1.5 8h1.8M12.7 8h1.8M3.4 3.4l1.27 1.27M11.33 11.33l1.27 1.27M11.33 4.67l-1.27 1.27M4.67 11.33l-1.27 1.27" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>; }
function IcoMoon()     { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.5 9.8A5.8 5.8 0 0 1 6.2 2.5a5.8 5.8 0 1 0 7.3 7.3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>; }

// ─── Chart constants & data ────────────────────────────────────────────────

const VW = 1000, VH = 260, PL = 42, PR = 16, PT = 90, PB = 30;
const N = 28;

const DOWNLOAD = [0.12,0.08,0.15,0.22,0.18,0.28,0.52,0.35,0.42,0.61,0.88,0.55,0.75,2.50,22.4,18.1,5.50,3.10,6.80,2.00,1.20,0.80,1.50,0.90,0.60,0.40,0.70,0.50];
const UPLOAD   = [0.04,0.03,0.05,0.07,0.06,0.09,0.17,0.11,0.14,0.20,0.29,0.18,0.24,0.82,7.10,5.80,1.75,0.98,2.15,0.64,0.38,0.25,0.48,0.29,0.19,0.13,0.22,0.16];
const LATENCY  = [1,1,2,1,1,2,3,2,2,3,4,3,3,8,45,38,12,6,14,5,3,2,4,2,2,1,2,1];
const LOSS     = [0,0,0,0,0,0,0,0,0,0,0.1,0,0,0.2,2.1,1.8,0.5,0.1,0.8,0,0,0,0,0,0,0,0,0];

function normPts(data: number[]) {
  const max = Math.max(...data) * 1.12 || 0.001;
  return data.map((v, i) => ({ x: PL + (i/(N-1))*(VW-PL-PR), y: PT + (1-v/max)*(VH-PT-PB) }));
}
function makePath(pts: {x:number;y:number}[]) {
  return pts.reduce((acc,p,i) => {
    if (i===0) return `M${p.x},${p.y}`;
    const px=pts[i-1]; const cx=(px.x+p.x)/2;
    return acc+` C${cx},${px.y} ${cx},${p.y} ${p.x},${p.y}`;
  }, '');
}

const DL_PTS=normPts(DOWNLOAD), UL_PTS=normPts(UPLOAD), LAT_PTS=normPts(LATENCY), LOSS_PTS=normPts(LOSS);
const DL_PATH=makePath(DL_PTS), UL_PATH=makePath(UL_PTS), LAT_PATH=makePath(LAT_PTS), LOSS_PATH=makePath(LOSS_PTS);
const DL_AREA=`${DL_PATH} L${DL_PTS[N-1].x},${VH-PB} L${DL_PTS[0].x},${VH-PB} Z`;

function fmtBps(v:number){return v>=1?`${v.toFixed(2)} Mbps`:`${(v*1024).toFixed(0)} Kbps`;}
function fmtTimeLabel(i:number){const h=[0,6,12,18][i%4];const ampm=h<12?'AM':'PM';const hh=h===0?12:h>12?h-12:h;return `Mar ${18+Math.floor(i/4)}, ${hh}:00 ${ampm}`;}
function makeRows(i:number): DataRow[]{return[
  {label:'Download',   value:fmtBps(DOWNLOAD[i]),              color:'download',trend:'down'},
  {label:'Upload',     value:fmtBps(UPLOAD[i]),                color:'upload',  trend:'up'  },
  {label:'Latency',    value:`${LATENCY[i]} ms`,               color:'latency', trend:null  },
  {label:'Packet Loss',value:`${LOSS[i].toFixed(1)} %`,        color:'loss',    trend:null  },
];}

// ─── Mobile scene (iPhone 15) ─────────────────────────────────────────────

function MobileScene({ isDark }: { isDark: boolean }) {
  const [open, setOpen] = useState(false);

  const mBg      = isDark ? '#111827' : '#f4f5f7';
  const mNavBg   = isDark ? '#1e2638' : '#1a1a2e';
  const mCard    = isDark ? '#1a2333' : '#fff';
  const mBorder  = isDark ? 'rgba(255,255,255,0.08)' : '#e3e6ec';
  const mDivider = isDark ? 'rgba(255,255,255,0.06)' : '#f0f2f6';
  const mText    = isDark ? '#e5e7eb' : '#1a1a2e';
  const mSubtext = isDark ? '#9ca3af' : '#6e7891';
  const mMuted   = isDark ? '#6b7280' : '#9ca3af';
  const mBadgeBg = isDark ? 'rgba(255,255,255,0.08)' : '#f3f4f6';
  const mBadgeFg = isDark ? '#9ca3af' : '#6b7280';

  // iPhone 15: 393 × 852 pt — scaled to 300px wide → height = 651px
  const PW    = 320;
  const PH    = 693;
  const FRAME = 16;   // thick bezel matching the image
  const R_IN  = 46;   // screen inner radius
  const R_OUT = 58;   // outer frame radius (visually matches image)

  const FC = '#0d0d0d'; // near-black frame color

  // Side button: protrudes from the frame with rounded caps
  const sideBtn = (side: 'left' | 'right', top: number, height: number): React.CSSProperties => ({
    position: 'absolute',
    [side]: -5,
    top,
    width: 5,
    height,
    background: '#1a1a1a',
    borderRadius: side === 'left' ? '3px 0 0 3px' : '0 3px 3px 0',
  });

  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'48px 0', background: isDark?'#1a1a1a':'#e8e8ed' }}>
      <div style={{ position:'relative', width: PW + FRAME*2, height: PH + FRAME*2 }}>

        {/* Frame shell */}
        <div style={{
          position:'absolute', inset:0,
          background: FC,
          borderRadius: R_OUT,
          boxShadow:'0 20px 60px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.3)',
        }} />

        {/* Volume up */}
        <div style={sideBtn('left', 168, 52)} />
        {/* Volume down */}
        <div style={sideBtn('left', 232, 52)} />
        {/* Power / side button */}
        <div style={sideBtn('right', 178, 76)} />

        {/* Screen */}
        <div style={{
          position:'absolute',
          top: FRAME, left: FRAME, right: FRAME, bottom: FRAME,
          borderRadius: R_IN,
          overflow:'hidden',
          display:'flex', flexDirection:'column',
          background:'#000',
          boxShadow:'inset 0 0 0 1px rgba(255,255,255,0.06)',
        }}>

          {/* Status bar + Dynamic Island */}
          <div style={{ flexShrink:0, height:54, position:'relative', background:mNavBg, display:'flex', alignItems:'flex-end', paddingBottom:8 }}>
            {/* Time */}
            <span style={{ color:'white', fontSize:14, fontWeight:600, paddingLeft:22, flex:1 }}>9:41</span>
            {/* Dynamic Island — pill cutout */}
            <div style={{ position:'absolute', top:12, left:'50%', transform:'translateX(-50%)', width:104, height:30, background:'#000', borderRadius:18 }} />
            {/* Status icons */}
            <div style={{ display:'flex', gap:6, alignItems:'center', paddingRight:24 }}>
              {/* Signal */}
              <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
                <rect x="0"    y="7"   width="3" height="5"  rx="0.8"/>
                <rect x="4.5"  y="4.5" width="3" height="7.5" rx="0.8"/>
                <rect x="9"    y="2"   width="3" height="10" rx="0.8"/>
                <rect x="13.5" y="0"   width="3" height="12" rx="0.8" opacity="0.35"/>
              </svg>
              {/* WiFi */}
              <svg width="16" height="12" viewBox="0 0 20 14" fill="none">
                <path d="M10 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" fill="white"/>
                <path d="M5.5 7C7 5.2 8.4 4.4 10 4.4s3 .8 4.5 2.6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M1.5 3.5C4 .8 6.8-.2 10-.2s6 1 8.5 3.7" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              {/* Battery */}
              <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
                <rect x="0.5" y="0.5" width="22" height="12" rx="3" stroke="white" strokeOpacity="0.35"/>
                <rect x="1.5" y="1.5" width="18" height="9"  rx="2" fill="white"/>
                <path d="M23.5 4.5C24.8 4.8 25.5 5.5 25.5 6.5S24.8 8.2 23.5 8.5V4.5Z" fill="white" fillOpacity="0.4"/>
              </svg>
            </div>
          </div>

          {/* App nav bar */}
          <div style={{ flexShrink:0, display:'flex', alignItems:'center', gap:12, padding:'12px 20px', background:mNavBg, borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ width:28, height:28, borderRadius:8, background:'#006fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1.5L2.5 4.5v5C2.5 12.5 5 15 8 15.5c3-.5 5.5-3 5.5-6v-5L8 1.5Z" fill="white"/></svg>
            </div>
            <span style={{ color:'white', fontSize:14, fontWeight:600, flex:1 }}>UniFi Network</span>
          </div>

          {/* Scrollable content */}
          <div style={{ flex:1, overflowY:'auto', background:mBg }}>
            <div style={{ padding:'20px 16px' }}>
              <p style={{ fontSize:16, fontWeight:600, marginBottom:16, color:mText }}>Add Spotlight</p>
              <div style={{ borderRadius:16, overflow:'hidden', marginBottom:12, background:mCard, border:`1px solid ${mBorder}` }}>
                {[{l:'Name',v:'New Spotlight'},{l:'Object',v:'Activity'}].map((r,i,a)=>(
                  <div key={r.l} style={{ display:'flex', justifyContent:'space-between', padding:'12px 16px', borderBottom:i<a.length-1?`1px solid ${mDivider}`:'none' }}>
                    <span style={{ fontSize:14, color:mSubtext }}>{r.l}</span>
                    <span style={{ fontSize:14, fontWeight:500, color:mText }}>{r.v}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderRadius:16, marginBottom:16, background:mCard, border:`1px solid ${mBorder}` }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 16px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                    <span style={{ fontSize:14, color:mSubtext }}>Face Recognition</span>
                    <button onClick={()=>setOpen(true)}
                      style={{ color:'#006fff', display:'flex', alignItems:'center', background:'none', border:'none', cursor:'pointer', WebkitTapHighlightColor:'transparent' }}
                      aria-label="More info">
                      <IcoInfo />
                    </button>
                  </div>
                  <span style={{ fontSize:14, padding:'2px 8px', borderRadius:20, background:mBadgeBg, color:mBadgeFg }}>Disabled</span>
                </div>
              </div>
              <p style={{ fontSize:14, textAlign:'center', color:mMuted }}>Tap ⓘ to trigger the tooltip</p>
            </div>
          </div>

          {/* Home indicator */}
          <div style={{ flexShrink:0, height:34, display:'flex', alignItems:'center', justifyContent:'center', background:mBg }}>
            <div style={{ width:134, height:5, borderRadius:3, background:isDark?'rgba(255,255,255,0.28)':'rgba(0,0,0,0.18)' }} />
          </div>

          {/* Bottom sheet */}
          {open && (
            <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.45)', display:'flex', flexDirection:'column', justifyContent:'flex-end' }}
              onClick={()=>setOpen(false)}>
              <div onClick={e=>e.stopPropagation()} className="dark">
                <MobileTooltip hasTitle hasAction
                  title="Face Recognition"
                  textLong="Enable Face Recognition in settings to use Spotlight for Known Faces. This feature requires a compatible camera and an active Protect subscription."
                  onAction={()=>setOpen(false)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────

function Section({ title, desc, isDark, children }: {
  title: string; desc: string; isDark: boolean; children: React.ReactNode;
}) {
  const bg  = isDark ? '#1e2638' : '#ffffff';
  const bdr = isDark ? 'rgba(255,255,255,0.08)' : '#e5e7eb';
  const clTitle = isDark ? '#f3f4f6' : '#111827';
  const clDesc  = isDark ? '#9ca3af' : '#6b7280';
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: bg, border: `1px solid ${bdr}` }}>
      <div className="px-8 pt-8 pb-6">
        <h2 className="text-lg font-bold mb-1" style={{ color: clTitle }}>{title}</h2>
        <p className="text-sm" style={{ color: clDesc }}>{desc}</p>
      </div>
      <div className="px-8 pb-8 flex flex-col gap-0">
        {children}
      </div>
    </div>
  );
}

function Divider({ isDark }: { isDark: boolean }) {
  return <hr className="my-6" style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#e5e7eb', borderTopWidth: 1 }} />;
}

function SubHeading({ children, isDark }: { children: React.ReactNode; isDark: boolean }) {
  return <p className="text-sm font-semibold mb-3" style={{ color: isDark ? '#d1d5db' : '#111827' }}>{children}</p>;
}

// ─── Data ────────────────────────────────────────────────────────────────

const RICH_FEATURES = [
  { id:'wpa3',   label:'WPA3 Security',   tip:'WPA3 provides stronger encryption and improved security for Wi-Fi connections, protecting your network against brute-force attacks.' },
  { id:'queue',  label:'Smart Queue',     tip:'Automatically prioritizes latency-sensitive traffic like VoIP and gaming, ensuring a consistent experience across all connected devices.' },
  { id:'threat', label:'Threat Management', tip:"Monitors traffic for known threats and blocks malicious activity in real time using UniFi's integrated intrusion detection system." },
  { id:'ipv6',   label:'IPv6 Support',   tip:'Enables native IPv6 connectivity with dual-stack operation, ensuring compatibility with modern internet infrastructure.' },
];

// ─── Main ────────────────────────────────────────────────────────────────

export default function TooltipDemo() {
  const [isDark, setIsDark] = useState(false);

  // Chart state
  const chartRef   = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [tipStyle,   setTipStyle]   = useState<React.CSSProperties | null>(null);
  const chartHideTimer              = useRef<number | null>(null);

  function cancelChartHide() { if (chartHideTimer.current) clearTimeout(chartHideTimer.current); }
  function handleChartEnter(i: number) {
    cancelChartHide();
    setHoveredIdx(i);
    if (!chartRef.current) return;
    const cr = chartRef.current.getBoundingClientRect();
    const sx = cr.left + DL_PTS[i].x * (cr.width / VW);
    const sy = cr.top  + DL_PTS[i].y;
    setTipStyle({ position:'fixed', zIndex:9999, bottom: window.innerHeight - sy + GAP, left: sx, transform:'translateX(-50%)' });
  }
  function handleChartLeave() {
    chartHideTimer.current = window.setTimeout(() => { setHoveredIdx(null); setTipStyle(null); }, 120);
  }

  // Theme
  const pageBg  = isDark ? '#111827' : '#f0f2f5';
  const btnBdr  = isDark ? 'rgba(255,255,255,0.14)' : '#e5e7eb';
  const btnText = isDark ? '#d1d5db' : '#374151';
  const uSurface = isDark ? '#1a2333' : '#fff';
  const uBorder  = isDark ? 'rgba(255,255,255,0.08)' : '#e3e6ec';
  const uText    = isDark ? '#e5e7eb' : '#111827';
  const uSubtext = isDark ? '#9ca3af' : '#374151';
  const uMuted   = isDark ? '#6b7280' : '#8b95a1';

  // Shared icon-button style
  const iconBtn: React.CSSProperties = {
    padding: '10px',
    borderRadius: '10px',
    border: `1px solid ${btnBdr}`,
    color: btnText,
    background: 'transparent',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.12s',
  };

  // Shared text-button style
  const textBtn: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: '10px',
    border: `1px solid ${btnBdr}`,
    color: btnText,
    background: 'transparent',
    cursor: 'pointer',
    fontSize: 14,
    transition: 'background 0.12s',
  };

  return (
    <DarkCtx.Provider value={isDark}>
    <div style={{ fontFamily:"'Inter', sans-serif", background: pageBg, minHeight:'100vh' }}>

      {/* ── Page header ── */}
      <div className="flex items-center justify-between px-8 py-4 max-w-[900px] mx-auto">
        <span className="text-sm font-semibold" style={{ color: isDark ? '#f3f4f6' : '#111827' }}>
          Tooltip Demo
        </span>
        <button onClick={() => setIsDark(d => !d)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{ background: isDark ? '#fbbf24' : '#111827', color: isDark ? '#111827' : '#ffffff' }}>
          {isDark ? <IcoSun /> : <IcoMoon />}
          <span>{isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
        </button>
      </div>

      {/* ── Sections ── */}
      <div className="max-w-[900px] mx-auto px-6 pb-12 flex flex-col gap-6">

        {/* ── Plain ── */}
        <Section title="Plain Tooltips" desc="Short, concise labels for icon-only buttons and controls" isDark={isDark}>

          {/* Toolbar example */}
          <div className="flex items-center gap-2">
            {[
              { Icon: IcoGear,     label: 'Settings'      },
              { Icon: IcoBell,     label: 'Notifications' },
              { Icon: IcoDownload, label: 'Export'        },
              { Icon: IcoShare,    label: 'Share'         },
              { Icon: IcoFile,     label: 'Report'        },
            ].map(({ Icon, label }) => (
              <Anchor key={label} placement="Up"
                tip={<Tooltip type="Plain" placement="Up" textShort={label} />}>
                <button style={iconBtn}><Icon /></button>
              </Anchor>
            ))}
          </div>


          <Divider isDark={isDark} />

          {/* Different positions */}
          <SubHeading isDark={isDark}>Different Positions</SubHeading>
          <div className="flex items-center gap-2">
            {([['Top','Up'],['Right','Right'],['Bottom','Down'],['Left','Left']] as [string, TooltipPlacement][]).map(([label, placement]) => (
              <Anchor key={label} placement={placement}
                tip={<Tooltip type="Plain" placement={placement} textShort={label} />}>
                <button style={textBtn}>{label}</button>
              </Anchor>
            ))}
          </div>

        </Section>

        {/* ── Rich ── */}
        <Section title="Rich Tooltips" desc="Title, body copy and optional action link — hover ⓘ for details" isDark={isDark}>

          {/* Feature list */}
          <div className="flex flex-col">
            {RICH_FEATURES.map((f, i) => (
              <div key={f.id} className="flex items-center gap-0 py-3"
                style={{ borderBottom: i < RICH_FEATURES.length - 1 ? `1px solid ${uBorder}` : 'none' }}>
                <span className="text-sm mr-1" style={{ color: uSubtext }}>{f.label}</span>
                <Anchor placement="Right"
                  tip={<Tooltip type="Rich" placement="Right" hasTitle hasAction title={f.label} textLong={f.tip} onAction={() => {}} />}>
                  <button className="flex items-center" style={{ color: '#006fff' }}>
                    <IcoInfo />
                  </button>
                </Anchor>
              </div>
            ))}
          </div>

          <Divider isDark={isDark} />

          {/* Variants */}
          <SubHeading isDark={isDark}>Variants</SubHeading>
          <div className="flex items-center gap-2 flex-wrap">
            <Anchor placement="Up"
              tip={<Tooltip type="Rich" placement="Up" hasTitle={false} hasAction={false} />}>
              <button style={textBtn}>No title, no action</button>
            </Anchor>
            <Anchor placement="Up"
              tip={<Tooltip type="Rich" placement="Up" hasTitle hasAction={false} />}>
              <button style={textBtn}>With title</button>
            </Anchor>
            <Anchor placement="Up"
              tip={<Tooltip type="Rich" placement="Up" hasTitle hasAction onAction={() => {}} />}>
              <button style={textBtn}>With action</button>
            </Anchor>
          </div>

          <Divider isDark={isDark} />

          {/* Positions */}
          <SubHeading isDark={isDark}>Different Positions</SubHeading>
          <div className="flex items-center gap-2 flex-wrap">
            {([['Top','Up'],['Right','Right'],['Bottom','Down'],['Left','Left']] as [string, TooltipPlacement][]).map(([label, placement]) => (
              <Anchor key={label} placement={placement}
                tip={<Tooltip type="Rich" placement={placement} hasTitle textLong="This is a rich tooltip — it can include a longer body paragraph to explain functionality." />}>
                <button style={textBtn}>{label}</button>
              </Anchor>
            ))}
          </div>

        </Section>

        {/* ── Data ── */}
        <Section title="Data Tooltips" desc="Structured metric rows for charts — hover the chart to trigger" isDark={isDark}>

          {/* Chart */}
          <div className="rounded-xl overflow-hidden" style={{ background: uSurface, border: `1px solid ${uBorder}` }}>
            {/* Chart header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3"
              style={{ borderBottom: `1px solid ${uBorder}` }}>
              <span className="text-sm font-semibold" style={{ color: uText }}>Internet Activity — Dream Router 7</span>
              <div className="flex items-center gap-4">
                {[{l:'Download',c:'#4acfdc'},{l:'Upload',c:'#d9adff'},{l:'Latency',c:'#dbc65d'},{l:'Loss',c:'#e03030'}].map(m=>(
                  <div key={m.l} className="flex items-center gap-1 text-[11px]" style={{ color: uMuted }}>
                    <div className="w-2.5 h-[2px] rounded-full" style={{ background: m.c }} />
                    {m.l}
                  </div>
                ))}
              </div>
            </div>
            {/* Chart SVG */}
            <div className="px-4 py-3">
              <div ref={chartRef} className="relative" style={{ height: VH }}>
                <svg viewBox={`0 0 ${VW} ${VH}`} style={{ width:'100%', height:'100%' }} preserveAspectRatio="none">
                  {[0.25,0.5,0.75,1].map(f => {
                    const y=PT+(1-f)*(VH-PT-PB);
                    return <line key={f} x1={PL} y1={y} x2={VW-PR} y2={y} stroke={isDark?'rgba(255,255,255,0.08)':'#e8eaed'} strokeWidth="0.8"/>;
                  })}
                  <path d={DL_AREA} fill="rgba(74,207,220,0.07)"/>
                  <path d={LOSS_PATH} stroke="#e03030" strokeWidth="1.4" fill="none" opacity="0.8"/>
                  <path d={LAT_PATH}  stroke="#dbc65d" strokeWidth="1.4" fill="none" opacity="0.8"/>
                  <path d={UL_PATH}   stroke="#d9adff" strokeWidth="1.6" fill="none"/>
                  <path d={DL_PATH}   stroke="#4acfdc" strokeWidth="1.8" fill="none"/>
                  {hoveredIdx!==null && <>
                    <line x1={DL_PTS[hoveredIdx].x} y1={PT} x2={DL_PTS[hoveredIdx].x} y2={VH-PB}
                      stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="4,3" opacity="0.6"/>
                    <circle cx={LOSS_PTS[hoveredIdx].x} cy={LOSS_PTS[hoveredIdx].y} r="3.5" fill="#e03030" stroke="white" strokeWidth="1.5"/>
                    <circle cx={LAT_PTS[hoveredIdx].x}  cy={LAT_PTS[hoveredIdx].y}  r="3.5" fill="#dbc65d" stroke="white" strokeWidth="1.5"/>
                    <circle cx={UL_PTS[hoveredIdx].x}   cy={UL_PTS[hoveredIdx].y}   r="3.5" fill="#d9adff" stroke="white" strokeWidth="1.5"/>
                    <circle cx={DL_PTS[hoveredIdx].x}   cy={DL_PTS[hoveredIdx].y}   r="4"   fill="#4acfdc" stroke="white" strokeWidth="2"/>
                  </>}
                  {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d,i)=>(
                    <text key={d} x={PL+(i/6)*(VW-PL-PR)} y={VH-PB+16} textAnchor="middle" fontSize="9" fill={isDark?'#6b7280':'#9ca3af'}>{d}</text>
                  ))}
                </svg>
                <div className="absolute flex" style={{ top:0,bottom:0,left:`${(PL/VW)*100}%`,right:`${(PR/VW)*100}%` }}>
                  {DOWNLOAD.map((_,i)=>(
                    <div key={i} className="flex-1 h-full cursor-crosshair"
                      onMouseEnter={()=>handleChartEnter(i)} onMouseLeave={handleChartLeave}/>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Divider isDark={isDark} />

          {/* Variants */}
          <SubHeading isDark={isDark}>Variants</SubHeading>
          <div className="flex items-center gap-2 flex-wrap">
            <Anchor placement="Up"
              tip={<Tooltip type="Data" placement="Up" hasTitle={false} hasSubtitle={false} hasAction={false} />}>
              <button style={textBtn}>Rows only</button>
            </Anchor>
            <Anchor placement="Up"
              tip={<Tooltip type="Data" placement="Up" hasTitle hasSubtitle={false} hasAction={false} />}>
              <button style={textBtn}>With title</button>
            </Anchor>
            <Anchor placement="Up"
              tip={<Tooltip type="Data" placement="Up" hasTitle hasSubtitle hasAction={false} />}>
              <button style={textBtn}>With subtitle</button>
            </Anchor>
            <Anchor placement="Up"
              tip={<Tooltip type="Data" placement="Up" hasTitle hasSubtitle hasAction onAction={() => {}} />}>
              <button style={textBtn}>With action</button>
            </Anchor>
            <Anchor placement="Up"
              tip={<Tooltip type="Data" placement="Up" hasTitle={false} hasSubtitle={false} hasAction={false}
                dataRows={[
                  { label: 'Download', value: '7.05 KB', color: 'download', trend: 'down', hasLegend: false, hasIcon: false },
                  { label: 'Upload',   value: '7.05 KB', color: 'upload',   trend: 'up',   hasLegend: false, hasIcon: false },
                  { label: 'Latency',  value: '1 ms',    color: 'latency',  trend: null,   hasLegend: false, hasIcon: false },
                  { label: 'Loss',     value: '0 %',     color: 'loss',     trend: null,   hasLegend: false, hasIcon: false },
                ]} />}>
              <button style={textBtn}>No legend &amp; icon</button>
            </Anchor>
          </div>

          <Divider isDark={isDark} />

          {/* Trend Icon (instance swap) */}
          <SubHeading isDark={isDark}>Trend Icon</SubHeading>
          <div className="flex items-center gap-2 flex-wrap">
            <Anchor placement="Up"
              tip={<Tooltip type="Data" placement="Up" hasTitle={false} hasSubtitle={false} hasAction={false}
                dataRows={[
                  { label: 'Download', value: '7.05 KB', color: 'download', trend: 'down', trendIcon: 'arrow' },
                  { label: 'Upload',   value: '7.05 KB', color: 'upload',   trend: 'up',   trendIcon: 'arrow' },
                  { label: 'Latency',  value: '1 ms',    color: 'latency',  trend: null },
                  { label: 'Loss',     value: '0 %',     color: 'loss',     trend: null },
                ]} />}>
              <button style={textBtn}>Arrow</button>
            </Anchor>
            <Anchor placement="Up"
              tip={<Tooltip type="Data" placement="Up" hasTitle={false} hasSubtitle={false} hasAction={false}
                dataRows={[
                  { label: 'Download', value: '7.05 KB', color: 'download', trend: 'down', trendIcon: 'chevron' },
                  { label: 'Upload',   value: '7.05 KB', color: 'upload',   trend: 'up',   trendIcon: 'chevron' },
                  { label: 'Latency',  value: '1 ms',    color: 'latency',  trend: null },
                  { label: 'Loss',     value: '0 %',     color: 'loss',     trend: null },
                ]} />}>
              <button style={textBtn}>Chevron</button>
            </Anchor>
            <Anchor placement="Up"
              tip={<Tooltip type="Data" placement="Up" hasTitle={false} hasSubtitle={false} hasAction={false}
                dataRows={[
                  { label: 'Download', value: '7.05 KB', color: 'download', trend: 'down', trendIcon: 'caret' },
                  { label: 'Upload',   value: '7.05 KB', color: 'upload',   trend: 'up',   trendIcon: 'caret' },
                  { label: 'Latency',  value: '1 ms',    color: 'latency',  trend: null },
                  { label: 'Loss',     value: '0 %',     color: 'loss',     trend: null },
                ]} />}>
              <button style={textBtn}>Caret</button>
            </Anchor>
          </div>

        </Section>

        {/* ── Mobile ── */}
        <Section title="Mobile Tooltip" desc="Bottom sheet for mobile contexts — tap ⓘ next to Face Recognition" isDark={isDark}>
          <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${uBorder}` }}>
            <MobileScene isDark={isDark} />
          </div>

          <Divider isDark={isDark} />

          {/* Variants */}
          <SubHeading isDark={isDark}>Variants</SubHeading>
          <div className="flex items-center gap-2 flex-wrap">
            <Anchor placement="Up"
              tip={
                <div style={{ width: 320 }}>
                  <MobileTooltip hasTitle={false} hasAction={false}
                    textLong="Enable Face Recognition in settings to use Spotlight for Known Faces." />
                </div>
              }>
              <button style={textBtn}>Body only</button>
            </Anchor>
            <Anchor placement="Up"
              tip={
                <div style={{ width: 320 }}>
                  <MobileTooltip hasTitle hasAction={false}
                    title="Face Recognition"
                    textLong="Enable Face Recognition in settings to use Spotlight for Known Faces." />
                </div>
              }>
              <button style={textBtn}>With title</button>
            </Anchor>
            <Anchor placement="Up"
              tip={
                <div style={{ width: 320 }}>
                  <MobileTooltip hasTitle hasAction
                    title="Face Recognition"
                    textLong="Enable Face Recognition in settings to use Spotlight for Known Faces."
                    onAction={() => {}} />
                </div>
              }>
              <button style={textBtn}>With action</button>
            </Anchor>
          </div>

        </Section>

      </div>

      {/* Chart tooltip portal */}
      {hoveredIdx!==null && tipStyle && createPortal(
        <div style={tipStyle} className={isDark ? 'dark' : ''}
          onMouseEnter={cancelChartHide} onMouseLeave={handleChartLeave}>
          <Tooltip type="Data" placement="Up" hasTitle hasSubtitle hasAction
            title="Dream Router 7"
            subtitle={fmtTimeLabel(hoveredIdx)}
            dataRows={makeRows(hoveredIdx)} />
        </div>,
        document.body
      )}

    </div>
    </DarkCtx.Provider>
  );
}
