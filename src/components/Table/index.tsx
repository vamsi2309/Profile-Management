import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import "./profiledata.css";
import Loader from "@/components/Loader";

interface Profile {
  id: number;
  name: string;
  email: string;
  age?: number;
}

interface ProfileTableProps {
  profiles: Profile[];
  openMenus: { [key: number]: boolean };
  isLoading: boolean;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
  toggleMenu: (id: number) => void;
}

const ProfileTable: React.FC<ProfileTableProps> = ({
  profiles,
  openMenus,
  isLoading,
  handleEdit,
  handleDelete,
  toggleMenu,
}) => {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {profiles.map((profile) => (
          <tr key={profile.id}>
            <td data-label="ID">{profile.id}</td>
            <td data-label="Name">{profile.name}</td>
            <td data-label="Email">{profile.email}</td>
            <td data-label="Age">
              {profile.age !== undefined ? profile.age : "N/A"}
            </td>
            <td data-label="Actions">
              <div className="actions-container">
                <button
                  className="ellipsis-button"
                  onClick={() => toggleMenu(profile.id)}
                >
                  <FaEllipsisV />
                </button>
                {openMenus[profile.id] && (
                  <div className="actions-menu">
                    <button onClick={() => handleEdit(profile.id)}>
                      Edit Profile
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(profile.id)}
                    >
                      Delete Profile
                    </button>
                  </div>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProfileTable;
