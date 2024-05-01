import React from "react";
import {
  Card,
  Badge,
  OverlayTrigger,
  Tooltip,
  Placeholder,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import recentlyViewedToLocalStorage from "../utils/recentlyViewedToLocalStorage";
import { useDispatch } from "react-redux";
import { setSort } from "../slices/filterSlice";

const HorizontalScrollList = ({
  data,
  listTitle = "",
  seeMore = null,
  toolTipText = "",
  onClickData = "",
  isLoading,
  recentViewed = false,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (item) => {
    recentlyViewedToLocalStorage(item);

    navigate(`/products/${item._id}`);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {toolTipText}
    </Tooltip>
  );

  const handleClickSeeMore = () => {
    if (onClickData !== "") {
      dispatch(setSort(onClickData));
    }

    return;
  };

  return (
    <>
      <div className="horizontal-scroll-header">
        <h2 className="d-flex align-items-center gap-1">
          {listTitle}{" "}
          {toolTipText !== "" && (
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 150 }}
              overlay={renderTooltip}
            >
              <Badge
                pill
                bg="dark"
                className="cursor-pointer questionmark-badge"
              >
                ?
              </Badge>
            </OverlayTrigger>
          )}
        </h2>
        {seeMore !== null && (
          <Link
            to={seeMore.link}
            id="see-more-link"
            onClick={handleClickSeeMore}
          >
            {seeMore.title}
            <MdKeyboardDoubleArrowRight className="see-more-icon" />
          </Link>
        )}
      </div>
      {/* _id, image, name, price */}
      {isLoading ? (
        <div className="horizontal-scroll-container">
          <Card className="scroll-item card-with-aspect-ratio">
            <Placeholder className="aspect-ratio-wrapper">
              <Card.Img variant="top" className="card-img" />
            </Placeholder>
            <Card.Body>
              <Card.Title className="custom_card_title">
                <Placeholder xs={10} />
              </Card.Title>
              <Card.Text className="custom_card_text">
                <Placeholder xs={5} />
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="scroll-item card-with-aspect-ratio">
            <Placeholder className="aspect-ratio-wrapper">
              <Card.Img variant="top" className="card-img" />
            </Placeholder>
            <Card.Body>
              <Card.Title className="custom_card_title">
                <Placeholder xs={10} />
              </Card.Title>
              <Card.Text className="custom_card_text">
                <Placeholder xs={5} />
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="scroll-item card-with-aspect-ratio">
            <Placeholder className="aspect-ratio-wrapper">
              <Card.Img variant="top" className="card-img" />
            </Placeholder>
            <Card.Body>
              <Card.Title className="custom_card_title">
                <Placeholder xs={10} />
              </Card.Title>
              <Card.Text className="custom_card_text">
                <Placeholder xs={5} />
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="scroll-item card-with-aspect-ratio">
            <Placeholder className="aspect-ratio-wrapper">
              <Card.Img variant="top" className="card-img" />
            </Placeholder>
            <Card.Body>
              <Card.Title className="custom_card_title">
                <Placeholder xs={10} />
              </Card.Title>
              <Card.Text className="custom_card_text">
                <Placeholder xs={5} />
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="scroll-item card-with-aspect-ratio">
            <Placeholder className="aspect-ratio-wrapper">
              <Card.Img variant="top" className="card-img" />
            </Placeholder>
            <Card.Body>
              <Card.Title className="custom_card_title">
                <Placeholder xs={10} />
              </Card.Title>
              <Card.Text className="custom_card_text">
                <Placeholder xs={5} />
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="scroll-item card-with-aspect-ratio">
            <Placeholder className="aspect-ratio-wrapper">
              <Card.Img variant="top" className="card-img" />
            </Placeholder>
            <Card.Body>
              <Card.Title className="custom_card_title">
                <Placeholder xs={10} />
              </Card.Title>
              <Card.Text className="custom_card_text">
                <Placeholder xs={5} />
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="scroll-item card-with-aspect-ratio">
            <Placeholder className="aspect-ratio-wrapper">
              <Card.Img variant="top" className="card-img" />
            </Placeholder>
            <Card.Body>
              <Card.Title className="custom_card_title">
                <Placeholder xs={10} />
              </Card.Title>
              <Card.Text className="custom_card_text">
                <Placeholder xs={5} />
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <div className="horizontal-scroll-container">
          {data?.map((item) => (
            <Card
              key={item._id}
              className="scroll-item card-with-aspect-ratio"
              onClick={() => handleClick(item)}
            >
              <div className="aspect-ratio-wrapper">
                <Card.Img variant="top" src={item.image} className="card-img" />
              </div>
              <Card.Body>
                <Card.Title className="custom_card_title">
                  <Link to="/">{item.name}</Link>
                </Card.Title>
                {!recentViewed && (
                  <Card.Text className="custom_card_text">
                    {item.discountPercent > 0 ? (
                      <p
                        className="custom_card_text"
                        style={{ fontWeight: 500 }}
                      >
                        {(
                          item.price -
                          item.price * (item.discountPercent / 100)
                        ).toFixed(2)}
                        <span className="discountPrice">{item.price}</span>
                      </p>
                    ) : (
                      <p className="custom_card_text">{item.price}</p>
                    )}
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default HorizontalScrollList;
