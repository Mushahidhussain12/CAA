import { useContext, useState } from "react";
import { Trash3 } from "react-bootstrap-icons";
import { HandThumbsUpFill } from "react-bootstrap-icons";
import { HandThumbsDownFill } from "react-bootstrap-icons";
import { FaPlus } from "react-icons/fa6";
// import { PostList } from "../store/postlist-context";

function PostCard({ post,setAddBay,setAirport }) {
    console.log(post)
  const [likes, setlikes] = useState("0");

   function handler(){
    setAddBay(true);
    setAirport(post._id);
   }

//   const { deletePost } = useContext(PostList);

//   function likeHandler() {
//     setlikes(parseInt(likes) + 1);
//   }
//   function dislikeHandler() {
//     setlikes(parseInt(likes) - 1);
//   }

  return (
    <div  style={{backgroundColor:"white",borderRadius:"10px"}} >
      <div class="card-body">
        <h5 style={{color:"black"}} class="card-title"><b>Airport Name :</b> {post.AirportName}</h5>
        <p style={{color:"black"}} class="card-text"><b> IATA CODE:</b> {post.IataCode} || <b> ICAO CODE:</b> {post.IcaoCode} || <b>Status:</b>  {post.AirportStatus} || <b>CountryId:</b>  {post.CountryId} || <b>CityId :</b>  {post.CityId} || <b>Category:</b>  {post.Category}</p>
      
        <span
          onClick={() => deletePost(post.id)}
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        >
          {/* <Trash3 /> */}
          {/* <span class="visually-hidden">unread messages</span> */}
        </span>
        <div className="upvote">
           <button 
            onClick={handler }
            type="button"
            class="btn btn-success"
            style={{ width: "2.5rem" }}
          >
            
          <FaPlus></FaPlus>
          </button>
           
          {/*
          <button
            onClick={dislikeHandler}
            type="button"
            class="btn btn-danger"
            style={{ width: "5rem" }}
          >
            <HandThumbsDownFill />
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
