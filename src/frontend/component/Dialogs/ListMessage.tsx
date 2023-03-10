import React from 'react';
import { Box } from "@mui/system";
import { Paper } from "@mui/material";
import { useAppSelector } from "@src/frontend/store/Hooks/hook";


const ListMessage: React.FC = () => {

  const messages = useAppSelector(state => state.app.messages)

  return (
    <Box sx={ { p: '10px' } }>
      { messages.map(message =>
        <Box sx={ { p: '5px', wordWrap: 'break-word' } }>
          <Paper key={ message.id }
                 elevation={ 3 }
                 sx={ { p: '10px' } }
          >
            { message.text }
          </Paper>
        </Box>
      ) }

    </Box>
  );
};

export default ListMessage;
