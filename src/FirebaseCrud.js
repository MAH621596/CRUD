import { Button, Container, Form, Grid, Header, Icon, Input, Segment, Tab, Table } from "semantic-ui-react";
import firebase from "./Firebase";
import React, { useEffect, useState } from "react";

//import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";



const FirebaseCrud = ()=> {
     const [aFirstName,setAFirstName] = useState('');
     const [aLastName, setALastName] = useState('');
     const [userData,setUserData] = useState([]);
     const [uFirstName, setuFirstName] = useState('');
     const [uLastName, setuLastName] = useState('');
     const [userId,setUserId] = useState('');

     //Retrieval of data from DB
     useEffect(()=>{
         const firestore = firebase.database().ref("/UserInfo");
         firestore.on('value',(response)=>{
             const data = response.val();
             let userInfo = [];
             for(let id in data){
                 userInfo.push({
                     id:id,
                     FirstName: data[id].FirstName,
                     LastName: data[id].LastName,
                 });
             }
              setUserData(userInfo);

         });

     },[]);
     



    const handleAddUser = () => {

        const firestore = firebase.database().ref("/UserInfo");
        let data = {
            FirstName : aFirstName,
            LastName : aLastName
        };

        firestore.push(data);
        setAFirstName('');
        setALastName('');

    };

    const handleUpdateUser = ()=>{
        const firestore = firebase.database().ref('/UserInfo').child(userId);
        firestore.update({
            FirstName:uFirstName,
            LastName:uLastName,
        })
        setuFirstName('');
        setuLastName('');

    };

    const handleUpdateClick = (data)=> {
        setuFirstName(data.FirstName);
        setuLastName(data.LastName);
        setUserId(data.id);
    };

    const handleDelete = (id)=> {
        const firestore = firebase.database().ref('/UserInfo').child(id);
        firestore.remove();

    };



    return <div class = "ui hidden divider">
    <Container>
        <Grid>
            <Grid.Row columns = "2">
                <Grid.Column>
                    <Segment padded = "very">
                        <Form>
                            <Form.Field>
                                <label>First_Name</label>
                                <Input placeholder="First Name" focus value = {aFirstName} onChange={(e)=>{setAFirstName(e.target.value)}}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Last_Name</label>
                                <Input placeholder="Last Name" focus value = {aLastName} onChange={(e)=>{setALastName(e.target.value)}} />
                            </Form.Field>

                            <Form.Field>
                                <Button onClick={()=>{
                                    handleAddUser();
                                }}
                                positive
                                
                                >
                                 <Icon name = "add circle"></Icon>
                                 Add User
                                 </Button>
                            </Form.Field>


                        </Form>
                    </Segment>
                </Grid.Column>
                <Grid.Column><Segment padded = "very">
                        <Form>
                            <Form.Field>
                                <label>First_Name</label>
                                <Input placeholder="First Name" focus value = {uFirstName} onChange={(e)=>{setuFirstName(e.target.value)}}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Last_Name</label>
                                <Input placeholder="Last Name" focus value = {uLastName} onChange={(e)=>{setuLastName(e.target.value)}} />
                            </Form.Field>

                            <Form.Field>
                                <Button onClick={()=>{
                                    handleUpdateUser();
                                }}
                                primary
                                
                                >
                                <Icon name="edit">

                                </Icon>
                                 Update User
                                 </Button>
                            </Form.Field>


                        </Form>
                    </Segment></Grid.Column>
            </Grid.Row>

            <Grid.Row columns ="1">
                <Grid.Column>
                   {
                       userData.length == 0? (
                       <Segment padded = "very" >
                           <Header textAlign="center">
                               Oops! There is no data available. Please Enter Some Data.
                           </Header>
                       </Segment>
                       ) : (
                       <Segment padded = "very">
                           <Table celled fixed singleLine>
                               <Table.Header>
                                   <Table.Row>
                                       <Table.HeaderCell>First_Name</Table.HeaderCell>
                                       <Table.HeaderCell>Last_Name</Table.HeaderCell>
                                       <Table.HeaderCell></Table.HeaderCell>
                                   </Table.Row>
                               </Table.Header>
                               {
                                   userData.map((data,index)=>{
                                       return <Table.Body>
                                           <Table.Cell>{data.FirstName}</Table.Cell>
                                           <Table.Cell>{data.LastName}</Table.Cell>
                                           <Table.Cell>
                                               <Button primary onClick={()=>{handleUpdateClick(data)}}>
                                                   <Icon name ="edit" ></Icon>
                                                   Update
                                               </Button>
                                               <Button color = "red" onClick={()=>{handleDelete(data.id)}}>
                                                   <Icon name = "delete" ></Icon>
                                                   Delete
                                               </Button>
                                           </Table.Cell>

                                       </Table.Body>
                                   })
                               }



                           </Table>

                       </Segment>)

                   }

                   
                </Grid.Column>
            </Grid.Row>



        </Grid>



        </Container>
        </div>
}

export default FirebaseCrud;