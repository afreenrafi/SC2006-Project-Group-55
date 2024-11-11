export const validateBookingRequestAPI = async (userId, eventId, bookingQuantity, eventTicketType) => {
    try {
      const response = await fetch('http://localhost:5001/api/bookingRoute/validateBookingRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          eventId,
          bookingQuantity,
          eventTicketType,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to validate booking request');
      }
  
      const data = await response.json();
      console.log('Validation successful:', data);
      return data; // Contains { message, data: { user, eventTicket, availableTickets } }
  
    } catch (error) {
      console.error('Error validating booking request:', error.message);
      throw error; // Re-throw to allow error handling by the caller
    }
  }


  export const createBookingAndSendEmailAPI = async (userId, eventId, bookingQuantity, eventTicketType, eventTicketPrice, attendingDate) => {
    try {
      console.log(userId+eventId+bookingQuantity+eventTicketType+eventTicketPrice+attendingDate);
      const response = await fetch('http://localhost:5001/api/bookingRoute/createBookingAndSendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          eventId,
          bookingQuantity,
          eventTicketType,
          eventTicketPrice,
          attendingDate
        }),
      });

      
  
      if (!response.ok) {
        // If the response is not successful, throw an error to handle in the catch block
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create booking');
      }
  
      // If the response is successful, parse and return the result
      const data = await response.json();
      console.log('Booking created successfully:', data);
      return data;
    } catch (error) {
      // Handle any errors (e.g., display an error message to the user)
      console.error('Error creating booking:', error.message);
      throw error; // rethrow the error if needed
    }
  }


export const getTicketBookedAPI = async (userId) => {
  try {
    const response = await fetch(`http://localhost:5001/api/bookingRoute/getTicketBooked/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.status)
    if(response.status == 404){
      console.log('No bookings available:');
      return [];
    }
    else if (!response.ok) {
      // If the response is not successful, throw an error to handle in the catch block
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to retrieve bookings');
    }
    

    // If the response is successful, parse and return the booking data
    const data = await response.json();
    console.log('Bookings retrieved successfully:', data);
    return data.bookings;

  } catch (error) {
    // Handle any errors (e.g., display an error message to the user)
    console.error('Error retrieving bookings:', error.message);
    throw error;
  }
};
    
  
  