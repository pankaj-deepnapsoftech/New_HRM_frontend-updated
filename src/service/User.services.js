//user.services.js

import { Api } from "@/store/api/api";

const UserApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUsersQuery } = UserApi;
