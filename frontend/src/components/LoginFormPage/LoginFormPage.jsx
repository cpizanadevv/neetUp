import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './LoginForm.css';

function LoginFormPage() {
  const [credential, setCredential] = useState();
  const [password, setPassword] = useState();
  const [errs, setErrs] = useState({});

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrs({});
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data?.errors) setErrs(data.errors);
      }
    );
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email:
          <input
            type="text"
            value={ credential }
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            value={ password }
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errs.credential && <p>{errs.credential}</p>}
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormPage;