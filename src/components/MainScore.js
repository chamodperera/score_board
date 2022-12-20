import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image'

import {useData} from '../Data.Context'

import '../styles/Score.scss';

const MainScore = () => {
    const {teams,batting,bowling,bat1,bat2} = useData()

    return ( 
        <Container fluid>
            <Row>

                <Col xs={4} style={{padding:'.5em 0'}}>
                <Stack direction="vertical" gap={3} style={{padding:'0 3em',borderRight:'2px solid'}}>

                    <span style={{fontSize:'2em',fontWeight:'600'}}>{bowling}</span>

                    <Row>
                        <Col>
                            <Image src={require(`../Assets/Teams/${bowling}.jpeg`)} width="auto" height='100px' rounded/>
                        </Col>
                        <Col>
                            <span style={{fontSize:'2.5em',fontWeight:'600',color:'#494949'}}>{
                                teams[bowling].score===0 && teams[bowling].wickets===0 ? 'Yet to bat'
                                : 
                                `${teams[bowling].score} /${teams[bowling].wickets } (${
                                    ((Math.floor(teams[bowling].balls/6) + (teams[bowling].balls%6)/10)).toFixed(1)
                                })`
                            }</span>
                        </Col>
                    </Row>

                    <span style={{fontSize:'4em',fontWeight:'700',textAlign:'center'}}>VS</span>

                </Stack>
                </Col>


                <Col xs={6}>
                <Stack direction="vertical" gap={3} style={{padding:'0 2.5em'}}>

                <span style={{fontSize:'3em',fontWeight:'600'}}>{batting}</span>

                <Row>
                    <Col xs={4} >
                        <Image src={require(`../Assets/Teams/${batting}.jpeg`)} width="auto" height='150px' rounded/>
                    </Col>
                    <Col style={{textAlign:'center',lineHeight:'normal'}} >
                        <Stack gap={0}>
                            <span style={{fontSize:'5.5em',fontWeight:'700'}}>{teams[batting].score}/{teams[batting].wickets}</span>
                            <span style={{fontSize:'4em',fontWeight:'500',color:'#494949'}}>({
                                ((Math.floor(teams[batting].balls/6) + (teams[batting].balls%6)/10)).toFixed(1)
                            })</span>
                        </Stack>
                    </Col>
                </Row>

                <span style={{fontSize:'2.8em',fontWeight:'500',color:'#494949',textAlign:'center',textDecoration:'underline',marginTop:'.5em'}}>Run Rate - {
                    (teams[batting].balls!==0?(teams[batting].score/(teams[batting].balls)*6).toFixed(2):'--|--')
                }</span>

                </Stack>
                </Col>

                <Col xs={2} style={{transform:'scale(1.13)',padding:0}} className='side-info'>
                        <div>
                            <span>{bat1}</span>
                            <span>{teams[batting].players[bat1].bat}*</span>
                        </div>
                        <div >
                            <span>{bat2}</span>
                            <span>{teams[batting].players[bat2].bat}</span>
                        </div>
                        <div >
                            <span>Extras</span>
                            <span>{teams[batting].extras}</span>
                        </div>
                </Col>
            </Row>
      </Container>
     );
}
 
export default MainScore;