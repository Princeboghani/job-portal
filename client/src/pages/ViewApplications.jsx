import React from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";

const ViewApplications = () => {
   

  const [openMenuIndex, setOpenMenuIndex] = React.useState(null);

  return (
    <div className="w-full px-6 py-8 bg-gray-50 min-h-screen font-sans">
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">
        <table className="min-w-[1000px] w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 border-b border-gray-200 font-semibold text-left">
                #
              </th>
              <th className="p-4 border-b border-gray-200 font-semibold text-left">
                User name
              </th>
              <th className="p-4 border-b border-gray-200 font-semibold text-left">
                Job Title
              </th>
              <th className="p-4 border-b border-gray-200 font-semibold text-left">
                Location
              </th>
              <th className="p-4 border-b border-gray-200 font-semibold text-center">
                Resume
              </th>
              <th className="p-4 border-b border-gray-200 font-semibold text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="p-4 border-b border-gray-100 w-16">
                  {index + 1}
                </td>
                <td className="p-4 border-b border-gray-100 min-w-[180px] flex items-center gap-3">
                  <img
                    src={applicant.imgSrc}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <span className="font-medium">{applicant.name}</span>
                </td>
                <td className="p-4 border-b border-gray-100 min-w-[150px]">
                  {applicant.jobTitle}
                </td>
                <td className="p-4 border-b border-gray-100 min-w-[120px]">
                  {applicant.location}
                </td>
                <td className="p-4 border-b border-gray-100 min-w-[120px] text-center">
                  <div className="flex justify-center">
                    <a
                      href=""
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-700 bg-blue-100 px-4 py-2 rounded hover:bg-blue-200 transition font-medium text-sm justify-center mx-auto"
                      style={{ minWidth: "100px" }}
                    >
                      Resume
                      <img
                        src={assets.resume_download_icon}
                        alt=""
                        className="w-4 h-4"
                      />
                    </a>
                  </div>
                </td>
                <td className="p-4 border-b border-gray-100 min-w-[120px] text-center">
                  <div
                    className="relative flex justify-center items-center"
                    onMouseEnter={() => setOpenMenuIndex(index)}
                    onMouseLeave={() => setOpenMenuIndex(null)}
                  >
                    <div className="flex items-center justify-center gap-2 w-full">
                      {openMenuIndex === index ? (
                        <div className="flex flex-col gap-3 bg-white border border-gray-200 rounded shadow-lg p-3 min-w-[120px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                          <button
                            className="w-full px-4 py-2 rounded-lg text-green-700 font-semibold flex items-center justify-center gap-2 hover:bg-green-100 transition text-base"
                            tabIndex={-1}
                            type="button"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Accept
                          </button>
                          <button
                            className="w-full px-4 py-2 rounded-lg text-red-700 font-semibold flex items-center justify-center gap-2 hover:bg-red-100 transition text-base"
                            tabIndex={-1}
                            type="button"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            Reject
                          </button>
                        </div>
                      ) : (
                        <button
                          className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 transition text-gray-700 font-semibold text-lg mx-auto flex items-center justify-center"
                          type="button"
                        >
                          ...
                        </button>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
