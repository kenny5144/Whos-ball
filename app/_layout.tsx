import { Session } from "@supabase/supabase-js";
import { Slot, usePathname, useRouter } from "expo-router";
import { useState } from "react";
import "../global.css";

export default function RootLayout() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const router = useRouter();
  const pathname = usePathname();

  // useEffect(() => {
  //   let isMounted = true;

  //   const init = async () => {
  //     const { data } = await supabase.auth.getSession();
  //     if (isMounted) setSession(data.session);

  //     supabase.auth.onAuthStateChange((_event, session) => {
  //       if (isMounted) setSession(session);
  //     });
  //   };

  //   init();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  // useEffect(() => {
  //   if (session === undefined) return;

  //   if (!session && pathname !== "/(auth)/welcome") {
  //     router.replace("/(auth)/welcome");
  //   }

  //   if (session && pathname === "/(auth)/welcome") {
  //     router.replace("/onboarding");
  //   }
  //   if (session && pathname !== "/onboarding") {
  //     router.replace("/onboarding");
  //   }
  // }, [session, pathname]);

  // if (session === undefined) return null;

  return (
    // <BottomSheetModalProvider>
    <Slot />
    // </BottomSheetModalProvider>
  );
}
