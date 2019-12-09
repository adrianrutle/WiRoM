import React, {Component} from 'react';
import data from './data';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Button, Form, ButtonGroup, Container, Col, Row, ListGroup, ListGroupItem, ToggleButton, ToggleButtonGroup, ButtonToolbar} from 'react-bootstrap';

const SortableItem = SortableElement(({value}) => <li onClick={console.log(value)}>{value}</li>);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value}/>
      ))}
    </ul>
  );
});

class App extends Component {
  state = {
    robots: data.robots,
    predefinedMissions: data.predefinedMissions,
    tasks: data.predefinedTasks,
    showInfoForRobot: "mavic2pro",
    selectedMission: "scoutLocationAndDeliverItem",
    selectedTask: "scoutLocation",
    mission: {}
  }

  componentDidMount() {
    this.handleMissionChange()
  }
    
  handleMissionClick = name => event => {
    this.setState({selectedMission: name});
    this.handleMissionChange()
  }

  handleTaskClick = name => event => {
    this.setState({selectedTask: name});
  }

  handleSimpleActionArgsChange = sa => event => {
    let task = this.state.tasks[this.state.selectedTask]
    let newTask = task

    newTask[task.indexOf(sa)].args = event.target.value
    this.setState({task: newTask})
    this.handleMissionChange()
  }

  handleSimpleActionRobotChange = sa => event => {
    let task = this.state.tasks[this.state.selectedTask]
    let newTask = task

    newTask[task.indexOf(sa)].robot = event.target.value
    this.setState({task: newTask})
    this.handleMissionChange()
  }

  handleSubmit = event => {
    sendMission(this.state);
    event.preventDefault();
  }

  handleMissionChange = event => {
    let preMission = this.state.predefinedMissions[this.state.selectedMission]
    let tasks = this.state.tasks
    let robots = this.state.robots
    let mission = {}

    preMission.forEach(task => {
      tasks[task].forEach(simpleaction => {
        let robot = simpleaction.robot
        let simpleactions = [simpleaction]

        if (robot in mission){
          simpleactions = mission[robot].simpleactions
          simpleactions.push(simpleaction)
        }
        else
          mission[robot] = {port:robots[robot]["port"], language:robots[robot]["language"]}
        mission[robot].simpleactions = simpleactions
      })
    })
    console.log(mission)
    this.setState({mission: mission})
  }

  handleTaskChange = items => event => {
    let mission = this.state.predefinedMissions[this.state.selectedMission]
    mission = items
    this.setState(mission)
  }

  render () {
    return (
      <Container>
        <Robot state={this.state}>
        </Robot>

        <Row>
          <Mission 
            state={this.state} 
            handleMissionClick={(mission) => this.handleMissionClick(mission)}>
          </Mission>
        </Row>

        <Row style={{marginBottom:"15px"}}>
          <Col>
            <Task state={this.state} handleTaskClick={(mission) => this.handleTaskClick(mission)}>
            </Task>
          </Col>

          <Col xs={9}>
            <Simpleactions 
            state={this.state} 
            handleSimpleActionArgsChange={(sa) => this.handleSimpleActionArgsChange(sa)}
            handleSimpleActionRobotChange={(sa) => this.handleSimpleActionRobotChange(sa)}>
            </Simpleactions>
          </Col>
        </Row>

        <Button style={{marginBottom:"15px"}} variant="outline-dark" onClick={this.handleSubmit}>
            Send mission
        </Button>       
      </Container>
    );
  }
}

class Mission extends Component {
  state = {predefinedMissions: this.props.state.predefinedMissions}

  render(){
    let numMissions = Object.keys(this.state.predefinedMissions).length
    return(
      <div style={{marginLeft:"15px"}}>
        <h1>Missions</h1>
        
        <ButtonToolbar>
          <ToggleButtonGroup type="radio" name="options" defaultValue={numMissions}>
            {Object.keys(this.state.predefinedMissions).map(m => (
              <ToggleButton value={numMissions--} variant="outline-dark" style={{marginBottom:15}} onClick={this.props.handleMissionClick(m)}>{m}</ToggleButton>
            ))}
          </ToggleButtonGroup>
        </ButtonToolbar>
      </div>);
  }
}

class SortableComponent extends Component {
  componentWillReceiveProps(nextProps) {
    this.setState({items: nextProps.state.predefinedMissions[nextProps.state.selectedMission]});  
  }

