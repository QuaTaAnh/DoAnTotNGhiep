import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "../type";

interface ICommentProp {
  page: number;
  comments: Comment[];
  totalComments: number;
  totalPages: number;
}

const initialState: ICommentProp = {
  page: 1,
  comments: [],
  totalComments: 0,
  totalPages: 0,
};

const commentSlice = createSlice({
  name: "commentRedux",
  initialState: initialState,
  reducers: {
    commentSuccess: (state, action: PayloadAction<any>) => {
      state.comments = action.payload.comments;
      state.totalComments = action.payload.totalCount;
      state.totalPages = action.payload.totalPages;
    },
    addComment(state, action: PayloadAction<Comment>) {
      state.comments = [action.payload, ...state.comments];
    },
    updateComment(
      state,
      action: PayloadAction<{ id: number; content: string }>
    ) {
      const index = state.comments.findIndex(
        (comment: Comment) => comment.id === action.payload.id
      );
      if (index !== -1) {
        state.comments[index].content = action.payload.content;
      }
    },
    deleteComment(state, action: PayloadAction<number>) {
      state.comments = state.comments.filter(
        (comment: Comment) => comment.id !== action.payload
      );
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const {
  commentSuccess,
  addComment,
  updateComment,
  deleteComment,
  changePage,
} = commentSlice.actions;
export default commentSlice.reducer;
