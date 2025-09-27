# Leave Request API Integration with Redux RTK Query

This document explains how the leave request API has been integrated using Redux RTK Query in the HRM project.

## API Endpoints

The following endpoints have been added to the existing RTK Query API slice:

### 1. Submit Leave Request
- **Endpoint**: `POST /api/v1/leaves/requests`
- **Hook**: `useSubmitLeaveRequestMutation()`
- **Usage**: Submit a new leave request

### 2. Get All Leave Requests
- **Endpoint**: `GET /api/v1/leaves/requests`
- **Hook**: `useGetLeaveRequestsQuery()`
- **Usage**: Fetch all leave requests

### 3. Get Leave Request by ID
- **Endpoint**: `GET /api/v1/leaves/requests/:id`
- **Hook**: `useGetLeaveRequestByIdQuery(id)`
- **Usage**: Fetch a specific leave request

### 4. Update Leave Request
- **Endpoint**: `PATCH /api/v1/leaves/requests/:id`
- **Hook**: `useUpdateLeaveRequestMutation()`
- **Usage**: Update an existing leave request

### 5. Delete Leave Request
- **Endpoint**: `DELETE /api/v1/leaves/requests/:id`
- **Hook**: `useDeleteLeaveRequestMutation()`
- **Usage**: Delete a leave request

## Data Structure

### Request Payload
```javascript
{
  "from": "2025-09-28T00:00:00.000Z",
  "to": "2025-11-30T00:00:00.000Z",
  "type": "sickLeave", // "sickLeave", "casualLeave", "earnedLeave"
  "mode": "full", // "full" or "half"
  "reason": "Medical emergency",
  "file": null // File object (optional)
}
```

### Response Structure
```javascript
{
  "success": true,
  "message": "Request submitted",
  "data": {
    "employeeId": "68d7719d3058b20df2355798",
    "from": "2025-09-28T00:00:00.000Z",
    "to": "2025-11-30T00:00:00.000Z",
    "type": "sickLeave",
    "mode": "full",
    "file": null,
    "status": "pending",
    "_id": "68d7a5caae327711cf2141b5",
    "createdAt": "2025-09-27T08:52:26.257Z",
    "updatedAt": "2025-09-27T08:52:26.257Z",
    "__v": 0
  }
}
```

## Implementation Details

### 1. API Slice Configuration
The leave request endpoints are added to the existing API slice in `src/store/api/api.jsx`:

```javascript
export const Api = createApi({
  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include" 
  }),
  endpoints: (builder) => ({
    // Leave Request Endpoints
    submitLeaveRequest: builder.mutation({
      query: (leaveData) => ({
        url: '/api/v1/leaves/requests',
        method: 'POST',
        body: leaveData,
      }),
      invalidatesTags: ['LeaveRequest'],
    }),
    // ... other endpoints
  }),
  tagTypes: ["Auth", "Employee", "Project", "User", "Department", "LeaveRequest"],
});
```

### 2. Component Integration
The `UserLeaveRequest` component has been updated to use RTK Query:

```javascript
import { useSubmitLeaveRequestMutation } from "../../store/api/api";

const UserLeaveRequest = () => {
  const [submitLeaveRequest, { isLoading, error }] = useSubmitLeaveRequestMutation();
  
  // Form submission logic
  const handleSubmit = async (values) => {
    try {
      const result = await submitLeaveRequest(leaveRequestData).unwrap();
      toast.success(result.message);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit");
    }
  };
};
```

## Usage Examples

### 1. Submit a Leave Request
```javascript
import { useSubmitLeaveRequestMutation } from '../store/api/api';

const MyComponent = () => {
  const [submitLeaveRequest, { isLoading, error }] = useSubmitLeaveRequestMutation();
  
  const handleSubmit = async () => {
    const leaveData = {
      from: new Date('2025-09-28').toISOString(),
      to: new Date('2025-11-30').toISOString(),
      type: 'sickLeave',
      mode: 'full',
      reason: 'Medical emergency'
    };
    
    try {
      const result = await submitLeaveRequest(leaveData).unwrap();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };
};
```

### 2. Fetch All Leave Requests
```javascript
import { useGetLeaveRequestsQuery } from '../store/api/api';

const LeaveRequestsList = () => {
  const { data, error, isLoading } = useGetLeaveRequestsQuery();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data?.data?.map(request => (
        <div key={request._id}>
          <p>Type: {request.type}</p>
          <p>Status: {request.status}</p>
        </div>
      ))}
    </div>
  );
};
```

### 3. Update a Leave Request
```javascript
import { useUpdateLeaveRequestMutation } from '../store/api/api';

const UpdateLeaveRequest = () => {
  const [updateLeaveRequest] = useUpdateLeaveRequestMutation();
  
  const handleUpdate = async (id) => {
    try {
      await updateLeaveRequest({ 
        id, 
        status: 'approved' 
      }).unwrap();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };
};
```

## Error Handling

The implementation includes comprehensive error handling:

1. **Network Errors**: Handled by RTK Query automatically
2. **Validation Errors**: Displayed via toast notifications
3. **Loading States**: Managed through RTK Query hooks
4. **Form Validation**: Handled by Formik and Yup

## File Upload Considerations

Currently, file uploads are prepared but not fully implemented. To handle file uploads:

1. Modify the API endpoint to accept FormData
2. Update the mutation to use FormData instead of JSON
3. Handle file validation on the frontend

## Testing

A demo component `LeaveRequestDemo.jsx` has been created to test all API endpoints. This component demonstrates:

- Fetching all leave requests
- Fetching a specific leave request
- Updating leave requests
- Deleting leave requests

## Next Steps

1. Test the integration with the actual backend
2. Implement file upload functionality if needed
3. Add more comprehensive error handling
4. Add optimistic updates for better UX
5. Implement caching strategies for better performance
