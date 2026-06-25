/**
 * Supabase client — groepsruimte (ml_posts, ml_herkenbaar).
 * Anon key via window.__ENV__ (ingesteld in index.html) of .env bij build.
 */
const SUPABASE_URL = "https://zkiavxldremirlvcmoef.supabase.co";

function getAnonKey() {
  return window.__ENV__?.SUPABASE_ANON_KEY || "";
}

let clientPromise = null;

export async function getSupabase() {
  const key = getAnonKey();
  if (!key) return null;

  if (!clientPromise) {
    clientPromise = import("https://esm.sh/@supabase/supabase-js@2").then(({ createClient }) =>
      createClient(SUPABASE_URL, key)
    );
  }
  return clientPromise;
}

export async function fetchPosts(groupCode, limit = 20) {
  const supabase = await getSupabase();
  if (!supabase) return { data: [], offline: true };

  let query = supabase.from("ml_posts").select("*").order("created_at", { ascending: false }).limit(limit);

  if (groupCode) {
    query = query.eq("group_code", groupCode);
  }

  const { data, error } = await query;
  if (error) throw error;
  return { data: data ?? [], offline: false };
}

export async function createPost(body, groupCode) {
  const supabase = await getSupabase();
  if (!supabase) throw new Error("Supabase niet geconfigureerd");

  const row = { body };
  if (groupCode) row.group_code = groupCode;

  const { data, error } = await supabase.from("ml_posts").insert(row).select().single();
  if (error) throw error;
  return data;
}

export async function markHerkenbaar(postId) {
  const supabase = await getSupabase();
  if (!supabase) throw new Error("Supabase niet geconfigureerd");

  const { error } = await supabase.from("ml_herkenbaar").insert({ post_id: postId });
  if (error) throw error;
}
