import { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";


function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white p-12 w-96">
      <h1 className="text-2xl font-semibold">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-2/3 mt-4">
        <label className="flex flex-col w-full text-center ">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-black"
          />
        </label>
        {errors.email && <p className="err">{errors.email}</p>}
        <label className="flex flex-col w-full text-center ">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border border-black"
          />
        </label>
        {errors.username && <p className="err">{errors.username}</p>}
        <label className="flex flex-col w-full text-center ">
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="border border-black"
          />
        </label>
        {errors.firstName && <p className="err">{errors.firstName}</p>}
        <label className="flex flex-col w-full text-center ">
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="border border-black"
          />
        </label>
        {errors.lastName && <p className="err">{errors.lastName}</p>}
        <label className="flex flex-col w-full text-center ">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-black"
          />
        </label>
        {errors.password && <p className="err">{errors.password}</p>}
        <label className="flex flex-col w-full text-center ">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="border border-black"
          />
        </label>
        {errors.confirmPassword && (
          <p className="err">{errors.confirmPassword}</p>
        )}
        <button type="submit" disabled={username.length < 4 || password.length < 6} className="hover:bg-blue-950 hover:text-white w-32">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;