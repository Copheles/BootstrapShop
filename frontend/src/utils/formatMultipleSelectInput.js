const formatMultipleSelectInput = (items, data) => {
  if (items.length === 0 || data === "") {
    return data;
  } else {
    let itemsList = items.split(",");
    if (itemsList.includes(data)) {
      const filteredData = itemsList.filter((item) => item !== data);

      itemsList = filteredData;
    } else {
      itemsList.push(data);
    }

    return itemsList.join(",");
  }
};

export { formatMultipleSelectInput };
