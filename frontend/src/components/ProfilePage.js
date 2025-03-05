import React, { useEffect, useState, useRef } from "react";
import "./ProfilePage.css";
import userPic from "./user.png"; // Import the default profile picture

const Profile = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [totalDonated, setTotalDonated] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const fileInputRef = useRef(null);

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
        // Fetch user details
        const userResponse = await fetch(`http://localhost:5000/api/user/${userId}`);
        if (!userResponse.ok) {
          throw new Error(`HTTP error! Status: ${userResponse.status}`);
        }
        const userData = await userResponse.json();
        console.log("Fetched user data:", userData);
        setUser(userData);

        // Fetch user donations
        const donationsResponse = await fetch(`http://localhost:5000/api/donations/user/${userId}`);
        if (!donationsResponse.ok) {
          throw new Error(`HTTP error! Status: ${donationsResponse.status}`);
        }
        const donationsData = await donationsResponse.json();
        const totalDonatedAmount = donationsData.reduce((sum, donation) => sum + donation.amount, 0);
        setTotalDonated(totalDonatedAmount);

        // Fetch user events
        const eventsResponse = await fetch(`http://localhost:5000/api/events/user/${userId}`);
        if (!eventsResponse.ok) {
          throw new Error(`HTTP error! Status: ${eventsResponse.status}`);
        }
        const eventsData = await eventsResponse.json();
        setTotalEvents(eventsData.length);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
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

        {/* Profile Statistics Section */}
        <div className="profile-statistics">
          <h2>Profile Statistics</h2>
          <p><strong>Total Amount Donated:</strong> ${totalDonated.toFixed(2)}</p>
          <p><strong>Total Events Participated:</strong> {totalEvents}</p>
        </div>
      </div>

      <div className="profile-photo">
        <img 
          src={preview || (user.profile_photo ? `http://localhost:5000${user.profile_photo}` : userPic)} 
          alt="Profile" 
          className="profile-img"
          onClick={() => fileInputRef.current.click()}
          onError={(e) => e.target.src = userPic} // Fallback to default image if the profile photo fails to load
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <button onClick={handleUpload}>Upload Photo</button>
      </div>
    </div>
  );
};

export default Profile;