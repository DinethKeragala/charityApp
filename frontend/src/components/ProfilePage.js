import React, { useEffect, useState } from "react";
import "./ProfilePage.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // ✅ Use the correct key from localStorage
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.error("No user ID found. Redirecting to login...");
        window.location.href = "/login";  // Redirect to login if not logged in
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/user/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched user data:", data);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Upload profile photo
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePhoto", image);
    formData.append("userId", userId);

    try {
      const response = await fetch("http://localhost:5000/api/upload-profile-photo", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Upload response:", result);
      setUser({ ...user, profile_photo: result.filePath });
      alert("Profile photo updated!");
    } catch (error) {
      console.error("Error uploading profile photo:", error.message);
    }
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-info">
        <h1>{user.full_name}</h1>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div className="profile-photo">
        <img 
          src={preview || `http://localhost:5000${user.profile_photo}`} 
          alt="Profile" 
          className="profile-img"
          onError={(e) => e.target.src = "/default-profile.png"}
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload Photo</button>
      </div>
    </div>
  );
};

export default Profile;
