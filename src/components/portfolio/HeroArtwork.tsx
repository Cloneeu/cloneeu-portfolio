export function HeroArtwork() {
  return (
    <div className="hero-artwork" aria-hidden="true">
      <svg viewBox="0 0 680 560" role="presentation" shapeRendering="crispEdges">
        <g className="hero-artwork__orbit">
          <path d="M76 332h72v16H76zM92 316h40v48H92z" />
          <path d="M532 116h56v16h-56zM548 100h24v48h-24z" />
          <path d="M556 404h20v20h-20zM576 424h20v20h-20zM536 424h20v20h-20z" />
        </g>

        <g className="hero-artwork__window">
          <path className="art-fill" d="M122 126h410v284H122z" />
          <path d="M122 126h410v16H122zM122 394h410v16H122zM122 126h16v284h-16zM516 126h16v284h-16z" />
          <path d="M138 174h378v8H138z" />
          <path d="M158 148h12v12h-12zM180 148h12v12h-12zM202 148h12v12h-12z" />
          <path d="M164 214h136v16H164zM164 246h236v12H164zM164 270h196v12H164z" />
          <path d="M164 316h82v42h-82zM260 316h82v42h-82zM356 316h82v42h-82z" />
          <path className="art-accent" d="M452 214h42v42h-42z" />
          <path className="art-fill" d="M460 222h10v10h-10zM478 222h10v10h-10zM466 240h16v6h-16z" />
        </g>

        <g className="hero-artwork__folder">
          <path className="art-fill" d="M70 384h160v104H70z" />
          <path d="M70 384h68l14 16h78v88H70zm16 32v56h128v-56z" />
        </g>

        <g className="hero-artwork__note">
          <path className="art-fill" d="M438 352h154v130H438z" />
          <path d="M438 352h154v130H438zm14 14v102h126V366z" />
          <path d="M468 394h76v10h-76zM468 418h58v10h-58z" />
          <path className="art-accent" d="M468 444h18v10h-18z" />
        </g>

        <path className="hero-artwork__cursor" d="m362 366 56 30-26 9-12 28-18-67z" />
        <text x="138" y="102" className="hero-artwork__label">BUILD / TEST / LEARN</text>
        <text x="438" y="512" className="hero-artwork__label">IDEA  →  SOFTWARE</text>
      </svg>
    </div>
  );
}
