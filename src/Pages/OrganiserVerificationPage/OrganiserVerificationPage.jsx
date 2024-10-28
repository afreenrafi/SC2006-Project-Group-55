import { React, useEffect as useState } from "react";
import Header from "../../Components/Header/Header";
import "./OrganiserVerificationPage.css";

const OrganiserVerificationPage = () => {
  // Global States
  // State for eventPermit
  const [getEventPermit, setEventPermit] = useState(null);

  // State for Form Validation
  const [formErrors, setFormErrors] = useState({}); // State to track form errors

  // Function for Form Validation
  const validateForm = (formValues) => {
    const errors = {};

    // eventPermit
    errors.eventPermit = [];

    // Validates if eventPermit is of a valid file type
    if (formValues.eventPermit.type.includes("application/pdf") === false) {
      errors.eventPermit.push("Please upload a valid file type of (.pdf)!");
    }

    setFormErrors(errors);

    // Loop through errors to ensure all arrays have zero errors
    for (const key in errors) {
      if (errors[key].length > 0) {
        // Return false if any error array has elements
        return false;
      }
    }
    // formValues are all valid
    return true;
  };

  // Main Function for Main HTML Webpage
  // Function for OrganiserVerification
  function OrganiserVerification(event) {
    // Prevents default form submission behavior
    event.preventDefault();

    // Retrieve all User's formValues
    const formValues = {
      eventPermit: getEventPermit
    };

    // Validate User's formValues
    const isValid = validateForm(formValues);
    console.log(isValid);
    // Return User to intial OrganiseEventPage to rectify errors
    if (!isValid) {
      alert("There are error(s) in your event details!\nPlease rectify them!");
      return;
    }
    // Organise New Event if User's formValues are valid
    else {
      alert(
        formValues.eventPermit
          ? formValues.eventPermit.name
          : "No permit uploaded"
      );
    }
  }

  // Main HTML Webpage
  return (
    <>
      {/* Import Header */}
      <Header />

      {/* Title of Page (OrganiseEventPage) */}
      <div className="container-fluid p-3 mb-2 bg-light-subtle fw-bold">
        <p className="fw-bold h4">OrganiseEventPage</p>
        <hr className="border-5 border-top border-warning"></hr>

        {/* Start of Form */}
        <form onSubmit={OrganiserVerification}>
          <div className="row">
            {/* eventPermit */}
            <div className="mb-3 col-sm-12 col-xl-4">
              <label htmlFor="eventPermit" className="form-label h5">
                Event Permit:
              </label>
              <input
                className="form-control"
                type="file"
                id="eventPermit"
                accept="application/pdf"
                onChange={(e) => setEventPermit(e.target.files[0])}
                required
              />
              {formErrors.eventPermit && formErrors.eventPermit.length > 0 && (
                <div className="alert alert-danger" role="alert">
                  {formErrors.eventPermit.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
              {getEventPermit && (
                <div className="mt-3">
                  <p>File Uploaded: {getEventPermit.name}</p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div class="mb-3 gap-3 d-flex justify-content-end">
              <a class="btn btn-outline-danger" type="submit" href="/home">
                Cancel
              </a>
              <input
                class="btn btn-outline-success"
                type="submit"
                value="Submit"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default OrganiserVerificationPage;
