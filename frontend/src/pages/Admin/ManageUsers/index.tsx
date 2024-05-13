import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IUser } from "../../../type";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../common/formatDate";
import UpdateUser from "./UpdateUser";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAllUsers } from "../../../redux/callApi";
import NoImage from "../../../assets/images/noImage.jpg";
import EditIcon from "@mui/icons-material/Edit";

const ManageUsers: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(1);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [initValue, setInitValue] = useState<IUser>();
  const { allUsers, totalPages } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(getAllUsers({ page }));
  }, [dispatch, page]);

  const openModalEdit = (params: IUser | any) => {
    setInitValue(params.row);
    setIsOpenEdit(true);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const columns: GridColDef<IUser>[] = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 80,
      renderCell: (params) => {
        return (
          <div>
            <Avatar
              sx={{
                width: 46,
                height: 46,
              }}
              src={params.row.avatar || NoImage}
              alt="avatar"
            />
          </div>
        );
      },
    },
    {
      field: "id",
      headerName: "ID",
      width: 50,
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
            <IconButton
              sx={{
                color: "#fa6819",
                margin: "0 4px",
                textTransform: "none",
              }}
              onClick={() => openModalEdit(params)}
            >
              <EditIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" align="center" marginBottom={4} fontSize={30}>
        Quản lý người dùng
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} container justifyContent="center">
          <DataGrid
            style={{ height: "480px" }}
            rows={allUsers ? allUsers : []}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[10]}
          />
        </Grid>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          marginBottom={"20px"}
        >
          <Button
            onClick={handlePrevPage}
            disabled={page === 1}
            sx={{
              border: "1px solid #ccc",
              color: "#fa6819",
              padding: "4px 16px",
              borderRadius: "5px",
              margin: "0 4px",
              textTransform: "none",
            }}
          >
            Previous Page
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={page === totalPages}
            sx={{
              border: "1px solid #ccc",
              color: "#fa6819",
              padding: "4px 16px",
              borderRadius: "5px",
              margin: "0 4px",
              textTransform: "none",
            }}
          >
            Next Page
          </Button>
        </Grid>
      </Grid>
      <UpdateUser
        isOpen={isOpenEdit}
        setIsOpen={setIsOpenEdit}
        data={initValue}
        page={page}
      />
    </Container>
  );
};

export default ManageUsers;
