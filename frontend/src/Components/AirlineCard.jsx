import { useContext, useState } from "react";
import { Trash3 } from "react-bootstrap-icons";
import { HandThumbsUpFill } from "react-bootstrap-icons";
import { HandThumbsDownFill } from "react-bootstrap-icons";
// import { PostList } from "../store/postlist-context";

function AirlineCard({ airline }) {
  console.log(airline);
  
  return (
    <div className="card card-outer" style={{ width: "80%",textAlign:"center" }}>
      <div className="card-body">
        <h5 style={{ color: "black" }} className="card-title"><b>Airline Name:</b> {airline.Name}</h5>
        <p style={{ color: "black" }} className="card-text">
          <b>Operator Code:</b> {airline.OperatorCode} || <b>IATA Code:</b> {airline.IataCode} || <b>Hajj Registered:</b> {airline.isHajjRegistered ? "Yes" : "No"} || <b>Hajj Proceed:</b> {airline.isHajjProceed} || <b>Schedule File No:</b> {airline.ScheduleFileNo} || <b>Section File No:</b> {airline.SectionFileNo} || <b>Email:</b> {airline.Email} || <b>Status:</b> {airline.Status} || <b>Duration :</b> {airline.duration}
        </p> 
        <div className="upvote">
         
        </div>
      </div>
    </div>
  );
}

export default AirlineCard;
