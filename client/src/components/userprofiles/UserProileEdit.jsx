import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { demoteUser, getProfile, getProfileWithRoles, promoteUser } from "../../managers/userProfileManager";
import { Button, Card, CardBody, CardTitle, FormGroup, Input, Label } from "reactstrap";

export default function UserProfileEdit() {
  const [userProfile, setUserProfile] = useState();
  const [profileRole, setProfileRole] = useState();
  const [pendingRoleChange, setPendingRoleChange] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate()
  const { id } = useParams();

  useEffect(() => {
    getProfile(id).then(setUserProfile);
    getProfileWithRoles(id).then(data => {
      setProfileRole(data);
      setIsAdmin(data?.roles.includes("Admin"));
    });
  }, [id]);

  const handleCheckboxChange = () => {
    setIsAdmin(!isAdmin);
    setPendingRoleChange(!isAdmin ? "promote" : "demote");
  };

  const saveChanges = async () => {
    try {
      if (pendingRoleChange === "promote") {
        await promoteUser(profileRole.identityUserId);
      } else if (pendingRoleChange === "demote") {
        await demoteUser(profileRole.identityUserId);
      }
      
      const updatedProfile = await getProfileWithRoles(id);
      setProfileRole(updatedProfile);
  
      navigate('/userprofiles');
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const cancelEdit = () => {
    navigate('/userprofiles');
  };

  if (!userProfile) {
    return null;
  }
  return (
    <>
      <Card
        key={id}
        style={{
          width: "25rem",
        }}
      >
        <img alt={userProfile.firstName} src={userProfile.imageLocation} />
        <CardBody>
          <CardTitle tag="h5">Name: {userProfile.fullName}</CardTitle>
        </CardBody>
        <CardBody>
          <CardTitle tag="h5">Username: {userProfile.userName}</CardTitle>
        </CardBody>
        <CardBody>
          <CardTitle tag="h5">Email: {userProfile.email}</CardTitle>
        </CardBody>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              checked={isAdmin}
              onChange={handleCheckboxChange}
            />{' '}
            Admin
          </Label>
        </FormGroup>
        <CardBody>
          <Button color="primary" onClick={saveChanges} disabled={pendingRoleChange === null}>
            Save
          </Button>
          <Button color="secondary" onClick={cancelEdit} style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </CardBody>
      </Card>
    </>
  );
}