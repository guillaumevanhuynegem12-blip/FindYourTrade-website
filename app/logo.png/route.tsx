import { ImageResponse } from "next/og";

export const runtime = "edge";

const SIZE = 240;
const CENTER = SIZE / 2;
const BAR_W = 34;
const BAR_H = 72;
const TOP = 28;
const LEFT = CENTER - BAR_W / 2;
const ORIGIN_X = BAR_W / 2;
const ORIGIN_Y = CENTER - TOP;
const SPLAY = 22;
const COLOR = "#A855F7";

export async function GET() {
  const directions = [0, 90, 180, 270];
  const bars = directions.flatMap((dir) => [dir - SPLAY, dir + SPLAY]);

  return new ImageResponse(
    (
      <div
        style={{
          width: SIZE,
          height: SIZE,
          background: "#ffffff",
          display: "flex",
          position: "relative",
        }}
      >
        {bars.map((rotation, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: TOP,
              left: LEFT,
              width: BAR_W,
              height: BAR_H,
              background: COLOR,
              borderRadius: BAR_W / 2,
              transformOrigin: `${ORIGIN_X}px ${ORIGIN_Y}px`,
              transform: `rotate(${rotation}deg)`,
            }}
          />
        ))}
      </div>
    ),
    { width: SIZE, height: SIZE },
  );
}
