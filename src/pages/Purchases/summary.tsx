import { Container, Row, Col, Button } from "react-bootstrap";
import type { IChartProduct } from "../../interfaces/Chart";

interface IPurchase {
  productTotals: IChartProduct[];
}

const handlePrintResumo = (productTotals: IChartProduct[]) => {
  if (!productTotals.length) {
    return;
  }

  const printWindow = window.open("", "", "height=600,width=800");
  if (!printWindow) {
    return;
  }

  const productList = productTotals
    .map(
      (product) =>
        `<li><strong>${product.title}:</strong> ${product.count} unidades</li>`
    )
    .join("");

  printWindow.document.body.innerHTML = `
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; }
      h1 { font-size: 24px; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
      ul { list-style-type: none; padding: 0; }
      li { font-size: 16px; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
    </style>
    <h1>Resumo de Produtos</h1>
    <ul>${productList}</ul>
  `;

  printWindow.document.title = "Resumo de Produtos";
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
};

export const PurchaseSummary = ({ productTotals }: IPurchase) => {
  return (
    <Container className="mt-4 pt-4 border-top">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Resumo de Pedidos</h4>
        <Button
          variant="outline-secondary"
          onClick={() => handlePrintResumo(productTotals)}
          disabled={productTotals.length === 0}
        >
          Imprimir
        </Button>
      </div>
      {productTotals.length > 0 ? (
        <Row>
          {productTotals.map((product, index) => (
            <Col md={4} sm={6} xs={12} key={product._id ?? `${product.title}-${index}`} className="mb-2">
              <strong>{product.title}</strong>
              <p>{product.count} unidades</p>
            </Col>
          ))}
        </Row>
      ) : (
        <p>Nenhum produto para exibir no resumo.</p>
      )}
    </Container>
  );
};
