import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-BRKMugTt.js
function createSupabaseClient() {
	return createClient("https://vmiyyfunoxdkxhqscmfo.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtaXl5ZnVub3hka3hocXNjbWZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExODIzNjcsImV4cCI6MjA5Njc1ODM2N30.X1ltQO-w_XvxtEtpZqyQBumK2ZPPOr1njuqCgYhWwQQ", { auth: {
		storage: typeof window !== "undefined" ? localStorage : void 0,
		persistSession: true,
		autoRefreshToken: true
	} });
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { supabase as t };
