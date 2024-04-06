const getFilterListAmount = (data) => {
  let num = 0;
  if(data.keyword !== ""){
    num += 1
  }
  if(data.rating !== ""){
    num += 1
  }
  if(data.brands !== ""){
    const brandsList = data.brands.split(',')
    num += brandsList.length
  }
  if(data.category !== ""){
    const categoriesList = data.category.split(',')
    num += categoriesList.length
  }

  return num;
}



export default getFilterListAmount