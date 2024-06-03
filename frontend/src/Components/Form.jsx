import { useRef, useState } from "react";
import { Audio } from 'react-loader-spinner';

function Form() {
  const [loader, setLoader] = useState(false);
  const title = useRef();
  const iata = useRef();
  const icao = useRef();
  const countryId = useRef();
  const cityId = useRef();
  const category = useRef();
  const status = useRef();

  async function handler(e) {
    e.preventDefault();

    const formData = {
      AirportName: title.current?.value || '',
      IataCode: iata.current?.value || '',
      IcaoCode: icao.current?.value || '',
      CountryId: countryId.current?.value || '',
      CityId: cityId.current?.value || '',
      Category: category.current?.value || '',
      AirportStatus: status.current?.value || ''
    };

    setLoader(true);
    try {
      const response = await fetch('http://localhost:5000/airport/add', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.message) {
        title.current.value = "";
        iata.current.value = "";
        icao.current.value = "";
        countryId.current.value = "";
        cityId.current.value = "";
        category.current.value = "";
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
        <form className="form-body" onSubmit={handler}>
          <div className="Airport-Name mb-3">
            <label htmlFor="title" className="Airport-Text form-label">
              Airport Name
            </label>
            <input ref={title} type="text" className="form-control" id="title" />
          </div>
          <div className="mb-3">
            <label htmlFor="iata" className="form-label">
              IATA code
            </label>
            <input ref={iata} type="text" className="form-control" id="iata" />
          </div>
          <div className="mb-3">
            <label htmlFor="icao" className="form-label">
              ICAO code
            </label>
            <input ref={icao} type="text" className="form-control" id="icao" />
          </div>
          <div className="mb-3">
            <label htmlFor="countryId" className="form-label">
              Country ID
            </label>
            <input ref={countryId} type="text" className="form-control" id="countryId" />
          </div>
          <div className="mb-3">
            <label htmlFor="cityId" className="form-label">
              City ID
            </label>
            <input ref={cityId} type="text" className="form-control" id="cityId" />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <input ref={category} type="text" className="form-control" id="category" />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Airport Status
            </label>
            <input ref={status} type="text" className="form-control" id="status" />
          </div>
          <button type="submit" className="submit btn btn-primary">
            Add Airport
          </button>
        </form>
      )}
    </>
  );
}

export default Form;
