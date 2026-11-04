"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Enquiry = {
  id: string;
  start_date: string;
  return_date: string;
  delivery_method: string;
  message: string;
  status: string;
  customers: {
    full_name: string;
    email: string;
    phone: string;
  } | null;
};

export default function AdminPage() {

  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const updateStatus = async (id: string, status: string) => {
  try {
    const response = await fetch("/api/admin/enquiries", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "Could not update status.");
      return;
    }

    setEnquiries((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    alert("Enquiry status updated successfully!");
  } catch {
    alert("Something went wrong. Please try again.");
  }
};

  useEffect(() => {
    async function loadEnquiries() {
      const response = await fetch("/api/admin/enquiries");
      const result = await response.json();

      if (response.ok) {
        setEnquiries(result);
      }

      setLoading(false);
    }

    loadEnquiries();
  }, []);

  return (
    <main className="min-h-screen bg-[#101010] p-8 text-white">
      <h1 className="mb-2 text-3xl font-bold">
        GearShare Admin Dashboard
      </h1>
      <button
  onClick={handleLogout}
  className="mb-6 rounded-lg bg-orange-500 px-5 py-2 font-semibold text-white hover:bg-orange-600"
>
  Logout
</button>

      <p className="mb-8 text-gray-400">
        Manage your rental enquiries
      </p>

      {loading ? (
        <p>Loading enquiries...</p>
      ) : enquiries.length === 0 ? (
        <p>No rental enquiries found.</p>
      ) : (
        <div className="space-y-4">
          {enquiries.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <h2 className="text-xl font-semibold">
                {item.customers?.full_name || "Unknown customer"}
              </h2>

              <p className="text-gray-400">
                {item.customers?.email}
              </p>

              <p className="mt-3">
                Phone: {item.customers?.phone}
              </p>

              <p>Start: {item.start_date}</p>
              <p>Return: {item.return_date}</p>
              <p>Delivery: {item.delivery_method}</p>
              <p>Status: {item.status}</p>
              <p>Message: {item.message || "No message"}</p>
              <div className="flex gap-3 mt-4">
  <button
    onClick={() => updateStatus(item.id, "approved")}
    className="bg-green-600 text-white px-4 py-2 rounded-lg"
  >
    Approve
  </button>

  <button
    onClick={() => updateStatus(item.id, "rejected")}
    className="bg-red-600 text-white px-4 py-2 rounded-lg"
  >
    Reject
  </button>
</div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}