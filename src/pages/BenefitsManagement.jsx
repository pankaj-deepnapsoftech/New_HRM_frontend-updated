import React, { useEffect, useMemo, useState } from "react";
import { useGetAllEmpDataQuery } from "@/service/EmpData.services";

export default function BenefitsManagement() {
  const API_BASE =
    import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL;
  const { data } = useGetAllEmpDataQuery({ page: 1, limit: 1000 });
  const employees = useMemo(() => data?.data || [], [data]);
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  const [selectedId, setSelectedId] = useState("");
  const [pfContribution, setPfContribution] = useState(0);
  const [perks, setPerks] = useState([{ label: "Bonus", amount: 0 }]);

  useEffect(() => {
    if (!selectedId) return;
    // Clear current state to avoid showing previous month's data while loading
    setPfContribution(0);
    setPerks([{ label: "Bonus", amount: 0 }]);

    const controller = new AbortController();
    const token = localStorage.getItem("token");
    const url = new URL(`${API_BASE}/benefits/${selectedId}`);
    if (month) url.searchParams.set("month", month);
    fetch(url.toString(), {
      headers: { Authorization: token ? `Bearer ${token}` : undefined },
      credentials: "include",
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then((resp) => {
        const b = resp?.data;
        if (!b) {
          // No data for this month: keep cleared defaults
          setPfContribution(0);
          setPerks([{ label: "Bonus", amount: 0 }]);
          return;
        }
        // If month payload returned, prefer its pf/perks; else full doc
        setPfContribution(Number(b.pfContribution ?? 0));
        setPerks(
          b.perks && b.perks.length ? b.perks : [{ label: "Bonus", amount: 0 }]
        );
      })
      .catch(() => {});

    return () => controller.abort();
  }, [selectedId, month]);

  const save = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/benefits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
      body: JSON.stringify({ empId: selectedId, pfContribution, perks, month }),
    });
    if (!res.ok) alert("Failed to save");
    else alert("Saved");
  };

  const addPerk = () => setPerks([...perks, { label: "", amount: 0 }]);
  const updatePerk = (i, key, value) => {
    setPerks(
      perks.map((p, idx) =>
        idx === i
          ? { ...p, [key]: key === "amount" ? Number(value) : value }
          : p
      )
    );
  };
  const removePerk = (i) => setPerks(perks.filter((_, idx) => idx !== i));

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">PF & Perks Management</h2>

      <label className="block mb-2">Select Employee</label>
      <div className="mb-4">
        <label className="block mb-1">Month</label>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>
      {/* Month summary table */}
      <div className="mb-6">
        <div className="text-sm text-gray-700 mb-2">
          Summary for selected month
        </div>
        <div className="overflow-x-auto border rounded">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2">Type</th>
                <th className="text-left px-3 py-2">Label</th>
                <th className="text-right px-3 py-2">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2">PF</td>
                <td className="px-3 py-2 text-gray-500">PF Contribution</td>
                <td className="px-3 py-2 text-right">
                  {Number(pfContribution || 0).toFixed(2)}
                </td>
              </tr>
              {perks.map((p, i) => (
                <tr key={`perk-row-${i}`}>
                  <td className="px-3 py-2">Perk</td>
                  <td className="px-3 py-2">{p.label || "-"}</td>
                  <td className="px-3 py-2 text-right">
                    {Number(p.amount || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td className="px-3 py-2 font-medium" colSpan={2}>
                  Total
                </td>
                <td className="px-3 py-2 text-right font-semibold">
                  {(
                    Number(pfContribution || 0) +
                    perks.reduce((sum, p) => sum + Number(p.amount || 0), 0)
                  ).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className="border rounded px-3 py-2 w-full mb-4"
      >
        <option value="">-- Choose --</option>
        {employees.map((emp) => (
          <option key={emp._id} value={emp._id}>
            {emp.empCode || ""} - {emp.fname} {emp.lastName || ""}
          </option>
        ))}
      </select>

      {!!selectedId && (
        <>
          <div className="mb-4">
            <label className="block mb-1">PF Contribution (₹)</label>
            <input
              type="number"
              value={pfContribution}
              onChange={(e) => setPfContribution(Number(e.target.value))}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold">Perks</h3>
            {/* Add dropdown */}
            <select
              defaultValue=""
              onChange={(e) => {
                const action = e.target.value;
                if (action === "addPerk") addPerk();
                if (action === "clearPerks") setPerks([]);
                if (action === "resetPf") setPfContribution(0);
                e.target.value = "";
              }}
              className="border rounded px-3 py-1"
            >
              <option value="" disabled>
                Add...
              </option>
              <option value="addPerk">Add Perk</option>
              <option value="clearPerks">Clear Perks</option>
              <option value="resetPf">Reset PF</option>
            </select>
          </div>
          {perks.map((p, i) => (
            <div key={i} className="flex gap-3 mb-2">
              <input
                placeholder="Label"
                value={p.label}
                onChange={(e) => updatePerk(i, "label", e.target.value)}
                className="border rounded px-3 py-2 flex-1"
              />
              <input
                type="number"
                placeholder="Amount"
                value={p.amount}
                onChange={(e) => updatePerk(i, "amount", e.target.value)}
                className="border rounded px-3 py-2 w-40"
              />
              <button onClick={() => removePerk(i)} className="text-red-600">
                Remove
              </button>
            </div>
          ))}

          <div className="mt-4">
            <button
              onClick={save}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
}
