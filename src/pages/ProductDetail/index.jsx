import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../api";
import { Box, Text, Button } from "@chakra-ui/react";
import moment from "moment";
import ImageGallery from "react-image-gallery";
import { useBasket } from "../../contexts/BasketContext";

export const ProductDetail = () => {
  const { product_id } = useParams();
  const { addToBasket, items } = useBasket();
  const { isLoading, isError, data } = useQuery(["product", product_id], () =>
    fetchProduct(product_id)
  );
  if (isLoading) return <div>Loading..</div>;

  if (isError) return "Error";
  //   console.log(data);
  const images = data.photos.map((url) => ({ original: url }));

  const findBasketItem = items.find((item) => item._id === product_id);
  return (
    <>
      <Button
        colorScheme={findBasketItem ? "pink" : "green"}
        onClick={() => addToBasket(data, findBasketItem)}
      >
        {findBasketItem ? "remove from basket" : "Add to basket"}
      </Button>
      <Text as="h2" fontSize="2xl">
        {data.title}
      </Text>
      <Text>{moment(data.createdAtr).format("DD/MM/YYYY")}</Text>
      <p>{data.description}</p>
      <Box margin={10}>
        <ImageGallery items={images}></ImageGallery>
      </Box>
    </>
  );
};
