import React, { useState } from "react";
import {
 Button,
 MenuItem,
 Grid,
 Paper,
 Typography,
 IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledDropZone = styled("div")({
 border: "2px dashed #a7a7a7",
 borderRadius: "5px",
 padding: "100px",
 marginTop: "20px",
 textAlign: "center",
 cursor: "pointer",
 backgroundColor: "#F8F8FF",
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

 const options = ["Opção 1", "Opção 2", "Opção 1"];

 return (
  <form onSubmit={handleSubmit(onFormSubmit)}>
   <Box sx={{ mt: 2, padding: "40px" }}>
    <Box
     sx={{
      mt: 2,
      padding: "40px",
      border: "1px solid #dcdcdc",
      borderRadius: "8px",
     }}
    >
     <Typography variant="h5" sx={{ textAlign: "left" }}>
      Informações Gerais
     </Typography>
     <Grid container spacing={2}>
      <Grid item xs={6}>
       <TextField
        {...register("nome")}
        label="Nome do produto"
        fullWidth
        margin="normal"
       />
      </Grid>

      <Grid item xs={6}>
       <TextField
        {...register("tipo")}
        select
        fullWidth
        label="Tipo"
        margin="normal"
        sx={{ textAlign: "left" }}
       >
        {options.map((option) => {
         return <MenuItem value={option}>{option}</MenuItem>;
        })}
       </TextField>
      </Grid>
      <Grid item xs={6}>
       <TextField
        {...register("codigo")}
        label="Código (SKU) do produto"
        fullWidth
        margin="normal"
       />
      </Grid>

      <Grid item xs={6}>
       <TextField
        {...register("marca")}
        select
        label="Nome da marca"
        fullWidth
        margin="normal"
        sx={{ textAlign: "left" }}
       >
        {options.map((option) => {
         return <MenuItem value={option}>{option}</MenuItem>;
        })}
       </TextField>
      </Grid>
      <Grid item xs={6}>
       <TextField
        {...register("fornecedor")}
        select
        label="Fornecedor"
        fullWidth
        margin="normal"
        sx={{ textAlign: "left" }}
       >
        {options.map((option) => {
         return <MenuItem value={option}>{option}</MenuItem>;
        })}
       </TextField>
      </Grid>

      <Grid item xs={6}>
       <TextField
        {...register("categoria")}
        select
        label="Categoria"
        fullWidth
        margin="normal"
        sx={{ textAlign: "left" }}
       >
        {options.map((option) => {
         return <MenuItem value={option}>{option}</MenuItem>;
        })}
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
    </Box>

    {selectedImages.length === 0 ? (
     <Box
      sx={{
       mt: 2,
       padding: "40px",
       border: "1px solid #dcdcdc",
       borderRadius: "8px",
      }}
     >
      <Typography variant="h5" sx={{ textAlign: "left" }}>
       Imagens do Produto
      </Typography>
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
      <StyledDropZone
       onDragOver={(e) => e.preventDefault()}
       onDrop={(e) => handleImageDrop(e)}
       onClick={() => document.getElementById("image-upload").click()}
      >
       <IconButton component="span">
        {" "}
        <AddIcon />
       </IconButton>
       <Typography variant="h5">
        Selecione ou arraste aqui as imagens dos produtos
       </Typography>
       <Typography variant="body1">
        Máximo de 15 imagens. Tamanho máximo 4MB.
        <br />
        Envie imagens no formato JPG ou PNG.
       </Typography>
      </StyledDropZone>
     </Box>
    ) : (
     <Box
      sx={{
       display: "flex",
       flexWrap: "wrap",
       gap: 2,
       mt: 2,
       padding: "40px",
       border: "1px solid #dcdcdc",
      }}
     >
      <Grid container spacing={10}>
       <Grid item xs={6}>
        <Typography variant="h5" sx={{ textAlign: "left" }}>
         Imagens do Produto
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "left", color: "grey" }}>
         Máximo de 15 imagens. Tamanho máximo 4MB.
         <br />
         Envie imagens no formato JPG ou PNG.
        </Typography>
       </Grid>
       <Grid
        item
        xs={6}
        sx={{
         display: "flex",
         alignItems: "center",
         justifyContent: "flex-end",
        }}
       >
        <label
         htmlFor="image-upload"
         style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 20px",
          backgroundColor: "purple",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer",
         }}
        >
         Adicionar imagem
         <AddIcon sx={{ marginLeft: "5px" }} />
        </label>
        <input
         type="file"
         accept="image/*"
         multiple
         onChange={handleFileChange}
         style={{ display: "none" }}
         ref={register("imagens")}
         id="image-upload"
        />
       </Grid>
      </Grid>

      {selectedImages.map((image, index) => (
       <Paper
        key={index}
        sx={{
         border: mainImageIndex === index ? "4px solid purple" : "none",
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
        {mainImageIndex === index && (
         <Typography
          variant="body2"
          sx={{
           backgroundColor: "purple",
           color: "white",
           position: "absolute",
           bottom: 0,
           left: 0,
           rigth: 0,
           width: "94%",
           padding: "5px",
           textAlign: "center",
           fontWeight: "bold",
          }}
         >
          Imagem principal
         </Typography>
        )}
        <Button
         onClick={() => removeImage(index)}
         style={{ position: "absolute", top: 0, left: 80 }}
         sx={{
          backgroundColor: "#D75413",
          color: "white",
          borderRadius: "50%",
          width: "15px",
          height: "30px",
         }}
        >
         <DeleteIcon />
        </Button>
       </Paper>
      ))}
     </Box>
    )}
   </Box>
  </form>
 );
};

export default Formulario;
