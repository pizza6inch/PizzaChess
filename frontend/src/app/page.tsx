import Test from "../components/Test";
import "@/app/global.css";

import { saveUser } from "@/app/actions/saveUser";

export default function Home() {
  const handleSaveUser = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    const result = await saveUser({ name, email });
    console.log(result);
  };

  return (
    <form action={handleSaveUser}>
      <label>
        Name:
        <input type="text" name="name" required />
      </label>
      <label>
        Email:
        <input type="email" name="email" required />
      </label>
      <button type="submit">Save User</button>
    </form>
  );
}
