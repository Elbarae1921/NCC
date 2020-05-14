// import modules and components
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import { InputGroup, Logo } from "../../others";
import Login from "./Login";
import Register from "./Register";


const Partner = () => {
    // set the state
    const [result, setResult] = useState("");
    const [error, setError] = useState("");
    const [login, setLogin] = useState(true);
    const [Switch, setSwicth] = useState("registration");

    const changeMode = () => {
        // change mode from login to register or vice versa
        setError("");
        setSwicth(login ? "login" : "registration");
        setLogin(!login);
    };

    const submitLogin = (e) => {
        // submit post request to login
        e.preventDefault();
        // clear errors
        setError("");
        // POST => http://localhost:5000/organization/login
        axios
          .post("/api/organization/login", $(e.target).serialize())
          .then((res) => {
            if (!res.data.errors) {
              // if everything went fine show the key
              setResult(
                `Here is your key : ${res.data.key}. Please make sure to keep it safe and secret.`
              );
            } else {
              // else show the error
              setError(res.data.errors[0].msg);
            }
          })
          .catch(() => {
            // in case of a network or http error
            setError(
              "It seems there was a problem with the server. Please try again"
            );
          });
    };

    const submitRegister = (e) => {
        // submit a request to register
        e.preventDefault();
        // clear errors
        setError("");
        // POST => http://localhost:5000/organization/register
        axios
          .post("/api/organization/register", $(e.target).serialize())
          .then((res) => {
            if (!res.data.errors) {
              // if everything went fine show the key
              setResult(
                `Here is your key : ${res.data.key}. Please make sure to keep it safe and secret.`
              );
            } else {
              // else show the error
              setError(res.data.errors[0].msg);
            }
          })
          .catch(() => {
            // in case of a network or http error
            setError(
              "It seems there was a problem with the server. Please try again"
            );
          });
    };

    
    const renderForm = login ?
      (
          // Login component, but it's just a form
          <Login submit={submitLogin} />
      )
      :
      (
          // same goes for this one too
          <Register submit={submitRegister} />
      );


    return (
      <div className="background-image partner">
        <div className="box-container partner">
          <div className="back">
            {/* Link is just anchor tag for react, since anchor tag takes you to another page */}
            <Link to="/"> {"<"} </Link>
          </div>
          {/* Logo component */}
          <Logo class="pages" />
          <div className="box partner">
            <div className="form">
              <h3>Get a key</h3>
              { renderForm }
              <p className="error">{error}</p>
              <p className="key">{result}</p>
              {/* button to S between login and register, note that the text is dynamic, and changes whenever the state is changed */}
              <InputGroup
                class="S"
                type="button"
                text={`Switch to ${Switch}`}
                onClick={changeMode}
              />
            </div>
            {/* some fancy text */}
            <div className="text">
              <h3>What it means to become a partner</h3>

              <p>
                If you're an organization that helps unite victims of
                natural/man-made disasters with their families and loved ones,
                you can have unlimited access to our api, which would further
                the efforts in disaster prevention, and contribute to the pool
                of data to analyse.
                </p>
              <p>
                <pre className="method get">GET</pre>{" "}
                <pre className="url">
                  https://nationalcatastrophecenter.herokuapp.com/api/person?firstName=Ben
                    {"&"}familyName=Kenobi{"&"}city=Tatooine
                  </pre>
              </p>
              <p style={{ marginBottom: "0" }}>
                <pre className="method post">POST</pre>{" "}
                <pre className="url">
                    curl -H "Authorization: Bearer <key>{"{YOUR_KEY}"}</key>" -H "Content-Type: application/json" -d {'\'[{"firstName":"Grimmer", "familyName":"Wolfwood", "city":"Yorknew"}]\''} -X POST https://nationalcatastrophecenter.herokuapp.com/api/organization/checkin
                </pre>
              </p>
              <p style={{ fontSize: "8px", margin: "0" }}>
                For more information on how to use the API, visit{" "}
                <a href="https://nationalcatastrophecenter.herokuapp.com/api/">
                  /api/
                  </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Partner;
