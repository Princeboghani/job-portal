import { createContext, useEffect } from "react";
import { useState } from "react";
 
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const {user} = useUser();
  const {getToken} = useAuth();

  const [Searchfilter, setSearchfilter] = useState({
    title: "",
    location: "",
  });

  const [Issearch, setIssearch] = useState(false);

  const [jobs, setjobs] = useState([]);

  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  const [companyToken, setCompanyToken] = useState(null);

  const [companyData, setCompanyData] = useState(null);

  const [userData, setUserData] = useState(null);

  const [userApplications, setUserApplications] = useState([]);


  //function to fetch jobs data
  const fetchJobs = async () => {
     
    try {
      
      const {data} = await axios.get(backendUrl + "/api/jobs");

      if (data.success) {
        setjobs(data.jobs);
        console.log(data.jobs);
        
      }else{
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }

  }

  //fuction to fetch company data
  const fetchCompanyData = async () => {
    try {
      
      const {data} = await axios.get(backendUrl + "/api/company/company", {headers:{token: companyToken}});

      if(data.success) {
        setCompanyData(data.company);
        console.log("dfjhf",data);
        
      }else{
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  //fetch user data

  const fetchUserData = async () => {
    try {
      
      const token = await getToken();

      const {data} = await axios.get(backendUrl + '/api/users/user',{headers:{Authorization: `Bearer ${token}`}});
      console.log("user data",data);
      
      if (data.success) {
        setUserData(data.user);
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  //function to fetch user applied Applications
  const fetchUserApplications  = async () => {

    try {
      
      const token = await getToken();

      const {data} = await axios.get(backendUrl + '/api/users/applications',{headers:{Authorization: `Bearer ${token}`}});

      if (data.success) {
        setUserApplications(data.applications);

      }else{
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }

  }

  useEffect(() => {
    fetchJobs();
    const storedCompanyToken = localStorage.getItem("companyToken");
    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }
  }, []);

  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  useEffect(()=>{
    if(user) {
      fetchUserData();
      fetchUserApplications();
    }
  }, [user]);

  const value = {
    Searchfilter,setSearchfilter,
    Issearch, setIssearch,
    jobs, setjobs,
    showRecruiterLogin, setShowRecruiterLogin,
    companyToken, setCompanyToken,
    companyData, setCompanyData,
    backendUrl,
    userData,setUserData,
    userApplications, setUserApplications,
    fetchUserData,
    fetchUserApplications,
  };
  // console.log(Searchfilter, Issearch);
  

  return (<AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>);
};