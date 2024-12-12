import Test from "../components/Test";
import "@/app/global.css";

import { saveUser } from "@/app/actions/saveUser";

export default function Home() {
  const handleSaveUser = async () => {
    "use server";
    const name = "John Doe";
    const email = "test@gmail.com";

    console.log("Saving user:", { name, email });

    const result = await saveUser({ name, email });
    console.log(result);
  };

  return (
    <div>
      <h1>Save User</h1>
      <button onClick={handleSaveUser}>Click me</button>
    </div>
  );
}
