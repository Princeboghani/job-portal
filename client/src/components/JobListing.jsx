import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets, JobCategories, JobLocations} from '../assets/assets';
import JobCart from './JobCart';

const JobListing = () => {

  const { Searchfilter, Issearch ,setSearchfilter, jobs} = useContext(AppContext);
  const[showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setselectedCategories] = useState([]);
  const [selectedLocations, setselectedLocations] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    setselectedCategories(prev =>prev.includes(category) ? prev.filter(cat => cat !== category) : [...prev, category]);
  }
  const handleLocationChange = (location) => {
    setselectedLocations(prev => prev.includes(location) ? prev.filter(loc => loc !== location) : [...prev, location]);
  }

  useEffect(()=>{

    const matchCategory = (job) =>(
      selectedCategories.length === 0 || selectedCategories.includes(job.category)
    );
    const matchLocation = (job) => (
      selectedLocations.length === 0 || selectedLocations.includes(job.location)
    );
    const matchTitle = (job) => (
      Searchfilter.title === "" || job.title.toLowerCase().includes(Searchfilter.title.toLowerCase())
    );
    const matchSerchLocation = (job) => ( 
      Searchfilter.location === "" || job.location.toLowerCase().includes(Searchfilter.location.toLowerCase())
    )
 
    const newFilteredJobs = jobs.slice().reverse().filter(
      job => matchCategory(job) && matchLocation(job) && matchTitle(job) && matchSerchLocation(job)
    )
    
    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1); 
  },[jobs, selectedCategories, selectedLocations, Searchfilter])

  return (
    <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
      
      {/* Slidbar*/}
      <div className='w-full lg:w-1/4 bg-white px-4'>

        {/* serch filter from hero component*/}
        {
          Issearch && ( Searchfilter.title !== "" || Searchfilter.location !== "" ) && (
            <>
              <h3 className='font-medium text-lg mb-4'>Current Search</h3>
              <div className='mb-4 text-gray-600'>
                {Searchfilter.title && (
                  <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                    {Searchfilter.title}
                    <img onClick={e => setSearchfilter(prev => ({...prev,title:""})) } className='cursor-pointer' src={assets.cross_icon} alt="" />
                  </span>
                )}
                {Searchfilter.location && (
                  <span  className='ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
                    {Searchfilter.location}
                    <img onClick={e => setSearchfilter(prev => ({...prev,location:""})) } className='cursor-pointer' src={assets.cross_icon} alt="" />
                  </span>
                )}
              </div>
            </>
          )
        }
        <button onClick={e => setShowFilter(prev => !prev)} className='px-6 py-1.5 rounded border border-gray-400 lg:hidden'>
          {showFilter ? "close" : "Filters"}
        </button>

        {/* category filter */}
        <div className={showFilter ? "": "max-lg:hidden"}>
          <h4 className='font-medium text-lg py-4'>Serch By Categories</h4>
          <ul className='space-y-4 text-gray-600'>
            {
              JobCategories.map((category, index) => (
                <li key={index} className='flex items-center gap-3 '>
                  <input
                   className='scale-125' 
                   type="checkbox"
                   onChange={()=>handleCategoryChange(category)} 
                   checked={selectedCategories.includes(category) }
                   />
                  {category}
                </li>
              ))
            }
          </ul>
        </div>

        {/* location filter */}
        <div className={showFilter ? "": "max-lg:hidden"}>
          <h4 className='font-medium text-lg py-4 pt-14'>Serch By Location</h4>
          <ul className='space-y-4 text-gray-600'>
            {
              JobLocations.map((location, index) => (
                <li key={index} className='flex items-center gap-3 '>
                  <input 
                  className='scale-125' 
                  type="checkbox" 
                  onChange={()=>handleLocationChange(location)}
                  checked={selectedLocations.includes(location) }
                  />
                  {location}
                </li>
              ))
            }
          </ul>
        </div>
      </div>

      {/* job listing */}
      <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
        <h3 className='font-medium text-3xl py-2' id='job-list'>Latest Jobs</h3>
        <p className='mb-8'>Get your desired job from top companies</p>
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
            {filteredJobs.slice((currentPage-1)*6,currentPage*6).map((job,index) => (
              <JobCart key={index} job={job} />
            ))}
        </div>

        {/* pagination */}
        { filteredJobs.length > 0 && (
          <div className='flex justify-center items-center space-x-2 mt-10'>
            <a href="#job-list">
              <img onClick={()=> setCurrentPage(Math.max(currentPage-1),1)} src={assets.left_arrow_icon} alt="" />
            </a>
            {Array.from({length:Math.ceil(filteredJobs.length/6)}).map((_,index)=>(
              <a key={index} href="#job-list">
                <button onClick={()=>setCurrentPage(index+1)} className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index +1 ? 'bg-blue-100 text-blue-500': 'text-gray-500'}`}>{index + 1}</button>
              </a>
            ))}
            <a href="#job-list">
              <img onClick={()=> setCurrentPage(Math.min(currentPage+1,Math.ceil(filteredJobs.length/6)))} src={assets.right_arrow_icon} alt="" />
            </a>
          </div>
        )}
      </section>
    </div>
  );
}

export default JobListing;
