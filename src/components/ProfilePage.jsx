import { useState } from "react";
import { Edit2, User, Mail, Phone, Home, ImageIcon, LogOut, ChevronLeft } from "lucide-react";
import "./ProfilePage.css";

const ProfilePage = ({ user, onBack, onSignOut }) => {
  const [editMode, setEditMode] = useState(null);
  const [profile, setProfile] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    profileImage: user?.profileImage || null,
  });

  const [tempValue, setTempValue] = useState("");

  const startEdit = (field) => {
    setEditMode(field);
    setTempValue(profile[field] || "");
  };

  const saveEdit = (field) => {
    setProfile({ ...profile, [field]: tempValue });
    setEditMode(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile({ ...profile, profileImage: event.target?.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      onSignOut?.();
    }
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <button className="back-btn" onClick={onBack} aria-label="Back">
          <ChevronLeft size={24} />
        </button>
        <h1>My Profile</h1>
        <div />
      </header>

      <div className="profile-content">
        <div className="profile-left">
          {/* Profile Image Card */}
          <div className="profile-card image-card">
            <div className="profile-image-container">
              {profile.profileImage ? (
                <img src={profile.profileImage} alt="Profile" className="profile-image" />
              ) : (
                <div className="profile-image-placeholder">
                  <User size={48} />
                </div>
              )}
              <label className="image-upload-btn" title="Upload profile image">
                <ImageIcon size={20} />
                <input type="file" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
            <h2>{profile.firstName} {profile.lastName}</h2>
            <p className="username">{user?.name || "User"}</p>
          </div>

          {/* Sign Out Button */}
          <button className="signout-btn" onClick={handleSignOut}>
            <LogOut size={18} />
            Sign Out
          </button>
        </div>

        <div className="profile-right">
          {/* First Name */}
          <div className="profile-field">
            <div className="field-header">
              <label>First Name</label>
              {editMode !== 'firstName' && (
                <button
                  className="edit-icon-btn"
                  onClick={() => startEdit('firstName')}
                  title="Edit first name"
                >
                  <Edit2 size={16} />
                </button>
              )}
            </div>
            {editMode === 'firstName' ? (
              <div className="edit-mode">
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  placeholder="Enter first name"
                  autoFocus
                />
                <div className="edit-buttons">
                  <button className="save-btn" onClick={() => saveEdit('firstName')}>Save</button>
                  <button className="cancel-btn" onClick={() => setEditMode(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <p className="field-value">{profile.firstName || 'Not provided'}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="profile-field">
            <div className="field-header">
              <label>Last Name</label>
              {editMode !== 'lastName' && (
                <button
                  className="edit-icon-btn"
                  onClick={() => startEdit('lastName')}
                  title="Edit last name"
                >
                  <Edit2 size={16} />
                </button>
              )}
            </div>
            {editMode === 'lastName' ? (
              <div className="edit-mode">
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  placeholder="Enter last name"
                  autoFocus
                />
                <div className="edit-buttons">
                  <button className="save-btn" onClick={() => saveEdit('lastName')}>Save</button>
                  <button className="cancel-btn" onClick={() => setEditMode(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <p className="field-value">{profile.lastName || 'Not provided'}</p>
            )}
          </div>

          {/* Email */}
          <div className="profile-field read-only">
            <div className="field-header">
              <label>Email</label>
              <Mail size={16} className="field-icon" />
            </div>
            <p className="field-value">{profile.email || 'Not provided'}</p>
          </div>

          {/* Phone */}
          <div className="profile-field">
            <div className="field-header">
              <label>Phone Number</label>
              {editMode !== 'phone' && (
                <button
                  className="edit-icon-btn"
                  onClick={() => startEdit('phone')}
                  title="Edit phone"
                >
                  <Edit2 size={16} />
                </button>
              )}
            </div>
            {editMode === 'phone' ? (
              <div className="edit-mode">
                <input
                  type="tel"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter phone number"
                  autoFocus
                />
                <div className="edit-buttons">
                  <button className="save-btn" onClick={() => saveEdit('phone')}>Save</button>
                  <button className="cancel-btn" onClick={() => setEditMode(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <p className="field-value">{profile.phone || 'Not provided'}</p>
            )}
          </div>

          {/* Address */}
          <div className="profile-field">
            <div className="field-header">
              <label>Address</label>
              {editMode !== 'address' && (
                <button
                  className="edit-icon-btn"
                  onClick={() => startEdit('address')}
                  title="Edit address"
                >
                  <Edit2 size={16} />
                </button>
              )}
            </div>
            {editMode === 'address' ? (
              <div className="edit-mode">
                <textarea
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  placeholder="Enter your address"
                  rows="3"
                  autoFocus
                />
                <div className="edit-buttons">
                  <button className="save-btn" onClick={() => saveEdit('address')}>Save</button>
                  <button className="cancel-btn" onClick={() => setEditMode(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <p className="field-value">{profile.address || 'Not provided'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
