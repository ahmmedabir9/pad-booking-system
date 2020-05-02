import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const PrimaryButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[500],
    '&:hover': {
      backgroundColor: grey[700],
    },
  },
}))(Button);

export default PrimaryButton;
