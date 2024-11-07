export const fetchEvents = async (searchQuery = "", eventGenre = "", eventType = "") => {
    try {
      // Construct the query parameters for the API call
      const queryParams = new URLSearchParams({
        q: searchQuery,
        eventGenre: eventGenre,
        eventType: eventType,
      }).toString();
  
      // Make the fetch request to the backend endpoint with the query parameters
      const response = await fetch(`http://10.0.2.2:5001/api/events/search?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Check if the response is ok (status 200-299)
      if (response.ok) {
        const data = await response.json();
        return data; // Returns an object with `events`, `page`, and `limit`
      } else if (response.status === 404) {
        console.warn("No events found!");
        return { message: "No events found!" };
      } else {
        throw new Error("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      return { error: "An error occurred while fetching events." };
    }
  };
  