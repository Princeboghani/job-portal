import React from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/Appcontext";
import { useState ,useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const ViewApplications = () => {
   
const {backendUrl,companyToken} = useContext(AppContext);

 const [applicants, setApplicants] = useState(false);



  //function to fetch company job applications data
  const fetchCompanyJobApplications = async () => {

    try {
      
      const {data} = await axios.get(backendUrl + "/api/company/applicants",{headers: {token: companyToken}});
      console.log("jdjg",data);
      
      if (data.success) {
        setApplicants(data.applications.reverse());
      }else{
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  //function to update job application status (accept/reject)
  const changeJobApplicationStatus = async (id, status) => {
    try {
      
      const {data} = await axios.post(backendUrl + "/api/company/change-status", {id, status}, {headers: {token: companyToken}});

      if (data.success) {
        fetchCompanyJobApplications();
      }else{
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
     if(companyToken){
      fetchCompanyJobApplications();
     }
  }, [companyToken]);

  return applicants?applicants.length === 0?(
  <div className='flex items-center justify-center h-[70vh]'>
    <p className='text-xl sm:text-2xl'>No Applications Available</p></div>
  ):(
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
                Accept || Reject
              </th>
            </tr>
          </thead>
          <tbody>
            {applicants.filter(item => item.jobId && item.userId).map((applicant, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="p-4 border-b border-gray-100 w-16">
                  {index + 1}
                </td>
                <td className="p-4 border-b border-gray-100 min-w-[180px] flex items-center gap-3">
                  <img
                    src={applicant.userId.image}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <span className="font-medium">{applicant.userId.name}</span>
                </td>
                <td className="p-4 border-b border-gray-100 min-w-[150px]">
                  {applicant.jobId.title}
                </td>
                <td className="p-4 border-b border-gray-100 min-w-[120px]">
                  {applicant.jobId.location}
                </td>
                <td className="p-4 border-b border-gray-100 min-w-[120px] text-center">
                  <div className="flex justify-center">
                    <a
                      href={applicant.userId.resume}
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
                  {applicant.status === "pending" ?(
                    <div className="flex justify-center items-center gap-2">
                    <button
                    onClick={() => changeJobApplicationStatus(applicant._id, "Accepted")}
                      className="p-2 rounded bg-green-100 hover:bg-green-200 transition text-green-700 flex items-center justify-center"
                      type="button"
                      title="Accept"
                    >
                      {/* Accept Icon (Checkmark) */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button
                    onClick={() => changeJobApplicationStatus(applicant._id, "Rejected")}
                      className="p-2 rounded bg-red-100 hover:bg-red-200 transition text-red-700 flex items-center justify-center"
                      type="button"
                      title="Reject"
                    >
                      {/* Reject Icon (X) */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  ):
                  (<div className="">{applicant.status}</div>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : <Loading />
};

export default ViewApplications;
