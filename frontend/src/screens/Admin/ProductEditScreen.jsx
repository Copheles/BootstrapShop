import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Spinner, Image } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useGetProductQuery,
  useImageUploadMutation,
  useUpdateProductMutation,
} from "../../slices/productsApiSlice";

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0)
  const [brand, setBrand] = useState("");
  const [, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const { data: product, isLoading, error } = useGetProductQuery(productId);

  console.log("productId: ", productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadUpdateImage, { isLoading: loadingImage }] =
    useImageUploadMutation();

  const navigate = useNavigate();

  const imageUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadUpdateImage({
        data: formData,
        id: productId,
      }).unwrap();
      setImage(res.image);
      toast.success("Image updated");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      name,
      price,
      discountPercent,
      description,
      brand,
      category,
      countInStock,
      isFeatured,
    };

    try {
      await updateProduct({ data, id: productId }).unwrap(); // Pass formData and productId separately
      toast.success("Product updated");
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setBrand(product.brand);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setIsFeatured(product.isFeatured);
      setDiscountPercent(product.discountPercent)
    }
  }, [product]);

  return (
    <>
      <Link to="/admin/productList" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h2 className="mb-5">Edit Product</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price" className="my-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="discountPercent" className="my-3">
              <Form.Label>Discount Percentage</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter discount percentage"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="Image" className="my-3">
              {loadingImage ? <Loader /> : <Image src={product.image} fluid />}
            </Form.Group>

            <Form.Group controlId="image" className="my-3">
              <Form.Control
                label="Choose File"
                onChange={imageUpload}
                type="file"
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAdmin" className="my-3">
              <Form.Check
                type="checkbox"
                label="is Featured Product"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId="brand" className="my-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock" className="my-3">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category" className="my-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description" className="my-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                placeholder="Enter description"
                value={description}
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              className="mb-5"
              variant="dark"
              style={{ marginTop: "1rem" }}
              disabled={loadingUpdate}
            >
              {loadingUpdate ? <Spinner size="sm" /> : "Update"}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
