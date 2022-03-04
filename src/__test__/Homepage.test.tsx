import React from "react";
import { render } from "@testing-library/react";
import { fetchStoryData } from "../services/services";
import App from '../App'

it("Homepage", async ()=>{
    render(<App />)
    expect(fetchStoryData).toHaveBeenCalled();

})
