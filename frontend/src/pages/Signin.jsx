import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-50 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white shadow-md w-80 text-center p-6">
          <Heading label={"Sign in"} />
          <SubHeading label={"Access your account"} />
          <InputBox onChange={(e) => setUsername(e.target.value)} placeholder="Email" label={"Email"} />
          <InputBox onChange={(e) => setPassword(e.target.value)} placeholder="Password" label={"Password"} />
          <div className="pt-4">
            <Button
              onPress={async () => {
                const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                  username,
                  password,
                });
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
              label={"Sign in"}
            />
          </div>
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  );
};
