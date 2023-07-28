import React, { createContext, useContext, useState } from 'react';
import { UserInterface } from '@/interfaces';
import CryptoJS from 'crypto-js';

// Secret key for encryption/decryption
const secretKey = import.meta.env.VITE_APP_CRYPO_SECRET_KEY;

// Define a generic interface for the authenticated user object
interface AuthenticatedUser<User> {
  user: User | null; // Holds the user object if authenticated, otherwise null
  updateUser: (updatedUser: Partial<User>) => void; // Function to update the user object
  csrfToken: () => Promise<boolean>; // Function to generate CSRF token for guest methods
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Function to set the user object in the state
  deleteUser: () => void
}

// Function to decrypt the user object
const decryptUser = (encryptedUser: string) => {
  try {
    if (!encryptedUser) {
      console.error("Encrypted user data is empty.");
      return null;
    }

    const bytes = CryptoJS.AES.decrypt(encryptedUser, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedData) {
      console.error("Decrypted user data is empty.");
      return null;
    }

    const decryptedUser = JSON.parse(decryptedData) as UserInterface;
    return decryptedUser;
  } catch (error) {
    console.error("Error decrypting user:", error);
    console.log("Encrypted User:", encryptedUser); // Log the encryptedUser for debugging
    return null;
  }
};

// Create the AuthContent context with the generic interface
const AuthContent = createContext<AuthenticatedUser<UserInterface>>({
  user: null, // Set the initial value to null when no user is authenticated
  updateUser: () => { }, // Initialize the updateUser function (to be updated later)
  csrfToken: async () => false, // Initialize the csrfToken function (to be updated later)
  setUser: () => { }, // Initialize the setUser function (to be updated later)
});

// Function to encrypt the user object
const encryptData = (user: UserInterface) => {
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(user), secretKey).toString();
  } catch (error) {
    console.error("Error encrypting user:", error);
    return null;
  }
};

// Authentication Provider component that wraps the application with authentication capabilities
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Get the stored user data from localStorage
  const storedUser = localStorage.getItem('user');

  // Initialize the 'user' state with the decrypted user data (if available) or null
  const [user, _setUser] = useState<UserInterface | null>(() => {

    try {
      if (storedUser) {
        const decryptedUser = decryptUser(storedUser);
        return decryptedUser;
      }
      return null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  });


  // set encrypted user to local storage
  const setUser = (user) => {
    if (user) {
      const encryptedUser = encryptData(user);
      localStorage.setItem('user', encryptedUser);
    } else {
      localStorage.removeItem('user');
    }
    _setUser(user);
  };


  // Function to update the user object and store it in localStorage
  const updateUser = (updatedUser: Partial<UserInterface>) => {
    if (user) {
      // Merge the updatedUser into the existing user object (excluding the token key)
      const updatedUserData = { ...user, ...updatedUser, token: user.token };

      // Encrypt the updated user object and store it in localStorage
      const encryptedUser = encryptData(updatedUserData);
      if (encryptedUser) {
        localStorage.setItem('user', encryptedUser);
      }

      // Update the 'user' state with the updated user object
      setUser(updatedUserData);
    }
  };

  // Function to generate CSRF token for guest methods (You may implement actual CSRF token generation logic here)
  const csrfToken = async () => {
    // await axios.get(import.meta.env.VITE_APP_BASE_API.replace(/api/, '').replace(/\/$/, '') + '/csrf-cookie');
    return false;
  };

  // Function to delete user data from localStorage and set the user to null
  const deleteUser = () => {
    localStorage.removeItem('user');
    _setUser(null);
  };


  // Provide the authentication data and functions to the children components
  return (
    <AuthContent.Provider value={{ user, updateUser, csrfToken, setUser, deleteUser }}>
      {children}
    </AuthContent.Provider>
  );
};

// Custom hook to access the authentication context
export const useAuth = () => {
  return useContext(AuthContent);
};
