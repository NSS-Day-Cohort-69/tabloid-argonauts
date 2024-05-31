import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile, getProfileWithRoles } from "../../managers/userProfileManager";
import { Card, CardBody, CardTitle } from "reactstrap";

export default function UserProfileDetails() {
  const [userProfile, setUserProfile] = useState();
  const [profileRoles, setProfileRoles] = useState();

  const { id } = useParams();

  useEffect(() => {
    getProfile(id).then(setUserProfile);
    getProfileWithRoles(id).then(setProfileRoles);
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
          <CardTitle tag="h5">User type: {profileRoles?.roles?.length > 0 ? profileRoles.roles.join(', ') : "Member"}</CardTitle>
        </CardBody>

      </Card>
    </>
  );
}
