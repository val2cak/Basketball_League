import React from "react";
import "./History.css";

function History() {
     return (
          <div className="history">
               <label className="historyLabel">POČETAK LIGE</label>
               <label className="historyLabel">PROŠLI POBJEDNICI</label>
               <table className="pastWinners">
                    <tr>
                         <th>GODINA</th>
                         <th>KLUB</th>
                    </tr>

               </table>
          </div>
     );
}

export default History;
