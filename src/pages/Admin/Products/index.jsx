import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Button, Space, Table, Popconfirm } from "antd";
import { fetchProductList, deleteProduct } from "../../../api";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useMemo } from "react";
export const AdminProducts = () => {
  const { isLoading, isError, data, error } = useQuery(
    "admin:products",
    fetchProductList
  );
  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  });

  const queryClient = useQueryClient();
  const columns = useMemo(() => {
    return [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (text, record) => (
          <>
            <Link to={`/admin/products/${record._id}`}>Edit</Link>
            <Popconfirm
              title="Delete the task"
              description="Silmek istediğinize emin misiniz?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                deleteMutation.mutate(record._id, {
                  onSuccess: () => {
                    console.log("success");
                  },
                });
              }}
              onCancel={() => console.log("iptal edildi")}
            >
              <Button style={{ marginLeft: 10 }} danger>
                Delete
              </Button>
            </Popconfirm>
          </>
        ),
      },
    ];
  });
  if (isLoading) {
    return <div>Loading..</div>;
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }

  return (
    <div>
      <Text fontSize="2xl" p={"5"}>
        Products
      </Text>
      <Table dataSource={data} columns={columns} rowKey="_id"></Table>
    </div>
  );
};
