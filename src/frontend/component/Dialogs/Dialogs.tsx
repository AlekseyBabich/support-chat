import React from 'react';
import {Grid} from "@mui/material";
import {Box} from "@mui/system";

const Dialogs = () => {
    return (
        <Grid item md={4} sx={{textAlign: 'center'}}>
            <Box component="h4"
                 height={'30px'}
                 textAlign={'center'}
                 border={'2px solid red'}
                 borderRadius={'10px'}
                 marginRight={'15px'}
            >
                {"Служба поддержки"}
            </Box>
        </Grid>
    );
};

export default Dialogs;