import { get } from "@vercel/blob";

export const config = {
  runtime: "edge",
};

/**
 * Serverless edge function that proxies private Vercel Blob files.
 * Authenticates via BLOB_READ_WRITE_TOKEN env var so the client
 * never needs direct access to signed URLs.
 *
 * @param request - Standard Web API request object.
 * @returns Streamed blob content with appropriate headers.
 */
export default async function handler(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const blobUrl = searchParams.get("url");

  if (!blobUrl) {
    return new Response(JSON.stringify({ error: "Missing url parameter" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const result = await get(blobUrl, { access: "private" });

    if (!result || !result.stream) {
      return new Response("Not found", { status: 404 });
    }

    return new Response(result.stream, {
      headers: {
        "Content-Type": result.blob.contentType ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Error retrieving blob:", error);
    return new Response(JSON.stringify({ error: "Failed to retrieve blob" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
