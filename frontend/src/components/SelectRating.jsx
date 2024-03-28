import { ListGroup } from "react-bootstrap";
import { FaStar, FaRegStar } from "react-icons/fa";

const SelectRating = ({ rating, setRating, dispatch }) => {
  return (
    <div>
      <ListGroup>
        <ListGroup.Item
          onClick={() => dispatch(setRating(5))}
          className={`cursor-pointer ${rating === 5 ? "text-warning" : null}`}
        >
          <FaStar className="icons" />
          <FaStar className="icons" />
          <FaStar className="icons" />
          <FaStar className="icons" />
          <FaStar className="icons" />
        </ListGroup.Item>
        <ListGroup.Item
          onClick={() => dispatch(setRating(4))}
          className={`cursor-pointer ${rating === 4 ? "text-warning" : null}`}
        >
          <FaStar className="icons" />
          <FaStar className="icons" />
          <FaStar className="icons" />
          <FaStar className="icons" />
          <FaRegStar className="icons" />
        </ListGroup.Item>
        <ListGroup.Item
          onClick={() => dispatch(setRating(3))}
          className={`cursor-pointer ${rating === 3 ? "text-warning" : null}`}
        >
          <FaStar className="icons" />
          <FaStar className="icons" />
          <FaStar className="icons" />
          <FaRegStar className="icons" />
          <FaRegStar className="icons" />
        </ListGroup.Item>
        <ListGroup.Item
          onClick={() => dispatch(setRating(2))}
          className={`cursor-pointer ${rating === 2 ? "text-warning" : null}`}
        >
          <FaStar className="icons" />
          <FaStar className="icons" />
          <FaRegStar className="icons" />
          <FaRegStar className="icons" />
          <FaRegStar className="icons" />
        </ListGroup.Item>
        <ListGroup.Item
          onClick={() => dispatch(setRating(1))}
          className={`cursor-pointer ${rating === 1 ? "text-warning" : null}`}
        >
          <FaStar className="icons" />
          <FaRegStar className="icons" />
          <FaRegStar className="icons" />
          <FaRegStar className="icons" />
          <FaRegStar className="icons" />
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default SelectRating;
