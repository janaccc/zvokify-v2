import { supabase } from "../SupabaseClient";

const signUpUser = async (name:string, email:string, password:string) => {
    try {
        
    } catch (err) {
        console.log("Nepričakovana napaka.", err);
        return{error: "Nekaj je šlo po zlu..."}
        
    }
}