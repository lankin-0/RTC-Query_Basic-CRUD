import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500",
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => {
        return {
          url: "/todos",
          method: "GET",
        };
      },
      //RTK Transform Response
      //also simpler (res) => res.reverse(),
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation({
      query: (todo) => {
        return {
          url: "/todos",
          method: "POST",
          body: todo,
        };
      },
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation({
      query: (todo) => {
        return {
          url: `/todos/${todo.id}`,
          method: "PATCH",
          body: todo,
        };
      },
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/todos/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
