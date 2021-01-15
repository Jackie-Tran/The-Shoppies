import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Div100vh from 'react-div-100vh';
import CloseIcon from '@material-ui/icons/Close';
import { AnimatePresence, motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import { Movie, NominationsContext } from '../../context/nominations-context';

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
  const { nominations, setNominations } = useContext(NominationsContext);
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

  const addNomination = () => {
    const movie: Movie = { Title: title, Year: year, imdbID, Poster: poster };
    setNominations(nominations.concat(movie));
    setIsShowing(false);
  };

  const removeNomination = () => {
    setNominations(nominations.filter((movie) => movie.imdbID !== imdbID));
    setIsShowing(false);
  }

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
              <NominationButton isNominated={isNominated} onClick={() => {isNominated ? removeNomination() : addNomination()}}>{ isNominated ? 'Remove Nomination' : 'Nominate' }</NominationButton>
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
  background-color: #04a777;
  color: white;
  font-size: 1rem;
  padding: 5%;
  margin: 5%;
`;

const NominationButton = styled(Button)<{ isNominated: boolean }>`
    background-color: ${props => props.isNominated ? '#f07167' : '#04a777'}
`;

export default MovieModal;
