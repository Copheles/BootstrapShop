import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text, clsName="" }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
      className="my-1"
    >
      <div className={clsName}>
        <span className="text-warning">
          {value >= 1 ? (
            <FaStar />
          ) : value >= 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span className="text-warning">
          {value >= 2 ? (
            <FaStar />
          ) : value >= 1.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span className="text-warning">
          {value >= 3 ? (
            <FaStar />
          ) : value >= 2.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span className="text-warning">
          {value >= 4 ? (
            <FaStar />
          ) : value >= 3.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span className="text-warning">
          {value >= 5 ? (
            <FaStar />
          ) : value >= 4.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
      </div>
      <div
        style={{
          paddingTop: "3px",
          paddingLeft: "10px",
          fontSize: "16px",
        }}
      >
        <span className={`text-secondary ${clsName}`}>
          {text && text}
        </span>
      </div>
    </div>
  );
};

export default Rating;
