import React, { useEffect, useState, useRef } from "react";
import "./ProfilePage.css";
import userDefault from './user.png'; // Import the default profile photo

const Profile = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [totalDonated, setTotalDonated] = useState(0);
  const [eventsParticipated, setEventsParticipated] = useState(0);

  // ✅ Use the correct key from localStorage
  const userId = localStorage.getItem("user_id");

  // Ref for the hidden file input
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.error("No user ID found. Redirecting to login...");
        window.location.href = "/login";  // Redirect to login if not logged in
        return;
      }

      try {
        // Fetch user profile data
        const userResponse = await fetch(`http://localhost:5000/api/user/${userId}`);
        if (!userResponse.ok) {
          throw new Error(`HTTP error! Status: ${userResponse.status}`);
        }
        const userData = await userResponse.json();
        console.log("Fetched user data:", userData);
        setUser(userData);

        // Fetch total donations
        const donationsResponse = await fetch(`http://localhost:5000/api/user/${userId}/total-donations`);
        if (!donationsResponse.ok) {
          throw new Error(`HTTP error! Status: ${donationsResponse.status}`);
        }
        const donationsData = await donationsResponse.json();
        setTotalDonated(donationsData.total_donated);

        // Fetch events participated
        const eventsResponse = await fetch(`http://localhost:5000/api/user/${userId}/events-participated`);
        if (!eventsResponse.ok) {
          throw new Error(`HTTP error! Status: ${eventsResponse.status}`);
        }
        const eventsData = await eventsResponse.json();
        setEventsParticipated(eventsData.events_participated);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Trigger file input when the profile image is clicked
  const handleImageClick = () => {
    fileInputRef.current.click();
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

      {/* New section for total donations and events participated */}
      <div className="profile-stats">
        <p><strong>Total Donated:</strong> ${totalDonated}</p>
        <p><strong>Events Participated:</strong> {eventsParticipated}</p>
      </div>

      <div className="profile-photo">
        {/* Profile image with click handler */}
        <img 
          src={preview || (user.profile_photo ? `http://localhost:5000${user.profile_photo}` : userDefault)} 
          alt="Profile" 
          className="profile-img"
          onClick={handleImageClick} // Trigger file input when clicked
          onError={(e) => e.target.src = userDefault} // Fallback to the default photo if there's an error
        />

        {/* Hidden file input */}
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          ref={fileInputRef} 
          style={{ display: "none" }} // Hide the file input
        />

        {/* Upload button */}
        <button onClick={handleUpload}>Upload Photo</button>
      </div>
    </div>
  );
};

export default Profile;