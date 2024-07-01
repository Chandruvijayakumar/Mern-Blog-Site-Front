import React, { useContext } from "react";
import Input from "./Input";
import googleicon from "/images/google.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Animation from "../common/Animation";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { storeSession } from "../common/Session";
import { userContext } from "../App";
import { authwithGoogle } from "../common/Firebase";

const UserForm = ({ type }) => {
  const navigate = useNavigate();
  let {
    userAuth: { accessToken },
    setuserAuth,
  } = useContext(userContext);

  const userAuth = (serverRoute, formData, redirect = true) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
      .then(({ data }) => {
        storeSession("user", JSON.stringify(data));
        setuserAuth(data);
        toast.success(
          serverRoute === "/signup"
            ? "Signup Successful! Redirecting..."
            : "Successfully logged in!"
        );

        if (redirect && serverRoute === "/signup") {
          navigate("/home");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          toast.error("Incorrect email or password. Please try again.");
        } else if (error.response && error.response.status === 409) {
          toast.error(
            "Email or username already in use. Please use a different one."
          );
        } else if (error.response) {
          console.log(error.response.data.error);
          toast.error(error.response.data.error);
        } else {
          console.error("Error:", error.message);
          toast.error("An error occurred while processing your request.");
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = type === "login" ? "/login" : "/signup";

    let emailRegex = /^[\w\d]+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    let form = new FormData(formElement);

    let formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { name, email, password } = formData;

    if (type !== "login" && (!name || name.trim().length < 3)) {
      return toast.error("Name must be greater than 3 characters");
    }

    if (!email || !email.length) {
      return toast.error("Enter Email");
    } else if (!emailRegex.test(email)) {
      return toast.error("Invalid Email Id");
    }

    if (!passwordRegex.test(password)) {
      return toast.error(
        "The Password should contain at least one upper case letter, one lowercase letter along with one numeric"
      );
    }

    userAuth(serverRoute, formData);
  };

  const handleGoogleAuth = async (e) => {
    e.preventDefault();
    await authwithGoogle()
      .then((user) => {
        let serverRoute = "/google-auth";

        let formData = {
          accessToken: user.accessToken,
        };
        userAuth(serverRoute, formData);
        toast.success("Successfully signed in with Google!");
      })
      .catch((err) => {
        toast.error("Error in Google Authentication");
        console.error(err);
      });
  };

  return (
    <>
      {accessToken ? (
        <Navigate to="/home" />
      ) : (
        <Animation keyValue={type}>
          <section className="flex items-center justify-center min-h-screen">
            {/* Image Section */}
            <div className="hidden md:block md:w-1/2">
              <img
                src="/images/login.png"
                alt="Login Image"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Form Section */}
            <div className="w-full md:w-1/2 px-6">
              <Toaster />
              <form
                id="formElement"
                className="bg-white shadow-md rounded-md px-8 py-10"
                onSubmit={handleSubmit}
              >
                <h1 className="text-3xl font-semibold text-center text-red-600 mb-6">
                  {type === "login" ? "Welcome Back" : "Welcome to Blog"}
                </h1>
                {type !== "login" && (
                  <Input
                    name="name"
                    type="text"
                    placeholder="Name"
                    icon="fa-user"
                  />
                )}
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  icon="fa-envelope"
                />
                {/* {type === "login" && <Link to="#">Forgot password ?</Link>} */}
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  icon="fa-lock"
                />
                <button className="btn-primary w-full mt-6" type="submit">
                  {type.replace("-", " ")}
                </button>
                <div className="relative w-full flex items-center justify-center mt-6 text-gray-500">
                  <hr className="w-1/4 border-t border-gray-400" />
                  <span className="mx-3">or</span>
                  <hr className="w-1/4 border-t border-gray-400" />
                </div>
                <button
                  className="btn-google flex items-center justify-center w-full mt-6"
                  onClick={handleGoogleAuth}
                >
                  <img
                    src={googleicon}
                    className="w-5 mr-2"
                    alt="Google icon"
                  />
                  Continue with Google
                </button>
                {type === "login" ? (
                  <p className="mt-6 text-center text-gray-600">
                    Don't have an account ?
                    <Link
                      to="/signup"
                      className="text-red-600 font-semibold ml-1"
                    >
                      Let's join us.
                    </Link>
                  </p>
                ) : (
                  <p className="mt-6 text-center text-gray-600">
                    Already have an account ?
                    <Link
                      to="/login"
                      className="text-red-600 font-semibold ml-1"
                    >
                      Login here.
                    </Link>
                  </p>
                )}
              </form>
            </div>
          </section>
        </Animation>
      )}
    </>
  );
};

export default UserForm;
