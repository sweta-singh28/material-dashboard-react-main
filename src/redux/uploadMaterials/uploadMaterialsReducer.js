import { createSlice } from "@reduxjs/toolkit";
import { uploadAssignment, uploadNotes } from "./uploadMaterialsThunks";

const initialState = {
  uploading: false,
  success: null,
  error: null,
};

const uploadMaterialsSlice = createSlice({
  name: "uploadMaterials",
  initialState,
  reducers: {
    resetUploadState: (state) => {
      state.uploading = false;
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Assignment
      .addCase(uploadAssignment.pending, (state) => {
        state.uploading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(uploadAssignment.fulfilled, (state, action) => {
        state.uploading = false;
        state.success = action.payload;
      })
      .addCase(uploadAssignment.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      })
      // Notes
      .addCase(uploadNotes.pending, (state) => {
        state.uploading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(uploadNotes.fulfilled, (state, action) => {
        state.uploading = false;
        state.success = action.payload;
      })
      .addCase(uploadNotes.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUploadState } = uploadMaterialsSlice.actions;
export default uploadMaterialsSlice.reducer;
