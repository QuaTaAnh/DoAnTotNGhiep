import { Button, Container, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { formatDate } from "../../../common/formatDate";
import { RootState } from "../../../redux/store";
import { ICategory } from "../../../type";
import { useNavigate } from "react-router-dom";

const ManageCategory: React.FC = () => {
  const navigate = useNavigate();
  const { categories } = useSelector((state: RootState) => state.api);

  const columns: GridColDef<ICategory>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      valueGetter: (value, row) => row.id,
    },
    {
      field: "code",
      headerName: "Mã",
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
            <Button
              sx={{
                border: "1px solid #ccc",
                color: "#fa6819",
                padding: "4px 16px",
                borderRadius: "5px",
                margin: "0 4px",
                textTransform: "none",
              }}
              onClick={() => navigate(`/manage-update-category/${params.id}`)}
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
    </Container>
  );
};

export default ManageCategory;
