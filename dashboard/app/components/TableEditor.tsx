"use client"
import { useState, useEffect } from "react";
import axios from "axios";

const TableEditor = () => {
  const [data, setData] = useState([]);
  const [newRecord, setNewRecord] = useState({ name: "", related_id: "" });
  const [editingRecord, setEditingRecord] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("/api/db");
    setData(response.data);
  };

  const addRecord = async () => {
    await axios.post("/api/db", newRecord);
    setNewRecord({ name: "", related_id: "" });
    fetchData();
  };

  const updateRecord = async () => {
    await axios.put("/api/db", editingRecord);
    setEditingRecord(null);
    fetchData();
  };

  const deleteRecord = async (id: number) => {
    await axios.delete(`/api/db?id=${id}`);
    fetchData();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">MySQL Table Editor</h1>

      {/* Add New Record */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Name"
          value={newRecord.name}
          onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Related ID"
          value={newRecord.related_id}
          onChange={(e) => setNewRecord({ ...newRecord, related_id: e.target.value })}
          className="border p-2 mr-2"
        />
        <button
          onClick={addRecord}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Data Table */}
      <table className="table-auto border-collapse border border-gray-200 w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Related ID</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: any) => (
            <tr key={row.id}>
              <td className="border px-4 py-2">{row.id}</td>
              <td className="border px-4 py-2">
                {editingRecord?.id === row.id ? (
                  <input
                    type="text"
                    value={editingRecord.name}
                    onChange={(e) =>
                      setEditingRecord({ ...editingRecord, name: e.target.value })
                    }
                    className="border p-2"
                  />
                ) : (
                  row.name
                )}
              </td>
              <td className="border px-4 py-2">
                {editingRecord?.id === row.id ? (
                  <input
                    type="number"
                    value={editingRecord.related_id}
                    onChange={(e) =>
                      setEditingRecord({
                        ...editingRecord,
                        related_id: e.target.value,
                      })
                    }
                    className="border p-2"
                  />
                ) : (
                  row.related_id
                )}
              </td>
              <td className="border px-4 py-2">
                {editingRecord?.id === row.id ? (
                  <button
                    onClick={updateRecord}
                    className="bg-green-500 text-white px-4 py-2 mr-2 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingRecord(row)}
                    className="bg-yellow-500 text-white px-4 py-2 mr-2 rounded"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => deleteRecord(row.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableEditor;
