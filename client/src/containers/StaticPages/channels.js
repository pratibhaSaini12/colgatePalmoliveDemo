import React from 'react';
import Header from '../Header/index';
import Aside from '../SideBar/index';
import ImageContainer from "../../components/imageContainer";
import { Link } from "react-router-dom"

class Channels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {

    return (
      <div>
        <div id="main-wrapper">


          <Header />
          <Aside active={"Task"} />
          <div className="page-wrapper">
            <div className="container-fluid r-aside custome_container">
              <div className="page-header">
                <div className="row">
                  <div className="col-md-12">
                    <h2 className="page-title">Channels</h2>
                  </div>
                </div>
              </div>
              {/* card row start ---------------------------------------------------------------------*/}
              <div className="table-view channel_details digitalImage ">
                <div className="row">
                  <div className="col-md-12">
                    <div className="filter float-right">
                      <div className="float-right">
                     <a className="new-product primary-button float-right" href="#"> <span className="icon plus" />NEW CHANNEL</a>
                        <select name="example_length" aria-controls="example" class="form-control form-control-sm floate"><option value="5">5 per page</option><option value="10">10 per page</option><option value="25">25 per page</option><option value="100">All</option></select>
                      </div>
                    </div>
                    <table id="example" className="table">
                      <thead>
                        <tr className="starting">
                          <th scope="col"><input type="checkbox" onclick="checkAll(this)" /></th>
                          <th scope="col" />
                          <th scope="col">Name</th>
                          <th scope="col">Channel Type</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><input type="checkbox" name /></td>
                          <td><div className="image-thumb"> <Link to="/channelData"> <ImageContainer src="franklin-red.png" /></Link></div></td>
                          <td>Amazon</td>
                          <td>Export</td>
                          <td> Last Published a Month Ago</td>
                        </tr>
                        <tr>
                          <td><input type="checkbox" name /></td>
                          <td><div className="image-thumb"> <Link to="/channelData"><ImageContainer src="ebay.jpg" /> </Link></div></td>
                          <td>Ebay</td>
                          <td>Direct</td>
                          <td>Last Published a Month Ago</td>
                        </tr>
                        <tr>
                          <td><input type="checkbox" name /></td>
                          <td><div className="image-thumb"><Link to="/channelData"> <ImageContainer src="franklin-red.png" /></Link> </div></td>
                          <td>Franklin Sports</td>
                          <td>Export</td>
                          <td>Last Published a Month Ago</td>
                        </tr>
                        <tr>
                          <td><input type="checkbox" name /></td>
                          <td><div className="image-thumb"> <Link to="/channelData"><ImageContainer src="custom.png" /> </Link></div></td>
                          <td>Custom Channel</td>
                          <td>Direct</td>
                          <td>Last Published a Month Ago</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="pagebottompart">
                      <p className="float-left col-md-10 dataTables">Showing 1 to 8 of 8 entries</p>
                      <div className="col-md-2 pull-right">
                        <ul className="pagination">
                          <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                          <li className="page-item"><a className="page-link" href="#">1</a></li>
                          <li className="page-item active"><a className="page-link" href="#">2</a></li>
                          <li className="page-item"><a className="page-link" href="#">3</a></li>
                          <li className="page-item"><a className="page-link" href="#">Next</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default Channels;