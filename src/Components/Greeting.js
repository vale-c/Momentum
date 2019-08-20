import React from 'react';
import './Greeting.css';
import {Grid, Row, Col} from 'react-bootstrap';

function getRandom(items) { //pick a random name from the nameData list at the bottom of the Greeting component
  return items[Math.floor(Math.random()*items.length)];
}

class Greeting extends React.Component {
	constructor(props) {
		super(props)
    this.state = {
      firstName: ''
    };
  }

  componentWillMount() {
    this._randomAll()
  }

  _randomAll() {
    Object.keys(this.state).forEach(name => {
      this.setState({
        [name]: getRandom(nameData[name])
      })
    })
  };

  handleGetNameClick = (e) => {
    this.setState({
      [e.target.name]: getRandom(nameData[e.target.name])
    })
  };

	render() {
    const { firstName } = this.state; //set the first name to access it

    let time = new Date().getHours(); //get precise time

		return <Grid>
			<Row className="greetingTextWrapper">
        <Col xs={6} md={3}>
          <h3 className="greetingText">Good {time<12 ? 'Morning' : time<18 ? 'Afternoon' : time < 22 ? 'Evening' : 'Night'} {firstName} </h3>
        </Col>
      </Row>
		</Grid>;
	}
}

const nameData = {
	"firstName": [
    "Honey",
    "Sweetheart",
    "Mate",
    "Bro",
    "Mama",
    "Wiz",
    "Cutie",
    "Alien",
    "Human",
    "Sexy",
    "Princess",
    "Angel",
    "Cutie Pie",
    "Bae",
    "Good Looking",
    "Pal",
    "Smarty Pants",
    "Cookie",
    "Sunshine",
    "Baby",
    "Honeybunch",
    "Rockstar",
    "Treasure",
    "Classy",
    "Miss",
    "Captain",
    "Ace",
    "Cauliflower",
    "Bananarama",
    "Sweetie",
    "Ray Of Light",
    "Sunflower",
    "Flower",
    "Precious"
	]}


export default Greeting;
