import { Api } from "@/store/api/api";

const TermsApi = Api.injectEndpoints({
  endpoints: (build) => ({
    // Submit terms and conditions agreement
    submitTermsAndConditions: build.mutation({
      query: ({ employeeId, agreementText, version }) => ({
        url: `/terms/submit/${employeeId}`,
        method: "POST",
        body: { agreementText, version },
      }),
      invalidatesTags: ["TermsAndConditions"],
    }),

    // Get all employees terms status
    getAllTermsStatus: build.query({
      query: () => ({
        url: "/terms/status",
        method: "GET",
      }),
      providesTags: ["TermsAndConditions"],
    }),

    // Get specific employee terms status
    getEmployeeTermsStatus: build.query({
      query: (employeeId) => ({
        url: `/terms/status/${employeeId}`,
        method: "GET",
      }),
      providesTags: ["TermsAndConditions"],
    }),

    // Send reminder for terms submission
    sendTermsReminder: build.mutation({
      query: (employeeId) => ({
        url: `/terms/reminder/${employeeId}`,
        method: "POST",
      }),
      invalidatesTags: ["TermsAndConditions"],
    }),

    // Get terms statistics
    getTermsStatistics: build.query({
      query: () => ({
        url: "/terms/statistics",
        method: "GET",
      }),
      providesTags: ["TermsAndConditions"],
    }),
  }),
});

export const {
  useSubmitTermsAndConditionsMutation,
  useGetAllTermsStatusQuery,
  useGetEmployeeTermsStatusQuery,
  useSendTermsReminderMutation,
  useGetTermsStatisticsQuery,
} = TermsApi;
