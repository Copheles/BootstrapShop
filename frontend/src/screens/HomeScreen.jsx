import { useGetBrandsAndCategoriesQuery, useGetProductsQuery } from "../slices/productsApiSlice";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import HorizontalScrollList from "../components/HorizontalScrollList";
import HorizontalScrollBulletList from "../components/HorizontalScrollBulletList";

const HomeScreen = () => {
  const { data } = useGetProductsQuery({
    sort: "-createdAt",
  });

  const { data: CategorieAndBrands } = useGetBrandsAndCategoriesQuery();

  return (
    <>
      <ProductCarousel />
      <HorizontalScrollBulletList
        items={CategorieAndBrands?.brands}
      />
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
