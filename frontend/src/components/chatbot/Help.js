import Dropdown from "react-bootstrap/Dropdown";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";

function Help() {
  const callHandler = () => {
    axios
      .post("http://localhost:5000/api/voice")
      .then((res) => console.log(res));
  };
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant=""
        id="dropdown-basic"
        style={{ color: "#000", border: "1px solid #C70039" }}
      >
        Help
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={callHandler}>
          <span>
            <CallIcon />
          </span>
          Call
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">
          <span>
            <EmailIcon />
          </span>
          Mail
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Help;
