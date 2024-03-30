import { MobileSidebar } from "@/components/mobile-sidebar";

export const MobileHeader = () => {
  return (
    <div className="lg:hidden px-6 h-[50px] flex items-center bg-green-500 border-b fixed w-full z-50">
      <MobileSidebar />
    </div>
  );
};
