import React from "react";
import { FaEllipsisV } from "react-icons/fa";

interface Profile {
    id: number;
    name: string;
    email: string;
    age?: number;
}

const ProfileRow: React.FC<{
    profile: Profile;
    openMenus: { [key: number]: boolean };
    handleEdit: (id: number) => void;
    handleDelete: (id: number) => void;
    toggleMenu: (id: number) => void;
}> = React.memo(({ profile, openMenus, handleEdit, handleDelete, toggleMenu }) => {
    return (
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
    );
});
export default ProfileRow;