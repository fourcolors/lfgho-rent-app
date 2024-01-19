import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ToggleProps {
  toggleState: (toggleState: boolean) => void;
}

export function Toggle({ toggleState }: ToggleProps) {
  const [toggle, setToggle] = useState(false);

  function handleToggle() {
    setToggle((toggle) => !toggle);
  }

  useEffect(() => {
    toggleState(toggle);
  }, [toggle, toggleState]);

  return (
    <div
      className="w-[200px] h-24 bg-gray-400  bg-opacity-40 flex justify-start rounded-[50px] p-2 cursor-pointer data-[toggled=true]:justify-end"
      data-toggled={toggle}
      onClick={handleToggle}
    >
      <motion.div
        style={{
          width: "80px",
          height: "80px",
          backgroundColor: "white",
          borderRadius: "50%",
        }}
        layout
        transition={spring}
      />
    </div>
  );
}

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};
