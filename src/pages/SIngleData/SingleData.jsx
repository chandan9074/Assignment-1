import React from 'react';
import { useLocation } from 'react-router';
import './singledata.css';

const SingleData = () =>{
    const {state} = useLocation();
    const update = JSON.stringify(state.data);
    return (
        <p className='singledt'>
            {update}
        </p>
    )
}

export default SingleData;