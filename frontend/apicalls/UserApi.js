

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
        console.error("Registration failed:", error);
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
        return { success: true, sessionToken: data.sessionToken };
        } else {
        console.error("Login failed:", data.message || "Unknown error");
        return { success: false, error: data.message || "Unknown error" };
        }
    } catch (error) {
        console.error("Error:", error);
        return { success: false, error: error.message };
    }
};
  