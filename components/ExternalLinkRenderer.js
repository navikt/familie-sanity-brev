// ExternalLinkRenderer.js
import React from "react";
import PropTypes from "prop-types";
import { FaExternalLinkAlt } from "react-icons/fa";

const ExternalLinkRenderer = (props) => (props.children);

ExternalLinkRenderer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ExternalLinkRenderer;
