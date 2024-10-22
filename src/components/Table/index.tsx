import React, { useMemo, useCallback } from "react";
import { FaEllipsisV } from "react-icons/fa";
import "./profiledata.css";
import Loader from "@/components/Loader";
import ProfileRow from "./profileRow";

interface Profile {
  id: number;
  name: string;
  email: string;
  age?: number;
}

interface ProfileTableProps {
  profiles: Profile[] | Profile;
  openMenus: { [key: number]: boolean };
  isLoading: boolean;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
  toggleMenu: (id: number) => void;
}

// Memoize individual profile rows for optimization
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

  // Use memoization for the rendering of profile rows
  const renderProfiles = useMemo(() => {
    if (!Array.isArray(profiles) && profiles !== null) {
      return (
        <ProfileRow
          profile={profiles}
          openMenus={openMenus}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          toggleMenu={toggleMenu}
        />
      );
    }

    return (profiles as Profile[]).map((profile) => (
      <ProfileRow
        key={profile.id}
        profile={profile}
        openMenus={openMenus}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        toggleMenu={toggleMenu}
      />
    ));
  }, [profiles, openMenus, handleEdit, handleDelete, toggleMenu]);

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
      <tbody>{renderProfiles}</tbody>
    </table>
  );
};


export default React.memo(ProfileTable);
