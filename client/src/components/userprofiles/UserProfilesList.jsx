import { useEffect, useState } from "react";
import { getProfiles, toggleUserActiveStatus, } from "../../managers/userProfileManager";
import { Link, useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";

export default function UserProfileList() {
  const [userprofiles, setUserProfiles] = useState([]);
  const [viewDeactivated, setViewDeactivated] = useState(false);
  const navigate = useNavigate()

  const getUserProfiles = () => {
    getProfiles().then(setUserProfiles);
  };
  useEffect(() => {
    getUserProfiles();
  }, []);

  const toggleActiveStatus = (id) => {
    if (window.confirm("Are you sure you want to change the active status of this user?")) {
      toggleUserActiveStatus(id).then(() => {
        getUserProfiles();
      });
    }
  };

  const toggleView = () => {
    setViewDeactivated(!viewDeactivated);
  };

  const handleNavigation = () => {
    navigate('/userprofiles/pending')
  }

  return (
    <>
      <h2>User Profile List</h2>
      <Button onClick={toggleView}>
        {viewDeactivated ? "View Active" : "View Deactivated"}
      </Button>
      <span>  </span>
      <Button onClick={handleNavigation}>
        Pending Requests
      </Button>
      <Table>
        <thead><tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>Information</th>
          <th>Status Action</th>
          <th>Admin Action</th>
        </tr>
        </thead>
        <tbody>
          {userprofiles.filter(p => p.isActive === !viewDeactivated).map((p) => (
            <tr key={p.id}>
              <th scope="row">{`${p.firstName}`}</th>
              <td>{p.lastName}</td>
              <td>{p.userName}</td>
              <td><Link to={`/userprofiles/${p.id}`}>Details</Link></td>
              <td>
                {p.isActive ? (
                  <Button color="danger"
                    onClick={() => {
                      toggleActiveStatus(p.id);
                    }}>Deactivate</Button>
                ) : (<Button color="success"
                  onClick={() => {
                    toggleActiveStatus(p.id);
                  }}>Reactivate</Button>)
                }
              </td>
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
