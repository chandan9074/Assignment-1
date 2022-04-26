import { Pagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { StoryContext } from '../../App';
import './homepage.css';



export const columns = [
        {
            field: 'objectID',
            hide: true,
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
    type storyDataT = {
        title: string,
        url: string,
        created_at: Date,
        author: string,
        objectID: string
    }
const Homepage = ({onHandlePageChange}:{onHandlePageChange:any}) =>{
    const navigate = useNavigate();
    const {singlePageStory, totalPage, defaultPage, loading} = useContext(StoryContext)

    const handleDataShow = (data : storyDataT) =>{
        navigate("/singledata", {state:{data:data}})
    }

    return (
        <div style={{ height: "100vh", width: '100%' }}>
            {loading? <Box sx={{ display: 'flex', justifyContent:"center", alignItems:"center" ,width: '100%',height: "30vh" }}>
                <CircularProgress />
            </Box>:
           singlePageStory?
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell sx={{ width: 600 }} >title</TableCell>
                    <TableCell sx={{ width: 200 }} align="center">Author</TableCell>
                    <TableCell sx={{ width: 250 }} align="center">Created At</TableCell>
                    <TableCell sx={{ width: 350 }} align="center">URL</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {singlePageStory.map((row:storyDataT) => (
                    <TableRow
                    key={row.objectID}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => handleDataShow(row)}
                    >
                    <TableCell component="th" scope="row">
                        {row.title}
                    </TableCell>
                    <TableCell align="center">{row.author}</TableCell>
                    <TableCell align="center">{row.created_at}</TableCell>
                    <TableCell align="center">{row.url}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            :null}
            <div style={{display:'flex', justifyContent:"center", padding:"20px 0px 20px 0px"}}>
                <Pagination color="primary" defaultPage={defaultPage} count={totalPage} variant="outlined"  onChange={onHandlePageChange} />
            </div>
        </div>
    )
}

export default Homepage;

