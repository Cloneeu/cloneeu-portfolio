const displacementMap = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
    <defs>
      <linearGradient id="horizontal" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#200000"/>
        <stop offset="0.1" stop-color="#420000"/>
        <stop offset="0.25" stop-color="#6c0000"/>
        <stop offset="0.5" stop-color="#800000"/>
        <stop offset="0.75" stop-color="#930000"/>
        <stop offset="0.9" stop-color="#bd0000"/>
        <stop offset="1" stop-color="#df0000"/>
      </linearGradient>
      <linearGradient id="vertical" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#002000"/>
        <stop offset="0.1" stop-color="#004200"/>
        <stop offset="0.25" stop-color="#006c00"/>
        <stop offset="0.5" stop-color="#008000"/>
        <stop offset="0.75" stop-color="#009300"/>
        <stop offset="0.9" stop-color="#00bd00"/>
        <stop offset="1" stop-color="#00df00"/>
      </linearGradient>
    </defs>
    <rect width="256" height="256" fill="#000"/>
    <rect width="256" height="256" fill="url(#horizontal)"/>
    <rect width="256" height="256" fill="url(#vertical)" style="mix-blend-mode:screen"/>
  </svg>
`)}`;

export function CrtWarpFilter() {
  return (
    <svg className="crt-filter-definitions" aria-hidden="true">
      <defs>
        <filter
          id="crt-content-warp"
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            href={displacementMap}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            result="warp-map"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="warp-map"
            scale="44"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
