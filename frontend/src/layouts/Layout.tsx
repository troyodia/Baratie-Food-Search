import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Home Page/Hero";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const { pathname } = useLocation();
  return (
    <div className=" flex flex-col min-h-screen bg-black ">
      <Header />
      {(pathname === "/" || pathname === "/welcome") && <Hero />}
      <div className=" container mx-auto flex-1 py-10 font-mono">
        {children}
      </div>
      <Footer />
    </div>
  );
}
