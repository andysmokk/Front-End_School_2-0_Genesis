import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import s from './Button.module.css';

export default function ButtonSizes() {
  const navigate = useNavigate();
  const location = useLocation();

  const onClickGoBack = () => {
    navigate(location?.state?.from?.location ?? '/');
  };
  return (
    <Box sx={{ '& button': { m: 1 } }}>
      <div>
        <Button
          className={s.button}
          variant="contained"
          size="small"
          onClick={onClickGoBack}
        >
          {location?.state?.from?.label ?? 'GO BACK'}
        </Button>
      </div>
    </Box>
  );
}
