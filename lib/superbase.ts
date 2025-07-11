import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xfgqbnjkdmmsibsnbumj.supabase.co'
const supabaseAnonKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmZ3FibmprZG1tc2lic25idW1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNjI3MDQsImV4cCI6MjA2NzczODcwNH0.0pI5DOKGjYhIF5ZQ3lNuJSCPotl0HrpdaUFuAKQKhK4'
export const supabase = createClient(supabaseUrl, supabaseAnonKey);