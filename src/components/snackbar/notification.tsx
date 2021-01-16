import React from 'react';
import styled from 'styled-components';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { AiOutlineWarning, AiOutlineInfoCircle } from 'react-icons/ai';
import { BiErrorCircle } from 'react-icons/bi';
import { RiCloseLine } from 'react-icons/ri';
import { Alert } from '../../context/alert-context';

const generateColor = (severity: string): string => {
  switch (severity) {
    case 'error':
      return '#ff4757';
    case 'success':
      return '#2ed573';
    case 'warning':
      return '#ff7f50';
    case 'information':
      return '#1e90ff';
    default:
      return 'gray';
  }
};

const generateIcon = (severity: string) => {
  switch (severity) {
    case 'error':
      return <BiErrorCircle color="white" size={28} />;
    case 'success':
      return <IoIosCheckmarkCircleOutline color="white" size={28} />;
    case 'warning':
      return <AiOutlineWarning color="white" size={28} />;
    case 'information':
      return <AiOutlineInfoCircle color="white" size={28} />;
    default:
      return null;
  }
};

type Props = {
  handleClose: () => void;
};

const Notification: React.FC<Alert> = ({ severity, message }) => {
  return (
    <Container severity={severity}>
      <MessageContainer>
        {generateIcon(severity)}
        <Message>{message}</Message>
      </MessageContainer>
      <CloseButton>
        <RiCloseLine color="white" size={28} />
      </CloseButton>
    </Container>
  );
};

const Container = styled.div<{ severity: string }>`
  width: 80%;
  margin: auto;
  padding: 3%;
  background-color: ${(props) => generateColor(props.severity)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 10px 2px #464646;
  margin-top: 3%;
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Message = styled.p`
  color: white;
  margin: 0;
  margin-left: 3%;
  white-space: nowrap;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Notification;
