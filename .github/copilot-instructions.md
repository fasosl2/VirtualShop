# VirtualShop AI Coding Guidelines

## Architecture Overview
This is a React e-commerce application built with Vite, using TypeScript for configuration. State is managed globally via `useReducer` and `Context` (see `src/storage/AppContext.jsx`). Data flows: Components dispatch async actions → Services make API calls → Reducer updates state.

Key directories:
- `src/pages/`: Route components (e.g., Products, Purchases)
- `src/containers/`: Complex modals/forms (e.g., ModalCreateProduct)
- `src/components/`: Reusable UI elements (e.g., ProductCard)
- `src/actions/`: Async thunks dispatching init/success actions
- `src/services/`: API calls with auth tokens
- `src/storage/`: Reducer and types

## State Management
- Use `useAppContext()` for state access and `dispatch()` for actions.
- Actions follow pattern: `initAction` → service call → `successAction` with payload.
- Modals controlled by `state.mode` (e.g., `openModalCreateProductType`).
- Example: `dispatch(openModalCreateProductAction())` to open modal.

## API Integration
- Base URL: `import.meta.env.VITE_APP_API`
- Auth: Include `x-access-token` from `getUserToken()`.
- Responses normalized in `apiService.jsx` (adds `id` from `_id`, ensures `list` array).
- Services handle CRUD; actions wrap them with dispatch.

## UI Patterns
- Bootstrap for layout/forms; 
- Styled Components for custom styles (e.g., `src/pages/Products/styles.jsx`).
- Pagination: Use `Pagination` component with `page`, `pages`, `setPage`.
- Images: Default to `rectangle.png`; resize with `react-image-file-resizer`.
- Dates: Use `moment` for formatting; `react-datepicker` for inputs.

## Common Workflows
- Add product: Dispatch `saveProductsAction` in `ModalCreateProduct`.
- Shopping cart: `saveProductsInChartAction` increments count in `state.chart.products`.
- Filters: Update `filters` state, call `fetchProductsAction({ page, ...filters })`.
- Run dev: `npm run dev` (Vite HMR).
- Build: `npm run build` (includes TypeScript check).
- Lint: `npm run lint` (ESLint with React rules).

## Conventions
- File extensions: `.jsx` for components, `.tsx` for config.
- Imports: Relative paths (e.g., `../../services/apiService`).
- Async actions: Include `utilService.sleep(100)` for UI feedback.
- Product items: JSON.stringify/parse for storage.
- Error handling: Check `response?.message === "Autentication failed"` to redirect.

## Dependencies
- React Router for navigation (routes in `App.jsx`).
- Swiper for carousels (e.g., home page).
- ExcelJS/jsPDF for exports (in Purchases).
- Avoid direct DOM manipulation; use refs sparingly.</content>
<parameter name="filePath">d:\Workspace\VirtualShop\.github\copilot-instructions.md