import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function LoginLayout({ children }: Props) {
  return (
    <main className="min-h-screen bg-black flex px-6">
      <div className="container mx-auto flex-1 items-center flex font-mono">
        {children}
      </div>
    </main>
  );
}
