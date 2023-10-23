import axios from "axios";
import React, { Component } from "react";
import Messages from "./Messages";
import Cookies from "universal-cookie";
import { v4 as uuidv4 } from "uuid";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import Card from "./Card";
import QuickReplies from "./QuickReplies";
import Help from "./Help";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardControlKeyIcon from "@mui/icons-material/KeyboardControlKey";
import FileAttach from "./FileAttach";

const cookies = new Cookies();

class Chatbot extends Component {
  messagesEnd;
  talkInput;
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    this.state = {
      messages: [],
      showBot: true,
    };

    if (cookies.get("userId") === undefined) {
      cookies.set("userId", uuidv4(), { path: "/" });
    }
    console.log(cookies.get("userId"));
  }

  async df_text_query(text) {
    let says = {
      speaks: "me",
      msg: {
        text: {
          text: text,
        },
      },
    };
    this.setState({ messages: [...this.state.messages, says] });
    const response = await axios.post(
      "http://localhost:5000/api/df_text_query",
      { text: text, userId: cookies.get("userId") }
    );
    for (let msg of response.data.fulfillmentMessages) {
      let says = {
        speaks: "bot",
        msg: msg,
      };
      this.setState({ messages: [...this.state.messages, says] });
    }
  }

  async df_event_query(event) {
    const response = await axios.post(
      "http://localhost:5000/api/df_event_query",
      { event: event, userId: cookies.get("userId") }
    );
    for (let msg of response.data.fulfillmentMessages) {
      let says = {
        speaks: "bot",
        msg: msg,
      };
      this.setState({ messages: [...this.state.messages, says] });
    }
  }

  componentDidMount() {
    this.df_event_query("Welcome");
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behaviour: "smooth" });
    if (this.talkInput) {
      this.talkInput.focus();
    }
  }

  show(event) {
    event.preventDefault();
    this.setState({ showBot: true });
  }

  hide(event) {
    event.preventDefault();
    this.setState({ showBot: false });
  }

  _handleQuickReplyPayload(event, payload, text) {
    event.preventDefault();
    event.stopPropagation();

    switch (payload) {
      case "training_masterclass":
        this.df_event_query("MASTERCLASS");
      default:
        this.df_text_query(text);
        break;
    }
  }

  renderCards(cards) {
    return cards.map((card, i) => <Card key={i} payload={card.structValue} />);
  }

  renderOneMessage(message, i) {
    if (message.msg && message.msg.text && message.msg.text.text) {
      return (
        <Messages
          key={i}
          speaks={message.speaks}
          text={message.msg.text.text}
        />
      );
    } else if (message.msg && message.msg.payload.fields.cards) {
      return (
        <div key={i}>
          <div className="card-panel grey lighten-5 z-depth-1">
            <div style={{ overflow: "hidden" }}>
              {message.speaks === "bot" && (
                <div className="">
                  <a className="btn-floating btn-large waves-effect waves-light">
                    <SmartToyOutlinedIcon style={{ marginTop: "5px" }} />
                  </a>
                </div>
              )}
              <div style={{ overflow: "auto", overflowY: "scroll" }}>
                <div
                  style={{
                    height: "",
                    width:
                      message.msg.payload.fields.cards.listValue.values.length *
                      "",
                  }}
                >
                  {this.renderCards(
                    message.msg.payload.fields.cards.listValue.values
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (
      message.msg &&
      message.msg.payload &&
      message.msg.payload.fields &&
      message.msg.payload.fields.quick_replies
    ) {
      return (
        <QuickReplies
          text={
            message.msg.payload.fields.text
              ? message.msg.payload.fields.text
              : null
          }
          key={i}
          replyClick={this._handleQuickReplyPayload}
          speaks={message.speaks}
          payload={message.msg.payload.fields.quick_replies.listValue.values}
        />
      );
    }
  }

  renderMessages(stateMessages) {
    if (stateMessages) {
      return stateMessages.map((message, i) => {
        return this.renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.df_text_query(e.target.value);
      e.target.value = "";
    }
  }

  render() {
    if (this.state.showBot) {
      return (
        <div className="bot-outer">
          <nav>
            <div className="nav-wrapper">
              <a className="brand-logo">ChatBot</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Help/></li>
                <li>
                  <a href="/" onClick={this.hide}>
                    <div className="close-icon">
                      <CloseIcon className="close" />
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div
            id="chatbot"
            style={{ height: 388, width: "100%", overflow: "auto" }}
          >
            {this.renderMessages(this.state.messages)}

            <div
              ref={(element) => {
                this.messagesEnd = element;
              }}
              style={{ float: "left", clear: "both" }}
            ></div>
          </div>
          <div
            className="col s12"
            style={{ display: "flex", padding: "0px 10px" }}
          >
            <input
              style={{
                margin: 0,
                width: "98%",
              }}
              ref={(input) => {
                this.talkInput = input;
              }}
              placeholder="Type a message and press enter"
              type="text"
              autoFocus
              onKeyPress={this.handleKeyPress}
            />
            <FileAttach />
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            minHeight: 40,
            maxHeight: 500,
            width: 400,
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          <nav>
            <div className="nav-wrapper">
              <a className="brand-logo">ChatBot</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <a href="/" onClick={this.show}>
                    <KeyboardControlKeyIcon style={{ color: "#000" }} />
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div
            ref={(element) => {
              this.messagesEnd = element;
            }}
            style={{ float: "left", clear: "both" }}
          ></div>
        </div>
      );
    }
  }
}

export default Chatbot;
