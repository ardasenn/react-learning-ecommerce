import React from "react";
import { Cards } from "../../components/Card";
import { Box, Flex, Grid, Button } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";

import { fetchProductList } from "../../api";
export const Products = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(["products"], fetchProductList, {
    getNextPageParam: (lastGroup, allGroups) => {
      const morePagesExist = lastGroup?.length === 12;
      if (!morePagesExist) {
        return;
      }

      return allGroups.length + 1;
    },
  });

  if (status == "loading") return "Loading...";

  if (status == "error") return "An error has occurred: " + error.message;
  // console.log("data", data);
  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {/* {data.pages.map((item, key) => (
          <Cards key={key} item={item} />
        ))} */}
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((item) => (
              <Box w="100%" key={item._id}>
                <Cards item={item} />
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Grid>
      <Flex mt={10} justifyContent={"center"}>
        <Button
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
      </Flex>
    </>
  );
};

//Hasan ile çalışma
// export const Products = () => {
//   const [data, setData] = useState(null);

//   const handleFetchData = async () => {
//     const result = await fetchProductList(0);
//     console.log("yazdım");
//     setData(result);
//   };

//   useLayoutEffect(() => {
//     handleFetchData();
//   }, []);

//   if (!data) {
//     return <p>Loading</p>;
//   }

//   // console.log("data", data);
//   return (
//     <>
//       <Grid templateColumns="repeat(3, 1fr)" gap={6}>
//         {data &&
//           data.map((item, i) => (
//             <Box w="100%" key={item._id}>
//               <Cards item={item} />
//             </Box>
//           ))}
//       </Grid>
//       <Flex mt={10} justifyContent={"center"}></Flex>
//     </>
//   );
// };
