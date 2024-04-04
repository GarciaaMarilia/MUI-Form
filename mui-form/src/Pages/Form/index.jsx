import React, { useState } from "react";
import {
 Button,
 MenuItem,
 TextField,
 Box,
 Grid,
 Paper,
 Typography,
 IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";

import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const StyledDropZone = styled("div")({
 border: "2px dashed #aaa",
 borderRadius: "5px",
 padding: "20px",
 textAlign: "center",
 cursor: "pointer",
});

const Formulario = () => {
 const [selectedImages, setSelectedImages] = useState([]);
 const [mainImageIndex, setMainImageIndex] = useState(null);
 const { register, handleSubmit } = useForm();

 const onFormSubmit = (data) => {
  console.log(data);
 };

 const handleImageDrop = (event) => {
  event.preventDefault();
  const files = event.dataTransfer.files;

  const imagesArray = [];

  for (let i = 0; i < files.length; i++) {
   const file = files[i];
   imagesArray.push(file);
  }

  const combinedImages = [...selectedImages, ...imagesArray.slice(0, 15)];
  setSelectedImages(combinedImages);
 };

 const removeImage = (index) => {
  setSelectedImages((prevState) => prevState.filter((_, i) => i !== index));
  if (mainImageIndex === index) {
   setMainImageIndex(null);
  }
 };

 const setMainImage = (index) => {
  setMainImageIndex(index);
 };

 const handleFileChange = (event) => {
  const files = event.target.files;

  const imagesArray = [];

  for (let i = 0; i < files.length; i++) {
   const file = files[i];
   imagesArray.push(file);
  }

  const combinedImages = [...selectedImages, ...imagesArray.slice(0, 15)];
  setSelectedImages(combinedImages);
 };

 return (
  <Box sx={{ mt: 2, padding: "40px" }}>
   <Box sx={{ mb: 2 }}>
    <Typography variant="h5">Informações Gerais</Typography>
   </Box>
   <form onSubmit={handleSubmit(onFormSubmit)}>
    <Grid container spacing={2}>
     <Grid item xs={6}>
      <TextField
       {...register("nome")}
       label="Nome do Produto"
       fullWidth
       margin="normal"
      />
     </Grid>

     <Grid item xs={6}>
      <TextField
       {...register("tipo")}
       select
       label="Tipo"
       fullWidth
       margin="normal"
       defaultValue=""
      >
       <MenuItem value="Tipo 1">Tipo 1</MenuItem>
       <MenuItem value="Tipo 2">Tipo 2</MenuItem>
       <MenuItem value="Tipo 3">Tipo 3</MenuItem>
      </TextField>
     </Grid>
     <Grid item xs={6}>
      <TextField
       {...register("codigo")}
       label="Código"
       fullWidth
       margin="normal"
      />
     </Grid>

     <Grid item xs={6}>
      <TextField
       {...register("marca")}
       select
       label="Marca"
       fullWidth
       margin="normal"
       defaultValue=""
      >
       <MenuItem value="Marca 1">Marca 1</MenuItem>
       <MenuItem value="Marca 2">Marca 2</MenuItem>
       <MenuItem value="Marca 3">Marca 3</MenuItem>
      </TextField>
     </Grid>
     <Grid item xs={6}>
      <TextField
       {...register("fornecedor")}
       select
       label="Fornecedor"
       fullWidth
       margin="normal"
       defaultValue=""
      >
       <MenuItem value="Fornecedor 1">Fornecedor 1</MenuItem>
       <MenuItem value="Fornecedor 2">Fornecedor 2</MenuItem>
       <MenuItem value="Fornecedor 3">Fornecedor 3</MenuItem>
      </TextField>
     </Grid>

     <Grid item xs={6}>
      <TextField
       {...register("categoria")}
       select
       label="Categoria"
       fullWidth
       margin="normal"
       defaultValue=""
      >
       <MenuItem value="Categoria 1">Categoria 1</MenuItem>
       <MenuItem value="Categoria 2">Categoria 2</MenuItem>
       <MenuItem value="Categoria 3">Categoria 3</MenuItem>
      </TextField>
     </Grid>
     <Grid item xs={12}>
      <TextField
       {...register("descricao")}
       label="Descrição"
       fullWidth
       multiline
       rows={4}
       margin="normal"
      />
     </Grid>
    </Grid>
    <Box sx={{ mb: 2, padding: "40px" }}>
     <Typography variant="h5">Imagens do Produto</Typography>
    </Box>
    <Box sx={{ display: "flex", alignItems: "center" }}>
     <input
      type="file"
      accept="image/*"
      multiple
      onChange={handleFileChange}
      style={{ display: "none" }}
      ref={register("imagens")}
      id="image-upload"
     />
     <label htmlFor="image-upload"></label>
    </Box>

    <StyledDropZone
     onDragOver={(e) => e.preventDefault()}
     onDrop={(e) => handleImageDrop(e)}
     onClick={() => document.getElementById("image-upload").click()}
    >
     <IconButton component="span">
      {" "}
      <AddPhotoAlternateIcon />
     </IconButton>
     <Typography variant="body1">
      Arraste e solte as imagens aqui ou clique para selecionar
     </Typography>
    </StyledDropZone>

    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
     {selectedImages.map((image, index) => (
      <Paper
       key={index}
       sx={{
        border: mainImageIndex === index ? "2px solid purple" : "none",
        p: 1,
        position: "relative",
       }}
      >
       <img
        src={URL.createObjectURL(image)}
        alt={`Imagem ${index}`}
        width="100"
        style={{ margin: "8px", cursor: "pointer" }}
        onClick={() => setMainImage(index)}
       />
       <Button
        onClick={() => removeImage(index)}
        style={{ position: "absolute", top: 0, left: 80 }}
       >
        <DeleteIcon color="purple" />
       </Button>
      </Paper>
     ))}
    </Box>

    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
     Enviar
    </Button>
   </form>
  </Box>
 );
};

export default Formulario;
