import { useGetProductsQuery } from "../slices/productsApiSlice";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import HorizontalScrollList from "../components/HorizontalScrollList";

const HomeScreen = () => {
  const { data } = useGetProductsQuery({
    sort: "-createdAt",
  });

  return (
    <>
      <ProductCarousel />
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
