import { createContext, useState, useEffect, useContext } from "react";

interface ProfileData {
  id: string | undefined;
  name: string;
  email: string;
  age?: number;
}

interface ApiStatus {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

const initialData: ProfileData = {
  id: undefined,
  name: "",
  email: "",
  age: undefined,
};

const AppContext = createContext<{
  profileData: ProfileData | null;
  apiStatus: ApiStatus;
  updateProfileData: (newData: ProfileData) => void;
  updateApiStatus: (newStatus: Partial<ApiStatus>) => void;
}>({
  profileData: initialData,
  apiStatus: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  updateProfileData: () => {},
  updateApiStatus: () => {},
});

const getInitialData = (): ProfileData | null => {
  const storedProfileData = localStorage.getItem("profileData");
  if (storedProfileData) {
    return JSON.parse(storedProfileData);
  }
  return null;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(
    getInitialData()
  );
  const [apiStatus, setApiStatus] = useState<ApiStatus>({
    isLoading: false,
    isError: false,
    isSuccess: false,
  });

  const updateProfileData = (newData: ProfileData) => {
    setProfileData(newData);
    localStorage.setItem("profileData", JSON.stringify(newData));
  };

  const updateApiStatus = (newStatus: Partial<ApiStatus>) => {
    setApiStatus((prevStatus) => ({ ...prevStatus, ...newStatus }));
  };

  return (
    <AppContext.Provider
      value={{
        profileData,
        apiStatus,
        updateProfileData,
        updateApiStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