  state = {items: this.props.state.predefinedMissions[this.props.state.selectedMission]}
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
    console.log(this.state.items)
    
  };

  render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd}/>;
  }
}

class Task extends Component {
  componentWillReceiveProps(nextProps) {
    this.setState({missions: nextProps.state.predefinedMissions, selectedMission: nextProps.state.selectedMission});  
  }
  state = {missions: this.props.state.predefinedMissions, selectedMission: this.props.state.selectedMission}
  
  render(){
    let numTasks = Object.keys(this.state.missions[this.state.selectedMission]).length
    return(
      <div>
        <h3>
          Tasks
        </h3>
        <ButtonToolbar>
          <ToggleButtonGroup type="radio" name="options" defaultValue={numTasks} vertical>
          {this.state.missions[this.state.selectedMission].map(t => (
            <ToggleButton value={numTasks--} variant="outline-dark" style={{display:"block"}} onClick={this.props.handleTaskClick(t)}> {t}</ToggleButton>
            ))}
          </ToggleButtonGroup>
        </ButtonToolbar>
      </div>);
  }
}

class Simpleactions extends Component {
  componentWillReceiveProps(nextProps) {
    this.setState({robots: nextProps.state.robots, tasks: nextProps.state.tasks, selectedTask: nextProps.state.selectedTask});  
  }

  findRobotsWithSimpleaction(sa) {
    let select = []
    for (let robot in this.state.robots){
      if (sa in this.state.robots[robot].simpleactions)
        select.push(<option> {robot} </option>)
    }
    return select
  }

  renderSimpleAction(sa) {    
    let simpleaction = sa.name;
    let args = sa.args;
    return (
        <ListGroup horizontal>
          <ListGroupItem style={{minWidth:"250px"}}>
            {simpleaction} 
          </ListGroupItem>
          <Form>
            <Form.Control as="input" style={{ marginLeft:"5px"}}
              value={args}
              onChange={this.props.handleSimpleActionArgsChange(sa)}>
            </Form.Control>
          </Form>
          <Form>
            <Form.Control as="select" value={sa["robot"]} onChange={this.props.handleSimpleActionRobotChange(sa)} style={{marginLeft:"10px"}}>
              {this.findRobotsWithSimpleaction(simpleaction)})}
            </Form.Control>
          </Form>
          
        </ListGroup>);
  }

  state = {robots: this.props.state.robots, tasks: this.props.state.tasks, selectedTask: this.props.state.selectedTask}
  render(){
    return(
      <div style={{ marginBottom:"15px"}}>
        <h3>Simpleactions</h3>
        
        {this.state.tasks[this.state.selectedTask].map(sa => this.renderSimpleAction(sa))}
      </div>);
  }

}

class Robot extends Component {
  state = {robots: this.props.state.robots, showInfoForRobot: this.props.state.showInfoForRobot}

  handleRobotClick = name => event => {
    this.setState({showInfoForRobot: name});
  }

  render(){
    let numRobots = Object.keys(this.state.robots).length
    return(
      <div>
        <h1>
          Robot information
        </h1>

        <Row>
          <Col>
            <ButtonToolbar>
              <ToggleButtonGroup type="radio" name="options" defaultValue={numRobots} vertical>
                  {Object.keys(this.state.robots).map(r => (
                    <ToggleButton value={numRobots--} size="sm" variant="outline-dark" onClick={this.handleRobotClick(r)}>{r}</ToggleButton>)
                  )}
                </ToggleButtonGroup>
            </ButtonToolbar>
          </Col>
        
          <Col xs={10}>
            <ListGroup>
              <ListGroupItem>
                Language: {this.state.robots[this.state.showInfoForRobot].language}
              </ListGroupItem>
              <ListGroupItem>
                Port: {this.state.robots[this.state.showInfoForRobot].port}
              </ListGroupItem>
                <div>{Object.keys(this.state.robots[this.state.showInfoForRobot].simpleactions).map(sa => <ListGroupItem>{sa}</ListGroupItem>)}
              </div>
            </ListGroup>
          </Col>
        </Row>
      </div>);
  }
}

function sendMission(state){
  console.log('Sending request')
  fetch('http://localhost:5000/controller', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(state.mission)
  })
  .then(res => console.log(res))
  .catch(console.log)
}

export default App;
