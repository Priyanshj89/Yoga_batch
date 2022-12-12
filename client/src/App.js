import "./App.css";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

function App() {
  const [successMsg, setSuccessMsg] = useState("");
  const [notsuccessMsg, setNotSuccessMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = data => {
    console.log(data);
    axios
      .post(
        "/storeData",
        {
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age,
          email: data.email,
          batch: data.batch,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(res => {
        console.log(res);
        if (res.data && res.data.message) {
          setNotSuccessMsg("");
          setSuccessMsg("Payment Done Successfully. Thank You");
        } else {
          setSuccessMsg("");
          setNotSuccessMsg(
            "You have alrady paid for this Month, You cannot change batch now"
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
    reset();
  };

  return (
    <div className="App">
      <div className="form-head">
        <form onSubmit={handleSubmit(onSubmit)}>
          {successMsg && <p className="success-msg">{successMsg}</p>}
          {notsuccessMsg && <p className="error-msg">{notsuccessMsg}</p>}
          <div className="form-control">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              {...register("firstName", {
                required: "First Name is required.",
              })}
            />
            {errors.firstName && (
              <p className="errorMsg">{errors.firstName.message}</p>
            )}
          </div>
          <div className="form-control">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              {...register("lastName", {
                required: "Last Name is required.",
              })}
            />
            {errors.lastName && (
              <p className="errorMsg">{errors.lastName.message}</p>
            )}
          </div>
          <div className="form-control">
            <label>Email</label>
            <input
              type="text"
              name="email"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email is not valid.",
                },
              })}
            />
            {errors.email && <p className="errorMsg">{errors.email.message}</p>}
          </div>
          <div className="form-control">
            <label>Age</label>
            <input
              type="text"
              name="age"
              {...register("age", {
                required: "Age is required.",
                validate: {
                  inrange: v => parseInt(v) > 17 && parseInt(v) < 66,
                },
              })}
            />
            {errors.age?.type === "required" && (
              <p className="errorMsg">Age is required.</p>
            )}
            {errors.age?.type === "inrange" && (
              <p className="errorMsg">Age must be 18-65</p>
            )}
          </div>
          <Form.Group
            className="mb-3"
            controlId="batch"
            style={{ marginLeft: "28%", padding: "10px" }}
          >
            <Form.Label style={{ fontWeight: "500" }}>Select Batch</Form.Label>
            <Form.Check
              type="radio"
              label="6AM - 7AM"
              value="6AM - 7AM"
              {...register("batch", {
                required: "Please select your batch",
              })}
            />
            <Form.Check
              type="radio"
              label="7AM - 8AM"
              value="7AM - 8AM"
              {...register("batch")}
            />
            <Form.Check
              type="radio"
              label="8AM - 9AM"
              value="8AM - 9AM"
              {...register("batch")}
            />
            <Form.Check
              type="radio"
              label="5PM - 6PM"
              value="5PM - 6PM"
              {...register("batch")}
            />
            {errors.batch && <p className="errorMsg">{errors.batch.message}</p>}
          </Form.Group>
          <div className="form-control">
            <label></label>
            <button type="submit">Pay Rs.500 Now</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default App;
