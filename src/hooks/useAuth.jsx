import { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import { fetchCreds } from "../Redux/thunks/userThunks";

const useAuth = () => {

    const dispatch = useDispatch()
    const token = window.localStorage.getItem('token')
    
     return useEffect(() => {
        dispatch(fetchCreds(token))
    }, [dispatch, token])


}

export default useAuth