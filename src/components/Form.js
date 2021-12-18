import React from "react";
const initialState = {
  name: "",
  email: "",
  password: "",
  dob: "",
  nameError: "",
  emailError: "",
  passwordError: "",
  dobError: "",
};
export default class MyForm extends React.Component {
  state = initialState;
  handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";

    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  handleCheck = (event) => {
    this.setState({ rememberMe: event.target.checked });
  };

  // validate if user is over 18

  validate = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";
    let dobError = "";
    if (!this.state.name) {
      nameError = "Name cannot be blank";
    }
    if (nameError) {
      this.setState({ nameError });
      return false;
    }

    if (!this.state.email.includes("@")) {
      emailError = "Invalid email";
    }
    if (!this.state.password) {
      passwordError = "Password cannot be blank";
    }
    if (!this.state.dob) {
      dobError = "Date of birth cannot be blank";
    }

    // if (!this.state.dob.isValidDate(this.state.dob)) {
    //   dobError = "Enter your date of birth";
    // }
    if (nameError || emailError || passwordError || dobError) {
      this.setState({ nameError, emailError, passwordError, dobError }); // setting the state to that string variable
      return false; // setting validation to false
    }

    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state); // details logged into console
      this.setState(initialState);
      // clear form
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.nameError}
          </div>
        </div>
        <div>
          <input
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.emailError}
          </div>
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="password"
            checked={this.state.password}
            onChange={this.handleChange}
          />
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.passwordError}
          </div>
        </div>
        <div>
          <input type="date" id="datemin" name="datemin" max="2003-01-01" />
        </div>
        <div style={{ fontSize: 12, color: "red" }}>{this.state.dobError} </div>

        <button type="submit">Register</button>
      </form>
    );
  }
}
