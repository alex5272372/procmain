import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/nextjs-material-kit/pages/statement.js";
const useStyles = makeStyles(styles);

export default function Statement(props) {
    const classes = useStyles();
    const {...rest} = props;

    return (<div>
        <Header
        brand="procmain"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
            height: 400,
            color: "white"
        }}
        {...rest}
        />
        <Parallax image={require("assets/img/nextjs_header.jpg")}>
        <div className={classes.container}>
            <GridContainer>
            <GridItem>
                <div className={classes.brand}>
                <h1 className={classes.title}>Profit and Loss Statement</h1>
                <h3 className={classes.subtitle}>
                    The P&L statement is a financial statement that summarizes the revenues,
                    costs, and expenses incurred during a specified period.
                </h3>
                </div>
            </GridItem>
            </GridContainer>
        </div>
        </Parallax>
    </div>);

}
