import type { Project } from "@/types";

type ProjectArtworkProps = {
  variant: Project["artwork"];
};

export function ProjectArtwork({ variant }: ProjectArtworkProps) {
  return (
    <div className={`project-art project-art--${variant}`} aria-hidden="true">
      {variant === "watch" && <WatchArtwork />}
      {variant === "platformer" && <PlatformerArtwork />}
      {variant === "portfolio" && <PortfolioArtwork />}
    </div>
  );
}

function WatchArtwork() {
  return (
    <svg viewBox="0 0 640 360" shapeRendering="crispEdges">
      <path className="project-art__paper" d="M74 58h492v244H74z" />
      <path d="M74 58h492v244H74zm12 12v220h468V70zM86 96h468v8H86z" />
      <path d="M104 78h10v10h-10zM124 78h10v10h-10zM144 78h10v10h-10z" />
      <path d="M118 126h106v12H118zM118 150h68v8h-68z" />
      <g className="project-art__moving-a">
        <path d="M316 112h86v42h-86zM328 154h62v58h-62zM316 212h86v42h-86z" />
        <path className="project-art__paper" d="M330 124h58v18h-58zM340 166h38v34h-38zM330 224h58v18h-58z" />
        <path d="M352 172h14v14h-14z" />
      </g>
      <g className="project-art__moving-b">
        <path d="M444 126h72v34h-72zM454 160h52v46h-52zM444 206h72v34h-72z" />
        <path className="project-art__paper" d="M454 136h52v14h-52zM464 170h32v26h-32zM454 216h52v14h-52z" />
      </g>
      <path className="project-art__accent" d="M118 240h106v24H118z" />
      <text x="123" y="257">MARS / SHOP</text>
    </svg>
  );
}

function PlatformerArtwork() {
  return (
    <svg viewBox="0 0 640 360" shapeRendering="crispEdges">
      <path className="project-art__paper" d="M64 48h512v264H64z" />
      <path d="M64 48h512v264H64zm12 12v240h488V60z" />
      <path d="M76 258h112v42H76zM212 226h112v74H212zM348 190h112v110H348zM484 258h80v42h-80z" />
      <g className="project-art__moving-a">
        <path className="project-art__accent" d="M246 170h38v38h-38z" />
        <path d="M254 178h8v8h-8zM270 178h8v8h-8zM254 196h24v8h-24z" />
      </g>
      <g className="project-art__moving-b">
        <path d="M500 116h8v142h-8zM508 116h54v42h-54z" />
        <path className="project-art__paper" d="M520 128h28v8h-28z" />
      </g>
      <path d="M104 104h14v14h-14zM138 82h10v10h-10zM176 116h8v8h-8zM384 92h12v12h-12zM426 120h8v8h-8z" />
      <text x="94" y="286">LEVEL 03</text>
    </svg>
  );
}

function PortfolioArtwork() {
  return (
    <svg viewBox="0 0 640 360" shapeRendering="crispEdges">
      <path className="project-art__paper" d="M76 50h488v260H76z" />
      <path d="M76 50h488v260H76zm12 12v236h464V62zM88 90h464v8H88z" />
      <path d="M104 70h10v10h-10zM124 70h10v10h-10zM144 70h10v10h-10z" />
      <path d="M114 126h232v24H114zM114 164h286v12H114z" />
      <path className="project-art__accent" d="M114 192h218v32H114z" />
      <path d="M114 254h126v8H114zM114 274h92v8h-92z" />
      <g className="project-art__moving-b">
        <path d="M410 122h108v130H410z" />
        <path className="project-art__paper" d="M422 134h84v106h-84z" />
        <path d="M434 148h24v24h-24zM470 148h24v24h-24zM434 184h60v8h-60zM434 206h44v8h-44z" />
      </g>
      <path className="project-art__cursor project-art__moving-a" d="m354 214 54 28-24 8-12 28-18-64z" />
      <text x="114" y="144">BUILDING</text>
    </svg>
  );
}
