import { get } from "@vercel/blob";

export const config = {
  runtime: "edge",
};

/**
 * Serverless function running on Vercel Edge Runtime to securely fetch
 * and serve private Vercel Blobs.
 *
 * @param request Standard Web standard API request object.
 * @returns Standard Web standard API response object.
 */
export default async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.searchParams.get("pathname");

  if (!pathname) {
    return new Response(JSON.stringify({ error: "Missing pathname" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const result = await get(pathname, {
      access: "private",
    });

    if (!result) {
      return new Response("Not found", { status: 404 });
    }

    return new Response(result.stream, {
      headers: {
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        "Content-Type": result.blob.contentType ?? "application/octet-stream",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Error retrieving blob:", error);
    return new Response(JSON.stringify({ error: "Failed to retrieve blob" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
