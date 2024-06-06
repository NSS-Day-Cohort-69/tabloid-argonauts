import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editProfile, getProfile } from "../../managers/userProfileManager";

export const EditMyProfile = () => {
  const { userId } = useParams();

  const [selectedFile, setSelectedFile] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [profile, setProfile] = useState({});

  const navigate = useNavigate();

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    getProfile(parseInt(userId)).then((profile) => {
      setProfile(profile);
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setEmail(profile.email);
      setUsername(profile.userName);
    });
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("username", userName);
    formData.append("email", email);

    try {
      const response = await editProfile(formData, parseInt(userId));
      console.log('Response:', response);  // Debug logging
      navigate('/profile')

    } catch (error) {
      console.error("There was an error uploading the file!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Email Address:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input type="file" onChange={fileSelectedHandler} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};