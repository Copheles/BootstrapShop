import { LinkContainer } from "react-router-bootstrap";
import {
  Table,
  Button,
  Row,
  Col,
  Modal,
  Form,
  ButtonGroup,
  OverlayTrigger,
  Tooltip,
  Spinner,
} from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PaginationCustom from "../../components/PaginationCustom";

const ProductListScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(1);
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { pageNumber } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

  const [createProduct, { isLoading: loadingCrateProduct }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDeleteProduct }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        const res = await deleteProduct(id);
        console.log(res);
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("countInStock", countInStock);
    formData.append("description", description);
    formData.append("image", imageFile);
    try {
      await createProduct(formData);
      toast.success("Product created");
      setName("");
      setPrice(0);
      setBrand("");
      setCategory("");
      setCountInStock(1);
      setDescription("");
      setImageFile(null);
      handleClose();
    } catch (error) {
      toast.error(error?.data.message || error.error);
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Create a product
    </Tooltip>
  );

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title as="h2">Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

            <Form.Group controlId="image" className="my-3">
              <Form.Control
                label="Choose File"
                onChange={handleImageChange}
                type="file"
              ></Form.Control>
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
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button
              type="submit"
              className="w-100"
              variant="dark"
              style={{ marginTop: "1rem" }}
              disabled={loadingCrateProduct}
            >
              {loadingCrateProduct ? <Spinner size="sm" /> : "Save"}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Row className="align-items-center">
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className="text-end">
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 150 }}
            overlay={renderTooltip}
          >
            <Button
              className="btn-sm m-3"
              variant="secondary"
              onClick={handleShow}
            >
              <div className=" d-flex align-items-center">
                <IoMdAdd size={20} />
              </div>
            </Button>
          </OverlayTrigger>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <ButtonGroup>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit className="icons" />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product._id)}
                        disabled={loadingDeleteProduct}
                      >
                        <FaTrash className="icons" />
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <PaginationCustom
            pages={data.pages}
            page={data.page}
            link={`/admin/productList/page`}
          />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
