import Card from "../../../UI/Card";
import RoomItem from "./roomItem/RoomItem";

const GameRoom = (props) => {
  return (
    <section>
      <Card>
        <ul>
          {props.rooms === {}
            ? []
            : Object.keys(props.rooms).map((roomId, index) => (
                <RoomItem key={index} room={props.rooms[roomId]} />
              ))}
        </ul>
      </Card>
    </section>
  );
};

export default GameRoom;
