import {supabase} from "../SupabaseClient";

export const signUpUser = async (name: string, email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (error) return { error: error.message };
    return { success: true };
  } catch (err) {
    return { error: "Nekaj je šlo po zlu..." };
  }
};
