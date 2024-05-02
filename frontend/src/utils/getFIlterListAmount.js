const getFilterListAmount = (data) => {
  let num = 0;
  if (data.keyword !== "") {
    num += 1;
  }
  if (data.rating !== "") {
    num += 1;
  }
  if (data.brands !== "") {
    const brandsList = data.brands.split(",");
    num += brandsList.length;
  }
  if (data.category !== "") {
    console.log('c')
    const categoriesList = data.category.split(",");
    num += categoriesList.length;
  }

  if (data.price !== data.maxPrice) {
    console.log('price: ', data.price, ' maxPrice: ', data.maxPrice)
    num += 1;
  }


  return num;
};

export default getFilterListAmount;
