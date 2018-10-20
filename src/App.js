import React, { Component } from 'react';
import classes from './App.css';
import Person from  './Person/Person'   //'./Person/Person'.js
//import './Person/Person.css';


class App extends Component {

  state = {
    persons: [
      {id : 'bjhsldf', name: 'Max', age:28},
      {id : 'vvgvdsg', name: 'Manu', age:29},
      {id : 'wssajaa', name: 'Stella', age:26}
    ],
    otherState : 'Some other value',
    showPerson : false
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPerson;
    this.setState({showPerson : !doesShow})
  }

  deletePersonHandler = (personIndex) => {
    // DO NOT DO THIS, with this you alter the original state  --> const persons = this.state.persons;
    // Instead take a copy -->  const persons = this.state.persons.slice(); or use spread operation '...'
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons : persons})
  }

  nameChangeHandler = (event, id) => {

    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      // persons: [
      //   {name: "Max", age:28},
      //   {name: (event.target.value).toUpperCase(), age:29},
      //   {name: 'Stella', age:27}
      // ]

      persons: persons
    })
  }

  render() {
    let person = null;
    let btnClass = '';

    if (this.state.showPerson){
      person = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name = {person.name}
              age = {person.age} 
              key = {person.id} //we need a unique id. For now we are adding a 'id' to persons array in the state
              changed = {(event) => this.nameChangeHandler(event, person.id)}
              />
          })}
        </div>
        
        // <div>
        //   <Person 
        //     name={this.state.persons[0].name}
        //     age={this.state.persons[0].age} />
        //   <Person
        //     name={this.state.persons[1].name}
        //     age={this.state.persons[1].age}
        //     click={this.switchNameHandler.bind(this, "Ascii!")}
        //     changed ={this.nameChangeHandler}>My Hobbies : Racing</Person>
        //   <Person 
        //     name={this.state.persons[2].name}
        //     age={this.state.persons[2].age}/>
        // </div>


      );

//      myStyle.backgroundColor = 'red';
//      myStyle[':hover'] = {
//        backgroundColor: 'salmon',
//        color: 'black'
//      }

        btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (this.state.persons.length <=2){
      assignedClasses.push(classes.red)
    }
    if (this.state.persons.length <=1){
      assignedClasses.push(classes.bold)
    }

    return (
        <div className={classes.App}>
          <h1>Hi, I'm a React App</h1>
          <p className={assignedClasses.join(' ')}>This is really working!</p>
          <button 
//            style={btnClass}
            className={btnClass}
            onClick={this.togglePersonHandler.bind(this, "Asanka!")}>Toggle List</button>
          {person} 
        </div>
    );
  }
}

// export default App;
export default App;
