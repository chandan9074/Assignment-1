import * as React from 'react';

export const fetchStoryData = (pageNo : number) =>{
    return fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNo}`)
            .then(res=>res.json())
            .then(data=> {
                // setStory(data.hits);
                // console.log(data.hits)
                return data;

            })
            .catch(error =>{
                return error;
            })
}