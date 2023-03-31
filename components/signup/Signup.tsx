import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styles from "./Signup.module.css";
import { firebaseAuth } from "../../auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = ({ onAddUser }: any) => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordTwo, setPasswordTwo] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailTouched, setEmailTouched] = useState<boolean>(false);
  const [passoneTouched, setPassoneTouched] = useState<boolean>(false);
  const [passtwoTouched, setPasstwoTouched] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };
  const handlePasswordTwoChange = (e: any) => {
    setPasswordTwo(e.target.value);
  };
  const handleErrorFocus = () => {
    if (error) {
      setError(false);
    }
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
    if (password !== passwordTwo) return;

    try {
      const credential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      console.log(credential);
      router.push("/");
    } catch (error) {
      console.log(error);
      console.log("fail");
    }

    // const response = await fetch("/api/new-user", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ em: email, pw: password }),
    // });

    // const data = await response.json();
    // console.log(data);
    // if (data.message === 409) {
    //   setError(true);
    //   return;
    // } else {
    setEmail("");
    setPassword("");
    setPasswordTwo("");
    setEmailTouched(false);
    setPassoneTouched(false);
    setPasstwoTouched(false);
    //   router.push("/login");
    // }
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
            onFocus={handleErrorFocus}
            value={email}
            style={{
              backgroundColor: emailTouched && !emailCond ? "salmon" : "",
            }}
          />
          {emailTouched && !emailCond && (
            <p className={styles.p}>plase provide a valid email</p>
          )}
          {error && (
            <p className={styles.p}>
              This email is already in use. Please provide a different email or
              login using the link below.
            </p>
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
