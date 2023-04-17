import React from 'react';
import { Box } from "@mui/system";
import { Paper } from "@mui/material";
import { useAppSelector } from "@src/frontend/store/Hooks/hook";


const ListMessage: React.FC = () => {
  const messages = useAppSelector(state => state.chat.listMessages)
  return (
    <Box sx={ { p: '10px', overflow: 'scroll', height: '100%', marginBottom: '100px' } } >
      { messages.map(message =>
        <Box sx={ { p: '5px', wordWrap: 'break-word' } } key={ message.id }>
          <Paper key={ message.id }
                 elevation={ 3 }
                 sx={ { p: '10px' } }
          >
            { message.content }
          </Paper>
        </Box>
      ) }
    </Box>
  );
};

export default ListMessage;
