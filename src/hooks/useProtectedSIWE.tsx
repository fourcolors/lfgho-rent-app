import { useSIWE } from "connectkit";
import { useRouter } from "next/router";

const useProtectedSIWE = () => {
  const { isSignedIn, ...hookVariables } = useSIWE();
  const router = useRouter();

  if (isSignedIn) {
    return { isSignedIn, ...hookVariables };
  } else {
    router.push("/");
    return null;
  }
};

export default useProtectedSIWE;
