import { useEffect, useState, useRef } from "react";
import PostCard from "./PostCard";
import { Audio } from 'react-loader-spinner';
import { FaScaleUnbalanced } from "react-icons/fa6";

function DisplayPostlist() {
  const [postList, setPostList] = useState([]);
  const [addBay, setAddBay] = useState(false);
  const [airport, setAirport] = useState('');
  const [loader, setLoader] = useState(false);

  const bayName = useRef(null);
  const bayType = useRef(null);
  const power = useRef(null);
  const cooling = useRef(null);
  const pbb = useRef(null);
  const status = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoader(true);
      try {
        const response = await fetch('http://localhost:5000/airport/all', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const { data } = await response.json();
        setPostList(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchPosts();
  }, []);

  async function submitHandler(e) {
    e.preventDefault();

    const formData = {
      name: bayName.current?.value || '',
      bay_type: bayType.current?.value || '',
      power: power.current?.value === 'yes',
      cooling: cooling.current?.value === 'yes',
      pbb: pbb.current?.value === 'yes',
      airport: airport
    };

    try {
      setLoader(true);
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
        setAirport("");
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
      {loader && (
        <div className="loader">
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      )}

      {addBay ? (
        <form className="form-body" onSubmit={submitHandler}>
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
          <button type="button" onClick={() => setAddBay(false)} className="btn btn-primary">Back</button>
          <button type="submit" className="btn btn-primary">Add Bay</button>
        </form>
      ) : (
        <div className="airportDisplay">
          {postList.length === 0 ? (
            <></>
            // <div className="noposts">
            //   <h1>There are No Airports to show. Maybe Create some?</h1>
            //   <button
            //     onClick={() => fetchPosts()}
            //     style={{ marginTop: "20px" }}
            //     type="button"
            //     className="btn btn-info"
            //   >
            //     Fetch some Posts through API
            //   </button>
            // </div>
          ) : (
            postList.map((singlePost) => (
              <PostCard setAddBay={setAddBay} setAirport={setAirport} key={singlePost.id} post={singlePost} />
            ))
          )}
        </div>
      )}
    </>
  );
}

export default DisplayPostlist;
