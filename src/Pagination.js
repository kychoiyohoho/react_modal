import React, { useEffect, useState } from 'react';
import axios from "axios";
import BootstrapTable  from 'react-bootstrap-table-next';
import paginationFactory  from 'react-bootstrap-table2-paginator';
import {Modal, Button} from "react-bootstrap";

export const Pagination = () => {
    const [players, setPlayers] = useState([]);
    const [modalInfo, setModalInfo] = useState([]);

    const [show,setShow] = useState(false);
    const handleClose=()=>setShow(false);
    const handleShow=()=> setShow(true);

    useEffect(()=>{
      getPlayerData();
    },[])
    const getPlayerData = async()=>{
        try{
            const data = await axios.get("https://nba-players.herokuapp.com/players-stats")
           setPlayers(data.data);
        }
        catch(e){
            console.log(e.meessage);
        }
    }
    const columns=[
      {dataField:"name", text:"Player Name"},
      {dataField:"points_per_game",text:"Points Per"},
      {dataField:"team_name",text:"Player Team"}
    ];
    //row 는 한 행에대한 모든 정보를 출력한다
    const rowEvents={
      onClick:(e,row) =>{
        console.log(row);
        setModalInfo(row);
        toggleTrueFalse();
      }
    }
    const toggleTrueFalse=()=>{
      setShow(handleShow);
    }
    const ModalContent =()=>{
      return(
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalInfo.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <h1>Players stats</h1>
          <ol>team_name:{modalInfo.team_name}</ol>
          <ol>assists_per_game:{modalInfo.assists_per_game}</ol>
          <ol>blocks_per_game:{modalInfo.blocks_per_game}</ol>
          <ol>games_played:{modalInfo.games_played}</ol>
          <ol>rebounds_per_game:{modalInfo.rebounds_per_game}</ol>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" oncClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )
    }
  return (
    <div>
      <h1>Pagination</h1>
      <BootstrapTable 
        keyField="name"
        data={players}
        columns={columns}
        pagination={paginationFactory()}
        rowEvents={rowEvents}
      />
      {show?<ModalContent/>:null}
    </div>
  )
}
