import { WebSocketProvider } from "@/contexts/WebSocketProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-black px-[5%] pt-[100px] text-white">
      <WebSocketProvider
        url={process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080"}
      >
        {children}
      </WebSocketProvider>
    </div>
  );
}
