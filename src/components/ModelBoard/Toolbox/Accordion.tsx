import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';

export const Accordion = (props: AccordionProps)=>{
  const {sx, ...rest} = props;
  return <MuiAccordion {...rest}  sx={{
    ...sx,
    border: theme=> theme.palette.divider + ' 1px solid',
    boxShadow: 'none',
    "&.MuiAccordion-root":{
      backgroundImage:"none",
    },
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
  }}/>
}
