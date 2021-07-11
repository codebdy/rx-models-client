import { withStyles } from '@material-ui/core/styles';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

export const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    flexFlow: 'column',
    fontSize: '0.8rem'
  },
}))(MuiAccordionDetails);
