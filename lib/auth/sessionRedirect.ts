import { supabase } from "@/lib/SupabaseClient";

type RouterLike = { push: (href: string) => void };

// Redirects to "/" if a Supabase session exists; otherwise runs the callback.
export async function redirectIfAuthenticated(
  router: RouterLike,
  onUnauthenticated: () => void
) {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    router.push("/");
    return;
  }
  onUnauthenticated();
}

// Redirects to "/" if no Supabase session exists; otherwise runs the callback.
export async function requireAuthenticatedSession(
  router: RouterLike,
  onAuthenticated: () => void
) {
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    router.push("/");
    return;
  }
  onAuthenticated();
}
