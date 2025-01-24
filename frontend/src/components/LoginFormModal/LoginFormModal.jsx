import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();

    setErrors({});
    return dispatch(
      sessionActions.login({ credential: "SakuraBlossom", password: "DragonBlade7" })
    )
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white p-12 w-96">
      <h1 className="text-2xl font-semibold">Log In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-2/3 mt-4">
        <label  className="flex flex-col w-full text-center ">
          Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            className="border border-black"
          
          />
        </label>
        <label  className="flex flex-col w-full text-center ">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-black"
          
          />

          {errors.credential && <p>{errors.credential}</p>}
        </label>

        <button type="submit" className="hover:bg-blue-950 hover:text-white w-32 p-2">Log In</button>

      </form>
      <button onClick={handleDemoSubmit}className="hover:bg-blue-950 hover:text-white w-32 p-2">Demo User</button>
    </div>
  );
}

export default LoginFormModal;
