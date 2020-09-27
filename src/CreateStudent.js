import React from 'react';


class CreateStudent extends React.Component {

    state = {
        newStudent: " ",
        studnets: [],
        renderedStudents: [],
        updatedname: "",
        updated_id: "",
        deleted_id:""

    }
   
    componentDidMount() {
       this.read();
    }

    componentDidUpdate() {
       //this.read()
        //console.log(this.state.updated_id,this.state.updatedname)
    }
    create() {
        console.log("create")
        let name = this.state.newStudent
        async function createStudent() {

            let data = await fetch("https://zenclass-demo-server.herokuapp.com/student", {
                "method": "POST",
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ "name": name })
            });

            data = await data.json();

            alert(data.message + " " + name);

        };

        createStudent();
    }


    read = async () => {
        console.log("Read")
        let details;
        async function getAllStudents() {
            let data = await fetch("https://zenclass-demo-server.herokuapp.com/students");
            data = await data.json();
            //console.log(data);
            details = data;
        }
        await getAllStudents();
        this.setState({ renderedStudents: details })
    };

    update = () => {
        console.log("Update");
        let info = {
            "student_id": this.state.updated_id,
            "name": this.state.updatedname
        }
        console.log(info)
        async function updateStudent() {

            let data = await fetch("https://zenclass-demo-server.herokuapp.com/updatestudent", {
                "method": "POST",
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(info)
            });

            data = await data.json();
              console.log(data);
            alert(data.message + " " + data.id);

        };
        updateStudent();


    };

    delete() {
        console.log("Delete");
        let info = {
            "student_id": this.state.deleted_id      
        }
        async function deleteStudent() {

            let data = await fetch("https://zenclass-demo-server.herokuapp.com/removestudent", {
                "method": "POST",
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(info)
            });

            data = await data.json();
              console.log(data);
            alert(data.message + " " + data.id);

        };
        deleteStudent();
    };
    handleChange(event) {
        this.setState({ newStudent: event.target.value });
    }

    handleChange1(event) {
        this.setState({ updated_id: event.target.value });
    }

    handleChange2(event) {
        this.setState({ updatedname: event.target.value });
    }
    handleChange3(event) {
        this.setState({ deleted_id: event.target.value });
    }

    render() {
        let studentheader = this.state.renderedStudents.map((a) => {return <div style={{ "display": "inline-block","padding":"5px", "border": " green solid", "width": "max-content", "margin": "10px" }}> {a._id} <p> {a.name}</p></div>});
        return (

            <div >
                <button onClick={this.read.bind(this)}> Get all the students</button>

                <input type="text" onChange={this.handleChange.bind(this)}></input>
                <button onClick={this.create.bind(this)}> Create </button>
                <input type="text" placeholder="student_Id" onChange={this.handleChange1.bind(this)}></input>
                <input type="text" placeholder="updated name" onChange={this.handleChange2.bind(this)}></input>
                <button onClick={this.update.bind(this)} > Update </button>
              
                <input type="text" placeholder="student Id" onChange={this.handleChange3.bind(this)}></input>
                <button onClick={this.delete.bind(this)}> Delete </button>
                <div style={{ "marginTop": "100px" }}> {studentheader} </div>

            </div>
        )
    }
}
export default CreateStudent; 
