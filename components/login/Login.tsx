import { useState } from "react";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if (password.length === 0 || email.length === 0) return;
    console.log(email);
    console.log(password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler}>
        <div className={styles.area}>
          <label htmlFor="email">Email</label>
          <input
            className={styles.input}
            type="email"
            onChange={handleEmailChange}
            value={email}
          />
        </div>
        <div className={styles.area}>
          <label htmlFor="password">Password</label>
          <input
            className={styles.input}
            type="password"
            onChange={handlePasswordChange}
            value={password}
          />
        </div>
        <div className={styles.area}>
          <button className={styles.btn} type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
