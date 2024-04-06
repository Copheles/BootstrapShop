const recentlyViewedToLocalStorage = (item) => {
  const recentlyViewedProducts = JSON.parse(
    localStorage.getItem("recentlyViewed")
  );

  const { _id, image, name, price } = item;

  if (recentlyViewedProducts === null) {
    localStorage.setItem(
      "recentlyViewed",
      JSON.stringify([{ _id, image, name, price }])
    );
  } else {
    if (recentlyViewedProducts.length > 7) {
      recentlyViewedProducts.shift();
    }

    const filterViewedItems = recentlyViewedProducts.filter(
      (item) => item._id !== _id
    );
    console.log(filterViewedItems);
    filterViewedItems.push({ _id, image, name, price });
    localStorage.setItem("recentlyViewed", JSON.stringify(filterViewedItems));
  }
};

export default recentlyViewedToLocalStorage;
