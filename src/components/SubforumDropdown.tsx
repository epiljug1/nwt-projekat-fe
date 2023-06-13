import React, { useState } from "react";
import styled from "styled-components";

interface DropdownProps {
  options: string[];
  selectedOption: string;
  handleOptionSelect: (option: string) => void;
}

const Container = styled.div`
  position: relative;
  margin-bottom: 40px;
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
`;

const SelectedOption = styled.span`
  margin-right: 8px;
`;

const DropdownIcon = styled.span`
  margin-left: auto;
`;

const OptionsContainer = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0;
  margin: 0;
  list-style-type: none;

  max-height: 100px;
  overflow-y: auto;
`;

const OptionItem = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const SubforumDropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  handleOptionSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    handleOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <Container>
      <SelectWrapper onClick={toggleDropdown}>
        <SelectedOption>{selectedOption}</SelectedOption>
        <DropdownIcon>▼</DropdownIcon>
      </SelectWrapper>
      {isOpen && (
        <OptionsContainer>
          {options.map((option) => (
            <OptionItem key={option} onClick={() => handleOptionClick(option)}>
              {option}
            </OptionItem>
          ))}
        </OptionsContainer>
      )}
    </Container>
  );
};

export default SubforumDropdown;
