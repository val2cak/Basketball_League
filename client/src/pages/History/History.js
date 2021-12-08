import React from "react";
import "./History.css";

function History() {
     return (
          <div className="history">
               <label className="historyLabel">POČETAK LIGE</label>
               <div className="historyDiv">
                    Splitska košarkaška liga je pokrenuta davne 2004 godine. U
                    proteklim sezonama je liga mijenjala formate i lokacije, a
                    sada se igra u Spaladium areni. Liga je oduvijek promovirala
                    amaterski sport, a u ligi su proteklih sezona nastupali i
                    bivši profesionalni košarkaši od kojih valja istaknuti
                    Veljka Mršića, Velimira Perasovića i Dina Rađu.
               </div>
               <label className="historyLabel">PROŠLI POBJEDNICI</label>
               <table className="pastWinners">
                    <tr>
                         <th>GODINA</th>
                         <th>KLUB</th>
                         <th>GODINA</th>
                         <th>KLUB</th>
                    </tr>
                    <tr>
                         <td>2005</td>
                         <td>VITALAC</td>
                         <td>2013</td>
                         <td>ADRIATIC</td>
                    </tr>
                    <tr>
                         <td>2006</td>
                         <td>VITALAC</td>
                         <td>2014</td>
                         <td>ADRIATIC Suma Pistons</td>
                    </tr>
                    <tr>
                         <td>2007</td>
                         <td>ADRIATIC</td>
                         <td>2015</td>
                         <td>ADRIATIC TRP</td>
                    </tr>
                    <tr>
                         <td>2008</td>
                         <td>ADRIATIC</td>
                         <td>2016</td>
                         <td>SPLITSKA BANKA</td>
                    </tr>
                    <tr>
                         <td>2009</td>
                         <td>ADRIATIC</td>
                         <td>2017</td>
                         <td>ADRIATIC</td>
                    </tr>
                    <tr>
                         <td>2010</td>
                         <td>DALMACIJA</td>
                         <td>2018</td>
                         <td>ADRIATIC CB P&P</td>
                    </tr>
                    <tr>
                         <td>2011</td>
                         <td>DALMACIJA</td>
                         <td>2019</td>
                         <td>ADRIATIC Statist</td>
                    </tr>
                    <tr>
                         <td>2012</td>
                         <td>ADRIATIC</td>
                         <td>2020</td>
                         <td>ADRIATIC Statist</td>
                    </tr>
               </table>
          </div>
     );
}

export default History;
