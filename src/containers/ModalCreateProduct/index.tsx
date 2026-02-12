import { useEffect, /* useMemo, */ useRef, useState, type ChangeEvent } from "react";
import { Modal } from "../../components/Modal";
import { Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { saveProductsAction } from "../../actions/productActions";
import {
  closeModalsAction,
  openModalCreateCategoriesAction,
  //openModalSaveItemsAction,
} from "../../actions/modalsActions";
import {
  closeModalsType,
  saveProductsInitType,
  saveProductsSuccessType,
} from "../../storage/actionConstants";
import { fetchCategoriesAction } from "../../actions/categoriesActions";
import { getProducts } from "../../services/productServices";
import utilService from "../../services/utilService";
import rectangle from "../../assets/rectangle.png";
import { Col, FormImg, Row } from "./styles";

import type { IProduct } from "../../interfaces/Product";
import type { ICategory } from "../../interfaces/Category";
//import type { SelectedItem } from "../../interfaces/Item";

interface ModalCreateProductProps {
  open: boolean;
}

export const ModalCreateProduct = ({ open }: ModalCreateProductProps) => {
  const { state, dispatch } = useAppContext();
  const { categories: categoriesData } = state;
  const [image, setImage] = useState(rectangle);
  const [categorySearch, setCategorySearch] = useState("");
  const [baseProducts, setBaseProducts] = useState<IProduct[]>([]);
  const [childList, setChildList] = useState<IProduct[]>([]);
  const [apiCategoryFilter, setApiCategoryFilter] = useState("");
  const initialProduct = useRef<IProduct>({
    _id: "",
    title: "",
    shortTitle: "",
    description: "",
    price: 0,
    priceRecife: "",
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
  const [productData, setProductData] = useState<IProduct>(initialProduct.current);

  // const isEditing = useMemo(
  //   () => !!state.activeProduct?._id,
  //   [state.activeProduct]
  // );

  const handleCategorySearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Only trigger API call if the search term changes
      if (categorySearch !== apiCategoryFilter) {
        setApiCategoryFilter(categorySearch);
      }
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    saveProductsAction(dispatch, { ...productData, image: image });
  };

  useEffect(() => {
    if (state.type === saveProductsSuccessType) {
      dispatch(closeModalsAction());
      setProductData(initialProduct.current);
    }
    if (state.type === closeModalsType) {
      setImage(rectangle);
      setProductData(initialProduct.current);
    }
    if (state?.activeProduct?._id && productData === initialProduct.current) {
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

    if (productData?.image instanceof File) {
      const newPreview = async () => {
        const preview = await utilService.imageToCompressedBase64(
          productData.image as File
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
    if(productData?._id && baseProducts?.length) {
        setChildList(
          baseProducts?.filter(({ variant }) => variant?.baseID && variant?.baseID == productData._id) || []);
    }
  }, [
    state.type,
    state.activeProduct,
    dispatch,
    productData.image,
    state.selectedItems,
  ]);

  useEffect(() => {
    if (open) {
      const fetchOpts: { name?: string } = {};
      if (apiCategoryFilter) {
        fetchOpts.name = apiCategoryFilter;
      }
      fetchCategoriesAction(dispatch, fetchOpts);

      const fetchBaseProducts = async () => {
        const result = await getProducts({ limit: 999 });
        if (result?.list) {
          setBaseProducts(result.list);

          if(productData?._id && baseProducts?.length) {
            setChildList(
              result.list?.filter(({ variant } : IProduct) => productData?._id && variant?.baseID && variant?.baseID == productData._id) || []
            );
          }
        }
      };
      fetchBaseProducts();
    }
  }, [open, apiCategoryFilter, dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: keyof IProduct, variantValue?: any) =>
    setProductData((prevState) => ({
      ...prevState,
      [field]:
        field === "image"
          ? (e.target as HTMLInputElement).files?.[0]
          : field === "variant"
          ? variantValue
          : e.target.value,
    }));

  const handleCreateOrUpdateCategories = (category: ICategory) => {
    dispatch(openModalCreateCategoriesAction(category));
  };

  const handleToggleCategory = ({ element, remove }: { element: ICategory, remove?: boolean }) => {
    const { categories, ...restOfProductData } = productData;
    //const existingProduct = categories.find((p: ICategory) => p._id === element._id);

    let newCategories;

    if (!remove) {
      newCategories = [...categories, { ...element }];
    } else {
      let index = categories.findIndex((ele: ICategory) => ele._id == element._id);
      if (index > -1) {
        categories.splice(index);
      }
      newCategories = categories;
    }
    setProductData({ ...restOfProductData, categories: newCategories });
  };
  // const handleItemClick = () =>
  //   dispatch(openModalSaveItemsAction(productData?.items as SelectedItem[]));

  // const handleBlockedDays = (index: number) =>
  //   setProductData((prevState) => {
  //     let blockedDays = [...(prevState.blockedDays as boolean[])];
  //     blockedDays[index] = !blockedDays[index];
  //     return {
  //       ...prevState,
  //       blockedDays: blockedDays,
  //     };
  //   });

  return (
    <Modal
      open={open}
      controls={[
        {
          label: (state?.activeProduct?._id ? "Editar" : "Criar") + " e Salvar",
          loadingLabel: (state?.activeProduct?._id ? "Edit" : "Cri") + "ando",
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
              <Row>
              <FormImg src={image} alt="" />
              <Form.Control
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, "image")}
              />
              </Row>
              <Row>
                <Form.Label>Nome Curto</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder=""
                  value={productData?.shortTitle}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, "shortTitle")}
                />
              </Row>
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
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, "title")}
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
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange(e, "description")}
                    />
                  </Row>
                  <br />
                  {childList?.length ?
                  <Row className="mt-3">
                    <p>Produtos Variantes</p>
                    {childList.map(product =>
                      <p key={product._id}>{product._id} - {product.title}</p>
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
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, "price")}
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
                      <Button onClick={() => handleCreateOrUpdateCategories({ name: "", description: ""})}>
                        +
                      </Button>
                    </Col>
                  </Row>
                  <ListGroup style={{ maxHeight: "150px", overflowY: "auto" }}>
                    {categoriesData?.list?.map((category: ICategory) => {
                      const isInProduct = productData.categories.some(
                        (currentCategory) => currentCategory._id === category._id
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
                      {productData.categories.map((selectedCategory: ICategory | string) => {
                        const category = typeof selectedCategory === 'string'
                          ? categoriesData?.list.find((ele: ICategory) => ele._id === selectedCategory)
                          : categoriesData?.list.find((ele: ICategory) => ele._id === selectedCategory._id);
                        
                        if (!category) return null;

                        return (
                          <ListGroup.Item
                            key={category._id}
                            className="d-flex justify-content-between align-items-center"
                          >
                            <span>{category?.name}</span>
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() =>
                                handleToggleCategory({
                                  element: category,
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
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </Modal>
  );
};
