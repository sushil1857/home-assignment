import React from 'react'

const serviceControl = props => (
    <div className="App-body">
            <table className="currencyTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Links</th>
                  <th>Attributes Name</th>
                </tr>
              </thead>
              {props.getServiceRecords()}
            </table>
          </div>
);

export default serviceControl