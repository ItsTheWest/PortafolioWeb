export const config = {
  runtime: "edge",
};

/**
 * Serverless edge function that redirects requests to the private blob CDN URL.
 * This permits browsers to natively perform HTTP Range requests (206 Partial Content)
 * for video streaming/scrubbing, avoiding loading issues on Safari/Chrome.
 *
 * @param request - Standard Web API request object.
 * @returns 307 Temporary Redirect response to the blob.
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

  // Redirect to the blob URL. The signed blob URL contains temporary access tokens
  // so the CDN serves it directly, providing native seeking and mobile play compatibility.
  return Response.redirect(blobUrl, 307);
}
