import React, { Component } from "react";
import ServiceControl from "./Components/Service/Service"
import ProviderControl from "./Components/Provider/Provider"
import "./App.css";
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      service: {},
      provider: {
        data: {},
        included: {}
      },
      tempProvider: {},
      selectedRowID: ''
    };
  }



  componentDidMount() {
    this.props.apiData.then(result => {
      this.setState({
        isLoaded: true,
        service: result[0].data,
        provider: {
          data: result[1].data,
          included: result[1].included
        },
        tempProvider: result[1].data
      })
    }).catch(err => console.log(err))
  }



  handlerClick = (serviceName) => {
    const providerData = { ...this.state.provider };
    const searchedProviderData = providerData.included.filter(row => {
      return row.attributes.service != null && row.attributes.service === serviceName
    });

    const id = searchedProviderData[0].id;
    const getRow = providerData.data.filter(row => {
      return row.relationships.schedules.data[0].id === id
    })

    this.setState({ tempProvider: getRow });
    this.setState({ selectedRowID: serviceName });
  }



  createServiceTable = () => {
    const data = this.state;
    let table = [];
    if (data.service.length > 0) {
      data.service.forEach(row => {
        table.push(
          <tr className={this.state.selectedRowID !== '' && this.state.selectedRowID === row.attributes.name ? 'rowActive' : ''} onClick={() => this.handlerClick(row.attributes.name)}>
            <td>{row.id}</td>
            <td>{row.type}</td>
            <td>{row.links.self}</td>
            <td>{row.attributes.name}</td>
          </tr>
        );
      });
    }
    return table;
  };

  createProviderTable = () => {
    const data = this.state.tempProvider;
    let div = [];
    if (data.length > 0) {
      data.forEach(row => {
        div.push(
          <div className="col-md-6">
            <div className="d-flex flex-row border rounded">
              <div className="p-0 w-25">
                <img src="https://c1.staticflickr.com/3/2862/12328317524_18e52b5972_k.jpg" className="img-thumbnail border-0" />
              </div>
              <div className="pl-3 pt-2 pr-2 pb-2 w-75 border-left">
                <h4 className="text-primary">{row.attributes.name}</h4>
                <h5 className="text-info">{row.attributes.subspecialties}</h5>
                <ul className="m-0 float-left">
                </ul>
              </div>
            </div>
          </div>
        );
      });
    }
    return div;
  };


  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Oops: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <main>
          <ServiceControl getServiceRecords={this.createServiceTable} />
          <ProviderControl getProviderRecords={this.createProviderTable} />
        </main>
      );
    }
  }
}

function mapStatetoProps(state) {
  return {
    apiData: state.serviceData
  }
}

export default connect(mapStatetoProps)(App);
