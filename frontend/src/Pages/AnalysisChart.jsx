import React from 'react'
import axios from 'axios'
export const AnalysisChart = () => {

    axios.defaults.withCredentials = true;
    const ProductId=2;
    // axios.get(`${process.env.REACT_APP_API_URL}/ProductAnalysis/`+ProductId).then((res)=>{
    //       console.log(res.data)
    //     }).catch((e)=>{
    //         alert('An error has happened check console')
    //         console.log(e)
    //       });
    axios.get(`${process.env.REACT_APP_API_URL}/ProductAnalysis`).then((res)=>{
          console.log(res.data.data)
        }).catch((e)=>{
            alert('An error has happened check console')
            console.log(e)
          },[]);


  return (
    <div>AnalysisChart</div>
  )
}
