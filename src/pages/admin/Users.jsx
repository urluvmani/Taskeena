import React, { useEffect, useState } from "react";
import { useAuth } from "../../components/context/authContext";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { auth } = useAuth();

  const GetAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/get-users`,
        { headers: { Authorization: auth?.token } }
      );
      if (data?.success) setUsers(data?.users);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    if (auth?.token) GetAllUsers();
  }, [auth?.token]);

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">
        All Users
      </h1>

      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="md:w-[100vw] w-[300vw] overflow-x-scroll border-collapse border border-neutral-700 rounded-xl overflow-hidden">
            <thead className="bg-neutral-800 text-neutral-300 text-sm sm:text-base">
              <tr>
                <th className="border border-neutral-700 px-4 py-2 text-left">
                  #
                </th>
                <th className="border border-neutral-700 px-4 py-2 text-left">
                  Name
                </th>
                <th className="border border-neutral-700 px-4 py-2 text-left">
                  Email
                </th>
                <th className="border border-neutral-700 px-4 py-2 text-left">
                  Contact
                </th>
                <th className="border border-neutral-700 md:w-auto w-[90vw] px-4 py-2 text-left">
                  Address
                </th>
                <th className="border border-neutral-700 px-4 py-2 text-left">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr
                  key={u._id}
                  className="hover:bg-neutral-800/70 transition-all text-sm sm:text-base"
                >
                  <td className="border border-neutral-700 px-4 py-2">
                    {i + 1}
                  </td>
                  <td className="border border-neutral-700 px-4 py-2 font-medium text-pink-300">
                    {u.name}
                  </td>
                  <td className="border border-neutral-700 px-4 py-2 text-neutral-300">
                    {u.email}
                  </td>
                  <td className="border border-neutral-700 px-4 py-2 text-neutral-300">
                    {u.phone}
                  </td>
                  <td className="border border-neutral-700 px-4 py-2 md:w-auto w-[90vw] text-neutral-300">
                    {u.address}
                  </td>
                  <td className="border border-neutral-700 px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-md text-xs sm:text-sm ${
                        u.role === 1
                          ? "bg-green-700/40 text-green-300"
                          : "bg-pink-700/40 text-pink-300"
                      }`}
                    >
                      {u.role === 1 ? "Admin" : "User"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-neutral-400 text-center py-16 border-2 border-dashed border-neutral-700 rounded-xl">
          No users found
        </div>
      )}
    </div>
  );
};

export default Users;
