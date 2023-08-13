import React, { useState } from "react";
import { useBasket } from "../../contexts/BasketContext";
import {
  Alert,
  Box,
  Button,
  Image,
  Link,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Label,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { postOrder } from "../../api";
export const Basket = () => {
  const [address, setAddress] = useState("");
  const { items, removeFromBasket, emptyBasket } = useBasket();
  const initialRef = React.useRef(null);
  const handleSubmit = async () => {
    const itemIds = items.map((item) => item._id);
    const input = {
      address,
      items: JSON.stringify(itemIds),
    };

    const response = await postOrder(input);
    emptyBasket();
    onClose();
  };

  const total = items.reduce((acc, obj) => acc + obj.price, 0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box p={5}>
      {items.length < 1 && (
        <Alert status="warning"> You have not any items in your basket</Alert>
      )}
      {items.length > 0 && (
        <>
          <ul>
            {items.map((item) => (
              <li key={item._id} style={{ marginBottom: 15 }}>
                <Link to={`/product/${item._id}`}>
                  <Text fontSize={22}>
                    {item.title} - {item.price} Tl
                  </Text>
                  <Image
                    htmlWidth={200}
                    src={item.photos[0]}
                    alt="basket item"
                  ></Image>
                </Link>
                <Button
                  mt={2}
                  size={"sm"}
                  colorScheme="pink"
                  onClick={() => {
                    removeFromBasket(item._id);
                  }}
                >
                  Remove from Basket
                </Button>
              </li>
            ))}
          </ul>
        </>
      )}
      <Box mt={10}>
        <Text fontSize={22}>Total : {total}</Text>
      </Box>

      <Button mt={2} size="sm" colorScheme="green" onClick={onOpen}>
        Order
      </Button>
      <Modal finalFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              ref={initialRef}
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Textarea>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
