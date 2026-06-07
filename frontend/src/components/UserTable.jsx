export default function UserTable({ users }) {

  return (
    <table>

      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>

      <tbody>

        {
          users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))
        }

      </tbody>

    </table>
  );
}