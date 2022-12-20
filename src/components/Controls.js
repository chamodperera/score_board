import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import {useData} from '../Data.Context'
import { useEffect,useState } from 'react';

const Controls = () => {
    const {teams,setTeams,batting,setBatting,bowling,setBowling,bat1,setBat1,bat2,setBat2,ball,setBall,over,setOver} = useData()

    const editVals = {
        'score': teams[batting].score,
        'wickets' : teams[batting].wickets,
        'balls' : teams[batting].balls,
        'extras': teams[batting].extras,
        [bat1] : teams[batting].players[bat1].bat,
        [bat2] : teams[batting].players[bat2].bat,
        'currOver' : over,
        [ball] : teams[bowling].players[ball].ball
    }

    const [isChecked, setIsChecked] = useState(false);
    const [currEdit,setCurrEdit] = useState('score')
    const [edit,setEdit] = useState(editVals[currEdit])
    
    useEffect(()=>{
        if (over.length >= 6 && teams[batting].balls%6===0) {
            over.splice(0, over.length);
          }
    },[over])

    const editValues = () =>{

        switch(currEdit){
            case 'score':
            case 'wickets':
            case 'balls':
            case 'extras':
                setTeams(prevTeams => ({
                    ...prevTeams,
                    [batting]: {
                      ...prevTeams[batting],
                      [currEdit]: edit
                    }
                  }));
                break;
            
            case bat1:
            case bat2:
                setTeams(prevTeams => ({
                    ...prevTeams,
                    [batting]: {
                      ...prevTeams[batting],
                      players: {
                          ...prevTeams[batting].players,
                          [currEdit]: {
                            ...prevTeams[batting].players[currEdit],
                            bat: edit
                          }
                      }
                    }
                    }));
                    break;

            case ball:
                setTeams(prevTeams => ({
                    ...prevTeams,
                    [bowling]: {
                      ...prevTeams[bowling],
                      players: {
                          ...prevTeams[bowling].players,
                          [currEdit]: {
                            ...prevTeams[batting].players[currEdit],
                            ball: edit
                          }
                      }
                    }
                    }));
                    break;
             case 'currOver':
                setOver(edit.split(','))
        }
    }

    const handleSwitch = () => {
        const temp = bat1
        setBat1(bat2)
        setBat2(temp)
    }

    const update = (value) => {
        setTeams(prevTeams => ({
          ...prevTeams,
          [batting]: {
            ...prevTeams[batting],
            score: prevTeams[batting].score + value,
            balls: prevTeams[batting].balls + 1,
            players: {
                ...prevTeams[batting].players,
                [bat1]: {
                  ...prevTeams[batting].players[bat1],
                  bat: prevTeams[batting].players[bat1].bat + value
                }
            }
          },
          [bowling]: {
            ...prevTeams[bowling],
            players: {
                ...prevTeams[bowling].players,
                [ball]: {
                  ...prevTeams[bowling].players[ball],
                  ball: prevTeams[bowling].players[ball].ball + value
                }
            }
          }
        }));

        setOver(over.concat(value.toString()))
      }

      const extras = () => {
        setTeams(prevTeams => ({
          ...prevTeams,
          [batting]: {
            ...prevTeams[batting],
            score: prevTeams[batting].score + 1,
            extras: prevTeams[batting].extras + 1
          },
          [bowling]: {
            ...prevTeams[bowling],
            players: {
                ...prevTeams[bowling].players,
                [ball]: {
                  ...prevTeams[bowling].players[ball],
                  ball: prevTeams[bowling].players[ball].ball + 1
                }
            }
          }
        }));
        
        setOver(over.concat('1'))
      }

      const wicket = () =>{
        setTeams(prevTeams => ({
            ...prevTeams,
            [batting]: {
              ...prevTeams[batting],
              balls: prevTeams[batting].balls + 1,
              wickets: prevTeams[batting].wickets + 1
            }
          }));

          setOver(over.concat('w'))
      }


    return ( 
        <Container fluid >
            <Stack gap={3} style={{padding:'1em'}}>

            <Row>
                <Form.Label>Batting</Form.Label>
                <Form.Select onChange={(e)=>{
                    setBatting(e.target.value)
                    setBat1(Object.keys(teams[e.target.value].players)[0])
                    setBat2(Object.keys(teams[e.target.value].players)[0])
                    }}>
                    {Object.keys(teams).map((team,index)=>{
                        return(
                            <option key={index} >{team}</option>
                        )
                    })}
                </Form.Select>
            </Row>

            <Row>
            <Form.Label>Bowling</Form.Label>
            <Form.Select onChange={(e)=>{
                setBowling(e.target.value)
                setBall(Object.keys(teams[e.target.value].players)[0])
                }}>
                {Object.keys(teams).map((team,index)=>{
                    return(
                        <option key={index}>{team}</option>
                    )
                })}
            </Form.Select>
            </Row>

            <Row>

                <Col>
                    <Form.Label>Batting 1</Form.Label>
                    <Form.Select onChange={(e)=>setBat1(e.target.value)} value={bat1}>
                        {Object.keys(teams[batting].players).map((player,index)=>{
                            return(
                                <option key={index}>{player}</option>
                            )
                        })}
                    </Form.Select>
                </Col>
                
                <Col>
                    <Form.Label>Batting 2</Form.Label>
                    <Form.Select onChange={(e)=>setBat2(e.target.value)} value={bat2}>
                        {Object.keys(teams[batting].players).map((player,index)=>{
                            return(
                                <option key={index}>{player}</option>
                            )
                        })}
                    </Form.Select>
                </Col>

                <Col xs={3}>
                    <Button variant="outline-dark" onClick={()=>{handleSwitch()}}>Switch</Button>
                </Col>
            </Row>

            <Row>

                <Col xs={6}>
                    <Form.Label>Bowling</Form.Label>
                    <Form.Select onChange={(e)=>setBall(e.target.value)} value={ball}>
                        {Object.keys(teams[bowling].players).map((player,index)=>{
                            return(
                                <option key={index}>{player}</option>
                            )
                        })}
                    </Form.Select>
                </Col>
            </Row>
            
            <Row>
                <Form.Label>Score</Form.Label>
                {[0,1,2,3,4,5,6].map((i,index)=>{
                    return(
                        <Col key={index}>
                        <Button variant="success" onClick={()=>{update(i)}}>{i}</Button>
                        </Col>
                    )
                })}
            </Row>

            <Row>
                <Col xs={3}><Button variant="secondary" onClick={()=>{extras()}}>Wide</Button></Col>
                <Col xs={3}><Button variant="warning" onClick={()=>{extras()}}>No ball</Button></Col>
                <Col xs={3}><Button variant="danger" onClick={()=>{wicket()}}>Wicket</Button></Col>
            </Row>

            <Row>
                <Form.Label>Edit</Form.Label>
                <Col xs={4}>
                    
                    <Form.Select onChange={(e)=>{
                        setCurrEdit(e.target.value)
                        setEdit(editVals[e.target.value])
                        }}>
                        {Object.keys(editVals).map((title,index)=>{
                            return(
                                <option key={index}>{title}</option>
                            )
                        })}
                    </Form.Select>

                    
                </Col>
                    
                <Col>
                    <Form.Control type="text"  value={edit} onChange={(e)=>setEdit(e.target.value)}/>
                    <Button variant='outline-info' style={{marginTop:'0.5em'}} onClick={editValues}>Update</Button>
                </Col>
            </Row>

            <Row>
                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label="Clear history"
                    onChange={event => setIsChecked(event.target.checked)}
                />
                <Button variant="info" style={{marginTop:'2em'}} disabled={!isChecked} onClick={()=>{
                    localStorage.clear()
                    window.location.reload()
                    }}>Clear</Button>
            </Row>

            </Stack>

        </Container>
     );
}
 
export default Controls;