import React, {useEffect, useState, createContext} from 'react';
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import SingleData from './pages/SIngleData/SingleData';
import {fetchStoryData} from './services/services'

type storyDataT = {
        title: string,
        url: string,
        created_at: Date,
        author: string,
        objectID: string
    }

type contextDataT = {
  singlePageStory:storyDataT[],
  totalPage: number | undefined,
  defaultPage: number | undefined,
  loading: boolean
}   

export  const StoryContext = createContext<contextDataT>({singlePageStory:[], totalPage:0, defaultPage:0, loading:true});

function App() {
  const [story, setStory] = useState<storyDataT[]>([]);
  const [singlePageStory, setSinglePageStory] = useState<storyDataT[]>([]);
  const [totalPage, setTotalPage] = useState<number>()
  const [defaultPage,setDefaultPage ] = useState<number>()
  const [loading, setLoading] = useState<boolean>(true)

    
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
    })

    const fetchData = async () =>{
        let pageno = Number(localStorage.getItem("page"));
        const response = await fetchStoryData(pageno);
        setStory( [...story, ...response.hits]);

        localStorage.setItem("page", String(pageno + 1));
        if(pageno === 0){
            setSinglePageStory(response.hits)
        }

        if(loading === true){
          setLoading(false)
        }

        const page = Math.ceil((story.length+response.hits.length) / 20);
        setTotalPage(page);
    }
    const handleChangePage = async (event: unknown, page: number) => {

        console.log("page no", page)
        let first = page * 20;
        let array = story.slice((first-20), first)
        setSinglePageStory(array);
        setDefaultPage(page)
    }
  return (
    <StoryContext.Provider value={{singlePageStory, totalPage, defaultPage, loading}}>
      <div className="App" data-testid="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage onHandlePageChange={handleChangePage} />}></Route>
          <Route path="/singledata" element={<SingleData />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
    </StoryContext.Provider>
  );
}

export default App;
