import React from 'react';
import Header from '../Header/index';
import Aside from '../SideBar/index';
import ImageContainer from "../../components/imageContainer";
class ChannelData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }


  render() {
    
    return (
      <div>
      <Header />
<Aside active={"Task"} />
<div className="page-wrapper">
        <div className="container-fluid r-aside custome_container">
          <div className="page-header">
            <div className="row">
              <div className="col-md-12">
                <h2 className="page-title">Channel Amazon</h2>
                <div className="breadcrumb">
                  <ul>
                    <li className="back-button">
                      <a href="channels.html">Back</a>
                    </li>
                    <li>
                      <a href="channels.html">Channels &gt;&gt;</a>
                    </li>
                    <li>Channel Amazon</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <ul className="nav nav-tabs datetab" id="myTab" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Mapping</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Asset Configuration</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Products</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="download-tab" data-toggle="tab" href="#download" role="tab" aria-controls="download" aria-selected="false">Download</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Schedule</a>
            </li>
          </ul>
          <div className="tab-content custome_content" id="myTabContent">
            <div className="tab-pane fade show active detail-page" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div className="row">
                <div className="col-sm-12 ">
                  <div className="accordion" id="accordionExample">
                    <div className="card adnewcard">
                      <div className="card-header" id="headingOne">
                        <h5 className="mb-0">
                          <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            <div className="heading">
                              <i className="fas fa-chevron-right" />
                              Basic Product Information
                            </div> 
                          </button>
                        </h5>
                      </div>
                      <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample" style={{}}>
                        <div className="card-body">
                          <table>
                            <tbody><tr>
                                <td width="20%">Amazon Attribute</td>
                                <td width="10%">Required</td>
                                <td width="10%">Data Type</td>
                                <td width="40%">Source</td>
                              </tr>
                              <tr>
                                <td><a href="#">Brand</a></td>
                                <td>Y</td>
                                <td>String</td>
                                <td>Brand</td>
                              </tr>
                              <tr>
                                <td><a href="#">Disclosure Date</a></td>
                                <td>Y</td>
                                <td>String</td>
                                <td>Active Date</td>
                              </tr>
                              <tr>
                                <td><a href="#">GTIN</a></td>
                                <td />
                                <td>Date</td>
                                <td>UPC</td>
                              </tr>
                              <tr>
                                <td><a href="#">Product ID</a></td>
                                <td>Y</td>
                                <td>Date</td>
                                <td>Product ID</td>
                              </tr>
                              <tr>
                                <td><a href="#">MPN</a></td>
                                <td>Y</td>
                                <td>Date</td>
                                <td>Product ID</td>
                              </tr>
                              <tr>
                                <td><a href="#">Release Date </a></td>
                                <td>Y</td>
                                <td>String</td>
                                <td>IF(VALUE("MSRP"),CONCATENATE(VALUE("MSRP")," USD"),null)</td>
                              </tr>
                              <tr>
                                <td><a href="#">Title </a></td>
                                <td>Y</td>
                                <td>String</td>
                                <td>SQUISH( CONCATENATE( VALUE('Brand'), " ", COALESCE( VALUE('eCommerce Name'), VALUE('Product Name') ) ) )</td>
                              </tr>
                            </tbody></table>
                        </div>
                      </div>
                    </div>  
                  </div>
                  <div className="accordion" id="accordionExample">
                    <div className="card adnewcard">
                      <div className="card-header" id="headingTwo">
                        <h5 className="mb-0">
                          <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <i className="fas fa-chevron-right" />
                            <div className="heading">Product Structure</div>
                          </button>
                        </h5>
                      </div>
                      <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div className="card-body">
                          <table>
                            <tbody><tr>
                                <td width="20%">Amazon Attribute</td>
                                <td width="10%">Required</td>
                                <td width="10%">Data Type</td>
                                <td width="40%">Source</td>
                              </tr>
                              <tr>
                                <td />
                                <td>Y</td>
                                <td>String</td>
                                <td>Brand</td>
                              </tr>
                              <tr>
                                <td>GTIN</td>
                                <td />
                                <td>Date</td>
                                <td>UPC</td>
                              </tr>
                            </tbody></table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <form>
                <div className="form-group row filtercustome">
                  <div className="col-md-12">
                    <div className="row">
                      <label htmlFor="inputPassword" className="col-sm-2 col-form-label" style={{fontSize: '17px'}}>Select Tranformation(s):</label>
                      <div className="col-sm-7">
                        <input type="text" className="form-control" data-role="tagsinput" defaultValue="Resize" />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <div className="row">
                <div className="col-md-2"><label htmlFor="inputPassword" className="col-form-label" style={{fontSize: '17px'}}>Select Metadat:</label></div>
                <div className="col-md-4">
                  <div className="metadata">
                    <ul>
                      <li className="demo"><span className="menu activelist">About </span></li>
                      <li className="demo"><span className="menu">Available</span></li>
                      <li className="demo"><span className="menu">FileSize</span></li>
                      <li className="demo"><span className="menu">Filetype</span></li>
                      <li className="demo"><span className="menu">UsageRight</span></li>
                      <li className="demo"><span className="menu">Creator</span></li>
                      <li className="demo"><span className="menu">modifier</span></li>
                      <li className="demo"><span className="menu">AssetStardata</span></li>
                      <li className="demo"><span className="menu">modifier</span></li>
                      <li className="demo"><span className="menu">AssetStardata</span></li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-1 changelistmain">
                  <div className="changelist">
                    <ul>
                      <li><i className="ti-angle-double-up" /></li>
                      <li><i className="ti-angle-up" /></li>
                      <li><i className="ti-angle-left" /></li>
                      <li><i className="ti-angle-right" /></li>
                      <li><i className="ti-angle-down" /></li>
                      <li><i className="ti-angle-double-down" /></li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="metadata">
                    <ul>
                      <li className="demo"><span className="menu activelist">About </span></li>
                      <li className="demo"><span className="menu">Available</span></li>
                      <li className="demo"><span className="menu">FileSize</span></li>
                      <li className="demo"><span className="menu">Filetype</span></li>
                      <li className="demo"><span className="menu">UsageRight</span></li>
                      <li className="demo"><span className="menu">Creator</span></li>
                      <li className="demo"><span className="menu">modifier</span></li>
                      <li className="demo"><span className="menu">AssetStardata</span></li>
                      <li className="demo"><span className="menu">modifier</span></li>
                      <li className="demo"><span className="menu">AssetStardata</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
              <form>
                <div className="form-group row filtercustome">
                  <div className="col-md-3">
                    <div className="row">
                      <label htmlFor="inputPassword" className="col-sm-5 col-form-label">Select Language:</label>
                      <div className="col-sm-7">
                        <select id="pref-perpage" className="form-control">
                          <option value={0}>English</option>
                          <option value={1}>English</option>
                          <option value={2}>Hindi</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="row">
                      <label htmlFor="inputPassword" className="col-sm-5 col-form-label">Slect Object Type:</label>
                      <div className="col-sm-7">
                        <select id="pref-perpage" className="form-control">
                          <option value={0}>All Prodcut</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="row">
                      <label htmlFor="inputPassword" className="col-sm-6 col-form-label">Completeness Threshold:</label>
                      <div className="col-sm-6">
                        <select id="pref-perpage" className="form-control">
                          <option value={0}>All Prodcut</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="row">
                      <label htmlFor="inputPassword" className="col-sm-6 col-form-label">Quality Approved:</label>
                      <div className="col-sm-6">
                        <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <div className="table-responsive">
                <table className="table dashboard_table data_table_30">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>FileName</th>
                      <th>Main Image</th>
                      <th>Name</th>
                      <th>SEO Name </th>
                      <th>Article Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Harlem</td>
                      <td><ImageContainer src="1.jpg" alt /></td>
                      <td>Harlem canine cat</td>
                      <td>Basketball Balls Harlem</td>
                      <td>117871</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>hild-2</td>
                      <td><ImageContainer src="11.png" alt /></td>
                      <td>Hariem Canine cat</td>
                      <td>Basketball Balls Harlem</td>
                      <td>117871</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>League</td>
                      <td><ImageContainer src="1.jpg" alt /></td>
                      <td>League balls change additional changed value</td>
                      <td>New SEO Name Change</td>
                      <td>185613 </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Competition</td>
                      <td><ImageContainer src="11.png" alt /></td>
                      <td>Competition</td>
                      <td>Basketball Balls Competition</td>
                      <td>125673</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Competition-mini</td>
                      <td><ImageContainer src="1.jpg" alt /></td>
                      <td>Competition Mini</td>
                      <td>Basketball Balls Competition Mini</td>
                      <td>117885 </td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Dunk</td>
                      <td><ImageContainer src="11.png" alt /></td>
                      <td>DUNK</td>
                      <td>Basketball Balls DUNK</td>
                      <td>177966</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Dunk</td>
                      <td><ImageContainer src="11.png" alt /></td>
                      <td>DUNK</td>
                      <td>Basketball Balls DUNK</td>
                      <td>177966</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>Dunk</td>
                      <td><ImageContainer src="11.png" alt /></td>
                      <td>DUNK</td>
                      <td>Basketball Balls DUNK</td>
                      <td>177966</td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>Dunk</td>
                      <td><ImageContainer src="11.png" alt /></td>
                      <td>DUNK</td>
                      <td>Basketball Balls DUNK</td>
                      <td>177966</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item active"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                  </ul>
                </div>
                <div className="col-md-8 text-right">
                  <ul className="prodctshow">
                    <li>1-25/121 | </li>
                    <li>Items per page</li>
                    <li className="filtercustome">
                      <select id="pref-perpage" className="form-control">
                        <option value={0}>10</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                      </select>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="download" role="tabpanel" aria-labelledby="download-tab">...</div>
          </div>
        </div>
      </div>

      </div>
    )
  }
}



export default ChannelData;