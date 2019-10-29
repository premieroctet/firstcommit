import styled from "styled-components";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox";

export const ComboboxContainer = styled(Combobox)`
  max-width: 400px;
  width: 100%;

  @media screen and (max-width: 500px) {
    width: 90%;
  }
`;

export const Input = styled(ComboboxInput)`
  border: 3px solid black;
  color: black;
  background-color: white;
  text-align: left;
  height: 30px;
  border-radius: 10px;
  padding: 30px 20px;
  font-size: 1.5rem;
  box-sizing: border-box;
  width: inherit;

  &::placeholder {
    color: #b2bec3;
  }
`;

export const List = styled(ComboboxList)`
  font-size: 17px;
  list-style: none;
  margin: 0;
  padding: 0;
  border: 3px solid black;
  border-top: 1px dashed black;
  margin-top: -10px;
  z-index: 111;
  position: relative;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: white;
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

export const SuggestionSkeleton = styled.li`
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  background-color: white;
  color: black;
`;

export const Suggestion = styled(ComboboxOption)`
  width: 100%;
  font-size: 15px;
  padding: 1rem;
  box-sizing: border-box;
  background-color: white;
  color: black;
  cursor: pointer;

  &[aria-selected="true"],
  &:hover {
    background-color: #f4f5f7;
  }
`;
