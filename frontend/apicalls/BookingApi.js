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
  
  