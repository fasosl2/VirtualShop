import { useEffect, useMemo, useRef, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { saveProductsAction } from "../../actions/productActions";
import {
  closeModalsAction,
  openModalCreateCategoriesAction,
  openModalSaveItemsAction,
} from "../../actions/modalsActions";
import {
  closeModalsType,
  saveProductsInitType,
  saveProductsSuccessType,
} from "../../storage/types";
import { fetchCategoriesAction } from "../../actions/categoriesActions";
import { getProducts } from "../../services/productServices";
import utilService from "../../services/utilService";
import userLogo from "../../assets/user-logo.png";
import rectangle from "../../assets/rectangle.png";
import { Col, FormImg, Row } from "./styles";

import { MultiRatio } from "../../components/MultiRatio";
import { InputTime } from "../../components/InputTime";

export const ModalCreateProduct = ({ open }) => {
  const { state, dispatch } = useAppContext();
  const { categories: categoriesData } = state;
  const [image, setImage] = useState(rectangle);
  const [categorySearch, setCategorySearch] = useState("");
  const [baseProducts, setBaseProducts] = useState([]);
  const [childList, setChildList] = useState([]);
  const [apiCategoryFilter, setApiCategoryFilter] = useState("");
  const initialProduct = useRef({
    title: "",
    description: "",
    price: 0,
    priceRecife: "",
    priceRMR: "",
    minPeople: "",
    maxPeople: "",
    stock: "",
    image: "",
    categories: [],
    variant: {
      isBase: "Não",
      baseID: "",
    },
    blockedDays: [false, false, false, false, false, false, false],
    startDate: new Date(),
    endDate: new Date(),
  });
  const [productData, setProductData] = useState(initialProduct.current);

  const isEditing = useMemo(
    () => !!state.activeProduct?.id,
    [state.activeProduct]
  );

  const handleCategorySearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Only trigger API call if the search term changes
      if (categorySearch !== apiCategoryFilter) {
        setApiCategoryFilter(categorySearch);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    saveProductsAction(dispatch, { ...productData, image: image });
  };

  useEffect(() => {
    if (open) {
      const fetchOpts = {};
      if (apiCategoryFilter) {
        fetchOpts.title = apiCategoryFilter;
      }
      fetchCategoriesAction(dispatch, fetchOpts);

      const fetchBaseProducts = async () => {
        const result = await getProducts({ limit: 999 });
        if (result?.list) {
          setBaseProducts(result.list);
        }
      };
      fetchBaseProducts();
    }
  }, [open, apiCategoryFilter, dispatch]);

  useEffect(() => {
    if (state.type === saveProductsSuccessType) {
      dispatch(closeModalsAction());
      setProductData(initialProduct.current);
    }
    if (state.type === closeModalsType) {
      setImage(rectangle);
      setProductData(initialProduct.current);
    }
    if (state?.activeProduct?.id && productData === initialProduct.current) {
      const { variant, ...rest } = state.activeProduct;
      setProductData((prevState) => ({
        ...prevState,
        ...rest,
        variant: {
          isBase: variant?.isBase || "Não",
          baseID: variant?.baseID || "",
        },
      }));
    }

    if (productData?.image?.name) {
      const newPreview = async () => {
        const preview = await utilService.imageToCompressedBase64(
          productData.image
        );
        setImage(preview);
      };
      newPreview();
    } else if (productData?.image?.length) {
      setImage(productData?.image);
    } else {
      setImage(rectangle);
    }
    if (state?.selectedItems?.length) {
      setProductData((prevState) => ({
        ...prevState,

        items: state.selectedItems,
      }));
    }
    setChildList(
      baseProducts?.filter((ele) => ele?.variant?.baseID == productData._id) ||
        []
    );
  }, [
    state.type,
    state.activeProduct,
    dispatch,
    productData.image,
    state.selectedItems,
  ]);

  const handleChange = (e, field, variantValue) =>
    setProductData((prevState) => ({
      ...prevState,
      [field]:
        field === "image"
          ? e.target.files[0]
          : field === "variant"
          ? variantValue
          : e.target.value,
    }));

  const handleCreateOrUpdateCategories = (category) => {
    dispatch(openModalCreateCategoriesAction(category));
  };
  const handleHours = (value, field) =>
    setProductData((prevState) => ({
      ...prevState,
      [field]: value,
    }));

  const handleToggleCategory = ({ element, remove }) => {
    // This logic reads the state at render time, making it resilient
    // to a quick double-call event. Both calls will operate on the
    // same initial state, preventing a double increment/decrement.
    const { categories, ...restOfProductData } = productData;
    const existingProduct = categories.find((p) => p.id === element.id);

    let newCategories;

    if (!remove) {
      // Add new product
      newCategories = [...categories, { ...element }];
    } else {
      let index = categories.findIndex((ele) => ele._id == element._id);
      if (index > -1) {
        categories.splice(index);
      }
      newCategories = categories;
    }
    setProductData({ ...restOfProductData, categories: newCategories });
  };
  const handleItemClick = () =>
    dispatch(openModalSaveItemsAction(productData?.items));

  const handleBlockedDays = (index) =>
    setProductData((prevState) => {
      let blockedDays = [...prevState.blockedDays];
      blockedDays[index] = blockedDays[index] ? false : true;
      return {
        ...prevState,
        blockedDays: blockedDays,
      };
    });

  return (
    <Modal
      open={open}
      controls={[
        {
          label: (state?.activeProduct?.id ? "Editar" : "Criar") + " e Salvar",
          loadingLabel: (state?.activeProduct?.id ? "Edit" : "Cri") + "ando",
          loading: state.type === saveProductsInitType,
          variant: "secondary",
          type: "submit",
          form: "create-product-form",
          onClick: () => {},
        },
      ]}
    >
      <Form onSubmit={handleSubmit} id="create-product-form">
        <Form.Group
          className="mb-3"
          controlId="formCreateProduct"
          style={{ display: "grid", justifyItems: "center" }}
        >
          <Row>
            <Col md={3}>
              <FormImg src={image} alt="" />
              <Form.Control
                type="file"
                onChange={(e) => handleChange(e, "image")}
              />
            </Col>
            <Col md={9}>
              <Row>
                <Col md={7}>
                  <Row>
                    <Form.Label>Nome do Produto</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder=""
                      value={productData?.title}
                      onChange={(e) => handleChange(e, "title")}
                    />
                  </Row>
                  <br />
                  <Row>
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={10}
                      required
                      value={productData?.description}
                      onChange={(e) => handleChange(e, "description")}
                    />
                  </Row>
                  <br />
                  {childList?.length ?
                  <Row className="mt-3">
                    <p>Produtos Variantes</p>
                    {childList.map(product =>
                      <p>{product.id} - {product.title}</p>
                    )}
                  </Row>
                  : <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>É um produto com variantes?</Form.Label>
                        <div>
                          <Form.Check
                            inline
                            type="radio"
                            label="Sim"
                            name="isBase"
                            value="Sim"
                            checked={productData?.variant?.isBase === "Sim"}
                            onChange={(e) =>
                              handleChange(e, "variant", {
                                ...productData.variant,
                                isBase: e.target.value,
                              })
                            }
                          />
                          <Form.Check
                            inline
                            type="radio"
                            label="Não"
                            name="isBase"
                            value="Não"
                            checked={productData?.variant?.isBase === "Não"}
                            onChange={(e) =>
                              handleChange(e, "variant", {
                                ...productData.variant,
                                isBase: e.target.value,
                              })
                            }
                          />
                        </div>
                      </Form.Group>
                    </Col>
                    {productData?.variant?.isBase !== "Não" && (
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Produto base</Form.Label>
                          <Form.Select
                            name="baseID"
                            value={productData?.variant?.baseID}
                            onChange={(e) =>
                              handleChange(e, "variant", {
                                ...productData.variant,
                                baseID: e.target.value,
                              })
                            }
                          >
                            <option value="">Nenhum</option>
                            {baseProducts
                              .filter((ele) => ele._id !== productData?._id)
                              .map((p) => (
                                <option
                                  key={p._id}
                                  value={p?.variant?.baseID || p?._id}
                                >
                                  {p.title}
                                </option>
                              ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    )}
                  </Row>}
                </Col>
                <Col md={5}>
                  <Row>
                    <Form.Label>Preço</Form.Label>
                    <Form.Control
                      type="number"
                      required
                      value={productData?.price || 0}
                      onChange={(e) => handleChange(e, "price")}
                    />
                  </Row>
                  <br />

                  <h5 className="mb-2">Selecione Categorias</h5>
                  <Row>
                    <Col md={10} style={{ padding: "1px" }}>
                      <InputGroup className="mb-2">
                        <Form.Control
                          type="text"
                          placeholder="Buscar e pressionar Enter..."
                          value={categorySearch}
                          onChange={(e) => setCategorySearch(e.target.value)}
                          onKeyDown={handleCategorySearch}
                        />
                      </InputGroup>
                    </Col>
                    <Col md={2} style={{ padding: "2px" }}>
                      <Button onClick={handleCreateOrUpdateCategories}>
                        +
                      </Button>
                    </Col>
                  </Row>
                  <ListGroup style={{ maxHeight: "150px", overflowY: "auto" }}>
                    {categoriesData?.list?.map((category) => {
                      const isInProduct = productData.categories.some(
                        (p) => p.id === category.id
                      );
                      return (
                        <ListGroup.Item
                          key={category._id}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <span className="me-2">{category.name}</span>
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() =>
                              handleToggleCategory({ element: category })
                            }
                            disabled={isInProduct}
                          >
                            +
                          </Button>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>

                  <h5>Categorias Selecionadas</h5>
                  <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                    <ListGroup variant="flush">
                      {productData.categories.map((selectedCategory) => {
                        selectedCategory =
                          selectedCategory._id || selectedCategory;
                        selectedCategory = categoriesData?.list.find(
                          (ele) => ele._id == selectedCategory
                        );
                        return (
                          <ListGroup.Item
                            key={selectedCategory._id}
                            className="d-flex justify-content-between align-items-center"
                          >
                            <span>{selectedCategory?.name}</span>
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() =>
                                handleToggleCategory({
                                  element: selectedCategory,
                                  remove: true,
                                })
                              }
                            >
                              -
                            </Button>
                          </ListGroup.Item>
                        );
                      })}
                      {productData.categories.length === 0 && (
                        <p className="text-muted p-2">
                          Nenhuma categoria selecionada.
                        </p>
                      )}
                    </ListGroup>
                  </div>
                  <hr />
                </Col>
              </Row>
              {/* <Row>
                <Col md={7}>
                  <p>dias disponiveis</p>
                  <MultiRatio
                    onClick={handleBlockedDays}
                    elements={productData?.blockedDays}
                    controls={[
                      {
                        label: "D",
                      },
                      {
                        label: "S",
                      },
                      {
                        label: "T",
                      },
                      {
                        label: "Q",
                      },
                      {
                        label: "Q",
                      },
                      {
                        label: "S",
                      },
                      {
                        label: "S",
                      },
                    ]}
                  />
                </Col>
                <Col md={5}>
                  <p>horário disponiveis</p>
                  <Row>
                    <Col>
                      <InputTime
                        className="col-12"
                        startDate={productData?.startDate}
                        setStartDate={(e) => handleHours(e, "startDate")}
                      />
                    </Col>
                    <Col>
                      <InputTime
                        className="col-12"
                        startDate={productData?.endDate}
                        setStartDate={(e) => handleHours(e, "endDate")}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row> */}
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </Modal>
  );
};
