import useRootStore from "@/store/root";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function useProtection(userRole: "landlord" | "renter") {
  const router = useRouter();
  const userR = useRootStore((state) => state.userRole);

  useEffect(() => {
    // Check if the current path includes the user type
    const isOnUserTypeRoute = router.asPath.includes(`/${userRole}`);

    // Redirect to home page if on a userType route and not a userType
    if (isOnUserTypeRoute && userR !== userRole) {
      router.push("/");
    }
  }, [router, userR, userRole]);
}
