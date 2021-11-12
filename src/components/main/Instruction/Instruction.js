import classes from "./Instruction.module.css";

const Instruction = () => {
  return (
    <div className={classes.instruction_container}>
      <div>
        <div>- Place your ships</div>
      </div>
      <div>
        <div>- Select a square on the opponent's grid</div>
        <div className={classes.control}>
          <div>
            <div className={classes.boxred}></div>
            <p>Hit</p>
          </div>
          <div>
            <div className={classes.boxblack}></div>
            <p>Miss</p>
          </div>
        </div>
      </div>
      <div>
        <div>- Alternate turns to select a square</div>
      </div>
      <div>
        <div>- If all boats are down a player loses, vice versa</div>
      </div>
    </div>
  );
};
export default Instruction;
