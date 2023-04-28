import { MenuItem, Button, InputLabel, TextField, FormControl, AppBar, Box, Toolbar, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useState, useEffect, ChangeEvent } from "react";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "./App.scss";

function App() {
	// usestate for setting a javascript
	// object for storing and using data
	var rows = [];
    const [district, setDistrict] = useState(null);
    const [address, setAddress] = useState('');
    const [signType, setSignType] = useState('');
    const [signTechnology, setSignTechnology] = useState('');
    const [signSize, setSignSize] = useState(null);
    const [signStatus, setSignStatus] = useState('');
    const [signCondition, setSignCondition] = useState('');
    const [parcelId, setParcelId] = useState('');
    const [parcelOwner, setParcelOwner] = useState('');
    const [parcelOwnerAddress, setParcelOwnerAddress] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [renewalStatus, setRenewalStatus] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileData, setFileData] = useState<File | null>(null);
    var loading = true;

    const date = new Date();

    const handleNewRow = async (event) => {
        event.preventDefault();

        console.log({
            'Address': address,
            'District': district,
            'Sign Type': signType,
            'Sign Technology': signTechnology,
            'Sign Size': signSize,
            'Sign Status': signStatus,
            'Sign Condition': signCondition,
            'Parcel Id': parcelId,
            'Parcel Owner Address': parcelOwnerAddress,
            'Business Name': businessName,
            'Renewal Status': renewalStatus,
            'File Name': fileName,
            'File Data': fileData
        })

        setAddress('')
        setDistrict('')
        setSignType('')
        setSignTechnology('')
        setSignSize('')
        setSignStatus('')
        setSignCondition('')
        setParcelId('')
        setParcelOwner('')
        setParcelOwnerAddress('')
        setBusinessName('')
        setFileData(null)
        setRenewalStatus('')
        setFileName('')

    }

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files[0]) {
          return;
        }
        setFileName(e.target.files[0].name);
        setFileData(e.target.files[0]);
    };

        // make api call to upload to blob

    const handleRenewalStatus = (event: SelectChangeEvent) => {
        setRenewalStatus(event.target.value);
    };

    const handleBusinessName = (event: ChangeEvent<HTMLInputElement>) => {
        setBusinessName(event.target.value);
    };

    const handleParcelOwnerAddress = (event: ChangeEvent<HTMLInputElement>) => {
        setParcelOwnerAddress(event.target.value);
    };

    const handleParcelOwner = (event: ChangeEvent<HTMLInputElement>) => {
        setParcelOwner(event.target.value);
    };

    const handleParcelId = (event: ChangeEvent<HTMLInputElement>) => {
        setParcelId(event.target.value);
    };

    const handleSignCondition = (event: SelectChangeEvent) => {
        setSignCondition(event.target.value);
    };

    const handleSignStatus = (event: SelectChangeEvent) => {
        setSignStatus(event.target.value);
    };

    const handleSignSize = (event: ChangeEvent<HTMLInputElement>) => {
        setSignSize(event.target.value);
    };

    const handleSignTechnology = (event: SelectChangeEvent) => {
        setSignTechnology(event.target.value);
    };

    const handleSignType = (event: SelectChangeEvent) => {
        setSignType(event.target.value);
    };

    const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };

    const handleDistrictChange = (event: SelectChangeEvent) => {
        setDistrict(event.target.value);
    };

	// Using useEffect for single rendering
	useEffect(() => {
		// Using fetch to fetch the api from
		// flask server it will be redirected to proxy
        if (loading == true) {
            fetch("/get_db").then((res) =>
			res.json().then((data) => {
				// Setting a data from api
                setDataGridProps({
                    columns: columns,
                    rows: data
                    })
			    })
		    );
            loading = false;
        }
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
            <div className="add-geodb">
            <Typography variant="h6">
                Add to geodatabase
            </Typography>
            <form onSubmit={handleNewRow} className="add-new-row">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <TextField id="standard-basic" label="Address" variant="standard" value={address ?? ""} onChange={handleAddressChange}/>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label"> District </InputLabel>
                    <Select
                    defaultValue=""
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={district ?? ""}
                    onChange={handleDistrictChange}
                    label="Age"
                    >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={11}>11</MenuItem>
                    <MenuItem value={12}>12</MenuItem>
                    <MenuItem value={13}>13</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label"> Sign Type </InputLabel>
                    <Select
                    defaultValue=""
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={signType ?? ""}
                    onChange={handleSignType}
                    label="Sign Type"
                    >
                    <MenuItem value={'commerical'}>commercial</MenuItem>
                    <MenuItem value={'advertisment'}>advertisment</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
                    <InputLabel id="demo-simple-select-standard-label"> Sign Technology </InputLabel>
                    <Select
                    defaultValue=""
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={signTechnology ?? ""}
                    onChange={handleSignTechnology}
                    label="Sign Technology"
                    >
                    <MenuItem value={'electric'}>electric</MenuItem>
                    <MenuItem value={'billboard'}>billboard</MenuItem>
                    <MenuItem value={'sign'}>sign</MenuItem>
                    <MenuItem value={'other'}>other</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, width: 80 }}>
                    <TextField id="standard-basic" label="Sign Size" variant="standard" value={signSize ?? ""} onChange={handleSignSize}/>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label"> Sign Status </InputLabel>
                    <Select
                    defaultValue=""
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={signStatus ?? ""}
                    onChange={handleSignStatus}
                    label="Sign Status"
                    >
                    <MenuItem value={'active'}>active</MenuItem>
                    <MenuItem value={'inactive'}>inactive</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
                    <InputLabel id="demo-simple-select-standard-label"> Sign Condition </InputLabel>
                    <Select
                    defaultValue=""
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={signCondition ?? ""}
                    onChange={handleSignCondition}
                    label="Sign Condition"
                    >
                    <MenuItem value={'poor'}>poor</MenuItem>
                    <MenuItem value={'fair'}>fair</MenuItem>
                    <MenuItem value={'good'}>good</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, width: 80 }}>
                    <TextField id="standard-basic" label="Parcel ID" variant="standard" value={parcelId ?? "" } onChange={handleParcelId}/>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <TextField id="standard-basic" label="Parcel Owner" variant="standard" value={parcelOwner ?? ""} onChange={handleParcelOwner}/>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <TextField id="standard-basic" label="Parcel Owner Address" variant="standard" value={parcelOwnerAddress ?? ""} onChange={handleParcelOwnerAddress}/>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <TextField id="standard-basic" label="Business Name" variant="standard" value={businessName ?? ""} onChange={handleBusinessName}/>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
                    <InputLabel id="demo-simple-select-standard-label"> Renewal Status </InputLabel>
                    <Select
                    defaultValue=""
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={renewalStatus ?? ""}
                    onChange={handleRenewalStatus}
                    label="Renewal Status"
                    >
                    <MenuItem value={date.getFullYear()+1-date.getMonth()+1-date.getDate()}> {date.getFullYear()+1}-{date.getMonth()+1}-{date.getDate()} </MenuItem>

                    </Select>
                </FormControl>

                <Button
                    className="file-upload"
                    component="label"
                    variant="contained"
                    startIcon={<UploadFileIcon />}
                    hidden={true}
                    sx={{ marginRight: "1rem" }}
                >
                    Upload File
                    <input type="file" name="file" accept="image/png, image/jpeg" onChange={handleFileUpload} hidden/>
                    <Box style={{marginLeft: '10px'}}> {fileName}</Box>
                </Button>

                <Button type="submit" variant="contained"> Submit </Button>
            </form>
            

            </div>
		</div>
	);
}

export default App;
