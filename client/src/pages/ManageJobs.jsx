import React from 'react';
import { assets, manageJobsData } from "../assets/assets";
import moment from 'moment';

const ManageJobs = () => {



  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-full overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-[900px] w-full divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">#</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Job title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Location</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Application</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Visible</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {manageJobsData.map((job, index) => (
              <tr key={index} className="hover:bg-blue-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{moment(job.date).format('ll')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{job.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700 font-semibold text-center">{job.applicants}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-400" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold">
        Add New Job
      </button>
    </div>
  );
}

export default ManageJobs;
