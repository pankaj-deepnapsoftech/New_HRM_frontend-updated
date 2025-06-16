// src/service/EmpData.services.js
import { Api } from "../store/api/api";

export const empApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmpData: builder.query({
      query: ({ page = 1 }) => ({
        url: `/empdata?page=${page}&limit=10`,
      }),
    }),
    
    
    addEmpData: builder.mutation({
      query: (newEmp) => ({
        url: "/empdata",
        method: "POST",
        body: newEmp,
      }),
    }),
    updateEmpData: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/empdata/${id}`,
        method: "PUT",
        body,
      }),
    }),
    addAsset: builder.mutation({
      query: ({ id, asset }) => ({
        url: `/empdata/${id}/add-asset`,
        method: "PUT",
        body: { asset },
      }),
    }),

    deleteEmpData: builder.mutation({
      query: (id) => ({
        url: `/empdata/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllEmpDataQuery,
  useAddEmpDataMutation,
  useUpdateEmpDataMutation,
  useDeleteEmpDataMutation,
  useAddAssetMutation, 
} = empApi;
