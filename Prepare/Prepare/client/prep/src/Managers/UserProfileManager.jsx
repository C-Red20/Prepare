const apiUrl = "https://localhost:7254/api/User";

export const login = (userObject) => {
  return fetch(`${apiUrl}/api/GetByEmail?email=${userObject.email}`)
  .then((r) => r.json())
    .then((userProfile) => {
      if(userProfile.id){
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        return userProfile
      }
      else{
        return undefined
      }
    });
};
export const logout = () => {
      localStorage.clear()
};

export const register = (userObject) => {
  return  fetch(`${apiUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  })
  .then((response) => response.json())
    .then((savedUserProfile) => {
      localStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
    });
};

export const getAllUserProfiles = async () => {
  try {
    const response = await fetch(`${apiUrl}/profiles`);
    if (!response.ok) {
      throw new Error("Failed to fetch user profiles");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user profiles:", error);
    throw error;
  }
};

export const getCurrentUserProfile = async () => {
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));

  if (!userProfile || !userProfile.id) {
    throw new Error("No user profile found");
  }

  try {
    const response = await fetch(`${apiUrl}/${userProfile.id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch current user profile");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching current user profile:", error);
    throw error;
  }
};
