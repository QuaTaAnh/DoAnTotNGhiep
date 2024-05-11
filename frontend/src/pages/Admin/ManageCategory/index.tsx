import { Button, Container, Grid, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { formatDate } from "../../../common/formatDate";
import { RootState } from "../../../redux/store";
import { ICategory } from "../../../type";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateUpdateCategory from "./UpdateCategory";

const ManageCategory: React.FC = () => {
  const { categories } = useSelector((state: RootState) => state.api);
  const [initValue, setInitValue] = useState<ICategory>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const openModalEdit = (params: ICategory | any) => {
    setIsEdit(true);
    setIsOpen(true);
    setInitValue(params.row);
  };

  const columns: GridColDef<ICategory>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      valueGetter: (value, row) => row.id,
    },
    {
      field: "code",
      headerName: "Mã danh mục",
      width: 120,
      editable: true,
      valueGetter: (value, row) => row.code,
    },
    {
      field: "value",
      headerName: "Tên danh mục",
      width: 200,
      editable: true,
      valueGetter: (value, row) => row.value,
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
            <IconButton
              sx={{
                color: "#fa6819",
                margin: "0 4px",
                textTransform: "none",
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];
  return (
    <Container maxWidth="lg">
      <Typography variant="h5" align="center" marginBottom={4} fontSize={30}>
        Quản lý danh mục
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Button
            sx={{
              backgroundColor: "#fa6819",
              color: "#fff",
              padding: "6px 16px",
              borderRadius: "5px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#ed570e",
              },
            }}
            onClick={() => setIsOpen(true)}
          >
            Thêm mới
          </Button>
        </Grid>
        <Grid item xs={12} container justifyContent="flex-end">
          <DataGrid
            style={{ height: "480px" }}
            rows={categories ? categories : []}
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
      <CreateUpdateCategory
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        data={initValue}
      />
    </Container>
  );
};

export default ManageCategory;
