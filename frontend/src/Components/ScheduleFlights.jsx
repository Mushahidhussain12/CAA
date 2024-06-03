import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { Button } from "@chakra-ui/react";

function ScheduleFlights() {
  const [bays, setBays] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function fetchBays() {
      setLoader(true);
      try {
        const bayResponse = await fetch("http://localhost:5000/bay/all");
        const bayData = await bayResponse.json();
        
        const updatedBays = await Promise.all(bayData.data.map(async (bay) => {
          const flightDetails = await Promise.all(bay.schedule.map(async (flightSchedule) => {
            const flightResponse = await fetch(`http://localhost:5000/flight/${flightSchedule.flight}`);
            const flightData = await flightResponse.json();
            return flightData.data;
          }));
          bay.flightDetails = flightDetails;
          return bay;
        }));

        setBays(updatedBays);
      } catch (error) {
        console.error("Error fetching bays:", error);
      } finally {
        setLoader(false);
      }
    }
    fetchBays();
  }, []);

  const handleUnassignBay = async (bayId, flightId) => {
    console.log("bays before:", bays);
    try {
      const response = await fetch("http://localhost:5000/bay/unassign-flight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ bayId, flightId })
      });
      const data = await response.json();
      console.log(data.message);
      
      if (response.ok) {
        setBays(prevBays => prevBays.map(bay => {
          if (bay._id === bayId) {
            const newSchedule = bay.schedule.filter(schedule => schedule.flight !== flightId);
            const newFlightDetails = bay.flightDetails.filter(flight => flight._id !== flightId);
            return { ...bay, schedule: newSchedule, flightDetails: newFlightDetails };
          }
          return bay;
        }));
        console.log("bays after:", bays);
      } else {
        console.error("Error unassigning flight from bay:", data.error);
      }
    } catch (error) {
      console.error("Error unassigning flight from bay:", error);
    }
  };

  return (
    <>
      {loader ? (
        <div className="loader">
          <Audio height="80" width="80" radius="9" color="green" ariaLabel="loading" wrapperStyle={{}} wrapperClass="" />
        </div>
      ) : (
        <div>
          <div className="schedule-container">
            {bays.length === 0 ? (
              <div className="noposts">
                <h1>No bays available</h1>
              </div>
            ) : (
              bays.map((bay) => (
                <div key={bay._id} className="card card-outer" style={{ width: "100%", textAlign: "center" }}>
                  <div className="card-body">
                    <h5 style={{ color: "black", fontWeight: "bold" }} className="card-title">
                      Bay Name: {bay.name}
                    </h5>
                    <div style={{ color: "black" }} className="schedule">
                      <h6>Schedule:</h6>
                      {bay.flightDetails?.map((flight, index) => (
                        <div key={index} className="flight-schedule">
          
                          <p>Operator Code: {flight.OperatorCode}</p>
                          <p>Flight Number: {flight.FlightNumber}</p>
                          <p>Arrival Time: {flight.ArrivalTime}</p>
                          <p>Departure Time: {flight.DepartureTime}</p>
      
                          <Button colorScheme="red" variant="solid" onClick={() => handleUnassignBay(bay._id, flight._id)}>Unassign</Button>
                        </div>
                      ))}
                    </div>
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

export default ScheduleFlights;
