import {
  useGetBrandsAndCategoriesQuery,
  useGetFeaturedProductQuery,
  useGetProductsQuery,
} from "../slices/productsApiSlice";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import HorizontalScrollList from "../components/HorizontalScrollList";
import HorizontalScrollBulletList from "../components/HorizontalScrollBulletList";
import TopPickProduct from "../components/TopPickProduct";

const HomeScreen = () => {
  const { data: LatestProducts } = useGetProductsQuery({
    sort: "-createdAt",
  });

  const { data: PopularProducts } = useGetProductsQuery({
    sort: "-soldAmount",
  });

  const { data: FeaturedProduct} = useGetFeaturedProductQuery()

  console.log(FeaturedProduct);
  const recentlyViewedProducts = JSON.parse(
    localStorage.getItem("recentlyViewed")
  );

  const { data: CategorieAndBrands } = useGetBrandsAndCategoriesQuery();

  return (
    <>
      <ProductCarousel />
      <HorizontalScrollBulletList items={CategorieAndBrands?.brands} />

      {recentlyViewedProducts !== null && (
        <HorizontalScrollList
          listTitle="Recently Viewed"
          toolTipText="You recently viewed these products"
          data={recentlyViewedProducts.reverse()}
        />
      )}
      <HorizontalScrollList
        data={LatestProducts?.products}
        listTitle="latest products"
        seeMore={{ title: "see more", link: "/products" }}
      />
      {
        FeaturedProduct && (
          <TopPickProduct product={FeaturedProduct} />
        )
      }
      <HorizontalScrollList
        data={PopularProducts?.products}
        listTitle="Most Popular"
        seeMore={{ title: "see more", link: "/products" }}
        onClickData="-soldAmount"
        toolTipText="Our 'Most Popular' products are the items that have sold the most."
      />

      <Meta />
    </>
  );
};

export default HomeScreen;
