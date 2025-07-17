import { supabase } from "@/lib/superbase";
import { Session } from "@supabase/supabase-js";
import { Slot, usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import "../global.css";

export default function RootLayout() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (isMounted) setSession(data.session);

      supabase.auth.onAuthStateChange((_event, session) => {
        if (isMounted) setSession(session);
      });
    };

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (session === undefined) return;

    if (!session && pathname !== "/(auth)/welcome") {
      router.replace("/(auth)/welcome");
      return;
    }

    const checkOnboarding = async () => {
      if (session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("has_onboarded")
          .eq("id", session.user.id)
          .single();

        if (!profile?.has_onboarded && pathname !== "/onboarding") {
          router.replace("/onboarding");
        } else if (profile?.has_onboarded && pathname === "/onboarding") {
          router.replace("/"); // home page
        }
      }
    };

    checkOnboarding();
  }, [session, pathname]);

  return <Slot />;
}
