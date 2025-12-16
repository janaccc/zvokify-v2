import { supabase } from "../SupabaseClient";

const loginUser = async (email:string, password:string) => {
        try {
            const{error} = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if(error){
                console.log("Napaka pri prijavi:", error.message);
      return { error: error.message };

            }
        } catch (err) {
            console.log("Nepričakovana napala:", err);
            return { error: "Nekaj je šlo po zlu..." };
        }
}

export default loginUser;