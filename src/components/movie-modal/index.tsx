import React from 'react';
import styled from 'styled-components';
import Div100vh from 'react-div-100vh';
import CloseIcon from '@material-ui/icons/Close';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  isShowing: boolean;
  setIsShowing: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  year: string;
  poster: string;
  imdbID: string;
};

const MovieModal: React.FC<Props> = ({
  isShowing,
  setIsShowing,
  title,
  year,
  poster,
  imdbID,
}) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {isShowing && (
        <Backdrop
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <Container>
            <ExitIcon fontSize="large" onClick={(e) => setIsShowing(false)} />
            <Poster src={poster} />
            <MovieDetails>
              <Title>{ title } ({ year })</Title>
            </MovieDetails>
            <Buttons>
                <Button>
                    More Info
                </Button>
                <Button>
                    Nominate
                </Button>
            </Buttons>
          </Container>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

const backdrop = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0.5, y: '100vh' },
};

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
`;

const Container = styled(Div100vh)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ExitIcon = styled(CloseIcon)`
  position: absolute;
  color: white;
  top: 10px;
  left: 10px;
`;

const Poster = styled.img`
  width: 65%;
`;

const MovieDetails = styled.div``;

const Title = styled.h1`
  color: white;
  margin: 5% 0;
`;

const Buttons = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const Button = styled.button`
    -webkit-appearance: none;
    border-radius: 5px;
    border: none;
    background-color: #04A777;
    color: white;
    font-size: 1rem;
    padding: 5%;
    margin: 5%;
`;

export default MovieModal;
