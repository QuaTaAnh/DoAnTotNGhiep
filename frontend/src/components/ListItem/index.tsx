import { Box, Button, Grid, Pagination, Typography } from "@mui/material";
import React, { useEffect } from "react";
import PostItem from "../PostItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getPostByPage } from "../../redux/callApi";
import { IPost } from "../../type";
import { pageSuccess } from "../../redux/apiRedux";
import { useTranslation } from "react-i18next";

interface ListItemProp {
  category?: number;
}

const ListItem: React.FC<ListItemProp> = ({ category }: ListItemProp) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { posts, totalPages, page } = useSelector(
    (state: RootState) => state.api
  );

  useEffect(() => {
    if (category) {
      dispatch(getPostByPage({ categoryId: category, page: page }));
    } else {
      dispatch(getPostByPage({ page: page }));
    }
  }, [category, dispatch, page]);

  const onChangePage = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    dispatch(pageSuccess(pageNumber));
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "4px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
        padding: "12px",
      }}
    >
      <Grid container>
        <Grid item md={12}>
          <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
            {t("listPosts")}
          </Typography>
        </Grid>

        <Grid
          item
          md={12}
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "12px 0",
          }}
        >
          <Typography sx={{ fontSize: "14px", marginRight: "10px" }}>
            {t("sort")}
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: "5px",
              textTransform: "none",
              marginRight: "10px",
              "&:hover": {
                backgroundColor: "#ed570e",
              },
            }}
          >
            {t("default")}
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: "5px",
              textTransform: "none",
              marginRight: "10px",
              "&:hover": {
                backgroundColor: "#ed570e",
              },
            }}
          >
            {t("new")}
          </Button>
        </Grid>

        <Grid item md={12} sx={{ marginTop: "12px" }}>
          {posts.length > 0 &&
            posts.map((post: IPost) => <PostItem key={post?.id} data={post} />)}
        </Grid>
      </Grid>
      <Grid container justifyContent="center" sx={{ margin: "20px 0" }}>
        {totalPages > 0 && posts?.length > 0 && (
          <Pagination
            count={totalPages}
            onChange={onChangePage}
            sx={{
              "& .Mui-selected": {
                backgroundColor: "#fa6819",
                color: "#000",
              },
              "& .MuiPaginationItem-root": {
                color: "#000",
                "&:hover": {
                  backgroundColor: "#ed570e",
                },
              },
            }}
          />
        )}
      </Grid>
    </Box>
  );
};

export default ListItem;
