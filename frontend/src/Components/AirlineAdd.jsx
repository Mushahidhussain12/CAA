import { useRef, useState } from "react";
import { Audio } from 'react-loader-spinner';

function AirlineAdd() {
  const [loader, setLoader] = useState(false);
  const operatorCode = useRef();
  const name = useRef();
  const iataCode = useRef();
  const isHajjRegistered = useRef();
  const isHajjProceed = useRef();
  const scheduleFileNo = useRef();
  const sectionFileNo = useRef();
  const email = useRef();
  const status = useRef();
  const [duration, setDuration] = useState('02:30');

  function durationHandler(e) {
    const minutes = parseInt(e.target.value);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMins = mins < 10 ? `0${mins}` : mins;
    setDuration(`${formattedHours}:${formattedMins}`);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      OperatorCode: operatorCode.current?.value || '',
      Name: name.current?.value || '',
      IataCode: iataCode.current?.value || '',
      isHajjRegistered: isHajjRegistered.current?.checked || false,
      isHajjProceed: isHajjProceed.current?.value || '',
      ScheduleFileNo: scheduleFileNo.current?.value || '',
      SectionFileNo: sectionFileNo.current?.value || '',
      Email: email.current?.value || '',
      Status: status.current?.value || '',
      duration: parseInt(duration.split(':')[0]) * 60 + parseInt(duration.split(':')[1]),
    };

    setLoader(true);
    try {
      const response = await fetch('http://localhost:5000/airline/add', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.message) {
        operatorCode.current.value = "";
        name.current.value = "";
        iataCode.current.value = "";
        isHajjRegistered.current.checked = false;
        isHajjProceed.current.value = "";
        scheduleFileNo.current.value = "";
        sectionFileNo.current.value = "";
        email.current.value = "";
        status.current.value = "";
        setDuration('00:00');
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
            <label htmlFor="operatorCode" className="form-label">Operator Code</label>
            <input ref={operatorCode} type="text" className="form-control" id="operatorCode" />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input ref={name} type="text" className="form-control" id="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="iataCode" className="form-label">IATA Code</label>
            <input ref={iataCode} type="text" className="form-control" id="iataCode" />
          </div>
          <div className="mb-3">
            <label htmlFor="isHajjRegistered" className="form-label">Hajj Registered</label>
            <select ref={isHajjRegistered} className="form-control" id="isHajjRegistered">
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="isHajjProceed" className="form-label">Hajj Proceed</label>
            <input ref={isHajjProceed} type="text" className="form-control" id="isHajjProceed" />
          </div>
          <div className="mb-3">
            <label htmlFor="scheduleFileNo" className="form-label">Schedule File No</label>
            <input ref={scheduleFileNo} type="text" className="form-control" id="scheduleFileNo" />
          </div>
          <div className="mb-3">
            <label htmlFor="sectionFileNo" className="form-label">Section File No</label>
            <input ref={sectionFileNo} type="text" className="form-control" id="sectionFileNo" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input ref={email} type="email" className="form-control" id="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <input ref={status} type="text" className="form-control" id="status" />
          </div>
          <div className="mb-3">
            <label htmlFor="duration" className="form-label">Duration: {duration}</label>
            <input
              onChange={durationHandler}
              step={10}
              
              max={300}
              type="range"
              style={{padding:"0"}}
              className="form-control"
              id="duration"
            />
          </div>
          <button type="submit" className="submit btn btn-primary">Add Airline</button>
        </form>
      )}
    </>
  );
}

export default AirlineAdd;
