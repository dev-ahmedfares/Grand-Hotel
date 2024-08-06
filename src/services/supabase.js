import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://qsqtyknhgslqzasgavix.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzcXR5a25oZ3NscXphc2dhdml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE5NjY2MzgsImV4cCI6MjAzNzU0MjYzOH0.ipotsa9SW6xmMYqrUxjq8bDHhzJMv3iLNE6SLb54fD8`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
