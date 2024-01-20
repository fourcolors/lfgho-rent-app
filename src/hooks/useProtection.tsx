import { useSIWE } from "connectkit";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function useProtection() {
  const router = useRouter();
  const { isSignedIn } = useSIWE();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/");
    }
  }, [router, isSignedIn]);
}
