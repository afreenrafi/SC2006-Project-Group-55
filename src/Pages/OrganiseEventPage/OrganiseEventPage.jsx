import { React, useEffect as mapUseEffect, useRef, useState } from "react";
import Header from "../../Components/Header/Header";
import "./OrganiseEventPage.css";

const OrganiseEventPage = () => {
  // Global States
  // State for eventName
  const [getEventName, setEventName] = useState("");

  // State for eventDescription
  const [getEventDescription, setEventDescription] = useState("");

  // State for eventStartDate
  const [getEventStartDate, setEventStartDate] = useState("");

  // State for eventEndDate
  const [getEventEndDate, setEventEndDate] = useState("");

  // State for eventOpen
  const [getEventOpen, setEventOpen] = useState("");

  // State for eventClose
  const [getEventClose, setEventClose] = useState("");

  // State for eventPrice
  const [getEventPrice, setEventPrice] = useState("");

  // State for eventArtist
  const [getEventArtist, setEventArtist] = useState([]);
  const [getEventArtistInput, setEventArtistInput] = useState("");

  // Retrieve all artists from database
  const eventArtists = [
    "No Artists",
    "Adolphus",
    "Afreen",
    "Gwendalene",
    "Ting Hooi",
    "Venus",
    "LoremIpsum1",
    "LoremIpsum2",
  ];

  // State for eventLocation
  const [getEventLocation, setEventLocation] = useState("");
  const mapReference = useRef(null);
  const mapReferenceAutocomplete = useRef(null);
  const mapGeocoder = useRef(null);
  const map = useRef(null);

  // State for eventThumbnail
  const [getEventThumbnail, setEventThumbnail] = useState(null);

  // State for eventPermit
  const [getEventPermit, setEventPermit] = useState(null);

  // State for Form Validation
  const [formErrors, setFormErrors] = useState({}); // State to track form errors

  // Function for filtering eventArtist
  const filteredEventArtists = eventArtists.filter((artist) =>
    artist.toLowerCase().includes(getEventArtistInput.toLowerCase())
  );

  // Function for adding eventArtist
  const handleAddEventArtist = (artist) => {
    setEventArtist((prev) => [...prev, artist]);
    setEventArtistInput(""); // Clear input after adding
  };

  // Function for removing eventArtist
  const handleRemoveEventArtist = (artist) => {
    setEventArtist((prev) => prev.filter((a) => a !== artist));
  };

  // Functions for eventLocation
  mapUseEffect(() => {
    const initializeMap = () => {
      mapGeocoder.current = new window.google.maps.Geocoder();
      const singaporelatlng = new window.google.maps.LatLng(1.3521, 103.8198);
      const mapOptions = {
        zoom: 12,
        center: singaporelatlng,
      };
      map.current = new window.google.maps.Map(
        mapReference.current,
        mapOptions
      );
    };

    const initializeMapAutocomplete = () => {
      const input = document.getElementById("eventLocation");

      mapReferenceAutocomplete.current =
        new window.google.maps.places.Autocomplete(input, {
          types: ["geocode"],
          componentRestrictions: { country: "sg" },
        });

      mapReferenceAutocomplete.current.addListener("place_changed", () => {
        const place = mapReferenceAutocomplete.current.getPlace();
        if (place.geometry) {
          setEventLocation(place.formatted_address);
          map.current.setCenter(place.geometry.location);
          new window.google.maps.Marker({
            map: map.current,
            position: place.geometry.location,
          });
          mapCodeAddress(place.formatted_address);
        }
      });
    };

    const loadMap = () => {
      if (!window.google || !window.google.maps) {
        const mapScript = document.createElement("script");
        mapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD9kcy5IS19w8ZmgKlsi5Hgh66w28PSG0s&libraries=places`;
        mapScript.async = true;
        mapScript.defer = true;
        mapScript.onload = () => {
          initializeMap();
          initializeMapAutocomplete();
        };
        document.body.appendChild(mapScript);
      } else {
        initializeMap();
        initializeMapAutocomplete();
      }
    };

    loadMap();
  }, []);

  const mapCodeAddress = (selectedAddress) => {
    if (!selectedAddress) {
      alert("Please enter an address!");
      return;
    }

    mapGeocoder.current.geocode(
      { address: selectedAddress },
      (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          map.current.setCenter(results[0].geometry.location);
          new window.google.maps.Marker({
            map: map.current,
            position: results[0].geometry.location,
          });
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
  };

  // Function for Form Validation
  const validateForm = (formValues) => {
    const errors = {};

    // eventName
    errors.eventName = [];
    const validateEventName = formValues.eventName.trim();
    // Validates if eventName is only made up of whitespaces
    if (validateEventName.length === 0) {
      errors.eventName.push(
        "Event Name cannot be made up of only whitespaces!"
      );
    }

    // eventDescription
    errors.eventDescription = [];
    const validateEventDescription = formValues.eventDescription.trim();
    // Validates if eventDescription is only made up of whitespaces
    if (validateEventDescription.length === 0) {
      errors.eventDescription.push(
        "Event Description cannot be made up of only whitespaces!"
      );
    }

    // eventStartDate and eventEndDate
    errors.eventStartDate = [];
    errors.eventEndDate = [];
    const todayDate = new Date();

    // Validates if eventStartDate is smaller than today's date
    if (new Date(formValues.eventStartDate) < todayDate) {
      errors.eventStartDate.push(
        "Start Date cannot be earlier than Today's Date!"
      );
    }

    // Validates if eventEndDate is smaller than today's date
    if (new Date(formValues.eventEndDate) < todayDate) {
      errors.eventEndDate.push("End Date cannot be earlier than Today's Date!");
    }

    // Validates if eventStartDate is greater than eventEndDate
    if (
      new Date(formValues.eventStartDate) > new Date(formValues.eventEndDate)
    ) {
      errors.eventEndDate.push("End Date cannot be earlier than Start Date!");
    }

    // eventOpen and eventClose
    // None as some events will be overnight, hence does not make sense to check if eventOpen is greater than eventClose

    // eventPrice
    // Already validated using HTML Validation

    // eventArtist
    errors.eventArtist = [];

    // Validates if there are zero artists selected
    if (formValues.eventArtist.length === 0) {
      errors.eventArtist.push(
        "Please select 'No Artists' if there are no artists attending the event!"
      );
    }

    // Validates if there are artists selected including the 'No Artists' option
    if (
      formValues.eventArtist.length > 1 &&
      formValues.eventArtist.includes("No Artists")
    ) {
      errors.eventArtist.push(
        "Please deselect 'No Artists' as there are artists attending the event!"
      );
    }

    // eventLocation
    // None as there is autocomplete feature implemented as Users are entering the addresses

    // eventThumbnail
    errors.eventThumbnail = [];

    // Validates if eventThumbnail is of a valid file type
    const allowedThumbnailTypes = ["image/png", "image/jpeg", "image/gif"];
    if (
      allowedThumbnailTypes.includes(formValues.eventThumbnail.type) === false
    ) {
      errors.eventThumbnail.push(
        "Please upload a valid file type of either (.png, .jpeg or .gif)!"
      );
    }

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
  // Function for OrganiseEvent
  function OrganiseEvent(event) {
    // Prevents default form submission behavior
    event.preventDefault();

    // Retrieve all User's formValues
    const formValues = {
      eventName: getEventName,
      eventDescription: getEventDescription,
      eventStartDate: getEventStartDate,
      eventEndDate: getEventEndDate,
      eventOpen: getEventOpen,
      eventClose: getEventClose,
      eventPrice: getEventPrice,
      eventArtist: getEventArtist,
      eventLocation: getEventLocation,
      eventThumbnail: getEventThumbnail,
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
      alert(formValues.eventName);
      alert(formValues.eventDescription);
      alert(formValues.eventStartDate);
      alert(formValues.eventEndDate);
      alert(formValues.eventOpen);
      alert(formValues.eventClose);
      alert(formValues.eventPrice);
      alert(formValues.eventArtist.join(", "));
      alert(formValues.eventLocation);
      alert(
        formValues.eventThumbnail
          ? formValues.eventThumbnail.name
          : "No thumbnail uploaded"
      );
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
        <form onSubmit={OrganiseEvent}>
          <div className="row">
            {/* eventName */}
            <div className="mb-3 col-12">
              <label htmlFor="eventName" className="form-label h5">
                Name of Event:
              </label>
              <input
                type="text"
                className="form-control"
                id="eventName"
                value={getEventName}
                onChange={(e) => setEventName(e.target.value)}
                required
              />

              {/* Display eventName Errors (if any) */}
              {formErrors.eventName && formErrors.eventName.length > 0 && (
                <div className="alert alert-danger" role="alert">
                  {formErrors.eventName.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
            </div>

            {/* eventDescription */}
            <div className="mb-3 col-12">
              <label htmlFor="eventDescription" className="form-label h5">
                Description of Event:
              </label>
              <textarea
                className="form-control"
                id="eventDescription"
                value={getEventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                required
              ></textarea>

              {/* Display eventDescription Errors (if any) */}
              {formErrors.eventDescription &&
                formErrors.eventDescription.length > 0 && (
                  <div className="alert alert-danger" role="alert">
                    {formErrors.eventDescription.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                )}
            </div>

            {/* eventStartDate */}
            <div className="mb-3 col-6">
              <label htmlFor="eventStartDate" className="form-label h5">
                Start Date:
              </label>
              <input
                type="date"
                className="form-control"
                id="eventStartDate"
                value={getEventStartDate}
                onChange={(e) => setEventStartDate(e.target.value)}
                required
              />

              {/* Display eventStartDate Errors (if any) */}
              {formErrors.eventStartDate &&
                formErrors.eventStartDate.length > 0 && (
                  <div className="alert alert-danger" role="alert">
                    {formErrors.eventStartDate.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                )}
            </div>

            {/* eventEndDate */}
            <div className="mb-3 col-6">
              <label htmlFor="eventEndDate" className="form-label h5">
                End Date:
              </label>
              <input
                type="date"
                className="form-control"
                id="eventEndDate"
                value={getEventEndDate}
                onChange={(e) => setEventEndDate(e.target.value)}
                required
              />

              {/* Display eventEndDate Errors (if any) */}
              {formErrors.eventEndDate &&
                formErrors.eventEndDate.length > 0 && (
                  <div className="alert alert-danger" role="alert">
                    {formErrors.eventEndDate.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                )}
            </div>

            {/* eventOpen */}
            <div className="mb-3 col-6">
              <label htmlFor="eventOpen" className="form-label h5">
                Event opens at:
              </label>
              <input
                type="time"
                className="form-control"
                id="eventOpen"
                value={getEventOpen}
                onChange={(e) => setEventOpen(e.target.value)}
                required
              />

              {/* Display eventOpen Errors (if any) */}
              {formErrors.eventOpen && formErrors.eventOpen.length > 0 && (
                <div className="alert alert-danger" role="alert">
                  {formErrors.eventOpen.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
            </div>

            {/* eventClose */}
            <div className="mb-3 col-6">
              <label htmlFor="eventClose" className="form-label h5">
                Event closes at:
              </label>
              <input
                type="time"
                className="form-control"
                id="eventClose"
                value={getEventClose}
                onChange={(e) => setEventClose(e.target.value)}
                required
              />

              {/* Display eventClose Errors (if any) */}
              {formErrors.eventClose && formErrors.eventClose.length > 0 && (
                <div className="alert alert-danger" role="alert">
                  {formErrors.eventClose.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
            </div>

            {/* eventPrice */}
            <div className="mb-3 col-sm-12 col-xl-6">
              <label htmlFor="eventPrice" className="form-label h5">
                Event Price:
              </label>
              <div className="input-group">
                <span className="input-group-text">S$</span>
                <input
                  type="number"
                  className="form-control"
                  id="eventPrice"
                  min="0"
                  step="0.01"
                  value={getEventPrice}
                  onChange={(e) => setEventPrice(e.target.value)}
                  required
                />

                {/* Display eventPrice Errors (if any) */}
                {formErrors.eventPrice && formErrors.eventPrice.length > 0 && (
                  <div className="alert alert-danger" role="alert">
                    {formErrors.eventPrice.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tag Artists in Event */}
            <fieldset className="mb-3 col-sm-12 col-xl-6">
              <legend className="h5">Tag Artists</legend>

              {/* Search Input for Artists */}
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Type to filter artists"
                value={getEventArtistInput}
                onChange={(e) => setEventArtistInput(e.target.value)}
              />

              {/* Display Selected Artists */}
              <div className="mb-3 h5">
                {getEventArtist.map((artist, index) => (
                  <span key={index} className="badge text-bg-light me-2">
                    {artist}{" "}
                    <span
                      className="text-danger"
                      onClick={() => handleRemoveEventArtist(artist)}
                    >
                      {" "}
                      x{" "}
                    </span>
                  </span>
                ))}
              </div>

              {/* Display Filter Results for Artists */}
              <div
                className="mb-3 border border-1 rounded p-2 overflow-auto"
                style={{ maxHeight: "100px" }} // Set max height and scroll
              >
                {filteredEventArtists.map((artist) => (
                  <div className="form-check form-check-inline" key={artist}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`artist-${artist}`}
                      checked={getEventArtist.includes(artist)}
                      onChange={() => {
                        if (getEventArtist.includes(artist)) {
                          handleRemoveEventArtist(artist);
                        } else {
                          handleAddEventArtist(artist);
                        }
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`artist-${artist}`}
                    >
                      {artist}
                    </label>
                  </div>
                ))}
              </div>
              {formErrors.eventArtist && formErrors.eventArtist.length > 0 && (
                <div className="alert alert-danger" role="alert">
                  {formErrors.eventArtist.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
            </fieldset>

            {/* eventLocation */}
            <div className="mb-3 col-sm-12 col-xl-4">
              <label htmlFor="eventLocation" className="form-label h5">
                Location of Event:
              </label>
              <input
                type="text"
                className="form-control"
                id="eventLocation"
                value={getEventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                placeholder="Type to get suggestions"
                required
              />
              <div
                className="mt-3 ratio ratio-4x3"
                id="eventLocationMap"
                ref={mapReference}
              ></div>
            </div>

            {/* eventThumbnail */}
            <div className="mb-3 col-sm-12 col-xl-4">
              <label htmlFor="eventThumbnail" className="form-label h5">
                Event Thumbnail:
              </label>
              <input
                className="form-control"
                type="file"
                id="eventThumbnail"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => setEventThumbnail(e.target.files[0])}
                required
              />
              {formErrors.eventThumbnail &&
                formErrors.eventThumbnail.length > 0 && (
                  <div className="alert alert-danger" role="alert">
                    {formErrors.eventThumbnail.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                )}
              {getEventThumbnail && (
                <div className="mt-3 ratio ratio-4x3">
                  <img
                    className="img-fluid rounded"
                    src={URL.createObjectURL(getEventThumbnail)}
                    alt="Thumbnail Preview"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
            </div>

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

export default OrganiseEventPage;
