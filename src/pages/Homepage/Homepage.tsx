import { DataGrid, GridColDef, GridRowIdGetter } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStoryData } from '../../services/services';
import './homepage.css';

export const columns : GridColDef[] = [
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

const Homepage : React.FunctionComponent = () =>{
    const [story, setStory] = useState<storyDataT[]>([]);
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate();

    type storyDataT = {
        title: string,
        url: string,
        created_at: Date,
        author: string,
        objectID: string
    }

    useEffect(() => {
        if(story.length === 0){
            localStorage.setItem("page", "0");
            fetchData();
        }
        else{
            setTimeout(async() => {
                fetchData();
            }, 10000);
        }
    }, [story]);

    const fetchData = async () =>{
        let pageno = Number(localStorage.getItem("page"));
        const response = await fetchStoryData(pageno);
        setStory( [...story, ...response.hits]);

        localStorage.setItem("page", String(pageno + 1));

        if(loading){
            setLoading(false)
        }
    }

    const handleDataShow = (data : storyDataT[]) =>{
        navigate("/singledata", {state:{data:data}})
    }

    return (
        <div style={{ height: "100vh", width: '100%' }}>
           {story?
            <DataGrid
                data-testId = "data-table"
                rows={[...story]}
                columns={columns}
                getRowId={((row : storyDataT) => row.objectID) as GridRowIdGetter}
                pageSize={12}
                rowsPerPageOptions={[12]}
                loading={loading}
                onSelectionModelChange= {(data)=>{
                    const select  = story.filter((storydt : storyDataT) => storydt.objectID ===data[0] );
                    handleDataShow(select);
                }}
            />:null}
        </div>
    )
}

export default Homepage;




// https://hn.algolia.com/api/v1/search_by_date?tags=story&page=10









        // <>
        //     <h2>Post List</h2>
        //     <Container style={{ maxWidth: "100%" }}>
        //         <Paper>
        //             <TableContainer sx={{ maxHeight: "100vh" }}>
        //                 {
        //                     loading ? <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
        //                         <CircularProgress />
        //                     </Box> : <Table stickyHeader aria-label="sticky table">
        //                         <TableHead>
        //                             {console.log(story)}
        //                             <TableRow>
        //                                 {
        //                                     columns.map(column =>
        //                                         <TableCell
        //                                             key={column.id}
        //                                             align={column.align}
        //                                             style={{ minWidth: column.minWidth }}
        //                                         >
        //                                             {column.label}
        //                                         </TableCell>
        //                                     )
        //                                 }
        //                                 <TableCell />
        //                             </TableRow>
        //                         </TableHead>

        //                         <TableBody>
        //                             {
        //                                 story.map((row : storyDataT, index) => {
        //                                     return (
        //                                         <TableRow
        //                                             key={index}
        //                                             onClick={() => handleDataShow(row)}
                                                    
                                                    
        //                                         >
                                                    
        //                                             {
        //                                                 columns.map(column => {
        //                                                     const value = row[column.id];
        //                                                     return (
        //                                                         <TableCell
        //                                                             key={column.id}
        //                                                         >
        //                                                             {value}
        //                                                         </TableCell>
        //                                                     )
        //                                                 })
        //                                             }
        //                                             {/* <TableCell>
        //                                                 <Button
        //                                                     size="small"
        //                                                     variant="contained"
                                                            
        //                                                 >
        //                                                     Details
        //                                                 </Button>
        //                                             </TableCell> */}
        //                                         </TableRow>
        //                                     )
        //                                 })
        //                             }
        //                         </TableBody>
        //                     </Table>
        //                 }
        //             </TableContainer>

        //             {/* <TablePagination
        //                 rowsPerPageOptions={[]}
        //                 component="div"
        //                 count={totalElements}
        //                 rowsPerPage={20}
        //                 page={page}
        //                 onPageChange={handleChangePage}
        //             /> */}
        //         </Paper>
        //     </Container>
        // </>