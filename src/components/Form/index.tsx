import React, { useEffect, useMemo } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./createUser.css";
import Loader from "@/components/Loader";

interface UserData {
  id?: string;
  name: string;
  email: string;
  age?: number;
}

interface UserFormProps {
  profileData: UserData;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string | null;
  isLoading: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  profileData,
  onChangeHandler,
  handleSubmit,
  error,
  isLoading,
}) => {
  const title = useMemo(
    () => (profileData?.id ? "Update User" : "Create User"),
    [profileData?.id]
  );

  if (isLoading) {
    return <Loader />;
  }
  return (
    <form onSubmit={handleSubmit} className="create-form">
      <h4
        style={{
          textAlign: "start",
          padding: "0px",
          margin: "0px",
          fontSize: "1.3rem",
          fontWeight: "bold",
        }}
      >
        {title}
      </h4>
      <div>
        <label>Name:</label>
        <br />
        <input
          type="text"
          name="name"
          value={profileData?.name}
          onChange={onChangeHandler}
          placeholder="Name"
          style={{
            width: "200px",
            height: "25px",
            borderRadius: "8px",
            padding: "4px 3px",
          }}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <br />
        <input
          type="email"
          name="email"
          value={profileData?.email}
          onChange={onChangeHandler}
          placeholder="Email"
          style={{
            width: "200px",
            height: "25px",
            borderRadius: "8px",
            padding: "4px 3px",
          }}
          required
        />
      </div>
      <div>
        <label>Age:</label>
        <br />
        <input
          type="number"
          name="age"
          value={profileData?.age}
          onChange={onChangeHandler}
          style={{
            width: "200px",
            height: "25px",
            borderRadius: "8px",
            padding: "4px 3px",
          }}
          placeholder="Age"
        />
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit" disabled={isLoading} className="sbt-btn">
        {isLoading ? "Submitting..." : title}
      </button>
    </form>
  );
};

export default UserForm;
