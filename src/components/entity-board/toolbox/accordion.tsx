import withStyles from '@mui/styles/withStyles';
import MuiAccordion from '@mui/material/Accordion';

export const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
    width: '100px',
    userSelect: 'none',
  },
  expanded: {},
})(MuiAccordion);
