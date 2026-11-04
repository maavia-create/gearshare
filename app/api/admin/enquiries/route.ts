import { NextResponse } from "next/server";
import { createClient as createAuthClient } from "@/lib/supabase/server";
import { createClient as createDatabaseClient } from "@supabase/supabase-js";

const supabase = createDatabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

async function isAuthorizedAdmin() {
  const authClient = await createAuthClient();
  const { data, error } = await authClient.auth.getClaims();

  const email =
    typeof data?.claims?.email === "string"
      ? data.claims.email.toLowerCase()
      : "";

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  return !error && !!adminEmail && email === adminEmail;
}

export async function GET() {
  try {
    if (!(await isAuthorizedAdmin())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("rental_enquiries")
      .select(`
        id,
        start_date,
        return_date,
        delivery_method,
        message,
        status,
        customers (
          full_name,
          email,
          phone
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Admin enquiry error:", error);
      return NextResponse.json(
        { error: "Could not load enquiries." },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    if (!(await isAuthorizedAdmin())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id, status } = await request.json();

    if (!id || !["approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid enquiry ID or status." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("rental_enquiries")
      .update({ status })
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Enquiry status updated.",
    });
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json(
      { error: "Could not update enquiry status." },
      { status: 500 }
    );
  }
}