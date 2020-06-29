import React from "react";
import { StyledLoading } from "../assets/styles/loading"
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = function () {
    return (
        <StyledLoading>
            <CircularProgress />
        </StyledLoading>
    )
};

export default Loading;
