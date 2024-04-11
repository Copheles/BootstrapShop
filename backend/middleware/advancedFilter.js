const advancedFilter = (model, populate, selectFields) => async (req, res, next) => {
  let query;
  let queryObj;

  const reqQuery = { ...req.query };
  // console.log('The whole req.query', req.query)

  // Fields to exclude
  const removeFields = ['select', 'sort', 'pageNumber', 'limit', 'keyword', 'rating', 'brand', 'category'];
  removeFields.forEach((param) => delete reqQuery[param]);

  // Convert query object to string and create operators for $gt, $gte, etc.
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Construct keyword search criteria
  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};

  // Merge query criteria with keyword
  queryObj = { ...JSON.parse(queryStr), ...keyword };

  if(req.query.rating && req.query.rating !== ""){
    queryObj["rating"] = req.query.rating;
  }

  if(req.query.brand && req.query.brand !== ""){
    const brands = req.query.brand.split(',')
    queryObj['brand'] = brands
  }

  if(req.query.category && req.query.category !== ""){
    const categories = req.query.category.split(',')
    queryObj['category'] = categories
  }



  // console.log(queryObj)
  // Construct the query
  query = model.find(queryObj);

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Populate
  if (populate) {
    // If `populate` is an object, use it as options for `populate()`
    if (typeof populate === 'object') {
      query = query.populate({ path: populate.path, select: selectFields.join(' ') });
    } else {
      query = query.populate(populate);
    }
  }

  // Pagination
  const page = Number(req.query.pageNumber) || 1;
  const pageSize = 8;


  // Count total documents matching the query criteria, including keyword search
  const total = await model.countDocuments(queryObj);

  // Skip and limit for pagination
  query = query.skip(pageSize * (page - 1)).limit(pageSize);

  // Execute the query
  const results = await query;

  // Calculate total number of pages
  const pages = Math.ceil(total / pageSize);

  // Add results to the response object
  res.advancedResults = {
    data: results,
    total,
    page,
    pages
  };

  next();
};

export default advancedFilter;
