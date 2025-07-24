import { supabaseAnonKey, supabaseUrl } from '@env';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
let storage: any = undefined;

// Only use AsyncStorage on React Native
if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
  storage = require('@react-native-async-storage/async-storage').default;
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage,
    autoRefreshToken: !!storage,
    persistSession: !!storage,
    detectSessionInUrl: false, // React Native doesn't use URL params
  },
});



