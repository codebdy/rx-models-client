
import { Prompt} from "react-router-dom";
import intl from 'react-intl-universal';
 
export default function RouterPrompt (props:{message:string, promptBoolean: boolean}) {
  const {message, promptBoolean} = props;
  return  <Prompt message={
    location =>
      ! promptBoolean
      ? true
      : message || intl.get('changing-not-save-message')
    }
  />
}