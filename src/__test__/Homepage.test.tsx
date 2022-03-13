import { columns } from "../pages/Homepage/Homepage";
import { fetchStoryData } from "../services/services";


 it("Render data perfectly", ()=>{
     let n=1;
     return fetchStoryData(n).then(data => expect.arrayContaining(data));
 })

 const columnsData = [
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

     it("Check the table data structure", ()=>{
         expect(columnsData).toEqual(columns);
     })
