import { Container } from "./styles";
import { Pagination as PaginationBS, Form } from "react-bootstrap";

export const Pagination = ({ page, pages, setPage, limit, setLimit, state, itemsArray }) => {
  return (
    <Container>
      <PaginationBS>
        <PaginationBS.Prev
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        />
        <PaginationBS.Item active>{page}</PaginationBS.Item>
        <PaginationBS.Next
          disabled={
            typeof pages === "number"
              ? page >= pages
              : itemsArray.length < limit
          }
          onClick={() => setPage((p) => p + 1)}
        />
      </PaginationBS>

      <Form.Select
        value={limit}
        onChange={(e) => {
          setLimit(parseInt(e.target.value, 10));
          setPage(1);
        }}
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={9999}>Todos</option>
      </Form.Select>
    </Container>
  );
};
