import Image from "next/image";
import WebSocketComponent from "./components/wsComponent";

export default function Home() {
  return (
    <div>
      <h1>Next.js WebSocket Example</h1>
      <WebSocketComponent />
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
    </div>
  );
}
