import React, { useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import request from "../../utils/request";
import { showSnackbar } from "../../redux/snackbarRedux";
import { deleteComment, updateComment } from "../../redux/commentRedux";
import { startLoading, stopLoading } from "../../redux/loadingRedux";
import ReactQuill from "react-quill";
import ConfirmDialog from "../ShowConfirm";
import { useTranslation } from "react-i18next";

interface CommentItemProps {
  id: number;
  userId: number;
  avatar: string;
  name: string;
  content: string;
  timestamp: string;
}

const CommentItem: React.FC<CommentItemProps> = ({
  id,
  userId,
  avatar,
  name,
  content,
  timestamp,
}) => {
  const {t} = useTranslation()
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>(content);
  const [open, setOpen] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(content);
  };

  const handleSaveEdit = async (id: number) => {
    dispatch(startLoading());
    try {
      await request.put(`/api/v1/comment/${id}`, {
        content: editedContent,
      });
      dispatch(updateComment({ id: id, content: editedContent }));
      dispatch(showSnackbar({ message: "Sửa thành công!", type: "success" }));
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({ message: "Đã có lỗi xảy ra!", type: "error" }));
    } finally {
      dispatch(stopLoading());
    }
  };

  const handleDelete = async (id: number) => {
    dispatch(startLoading());
    try {
      await request.delete(`/api/v1/comment/${id}`);
      dispatch(showSnackbar({ message: "Xóa thành công!", type: "success" }));
      dispatch(deleteComment(id));
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({ message: "Đã có lỗi xảy ra!", type: "error" }));
    } finally {
      setOpen(false);
      dispatch(stopLoading());
    }
  };

  const handleContentChange = (value: string) => {
    setEditedContent(value);
  };

  const handleOpenDiaLog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={name} src={avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="subtitle1" component="span">
                {user?.id === userId ? t('you') : name}
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                component="span"
                style={{ marginLeft: "0.5rem" }}
              >
                {timestamp}
              </Typography>
            </React.Fragment>
          }
          secondary={
            isEditing ? (
              <ReactQuill
                theme="snow"
                style={{
                  width: "100%",
                }}
                value={editedContent}
                onChange={handleContentChange}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  paddingLeft: "16px",
                  whiteSpace: "pre-wrap",
                }}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )
          }
        />
        {user?.id === userId && (
          <React.Fragment>
            {isEditing ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <React.Fragment>
                  <IconButton onClick={() => handleSaveEdit(id)}>
                    <SaveIcon sx={{ fontSize: "24px" }} />
                  </IconButton>
                  <IconButton onClick={handleCancelEdit}>
                    <CancelIcon sx={{ fontSize: "24px" }} />
                  </IconButton>
                </React.Fragment>
              </div>
            ) : (
              <>
                <IconButton onClick={handleEdit}>
                  <EditIcon sx={{ fontSize: "24px" }} />
                </IconButton>
                <IconButton onClick={handleOpenDiaLog}>
                  <DeleteIcon sx={{ fontSize: "24px" }} />
                </IconButton>
              </>
            )}
          </React.Fragment>
        )}
      </ListItem>
      <ConfirmDialog
        open={open}
        onClose={handleClose}
        onConfirm={() => handleDelete(id)}
        title="Xác nhận"
        message="Bạn có chắc là bạn muốn xóa bình luận này không?"
      />
    </>
  );
};

export default CommentItem;
