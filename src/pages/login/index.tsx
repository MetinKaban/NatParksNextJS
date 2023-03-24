import Login from "components/login/Login";

type Props = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginPage = ({setIsLoggedIn} : Props) => {
  return <Login setIsLoggedIn={setIsLoggedIn}/>;
};

export default LoginPage;
