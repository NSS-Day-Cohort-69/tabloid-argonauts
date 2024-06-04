import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProfile, requestUser } from "../../managers/userProfileManager";
import { Button, Card, CardBody, CardTitle, FormGroup } from "reactstrap";

export default function UserProfileEdit({ loggedInUser }) {
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const getUserProfile = () => {
    getProfile(id).then(setUserProfile);
  };

  useEffect(() => {
    getUserProfile(id);
  }, [id]); // Added `id` as a dependency

  const handleUserRequest = async (userId, adminId) => {
    try {
      if (userProfile.approvalNeeded) {
        alert("Request Already Pending.");
      } else {
        await requestUser(userId, adminId);
        alert("Request submitted successfully.");
        navigate('/userprofiles');
      }
    } catch (error) {
      console.error("Error requesting user:", error);
      alert("Failed to submit request. Please try again later.");
    }
  };

  const backtopage = () => {
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
        <FormGroup check></FormGroup>
        <CardBody>
          {userProfile.roles.includes("Admin") ? (
            <Button
              color="danger"
              onClick={() => handleUserRequest(userProfile.id, loggedInUser.id)}
            >
              Request Demotion
            </Button>
          ) : (
            <Button
              color="success"
              onClick={() => handleUserRequest(userProfile.id, loggedInUser.id)}
            >
              Request Promotion
            </Button>
          )}
          <Button color="secondary" onClick={backtopage} style={{ marginLeft: '10px' }}>
            Back
          </Button>
        </CardBody>
      </Card>
    </>
  );
}