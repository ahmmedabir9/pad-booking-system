import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { blue, cyan } from '@material-ui/core/colors';

const PrimaryButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(cyan[700]),
    backgroundColor: cyan[700],
    '&:hover': {
      backgroundColor: cyan[900],
    },
  },
}))(Button);

export default PrimaryButton;
