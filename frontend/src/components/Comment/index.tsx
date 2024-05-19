import React, { useEffect, useState } from "react";
import { Button, Box, Typography, Grid, Pagination } from "@mui/material";
import CommentItem from "../ListComment";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../../redux/snackbarRedux";
import { startLoading, stopLoading } from "../../redux/loadingRedux";
import request from "../../utils/request";
import { AppDispatch, RootState } from "../../redux/store";
import { Comment } from "../../type";
import { formatDateComment } from "../../common/formatDate";
import { addComment, changePage } from "../../redux/commentRedux";
import ReactQuill from "react-quill";
import { getCommentByPage } from "../../redux/callApi";
import { useTranslation } from "react-i18next";

interface CommentProps {
  postId?: number;
}

const CommentCustom: React.FC<CommentProps> = ({ postId }: CommentProps) => {
  const {t} = useTranslation()
  const dispatch = useDispatch<AppDispatch>();
  const [content, setContent] = useState<string>("");
  const { comments, totalPages, page } = useSelector(
    (state: RootState) => state.comment
  );

  useEffect(() => {
    dispatch(getCommentByPage({ page, postId: postId }));
  }, [postId, dispatch, page]);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleSubmit = async () => {
    if (!content) {
      return;
    }
    dispatch(startLoading());
    try {
      const newComment = {
        postId,
        content: content,
      };
      const { data } = await request.post("/api/v1/comment/create", newComment);
      if (data.success) {
        dispatch(showSnackbar({ message: data.message, type: "success" }));
        dispatch(addComment(data.data));
        setContent("");
      }
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({ message: "Đã có lỗi xảy ra!", type: "error" }));
    } finally {
      dispatch(stopLoading());
    }
  };

  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(changePage(page));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('createNewComment')}
      </Typography>
      <ReactQuill
        theme="snow"
        style={{
          width: "100%",
          margin: "20px 0",
        }}
        value={content}
        onChange={handleContentChange}
      />
      <Button
        variant="contained"
        size="medium"
        sx={{
          backgroundColor: "#fa6819",
          color: "#fff",
          float: "right",
          borderRadius: "5px",
          padding: "9px 24px",
          marginBottom: "20px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#ed570e",
          },
        }}
        onClick={handleSubmit}
      >
        {t('comment')}
      </Button>
      {comments?.map((comment: Comment) => (
        <CommentItem
          key={comment.id}
          id={comment.id}
          userId={comment?.userId}
          content={comment.content}
          name={comment?.user?.name}
          avatar={comment?.user?.avatar}
          timestamp={formatDateComment(comment.createdAt)}
        />
      ))}
      <Grid container justifyContent="center" sx={{ marginTop: "20px" }}>
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            color="primary"
            onChange={onChangePage}
          />
        )}
      </Grid>
    </Box>
  );
};

export default CommentCustom;
