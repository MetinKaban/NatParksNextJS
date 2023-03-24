import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styles from "./Signup.module.css";

const Signup = ({ onAddUser }: any) => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passoneTouched, setPassoneTouched] = useState(false);
  const [passtwoTouched, setPasstwoTouched] = useState(false);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };
  const handlePasswordTwoChange = (e: any) => {
    setPasswordTwo(e.target.value);
  };
  const emailRgx = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  const emailCond = emailRgx.test(email);
  const firstPasswordCond = password.length > 7;

  const submitHandler = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if (!firstPasswordCond || !emailCond) {
      setEmailTouched(true);
      setPassoneTouched(true);
      setPasstwoTouched(true);
      return;
    }

    const userInfo = {
      email: email,
      password: password,
    };

    const response = await fetch("/api/new-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    setEmail("");
    setPassword("");
    setPasswordTwo("");
    setEmailTouched(false);
    setPassoneTouched(false);
    setPasstwoTouched(false);

    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.area}>
          <label htmlFor="email">Email</label>
          <input
            className={styles.input}
            type="email"
            onChange={handleEmailChange}
            onBlur={() => setEmailTouched(true)}
            value={email}
            style={{
              backgroundColor: emailTouched && !emailCond ? "salmon" : "",
            }}
          />
          {emailTouched && !emailCond && (
            <p className={styles.p}>plase provide a valid email</p>
          )}
        </div>
        <div className={styles.area} style={{ marginLeft: "22px" }}>
          <label htmlFor="password">Password</label>
          <div style={{ display: "flex" }}>
            <input
              className={styles.input}
              type={!showPassword ? "password" : "text"}
              onChange={handlePasswordChange}
              onBlur={() => setPassoneTouched(true)}
              value={password}
              style={{
                backgroundColor:
                  passoneTouched && !firstPasswordCond ? "salmon" : "",
              }}
            />
            <div
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <VisibilityIcon sx={{ fontSize: "large", marginLeft: "5px" }} />
            </div>
          </div>
          {passoneTouched && !firstPasswordCond && (
            <p className={styles.p}>
              min password length must be 8 charachters
            </p>
          )}
        </div>
        <div className={styles.area} style={{ marginLeft: "22px" }}>
          <label htmlFor="Re-enter Password">Re-enter Password</label>
          <div style={{ display: "flex" }}>
            <input
              className={styles.input}
              type={!showPassword ? "password" : "text"}
              onChange={handlePasswordTwoChange}
              onBlur={() => setPasstwoTouched(true)}
              value={passwordTwo}
              style={{
                backgroundColor:
                  passtwoTouched && passwordTwo !== password ? "salmon" : "",
              }}
            />
            <div
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <VisibilityIcon sx={{ fontSize: "large", marginLeft: "5px" }} />
            </div>
          </div>
          {passwordTwo !== password && (
            <p className={styles.p}>passwords must match</p>
          )}
        </div>
        <div className={styles.area}>
          <button className={styles.btn} type="submit">
            Sign Up
          </button>
        </div>
        <div style={{ paddingBottom: "10px" }}>
          Already have an account.{" "}
          <span>
            <Link href={"/login"} style={{ color: "white" }}>
              Sign in
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
