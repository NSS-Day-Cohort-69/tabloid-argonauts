import { useEffect, useState } from "react";
import { getProfiles,  } from "../../managers/userProfileManager";
import { Link } from "react-router-dom";
import { Button, Table } from "reactstrap";

export default function UserProfileList() {
  const [userprofiles, setUserProfiles] = useState([]);

  const getUserProfiles = () => {
    getProfiles().then(setUserProfiles);
  };
  useEffect(() => {
    getUserProfiles();
  }, []);

  return (
    <>
      <h2>User Profile List</h2>
      <Table>
        <thead><tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>Information</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
          {userprofiles.map((p) => (
            <tr key={p.id}>
              <th scope="row">{`${p.firstName}`}</th>
              <td>{p.lastName}</td>
              <td>{p.userName}</td>
              <td><Link to={`/userprofiles/${p.id}`}>Details</Link></td>
              <td>
              {p.roles.includes("Admin") ? (
                  <Button color="danger">
                    <Link to={`/userprofiles/${p.id}/edit`} style={{ color: 'white', textDecoration: 'none' }}>
                      Demote
                    </Link>
                  </Button>
                ) : (
                  <Button color="success">
                    <Link to={`/userprofiles/${p.id}/edit`} style={{ color: 'white', textDecoration: 'none' }}>
                      Promote
                    </Link>
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    </>
  );
}
