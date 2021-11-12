import classes from "./MainHeader.module.css";
import Nav from "./Nav";
import { useSelector } from "react-redux";

const MainHeader = () => {
  const username = useSelector((state) => state.log.username);
  return (
    <header className={classes["main-header"]}>
      <img
        src={`https://avatars.dicebear.com/api/big-smile/${username}.svg`}
        alt="random avatar"
        width="50"
        height="50"
      />
      <h4>{username}</h4>
      <div>BattleShip</div>
      <Nav />
    </header>
  );
};

export default MainHeader;
