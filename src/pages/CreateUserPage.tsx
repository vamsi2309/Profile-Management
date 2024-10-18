import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/context";
import UserForm from "@/components/Form";
import { toast } from "react-toastify";
import React from "react";
import API_BASE_URL from "@/config";

interface UserData {
  id?: string; // Optional during updates
  name: string;
  email: string;
  age?: number;
}

function CreateUser() {
  const { profileData, apiStatus, updateProfileData, updateApiStatus } = useGlobalContext();
  const [isProfileFetched, setIsProfileFetched] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.id;

  const [error, setError] = useState<string | null>(null);
  const LOCAL_STORAGE_KEY = "profileData";

  const updateLocalStorage = (newProfiles: UserData[]) => {
    const storedProfiles = localStorage.getItem(LOCAL_STORAGE_KEY);
    const profilesArray = storedProfiles ? JSON.parse(storedProfiles) : [];
    const updatedProfiles = [...profilesArray, ...newProfiles];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedProfiles));
  };

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      const updatedProfileData: UserData = {
        id: profileData?.id ?? "", // Default to an empty string if id is undefined
        name: profileData?.name || "",
        email: profileData?.email || "",
        age: profileData?.age,
        [name]: name === "age" ? (value ? Number(value) : undefined) : value,
      };

      console.log("Updated Profile Data:", updatedProfileData);
      updateProfileData(updatedProfileData);
      if (error) setError(null);
    },
    [profileData, error, updateProfileData]
  );
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!profileData) return; // Optionally handle this case earlier if profileData is critical

      if (profileData.name.trim().length < 3) {
        setError("Name is required and must be at least 3 characters.");
        toast.error("Name is required and must be at least 3 characters.");
        return;
      }

      if (!validateEmail(profileData.email)) {
        setError("Email is required and must be in a valid format.");
        toast.error("Email is required and must be in a valid format.");
        return;
      }

      try {
        updateApiStatus({ isLoading: true, isError: false, isSuccess: false });

        if (profileData.id) {
          await axios.put(`${API_BASE_URL}/${profileData.id}`, profileData);
          updateLocalStorage([profileData]);
          toast.success("Profile updated successfully");
        } else {
          const newProfile: UserData = {
            id: String(Date.now()), // Unique ID generation for new profiles
            name: profileData.name,
            email: profileData.email,
            age: profileData.age,
          };
          await axios.post(`${API_BASE_URL}`, newProfile);
          updateProfileData(newProfile);
          updateLocalStorage([newProfile]);
          toast.success("Profile created successfully");
        }

        updateApiStatus({ isLoading: false, isSuccess: true });
        navigate("/profile-data");
      } catch (error) {
        console.error("Error saving profile:", error);
        updateApiStatus({ isLoading: false, isError: true });
        toast.error(`${error}`);
      }
    },
    [
      profileData,
      validateEmail,
      updateApiStatus,
      updateProfileData,
      updateLocalStorage,
      navigate,
    ]
  );

  const fetchProfileData = () => {
    try {
      updateApiStatus({ isLoading: true, isError: false, isSuccess: false });
      const storedProfiles = localStorage.getItem(LOCAL_STORAGE_KEY);
      const data = storedProfiles ? JSON.parse(storedProfiles) : null;

      if (Array.isArray(data)) {
        const profile = data.find((profile: any) => profile.id === id);
        if (profile) {
          const validProfile: UserData = {
            id: profile.id || "", // Default to empty string if id is undefined
            name: profile.name,
            email: profile.email,
            age: profile.age,
          };
          updateProfileData(validProfile);
          updateApiStatus({ isLoading: false, isSuccess: true });
          setIsProfileFetched(true);
        } else {
          console.error("No matching profile found.");
          updateApiStatus({ isLoading: false, isError: true });
          toast.error("Profile not found.");
        }
      } else if (data && data.id === id) {
        updateProfileData(data);
        updateApiStatus({ isLoading: false, isSuccess: true });
        setIsProfileFetched(true);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      updateApiStatus({ isLoading: false, isError: true });
      toast.error("An error occurred while fetching profile data.");
    }
  };

  useEffect(() => {
    if (id && !isProfileFetched) {
      fetchProfileData();
    }
  }, [id, isProfileFetched]);

  return (
    <UserForm
      profileData={profileData || { id: "", name: "", email: "", age: undefined }} // Provide a default value here too
      onChangeHandler={onChangeHandler}
      handleSubmit={handleSubmit}
      error={error}
      isLoading={apiStatus.isLoading}
    />
  );
}

export default CreateUser;
