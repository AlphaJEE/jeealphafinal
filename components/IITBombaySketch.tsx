export default function IITBombaySketch({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fontFamily: 'Georgia, serif', ...style }}
    >
      {/* Sketch/architectural drawing style of IIT Bombay Convocation Hall */}
      {/* Ground line */}
      <line x1="30" y1="370" x2="570" y2="370" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

      {/* Main central dome building */}
      {/* Steps */}
      <rect x="195" y="355" width="210" height="8" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="205" y="347" width="190" height="8" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="215" y="339" width="170" height="8" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Main body of building */}
      <rect x="200" y="230" width="200" height="109" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Pillars on main building */}
      {[220, 248, 276, 304, 332, 360].map((x, i) => (
        <line key={i} x1={x} y1="240" x2={x} y2="339" stroke="currentColor" strokeWidth="1" />
      ))}
      {/* Pillar caps */}
      <rect x="210" y="236" width="180" height="8" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Dome */}
      <path
        d="M 230 230 Q 300 140 370 230"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Inner dome arc */}
      <path
        d="M 248 230 Q 300 160 352 230"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="4 3"
      />
      {/* Dome lantern top */}
      <line x1="300" y1="140" x2="300" y2="115" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="300" cy="140" rx="18" ry="8" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="294" y="115" width="12" height="28" stroke="currentColor" strokeWidth="1" fill="none" />
      <line x1="290" y1="115" x2="310" y2="115" stroke="currentColor" strokeWidth="1.5" />

      {/* Dome ribs */}
      {[260, 270, 280, 290, 310, 320, 330, 340].map((x, i) => {
        const progress = (x - 230) / 140;
        const y = 230 - Math.sin(Math.PI * progress) * 90 + 5;
        return (
          <line
            key={i}
            x1={x}
            y1="230"
            x2={300 + (x - 300) * 0.3}
            y2={y + 30}
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="3 3"
          />
        );
      })}

      {/* Left wing */}
      <rect x="80" y="270" width="120" height="69" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Left wing pillars */}
      {[100, 118, 136, 154, 172].map((x, i) => (
        <line key={i} x1={x} y1="278" x2={x} y2="339" stroke="currentColor" strokeWidth="1" />
      ))}
      <rect x="85" y="274" width="110" height="6" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Left wing pediment */}
      <path
        d="M 80 270 L 140 245 L 200 270"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
      />

      {/* Right wing */}
      <rect x="400" y="270" width="120" height="69" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Right wing pillars */}
      {[420, 438, 456, 474, 492].map((x, i) => (
        <line key={i} x1={x} y1="278" x2={x} y2="339" stroke="currentColor" strokeWidth="1" />
      ))}
      <rect x="405" y="274" width="110" height="6" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Right wing pediment */}
      <path
        d="M 400 270 L 460 245 L 520 270"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
      />

      {/* Windows on main building */}
      {[230, 262, 294, 326, 358].map((x, i) => (
        <rect key={i} x={x} y="260" width="16" height="28" stroke="currentColor" strokeWidth="1" fill="none" />
      ))}

      {/* Windows on left wing */}
      <rect x="105" y="290" width="14" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="135" y="290" width="14" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="165" y="290" width="14" height="20" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Windows on right wing */}
      <rect x="425" y="290" width="14" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="455" y="290" width="14" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="485" y="290" width="14" height="20" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Door on main building */}
      <path
        d="M 285 339 L 285 300 Q 300 285 315 300 L 315 339"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Doors on wings */}
      <rect x="128" y="315" width="24" height="24" stroke="currentColor" strokeWidth="1" fill="none" />
      <line x1="140" y1="315" x2="140" y2="339" stroke="currentColor" strokeWidth="0.5" />

      <rect x="448" y="315" width="24" height="24" stroke="currentColor" strokeWidth="1" fill="none" />
      <line x1="460" y1="315" x2="460" y2="339" stroke="currentColor" strokeWidth="0.5" />

      {/* Trees / vegetation - rough hand-drawn */}
      <path
        d="M 40 370 Q 45 340 50 330 Q 55 320 60 330 Q 65 340 70 370"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <ellipse cx="55" cy="330" rx="18" ry="22" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="3 2" />

      <path
        d="M 530 370 Q 535 345 540 335 Q 545 325 550 335 Q 555 345 560 370"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <ellipse cx="545" cy="335" rx="18" ry="22" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="3 2" />

      {/* Small trees near wings */}
      <ellipse cx="165" cy="353" rx="10" ry="14" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2 2" />
      <line x1="165" y1="367" x2="165" y2="370" stroke="currentColor" strokeWidth="1" />

      <ellipse cx="435" cy="353" rx="10" ry="14" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2 2" />
      <line x1="435" y1="367" x2="435" y2="370" stroke="currentColor" strokeWidth="1" />

      {/* Flagpole */}
      <line x1="300" y1="108" x2="300" y2="80" stroke="currentColor" strokeWidth="1" />
      <path
        d="M 300 80 L 320 86 L 300 93"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        strokeLinejoin="round"
      />

      {/* Hatching on dome for texture */}
      {[165, 175, 185, 195, 205, 215].map((y, i) => {
        const span = 90 - Math.abs(y - 185) * 0.8;
        return (
          <line
            key={i}
            x1={300 - span}
            y1={y}
            x2={300 + span}
            y2={y}
            stroke="currentColor"
            strokeWidth="0.4"
            strokeDasharray="4 6"
          />
        );
      })}

      {/* Measurement/annotation lines - sketch style */}
      <line x1="35" y1="230" x2="35" y2="370" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
      <line x1="31" y1="230" x2="39" y2="230" stroke="currentColor" strokeWidth="0.5" />
      <line x1="31" y1="370" x2="39" y2="370" stroke="currentColor" strokeWidth="0.5" />

      {/* Small "IIT BOMBAY" label */}
      <text x="300" y="400" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="monospace" letterSpacing="3" opacity="0.5">
        IIT BOMBAY — CONVOCATION HALL
      </text>

      {/* Cross-hatch shading on main building front */}
      {[250, 260, 270, 280, 290, 300, 310, 320, 330, 340, 350].map((x, i) => (
        <line
          key={i}
          x1={x}
          y1="246"
          x2={x}
          y2="236"
          stroke="currentColor"
          strokeWidth="0.4"
        />
      ))}
    </svg>
  );
}
