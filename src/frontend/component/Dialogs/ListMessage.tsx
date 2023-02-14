import React from 'react';
import { Box } from "@mui/system";
import { Paper } from "@mui/material";
import { useAppSelector } from "@src/frontend/store/Hooks/hook";


const ListMessage: React.FC = () => {

  const messages = useAppSelector(state => state.messages.messages)

  return (
    <Box sx={ { p: '10px' } }>
      { messages.map(m => <Paper key={ m.id } elevation={ 3 } sx={ { p: '10px' } }>{ m.text }</Paper>) }
    </Box>
  );
};

export default ListMessage;
