import React, { Component } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios';
import { FaEdit} from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import { GrClose } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import SweetAlert from 'react-bootstrap-sweetalert';
import Swal from 'sweetalert2';



export default class Logintable extends Component {
    constructor(props){
        super(props);
        this.state={
            Logindetail:[],
            results:[],
            columns : [
                {
                    name:"User Id",
                    selector:(row)=>row.Id
                },
                {
                    name:"Name",
                    selector:(row)=>row.name
                },
                {
                    name:"User Email",
                    selector:(row)=>row.email
                },
                {
                    name:"Mobile",
                    selector:(row)=>row.mobile
                },
                {
                    name:"Password",
                    selector:(row)=>row.password
                },
                {
                    name:"Date",
                    selector:(row)=>row.created_date
                },
                {
                    name:"Edit",
                    cell:(row)=><FaEdit/>
                },
                {
                    name:"Delete",
                    cell:(row)=><MdDeleteOutline onClick={()=>this.deleteuser(row.Id)}/>
                },
            ],
            search:[]
        }

        const logindata = {
        }       
        axios.post('http://localhost/E-Commerce/brothers/login.php',logindata)
        .then(res => {
            console.log(res.data);
            this.setState({Logindetail:res.data.findlogin});
            this.setState({results:res.data.findlogin});
            console.log(this.state.Logindetail);
        })
        this.setSearch();
    }

    setSearch = (ccc) => {
        if(ccc == "" || ccc == undefined || ccc == null ){
            console.log(ccc)
            this.setState({search:ccc})
            this.setState({results:this.state.Logindetail})
        }
        else {
        var result=this.state.Logindetail.filter((subcatarr)=>{
                this.setState({search:ccc})
                return subcatarr.name.toLowerCase().match(this.state.search.toLowerCase());
            });
            this.setState({results:result})
        }
    }

    
    deleteuser=(id)=>{
        const deleteuserdetail={
          deleteuserd:"yes",
          userid:id
        } 
        console.log(deleteuserdetail);
        axios.post('http://localhost/E-Commerce/brothers/login.php',deleteuserdetail)
        .then(res => {
            console.log(res.data);
        })
      }


  render() {
    return (
      <div>
        <DataTable
        columns={this.state.columns} 
        data={this.state.results} 
        style={{textAlign:"center"}}
        title="Login Details"
        pagination
        fixedHeader
        fixedHeaderScrollHeight='450px'
        highlightOnHover
        subHeader
        subHeaderComponent={
            <input 
            type="text"
            placeholder='search here'
            className='w-25 form-control'
            value={this.state.search}
            onChange={(e)=>this.setSearch(e.target.value)}
            />
        }/>
      </div>    
    )
  }
}
