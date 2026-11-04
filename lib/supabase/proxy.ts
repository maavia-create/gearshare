import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data, error } = await supabase.auth.getClaims();

  const email =
    typeof data?.claims?.email === "string"
      ? data.claims.email.toLowerCase()
      : "";

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  const isAdmin = !error && !!adminEmail && email === adminEmail;
  console.log("Admin check:", {
  hasClaims: !!data?.claims,
  hasEmail: !!email,
  adminConfigured: !!adminEmail,
  emailMatches: email === adminEmail,
  authError: !!error,
});

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/api/admin") && !isAdmin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  if (
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login" &&
    !isAdmin
  ) {
    const redirectUrl = new URL("/admin/login", request.url);
    const redirectResponse = NextResponse.redirect(redirectUrl);

    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });

    return redirectResponse;
  }

  return response;
}