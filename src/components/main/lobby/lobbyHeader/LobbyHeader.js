import shipimg from "../../../../assets/shipimg.jpeg";
import classes from "./LobbyHeader.module.css";

const LobbyHeader = () => {
  return (
    <div className={classes["main-image"]}>
      <a href="/credit" title="See Credits">
        <img src={shipimg} alt="Ship shooting!" />
      </a>
    </div>
  );
};

export default LobbyHeader;
