export const fetchAllEvents = async () => {
  try {
    const response = await fetch("http://localhost:5001/api/eventRoute"); // Replace with your backend URL

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const events = await response.json();
    // console.log("Fetched events:", events);
    return events;

  } catch (error) {
    console.error("Error fetching events:", error);
    return null;
  }
}

export const fetchEvents = async ({ searchQuery = "", eventGenre = "", eventType = "", limit = 10, page = 1 }) => {
    try {
      // Construct the query parameters for the API call
    //   const queryParams = new URLSearchParams({
    //     q: searchQuery,
    //     eventGenre: eventGenre,
    //     eventType: eventType,
    //     limit: limit.toString(),
    //     page: page.toString(),
    //   }).toString();
  
      // Make the fetch request to the backend endpoint with the query parameters
      const response = await fetch(`http://localhost:5001/api/eventRoute/search?q=${searchQuery}&eventGenre=${eventGenre}&eventType=${eventType}&limit=${limit}&page=${page}`, {
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
        return { message: "No events found!" + response.status };
      } else {
        throw new Error("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      return { error: "An error occurred while fetching events." };
    }
  };


  // Frontend API call to fetch event by ID
export const fetchEventById = async (eventId) => {
  try {
    const response = await fetch(`http://localhost:5001/api/eventRoute/${eventId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch event");
    }

    const event = await response.json();
    return event;

  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return null;
  }
};

// Function to fetch FAQs by eventId
export const fetchFaqByEventId = async (eventId) => {
  try {
    const response = await fetch(`http://localhost:5001/api/faqRoute/faq/event/${eventId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok){
      const faqs = await response.json();
      return {faqs: faqs, state: 'success'};
    }
    else if(response.status == 404 || response.json() == []){
      console.log("No faq found:", response.message);
      const faqs = await response.json();
      return { faqs: faqs, state: 'empty' };
    }
    else if(response.status == 400){
      console.log("Get faq failed:", response.message || "Unknown error");
      return { state: 'failed' };
    }
    else if (response.status == 500) {
      console.log('Network error, please try again later');
      return { state: 'unstable' };
    }

  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return null;
  }
};

// Function to fetch an FAQ item by faqItemId
export const fetchFaqItemById = async (faqItemId) => {
  try {
    const response = await fetch(`http://localhost:5001/api/faqRoute/faqitem/${faqItemId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok){
      const faqItem = await response.json();
      return {faqItem: faqItem, state: "success"};
    }
    else if(response.status == 404){
      console.log("No faq item found:", response.message);
      return { state: 'empty' };
    }
    else if (response.status == 500) {
      console.log('Network error, please try again later');
      return { state: 'unstable' };
    }

  } catch (error) {
    console.error('Error fetching FAQ item:', error);
    throw new Error('Failed to fetch FAQ item');
    // return null;
  }
};







  