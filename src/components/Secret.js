import React, { Component } from "react";

export default class Secret extends Component {
  render() {
    return (
      <div>
        <p>this is a super secret area. Jump back to <a href="/">Home</a></p>
        <br/>
        <button onClick={()=> this.props.auth.logout()}>Logout</button>
      </div>
    );
  }
}
