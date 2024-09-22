import apiClient from "@/lib/apiClient";
import { PriorityType, StatusType } from "@/models/task.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Task {
  _id: string;
  user: string;
  name: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
  priority: "High" | "Medium" | "Low";
  dueDate: Date;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const getAllTasks = createAsyncThunk("task/getAllTasks", async () => {
  const response = await apiClient.get("/api/get-all-tasks");
  const tasks = response.data?.tasks;
  return tasks;
});

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {}, // You can define additional sync reducers here if needed
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      });
  },
});

export default taskSlice.reducer;
