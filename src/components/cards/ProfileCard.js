import React, { useState, useEffect, useMemo } from "react";
import { getUsersAction } from "../../redux/Features/user/getUsersSlice.ts";
import { useDispatch, useSelector } from "react-redux";

const ProfileCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const { users, loading, error, success, message } = useSelector(
    (state) => state.getUsers
  );

  useEffect(() => {
    dispatch(getUsersAction(""));
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const itemsPerPage = 7;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  // Filter users by date of birth range
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    if (!startDate || !endDate) return users;

    return users.filter((user) => {
      const userDOB = new Date(user.dob);
      return userDOB >= startDate && userDOB <= endDate;
    });
  }, [users, startDate, endDate]);

  useEffect(() => {
    !users && dispatch(getUsersAction());
  }, [users]);

  return (
    <>
      <div>
        <div>
          <div className="flex">
            <div>
              <input
                type="date"
                value={startDate ? startDate.toISOString().split("T")[0] : ""}
                onChange={(e) => setStartDate(new Date(e.target.value))}
                className="appearance-none block w-1/8 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <label className="block text-sm font-medium leading-6">
                Start from
              </label>
            </div>
            <div>
              <input
                type="date"
                value={endDate ? endDate.toISOString().split("T")[0] : ""}
                onChange={(e) => setEndDate(new Date(e.target.value))}
                className="appearance-none block w-1/8 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <label className="block text-sm font-medium leading-6">
                End at
              </label>
            </div>
          </div>
        </div>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {success && (
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            S/n
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            First Name
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Last Name
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Phone
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Email
                          </th>

                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            DOB
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {filteredUsers
                          .slice(firstIndex, lastIndex)
                          .map((person, personIdx) => (
                            <tr
                              key={person.email}
                              className={
                                personIdx % 2 === 0 ? undefined : "bg-gray-50"
                              }
                            >
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {lastIndex > 7
                                  ?
                                   (firstIndex + personIdx + 1)
                                  : personIdx + 1}
                              </td>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {person.firstName}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {person.lastName}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {person.phone}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {person.email}
                              </td>

                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {person.dob}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* pagination */}
      {users?.length > 7 && (
        <div className="bg-gray-50 border border-gray-200 h-12 flex justify-between items-center px-6 lg:px-24 py-4 lg:py-6 rounded-t-lg absolute bottom-0 right-0 left-21.8% lg:left-0">
          <div>
            <div>
              {firstIndex + 1} - {Math.min(lastIndex, filteredUsers.length)} of{" "}
              {filteredUsers.length} items
            </div>
          </div>
          <div>
            <span
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="cursor-pointer inline-block px-4 py-2 bg-white border border-gray-300 rounded text-blue-500 text-base mr-0 lg:mr-2"
            >
              Prev
            </span>
            <span
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(
                    prev + 1,
                    Math.ceil(filteredUsers.length / itemsPerPage)
                  )
                )
              }
              className="cursor-pointer inline-block px-4 py-2 bg-white border border-gray-300 rounded text-blue-500 text-base ml-0 lg:ml-2"
            >
              Next
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard;
