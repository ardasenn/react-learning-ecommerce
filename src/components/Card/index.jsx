import React, { lazy } from "react";
import { Box, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useBasket } from "../../contexts/BasketContext";

export const Cards = ({ item }) => {
  // console.log(item);
  const { addToBasket, items } = useBasket();
  const findBasketItem = items.find(
    (baket_item) => baket_item._id === item._id
  );
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
      <Link to={`/product/${item._id}`}>
        <Image src={item.photos[0]} alt="product"></Image>
        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {moment(item.createdAt).format("DD/MM/yyyy")}
          </Box>
          <Box mt="1" fontWeight={"semibold"} as="h4">
            {item.title}
          </Box>
          <Box>{item.price}</Box>
        </Box>
      </Link>

      <Button
        colorScheme={findBasketItem ? "pink" : "green"}
        variant={"solid"}
        onClick={() => addToBasket(item, findBasketItem)}
      >
        {findBasketItem ? "Remove from basket" : "Add to Basket"}
      </Button>
    </Box>
  );
};
