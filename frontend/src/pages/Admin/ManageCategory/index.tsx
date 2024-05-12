import { Button, Container, Grid, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../common/formatDate";
import { AppDispatch, RootState } from "../../../redux/store";
import { ICategory } from "../../../type";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateUpdateCategory from "./CreateUpdateCategory";
import ConfirmDialog from "../../../components/ShowConfirm";
import request from "../../../utils/request";
import { startLoading, stopLoading } from "../../../redux/loadingRedux";
import { showSnackbar } from "../../../redux/snackbarRedux";
import { getCategory } from "../../../redux/callApi";

const ManageCategory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.api);
  const [initValue, setInitValue] = useState<ICategory>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [idCate, setIdCate] = useState<number>(0);

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
      valueGetter: (value, row) => {
        const formattedValue = row.value
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        return formattedValue;
      },
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
              onClick={() => handleOpenDiaLog(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const handleOpenDiaLog = (cateId: number) => {
    setOpenDelete(true);
    setIdCate(cateId);
  };

  const handleDelete = async () => {
    dispatch(startLoading());
    try {
      const { data } = await request.delete(`/api/v1/category/${idCate}`);
      if (data.status) {
        dispatch(showSnackbar({ message: data.message, type: "success" }));
        dispatch(getCategory());
      } else {
        dispatch(showSnackbar({ message: data.message, type: "error" }));
      }
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({ message: "Đã có lỗi xảy ra!", type: "error" }));
    } finally {
      setOpenDelete(false);
      dispatch(stopLoading());
    }
  };

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
      <ConfirmDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
        title="Xác nhận"
        message="Bạn có chắc là bạn muốn xóa danh mục này không?"
      />
    </Container>
  );
};

export default ManageCategory;
