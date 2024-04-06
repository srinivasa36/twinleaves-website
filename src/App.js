import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { CircularProgress, Pagination } from "@mui/material";
import SearchFilter from "./components/SearchFilter";
import CategoryFilter from "./components/CategoryFilter";
import ProductDetailsPage from "./components/ProductDetailsPage";
import { Box, Typography } from "@mui/material";

const API_URL =
  "https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 600 },
  { field: "price", headerName: "Price", width: 120 },
  {
    field: "image",
    headerName: "Image",
    width: 150,
    renderCell: (params) => (
      <img
        src={params.value}
        alt="product"
        style={{ width: "100%", height: "auto" }}
      />
    ),
  },
];

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(API_URL, {
          params: {
            page,
          },
        });

        const productsWithImages = response.data.products.map((product) => ({
          ...product,
          image: product.images.front,
          name: product.name,
          price: product.mrp.mrp,
        }));
        setProducts(productsWithImages);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, [page]);

  useEffect(() => {
    setFilteredProducts(
      products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === "" ||
              product.main_category === selectedCategory)
        )
        .map((product, index) => ({
          ...product,
          id: index + 1,
        }))
    );
  }, [searchTerm, selectedCategory, products]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(API_URL);

        const categoriesSet = new Set();
        response.data.products.forEach((product) => {
          categoriesSet.add(product.main_category);
        });

        const categoriesArray = Array.from(categoriesSet);
        setCategories(categoriesArray);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRowClick = (params) => {
    setSelectedProduct(params.row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <Box component="div" display="flex" justifyContent="center">
        <Typography variant="h4" color="#4caf50">
          Twinleaves Grocery
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>
      <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
        {loading ? (
          <CircularProgress
            style={{ position: "absolute", top: "50%", left: "50%" }}
          />
        ) : (
          <DataGrid
            rows={filteredProducts}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[]}
            disableSelectionOnClick
            pagination
            onRowClick={handleRowClick}
            rowHeight={100}
          />
        )}
      </div>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        style={{
          marginTop: "20px",
          marginLeft: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      />
      <ProductDetailsPage
        product={selectedProduct}
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
};

export default App;
