import { AnimatePresence, motion } from 'framer-motion';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { device } from '../../constants/device';
import { Movie, NominationsContext } from '../../context/nominations-context';
import Nomination from './nomination';

type Props = {
  isShowing: boolean;
  setIsShowing: React.Dispatch<React.SetStateAction<boolean>>;
};

const NominationsModal: React.FC<Props> = ({ isShowing, setIsShowing }) => {
  const { nominations } = useContext(NominationsContext);

  return (
    <AnimatePresence exitBeforeEnter>
      {isShowing && (
        <Container
        variants={nominationsMenu}
        initial="hidden"
        animate="visible"
        exit="hidden"
        >
          <Title>Your Nominations</Title>
          {
              nominations.map((movie: Movie) => {
                  return (
                      <Nomination imdbID={movie.imdbID} title={movie.Title} year={movie.Year} />
                  )
              })
          }
        </Container>
      )}
    </AnimatePresence>
  );
};

const nominationsMenu = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: '-100%' },
};

const Container = styled(motion.div)`
  background-color: white;
  color: black;
  position: absolute;
  top: 5vh;
  width: 50vw;
  right: 5%;
  border-color: gray;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  @media ${device.desktop} {
        width: 30vw;
    }
`;

const Title = styled.p`
  margin: 5% 0;
  text-decoration: underline;
  font-size: 1.2rem;
  font-weight: 500;
`;

export default NominationsModal;
