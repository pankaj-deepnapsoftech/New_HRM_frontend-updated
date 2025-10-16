import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetAnnouncementsQuery,
  useCreateAnnouncementMutation,
  useUpdateAnnouncementMutation,
  useDeleteAnnouncementMutation,
} from '@/service/Announcements.services';
import { useGetAllEmpDataWithoutPaginatioQuery } from '@/service/EmpData.services';
import AdminRouteGuard from '@/Components/AdminRouteGuard';

const HRAnnouncements = () => {
  const { data, isLoading, refetch } = useGetAnnouncementsQuery();
  const [createAnnouncement] = useCreateAnnouncementMutation();
  const [updateAnnouncement] = useUpdateAnnouncementMutation();
  const [deleteAnnouncement] = useDeleteAnnouncementMutation();
  const [form, setForm] = useState({ message: '', isActive: true, startsAt: '', endsAt: '', targetEmployee: 'all' });
  const [editing, setEditing] = useState(null);

  const announcements = data?.data || [];
  const { data: employeeData, isLoading: empLoading } = useGetAllEmpDataWithoutPaginatioQuery();
  const employees = employeeData?.data || [];

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateAnnouncement({ id: editing, ...form }).unwrap();
        toast.success('Announcement updated');
      } else {
        await createAnnouncement(form).unwrap();
        toast.success('Announcement created');
      }
      setForm({ message: '', isActive: true, startsAt: '', endsAt: '', targetEmployee: 'all' });
      setEditing(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to save');
    }
  };

  const onEdit = (a) => {
    setEditing(a._id);
    setForm({
      message: a.message,
      isActive: a.isActive,
      startsAt: a.startsAt ? a.startsAt.slice(0, 16) : '',
      endsAt: a.endsAt ? a.endsAt.slice(0, 16) : '',
      targetEmployee: a.targetEmployee || 'all'
    });
  };

  const onDelete = async (id) => {
    if (!confirm('Delete this announcement?')) return;
    try {
      await deleteAnnouncement(id).unwrap();
      toast.success('Announcement deleted');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete');
    }
  };

  if (isLoading) return <div className="p-6">Loading…</div>;

  return (
    <AdminRouteGuard>
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">HR Announcements</h2>
        <form onSubmit={submit} className="grid gap-3 bg-white p-4 rounded border">
          <textarea
            className="border rounded p-2"
            placeholder="Message to display on Employee Dashboard"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            />
            Active
          </label>
          <label className="flex flex-col gap-1">
            <span>Send To</span>
            <select
              className="border rounded p-2"
              value={form.targetEmployee}
              onChange={(e) => setForm({ ...form, targetEmployee: e.target.value })}
              required
              disabled={empLoading}
            >
              <option value="all">All Employees</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>{emp.fname} {emp.lastName} ({emp.email})</option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="datetime-local"
              className="border rounded p-2"
              value={form.startsAt}
              onChange={(e) => setForm({ ...form, startsAt: e.target.value })}
            />
            <input
              type="datetime-local"
              className="border rounded p-2"
              value={form.endsAt}
              onChange={(e) => setForm({ ...form, endsAt: e.target.value })}
            />
          </div>
          <div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded">
              {editing ? 'Update' : 'Create'} Announcement
            </button>
            {editing && (
              <button type="button" className="ml-2 px-3 py-2 border rounded" onClick={() => { setEditing(null); setForm({ message: '', isActive: true, startsAt: '', endsAt: '', targetEmployee: 'all' }); }}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="mt-6 bg-white rounded border">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Message</th>
                <th className="p-2 text-left">Active</th>
                <th className="p-2 text-left">Start</th>
                <th className="p-2 text-left">End</th>
                <th className="p-2 text-left">Target</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((a) => (
                <tr key={a._id} className="border-t">
                  <td className="p-2">{a.message}</td>
                  <td className="p-2">{a.isActive ? 'Yes' : 'No'}</td>
                  <td className="p-2">{a.startsAt ? new Date(a.startsAt).toLocaleString() : '-'}</td>
                  <td className="p-2">{a.endsAt ? new Date(a.endsAt).toLocaleString() : '-'}</td>
                  <td className="p-2">
                    {a.targetEmployee === 'all' || !a.targetEmployee ? 'All' :
                      (employees.find((emp) => emp._id === a.targetEmployee)?.fname || a.targetEmployee)}
                  </td>
                  <td className="p-2 flex gap-2">
                    <button className="px-2 py-1 border rounded" onClick={() => onEdit(a)}>Edit</button>
                    <button className="px-2 py-1 border rounded text-red-600" onClick={() => onDelete(a._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminRouteGuard>
  );
};

export default HRAnnouncements;


