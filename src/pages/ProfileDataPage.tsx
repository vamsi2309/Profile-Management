import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "@/context";
import ProfileTable from "@/components/Table";
import API_BASE_URL from "@/config";

interface Profile {
  id: number;
  name: string;
  email: string;
  age?: number;
}

const LOCAL_STORAGE_KEY = "profileData";

const fetchProfileData = async () => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data;
};

function ProfileData() {
  const { apiStatus, updateApiStatus } = useGlobalContext();
  const [openMenus, setOpenMenus] = useState<{ [key: number]: boolean }>({});
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const navigate = useNavigate();

  const handleDelete = useCallback(
    async (id: number) => {
      const person = prompt(
        "Are you sure you want to delete the profile with ID",
        `${id}`
      );
      if (!person) return;

      try {
        updateApiStatus({ isLoading: true, isSuccess: false });
        await axios.delete(`${API_BASE_URL}/${id}`);
        setProfiles((prevProfiles) =>
          prevProfiles.filter((profile) => profile.id !== id)
        );
        toast.success(`Profile with ID ${id} deleted successfully.`);
        updateApiStatus({ isLoading: false, isSuccess: true });
      } catch (error) {
        console.error("Error deleting profile:", error);
        updateApiStatus({ isLoading: false, isSuccess: false });
        toast.error(`${error}`);
      }
    },
    [updateApiStatus]
  );

  const handleEdit = useCallback(
    (id: number) => {
      navigate("/", { state: { id } });
    },
    [navigate]
  );

  const toggleMenu = useCallback((id: number) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        updateApiStatus({ isLoading: true, isSuccess: false });
        const data = await fetchProfileData();
        setProfiles(data);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        updateApiStatus({ isLoading: false, isSuccess: true });
      } catch (error) {
        console.error("Error fetching profile data:", error);
        updateApiStatus({ isLoading: false, isSuccess: false });
        toast.error(`${error}`);
      }
    };
    fetchData();
  }, []);

  const memoizedProfiles = useMemo(() => profiles, [profiles]);

  return (
    <div className="table-container">
      <h2>Profile Data</h2>
      <ProfileTable
        profiles={memoizedProfiles}
        openMenus={openMenus}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        toggleMenu={toggleMenu}
        isLoading={apiStatus.isLoading}
      />
    </div>
  );
}

export default ProfileData;
