import React from "react";
import { Box, Typography, Modal, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

const ProductDetailsPage = ({ product, open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ overflowY: "auto" }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          padding: "20px",
          overflowY: "auto",
          width: "80%",
          maxWidth: "600px",
          height: "80vh",
        }}
      >
        <IconButton
          style={{ position: "absolute", top: "10px", right: "10px" }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px 0",
          }}
        >
          {product && (
            <img
              src={product.image}
              alt={product.brand}
              style={{ width: "100%", height: "auto" }}
            />
          )}
          <Box marginTop="20px">
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 700,
                marginBottom: "10px",
                fontFamily: "cursive",
              }}
            >
              Product Details
            </Typography>
            <Typography>
              {product && (
                <>
                  <Typography
                    marginBottom="10px"
                    sx={{ fontSize: "16px", opacity: 0.7 }}
                  >
                    <strong>Name:</strong> {product.name}
                  </Typography>
                  <Typography
                    marginBottom="10px"
                    sx={{ fontSize: "16px", opacity: 0.7 }}
                  >
                    <strong>Price:</strong> {product.price}
                  </Typography>
                  <Typography
                    marginBottom="10px"
                    sx={{ fontSize: "16px", opacity: 0.7 }}
                  >
                    <strong>Description:</strong> {product.description}
                  </Typography>
                </>
              )}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={handleClose}>
            Buy Now
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductDetailsPage;
