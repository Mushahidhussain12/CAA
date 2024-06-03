import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { Icon } from "@chakra-ui/react";

function Flights() {
  const [flightList, setFlightList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [bayList, setBayList] = useState({});

  const CircleIcon = (props) => (
    <Icon viewBox="0 0 200 200" {...props}>
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  );

  useEffect(() => {
    async function fetchFlights() {
      setLoader(true);
      try {
        const response = await fetch("http://localhost:5000/flight/all");
        const { data } = await response.json();
        setFlightList(data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setLoader(false);
      }
    }
    fetchFlights();
  }, []);

  const fetchBayAvailability = async (flightId) => {
    try {
      const flight = flightList.find((flight) => flight._id === flightId);
      if (!flight) {
        console.error("Flight not found");
        return;
      }
  
      const { ArrivalTime, DepartureTime } = flight;
      const airportId = "66562a0047d0b643f8e048db";
  
      // Convert ArrivalTime and DepartureTime to Date objects
      // const arrivalDate = new Date(ArrivalTime);
      // const departureDate = new Date(DepartureTime);
  
      // Check if ArrivalTime and DepartureTime are valid dates
      // if (isNaN(arrivalDate.getTime()) || isNaN(departureDate.getTime())) {
      //   console.error("Invalid date/time format");
      //   return;
      // }
  
      // Extract date, startTime, and endTime
      // const date = arrivalDate.toISOString().slice(0, 10);
      const startTime = ArrivalTime;
      const endTime = DepartureTime;
  
      const availabilityResponse = await fetch(
        "http://localhost:5000/bay/check-availability",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            airportId,
            startTime,
            endTime,
          }),
        }
      );
  
      const availabilityData = await availabilityResponse.json();
      setBayList((prevBayList) => ({
        ...prevBayList,
        [flightId]: availabilityData?.data || [],
      }));
    } catch (error) {
      console.error("Error fetching bay availability:", error);
    }
  };
  

  async function assignBayToFlight(flight, bayId) {
    try {
      const endTime = flight.DepartureTime; // Use flight's departure time as start time
      const startTime = flight.ArrivalTime; 
  
      await fetch("http://localhost:5000/bay/assign-flight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flightId:flight._id,
          bayId,
       
          startTime, // Complete date-time string
          endTime, // Complete date-time string
        }),
      });
  
      // Update the flight list to reflect the assigned bay
      setFlightList((prevFlightList) =>
      prevFlightList.map((flight1) =>
        flight1._id === flight._id ? { ...flight1, BayAssigned: bayId } : flight1
      )
    );
    
    } catch (error) {
      console.error("Error assigning bay to flight:", error);
    }
  }
  
  

  return (
    <>
      {loader ? (
        <div className="loader">
          <Audio height="80" width="80" radius="9" color="green" ariaLabel="loading" wrapperStyle={{}} wrapperClass="" />
        </div>
      ) : (
        <div>
          <div className="flight-container">
            {flightList.length === 0 ? (
              <div className="noposts">
                <h1>There are No Flights to show. Maybe Create some?</h1>
              </div>
            ) : (
              flightList.map((flight) => (
                <div key={flight._id} className="card card-outer" style={{ width: "100%", textAlign: "center" }}>
                  <div className="card-body">
                    <h5 style={{ color: "black", fontWeight: "bold" }} className="card-title">
                      Flight Number: {flight.FlightNumber}
                    </h5>
                    <p style={{ color: "black" }} className="card-text">
                      <b>Airline:</b> {flight.OperatorCode} <b>Destination:</b> {flight.ArrivalAirport}{" "}
                      <b>Arrival Time:</b> {new Date(flight.ArrivalTime)?.toLocaleString()}{" "}
                      <b>Departure Time:</b> {new Date(flight.DepartureTime)?.toLocaleString()}
                    </p>
                    <CircleIcon boxSize={8} color={flight.BayAssigned !== ''? "green.500" : "red.500"} />
                    
                    {flight.BayAssigned === '' && <div className="flightButtons">
                      <button className="submit btn btn-primary"  onClick={() => fetchBayAvailability(flight._id)}>Check Available Bays</button>
                      <select onChange={(e) => assignBayToFlight(flight, e.target.value)}>
                        <option value="">Select Bay</option>
                        {bayList[flight._id]?.map((bay) => (
                          <option key={bay._id} value={bay._id}>
                            {bay.name}
                          </option>
                        ))}
                      </select>
                      
                    </div> }
                    
                    
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Flights;
