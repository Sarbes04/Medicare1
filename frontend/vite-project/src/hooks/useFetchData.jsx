import {useEffect, useState} from 'react';
import { token } from '../config';

export default function useFetchData(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState("");

    useEffect(()=>{
      const fetchData = async ()=>{
        try {
          setLoading(true);
          const res = await fetch(url, {
            headers:{Authorization : `Bearer ${token}`}
          })
          const result = await res.json();
          if(!res.ok){
            throw new Error(result.message + "");
          }
          setData(result.data);
          setLoading(false); 
        } catch (error) {
          setLoading(false);
          setError(error.message);
        }
      }
      fetchData();
    }, [url]);
  return {
    data, loading, error, 
  }
}

