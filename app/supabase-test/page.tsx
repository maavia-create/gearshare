"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function SupabaseTest() {
  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase
        .from("equipment")
        .select("*");

      console.log("Supabase data:", data);
      console.log("Supabase error:", error);
    }

    testConnection();
  }, []);

  return <h1>Testing Supabase connection...</h1>;
}