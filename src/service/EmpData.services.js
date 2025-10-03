// src/service/EmpData.services.js
import { Api } from "../store/api/api";

export const empApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmpData: builder.query({
      query: ({page, limit}) => ({
        url: `/empdata?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    

    getAllEmpDataWithoutPaginatio: builder.query({
      query: () => ({
        url: `/empdata/all`,
        method: "GET",
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

    getassetByid:builder.query({
      query: (id)=>({
        url:`/empdata/${id}`,
        method:"GET",
      })


    }),

    removeAsset: builder.mutation({
      query: ({ id, asset }) => ({
        url: `/empdata/${id}/remove-asset`,
        method: "PUT",
        body: { asset },
      }),
    }),
    createCredentials: builder.mutation({
      query: ({ id, email, password, fullName, phone }) => ({
        url: `/empdata/${id}/create-credentials`,
        method: "PUT",
        body: { email, password, fullName, phone },
      }),
    }),

    deleteEmpData: builder.mutation({
      query: (id) => ({
        url: `/empdata/${id}`,
        method: "DELETE",
      }),
    }),

    // Attendance related endpoints
    markLoginAttendance: builder.mutation({
      query: (employeeId) => ({
        url: `/empdata/${employeeId}/attendance/login`,
        method: "POST",
      }),
    }),

    markLogoutAttendance: builder.mutation({
      query: (employeeId) => ({
        url: `/empdata/${employeeId}/attendance/logout`,
        method: "POST",
      }),
    }),

    getDailyAttendance: builder.query({
      query: (date) => ({
        url: `/empdata/attendance/daily${date ? `?date=${date}` : ''}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetassetByidQuery,
  useGetAllEmpDataQuery,
  useAddEmpDataMutation,
  useUpdateEmpDataMutation,
  useDeleteEmpDataMutation,
  useAddAssetMutation,
  useRemoveAssetMutation,
  useCreateCredentialsMutation,
  useGetAllEmpDataWithoutPaginatioQuery,
  useMarkLoginAttendanceMutation,
  useMarkLogoutAttendanceMutation,
  useGetDailyAttendanceQuery
} = empApi;
