import { Grid, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardPostItem from "../../../components/CardPostItem";
import { IPost } from "../../../type";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../redux/loadingRedux";
import request from "../../../utils/request";
import { showSnackbar } from "../../../redux/snackbarRedux";
import { useTranslation } from "react-i18next";

const PostFollow: React.FC = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch();
  const [followPosts, setFollowPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const getFollowPost = async () => {
    try {
      dispatch(startLoading());
      const { data } = await request.get("/api/v1/post/get-follow", {
        params: {
          page,
        },
      });
      setFollowPosts(data?.posts);
      setTotalPages(data.totalPages);
      console.log(data);
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({ message: "Đã xảy ra lỗi", type: "error" }));
    }
  };

  useEffect(() => {
    getFollowPost();
  }, [page]);

  const onChangePage = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    setPage(pageNumber);
  };

  return (
    <>
    {followPosts.length > 0 ?
    <>
      <Grid container spacing={2}>
        {followPosts.map((post: IPost) => (
          <Grid item key={post.id} md={3}>
            <CardPostItem data={post} />
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent="center" sx={{ margin: "20px 0" }}>
        {totalPages > 1 && followPosts?.length > 0 && (
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
    </>
      : 
       <Grid container justifyContent="center">
       <Typography sx={{ fontSize: "30px", paddingTop: "20px" }}>
         {t("messagePostFollow")}
       </Typography>
     </Grid>
   }
    </>
  );
};

export default PostFollow;
