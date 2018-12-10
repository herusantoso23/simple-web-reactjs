import React, { Component } from 'react';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import ItemService from '../Service/ItemService';

const itemService = new ItemService();

class Forms extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      id:props.match.params.id,
      collapse: true,
      fadeIn: true,
      timeout: 300,
      isSubmit: false,
      name: '', category: '', type: '', quantity: 0 , quality: '', image: '', color: '', size: '',
      visibleAlert: false, messageAlert: "", colorAlert: "", link: ""
    }
    this.onDismiss = this.onDismiss.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }


    name = (e) => {this.setState({name:e.target.value})}
    category = (e) => {this.setState({category:e.target.value})}
    type = (e) => {this.setState({type:e.target.value})}
    quantity = (e) => {this.setState({quantity:e.target.value})}
    quality = (e) => {this.setState({quality:e.target.value})}
    image = (e) => {this.setState({image:e.target.value})}
    color = (e) => {this.setState({color:e.target.value})}
    size = (e) => {this.setState({size:e.target.value})}    


    // handleChange(event) {
    //   this.setState({
    //     name: event.target.value,
    //     category: event.target.value,
    //     type: event.target.value,
    //     quantity: event.target.value,
    //     quality: event.target.value,
    //     image: event.target.value,
    //     color: event.target.value,
    //     size: event.target.value
    //   });
    // }
  

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  onDismiss() {
    this.setState({ visibleAlert: false });
  }

  componentDidMount(){
    this.getData();
  }

  componentWillMount(){
    this.getData();
  }

  getData(){
    itemService.getDetail(this.state.id).then(response =>{
        const data = response.data;
        if(data.message == "OK"){
          const data = response.data.result;
          console.log(data);
          this.setState({
            name: data.name,
            category: data.category,
            type: data.type,
            quantity: data.quantity,
            quality: data.quality,
            color: data.color,
            size: data.size
          })
        } else {

        }
    });
  }


  doSubmit = () => {
    const dataToSubmit = {
      ...this.state
    }
    console.log(dataToSubmit);
    if(this.state.id == null){
      itemService.postItem(dataToSubmit).then(response =>{
        const data = response.data;
        if(data.message == 'OK'){
          this.setState({
            visibleAlert: true,
            messageAlert: "Add Item Success. ",
            colorAlert: "info"
          });
          console.log(response);
        } else {
          this.setState({
            visibleAlert: true,
            messageAlert: data.result,
            colorAlert: "danger"
          });
          console.log(response);
        }
      })    
    }else{
      itemService.putItem(dataToSubmit,this.state.id).then(response =>{
        const data = response.data;
        if(data.message == 'OK'){
          this.setState({
            visibleAlert: true,
            messageAlert: "Add Item Success. ",
            colorAlert: "info"
          });
          console.log(response);
        } else {
          this.setState({
            visibleAlert: true,
            messageAlert: data.result,
            colorAlert: "danger"
          });
          console.log(response);
        }
      })    
    }
    
  }

  

  render() {
    return (
      <div className="animated fadeIn">
      <Card>
        <CardHeader>
          <strong>Items</strong>
        </CardHeader>
        <CardBody>
          <Form  action="" method="post" encType="multipart/form-data" className="form-horizontal">
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Name</Label>
              </Col>
              <Col xs="12" md="9">
                <Input value={this.state.name}  onChange={this.name} type="text" id="textName" name="text-input" placeholder="Text"   />
                <FormText  color="muted">Please enter items name</FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Category</Label>
              </Col>
              <Col xs="12" md="9">
                <Input value={this.state.category}  onChange={this.category} type="text" id="textCategory" name="text-input" placeholder="Text" />
                <FormText color="muted">Please enter items category</FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Type</Label>
              </Col>
              <Col xs="12" md="9">
                <Input value={this.state.type}  onChange={this.type} type="text" id="textType" name="text-input" placeholder="Text" />
                <FormText color="muted">Please enter items type</FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Quantity</Label>
              </Col>
              <Col xs="12" md="9">
                <Input value={this.state.quantity}  onChange={this.quantity} type="number" id="textQuantity" name="text-input" placeholder="Text" />
                <FormText color="muted">Please enter items quantity</FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Quality</Label>
              </Col>
              <Col xs="12" md="9">
                <Input value={this.state.quality}  onChange={this.quality} type="text" id="textQuality" name="text-input" placeholder="Text" />
                <FormText color="muted">Please enter items quality</FormText>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Color</Label>
              </Col>
              <Col xs="12" md="9">
                <Input value={this.state.color}  onChange={this.color} type="text" id="textColor" name="text-input" placeholder="Text" />
                <FormText color="muted">Please enter items color</FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Size</Label>
              </Col>
              <Col xs="12" md="9">
                <Input value={this.state.size}  onChange={this.size} type="text" id="textSize" name="text-input" placeholder="Text" />
                <FormText color="muted">Please enter items size</FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Image</Label>
              </Col>
              <Col xs="12" md="9">
                <Input value={this.state.image}  onChange={this.image} type="file" id="textSize" name="text-input" placeholder="Image" />
                <FormText color="muted">Please enter items size</FormText>
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
        <CardFooter>
          <Button onClick={this.doSubmit} type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
          <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
        </CardFooter>
      </Card>
      </div>
    );
  }
}

export default Forms;
