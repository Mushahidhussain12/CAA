import { useEffect, useState } from "react";
import { Audio } from 'react-loader-spinner';

function BayDisplay() {
  const [airports, setAirports] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState("");
  const [bayList, setBayList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function fetchAirports() {
      setLoader(true);
      try {
        const response = await fetch('http://localhost:5000/airport/all');
        const { data } = await response.json();
        setAirports([...data]);
      } catch (error) {
        console.error('Error fetching airports:', error);
      } finally {
        setLoader(false);
      }
    }
    fetchAirports();
  }, []);

  useEffect(() => {
    async function fetchBays() {
      if (selectedAirport) {
        setLoader(true);
        try {
          const response = await fetch(`http://localhost:5000/bay/airport/${selectedAirport}`);
          const { data } = await response.json();
          setBayList(data || []);
        } catch (error) {
          console.error('Error fetching bays:', error);
        } finally {
          setLoader(false);
        }
      } else {
        setBayList([]);
      }
    }
    fetchBays();
  }, [selectedAirport]);

  return (
    <>
      {loader ? (
        <div className="loader">
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="flight-container">
          <div className="mb-3">
            <select
              id="airportSelect"
              style={{ marginLeft: "380px", marginTop: "40px", marginBottom: "40px" }}
              className="form-control"
              value={selectedAirport}
              onChange={(e) => setSelectedAirport(e.target.value)}
              required
            >
              <option value="" disabled>Select an airport</option>
              {airports?.map((airport) => (
                <option key={airport._id} value={airport._id}>
                  {airport.AirportName}
                </option>
              ))}
            </select>
          </div>
          <div>
            {bayList?.length === 0 ? (
              <div className="noposts">
                <h1>There are No Bays to show. Maybe Create some?</h1>
              </div>
            ) : (
              <div className="flight-container">
                {bayList?.map((bay) => (
                  <div key={bay._id} className="card card-outer" style={{ width: "100%", textAlign: "center" }}>
                    <div className="card-body">
                      <h5 style={{ color: "black", fontWeight: "bold" }} className="card-title">Bay Name: {bay.name}</h5>
                      <p style={{ color: "black" }} className="card-text">
                        <b>Bay Type:</b> {bay.bay_type} || <b>Power:</b> {bay.power ? 'Yes' : 'No'} || <b>Cooling:</b> {bay.cooling ? 'Yes' : 'No'} || <b>PBB:</b> {bay.pbb ? 'Yes' : 'No'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default BayDisplay;
