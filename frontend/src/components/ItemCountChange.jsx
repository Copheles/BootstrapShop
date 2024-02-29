import { Button, ButtonGroup } from "react-bootstrap";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi2";


const ItemCountChange = ({ qty, setQty, item }) => {

  const handleDecreaseQty = () => {
    if (qty <= 1) {
      return;
    }
    setQty((prev) => prev - 1);
  };

  const handleIncreaseQty = () => {
    if (qty >= item.countInStock) {
      return;
    }
    setQty((prev) => prev + 1);
  };

  return (
    <ButtonGroup>
      <Button
        variant="light"
        onClick={handleDecreaseQty}
        disabled={item.qty === 1}
      >
        <HiOutlineMinus />
      </Button>
      <Button variant="light" disabled color="primary">
        {qty}
      </Button>
      <Button
        variant="light"
        onClick={handleIncreaseQty}
        disabled={item.qty === item.countInStock}
      >
        <HiOutlinePlus />
      </Button>
    </ButtonGroup>
  );
};

export default ItemCountChange;
