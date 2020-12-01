import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory} from 'react-router-dom'
import Search from "../Search/index";

const useStyles = makeStyles((theme) => ({
    navbar: {
        position: `fixed`,
        top: 0,
        width: `100%`,
        height: 40,
        paddingLeft: 10,
        zIndex: 1000000,
        backgroundColor: `#625577`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `space-between`
    },
    home: {
        fontWeight: `bold`,
        cursor: `pointer`
    }
  }));

function Navbar() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.navbar}>
        <div className={classes.home} onClick={() => history.push(`/`)}>Our-MovieDB</div>
        <div>SignIn</div>
        <div>Settings</div>
        <div>ColorChange</div>
        <div><Search /></div>
    </div>
  );
}

export default Navbar;