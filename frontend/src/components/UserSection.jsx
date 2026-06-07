import { useState } from "react";
import UserTable from "./UserTable";

export default function UserSection({
  users,
  createUser
}) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = async () => {

    await createUser({
      name,
      email
    });

    setName("");
    setEmail("");
  };

  return (
    <div className="card">

      <h2>Users</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <button onClick={submit}>
        Create User
      </button>

      <UserTable users={users}/>
    </div>
  );
}