import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../../managers/userProfileManager";
import { Card, CardBody, CardTitle } from "reactstrap";

export default function UserProfileDetails() {
  const [userProfile, setUserProfile] = useState();

  const { id } = useParams();

  useEffect(() => {
    getProfile(id).then(setUserProfile);
  }, [id]);

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
        <CardBody>
          <CardTitle tag="h5">User since: {userProfile.createDateTime}</CardTitle>
        </CardBody>
        <CardBody>
          <CardTitle tag="h5">User type: {userProfile?.roles?.length > 0 ? userProfile.roles.join(', ') : "Member"}</CardTitle>
        </CardBody>

      </Card>
    </>
  );
}
