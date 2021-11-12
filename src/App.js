import React, { useEffect, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logActions } from "./store/logSlice";
import { Route, Switch } from "react-router-dom";
import LoginMenu from "./components/LoginMenu";
import MainHeader from "./components/Header/MainHeader";
import { socket, SocketContext } from "./context/socket";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const GameContainer = React.lazy(() =>
  import("./components/main/GameContainer")
);
const Credit = React.lazy(() => import("./components/main/credit/Credit"));
const Instruction = React.lazy(() =>
  import("./components/main/Instruction/Instruction")
);
const Admin = React.lazy(() => import("./admin/Admin"));
const NotFound = React.lazy(() => import("./NotFound"));
const Lobby = React.lazy(() => import("./components/main/lobby/Lobby"));

const SEND_USERNAME_EVENT = "sendUsernane";
const ESTABLISH_CONNECTION = "establishConnection";

function App() {
  const log = useSelector((state) => state.log);
  const dispatch = useDispatch();

  useEffect(() => {
    const loginInfo = localStorage.getItem("isLoggedIn");
    if (loginInfo === "1") {
      dispatch(logActions.onLogged());
    }
  }, [dispatch]);

  useEffect(() => {
    if (log.userJoin) {
      window.onbeforeunload = function () {
        return true;
      };
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [log.userJoin]);

  useEffect(() => {
    const handleConnection = () => {
      //console.log("Sending username");
      const username = localStorage.getItem("username");
      socket.emit(SEND_USERNAME_EVENT, username);
    };
    socket.on(ESTABLISH_CONNECTION, handleConnection);
    return () => {
      socket.off(ESTABLISH_CONNECTION, handleConnection);
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {!log.login && <LoginMenu />}
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route exact path="/">
            <MainHeader />
            <Lobby />
          </Route>
          <Route path="/instruction">
            <MainHeader />
            <Instruction />
          </Route>
          <Route path="/credit">
            <MainHeader />
            <Credit />
          </Route>
          {/* <Route path="/game" exact>
            <GameContainer mode="single" />
          </Route> */}
          <Route path="/game/:roomId">
            <GameContainer mode="multi" />
          </Route>
          <Route path="/admin" exact>
            <MainHeader />
            <Admin />
          </Route>
          <Route path="*">
            <MainHeader />
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </SocketContext.Provider>
  );
}

export default App;
