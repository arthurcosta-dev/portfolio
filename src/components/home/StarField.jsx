const LARGE_PATTERN = [
  [23, 41, 1.1, 0.9],
  [87, 203, 0.8, 0.6],
  [140, 77, 1.4, 0.95],
  [205, 161, 0.9, 0.7],
  [262, 31, 1.2, 0.8],
  [301, 239, 0.8, 0.5],
  [58, 129, 0.7, 0.5],
  [181, 262, 1, 0.75],
  [318, 118, 1.3, 0.85],
  [112, 12, 0.8, 0.6],
  [247, 198, 0.7, 0.45],
];

const SMALL_PATTERN = [
  [19, 57, 0.9, 0.6],
  [121, 23, 1.2, 0.8],
  [171, 139, 0.8, 0.55],
  [64, 201, 1.1, 0.7],
  [143, 226, 0.7, 0.5],
  [96, 112, 0.8, 0.5],
];

const Stars = ({ stars }) =>
  stars.map(([cx, cy, r, opacity]) => (
    <circle
      key={`${cx}-${cy}`}
      cx={cx}
      cy={cy}
      r={r}
      fillOpacity={opacity}
      className="fill-estrelas"
    />
  ));

const StarField = () => (
  <svg
    aria-hidden="true"
    className="absolute inset-0 size-full [mask-image:linear-gradient(to_bottom,transparent,black_180px)]"
  >
    <defs>
      <pattern
        id="stars-large"
        width="331"
        height="283"
        patternUnits="userSpaceOnUse"
      >
        <Stars stars={LARGE_PATTERN} />
      </pattern>
      <pattern
        id="stars-small"
        width="197"
        height="241"
        patternUnits="userSpaceOnUse"
      >
        <Stars stars={SMALL_PATTERN} />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#stars-large)" />
    <rect width="100%" height="100%" fill="url(#stars-small)" />
  </svg>
);

export default StarField;
