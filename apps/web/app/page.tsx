import { prisma } from "@repo/database";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const users = await prisma.user.findMany();

  async function createUser() {
    "use server"; // server action
    await prisma.user.create({
      data: {
        username: Math.random().toString(),
        password: Math.random().toString(),
      },
    });

    revalidatePath("/");
  }

  return (
    <div>
      <h1>All Users</h1>
      <div>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id}>
              <p>ID: {user.id}</p>
              <p>Username: {user.username}</p>
              <p>==========================================</p>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>

      <form action={createUser}>
        <button type="submit">Create new user</button>
      </form>
    </div>
  );
}
