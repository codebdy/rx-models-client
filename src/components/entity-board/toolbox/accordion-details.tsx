import withStyles from '@mui/styles/withStyles';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

export const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    flexFlow: 'column',
    fontSize: '0.8rem'
  },
}))(MuiAccordionDetails);
