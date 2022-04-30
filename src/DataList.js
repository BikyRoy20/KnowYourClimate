import React, { useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

function DataList() {

    const [userList, setUserList] = useState([])

    const columns=[
        {dataField:'id', text:'Id'},
        {dataField:'title', text:'Title', sort:true, filter:textFilter()},
        {dataField:'body', text:'Description',sort:true, filter:textFilter()}
    ]

    const pagination =paginationFactory({
        page:1,
        sizePerPage:5,
        lastPageText:'>>',
        firstPageText:'<<',
        nextPageText:'>',
        prePageText:'<',
        showTotal:true,
        alwaysShowAllBtns:true,
        onPageChange:function(page,sizePerPage){
            console.log('page',page);
            console.log('sizePerPage',sizePerPage);
        },
        onSizePerPageChange:function(page,sizePerPage){
            console.log('page',page);
            console.log('sizePerPage',sizePerPage);
        },

    });

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(result => setUserList(result))
            .catch(error => console.log(error));
    }, [])

    return <div>
    
       <BootstrapTable 
       bootstrap4 
       keyField ='id' 
       columns={columns} 
       data={userList} 
       pagination={pagination}
       filter={filterFactory()}
       />

      {  /* <table>
            <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
            </tr>
            {
                userList && userList.length>0 ?
                userList.map(usr=>
                    <tr>
                      <td>{usr.id}</td>
                      <td>{usr.title}</td>
                      <td>{usr.body}</td>
                    </tr>
                    )
                    : 'Loading..'
            }
        </table> */}
    </div>
}

export default DataList;