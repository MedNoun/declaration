import "./styles.css";
function Frame(props) {
  return (
    <div className="frame">
      <div className="imagewraper">
        <img src={props.link} alt="" />
      </div>
    </div>
  );
}

export default Frame;
