import React from "react";
import Card from "../components/UI/Card";
import RoomDetail from "./RoomDetail";

const ControlItem = (props) => {
  return (
    <section>
      <Card>
        <ul>
          {props.rooms === {}
            ? []
            : Object.keys(props.rooms).map((roomId, index) => (
                <RoomDetail key={index} room={props.rooms[roomId]} />
              ))}
        </ul>
      </Card>
    </section>
  );
};

export default ControlItem;
// export default ControlItem();  ????
