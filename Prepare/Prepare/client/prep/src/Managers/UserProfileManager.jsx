const apiUrl = "https://localhost:7254/api/User";

export const login = async (userObject) => {
  try {
    const response = await fetch(`${apiUrl}/GetByEmail?email=${userObject.email}`);
    if (!response.ok) {
      throw new Error("Failed to log in");
    }
    const userProfile = await response.json();
    if (userProfile.id) {
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
      return userProfile;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.clear();
};

export const register = async (userObject) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    });
    if (!response.ok) {
      throw new Error("Failed to register user");
    }
    const savedUserProfile = await response.json();
    localStorage.setItem("userProfile", JSON.stringify(savedUserProfile));
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
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
  try {
    const response = await fetch(`${apiUrl}/current`);
    if (!response.ok) {
      throw new Error("Failed to fetch current user profile");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching current user profile:", error);
    throw error;
  }
};
