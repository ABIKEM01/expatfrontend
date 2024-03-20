import React from "react";
import { useState} from "react";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userService from "../../redux/Features/user/userService.ts";
import HomeLayout from "../../components/layout/HomeLayout.tsx";

function Register() {
 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [interests, setInterests] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initial = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
  };
  const [state, setState] = useState(initial);
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !state.email ||
      !state.password ||
      !state.dob ||
      !state.phone ||
      !state.firstName ||
      !state.lastName
    ) {
      return toast.warn("Please fill in all fields");
    }
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.email)) {
      return toast.warn("Invalid email format");
    }

    // Password requirements validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(state.password)) {
      return toast.warn(
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character"
      );
    }
    // Date of Birth validation
    const currentDate = new Date();
    const selectedDate = new Date(state.dob);
    if (selectedDate > currentDate) {
      return toast.warn("Please select a valid date of birth");
    }
    setIsSubmitting(true);

    try {
      const res = await userService.registerUser(state);
      console.log(res, "THE RES");

      if (res.status === "success") {
        toast.success(
          "Account created successfully. Please login to continue."
        );
        navigate("/");
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.message || "An error occured. Please try again"
      );
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <HomeLayout>
        <div className="flex border-3 w-screen  h-screen   flex-col justify-center px-6 py-1 lg:px-8">
          <div className="">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight">
                Sign up to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={submitHandler}>
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium leading-6"
                  >
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="First name"
                      value={state.firstName}
                      onChange={changeHandler}
                      autoComplete="firstName"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium leading-6"
                  >
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={state.lastName}
                      onChange={changeHandler}
                      autoComplete="lastName"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={state.email.toLowerCase()}
                      onChange={changeHandler}
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6"
                  >
                    Phone
                  </label>
                  <div className="mt-1">
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      value={state.phone}
                      onChange={changeHandler}
                      autoComplete="phone"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium leading-6"
                  >
                    Date of Birth
                  </label>
                  <div className="mt-1">
                    <input
                      id="dob"
                      name="dob"
                      type="date"
                      value={state.dob}
                      onChange={changeHandler}
                      autoComplete="dob"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={state.password}
                      onChange={changeHandler}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={submitHandler}
                    className="flex w-full disabled:bg-black justify-center text-white rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                  >
                    Submit {isSubmitting && "...."}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}

export default Register;
