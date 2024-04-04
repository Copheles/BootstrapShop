import { ListGroup } from "react-bootstrap";
import { FaStar, FaRegStar } from "react-icons/fa";

const SelectRating = ({ rating, setRating, dispatch }) => {
  const handleChangeClick = (num) => {
    if (rating === "") {
      dispatch(setRating(num));
    } 
    else if(rating === num){
      dispatch(setRating(""))
    }
    else {
      dispatch(setRating(num));
    }
  };

  return (
    <div>
      <ListGroup>
        <ListGroup.Item
          onClick={() => handleChangeClick(5)}
          className={`cursor-pointer ${rating === 5 ? "text-warning" : null}`}
        >
          <FaStar className="icons" />
          <FaStar className="icons" />
          <FaStar className="icons" />
          <FaStar className="icons" />
          <FaStar className="icons" />
        </ListGroup.Item>
        <ListGroup.Item
          onClick={() => handleChangeClick(4)}
          className={`cursor-pointer ${rating === 4 ? "text-warning" : null}`}
        >
          <FaStar className="icons" />
          <FaStar className="icons" />
          <FaStar className="icons" />
          <FaStar className="icons" />
          <FaRegStar className="icons" />
        </ListGroup.Item>
        <ListGroup.Item
          onClick={() => handleChangeClick(3)}
          className={`cursor-pointer ${rating === 3 ? "text-warning" : null}`}
        >
          <FaStar className="icons" />
          <FaStar className="icons" />
          <FaStar className="icons" />
          <FaRegStar className="icons" />
          <FaRegStar className="icons" />
        </ListGroup.Item>
        <ListGroup.Item
          onClick={() => handleChangeClick(2)}
          className={`cursor-pointer ${rating === 2 ? "text-warning" : null}`}
        >
          <FaStar className="icons" />
          <FaStar className="icons" />
          <FaRegStar className="icons" />
          <FaRegStar className="icons" />
          <FaRegStar className="icons" />
        </ListGroup.Item>
        <ListGroup.Item
          onClick={() => handleChangeClick(1)}
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
