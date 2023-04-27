import { Button, Input, AppBar, Box, Toolbar, Typography } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useState, useEffect } from "react";
import "./App.scss";

function App() {
	// usestate for setting a javascript
	// object for storing and using data
	var rows = [];

	// Using useEffect for single rendering
	useEffect(() => {
		// Using fetch to fetch the api from
		// flask server it will be redirected to proxy
		fetch("/get_db").then((res) =>
			res.json().then((data) => {
				// Setting a data from api
                setDataGridProps({
                    columns: columns,
                    rows: data
                })
			})
		);
	}, []);

    const columns: GridColDef = [
        { field: 'id', headerName: 'Unique Id', width: 90 },
        { field: 'address', headerName: 'Address', width: 150 },
        { field: 'district', headerName: 'District', width: 150, },
        { field: 'signType', headerName: 'Sign Type', width: 150, },
        { field: 'signTechnology', headerName: 'Sign Technology', width: 150, },
        { field: 'signSize', headerName: 'Sign Size (ft2)', width: 150, },
        { field: 'signStatus', headerName: 'Sign Status', width: 150, },
        { field: 'signCondition', headerName: 'Sign Condition', width: 150, },
        { field: 'parcelId', headerName: 'Parcel Id', width: 150, },
        { field: 'parcelOwner', headerName: 'Parcel Owner', width: 150, },
        { field: 'parcelOwnerAddress', headerName: 'Parcel Owner Address', width: 150, },
        { field: 'businessName', headerName: 'Business Name', width: 150, },
        { field: 'renewalStatus', headerName: 'Renewal Status (Renewal Date)', width: 150 },
        { field: 'photo', headerName: 'Photo', width: 1500, height: 1500, renderCell: (params) => <img src={params.value}/> }
    ]

    const [dataGridProps, setDataGridProps] = useState({
        columns: columns,
        rows: rows
    })

	return (
		<div className="App">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h5">
                            Advertising Signs and Sign Structures in the County of Shelby
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            
            <div className="view-geodb">
                <Typography variant="h6">
                    Geodatabase
                </Typography>
                <Box sx={ {height: '100%', width: '100%' }}>
                    <DataGrid {...dataGridProps} getRowHeight={() => 'auto'} />
                </Box>
            </div>
            <div className="download-geodb">
                <Typography variant="h6">
                    
                Download as Geodatabase
                </Typography>
                <Typography variant="h6"> 
                Download as CSV
                </Typography>
                <Typography variant="h6"> 
                Download as Excel
                </Typography>
            </div>
		</div>
	);
}

export default App;
