// Polígonos copiados do mockup: as cores das facetas fazem parte do desenho.
const FACETS = [
  ["187.6,102.5 92.4,102.5 140,185", "#6B3FE0"],
  ["187.6,102.5 92.4,102.5 140,20", "#A98BFF"],
  ["187.6,102.5 140,185 235.3,185", "#5B34C2"],
  ["92.4,102.5 140,185 44.7,185", "#7B4AE8"],
  ["187.6,102.5 140,20 235.3,75", "#8D63FF"],
  ["187.6,102.5 235.3,75 235.3,185", "#4A2A9E"],
  ["92.4,102.5 140,20 44.7,75", "#B79BFF"],
  ["92.4,102.5 44.7,75 44.7,185", "#6236D1"],
  ["140,185 44.7,185 140,240", "#3F2490"],
  ["140,185 140,240 235.3,185", "#36207F"],
];

const ORBIT_TRANSFORM = "translate(0 120) rotate(-16 230 60)";

const OrbitObject = () => (
  <div
    role="img"
    aria-label="Objeto facetado em órbita sobre um céu de estrelas"
    className="relative mx-auto aspect-[460/340] w-full max-w-[460px]"
  >
    <svg
      viewBox="0 0 460 340"
      fill="none"
      className="absolute inset-0 size-full"
    >
      <path
        transform={ORBIT_TRANSFORM}
        d="M 1 60 A 229 59 0 0 1 459 60"
        strokeOpacity=".4"
        strokeWidth="1.2"
        className="stroke-acento-vivo"
      />
      <g transform="translate(90 50)">
        <g
          className="float"
          stroke="#D9CCFF"
          strokeOpacity=".35"
          strokeLinejoin="round"
        >
          {FACETS.map(([points, fill]) => (
            <polygon key={points} points={points} fill={fill} />
          ))}
        </g>
      </g>
      <path
        transform={ORBIT_TRANSFORM}
        d="M 1 60 A 229 59 0 0 0 459 60"
        strokeOpacity=".85"
        strokeWidth="1.2"
        className="stroke-acento-vivo"
      />
    </svg>
    <div className="absolute top-[35.3%] left-0 h-[35.3%] w-full -rotate-16">
      <div className="orbit-dot" />
    </div>
  </div>
);

export default OrbitObject;
