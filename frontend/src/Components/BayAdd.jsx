import { useEffect, useRef, useState } from "react";
import { Audio } from 'react-loader-spinner';

function BayAdd() {
  const [airports, setAirports] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState("");
  const [loader, setLoader] = useState(false);
  const bayName = useRef();
  const bayType = useRef();
  const status = useRef();
  const power = useRef();
  const cooling = useRef();
  const pbb = useRef();

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

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      name: bayName.current?.value || '',
      bay_type: bayType.current?.value || '',
      power: power.current?.value === 'yes',
      cooling: cooling.current?.value === 'yes',
      pbb: pbb.current?.value === 'yes',
      airport: selectedAirport
    };

    setLoader(true);
    try {
      const response = await fetch('http://localhost:5000/bay/add', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.message) {
        setSelectedAirport("");
        bayName.current.value = "";
        bayType.current.value = "";
        power.current.value = "no";
        cooling.current.value = "no";
        pbb.current.value = "no";
        status.current.value = "";
      } else if (data.error) {
        console.log(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoader(false);
    }
  }

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
        <form className="form-body" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="airportSelect" className="form-label">Select Airport</label>
            <select
              id="airportSelect"
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
          <div className="mb-3">
            <label htmlFor="bayName" className="form-label">Bay Name</label>
            <input ref={bayName} type="text" className="form-control" id="bayName" required />
          </div>
          <div className="mb-3">
            <label htmlFor="bayType" className="form-label">Bay Type</label>
            <input ref={bayType} type="text" className="form-control" id="bayType" />
          </div>
          <div className="mb-3">
            <label htmlFor="power" className="form-label">Power</label>
            <select ref={power} className="form-control" id="power" defaultValue="no">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="cooling" className="form-label">Cooling</label>
            <select ref={cooling} className="form-control" id="cooling" defaultValue="no">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="pbb" className="form-label">PBB</label>
            <select ref={pbb} className="form-control" id="pbb" defaultValue="no">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <input ref={status} type="text" className="form-control" id="status" required />
          </div>
          <button type="submit" className="submit btn btn-primary">Add Bay</button>
        </form>
      )}
    </>
  );
}

export default BayAdd;
