import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { blue, blueGrey, deepPurple } from '@material-ui/core/colors';

const PrimaryButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(blueGrey[700]),
    backgroundColor: blueGrey[700],
    '&:hover': {
      backgroundColor: blueGrey[900],
    },
  },
}))(Button);

export default PrimaryButton;
