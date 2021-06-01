import React from "react";
import { connect } from 'react-redux';
import Login from "../Login";

const ManageUser = ({ userDetails }) => {
  return (
    <Login />
  )
};


const mapStateToProps = ({ getUserDetails }) => ({
  userDetails: getUserDetails.data,
});

export default connect(mapStateToProps, null)(ManageUser);
