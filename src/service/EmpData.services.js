// src/service/EmpData.services.js
import { Api } from "../store/api/api";

export const empApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmpData: builder.query({
      query: ({ page, limit }) => ({
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

    getassetByid: builder.query({
      query: (id) => ({
        url: `/empdata/${id}`,
        method: "GET",
      })


    }),



    getEmpLeaveSummery: builder.query({
      query: (employeeId) => {
        return {
          url: `/empdata/${employeeId}/leave-summary`
        }
      }
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

    getMonthlyAttendance: builder.query({
      query: ({ month, year, department }) => ({
        url: `/empdata/attendance/monthly?month=${month}&year=${year}${department ? `&department=${department}` : ''}`,
        method: "GET",
      }),
    }),

    getYearlyAttendance: builder.query({
      query: ({ year, department }) => ({
        url: `/empdata/attendance/yearly?year=${year}${department ? `&department=${department}` : ''}`,
        method: "GET",
      }),
    }),
    terminateEmployee: builder.mutation({
      query: ({ id }) => ({
        url: `/empdata/${id}/terminate`,
        method: "POST",
      }),
    }),
    getAllTerminatedEmployees: builder.query({
      query: ({ page, limit }) => ({
        url: `/empdata/terminated?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),

    getEmpAttendenceById: builder.query({
      query: ({ employeeId, month, year }) => ({
        url: `/empdata/attendance/employee/${employeeId}/monthly?month=${month}&year=${year}`,
        method: "GET",
      }),
    }),


    deleteTerminatedEmployee: builder.mutation({
      query: ({ id }) => ({
        url: `/empdata/terminated/${id}`,
        method: "DELETE",
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
  useGetDailyAttendanceQuery,
  useGetMonthlyAttendanceQuery,
  useGetYearlyAttendanceQuery,
  useTerminateEmployeeMutation,
  useGetAllTerminatedEmployeesQuery,
  useDeleteTerminatedEmployeeMutation,
  useGetEmpLeaveSummeryQuery,
  useGetEmpAttendenceByIdQuery
} = empApi;
