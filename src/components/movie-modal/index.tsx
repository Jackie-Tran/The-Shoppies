import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Div100vh from 'react-div-100vh';
import { MdClose } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import { Movie, NominationsContext } from '../../context/nominations-context';
import { device } from '../../constants/device';

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
  const history = useHistory();
  const { nominations, addNomination, removeNomination } = useContext(
    NominationsContext
  );
  const [isNominated, setIsNominated] = useState<boolean>(false);

  useEffect(() => {
    // Check if movie is already nominated
    for (let i = 0; i < nominations.length; i++) {
      if (nominations[i].imdbID === imdbID) {
        setIsNominated(true);
        return;
      }
    }
    setIsNominated(false);
  }, [imdbID, nominations]);

  const handleAddNomination = async () => {
    const movie: Movie = { Title: title, Year: year, imdbID, Poster: poster };
    setIsShowing(false);
    addNomination(movie);
  };

  const handleRemoveNomination = async () => {
    setIsShowing(false);
    removeNomination(imdbID);
  };

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
              <Title>
                {title} ({year})
              </Title>
            </MovieDetails>
            <Buttons>
              <Button onClick={() => history.push('/movie/' + imdbID)}>
                More Info
              </Button>
              <NominationButton
                isNominated={isNominated}
                onClick={() => {
                  isNominated ? handleRemoveNomination() : handleAddNomination();
                }}
              >
                {isNominated ? 'Remove Nomination' : 'Nominate'}
              </NominationButton>
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
  z-index: 2;
`;

const Container = styled(Div100vh)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ExitIcon = styled(MdClose)`
  position: absolute;
  color: white;
  top: 10px;
  left: 10px;
`;

const Poster = styled.img`
  width: 15rem;
  @media ${device.desktop} {
    width: 20rem;
  }
`;

const MovieDetails = styled.div``;

const Title = styled.h1`
  color: white;
  margin: 5% 0;
  text-align: center;
  @media ${device.desktop} {
    font-size: 2.5rem;
    margin: 3% 0;
  }
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
  background-color: #1e90ff;
  color: white;
  font-size: 1rem;
  padding: 5%;
  margin: 5%;
  @media ${device.desktop} {
    padding: 1% 3%;
    margin: 3%;
  }
`;

const NominationButton = styled(Button)<{ isNominated: boolean }>`
  background-color: ${(props) => (props.isNominated ? '#f07167' : '#04a777')};
`;

export default MovieModal;
