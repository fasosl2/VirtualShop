# VirtualShop

This is a web application for a virtual shop, built with React and TypeScript. It provides a platform for users to browse products, add them to a cart, and make purchases.

## Features

*   **Product Management:** Create, edit, and delete products.
*   **User Management:** Manage user accounts and roles.
*   **Shopping Cart:** Add products to a cart and proceed to checkout.
*   **Purchase History:** View a history of past purchases.
*   **Categories:** Organize products into categories.
*   **Reporting:** Generate reports in PDF and Excel formats.
*   **Calendar:** A calendar feature for scheduling or tracking events.

## Tech Stack

*   **Frontend:**
    *   [React](https://reactjs.org/)
    *   [TypeScript](https://www.typescriptlang.org/)
    *   [Vite](https://vitejs.dev/)
    *   [React Router](https://reactrouter.com/) for routing.
    *   [Styled Components](https://styled-components.com/) for styling.
    *   [Bootstrap](https://getbootstrap.com/) and [React-Bootstrap](https://react-bootstrap.github.io/) for UI components.
    *   [Swiper](https://swiperjs.com/) for carousels.
*   **Tooling:**
    *   [ESLint](https://eslint.org/) for linting.
    *   [TypeScript](https://www.typescriptlang.org/) for type checking.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   [Node.js](https://nodejs.org/en/) (v18 or higher)
*   [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/VirtualShop.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```

### Usage

To run the app in development mode, run the following command:

```sh
npm run dev
```

This will start the development server at `http://localhost:5173`.

To build the app for production, run the following command:

```sh
npm run build
```

This will create a `dist` folder with the production-ready files.

## Project Structure

The project structure is as follows:

```
├── src
│   ├── actions       # Redux-like actions
│   ├── assets        # Images, fonts, etc.
│   ├── components    # Reusable React components
│   ├── containers    # Components that are connected to the store
│   ├── interfaces    # TypeScript interfaces
│   ├── pages         # Top-level page components
│   ├── partials      # Partials like header and footer
│   ├── services      # API calls and other services
│   ├── storage       # AppContext and reducer
│   └── styles        # Global styles
├── public            # Public assets
├── package.json
└── vite.config.ts
```

## Env File
Use VITE_APP_API to consume backend API