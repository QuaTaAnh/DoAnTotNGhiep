import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IUser } from "../../../type";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../redux/loadingRedux";
import request from "../../../utils/request";
import { formatDate } from "../../../common/formatDate";
import { useNavigate } from "react-router-dom";
import UpdateUser from "./UpdateUser";

const ManageUser: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [users, setUsers] = useState<IUser[]>([]);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [initValue, setInitValue] = useState<IUser>();

  const getUsers = useCallback(async () => {
    dispatch(startLoading());
    try {
      const { data } = await request.get(`/api/v1/user/all`, {
        params: {
          page: page,
        },
      });
      if (data.status) {
        setUsers(data.users);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  }, [page]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // const handlePageChange = (page: number) => {
  //   setPage(page);
  // };

  const openModalEdit = (params: IUser | any) => {
    setInitValue(params.row);
    setIsOpenEdit(true);
  };

  const columns: GridColDef<IUser>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      valueGetter: (value, row) => `
      ${row.id || ""}`,
    },
    {
      field: "name",
      headerName: "Name",
      width: 120,
      editable: true,
      valueGetter: (value, row) => row.name,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 120,
      editable: true,
      valueGetter: (value, row) => row.phone,
    },
    {
      field: "zalo",
      headerName: "Zalo",
      width: 120,
      editable: true,
      valueGetter: (value, row) => row.zalo,
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 200,
      editable: true,
      valueGetter: (value, row) => formatDate(row.createdAt),
    },
    {
      field: "updatedAt",
      headerName: "Cập nhật gần đây",
      width: 200,
      editable: true,
      valueGetter: (value, row) => formatDate(row.updatedAt),
    },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div>
            <Button
              sx={{
                border: "1px solid #ccc",
                color: "#fa6819",
                padding: "4px 16px",
                borderRadius: "5px",
                margin: "0 4px",
                textTransform: "none",
              }}
              onClick={() => openModalEdit(params)}
            >
              Update
            </Button>
            <Button
              sx={{
                border: "1px solid #ccc",
                color: "#fa6819",
                padding: "4px 16px",
                borderRadius: "5px",
                margin: "0 4px",
                textTransform: "none",
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center" marginBottom={4} fontSize={30}>
        Quản lý người dùng
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} container justifyContent="flex-end">
          <DataGrid
            style={{ height: "480px" }}
            rows={users ? users : []}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Grid>
      </Grid>
      <UpdateUser
        isOpen={isOpenEdit}
        setIsOpen={setIsOpenEdit}
        data={initValue}
      />
    </Container>
  );
};

export default ManageUser;
