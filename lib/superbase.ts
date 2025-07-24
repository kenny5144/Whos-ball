import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

let storage: any = undefined;

// Only use AsyncStorage on React Native
if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
  storage = require('@react-native-async-storage/async-storage').default;
}
const supabaseUrl = 'https://nibimkmalwwouxaxidhq.supabase.co'
const supabaseAnonKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pYmlta21hbHd3b3V4YXhpZGhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwNjgwOTQsImV4cCI6MjA2ODY0NDA5NH0.kKp8BpkcwmvLvIloqsKN6BeIka0X717goW0aeeI415g"


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage,
    autoRefreshToken: !!storage,
    persistSession: !!storage,
    detectSessionInUrl: false, // React Native doesn't use URL params
  },
});



