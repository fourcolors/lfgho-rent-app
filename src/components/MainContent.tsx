import { ReactNode } from "react";

interface MainContentProps {
  children: ReactNode;
}

const MainContent = ({ children }: MainContentProps) => {
  return (
    <div className="flex flex-1 overflow-auto flex-col scroll-m-3 no-scrollbar pb-20">
      {children}
    </div>
  );
};

export default MainContent;
