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
  const { data: LatestProducts, isLoading: latestProductsLoading } =
    useGetProductsQuery({
      sort: "-createdAt",
    });

  const { data: PopularProducts, isLoading: popularProductsLoading } =
    useGetProductsQuery({
      sort: "-soldAmount",
    });

  const { data: FeaturedProduct, isLoading: featuredProductsLoading } =
    useGetFeaturedProductQuery();
  const recentlyViewedProducts = JSON.parse(
    localStorage.getItem("recentlyViewed")
  );

  const { data: CategorieAndBrands, isLoading: categoriesAndBrandsLoading } =
    useGetBrandsAndCategoriesQuery();

  return (
    <>
      <ProductCarousel />
      <HorizontalScrollBulletList
        items={CategorieAndBrands?.brands}
        isLoading={categoriesAndBrandsLoading}
      />

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
        isLoading={latestProductsLoading}
      />
      {FeaturedProduct && (
        <TopPickProduct
          product={FeaturedProduct}
          isLoading={featuredProductsLoading}
        />
      )}
      <HorizontalScrollList
        data={PopularProducts?.products}
        listTitle="Most Popular"
        seeMore={{ title: "see more", link: "/products" }}
        onClickData="-soldAmount"
        toolTipText="Our 'Most Popular' products are the items that have sold the most."
        isLoading={popularProductsLoading}
      />

      <Meta />
    </>
  );
};

export default HomeScreen;
