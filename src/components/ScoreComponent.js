import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'

import {useData} from '../Data.Context'

import '../styles/Score.scss';

import MainScore from './MainScore';

const ScoreComponent = () => {

    const {teams,bowling,ball,over} = useData()

    return ( 
        <>
        <Container fluid className='title'>
            <Row>
                <Col style={{color:'#ffffff'}}>SCOREBOARD</Col>
            </Row>
        </Container>

        <div className='main-score'>
            <MainScore/>
        </div>

        <div className='overs'>
            <Row>
                <Col xs={5}>{ball} ({teams[bowling].players[ball].ball})</Col>
                <Col xs={7}>{over.join(' - ')}</Col>
            </Row>
        </div>

        <Container fluid className='banner position-absolute fixed-bottom'>
        <Row>
            <Col>
                <Image src={require(`../Assets/banner.png`)} width="auto" height='120px' />
            </Col>
        </Row>
        </Container>

        </>
     );
}
 
export default ScoreComponent;