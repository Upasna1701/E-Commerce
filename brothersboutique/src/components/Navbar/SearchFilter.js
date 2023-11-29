import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from "axios";

const SearchFilter = () => {

const [myOptions, setMyOptions] = useState([])

const getDataFromAPI = () => {
	console.log("Options Fetched from API")
    const data = {
    }
	axios.post('http://localhost/E-Commerce/brothers/product.php',data)
    .then((response) => {
        return response.json()
        })
    .then((res) => {
        console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
            myOptions.push(res.data[i].searchresult)
        }
        setMyOptions(myOptions)
	})
}

return (
	<div>
	{/* <h3>Greetings from GeeksforGeeks!</h3> */}
	<Autocomplete
		style={{ width: 200, height:10 }}
		freeSolo
		autoComplete
		autoHighlight
		options={myOptions}
		renderInput={(params) => (
		<TextField {...params}
        onChange={getDataFromAPI}
        variant="outlined"
        label="Search Box"
		/>
		)}
	/>
	</div>
);
}

export default SearchFilter
