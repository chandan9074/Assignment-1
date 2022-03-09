import { Table } from "antd";
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStoryData } from '../../services/services';
import './homepage.css';

const Homepage : React.FunctionComponent = () =>{
    const [story, setStory] = useState<any>([]);
    const [flag, setFlag] = useState<boolean>(true);
    const navigate = useNavigate();
    let pageNo =  0;
    useEffect(() => {
        if(story){
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
    }

    const handleDataShow = (data : any) =>{
        navigate("/singledata", {state:{data:data}})
    }

    const columns = [
        {
            title: "Title",
            dataIndex: "title"
        },
        {
            title: "Author",
            dataIndex: "author"
        },
        {
            title: "Created At",
            dataIndex: "created_at"
        },
        {
            title: "URL",
            dataIndex: "url"
        },
    ]

    return (
        <div>
            <Table
            columns={columns}
            dataSource={story}
            pagination={{ position: ["bottomCenter"], pageSize: 8 }}
            onRow={(record)=>({
                onClick: ()=> handleDataShow(record)
            })}
            >
            </Table>
            
        </div>
    )
}

export default Homepage;




// https://hn.algolia.com/api/v1/search_by_date?tags=story&page=10