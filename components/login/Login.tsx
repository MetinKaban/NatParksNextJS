import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styles from "./Login.module.css";

type Props = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login = ({ setIsLoggedIn }: Props) => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailTouched, setEmailTouched] = useState<boolean>(false);
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userNotFound, setUserNotFound] = useState<boolean>(false);
  const [user, loading, error] = useAuthState(firebaseAuth);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const unfoundUserFocusHandler = () => {
    if (userNotFound) {
      setUserNotFound(false);
    }
  };

  const emailRgx = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  const emailCond = emailRgx.test(email);
  const passwordCond = password.length > 7;

  const submitHandler = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if (!passwordCond || !emailCond) {
      setEmailTouched(true);
      setPasswordTouched(true);
      return;
    }

    // const response = await fetch("/api/auth-user", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ em: email, pw: password }),
    // });

    // const data = await response.json();

    // if (data.result.length) {
    //   setIsLoggedIn(true);
    //   router.push("/");
    // } else {
    //   setUserNotFound(true);
    // }

    try {
      const credential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      console.log(credential.user);
      console.log("success");
      router.push("/");
    } catch (error) {
      console.log(error);
      console.log("fail");
    }

    setEmail("");
    setPassword("");
    setEmailTouched(false);
    setPasswordTouched(false);

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
            onFocus={unfoundUserFocusHandler}
            value={email}
            style={{
              backgroundColor: emailTouched && !emailCond ? "salmon" : "",
            }}
          />
          {emailTouched && !emailCond && (
            <p className={styles.par}>plase provide a valid email</p>
          )}
        </div>
        <div className={styles.area} style={{ marginLeft: "22px" }}>
          <label htmlFor="password">Password</label>
          <div style={{ display: "flex" }}>
            <input
              className={styles.input}
              type={!showPassword ? "password" : "text"}
              onChange={handlePasswordChange}
              onBlur={() => setPasswordTouched(true)}
              onFocus={unfoundUserFocusHandler}
              value={password}
              style={{
                backgroundColor:
                  passwordTouched && !passwordCond ? "salmon" : "",
              }}
            />
            <div
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <VisibilityIcon sx={{ fontSize: "large", marginLeft: "5px" }} />
            </div>
          </div>
          {passwordTouched && !passwordCond && (
            <p className={styles.par}>password must be 8 chars long</p>
          )}
        </div>
        {userNotFound && (
          <p className={styles.par}>
            user not found. you can sign up using the link below...
          </p>
        )}
        <div className={styles.area}>
          <button className={styles.btn} type="submit">
            Login
          </button>
        </div>
        Don't have an account?
        <span>
          <Link href={"/signup"}>
            <div className={styles.p}>Create here</div>
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
