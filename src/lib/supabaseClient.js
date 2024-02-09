import { createClient } from '@supabase/supabase-js'

const supabaseProjectUrl = import.meta.env.VITE_SUPAURL
const supabaseProjectAnonKey = import.meta.env.VITE_SUPAKEY

export const supabase = createClient(supabaseProjectUrl, supabaseProjectAnonKey)
