import React from 'react';
import { useLocation } from 'react-router';
import './singledata.css';

const SingleData : React.FunctionComponent = () =>{
    type SingleDataT = {
        data: {
            title: string,
            url: string,
            created_at: Date,
            author: string,
            objectID: string
        }
    }

    const location = useLocation();
    const state = location.state as SingleDataT;
    const { data } = state;
    const rawData = JSON.stringify(data);
    return (
        <p className='singledt' data-testid="single-data">
            {rawData}
        </p>
    )
}

export default SingleData;