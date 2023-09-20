import { ImageResponse } from "next/server";
import { abril } from "../../fonts";

export const runtime = "edge";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const abrilFontPath = new URL("../../../assets/abril.ttf", import.meta.url);
  const abrilFontData = await fetch(abrilFontPath).then((res) =>
    res.arrayBuffer()
  );

  const noun = searchParams.get("noun");
  const adjective = searchParams.get("adjective");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          color: "#ffffff",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "rgb(15, 23, 42)",
        }}
      >
        <span>A nova tendência do mercado é:</span>

        <h1 className={abril.className} style={{ fontSize: "6rem" }}>
          {adjective} {noun}
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Abril", data: abrilFontData, style: "normal" }],
    }
  );
}
