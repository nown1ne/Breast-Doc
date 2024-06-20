import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return new Response("Email and password are required", { status: 400 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  const { access_token, refresh_token } = data.session;
  const { data: { user } } = await supabase.auth.getUser()

  // Check if the user has a record in the 'survey' table
  const { data: surveyData, error: surveyError } = await supabase
    .from("survey")
    .select("*")
    .eq("user_id", user.id)

  const redirectUrl = surveyData ? "/" : "/survey"; // Redirect to /survey if no survey data found

  cookies.set("sb-access-token", access_token, {
    path: "/",
  });
  cookies.set("sb-refresh-token", refresh_token, {
    path: "/",
  });
  cookies.set("user-id", user.id, {
    path: "/",
  });

  return redirect(redirectUrl);
};