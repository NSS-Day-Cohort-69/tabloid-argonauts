import { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { demoteUser, denyUser, getProfiles, promoteUser } from "../../managers/userProfileManager";
import { useNavigate } from "react-router-dom";

export default function AdminApproval({ loggedInUser }) {
  const [userProfiles, setUserProfiles] = useState([]);
  const navigate = useNavigate();

  const fetchUserProfiles = async () => {
    const profiles = await getProfiles();
    const profilesNeedingApproval = profiles.filter(profile => profile.approvalNeeded);
    setUserProfiles(profilesNeedingApproval);
  };

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  const promote = (id, profileId, userName, adminId, currentUser) => {
    if (currentUser === adminId) {
      window.alert("Another Administrator is required to approve this.");
    } else {
      if (window.confirm(`Are you sure you want to make ${userName} an Admin?`)) {
        promoteUser(id, profileId).then(() => {
          fetchUserProfiles();
        });
      }
    }
  };

  const demote = (id, profileId, userName, adminId, currentUser) => {
    if (currentUser === adminId) {
      window.alert("Another Administrator is required to approve this.");
    } else {
      if (window.confirm(`Are you sure you want to relieve ${userName} of their Admin duties?`)) {
        demoteUser(id, profileId).then(() => {
          fetchUserProfiles();
        });
      }
    }
  };

  const handleDeny = async (id) => {
    await denyUser(id);
    fetchUserProfiles();  // Re-fetch the list after denial
  };

  const handleNavigation = () => {
    navigate('/userprofiles');
  };

  return (
    <>
      <h2>User Profiles Needing Approval</h2>
      <Button onClick={handleNavigation}>
        Back
      </Button>
      <Table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Admin Action</th>
          </tr>
        </thead>
        <tbody>
          {userProfiles.map((profile) => (
            <tr key={profile.id}>
              <td>{profile.firstName}</td>
              <td>{profile.lastName}</td>
              <td>{profile.userName}</td>
              <td>
                {profile.roles.includes("Admin") ? (
                  <Button
                    color="danger"
                    onClick={() => {
                      demote(profile.identityUserId, profile.id, profile.userName, profile.idOfAdminApproved, loggedInUser.id);
                    }}
                  >
                    Approve Demotion
                  </Button>
                ) : (
                  <Button
                    color="success"
                    onClick={() => {
                      promote(profile.identityUserId, profile.id, profile.userName, profile.idOfAdminApproved, loggedInUser.id);
                    }}
                  >
                    Approve Promotion
                  </Button>
                )}
                <Button
                  color="warning"
                  onClick={() => {
                    handleDeny(profile.id);
                  }}
                >
                  Reject Request
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

