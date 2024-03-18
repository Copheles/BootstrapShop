
import { useGetProductsQuery } from "../slices/productsApiSlice";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { Link, useParams } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import HorizontalScrollList from "../components/HorizontalScrollList";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link className="btn btn-light my-3" to="/">
          <MdOutlineKeyboardBackspace size={30} />
        </Link>
      )}
      <HorizontalScrollList
        data={data?.products}
        listTitle="latest products"
        seeMore={{ title: "see more", link: "/products" }}
      />
      <Meta />
    </>
  );
};

export default HomeScreen;
