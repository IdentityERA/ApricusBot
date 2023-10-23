import React from "react";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const Messages = (props) => {
  return (
    <>
      {props.speaks === "bot" && (
        <div className="offset-m2 offset-12">
          <div className="card-panel grey lighten-5 z-depth-1 me-bot">
            <div className="valign-wrapper">
              <div className="">
                <a
                  href="/"
                  className="btn-floating btn-large waves-effect waves-light"
                >
                  <SmartToyOutlinedIcon style={{ marginTop: "1px" }} />
                </a>

                <span className="black-text" style={{ padding: "0px 10px" }}>
                  {props.text}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {props.speaks === "me" && (
        <div className="offset-m2 offset-12">
          <div className="card-panel grey lighten-5 z-depth-1 me-user">
            <div className="valign-wrapper">
              <div>
                <a
                  href="/"
                  className="btn-floating btn-large waves-effect waves-light red"
                >
                  <PersonOutlineOutlinedIcon style={{ marginTop: "1px" }} />
                </a>

                <span className="black-text" style={{ padding: "0px 10px" }}>
                  {props.text}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Messages;
