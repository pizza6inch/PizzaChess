import { WebSocketProvider } from "@/contexts/WebSocketProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <WebSocketProvider
        url={process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080"}
      >
        {children}
      </WebSocketProvider>
    </div>
  );
}
