import styled from "@emotion/styled";

const PriceInputError = styled.div`
  font-size: 0.7rem;
  color: #dc3545;
  margin: 0;
  padding: 0;
  transition: all 0.2s;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  max-height: ${(props) => (props.isOpen ? "1rem" : "0")};
`;

export default PriceInputError;
