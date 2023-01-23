import React from 'react';
import {Button, Grid, TextField} from "@mui/material";
import {Box} from "@mui/system";

const Messages = () => {
    return (
        <Grid item md={8} sx={{border: '1px solid red', mt: '20px'}}>
            <Box sx={{height: '500px'}}>
                Messages
            </Box>
            <Box sx={{mr: '15px'}}>
                <TextField
                    id="outlined-textarea"
                    label="Введите сообщание"
                    variant="outlined"
                    placeholder="Placeholder"
                    multiline
                    fullWidth
                />
            </Box>
            <Box sx={{mt: '5px', mb: '5px'}}>
                <Button variant="contained">Отправить</Button>
            </Box>
        </Grid>
    );
};

export default Messages;