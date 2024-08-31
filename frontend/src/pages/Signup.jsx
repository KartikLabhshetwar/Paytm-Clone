import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg w-96 p-8">
        <Heading label="Create an Account" className="text-2xl font-semibold mb-4 text-gray-800"/>
        <SubHeading label="Please fill in your details to sign up" className="text-sm mb-6 text-gray-600"/>

        <div className="space-y-4">
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            label="First Name"
            className="focus:ring-2 focus:ring-indigo-500"
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            label="Last Name"
            className="focus:ring-2 focus:ring-indigo-500"
          />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder="john@gmail.com"
            label="Email"
            className="focus:ring-2 focus:ring-indigo-500"
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
            label="Password"
            type="password"
            className="focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="pt-6">
          <Button
            onPress={async () => {
              const response = await axios.post(
                "https://paytm-clone-backend-pe39.onrender.com/api/v1/user/signup",
                {
                  username: username,
                  firstName: firstName,
                  lastName: lastName,
                  password: password,
                }
              );
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
            }}
            label="Sign Up"
            className="w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          />
        </div>

        <BottomWarning
          label="Already have an account?"
          buttonText="Sign in"
          to="/signin"
          className="mt-4"
        />
      </div>
    </div>
  );
};
