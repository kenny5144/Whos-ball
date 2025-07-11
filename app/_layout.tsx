import { supabase } from "@/lib/superbase";
import { Session } from "@supabase/supabase-js";
import { Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import "../global.css";

export default function RootLayout() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const router = useRouter();
  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  // if (session === undefined) {
  //   // Still loading
  //   return <SplashScreen />;
  // }
  // useEffect(() => {
  //   if (!session) {
  //     router.replace("/(auth)/welcome"); // not logged in
  //   } else {
  //     router.replace("/(tabs)"); // logged in
  //   }
  // }, [session]);
  return <Slot />;
}
