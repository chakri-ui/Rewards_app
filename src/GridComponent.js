import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export const GridComponent = (props) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  return (
    <div>
      <div className="first-grid">
        <h4>Data Breakup For Each Transaction(Monthwise)</h4>
        <div className="ag-theme-alpine first-grid">
          <AgGridReact onGridReady={onGridReady} rowData={props.rewardsData}>
            <AgGridColumn field="custName" filter={true}></AgGridColumn>
            <AgGridColumn field="monthNm"></AgGridColumn>
            <AgGridColumn field="amount" sortable={true}></AgGridColumn>
            <AgGridColumn field="rewardPoints" sortable={true}></AgGridColumn>
            <AgGridColumn field="date" sortable={true}></AgGridColumn>
          </AgGridReact>
        </div>
      </div>
      <div className="second-grid">
        <h4>Total Reward Points for All Months</h4>
        <div className="ag-theme-alpine second-grid">
          <AgGridReact
            onGridReady={onGridReady}
            rowData={props.totalRewardsArr}
          >
            <AgGridColumn field="custName" filter={true}></AgGridColumn>
            <AgGridColumn field="totalRewards" sortable={true}></AgGridColumn>
          </AgGridReact>
        </div>
      </div>
    </div>
  );
};
