import React, { Component } from 'react'
import DataTable from 'react-data-table-component'
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import Swal from 'sweetalert2';



export default class Categorytable extends Component {
    constructor(props){
        super(props);
        this.state={
            allcategory:[],
            results:[],
            columns : [
                {
                  name:"Id",
                  selector:(row)=>row.id
                },
                {
                  name:"Category Name",
                  selector:(row)=>row.category
                },
                {
                  name:"Delete",
                  cell:(row)=><MdDeleteOutline onClick={()=>this.deletecatproduct(row.category)}/>
                },
            ],
            search:[]
        }

        const data = {
        }       
        axios.post('http://localhost/E-Commerce/brothers/Admin/product.php',data)
        .then(res => {
            this.setState({allcategory:res.data.findcat});
            this.setState({results:res.data.findcat});
        })
        this.setSearch();
    }

    setSearch = (ccc) => {
        if(ccc == "" || ccc == undefined || ccc == null ){
            console.log(ccc)
            this.setState({search:ccc})
            this.setState({results:this.state.allcategory})
        }
        else {
        var result=this.state.allcategory.filter((subcatarr)=>{
                this.setState({search:ccc})
                return subcatarr.category.toLowerCase().match(this.state.search.toLowerCase());
            });
            this.setState({results:result})
        }
    }

    deletecatproduct=(cat)=>{  
      Swal.fire({
        title:"Are You Sure You Want To Delete!",
        icon:"success",
        showConfirmButton:true,
        cancelButtonText: "Cancel!",
        showCancelButton:true,
      }).then((result) => {
        if (result['isConfirmed']){
          const deletecatproduct={
            deletecatpr:"yes",
            catproduct:cat
          } 
          console.log(deletecatproduct);
          axios.post('http://localhost/E-Commerce/brothers/Admin/product.php',deletecatproduct)
          .then(res => {
              console.log(res.data);
          })
        }
      })
    }


  render() {
    return (
      <div>
        <DataTable
        columns={this.state.columns} 
        data={this.state.results} 
        style={{textAlign:"center"}}
        title="Category Details"
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
