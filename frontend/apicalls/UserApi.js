

export const registerUser = async (email, age, name, username, role, password, eventPermitId = null, artistVerified = false) => {
    // Prepare JSON object with the form fields
    const jsonData = {
        userId: username,
        userName: name,
        userPassword: password,
        userEmail: email,
        userAge: age,
        userRole: role,
    };

    // Append role-specific data if needed
    if (role === "Organiser" && eventPermitId) {
        jsonData.organiserEventPermitId = eventPermitId;
    } else if (role === "Artist") {
        jsonData.artistVerified = artistVerified;
    }
    console.log("going to called register backend");

    try {
        const response = await fetch("http://localhost:5001/api/authRoute/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData), // Send JSON-encoded data
        });

        const message = await response.json();
        console.log(response.status);
        if (response.ok) {
            console.log("User registered successfully:", message);
            return "success";
            // Navigate or handle success
        } 
        else if(response.status == 400){
            return "taken";
        }
        // else {
        // console.error("Registration failed:", message.message || "Unknown error");
        // }
    } catch (error) {
        console.log("Registration failed:", error);
        return "failed";
    }
};


export const loginUser = async (userId, userPassword) => {
    const jsonData = {
        userId,
        userPassword,
    };

    try {
        const response = await fetch("http://localhost:5001/api/authRoute/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData), // Send JSON-encoded data
        });

        const data = await response.json();
        if (response.ok) {
          console.log("Login successful:", data);
          return { success: true, sessionToken: data.sessionToken, state:"success" };
        } else if(response.status == 404 || response.status == 401){
          console.log("Login failed:", data.message || "Unknown error");
          return { success: false, error: data.message || "Unknown error", state:"invalid" };
        }
    } catch (error) {
        console.log("Error:", error);
        return { success: false, error: error.message, state:"failed" };
    }
};


export const fetchUserById = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/userRoute/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("User not found!");
        } else {
          throw new Error("Internal Server Error Occurred!");
        }
      }
  
      const userData = await response.json();
      return userData;
  
    } catch (error) {
      console.error("Error fetching user:", error);
      return { error: error.message };
    }
  };

  // Frontend API call to delete a user by ID
  export const deleteUserById = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/userRoute/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if the response is successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete user');
      }

      const result = await response.json();
      console.log(result.message);
      return result;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error; // Re-throw the error for handling in the calling code
    }
  };



  
  