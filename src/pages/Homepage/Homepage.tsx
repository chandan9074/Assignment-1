import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStoryData } from '../../services/services';
import './homepage.css';

export const columns: GridColDef[] = [
        {
            field: 'objectID',
            hide: true,
            // identity: true
        },
        { field: 'title', headerName: 'Title', width: 600 },
        { field: 'author', headerName: 'Author', width: 200 },
        { field: 'created_at', headerName: 'Created At', width: 250 },
        {
            field: 'url',
            headerName: 'URL',
            width: 350
        }
    ];

const Homepage : React.FunctionComponent = () =>{
    const [story, setStory] = useState<any>([]);
    const [flag, setFlag] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate();
    let pageNo =  0;
    useEffect(() => {
        if(flag){
            fetchData();
            setFlag(false);
        }
        setInterval(async() => {
            fetchData();
        }, 10000);
    }, []);

    const fetchData = async () =>{
        const response = await fetchStoryData(pageNo);
        setStory((prevState:any) => [...prevState, ...response.hits]);
        pageNo = pageNo + 1;
        if(loading){
            setLoading(false)
        }
    }

    const handleDataShow = (data : any) =>{
        navigate("/singledata", {state:{data:data}})
    }

    

    return (
        <div style={{ height: "100vh", width: '100%' }}>
            <DataGrid
                data-testId = "data-table"
                rows={story}
                columns={columns}
                getRowId={(row :any) => row.objectID}
                pageSize={12}
                rowsPerPageOptions={[12]}
                loading={loading}
                onSelectionModelChange= {(data)=>{
                    const select = story.filter((storydt : any) => storydt.objectID ===data[0] );
                    handleDataShow(select);
                }}

            />
        </div>
    )
}

export default Homepage;




// https://hn.algolia.com/api/v1/search_by_date?tags=story&page=10