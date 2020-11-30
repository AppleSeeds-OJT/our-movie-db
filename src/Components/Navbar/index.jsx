import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory} from 'react-router-dom'
import Search from "../Search/index";

const useStyles = makeStyles((theme) => ({
    navbar: {
        position: `fixed`,
        top: 0,
        width: `100%`,
        zIndex: 1000000,
        backgroundColor: `#625577`,
        display: `flex`,
        justifyContent: `space-between`,
    }
  }));

function Navbar() {
  const classes = useStyles();
  const history = useHistory();
  
  const [state, setState] = useState({
  });

  useEffect(() => {

  }, []);



  return (
    <div className={classes.navbar}>
        <div>
            Hamburger
        </div>
        <div>
            SignIn
        </div>
        <div>
            Settings
        </div>
        <div>
            ColorChange
        </div>
        <div>
            <Search />
        </div>
    </div>
  );
}

export default Navbar;