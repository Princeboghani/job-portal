import { createContext, useEffect } from "react";
import { useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [Searchfilter, setSearchfilter] = useState({
    title: "",
    location: "",
  });

  const [Issearch, setIssearch] = useState(false);

  const [jobs, setjobs] = useState([]);

  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);



  //function to fetch jobs data
  const fetchJobs = async () => {
    setjobs(jobsData)
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  const value = {
    Searchfilter,setSearchfilter,
    Issearch, setIssearch,
    jobs, setjobs,
    showRecruiterLogin, setShowRecruiterLogin
  };
  // console.log(Searchfilter, Issearch);
  

  return (<AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>);
};