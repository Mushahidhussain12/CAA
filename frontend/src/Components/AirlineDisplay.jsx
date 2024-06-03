import { useEffect, useState } from "react";
import AirlineCard from "./AirlineCard";
import { Audio } from 'react-loader-spinner';

function AirlineDisplay() {
  const [postList, setPostList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoader(true);
      try {
        const response = await fetch('http://localhost:5000/airline/all', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const { data } = await response.json();
        console.log(data);
        setPostList([...data]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchPosts();
  }, []);

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
         wrapperStyle
         wrapperClass
       />
     </div>
      ) : (
        <div className="flight-container">
          {postList.length === 0 ? (
            <div className="noposts">
              <h1>There are No posts to show. Maybe Create some?</h1>
            </div>
          ) : (
            postList.map((singlePost) => (
              <AirlineCard key={singlePost.id} airline={singlePost} />
            ))
          )}
        </div>
      )}
    </>
  );
}

export default AirlineDisplay;
