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
    <div className="modal">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} id="login-modal">
        <div>
          <input
            type="text"
            placeholder="
            Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errors.credential && <p>{errors.credential}</p>}
        </div>

        <button type="submit" className="login-buttons">Log In</button>
        <button onClick={handleDemoSubmit} className="login-buttons">Log in as Demo User</button>

      </form>
    </div>
  );
}

export default LoginFormModal;
